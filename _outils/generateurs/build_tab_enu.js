const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle,
  PageBreak, LevelFormat, convertInchesToTwip,
  Bookmark, InternalHyperlink
} = require("docx");

const MONO = "Consolas";

/**
 * L'espace insecable, pose a la source.
 *
 * Ce script est anterieur a la boite a outils commune et definit ses
 * propres fonctions de mise en forme. La regle typographique y est donc
 * recopiee — voir boite.js, ou elle est expliquee.
 *
 * Le code monospace est epargne : ses deux-points appartiennent au
 * langage, pas a la phrase.
 */
const INSECABLE = "\u00a0";

/**
 * Le code d'un exercice : ABS.1, TMP.12…
 *
 * Il sert a poser un signet sur le titre de l'exercice, et a fabriquer le
 * lien qui y mene depuis le tableau d'ouverture. Les deux doivent tomber
 * d'accord, d'ou cette unique expression. Voir boite.js, ou le meme
 * mecanisme est explique.
 */
const CODE_EXERCICE = /^([A-Z]{2,3})\.(\d+)\b/;
const ancre = (code) => "ex-" + code.replace(".", "-");

/** Une cellule dont le code renvoie a l'exercice du meme nom. */
function celluleLien(code, largeur) {
  return new TableCell({
    width: { size: largeur, type: WidthType.DXA },
    margins: { top: 55, bottom: 55, left: 100, right: 100 },
    children: [new Paragraph({
      spacing: { after: 0 },
      children: [new InternalHyperlink({
        anchor: ancre(code),
        children: [new TextRun({ text: code, size: 18, font: MONO,
                                 color: "2B6CB0", underline: {} })]
      })]
    })]
  });
}

function typo(t) {
  if (typeof t !== "string") return t;
  return t.replace(/ ([:;?!\u00bb])/g, INSECABLE + "$1")
          .replace(/\u00ab /g, "\u00ab" + INSECABLE);
}

/** Recolle les bords : l'espace finit un fragment, le signe en commence un autre. */
function typoListe(textes, monospace) {
  const r = textes.map((t, i) => (monospace[i] ? t : typo(t)));
  for (let i = 0; i < r.length - 1; i++) {
    const suite = r[i + 1];
    if (!suite) continue;
    if (r[i].endsWith(" ") && ":;?!\u00bb".includes(suite[0])) {
      r[i] = r[i].slice(0, -1) + INSECABLE;
    } else if (r[i].endsWith("\u00ab") && suite.startsWith(" ")) {
      r[i + 1] = INSECABLE + suite.slice(1);
    }
  }
  return r;
}
const ACCENT = "1F4E79";
const GREY = "595959";
const W = 9360;

function p(text, o = {}) {
  return new Paragraph({
    keepNext: /^Package\s*:/.test(String(text)),
    spacing: { after: o.after === undefined ? 120 : o.after },
    alignment: o.align,
    children: [new TextRun({ text: typo(text), bold: o.bold, italics: o.italic, size: o.size || 22, color: o.color })]
  });
}

function morceaux(list) {
  const textes = typoListe(
    list.map(x => (typeof x === "string" ? x : x.t) || ""),
    list.map(x => typeof x !== "string" && !!x.code));
  list = list.map((x, i) => typeof x === "string" ? textes[i] : { ...x, t: textes[i] });
  return list.map(x => typeof x === "string"
    ? new TextRun({ text: x, size: 22 })
    : new TextRun({
        text: x.t, size: 22, bold: x.b, italics: x.i,
        font: x.code ? MONO : undefined, color: x.code ? "8B2500" : undefined
      }));
}

const runs = (l, o = {}) => new Paragraph({
  spacing: { after: o.after === undefined ? 120 : o.after }, children: morceaux(l)
});

const bullet = (t) => new Paragraph({
  numbering: { reference: "puces", level: 0 }, spacing: { after: 60 },
  children: [new TextRun({ text: typo(t), size: 22 })]
});

const bulletRuns = (l) => new Paragraph({
  numbering: { reference: "puces", level: 0 }, spacing: { after: 60 }, children: morceaux(l)
});

function code(lines) {
  return lines.map((l, i) => new Paragraph({
    spacing: { before: i === 0 ? 100 : 0, after: i === lines.length - 1 ? 160 : 0 },
    shading: { type: ShadingType.CLEAR, fill: "F2F2F2" },
    indent: { left: 220 }, keepLines: true,
    children: [new TextRun({ text: l === "" ? " " : l, font: MONO, size: 19 })]
  }));
}

const h1 = (t) => new Paragraph({
  heading: HeadingLevel.HEADING_1, spacing: { before: 360, after: 160 }, keepNext: true,
  children: [(() => {
      const trouve = CODE_EXERCICE.exec(t);
      const morceau = new TextRun({ text: typo(t), bold: true, size: 30, color: ACCENT });
      return trouve
        ? new Bookmark({ id: ancre(trouve[0]), children: [morceau] })
        : morceau;
    })()]
});

const h2 = (t) => new Paragraph({
  heading: HeadingLevel.HEADING_2, spacing: { before: 240, after: 100 }, keepNext: true,
  children: [new TextRun({ text: typo(t), bold: true, size: 24, color: GREY })]
});

