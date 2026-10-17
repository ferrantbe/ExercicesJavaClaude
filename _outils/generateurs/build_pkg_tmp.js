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

function parts(list) {
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

function runs(list, o = {}) {
  return new Paragraph({ spacing: { after: o.after === undefined ? 120 : o.after }, children: parts(list) });
}

function bullet(text) {
  return new Paragraph({
    numbering: { reference: "puces", level: 0 },
    spacing: { after: 60 },
    children: [new TextRun({ text, size: 22 })]
  });
}

function bulletRuns(list) {
  return new Paragraph({
    numbering: { reference: "puces", level: 0 },
    spacing: { after: 60 },
    children: parts(list)
  });
}

function code(lines) {
  return lines.map((l, i) => new Paragraph({
    spacing: { before: i === 0 ? 100 : 0, after: i === lines.length - 1 ? 160 : 0 },
    shading: { type: ShadingType.CLEAR, fill: "F2F2F2" },
    indent: { left: 220 },
    keepLines: true,
    children: [new TextRun({ text: l === "" ? " " : l, font: MONO, size: 19 })]
  }));
}

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1, spacing: { before: 360, after: 160 }, keepNext: true,
    children: [(() => {
      const trouve = CODE_EXERCICE.exec(text);
      const morceau = new TextRun({ text: typo(text), bold: true, size: 30, color: ACCENT });
      return trouve
        ? new Bookmark({ id: ancre(trouve[0]), children: [morceau] })
        : morceau;
    })()]
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2, spacing: { before: 240, after: 100 }, keepNext: true,
    children: [new TextRun({ text, bold: true, size: 24, color: GREY })]
  });
}

function cell(text, o = {}) {
  return new TableCell({
    width: { size: o.width, type: WidthType.DXA },
    shading: o.fill ? { type: ShadingType.CLEAR, fill: o.fill } : undefined,
    columnSpan: o.span,
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    children: [new Paragraph({
      spacing: { after: 0 },
      children: [new TextRun({ text: typo(text), bold: o.bold, size: o.mono ? 18 : 20, font: o.mono ? MONO : undefined })]
    })]
  });
}

function table3(entetes, lignes, largeurs) {
  const w = largeurs || [2200, 3400, 3760];
  const header = new TableRow({
    tableHeader: true,
    children: entetes.length === 1
      ? [cell(entetes[0], { bold: true, width: W, span: 3, fill: "DEEAF6" })]
      : entetes.map((e, i) => cell(e, { bold: true, width: w[i], fill: "DEEAF6" }))
  });
  const body = lignes.map(r => new TableRow({
    cantSplit: true,
    children: r.map((v, i) => (i === 0 && CODE_EXERCICE.test(String(v)))
      ? celluleLien(String(v), w[0])
      : cell(v, { width: w[i], mono: i < (r.mono === undefined ? 2 : r.mono) }))
  }));
  return new Table({ columnWidths: w, width: { size: W, type: WidthType.DXA }, rows: [header, ...body] });
}

// Celui de la boite commune : il sait afficher les paires « appel /
// resultat », que la copie locale perdait (17/10/2026).
const verif = require(__dirname + "/boite.js").verif;

// Page de garde et introduction : celles de la boite commune, pour que
// le logo, l'encadre gris et la structure des exercices soient les memes
// dans tous les fascicules (16/10/2026).
const { couverture, modeEmploi } = require(__dirname + "/boite.js");