function cell(text, o = {}) {
  return new TableCell({
    width: { size: o.width, type: WidthType.DXA },
    shading: o.fill ? { type: ShadingType.CLEAR, fill: o.fill } : undefined,
    columnSpan: o.span,
    margins: { top: 55, bottom: 55, left: 100, right: 100 },
    children: [new Paragraph({
      spacing: { after: 0 },
      children: [new TextRun({ text: typo(text), bold: o.bold, size: o.mono ? 18 : 20, font: o.mono ? MONO : undefined })]
    })]
  });
}

function tableau(entetes, lignes, largeurs, monoCols) {
  const w = largeurs || [2200, 3400, 3760];
  const mono = monoCols === undefined ? [0, 1] : monoCols;
  return new Table({
    columnWidths: w, width: { size: W, type: WidthType.DXA },
    rows: [
      new TableRow({
        tableHeader: true,
        children: entetes.map((e, i) => cell(e, { bold: true, width: w[i], fill: "DEEAF6" }))
      }),
      ...lignes.map(r => new TableRow({
        cantSplit: true,
        children: r.map((val, i) => (i === 0 && CODE_EXERCICE.test(String(val)))
          ? celluleLien(String(val), w[0])
          : cell(val, { width: w[i], mono: mono.includes(i) }))
      }))
    ]
  });
}

function encadre(lignes, couleur) {
  return new Table({
    columnWidths: [W], width: { size: W, type: WidthType.DXA },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 2, color: "A6A6A6" },
      bottom: { style: BorderStyle.SINGLE, size: 2, color: "A6A6A6" },
      left: { style: BorderStyle.SINGLE, size: 12, color: couleur || ACCENT },
      right: { style: BorderStyle.SINGLE, size: 2, color: "A6A6A6" },
      insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE }
    },
    rows: [new TableRow({
      cantSplit: true,
      children: [new TableCell({
        width: { size: W, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: "F7F9FC" },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: lignes.map((t, i) => new Paragraph({
          spacing: { after: i === lignes.length - 1 ? 0 : 80 },
          children: morceaux(Array.isArray(t) ? t : [t])
        }))
      })]
    })]
  });
}

const verif = (l) => encadre(l);
const saut = () => new Paragraph({ children: [new PageBreak()] });

// Page de garde et introduction : celles de la boite commune, pour que
// le logo, l'encadre gris et la structure des exercices soient les memes
// dans tous les fascicules (16/10/2026).
const { couverture, modeEmploi } = require(__dirname + "/boite.js");

function doc(children, titre) {
  return new Document({
    creator: "Frédéric Ferrant — EPHEC", title: titre,
    numbering: {
      config: [{
        reference: "puces",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: convertInchesToTwip(0.3), hanging: convertInchesToTwip(0.18) } } }
        }]
      }]
    },
    sections: [{
      properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
      children
    }]
  });
}

// =====================================================================
//  TAB
// =====================================================================
const tab = [];
couverture(tab, "TAB", "Tableaux, boucles et opérateur ternaire",
  "Ranger des données quand on sait déjà combien il y en a");

modeEmploi(tab, "TAB", [
  ["TAB.1", "be.ephec.java.tab.e01", "Une matrice carrée"],
  ["TAB.2", "be.ephec.java.tab.e02", "Le triangle de Pascal"],
  ["TAB.3", "be.ephec.java.tab.e03", "L'opérateur ternaire"],
  ["TAB.4", "be.ephec.java.tab.e04", "Des objets qui se connaissent"]
]);

tab.push(h2("Ce qu'il faut avoir en tête"));
tab.push(runs([
  "Un tableau a une taille ",
  { t: "fixe", i: true },
  ", décidée au moment du ",
  { t: "new", code: true },
  " et jamais modifiable ensuite. C'est sa limite, et c'est aussi ce qui le rend simple et rapide. Les collections, qui grandissent toutes seules, viendront au thème ",
  { t: "COL", code: true },
  "."
]));
tab.push(...code([
  "int[]   nombres = new int[5];              // 5 cases, toutes a 0",
  "String[] mots   = { \"Hello\", \"world\" };     // 2 cases, deja remplies",
  "",
  "int[][] matrice = new int[3][3];           // un tableau DE TABLEAUX",
  "matrice[1]                                 // la deuxieme ligne, un int[]",
  "matrice[1][2]                              // la troisieme case de cette ligne"
]));
tab.push(runs([
  { t: "Retenez surtout la dernière ligne du bloc. ", b: true },
  "Un tableau à deux dimensions n'existe pas vraiment en Java : c'est un tableau dont chaque case contient un autre tableau. Cela a une conséquence que ",
  { t: "TAB.2", code: true },
  " exploite — les lignes n'ont pas toutes à faire la même longueur."
]));
tab.push(saut());

// --- TAB.1
tab.push(h1("TAB.1 — Une matrice carrée"));
tab.push(p("Package : be.ephec.java.tab.e01", { italic: true, color: GREY }));
tab.push(h2("Objectif"));
tab.push(p("Parcourir un tableau à deux dimensions, et séparer une bonne fois le calcul de l'affichage."));
tab.push(h2("Énoncé"));
tab.push(runs([
  "Écrivez la classe ",
  { t: "Matrice", code: true },
  ", qui expose deux méthodes statiques. Aucune des deux n'affiche quoi que ce soit."
]));
tab.push(tableau(["Élément", "Signature", "Rôle"], [
  ["carree", "public static int[][] carree(int n)", "Une matrice n×n remplie de 1 à n², ligne par ligne"],
  ["enTexte", "public static String enTexte(int[][])", "La matrice sous forme de texte"]
], [2000, 4000, 3360]));
tab.push(runs([
  "Le format d'",
  { t: "enTexte", code: true },
  " est imposé, parce que le test le vérifie au caractère près : les valeurs d'une même ligne séparées par une espace, les lignes séparées par un retour à la ligne, et pas de retour à la ligne à la fin."
]));
tab.push(...code([
  "carree(3)              ->  { {1,2,3}, {4,5,6}, {7,8,9} }",
  "enTexte(carree(3))     ->  \"1 2 3\\n4 5 6\\n7 8 9\"",
  "carree(0)              ->  un tableau vide"
]));
tab.push(runs([
  "Écrivez ensuite le ",
  { t: "Programme", code: true },
  " : il annonce ce qu'il fait, demande n à l'utilisateur, et affiche la matrice. Il ne devrait lui rester qu'une seule instruction d'affichage."
]));
tab.push(p("Une ligne d'annonce suffit — « Ce programme génère une matrice carrée contenant les chiffres de 1 à n². » Sans elle, l'utilisateur voit surgir une question sans savoir ce qu'on attend de lui."));
tab.push(h2("Comment vérifier votre code"));
tab.push(verif([
  { t: "be.ephec.java.tab.e01.MatriceTest", code: true },
  { t: "Vérifie les matrices 1×1, 3×3 et 4×4, le cas d'une taille nulle, et le format exact rendu par enTexte." }
]));
tab.push(h2("Questions à se poser"));
tab.push(bullet("Vous avez deux boucles imbriquées et un seul compteur qui avance de 1 à n². Où faut-il le déclarer, et pourquoi pas à l'intérieur de la boucle ?"));
tab.push(bullet("Le séparateur ne doit pas apparaître avant le premier élément ni après le dernier. Est-il plus simple de le placer avant chaque élément sauf le premier, ou après chaque élément sauf le dernier ?"));
tab.push(bullet("Que se passerait-il si enTexte affichait au lieu de rendre une chaîne ? Le test serait-il encore possible ?"));
tab.push(saut());

// --- TAB.2
tab.push(h1("TAB.2 — Le triangle de Pascal"));
tab.push(p("Package : be.ephec.java.tab.e02", { italic: true, color: GREY }));
tab.push(h2("Objectif"));
tab.push(p("Construire un tableau à deux dimensions dont les lignes n'ont pas toutes la même longueur."));
tab.push(h2("Contexte"));
tab.push(runs([
  "Le triangle de Pascal donne les coefficients du binôme de Newton, c'est-à-dire du développement de ",
  { t: "(a + b)", code: true },
  " élevé à une puissance. Chaque nombre y est la somme des deux qui le surplombent, et les bords valent 1."
]));
tab.push(...code([
  "                1                 (a+b)^0",
  "              1   1               (a+b)^1  =  a + b",
  "            1   2   1             (a+b)^2  =  a2 + 2ab + b2",
  "          1   3   3   1           (a+b)^3",
  "        1   4   6   4   1         (a+b)^4"
]));
tab.push(h2("Énoncé"));
tab.push(runs([
  "Écrivez la classe ",
  { t: "Pascal", code: true },
  " avec une méthode ",
  { t: "public static int[][] triangle(int n)", code: true },
  " qui rend le triangle jusqu'à la ligne n comprise."
]));
tab.push(runs([
  { t: "Le tableau rendu n'est pas rectangulaire. ", b: true },
  "La ligne d'indice ",
  { t: "i", code: true },
  " contient ",
  { t: "i + 1", code: true },
  " nombres. Vous déclarerez donc ",
  { t: "new int[n][]", code: true },
  " — le nombre de lignes seulement — puis vous créerez chaque ligne à sa propre taille."
]));
tab.push(runs([
  "Écrivez ensuite le ",
  { t: "Programme", code: true },
  " : il annonce ce qu'il fait, demande n, puis affiche le triangle en utilisant ",
  { t: "deux boucles for-each imbriquées", b: true },
  ". La première parcourt des ",
  { t: "int[]", code: true },
  ", la seconde des ",
  { t: "int", code: true },
  "."
]));
tab.push(p("Une ligne d'annonce suffit — « Ce programme calcule un triangle de Pascal dont vous spécifiez la taille. » Sans elle, l'utilisateur voit surgir une question sans savoir ce qu'on attend de lui."));
tab.push(h2("Comment vérifier votre code"));
tab.push(verif([
  { t: "be.ephec.java.tab.e02.PascalTest", code: true },
  { t: "Vérifie le triangle à cinq lignes, la longueur de chaque ligne, la règle de construction sur l'ensemble du triangle, et le cas de zéro ligne." }
]));
tab.push(h2("Questions à se poser"));
tab.push(bullet("Les deux bords valent 1. Pour la première ligne, les deux instructions qui les posent écrivent dans la même case. Est-ce un problème ?"));
tab.push(bullet("La boucle qui remplit l'intérieur d'une ligne ne tourne pas du tout pour les deux premières lignes. Pourquoi, et est-ce voulu ?"));
tab.push(bullet("Une boucle for-each permet-elle de modifier le tableau qu'elle parcourt ? Essayez, et regardez ce que dit le compilateur."));
tab.push(saut());