function doc(children, titre) {
  return new Document({
    creator: "Frédéric Ferrant — EPHEC",
    title: titre,
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
//  PKG
// =====================================================================
const pkg = [];
couverture(pkg, "PKG", "Packages et visibilité",
  "Qui voit quoi, et pourquoi un accesseur n'est pas un champ public");

modeEmploi(pkg, "PKG", [
  ["PKG.1", "be.ephec.java.pkg.e01", "Ce que voit une classe du même package"],
  ["PKG.2", "be.ephec.java.pkg.e02", "Ce que voit une classe d'un autre package"],
  ["PKG.3", "be.ephec.java.pkg.e03", "Réduire la surface publique d'une classe"],
  ["PKG.4", "be.ephec.java.pkg.e04", "Découper un programme en packages"],
  ["PKG.5", "be.ephec.java.pkg.e05", "protected, ou ce que l'héritage ouvre"]
]);

pkg.push(h2("Trois niveaux de visibilité, pas deux"));
pkg.push(p("La plupart des étudiants connaissent private et public, et croient que le choix se limite à ces deux-là. Il en existe un troisième, qui n'a pas de mot-clé : quand vous n'écrivez rien devant un membre, il devient visible depuis tout le package, et de là seulement."));
pkg.push(table3(["Ce que vous écrivez", "Qui peut y accéder", "Usage typique"], [
  ["private", "la classe elle-même, et rien d'autre", "champs, méthodes internes"],
  ["(rien)", "toutes les classes du même package", "collaboration entre classes proches, classes de test"],
  ["public", "n'importe quelle classe du programme", "l'interface offerte au reste du monde"]
], [2000, 3600, 3760]));
pkg.push(runs([
  "Il existe un quatrième niveau, ",
  { t: "protected", code: true },
  ", qui n'a de sens qu'avec l'héritage. Vous le rencontrerez au thème ",
  { t: "ABS", code: true },
  "."
]));
pkg.push(new Paragraph({ children: [new PageBreak()] }));

// --- PKG.1
pkg.push(h1("PKG.1 — Ce que voit une classe du même package"));
pkg.push(p("Package : be.ephec.java.pkg.e01", { italic: true, color: GREY }));
pkg.push(h2("Objectif"));
pkg.push(p("Constater par l'expérience ce que chaque niveau de visibilité autorise, depuis une classe voisine."));
pkg.push(h2("Énoncé"));
pkg.push(runs([
  "La classe ",
  { t: "Coffre", code: true },
  " vous est fournie. Elle expose six membres, deux par niveau de visibilité :"
]));
pkg.push(...code([
  "private String codeSecret   = \"1234\";",
  "        String numero       = \"C-07\";      // pas de mot-cle",
  "public  String proprietaire = \"Ada\";",
  "",
  "private String ouvrirLeMecanisme()  { ... }",
  "        String verifierLeNumero()   { ... }",
  "public  String decrire()            { ... }"
]));
pkg.push(runs([
  "La classe ",
  { t: "Inspecteur", code: true },
  " vit dans le ",
  { t: "même", i: true },
  " package. Sa méthode ",
  { t: "experimenter()", code: true },
  " contient six lignes en commentaire, une par membre. Décommentez-les une à une et notez celles que le compilateur refuse."
]));
pkg.push(runs([
  "Complétez ensuite ",
  { t: "membresAccessibles()", code: true },
  " pour qu'elle rende la liste des membres réellement atteignables, séparés par une virgule et un espace, dans l'ordre de déclaration."
]));
pkg.push(h2("Comment vérifier votre code"));
pkg.push(verif([
  { t: "be.ephec.java.pkg.e01.InspecteurTest", code: true },
  { t: "Compare votre réponse à la liste attendue. Le test ne vous dira pas laquelle est fausse : c'est l'expérimentation qui doit vous donner la réponse, pas le test." }
]));
pkg.push(h2("Questions à se poser"));
pkg.push(bullet("Vous êtes dans une autre classe, et pourtant certains membres privés vous sont refusés alors que d'autres membres passent. Contre quoi private protège-t-il exactement : contre l'extérieur de l'objet, ou contre l'extérieur de la classe ?"));
pkg.push(bullet("Deux objets Coffre différents : le premier peut-il lire le codeSecret du second ? Essayez."));
pkg.push(new Paragraph({ children: [new PageBreak()] }));

// --- PKG.2
pkg.push(h1("PKG.2 — Ce que voit une classe d'un autre package"));
pkg.push(p("Packages : be.ephec.java.pkg.e02.coffre et be.ephec.java.pkg.e02.controle", { italic: true, color: GREY }));
pkg.push(h2("Objectif"));
pkg.push(p("Franchir la frontière du package, et comprendre à quoi sert vraiment un accesseur."));
pkg.push(h2("Énoncé — première partie"));
pkg.push(runs([
  "La même classe ",
  { t: "Coffre", code: true },
  " est maintenant seule dans son package. La classe ",
  { t: "ControleExterne", code: true },
  " vit ailleurs. Sa méthode ",
  { t: "experimenter()", code: true },
  " reprend les mêmes lignes commentées qu'en PKG.1."
]));
pkg.push(p("Décommentez, et comparez avec ce que vous aviez obtenu à l'exercice précédent. Un seul élément a changé entre les deux exercices — le package — et pourtant le résultat n'est pas le même. Notez lequel des six membres bascule."));
pkg.push(h2("Énoncé — seconde partie"));
pkg.push(runs([
  "Le contrôle extérieur a besoin de lire le numéro du coffre. Complétez ",
  { t: "numeroDu(Coffre)", code: true },
  " pour qu'elle le rende."
]));
pkg.push(runs([
  { t: "Contrainte : le champ ", b: true },
  { t: "numero", code: true },
  { t: " doit rester tel qu'il est. ", b: true },
  "Le passer en ",
  { t: "public", code: true },
  " ferait compiler l'exercice en dix secondes, et c'est précisément ce qu'il faut éviter. Trouvez l'autre solution."
]));
pkg.push(h2("Spécifications à respecter"));
pkg.push(table3(["Élément", "Signature", "Rôle"], [
  ["numero", "String numero", "Visibilité par défaut — ne pas modifier"],
  ["(à ajouter)", "public String getNumero()", "Retourne le numéro, en lecture seule"],
  ["numeroDu", "public String numeroDu(Coffre)", "Utilise l'accesseur depuis l'autre package"]
]));
pkg.push(h2("Comment vérifier votre code"));
pkg.push(verif([
  { t: "be.ephec.java.pkg.e02.controle.ControleExterneTest", code: true },
  { t: "Vérifie que le numéro se lit depuis l'autre package, et que le champ n'est pas devenu public au passage. Les deux tests doivent passer ensemble : rendre le champ public ferait échouer le second." }
]));
pkg.push(h2("Le point important"));
pkg.push(p("Un champ public donne deux droits à la fois — lire et écrire — à tout le monde et pour toujours. Un getter public ne donne que la lecture, et laisse la classe maîtresse de ce qu'elle retourne : elle peut demain calculer la valeur, la formater, ou refuser de la donner."));
pkg.push(p("C'est la réponse à la question que beaucoup se posent en POO.2 : à quoi bon écrire un getter qui se contente de retourner le champ ? À cela. Le getter et le champ public ne sont pas équivalents, même quand leur code se ressemble."));
pkg.push(runs([
  "C'est aussi la règle ",
  { t: "CC-OBJ.2", code: true },
  " du mémento Clean Code, prise par l'autre bout : un objet expose des comportements, pas ses données. Le champ public expose une donnée ; l'accesseur expose un comportement, celui de la donner."
]));
pkg.push(new Paragraph({ children: [new PageBreak()] }));

// --- PKG.3
pkg.push(h1("PKG.3 — Réduire la surface publique d'une classe"));
pkg.push(p("Package : be.ephec.java.pkg.e03", { italic: true, color: GREY }));
pkg.push(h2("Objectif"));
pkg.push(p("Décider, membre par membre, ce qui doit être visible — au lieu de tout ouvrir par défaut."));
pkg.push(h2("Énoncé"));
pkg.push(runs([
  "La classe ",
  { t: "Deck", code: true },
  " fonctionne, mais tout y est ",
  { t: "public", code: true },
  " : la liste des cartes, le compteur, et jusqu'aux étapes internes de la préparation. N'importe qui peut vider le paquet, remplacer la liste, ou appeler ",
  { t: "melanger()", code: true },
  " au milieu d'une partie."
]));
pkg.push(runs([
  "Le ",
  { t: "Programme", code: true },
  " fourni définit ce dont un utilisateur a réellement besoin. Il n'appelle que trois opérations. Réduisez la visibilité de tout le reste, sans modifier le ",
  { t: "Programme", code: true },
  ", qui doit continuer à compiler."
]));
pkg.push(h2("Comment choisir"));
pkg.push(bulletRuns([
  { t: "private", code: true },
  " si personne d'autre que la classe n'en a besoin — c'est le cas le plus fréquent."
]));
pkg.push(bulletRuns([
  { t: "visibilité par défaut", b: true },
  " si une classe voisine du même package doit y accéder. C'est le cas de ",
  { t: "verifierIntegrite()", code: true },
  ", que la classe de test appelle."
]));
pkg.push(bulletRuns([
  { t: "public", code: true },
  " seulement pour ce que le ",
  { t: "Programme", code: true },
  " utilise."
]));
pkg.push(h2("Comment vérifier votre code"));
pkg.push(verif([
  { t: "be.ephec.java.pkg.e03.DeckTest", code: true },
  { t: "Vérifie qu'aucun champ n'est resté public, que seules les trois opérations utilisées le sont encore, et que le paquet fonctionne toujours." }
]));
pkg.push(h2("Questions à se poser"));
pkg.push(bullet("La classe de test est dans le même package que Deck. Est-ce un hasard ? Que se passerait-il si elle était ailleurs ?"));
pkg.push(bullet("Rendre un membre public est une promesse : celle de ne pas le changer, puisque d'autres s'en servent. Combien de promesses la version d'origine faisait-elle ?"));
pkg.push(runs([
  "Le mémento Clean Code aborde la même idée sous l'angle de la taille : ",
  { t: "CC-CLS.2", code: true },
  " demande des classes courtes, et une classe se mesure autant à ce qu'elle expose qu'à ce qu'elle contient."
]));
pkg.push(new Paragraph({ children: [new PageBreak()] }));

// --- PKG.4
pkg.push(h1("PKG.4 — Découper un programme en packages"));
pkg.push(p("Package : be.ephec.java.pkg.e04", { italic: true, color: GREY }));
pkg.push(h2("Objectif"));
pkg.push(p("Organiser un programme en couches, et voir dans quel sens vont les dépendances."));
pkg.push(h2("Énoncé"));
pkg.push(p("Quatre classes cohabitent aujourd'hui dans un seul package. Répartissez-les en trois :"));
pkg.push(table3(["Package cible", "Classes", "Rôle"], [
  ["…e04.modele", "Joueur, Partie", "Les données du domaine"],
  ["…e04.service", "Inscription", "Les opérations métier"],
  ["…e04.application", "Application", "Le point d'entrée"]
], [2600, 2400, 4360]));
pkg.push(runs([
  { t: "Utilisez le refactoring d'IntelliJ plutôt que le copier-coller. ", b: true },
  "Sélectionnez la classe dans l'arborescence, puis ",
  { t: "F6", code: true },
  " (Move). IntelliJ déplace le fichier, corrige la déclaration de package et ajoute les ",
  { t: "import", code: true },
  " nécessaires dans toutes les classes concernées."
]));
pkg.push(h2("Comment vérifier votre code"));
pkg.push(verif([
  { t: "be.ephec.java.pkg.e04.DecoupageTest", code: true },
  { t: "Vérifie que chaque classe se trouve à sa nouvelle place, et qu'aucune ne subsiste à l'ancienne. Ce dernier test vous protège du copier-coller : deux copies d'une même classe est le pire des résultats." }
]));
pkg.push(h2("Ce qu'il faut observer"));
pkg.push(p("Une fois le découpage fait, regardez les imports. Le modèle n'importe rien. Le service importe le modèle. L'application importe les deux. Les flèches vont toutes dans le même sens :"));
pkg.push(...code([
  "application  ->  service  ->  modele"
]));
pkg.push(p("Ce n'est pas un accident, c'est le but. Le modèle ne connaît personne, donc il peut servir ailleurs — dans une application graphique, par exemple. Le jour où une dépendance remonte en sens inverse, c'est le signe qu'une responsabilité s'est retrouvée dans la mauvaise couche."));
pkg.push(h2("Questions à se poser"));
pkg.push(bullet("Que se passerait-il si Joueur avait besoin d'importer Inscription ? Est-ce que le programme compilerait encore ? Est-ce que ce serait souhaitable ?"));
pkg.push(bullet("Les champs de Partie étaient accessibles depuis Inscription tant que tout était dans le même package. Le sont-ils encore ?"));
pkg.push(runs([
  "Un dernier point de vocabulaire : ce découpage en couches est une forme de séparation des responsabilités, la même idée que ",
  { t: "CC-CLS.1", code: true },
  " applique à une classe. Ce qui vaut pour une classe vaut pour un package."
]));

// =====================================================================
//  TMP
// =====================================================================
pkg.push(new Paragraph({ children: [new PageBreak()] }));

// --- PKG.5
pkg.push(h1("PKG.5 — protected, ou ce que l'héritage ouvre"));
pkg.push(p("Package : be.ephec.java.pkg.e05", { italic: true, color: "8A8A8A" }));
pkg.push(h2("Objectif"));
pkg.push(p("Comprendre la seule visibilité dont la portée ne se décrit pas par un périmètre."));
pkg.push(h2("Pourquoi cet exercice arrive maintenant"));
pkg.push(runs([
  { t: "PKG.1", code: true },
  " à ",
  { t: "PKG.4", code: true },
  " ont laissé une case vide : ",
  { t: "protected", code: true },
  " y était mentionné sans être utilisé, parce qu'il ne prend son sens qu'avec l'héritage. Vous l'avez maintenant."
]));
pkg.push(table3(["Visibilité", "Qui peut atteindre"], [
  ["private", "la classe elle-même, et rien d'autre"],
  ["(rien)", "le même package"],
  ["protected", "le même package, ET les sous-classes où qu'elles soient"],
  ["public", "tout le monde"]
], [2000, 7360]));
pkg.push(h2("Ce qui vous est fourni"));
pkg.push(runs([
  "La classe ",
  { t: "Capteur", code: true },
  ", dans ",
  { t: "pkg.e05.base", code: true },
  ". Elle présente trois champs avec trois visibilités différentes."
]));
pkg.push(...code([
  "private final String numeroDeSerie;      personne d'autre",
  "protected double derniereMesure;         les sous-classes",
  "public final String nom;                 tout le monde"
]));
pkg.push(h2("Énoncé"));
pkg.push(runs([
  "Dans un ",
  { t: "autre package", b: true },
  " — ",
  { t: "pkg.e05.derive", code: true },
  " — complétez deux classes qui n'ont pas le même rapport à Capteur."
]));
pkg.push(table3(["Classe", "Son rapport à Capteur", "Ce qu'elle doit faire"], [
  ["CapteurMoyenne", "elle en HÉRITE", "lisser une mesure, et se décrire"],
  ["Tableau", "elle s'en sert seulement", "additionner des mesures, trouver la plus élevée"]
], [2100, 2900, 4360]));
pkg.push(h2("L'expérience à mener"));
pkg.push(p("C'est elle, le cœur de l'exercice. Dans chacune des deux classes, essayez d'écrire les trois accès, et notez le message exact du compilateur quand il refuse."));
pkg.push(...code([
  "                        depuis CapteurMoyenne    depuis Tableau",
  "  nom                        ?                       ?",
  "  derniereMesure             ?                       ?",
  "  numeroDeSerie              ?                       ?"
]));
pkg.push(runs([
  { t: "Écrivez ensuite en une phrase ", b: true },
  "ce que protected ouvre exactement. Les deux classes sont dans le même package : si le résultat diffère, ce n'est pas le package qui décide."
]));
pkg.push(h2("Deux contraintes"));
pkg.push(bulletRuns([
  "Dans ",
  { t: "lisser()", code: true },
  ", accédez ",
  { t: "directement", b: true },
  " au champ protected, sans passer par un accesseur. C'est ce qu'on cherche à rendre visible."
]));
pkg.push(bulletRuns([
  "Dans ",
  { t: "decrire()", code: true },
  ", le numéro de série vous est inaccessible. Une méthode publique de la classe mère vous en donne une forme utilisable — trouvez-la."
]));
pkg.push(h2("Comment vérifier votre code"));
pkg.push(verif([
  ["lisser(60) sur un capteur neuf", "30.00"],
  ["puis lisser(70)", "50.00"],
  ["decrire()", "Hygrometre (9b71) : 50.00"],
  ["sommeDesMesures des deux capteurs", "71.50"],
  ["plusEleve()", "Hygrometre"],
  ["plusEleve() sans capteur", "aucun capteur"]
]));
pkg.push(h2("Questions à se poser"));
pkg.push(bullet("Les deux classes sont dans le même package et n'ont pas les mêmes droits. Qu'est-ce qui les distingue ?"));
pkg.push(bulletRuns([
  "Dans ",
  { t: "lisser()", code: true },
  ", vous auriez pu écrire ",
  { t: "mesurer((valeur + lire()) / 2)", code: true },
  " et vous passer de protected. Laquelle des deux versions préférez-vous, et pourquoi ? Voir ",
  { t: "CC-OBJ.2", code: true },
  "."
]));
pkg.push(bulletRuns([
  "Une sous-classe peut-elle atteindre ",
  { t: "derniereMesure", code: true },
  " sur ",
  { t: "un autre", i: true },
  " capteur qu'elle-même ? Essayez."
]));
pkg.push(new Paragraph({ children: [new PageBreak()] }));

const tmp = [];
couverture(tmp, "TMP", "Dates et heures",
  "Mesurer, compter, reporter, formater — et les pièges de java.time");

modeEmploi(tmp, "TMP", [
  ["TMP.1", "be.ephec.java.tmp.e01", "Mesurer un écart entre deux dates"],
  ["TMP.2", "be.ephec.java.tmp.e02", "Les dates sont immuables"],
  ["TMP.3", "be.ephec.java.tmp.e03", "Compter des secondes : date ou instant ?"],
  ["TMP.4", "be.ephec.java.tmp.e04", "L'arithmétique des mois"],
  ["TMP.5", "be.ephec.java.tmp.e05", "Period ou Duration"],
  ["TMP.6", "be.ephec.java.tmp.e06", "Formater et analyser une date"]
]);

tmp.push(h2("Les classes que vous allez rencontrer"));
tmp.push(table3(["Classe", "Ce qu'elle représente", "Exemple"], [
  ["LocalDate", "une date, sans heure", "2027-01-19"],
  ["LocalDateTime", "une date avec une heure", "2027-01-19T18:00"],
  ["Period", "un écart en années, mois et jours", "36 ans, 8 mois, 2 jours"],
  ["Duration", "un écart en heures, minutes et secondes", "3 h 35"],
  ["ChronoUnit", "l'unité dans laquelle mesurer un écart", "DAYS, WEEKS, MONTHS"],
  ["DateTimeFormatter", "la conversion entre date et texte", "19/01/2027"]
], [2400, 4200, 2760]));
tmp.push(new Paragraph({ children: [new PageBreak()] }));

// --- TMP.1
tmp.push(h1("TMP.1 — Mesurer un écart entre deux dates"));
tmp.push(p("Package : be.ephec.java.tmp.e01", { italic: true, color: GREY }));
tmp.push(h2("Objectif"));
tmp.push(p("Construire une date, et mesurer l'écart qui la sépare d'une autre dans quatre unités différentes."));
tmp.push(h2("Énoncé"));
tmp.push(runs([
  "Complétez la classe ",
  { t: "UtilitaireDates", code: true },
  ", qui expose quatre méthodes statiques mesurant le même écart dans quatre unités. Aucune ne lit au clavier ni n'affiche : elles reçoivent deux dates et retournent un nombre."
]));
tmp.push(runs([
  "Écrivez ensuite le ",
  { t: "Programme", code: true },
  " : il demande l'année, le mois et le jour de naissance, construit la date avec ",
  { t: "LocalDate.of(annee, mois, jour)", code: true },
  ", et affiche les quatre écarts jusqu'à aujourd'hui."
]));
tmp.push(h2("Spécifications à respecter"));
tmp.push(table3(["Élément", "Signature", "Rôle"], [
  ["ecartEnJours", "public static long ecartEnJours(LocalDate, LocalDate)", "Nombre de jours entiers"],
  ["ecartEnSemaines", "public static long ecartEnSemaines(LocalDate, LocalDate)", "Nombre de semaines entières"],
  ["ecartEnMois", "public static long ecartEnMois(LocalDate, LocalDate)", "Nombre de mois entiers"],
  ["ecartEnAnnees", "public static long ecartEnAnnees(LocalDate, LocalDate)", "Nombre d'années entières"]
], [2400, 4200, 2760]));
tmp.push(runs([
  { t: "Indice : ", b: true },
  { t: "java.time.temporal.ChronoUnit", code: true },
  ". Cherchez la méthode ",
  { t: "between", code: true },
  " dans la Javadoc, et regardez comment s'écrit un appel."
]));
tmp.push(h2("Exemples attendus"));
tmp.push(...code([
  "Entre le 17/05/1990 et le 19/01/2027 :",
  "",
  "  jours    ->  13396",
  "  semaines ->   1913",
  "  mois     ->    440",
  "  annees   ->     36"
]));
tmp.push(h2("Comment vérifier votre code"));
tmp.push(verif([
  { t: "be.ephec.java.tmp.e01.UtilitaireDatesTest", code: true },
  { t: "Vérifie les quatre valeurs ci-dessus, l'écart nul, et un écart mesuré à rebours — qui doit être négatif." }
]));
tmp.push(h2("Questions à se poser"));
tmp.push(bullet("Entre le 1er et le 30 janvier, combien de mois y a-t-il selon votre méthode ? Et selon l'intuition ?"));
tmp.push(bullet("Pourquoi ces méthodes rendent-elles un long et non un int ?"));
tmp.push(runs([
  "Remarquez les noms : ",
  { t: "ecartEnJours", code: true },
  " dit l'unité, ce que ",
  { t: "ecart", code: true },
  " ne dirait pas. C'est la règle ",
  { t: "CC-NOM.1", code: true },
  " du mémento Clean Code — un nom doit répondre à la question qu'on se pose en le lisant."
]));
tmp.push(new Paragraph({ children: [new PageBreak()] }));

// --- TMP.2
tmp.push(h1("TMP.2 — Les dates sont immuables"));
tmp.push(p("Package : be.ephec.java.tmp.e02", { italic: true, color: GREY }));
tmp.push(h2("Objectif"));
tmp.push(p("Rencontrer une erreur qui ne provoque ni refus du compilateur, ni plantage à l'exécution, ni message d'aucune sorte — et qui donne pourtant un résultat faux."));
tmp.push(h2("Avant de coder"));
tmp.push(runs([
  "Exécutez le ",
  { t: "Programme", code: true },
  " fourni. Il contient une erreur. Lisez sa sortie et essayez de comprendre avant de continuer."
]));
tmp.push(...code([
  "LocalDate rendezVous = LocalDate.of(2027, 1, 19);",
  "",
  "System.out.println(\"Rendez-vous initial : \" + rendezVous);",
  "",
  "rendezVous.plusWeeks(1);",
  "",
  "System.out.println(\"Apres report d'une semaine : \" + rendezVous);"
]));
tmp.push(p("Les deux lignes affichent la même date. Pourquoi ?"));
tmp.push(h2("Énoncé"));
tmp.push(runs([
  "Complétez la classe ",
  { t: "Agenda", code: true },
  " avec deux méthodes, puis corrigez le ",
  { t: "Programme", code: true },
  "."
]));
tmp.push(table3(["Élément", "Signature", "Rôle"], [
  ["dansUneSemaine", "public static LocalDate dansUneSemaine(LocalDate)", "La date sept jours plus tard"],
  ["reporterDe", "public static LocalDate reporterDe(LocalDate, int)", "Report d'un nombre de jours ; un nombre négatif recule"]
], [2400, 4400, 2560]));
tmp.push(h2("Comment vérifier votre code"));
tmp.push(verif([
  { t: "be.ephec.java.tmp.e02.AgendaTest", code: true },
  { t: "Vérifie les reports, y compris ceux qui franchissent un mois ou une année, et surtout que la date reçue en paramètre ressort intacte des deux méthodes." }
]));
tmp.push(h2("Ce qu'il faut retenir"));
tmp.push(runs([
  "Un ",
  { t: "LocalDate", code: true },
  " est ",
  { t: "immuable", i: true },
  " : sa valeur est fixée à la construction et ne changera jamais. ",
  { t: "plusWeeks", code: true },
  " ne modifie donc pas l'objet — elle en fabrique un nouveau et le retourne. Sans affectation, ce nouvel objet est jeté aussitôt."
]));
tmp.push(runs([
  "Vous avez déjà rencontré cette mécanique sans forcément la nommer : ",
  { t: "texte.toUpperCase()", code: true },
  " ne met pas la chaîne en majuscules, il en retourne une autre. ",
  { t: "String", code: true },
  " est immuable, exactement comme ",
  { t: "LocalDate", code: true },
  "."
]));
tmp.push(p("Ce n'est pas une gêne, c'est une garantie : vous pouvez passer une date à n'importe quelle méthode sans craindre qu'elle la modifie dans votre dos."));
tmp.push(runs([
  "Cette garantie rejoint ",
  { t: "CC-MET.6", code: true },
  " du mémento Clean Code, qui met en garde contre les effets de bord : une méthode qui modifie discrètement ce qu'on lui confie est une source d'erreurs durables. L'immuabilité les rend impossibles."
]));
tmp.push(new Paragraph({ children: [new PageBreak()] }));

// --- TMP.3
tmp.push(h1("TMP.3 — Compter des secondes : date ou instant ?"));
tmp.push(p("Package : be.ephec.java.tmp.e03", { italic: true, color: GREY }));
tmp.push(h2("Objectif"));
tmp.push(p("Découvrir, en butant dessus, la différence entre une date et un instant."));
tmp.push(h2("Contexte"));
tmp.push(runs([
  "En TMP.1 vous avez compté les jours écoulés depuis votre naissance. Comptez maintenant les ",
  { t: "secondes", i: true },
  ". La démarche paraît identique : changer ",
  { t: "ChronoUnit.DAYS", code: true },
  " en ",
  { t: "ChronoUnit.SECONDS", code: true },
  " et l'affaire est réglée."
]));
tmp.push(p("Elle ne l'est pas, et c'est tout l'intérêt de l'exercice."));
tmp.push(h2("Énoncé"));
tmp.push(table3(["Élément", "Signature", "Rôle"], [
  ["secondesEntre", "public static long secondesEntre(LocalDateTime, LocalDateTime)", "Secondes écoulées entre deux instants"],
  ["secondesDepuis", "public static long secondesDepuis(LocalDate, LocalDateTime)", "Secondes vécues depuis une naissance"],
  ["formater", "public static String formater(long)", "Groupe les chiffres par trois"]
], [2400, 4400, 2560]));
tmp.push(runs([
  "L'heure de naissance n'est pas connue : comptez à partir de minuit. Cherchez dans la Javadoc de ",
  { t: "LocalDate", code: true },
  " la méthode qui fabrique un ",
  { t: "LocalDateTime", code: true },
  " au début de la journée."
]));
tmp.push(runs([
  "Écrivez ensuite le ",
  { t: "Programme", code: true },
  ", qui demande la date de naissance et affiche le résultat formaté. Décommentez enfin la ligne ",
  "signalée dans le ",
  { t: "Programme", code: true },
  " et lisez le message d'erreur : c'est le point central de l'exercice."
]));
tmp.push(h2("Sur le formatage"));
tmp.push(runs([
  "Un milliard de secondes écrit d'un trait est illisible. Groupez les chiffres par trois, ",
  "séparés par une espace ordinaire — celle de la barre d'espacement."
]));
tmp.push(runs([
  { t: "Précisez ", b: true },
  { t: "Locale.US", code: true },
  { t: " dans votre formatage. ", b: true },
  "Sans locale explicite, le séparateur dépend de la langue de la machine, et le JDK français ",
  "emploie une espace insécable étroite qui ressemble à une espace ordinaire sans en être une. ",
  "Le test échouerait sur une différence invisible à l'œil."
]));
tmp.push(h2("Exemples attendus"));
tmp.push(...code([
  "secondesEntre(19/01 18:00, 19/01 19:00)          ->          3 600",
  "secondesEntre(19/01 00:00, 20/01 00:00)          ->         86 400",
  "secondesDepuis(17/05/1990, 19/01/2027 18:00)     ->  1 157 479 200",
  "",
  "formater(1157479200)                             ->  \"1 157 479 200\""
]));
tmp.push(h2("Comment vérifier votre code"));
tmp.push(verif([
  { t: "be.ephec.java.tmp.e03.CompteurTest", code: true },
  { t: "Vérifie l'heure, la journée, une vie entière, la convention de minuit et le formatage." },
  { t: "Si le troisième test échoue sur UnsupportedTemporalTypeException: Unsupported unit: Seconds, ne cherchez pas d'erreur dans votre calcul : c'est la leçon de l'exercice." }
]));
tmp.push(h2("Ce qu'il faut retenir"));
tmp.push(runs([
  "Un ",
  { t: "LocalDate", code: true },
  " ne représente pas un instant. Il représente une case du calendrier — le 17 mai 1990 — sans ",
  "heure, sans minute, sans seconde. Lui demander combien de secondes le séparent d'une autre case ",
  "n'a pas de sens, et le JDK refuse plutôt que d'inventer une réponse."
]));
tmp.push(runs([
  "Pour compter des secondes il faut un ",
  { t: "LocalDateTime", code: true },
  ", c'est-à-dire une date ",
  { t: "et", i: true },
  " une heure. ",
  { t: "atStartOfDay()", code: true },
  " fabrique ce ",
  { t: "LocalDateTime", code: true },
  " en fixant l'heure à minuit — ce qui est une convention, pas une vérité : personne ne naît ",
  "à minuit, et votre résultat est donc juste à quelques heures près."
]));
tmp.push(h2("Questions à se poser"));
tmp.push(bullet("Vous avez répondu en TMP.1 à la question « pourquoi un long plutôt qu'un int ». Le nombre de secondes d'une vie la rend concrète : un int s'arrête à 2 147 483 647. Au bout de combien d'années le compteur déborderait-il ?"));
tmp.push(bullet("L'horloge Unix compte les secondes depuis le 1er janvier 1970 : elle en est aujourd'hui à environ 1,79 milliard. Est-ce plus ou moins que le nombre de secondes que vous avez vécues, et pourquoi ?"));
tmp.push(bulletRuns([
  "Le résultat de ",
  { t: "secondesDepuis", code: true },
  " change à chaque exécution du Programme, mais pas dans le test. Comment le test s'y est-il pris ?"
]));
tmp.push(new Paragraph({ children: [new PageBreak()] }));

tmp.push(h1("TMP.4 — L'arithmétique des mois"));
tmp.push(p("Package : be.ephec.java.tmp.e04", { italic: true, color: GREY }));
tmp.push(h2("Objectif"));
tmp.push(p("Découvrir que l'addition de mois ne se comporte pas comme celle de jours, et pourquoi aucune autre réponse ne serait meilleure."));
tmp.push(h2("Énoncé"));
tmp.push(runs([
  "Complétez ",
  { t: "echeance(LocalDate, int)", code: true },
  ", qui retourne la date située un nombre de mois après celle reçue."
]));
tmp.push(runs([
  "Complétez ensuite ",
  { t: "memeResultatMoisParMois(LocalDate, int)", code: true },
  ", qui retourne ",
  { t: "true", code: true },
  " si ajouter les mois un par un donne la même chose que les ajouter d'un coup."
]));
tmp.push(h2("Ce que vous allez constater"));
tmp.push(...code([
  "31/01/2027 + 1 mois           ->  28/02/2027",
  "31/01/2028 + 1 mois           ->  29/02/2028   (annee bissextile)",
  "31/01/2027 + 2 mois           ->  31/03/2027",
  "31/01/2027 + 1 mois + 1 mois  ->  28/03/2027   <-- pas le meme resultat"
]));
tmp.push(p("Le 31 février n'existe pas. Java rabote donc au dernier jour disponible du mois d'arrivée. Mais une fois raboté, le 31 est perdu : la seconde addition repart du 28 et non du 31."));
tmp.push(h2("Comment vérifier votre code"));
tmp.push(verif([
  { t: "be.ephec.java.tmp.e04.EcheancierTest", code: true },
  { t: "Vérifie les quatre cas ci-dessus, en année ordinaire et bissextile, et le fait qu'une date dont le jour existe dans tous les mois ne pose aucun problème." }
]));
tmp.push(h2("Questions à se poser"));
tmp.push(bullet("Quelle autre réponse Java aurait-il pu donner au 31 janvier plus un mois ? Le 3 mars ? Une exception ? Laquelle vous paraîtrait la moins mauvaise ?"));
tmp.push(bullet("Une échéance de facture à trente jours et une échéance à un mois : tombent-elles le même jour ? Toujours ?"));
tmp.push(bullet("Dans quel cas vaut-il mieux compter en jours qu'en mois ?"));
tmp.push(new Paragraph({ children: [new PageBreak()] }));

// --- TMP.4
tmp.push(h1("TMP.5 — Period ou Duration"));
tmp.push(p("Package : be.ephec.java.tmp.e05", { italic: true, color: GREY }));
tmp.push(h2("Objectif"));
tmp.push(p("Choisir entre deux classes qui mesurent toutes deux un écart, mais pas dans la même unité de pensée."));
tmp.push(h2("Contexte"));
tmp.push(runs([
  { t: "Period", code: true },
  " compte en années, mois et jours : des unités du ",
  { t: "calendrier", i: true },
  ", dont la longueur varie. Un mois n'a pas toujours trente jours, une année pas toujours 365."
]));
tmp.push(runs([
  { t: "Duration", code: true },
  " compte en heures, minutes et secondes : des unités de ",
  { t: "temps", i: true },
  ", toujours identiques."
]));
tmp.push(p("D'où la règle : Period pour des dates, Duration pour des heures."));
tmp.push(h2("Énoncé"));
tmp.push(table3(["Élément", "Signature", "Rôle"], [
  ["age", "public static Period age(LocalDate, LocalDate)", "L'âge en années, mois et jours"],
  ["dureeDePartie", "public static Duration dureeDePartie(LocalDateTime, LocalDateTime)", "La durée écoulée"],
  ["dureeLisible", "public static String dureeLisible(LocalDateTime, LocalDateTime)", "La même durée écrite « 3h35 »"]
], [2200, 4600, 2560]));
tmp.push(runs([
  { t: "Attention à la dernière. ", b: true },
  { t: "toHours()", code: true },
  " retourne le nombre total d'heures, mais ",
  { t: "toMinutes()", code: true },
  " retourne le nombre total de minutes — 215, pas 35. Cherchez dans la Javadoc de ",
  { t: "Duration", code: true },
  " la méthode qui donne seulement les minutes restantes."
]));
tmp.push(h2("Exemples attendus"));
tmp.push(...code([
  "age(17/05/1990, 19/01/2027)        ->  36 ans, 8 mois, 2 jours",
  "duree(19/01 18:00, 19/01 21:35)    ->  215 minutes, soit 3 heures",
  "dureeLisible(meme intervalle)      ->  \"3h35\""
]));
tmp.push(h2("Comment vérifier votre code"));
tmp.push(verif([
  { t: "be.ephec.java.tmp.e05.StatistiquesTest", code: true },
  { t: "Vérifie la décomposition de l'âge, les deux lectures de la durée, et le format « 3h35 »." }
]));
tmp.push(h2("Questions à se poser"));
tmp.push(bullet("Pourquoi Period.between refuse-t-elle deux LocalDateTime, et Duration.between deux LocalDate ?"));
tmp.push(bullet("Un Period de « 1 mois » ajouté au 31 janvier, puis au 15 mars : combien de jours dans chaque cas ? Que dit cela sur ce qu'un Period mémorise réellement ?"));
tmp.push(new Paragraph({ children: [new PageBreak()] }));

// --- TMP.5
tmp.push(h1("TMP.6 — Formater et analyser une date"));
tmp.push(p("Package : be.ephec.java.tmp.e06", { italic: true, color: GREY }));
tmp.push(h2("Objectif"));
tmp.push(p("Passer d'une date à du texte et inversement — et découvrir que l'analyse est bien plus tolérante que vous ne le souhaiteriez."));
tmp.push(h2("Énoncé"));
tmp.push(table3(["Élément", "Signature", "Rôle"], [
  ["enTexte", "public static String enTexte(LocalDate)", "Retourne « 19/01/2027 »"],
  ["depuisTexte", "public static LocalDate depuisTexte(String)", "Analyse le même format"],
  ["depuisTexteStrict", "public static LocalDate depuisTexteStrict(String)", "Idem, mais refuse les dates impossibles"]
], [2600, 4200, 2560]));
tmp.push(runs([
  { t: "Indice : ", b: true },
  { t: "DateTimeFormatter.ofPattern(\"dd/MM/yyyy\")", code: true },
  ", puis ",
  { t: "date.format(...)", code: true },
  " et ",
  { t: "LocalDate.parse(texte, ...)", code: true },
  "."
]));
tmp.push(h2("Le piège"));
tmp.push(p("Analysez la chaîne « 31/02/2027 » avec le formateur ordinaire, et regardez ce que vous obtenez."));
tmp.push(...code([
  "depuisTexte(\"31/02/2027\")   ->  2027-02-28"
]));
tmp.push(p("Aucune exception, aucun avertissement. Le 31 février n'existe pas, mais le formateur travaille par défaut en mode indulgent et rabote au dernier jour du mois. Une saisie absurde vient de devenir une date parfaitement plausible, et plus rien dans le programme ne permettra de s'en apercevoir."));
tmp.push(runs([
  "Pour ",
  { t: "depuisTexteStrict", code: true },
  ", exigez le mode strict : ",
  { t: "withResolverStyle(ResolverStyle.STRICT)", code: true },
  ". Ce mode réclame au passage le motif ",
  { t: "uuuu", code: true },
  " au lieu de ",
  { t: "yyyy", code: true },
  " — sans quoi il refuse de fonctionner, pour une raison que la Javadoc explique."
]));
tmp.push(h2("Comment vérifier votre code"));
tmp.push(verif([
  { t: "be.ephec.java.tmp.e06.FormatBelgeTest", code: true },
  { t: "Vérifie le formatage dans les deux sens, le refus d'un texte mal formé, le rabotage silencieux du 31 février par le mode ordinaire, et son refus par le mode strict." }
]));
tmp.push(h2("Questions à se poser"));
tmp.push(bullet("Vous écrivez un formulaire d'inscription. Lequel des deux modes utilisez-vous, et pourquoi ?"));
tmp.push(bullet("Le mode ordinaire n'est pas un défaut du JDK : dans quel cas préférerait-on qu'une date soit ajustée plutôt que refusée ?"));
tmp.push(bullet("Que retourne depuisTexte(\"19-01-2027\") ? Et pourquoi ce cas-là est-il refusé alors que le 31 février passe ?"));
tmp.push(runs([
  "Le mode indulgent illustre ",
  { t: "CC-ERR.1", code: true },
  " du mémento Clean Code : mieux vaut une exception qu'un code de retour ou qu'une valeur arrangée. Une date rabotée sans avertissement est exactement la valeur arrangée que la règle proscrit."
]));

// ---------------------------------------------------------------------
Packer.toBuffer(doc(pkg, "Exercices Java — Thème PKG")).then(b => {
  fs.writeFileSync(__dirname + "/../../enonces/PKG_enonces.docx", b);
  console.log("PKG :", b.length, "octets");
});
Packer.toBuffer(doc(tmp, "Exercices Java — Thème TMP")).then(b => {
  fs.writeFileSync(__dirname + "/../../enonces/TMP_enonces.docx", b);
  console.log("TMP :", b.length, "octets");
});