// --- TAB.3
tab.push(h1("TAB.3 — L'opérateur ternaire"));
tab.push(p("Package : be.ephec.java.tab.e03", { italic: true, color: GREY }));
tab.push(h2("Objectif"));
tab.push(p("Écrire en une instruction ce qui en demanderait cinq avec un if, et comprendre où s'arrête l'intérêt de le faire."));
tab.push(h2("Contexte"));
tab.push(...code([
  "condition ? valeurSiVrai : valeurSiFaux",
  "",
  "public int max(int a, int b) {",
  "    return a > b ? a : b;",
  "}"
]));
tab.push(runs([
  { t: "La différence essentielle avec le if : le ternaire rend une valeur. ", b: true },
  "On peut donc le placer à droite d'un ",
  { t: "return", code: true },
  " ou d'une affectation, ce qu'un ",
  { t: "if", code: true },
  " ne permet pas."
]));
tab.push(h2("Énoncé"));
tab.push(runs([
  "Le package contient un petit jeu de dés, fourni et fonctionnel à deux méthodes près. Deux joueurs lancent un dé à tour de rôle ; celui qui fait le plus grand nombre marque un point, jusqu'à ce que l'un atteigne le maximum."
]));
tab.push(p("Complétez les deux méthodes suivantes. Chacune tient en UNE instruction, avec un opérateur ternaire."));
tab.push(tableau(["Élément", "Signature", "Rôle"], [
  ["meilleur", "public static Player meilleur(Player, Player)", "Celui qui a le plus de points ; en cas d'égalité, le premier"],
  ["gagnantDuTour", "public static Player gagnantDuTour(Player, int, Player, int)", "Celui qui a fait le plus grand nombre ; en cas d'égalité, le premier"]
], [2200, 4200, 2960]));
tab.push(runs([
  { t: "Remarquez que ces deux méthodes ne lancent aucun dé. ", b: true },
  "Elles reçoivent les résultats en paramètres. C'est ce qui les rend prévisibles — et donc testables, alors qu'une méthode qui tire au hasard ne le serait pas. Vous retrouverez cette idée au thème ",
  { t: "JUN", code: true },
  "."
]));
tab.push(h2("Comment vérifier votre code"));
tab.push(verif([
  { t: "be.ephec.java.tab.e03.GameTest", code: true },
  { t: "Vérifie les deux méthodes, y compris les cas d'égalité — qui doivent rendre le premier joueur. Lancez ensuite le Programme : il joue une vraie partie." }
]));
tab.push(h2("Questions à se poser"));
tab.push(bullet("Attention au sens de la comparaison : selon la façon dont vous l'écrivez, l'égalité tombe du côté du premier ou du second joueur. Le test le vérifie."));
tab.push(bullet("Le ternaire peut s'imbriquer : a ? x : (b ? y : z). Écrivez une fois un ternaire à trois niveaux, relisez-le, et décidez si vous le garderiez."));
tab.push(bulletRuns([
  "Le mémento Clean Code n'interdit pas le ternaire, mais ",
  { t: "CC-MET.2", code: true },
  " demande des méthodes courtes et lisibles. Où placez-vous la limite ?"
]));
tab.push(saut());

// --- TAB.4
tab.push(h1("TAB.4 — Des objets qui se connaissent"));
tab.push(p("Package : be.ephec.java.tab.e04", { italic: true, color: GREY }));
tab.push(h2("Objectif"));
tab.push(p("Faire collaborer plusieurs classes, et ranger des objets dans un tableau de taille fixe."));
tab.push(h2("Contexte"));
tab.push(p("Un concessionnaire vend des voitures. Chaque vente porte sur une voiture, à un prix catalogue, avec une réduction. Un vendeur conserve la trace de ses ventes."));
tab.push(...code([
  "  Person  <---[1]---  Vendor  ---[*]--->  Sale  ---[1]--->  Car"
]));
tab.push(h2("Énoncé"));
tab.push(tableau(["Classe", "Ce qu'elle porte", "Méthodes à écrire"], [
  ["Car", "marque, modèle, numéro de série — tous final", "les trois accesseurs"],
  ["Sale", "une voiture, un prix catalogue, une réduction", "prixReel(), enTexte()"],
  ["Vendor", "une personne, un tableau de ventes", "enregistrer(), nombreDeVentes(), chiffreDAffaires()"]
], [1600, 4000, 3760], [0]));
tab.push(runs([
  { t: "Le prix réel ne se stocke pas. ", b: true },
  "Il se déduit du prix catalogue et de la réduction. En faire un champ créerait une donnée redondante qui pourrait se désynchroniser — c'est exactement le problème du champ ",
  { t: "age", code: true },
  " rencontré en ",
  { t: "POO.3", code: true },
  "."
]));
tab.push(runs([
  "Le format d'",
  { t: "enTexte", code: true },
  " est imposé :"
]));
tab.push(...code([
  "\"Renault Clio [VF123] : 20000.0 -> 18000.0\""
]));
tab.push(h2("Le tableau de ventes"));
tab.push(runs([
  "Un vendeur enregistre au plus ",
  { t: "Vendor.MAX_VENTES", code: true },
  " ventes, dans un tableau. Un tableau ne grandit pas : sa taille est décidée à la construction. Vous devrez donc retenir vous-même combien de cases sont réellement occupées."
]));
tab.push(runs([
  { t: "enregistrer", code: true },
  " rend ",
  { t: "true", code: true },
  " si la vente a pu être ajoutée, ",
  { t: "false", code: true },
  " si le tableau est plein."
]));
tab.push(h2("Comment vérifier votre code"));
tab.push(verif([
  { t: "be.ephec.java.tab.e04.VenteTest", code: true },
  { t: "Vérifie la voiture, le calcul du prix réel avec et sans réduction, le format exact d'enTexte, l'accumulation des ventes et du chiffre d'affaires, et le refus de la onzième vente." }
]));
tab.push(h2("Questions à se poser"));
tab.push(bulletRuns([
  "La boucle de ",
  { t: "chiffreDAffaires", code: true },
  " doit-elle aller jusqu'à ",
  { t: "ventes.length", code: true },
  " ou jusqu'au nombre de ventes enregistrées ? Essayez la première version et regardez ce qui se passe."
]));
tab.push(bulletRuns([
  { t: "Sale", code: true },
  " a besoin de la marque et du modèle pour son texte. Vaut-il mieux qu'elle lise les champs de la voiture, ou qu'elle les lui demande ? Voir ",
  { t: "CC-OBJ.1", code: true },
  " du mémento Clean Code."
]));
tab.push(bulletRuns([
  "Faut-il un accesseur qui rende le tableau de ventes ? Que pourrait alors en faire l'appelant ? Voir ",
  { t: "CC-OBJ.2", code: true },
  "."
]));
tab.push(encadre([
  [{ t: "Une remarque sur le vendeur", b: true }],
  ["Un Vendor possède une Person : c'est un champ, comme un autre. Le vendeur est vu ici comme un rôle que joue une personne. On aurait pu écrire, tout aussi légitimement, qu'un vendeur EST une personne : c'est l'héritage, que vous connaissez par le C#. Les deux modèles se défendent ; celui-ci permettrait à la même personne de jouer d'autres rôles, d'être cliente par exemple, sans changer de classe."],
  ["Le thème ABS compare les deux approches sur cet exemple."]
]));

// =====================================================================
//  ENU
// =====================================================================
const enu = [];
couverture(enu, "ENU", "Énumérations et records",
  "Quand les valeurs possibles se comptent, et quand une donnée n'est qu'une donnée");

modeEmploi(enu, "ENU", [
  ["ENU.1", "be.ephec.java.enu.e01", "Un feu de signalisation"],
  ["ENU.2", "be.ephec.java.enu.e02", "Une température, deux unités"],
  ["ENU.3", "be.ephec.java.enu.e03", "Un jeu de cartes"],
  ["ENU.4", "be.ephec.java.enu.e04", "Un record d'étudiant"]
]);

enu.push(h2("L'énumération en deux minutes"));
enu.push(p("Une enum est une classe dont on énumère à l'avance toutes les valeurs possibles. Il n'en existera jamais d'autres, et le compilateur le sait."));
enu.push(...code([
  "public enum DayOfWeek { MONDAY, TUESDAY, WEDNESDAY }",
  "",
  "DayOfWeek jour = DayOfWeek.TUESDAY;",
  "jour.ordinal()          // 1 : la position dans la declaration",
  "jour.name()             // \"TUESDAY\"",
  "DayOfWeek.values()      // un tableau des trois valeurs, dans l'ordre",
  "DayOfWeek.valueOf(\"MONDAY\")   // retrouve une constante par son nom"
]));
enu.push(runs([
  { t: "L'ordre de déclaration compte. ", b: true },
  "C'est celui que rendent ",
  { t: "ordinal()", code: true },
  " et ",
  { t: "values()", code: true },
  ", et ",
  { t: "ENU.1", code: true },
  " s'en sert pour calculer une couleur suivante sans écrire une seule condition."
]));
enu.push(runs([
  { t: "Une enum est une classe. ", b: true },
  "Elle peut donc porter des champs, un constructeur et des méthodes, ce qu'",
  { t: "ENU.3", code: true },
  " met en œuvre."
]));
enu.push(saut());

// --- ENU.1
enu.push(h1("ENU.1 — Un feu de signalisation"));
enu.push(p("Package : be.ephec.java.enu.e01", { italic: true, color: GREY }));
enu.push(h2("Objectif"));
enu.push(p("Déclarer une énumération, et découvrir que l'ordre des constantes peut remplacer une cascade de conditions."));
enu.push(h2("Énoncé"));
enu.push(runs([
  "Écrivez l'énumération ",
  { t: "CouleurDeFeu", code: true },
  " avec trois constantes : ",
  { t: "VERT", code: true },
  ", ",
  { t: "ORANGE", code: true },
  ", ",
  { t: "ROUGE", code: true },
  " — dans cet ordre, qui est celui du cycle."
]));
enu.push(runs([
  "Écrivez ensuite la classe ",
  { t: "FeuDeSignalisation", code: true },
  ". Un feu a une couleur et un état."
]));
enu.push(tableau(["Élément", "Signature", "Rôle"], [
  ["constructeur", "public FeuDeSignalisation()", "Un feu neuf est inactif, donc orange"],
  ["desactive", "public void desactive()", "Inactif et orange ; ne changera plus de couleur"],
  ["active", "public void active()", "Actif et rouge"],
  ["changeDeCouleur", "public void changeDeCouleur()", "VERT → ORANGE → ROUGE → VERT ; sans effet si inactif"],
  ["getCouleur", "public CouleurDeFeu getCouleur()", "La couleur actuelle"],
  ["estActif", "public boolean estActif()", "L'état actuel"],
  ["enTexte", "public String enTexte()", "« ROUGE (actif) » ou « ORANGE (inactif) »"]
], [2200, 3600, 3560]));
enu.push(runs([
  "Écrivez enfin le ",
  { t: "Programme", code: true },
  " : créez un feu, tentez de le faire changer alors qu'il est inactif, activez-le, faites-le changer plusieurs fois, puis désactivez-le."
]));
enu.push(h2("Comment vérifier votre code"));
enu.push(verif([
  { t: "be.ephec.java.enu.e01.FeuDeSignalisationTest", code: true },
  { t: "Vérifie l'ordre des trois constantes, l'état d'un feu neuf, l'immobilité d'un feu inactif, le cycle complet des couleurs et le format d'enTexte." }
]));
enu.push(h2("Questions à se poser"));
enu.push(bullet("Le constructeur doit mettre le feu dans le même état que desactive(). Faut-il recopier les instructions, ou appeler la méthode ?"));
enu.push(bulletRuns([
  { t: "Le vrai enjeu de l'exercice. ", b: true },
  "Vous pouvez écrire changeDeCouleur avec trois ",
  { t: "if", code: true },
  " ou un ",
  { t: "switch", code: true },
  ". Vous pouvez aussi ne rien tester du tout, en vous servant de ",
  { t: "values()", code: true },
  ", d'",
  { t: "ordinal()", code: true },
  " et du reste de la division par 3. Écrivez les deux, et comparez ce qui se passerait si le feu comptait une quatrième couleur."
]));
enu.push(bulletRuns([
  "Comparez avec trois constantes int valant 0, 1 et 2. Qu'est-ce qu'une énumération empêche d'écrire qu'un int autoriserait ? Voir ",
  { t: "CC-NOM.7", code: true },
  " et ",
  { t: "CC-NOM.4", code: true },
  "."
]));
enu.push(saut());

// --- ENU.2
enu.push(h1("ENU.2 — Une température, deux unités"));
enu.push(p("Package : be.ephec.java.enu.e02", { italic: true, color: GREY }));
enu.push(h2("Objectif"));
enu.push(p("Se servir d'une énumération comme paramètre, et retomber sur la question de la donnée redondante."));
enu.push(h2("Énoncé"));
enu.push(runs([
  "Écrivez l'énumération ",
  { t: "TemperatureUnit", code: true },
  " avec ",
  { t: "CELSIUS", code: true },
  " et ",
  { t: "FAHRENHEIT", code: true },
  ", puis la classe ",
  { t: "Temperature", code: true },
  "."
]));
enu.push(tableau(["Élément", "Signature", "Rôle"], [
  ["constructeur", "public Temperature(double, TemperatureUnit)", "La valeur, et l'unité dans laquelle elle est exprimée"],
  ["getValue", "public double getValue(TemperatureUnit)", "La température dans l'unité demandée"],
  ["setValue", "public void setValue(double, TemperatureUnit)", "Remplace la température"]
], [2000, 4200, 3160]));
enu.push(h2("Les formules"));
enu.push(...code([
  "Celsius     vers Fahrenheit :  f = c * 9 / 5 + 32       (10 C  ->   50 F)",
  "Fahrenheit  vers Celsius    :  c = (f - 32) * 5 / 9     (23 F  ->   -5 C)"
]));
enu.push(encadre([
  [{ t: "Le piège", b: true }],
  ["Si vos conversions rendent des valeurs fausses, regardez le type des opérations. 9 / 5 vaut 1 en Java, parce que ce sont deux entiers et que la division entière tronque. Il suffit qu'un seul des opérandes soit un double pour que le calcul devienne décimal."],
  ["Le message d'échec du test vous le rappellera, mais autant le savoir avant."]
]));
enu.push(h2("Comment vérifier votre code"));
enu.push(verif([
  { t: "be.ephec.java.enu.e02.TemperatureTest", code: true },
  { t: "Vérifie les deux conversions du cours, les repères classiques — 0 °C, l'ébullition, et −40 qui est la seule température identique dans les deux unités — et le comportement de setValue." }
]));
enu.push(h2("Questions à se poser"));
enu.push(bullet("Combien de valeurs votre objet stocke-t-il ? Si vous en gardez deux, une en Celsius et une en Fahrenheit, que se passe-t-il si l'une est modifiée et pas l'autre ?"));
enu.push(bullet("Vous avez choisi une unité de référence pour le stockage. Un utilisateur de la classe peut-il savoir laquelle ? Est-ce souhaitable ?"));
enu.push(bulletRuns([
  "L'énumération pourrait porter elle-même les conversions, puisqu'une enum est une classe. Ce serait-il mieux ? Vous aurez les moyens de trancher après ",
  { t: "ENU.3", code: true },
  "."
]));
enu.push(bulletRuns([
  "Les deux méthodes de conversion portent des noms opposés. Le vocabulaire reste-t-il cohérent d'une méthode à l'autre ? Voir ",
  { t: "CC-MET.4", code: true },
  "."
]));
enu.push(saut());

// --- ENU.3
enu.push(h1("ENU.3 — Un jeu de cartes"));
enu.push(p("Package : be.ephec.java.enu.e03", { italic: true, color: GREY }));
enu.push(h2("Objectif"));
enu.push(p("Donner à une énumération un constructeur et des méthodes, et construire un tableau à partir de deux énumérations."));
enu.push(h2("Une enum est une classe"));
enu.push(p("Elle peut donc porter un champ, un constructeur et des méthodes. Chaque constante énumérée passe ses arguments à ce constructeur."));
enu.push(...code([
  "public enum Discount {",
  "    BASIC(0.05), FIDELITY(0.075), SPECIAL(0.10);",
  "",
  "    private final double taux;",
  "",
  "    Discount(double taux) { this.taux = taux; }",
  "",
  "    public double appliquer(double prix) { return prix * (1 - taux); }",
  "}"
]));
enu.push(p("Trois détails de syntaxe : la liste des constantes se termine par un point-virgule dès qu'il y a autre chose après elle, le constructeur est implicitement privé — on ne peut pas faire de new sur une enum — et le champ est final."));
enu.push(h2("Énoncé"));
enu.push(runs([
  "Écrivez ",
  { t: "Color", code: true },
  " et ",
  { t: "Value", code: true },
  ", deux énumérations dont chaque constante porte son libellé français : ",
  { t: "PIQUE", code: true },
  " porte « Pique », ",
  { t: "AS", code: true },
  " porte « As », ",
  { t: "DIX", code: true },
  " porte « 10 ». Les valeurs se déclarent dans l'ordre du jeu, de l'as au roi."
]));
enu.push(runs([
  "Écrivez ensuite ",
  { t: "Card", code: true },
  ", dont le ",
  { t: "toString", code: true },
  " rend « As de Pique » ou « Roi de Trèfle », puis ",
  { t: "Deck", code: true },
  " :"
]));
enu.push(bulletRuns([
  "son constructeur crée les 52 cartes. Servez-vous de ",
  { t: "Color.values()", code: true },
  " et ",
  { t: "Value.values()", code: true },
  " : deux boucles for-each imbriquées suffisent, et le nombre 52 n'a pas à apparaître dans votre calcul ;"
]));
enu.push(bulletRuns([
  { t: "carteA(int)", code: true },
  " rend la carte à une position ;"
]));
enu.push(bulletRuns([
  { t: "shuffle()", code: true },
  " mélange le paquet. Une façon de faire : parcourir le tableau de la fin vers le début et, à chaque étape, échanger la carte courante avec une carte tirée au hasard parmi celles qui la précèdent — ",
  { t: "hasard.nextInt(i + 1)", code: true },
  "."
]));
enu.push(h2("Le programme"));
enu.push(runs([
  "Créez un jeu, affichez les 52 cartes ",
  { t: "à la suite", b: true },
  " et séparées par des virgules — et non une par ligne. Mélangez, puis affichez-les à nouveau."
]));
enu.push(runs([
  { t: "Le piège est le séparateur. ", b: true },
  "Où placer la virgule sans en laisser une à la fin ? On s'en tire d'ordinaire par un test sur l'indice, qui encombre la boucle. Cherchez ",
  { t: "StringJoiner", code: true },
  " dans la documentation : on lui donne le séparateur, on ajoute les éléments, et il les place ",
  { t: "entre", i: true },
  " eux."
]));
enu.push(p("Le gain n'est pas la longueur du code, c'est qu'il n'y a plus de condition à lire — donc plus d'endroit où se tromper."));
enu.push(h2("Comment vérifier votre code"));
enu.push(verif([
  { t: "be.ephec.java.enu.e03.DeckTest", code: true },
  { t: "Vérifie la taille des deux énumérations, les libellés, le texte des cartes, la présence de 52 cartes toutes différentes, et que le mélange ne perd ni ne duplique aucune carte tout en changeant réellement l'ordre." }
]));
enu.push(h2("Questions à se poser"));
enu.push(bullet("La carte ne sait pas comment s'écrit une couleur en français : elle le demande à l'énumération. Où aurait-il fallu mettre cette information si Color n'avait pas pu porter de champ ?"));
enu.push(bulletRuns([
  "Pourquoi ",
  { t: "nextInt(i + 1)", code: true },
  " et non ",
  { t: "nextInt(52)", code: true },
  " ? Les deux mélangent, mais un seul le fait équitablement. Cherchez « mélange de Fisher-Yates » si la question vous intéresse."
]));
enu.push(bullet("Deux cartes « As de Pique » construites séparément sont-elles égales ? Testez avec ==, et gardez la question de côté : elle reviendra."));
enu.push(bulletRuns([
  "L'ordre de déclaration des valeurs décide du résultat de compareTo. Est-ce visible en lisant la classe, ou faut-il le deviner ? Voir ",
  { t: "CC-COM.3", code: true },
  " sur ce qu'une Javadoc doit apporter."
]));
enu.push(saut());

// --- ENU.4
enu.push(h1("ENU.4 — Un record d'étudiant"));
enu.push(p("Package : be.ephec.java.enu.e04", { italic: true, color: GREY }));
enu.push(h2("Objectif"));
enu.push(p("Écrire en une ligne ce qui en demanderait trente, et savoir quand ce n'est pas approprié."));
enu.push(h2("Contexte"));
enu.push(p("Un record modélise une donnée simple et immuable. Le compilateur écrit pour vous le constructeur, les accesseurs, toString, equals et hashCode."));
enu.push(...code([
  "public record Point(int x, int y) { }",
  "",
  "Point origine = new Point(0, 0);",
  "origine.x()          // l'accesseur s'appelle x(), pas getX()",
  "origine.toString()   // \"Point[x=0, y=0]\", genere par le compilateur"
]));
enu.push(runs([
  { t: "Un record est final et ses composants aussi. ", b: true },
  "Rien ne peut en hériter, et rien ne peut être modifié après construction. C'est ce qui le rend adapté à une donnée, et inadapté dès qu'un objet porte une logique métier ou doit changer d'état."
]));
enu.push(h2("Énoncé"));
enu.push(runs([
  "L'en-tête du record ",
  { t: "Student", code: true },
  " vous est fourni : un nom (",
  { t: "String", code: true },
  ") et une cote (",
  { t: "int", code: true },
  "), dans cet ordre. Regardez-le bien — cette seule ligne suffit au compilateur pour écrire le constructeur, les accesseurs, ",
  { t: "toString", code: true },
  ", ",
  { t: "equals", code: true },
  " et ",
  { t: "hashCode", code: true },
  "."
]));
enu.push(runs([
  "Votre part commence à ",
  { t: "passe()", code: true },
  ", qui rend ",
  { t: "true", code: true },
  " si la cote atteint 10."
]));
enu.push(runs([
  "Écrivez ensuite le ",
  { t: "Programme", code: true },
  " : créez un ",
  { t: "tableau", b: true },
  " d'étudiants et affichez chacun d'eux suivi de « reussi » ou « echec »."
]));
enu.push(h2("Comment vérifier votre code"));
enu.push(verif([
  { t: "be.ephec.java.enu.e04.StudentTest", code: true },
  { t: "Les trois premiers tests vérifient le travail du COMPILATEUR : les deux composants et leur ordre, les accesseurs sans préfixe get, le toString et le equals générés. Vous n'avez rien écrit de tout cela." },
  { t: "Le dernier vérifie le vôtre : la limite de réussite à 10." }
]));
enu.push(h2("Questions à se poser"));
enu.push(bullet("Écrivez la même chose sous forme de classe ordinaire, avec ses champs, son constructeur, ses accesseurs et son toString. Combien de lignes ?"));
enu.push(bullet("Rien n'empêche de construire un Student avec une cote de 47. Où placeriez-vous une vérification, et qu'est-ce qui devrait se produire ? Vous aurez la réponse au thème EXC."));
enu.push(bulletRuns([
  { t: "passe()", code: true },
  " n'est ni un champ ni un accesseur : c'est un calcul. Pourquoi ne pas stocker un booléen ",
  { t: "reussi", code: true },
  " dans le record ? Voir ",
  { t: "POO.3", code: true },
  "."
]));

// ---------------------------------------------------------------------
enu.push(h2("Ce que vous verrez en lançant les tests"));
enu.push(runs([
  { t: "Quatre des cinq tests seront verts avant que vous n'écriviez une ligne. ", b: true },
  "Ce n'est pas une panne, et c'est même toute la démonstration de l'exercice."
]));
enu.push(p("Trois d'entre eux vérifient les accesseurs, le toString et le equals. Vous ne les avez pas écrits : le compilateur les a écrits, parce que vous avez déclaré un record. Les voir passer, c'est constater de ses yeux ce qu'une seule ligne de déclaration vous a évité."));
enu.push(runs([
  "Le quatrième mesure la forme du record. Seul le cinquième est rouge, et il porte sur la seule chose que le compilateur ne pouvait pas deviner : ",
  { t: "passe()", code: true },
  ", la règle de réussite."
]));
enu.push(runs([
  { t: "Écrivez la même classe sans record, pour comparer. ", b: true },
  "Deux champs, un constructeur, deux accesseurs, un toString, un equals, un hashCode. Comptez les lignes, puis relisez la déclaration du record."
]));

enu.push(bulletRuns([
  "Un record ne fournit ni setter ni constructeur vide. Qu'est-ce que cela vous interdit, et pourquoi est-ce souhaitable ici ? Voir ",
  { t: "CC-OBJ.2", code: true },
  "."
]));

Packer.toBuffer(doc(tab, "Exercices Java — Thème TAB")).then(b => {
  fs.writeFileSync(__dirname + "/../../enonces/TAB_enonces.docx", b);
  console.log("TAB :", Math.round(b.length / 1024), "Ko");
});
Packer.toBuffer(doc(enu, "Exercices Java — Thème ENU")).then(b => {
  fs.writeFileSync(__dirname + "/../../enonces/ENU_enonces.docx", b);
  console.log("ENU :", Math.round(b.length / 1024), "Ko");
});
