const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle,
  TableOfContents, PageBreak, LevelFormat, convertInchesToTwip,
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

const W_TOTAL = 9360; // largeur utile A4 marges 1"

function p(text, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after === undefined ? 120 : opts.after },
    alignment: opts.align,
    children: [new TextRun({
      text, bold: opts.bold, italics: opts.italic, size: opts.size || 22,
      color: opts.color, font: opts.font
    })]
  });
}

function runs(parts, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after === undefined ? 120 : opts.after },
    children: parts.map(part =>
      typeof part === "string"
        ? new TextRun({ text: typo(part), size: 22 })
        : new TextRun({
            text: part.t, size: 22, bold: part.b, italics: part.i,
            font: part.code ? MONO : undefined,
            color: part.code ? "8B2500" : undefined
          })
    )
  });
}

function bullet(text, level = 0) {
  return new Paragraph({
    numbering: { reference: "puces", level },
    spacing: { after: 60 },
    children: [new TextRun({ text, size: 22 })]
  });
}

function bulletRuns(parts, level = 0) {
  return new Paragraph({
    numbering: { reference: "puces", level },
    spacing: { after: 60 },
    children: parts.map(part =>
      typeof part === "string"
        ? new TextRun({ text: typo(part), size: 22 })
        : new TextRun({
            text: part.t, size: 22, bold: part.b, italics: part.i,
            font: part.code ? MONO : undefined,
            color: part.code ? "8B2500" : undefined
          })
    )
  });
}

function code(lines) {
  return lines.map((line, i) => new Paragraph({
    spacing: { before: i === 0 ? 100 : 0, after: i === lines.length - 1 ? 160 : 0 },
    shading: { type: ShadingType.CLEAR, fill: "F2F2F2" },
    indent: { left: 220 },
    children: [new TextRun({ text: line === "" ? " " : line, font: MONO, size: 19 })]
  }));
}

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 160 },
    children: [(() => {
      const trouve = CODE_EXERCICE.exec(text);
      const t = new TextRun({ text: typo(text), bold: true, size: 30, color: ACCENT });
      return trouve ? new Bookmark({ id: ancre(trouve[0]), children: [t] }) : t;
    })()]
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 100 },
    children: [new TextRun({ text, bold: true, size: 24, color: GREY })]
  });
}

function cell(text, { bold, mono, width, fill } = {}) {
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    shading: fill ? { type: ShadingType.CLEAR, fill } : undefined,
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    children: [new Paragraph({
      spacing: { after: 0 },
      children: [new TextRun({
        text, bold, size: mono ? 18 : 20,
        font: mono ? MONO : undefined
      })]
    })]
  });
}

// tableau de specifications : Element | Signature | Role
function specTable(rows, headers) {
  const h = headers || ["Élément", "Signature", "Rôle"];
  const widths = [2200, 3400, 3760];
  const header = new TableRow({
    tableHeader: true,
    children: [
      cell(h[0], { bold: true, width: widths[0], fill: "DEEAF6" }),
      cell(h[1], { bold: true, width: widths[1], fill: "DEEAF6" }),
      cell(h[2], { bold: true, width: widths[2], fill: "DEEAF6" })
    ]
  });
  const body = rows.map(r => new TableRow({
    children: [
      CODE_EXERCICE.test(String(r[0]))
        ? celluleLien(String(r[0]), widths[0])
        : cell(r[0], { width: widths[0], mono: true }),
      cell(r[1], { width: widths[1], mono: true }),
      cell(r[2], { width: widths[2] })
    ]
  }));
  return new Table({
    columnWidths: widths,
    width: { size: W_TOTAL, type: WidthType.DXA },
    rows: [header, ...body]
  });
}

function verif(texte) {
  return new Table({
    columnWidths: [W_TOTAL],
    width: { size: W_TOTAL, type: WidthType.DXA },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 2, color: "A6A6A6" },
      bottom: { style: BorderStyle.SINGLE, size: 2, color: "A6A6A6" },
      left: { style: BorderStyle.SINGLE, size: 12, color: ACCENT },
      right: { style: BorderStyle.SINGLE, size: 2, color: "A6A6A6" },
      insideHorizontal: { style: BorderStyle.NONE },
      insideVertical: { style: BorderStyle.NONE }
    },
    rows: [new TableRow({
      cantSplit: true,
      children: [new TableCell({
        width: { size: W_TOTAL, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: "F7F9FC" },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: texte.map((t, i) => new Paragraph({
          spacing: { after: i === texte.length - 1 ? 0 : 80 },
          children: [new TextRun({
            text: t.t, size: 21, bold: t.b,
            font: t.code ? MONO : undefined
          })]
        }))
      })]
    })]
  });
}

const children = [];

// ---------- Page de garde ----------
children.push(new Paragraph({
  spacing: { before: 1200, after: 120 },
  alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: typo("Programmation orientée objet — Java"), size: 26, color: GREY })]
}));
children.push(new Paragraph({
  spacing: { after: 200 },
  alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: typo("Thème POO"), bold: true, size: 56, color: ACCENT })]
}));
children.push(new Paragraph({
  spacing: { after: 800 },
  alignment: AlignmentType.CENTER,
  children: [new TextRun({
    text: "Classes, objets, encapsulation, saisie au clavier", size: 26, color: GREY })]
}));
children.push(p("EPHEC — Bachelier en informatique, niveau 2", { align: AlignmentType.CENTER, color: GREY }));
children.push(p("Année académique 2026-2027", { align: AlignmentType.CENTER, color: GREY }));
children.push(new Paragraph({ children: [new PageBreak()] }));

// ---------- Mode d'emploi ----------
function runsSimple(list) {
  return new Paragraph({
    spacing: { after: 120 },
    children: list.map(x => typeof x === "string"
      ? new TextRun({ text: x, size: 22 })
      : new TextRun({
          text: x.t, size: 22, bold: x.b, italics: x.i,
          font: x.code ? "Consolas" : undefined,
          color: x.code ? "8B2500" : undefined
        }))
  });
}

children.push(h1("Comment travailler ces exercices"));

children.push(runs([
  "Chaque thème du cours correspond à un package du projet ",
  { t: "ExercicesJava", code: true },
  " et à un fascicule comme celui-ci. Les exercices de ce thème vivent sous ",
  { t: "be.ephec.java.poo", code: true },
  ", un sous-package par exercice."
]));

children.push(specTable([
  ["POO.1", "be.ephec.java.poo.e01", "Une première classe, sans encapsulation"],
  ["POO.2", "be.ephec.java.poo.e02", "La même classe, encapsulée"],
  ["POO.3", "be.ephec.java.poo.e03", "L'âge n'est pas une donnée à stocker"],
  ["POO.4", "be.ephec.java.poo.e04", "Saisie au clavier et passage de paramètres"],
  ["POO.5", "be.ephec.java.poo.e05", "Conversion de base, et logique testable"]
], ["Exercice", "Package", "Sujet"]));

children.push(runs([
  { t: "Chaque exercice est autonome. ", b: true },
  "Son package contient tout ce dont il a besoin, et n'importe jamais une classe d'un ",
  "autre exercice. Quand un exercice reprend une classe du précédent, vous en repartez ",
  "d'une copie : vous pouvez donc en rater un sans être bloqué pour la suite."
]));

children.push(runs([
  { t: "Comment lancer les tests, comment lire un test vert, pourquoi laisser votre code compilable : ", b: true },
  "tout cela est commun aux quinze thèmes, et vit dans un document à part — ",
  { t: "Memento_Exercices.docx", code: true },
  ". Lisez-le une fois en début d'année."
]));
children.push(runs([
  "Ce fascicule-ci ne parle que de son thème. Les codes du tableau ci-dessus sont ",
  { t: "cliquables", b: true },
  " : ils mènent directement à l'exercice."
]));

children.push(h1("POO.1 — Une première classe"));
children.push(p("Package : be.ephec.java.poo.e01", { italic: true, color: GREY }));

children.push(h2("Objectif"));
children.push(p("Écrire une classe, l'instancier, appeler ses méthodes. Et constater au passage ce qu'implique un champ public."));

children.push(h2("Énoncé"));
children.push(p("Créez une classe Personne qui modélise une personne par son état civil minimal."));
children.push(runs([
  "Elle présente quatre champs, tous ",
  { t: "public", code: true },
  " pour cet exercice-ci : un nom, un prénom, une année de naissance et un âge."
]));
children.push(p("Elle présente aussi deux méthodes :"));
children.push(bulletRuns([
  { t: "computeAge(int annee)", code: true },
  " calcule et retourne l'âge qu'a la personne à l'année passée en paramètre. ",
  "La méthode fait une simple soustraction, sans traitement particulier."
]));
children.push(bulletRuns([
  { t: "display()", code: true },
  " affiche les propriétés de la personne sur la console. Le format d'affichage est libre."
]));
children.push(runs([
  "Écrivez ensuite une classe ",
  { t: "Programme", code: true },
  " contenant une méthode ",
  { t: "main", code: true },
  " dans laquelle vous créez une personne, renseignez ses champs, puis affichez son ",
  "prénom, son nom et son âge."
]));

children.push(h2("Spécifications"));
children.push(specTable([
  ["Personne", "public class", "Classe à écrire, quatre champs public"],
  ["nom", "public String", "Nom de famille"],
  ["prenom", "public String", "Prénom"],
  ["anneeDeNaissance", "public int", "Année de naissance, sur quatre chiffres"],
  ["age", "public int", "Âge — voir la question ci-dessous"],
  ["computeAge", "public int computeAge(int annee)", "Rend annee moins l'année de naissance"],
  ["display", "public void display()", "Affiche la personne sur la console"]
]));

children.push(h2("Vérification"));
children.push(verif([
  { t: "be.ephec.java.poo.e01.PersonneTest", code: true },
  { t: "Vérifie que les quatre champs existent et sont bien public, et que computeAge rend le bon écart d'années — y compris pour une année antérieure à la naissance, où le résultat est négatif." }
]));

children.push(h2("Questions à se poser"));
children.push(bullet("La classe ne déclare aucun constructeur. Pourquoi new Personne() fonctionne-t-il quand même, et que valent les champs juste après ?"));
children.push(bullet("Le champ age et la méthode computeAge donnent tous deux l'âge. Que se passe-t-il si l'un est mis à jour et pas l'autre ? Lequel des deux garderiez-vous ?"));
children.push(bullet("Qu'est-ce qui empêche, dans cette version, d'écrire personne.anneeDeNaissance = -3000 ?"));
children.push(runsSimple([
  "Lisez les noms de la classe à voix haute. Y en a-t-il un que vous ne sauriez pas prononcer, ou qu'il faudrait épeler à un collègue ? Voir ",
  { t: "CC-NOM.3", code: true },
  "."
]));
children.push(runsSimple([
  "Quand un essai ne marche pas, le réflexe est de mettre l'ancienne version en commentaire « au cas où ». Que devient ce commentaire trois séances plus tard ? Voir ",
  { t: "CC-COM.2", code: true },
  " — et notez que les corrigés du cours enfreignent cette règle exprès, pour vous montrer ce qui ne compile pas."
]));
children.push(runsSimple([
  "Les noms de cette classe sont donnés : ",
  { t: "nom", code: true },
  ", ",
  { t: "prenom", code: true },
  ", ",
  { t: "anneeDeNaissance", code: true },
  ". Vous choisirez les vôtres dès l'exercice suivant — le mémento Clean Code ouvre sur huit règles de nommage, ",
  { t: "CC-NOM.1", code: true },
  " à ",
  { t: "CC-NOM.8", code: true },
  ". Lisez-les une fois : elles serviront toute l'année."
]));

children.push(new Paragraph({ children: [new PageBreak()] }));

// ---------- POO.2 ----------
children.push(h1("POO.2 — La même classe, encapsulée"));
children.push(p("Package : be.ephec.java.poo.e02", { italic: true, color: GREY }));

children.push(h2("Objectif"));
children.push(p("Corriger le défaut de POO.1 : reprendre le contrôle sur l'état de l'objet."));

children.push(h2("Énoncé"));
children.push(runs([
  "Reprenez la classe ",
  { t: "Personne", code: true },
  " de POO.1 et encapsulez-la : tous les champs deviennent ",
  { t: "private", code: true },
  ", et l'accès depuis l'extérieur passe par des accesseurs."
]));
children.push(p("Écrivez un getter et un setter pour le nom, le prénom et l'année de naissance : ces trois-là ne posent pas de difficulté."));
children.push(runs([
  "Le champ ",
  { t: "age", code: true },
  " demande en revanche une décision, et c'est le vrai travail de cet exercice. Vous avez trois possibilités."
]));
children.push(bullet("Un getter et un setter, comme pour les autres champs."));
children.push(bullet("Un getter seul, sans moyen d'écrire l'âge depuis l'extérieur."));
children.push(bullet("Ni l'un ni l'autre."));
children.push(runs([
  "Chacune a une conséquence. Avec un setter, n'importe qui peut écrire un âge sans aucun ",
  "rapport avec l'année de naissance, et l'objet se retrouve dans un état incohérent. Sans ",
  "setter, l'âge reste à sa valeur initiale — c'est-à-dire ",
  { t: "0", code: true },
  " si personne ne l'a renseigné à la construction. Et sans accesseur du tout, le champ ",
  "devient invisible de l'extérieur : à quoi sert-il encore ?"
]));
children.push(runs([
  { t: "Tranchez, implémentez votre choix, et notez votre raisonnement en une ou deux phrases. ", b: true },
  "L'exercice suivant reviendra sur cette question, et vous pourrez comparer."
]));
children.push(runs([
  "Les méthodes ",
  { t: "computeAge", code: true },
  " et ",
  { t: "display", code: true },
  " ne changent pas. Adaptez le ",
  { t: "Programme", code: true },
  " pour qu'il fonctionne à nouveau."
]));
children.push(runs([
  { t: "Note : ", b: true },
  "les accesseurs de ",
  { t: "nom", code: true },
  ", ",
  { t: "prenom", code: true },
  " et ",
  { t: "anneeDeNaissance", code: true },
  " sont déjà déclarés dans le squelette — il ne vous reste qu'à compléter leur corps. ",
  "Ne les régénérez pas avec ",
  { t: "Alt+Inser", code: true },
  ", vous obtiendriez des doublons."
]));
children.push(runs([
  "Exécutez le ",
  { t: "Programme", code: true },
  " une fois que tout est vert, et regardez l'âge affiché. Il vaut ",
  { t: "0", code: true },
  ". Notez pourquoi : la réponse fait le sujet de l'exercice suivant."
]));

children.push(h2("Spécifications"));
children.push(specTable([
  ["nom", "private String", "+ getNom() et setNom(String)"],
  ["prenom", "private String", "+ getPrenom() et setPrenom(String)"],
  ["anneeDeNaissance", "private int", "+ getAnneeDeNaissance() et setAnneeDeNaissance(int)"],
  ["age", "private int", "Accesseurs : à vous de décider, et de justifier"],
  ["computeAge", "public int computeAge(int annee)", "Inchangée"],
  ["display", "public void display()", "Inchangée"]
]));

children.push(h2("Vérification"));
children.push(verif([
  { t: "be.ephec.java.poo.e02.PersonneTest", code: true },
  { t: "Vérifie qu'aucun champ n'est resté accessible de l'extérieur, que chaque setter est bien relu par son getter, et que computeAge s'appuie sur l'année réellement enregistrée." }
]));

children.push(h2("Questions à se poser"));
children.push(bullet("Dans setNom(String nom), que se passerait-il si vous écriviez nom = nom au lieu de this.nom = nom ? Essayez : le compilateur ne dit rien."));
children.push(bullet("Un getter et un setter qui ne font que lire et écrire le champ : à quoi servent-ils, puisqu'ils ne contrôlent rien ? Où placeriez-vous une vérification de l'année de naissance ?"));
children.push(bullet("Supposons que vous exposiez un setter pour l'âge. Qu'est-ce qui empêche alors d'enregistrer une personne née en 1990 et âgée de 7 ans ?"));
children.push(bullet("Supposons que vous n'en exposiez pas. Qui renseigne l'âge, et que vaut-il tant que personne ne l'a fait ?"));
children.push(bullet("La question de fond : ce champ mérite-t-il d'exister ? Gardez votre réponse sous la main."));
children.push(runsSimple([
  "Sur le fond de cette question, le mémento Clean Code a deux règles : ",
  { t: "CC-OBJ.2", code: true },
  " — un objet expose des comportements, pas ses données — et ",
  { t: "CC-OBJ.1", code: true },
  ", qui demande de parler à un objet plutôt que de l'interroger. Elles éclairent le choix que vous êtes en train de faire."
]));

children.push(new Paragraph({ children: [new PageBreak()] }));

// ---------- POO.3 ----------
children.push(h1("POO.3 — L'âge n'est pas une donnée à stocker"));
children.push(p("Package : be.ephec.java.poo.e03", { italic: true, color: GREY }));

children.push(h2("Objectif"));
children.push(p("Repérer une donnée redondante et s'en débarrasser. Découvrir qu'une méthode peut calculer ce qu'un champ prétendait mémoriser."));

children.push(h2("Contexte"));
children.push(runs([
  "Depuis POO.1, votre classe ",
  { t: "Personne", code: true },
  " porte deux champs qui disent la même chose : ",
  { t: "anneeDeNaissance", code: true },
  " et ",
  { t: "age", code: true },
  ". Mais l'un est stable et l'autre ne l'est pas."
]));
children.push(p("L'année de naissance d'une personne ne changera jamais. Son âge, lui, augmente chaque année — et rien dans votre classe ne le met à jour. Le champ age est donc juste au moment où on le remplit, puis devient faux et le reste. Une donnée qui se périme toute seule n'a rien à faire dans un objet quand on peut la recalculer."));

children.push(h2("Énoncé"));
children.push(runs([
  "Reprenez la classe ",
  { t: "Personne", code: true },
  " de POO.2 dans le package de cet exercice, et faites-lui subir trois modifications."
]));
children.push(bulletRuns([
  "Supprimez le champ ",
  { t: "age", code: true },
  " ainsi que les accesseurs que vous lui aviez éventuellement donnés en POO.2."
]));
children.push(bulletRuns([
  "Laissez ",
  { t: "computeAge(int annee)", code: true },
  " telle quelle : elle rend l'âge à une année donnée, et cela reste utile."
]));
children.push(bulletRuns([
  "Ajoutez une méthode ",
  { t: "getAge()", code: true },
  ", sans paramètre, qui rend l'âge de la personne aujourd'hui. Elle ne refait pas le ",
  "calcul elle-même : elle appelle ",
  { t: "computeAge", code: true },
  " en lui passant l'année courante."
]));
children.push(runs([
  "Pour obtenir l'année courante, utilisez ",
  { t: "LocalDate.now().getYear()", code: true },
  " (import ",
  { t: "java.time.LocalDate", code: true },
  "). Adaptez enfin le ",
  { t: "Programme", code: true },
  " pour qu'il affiche l'âge sans jamais le renseigner."
]));
children.push(runs([
  { t: "Note : ", b: true },
  "les classes de gestion du temps du JDK — ",
  { t: "LocalDate", code: true },
  ", ",
  { t: "LocalTime", code: true },
  ", ",
  { t: "LocalDateTime", code: true },
  " — font l'objet du cours suivant. Ici, vous n'avez besoin que de ",
  { t: "now()", code: true },
  " et de ",
  { t: "getYear()", code: true },
  "."
]));

children.push(h2("Spécifications"));
children.push(specTable([
  ["nom", "private String", "+ getNom() et setNom(String)"],
  ["prenom", "private String", "+ getPrenom() et setPrenom(String)"],
  ["anneeDeNaissance", "private int", "+ getAnneeDeNaissance() et setAnneeDeNaissance(int)"],
  ["age", "— supprimé —", "Le champ et son getter disparaissent"],
  ["computeAge", "public int computeAge(int annee)", "Inchangée : l'âge à l'année passée en paramètre"],
  ["getAge", "public int getAge()", "L'âge aujourd'hui ; délègue à computeAge"],
  ["display", "public void display()", "Affiche la personne, âge compris"]
]));

children.push(h2("Vérification"));
children.push(verif([
  { t: "be.ephec.java.poo.e03.PersonneTest", code: true },
  { t: "Vérifie qu'aucun champ age ne subsiste, que computeAge répond toujours correctement, et que getAge rend bien l'âge à l'année courante — sans que personne ne l'ait renseigné." },
  { t: "Remarquez que le test porte surtout sur computeAge, qui est déterministe. getAge dépend de la date du jour : il est testable, mais seulement de façon indirecte. C'est la raison pour laquelle les deux méthodes coexistent au lieu d'être fondues en une seule." }
]));

children.push(h2("Questions à se poser"));
children.push(bullet("getAge() n'a ni champ derrière lui, ni setter. Où est passée la donnée ?"));
children.push(bullet("getAge() ne connaît que l'année de naissance. Une personne née en décembre a-t-elle vraiment, au mois de mars, l'âge que votre méthode annonce ? Que faudrait-il connaître pour répondre exactement — et qu'utiliserez-vous au cours suivant pour le faire ?"));
children.push(bullet("Si vous supprimiez computeAge pour ne garder que getAge(), que deviendrait la classe de test ?"));
children.push(runsSimple([
  "Ce que vous venez de faire porte un nom : supprimer une donnée dérivée pour la calculer. ",
  { t: "CC-CLS.1", code: true },
  " en donne la raison générale — une classe doit avoir peu de raisons de changer, et deux données qui disent la même chose en donnent une de plus."
]));

children.push(new Paragraph({ children: [new PageBreak()] }));

// ---------- POO.4 ----------
children.push(h1("POO.4 — Saisie au clavier, et ce qui arrive aux paramètres"));
children.push(p("Package : be.ephec.java.poo.e04", { italic: true, color: GREY }));

children.push(h2("Objectif"));
children.push(runs([
  "Lire des données au clavier avec ",
  { t: "Scanner", code: true },
  ", et comprendre ce que Java transmet réellement lors d'un appel de méthode."
]));

children.push(h2("Énoncé — première partie"));
children.push(runs([
  "Écrivez une classe ",
  { t: "Hello", code: true },
  " contenant une méthode ",
  { t: "main", code: true },
  ". Dans cette méthode, utilisez un ",
  { t: "Scanner", code: true },
  " pour demander à l'utilisateur le nom, le prénom et l'année de naissance d'une personne."
]));
children.push(runs([
  "Créez ensuite une ",
  { t: "Personne", code: true },
  " — une version complete vous est fournie dans le package de cet exercice — ",
  "renseignez-la avec les valeurs saisies, et affichez-la."
]));

children.push(h2("Énoncé — seconde partie"));
children.push(runs([
  "La classe fournie contient déjà une méthode ",
  { t: "modifie(int nombre, Personne personne)", code: true },
  " qui modifie ses deux paramètres. Complétez le ",
  { t: "main", code: true },
  " comme suit :"
]));
children.push(...code([
  "int nombre = 5;",
  "System.out.println(\"avant : \" + nombre + \" / \" + personne.getPrenom());",
  "",
  "modifie(nombre, personne);",
  "",
  "System.out.println(\"après : \" + nombre + \" / \" + personne.getPrenom());"
]));
children.push(p("Exécutez, puis expliquez par écrit ce que vous observez. Les deux paramètres sont traités de la même façon par Java ; pourtant le résultat n'est pas le même pour les deux."));

children.push(h2("Vérification"));
children.push(verif([
  { t: "Pas de classe de test pour cet exercice.", b: true },
  { t: "Un programme qui lit au clavier et écrit à l'écran ne s'automatise pas simplement : il n'expose aucune valeur de retour sur laquelle porter une assertion. C'est exactement le problème que POO.5 va vous apprendre à éviter." },
  { t: "Vérifiez donc à la main, et gardez votre explication écrite : elle sera reprise au cours suivant." }
]));

children.push(h2("Pièges connus"));
children.push(bulletRuns([
  "Après un ",
  { t: "nextInt()", code: true },
  ", le passage à la ligne reste dans le tampon. Un ",
  { t: "nextLine()", code: true },
  " qui suit rend alors une chaîne vide. Ordonnez vos questions pour éviter le problème, ",
  "ou consommez la fin de ligne."
]));
children.push(bulletRuns([
  "N'ouvrez qu'un seul ",
  { t: "Scanner", code: true },
  " sur ",
  { t: "System.in", code: true },
  " pour tout le programme."
]));

children.push(new Paragraph({ children: [new PageBreak()] }));

// ---------- POO.5 ----------
children.push(h1("POO.5 — Changement de base, et logique testable"));
children.push(p("Package : be.ephec.java.poo.e05", { italic: true, color: GREY }));

children.push(h2("Objectif"));
children.push(p("Lire la Javadoc d'une méthode du JDK pour en découvrir une variante. Et séparer pour la première fois le calcul du dialogue avec l'utilisateur."));

children.push(h2("Contexte"));
children.push(runs([
  "La méthode ",
  { t: "Integer.parseInt(String)", code: true },
  " que vous connaissez interprète toujours son argument en base 10. Elle possède une ",
  "seconde version, ",
  { t: "Integer.parseInt(String, int)", code: true },
  ", dont le second paramètre — appelé ",
  { t: "radix", code: true },
  " — indique la base depuis laquelle interpréter le nombre."
]));
children.push(runs([
  "Les constantes ",
  { t: "Character.MIN_RADIX", code: true },
  " et ",
  { t: "Character.MAX_RADIX", code: true },
  " donnent les bases utilisables. Consultez la Javadoc pour connaître leurs valeurs et ",
  "le comportement de la méthode face à une entrée invalide."
]));

children.push(h2("Énoncé"));
children.push(runs([
  "Écrivez une classe ",
  { t: "Base", code: true },
  " qui contient deux choses bien distinctes."
]));
children.push(bulletRuns([
  "Une méthode ",
  { t: "public static int enBase10(String nombre, int base)", code: true },
  " qui rend la valeur décimale du nombre reçu. Cette méthode ne lit rien au clavier et ",
  "n'affiche rien : elle reçoit ses données en paramètres et rend un résultat."
]));
children.push(bulletRuns([
  "Une méthode ",
  { t: "main", code: true },
  " qui annonce d'abord ce que le programme fait — avec un exemple — puis ",
  { t: "boucle", b: true },
  " : elle demande le nombre, puis la base, appelle ",
  { t: "enBase10", code: true },
  ", affiche le résultat, et recommence jusqu'à ce que l'utilisateur entre ",
  { t: "-1", code: true },
  " comme nombre."
]));
children.push(runsSimple([
  { t: "Pourquoi une boucle. ", b: true },
  "Convertir un seul nombre puis quitter oblige à relancer le programme pour en essayer un autre. Or c'est en essayant plusieurs bases sur le même nombre qu'on comprend ce que fait la conversion."
]));
children.push(runsSimple([
  { t: "Un piège vous attend. ", b: true },
  "Mélanger ",
  { t: "nextInt", code: true },
  " et ",
  { t: "nextLine", code: true },
  " dans une boucle fait sauter une question sur deux : ",
  { t: "nextInt", code: true },
  " laisse la fin de ligne dans le tampon, et le ",
  { t: "nextLine", code: true },
  " du tour suivant la ramasse et rend une chaîne vide."
]));
children.push(runsSimple([
  "Essayez, constatez, puis cherchez comment l'",
  { t: "éviter", i: true },
  " plutôt que le rattraper. Une solution tient en un mot."
]));
children.push(runs([
  "Si l'utilisateur tape quelque chose d'invalide — ",
  { t: "FF", code: true },
  " en base 10, ou une base de 1 — le programme s'arrêtera brutalement sur une ",
  { t: "NumberFormatException", code: true },
  " — la boucle comprise, alors qu'il aurait suffi de redemander. C'est le comportement attendu à ce stade : on ne sait pas encore attraper une exception."
]));
children.push(runsSimple([
  "Mais la boucle rend le défaut visible, et c'est exactement ce qui motive le thème ",
  { t: "EXC", code: true },
  " — où cet exercice revient sous la forme ",
  { t: "EXC.4", code: true },
  "."
]));

children.push(h2("Spécifications"));
children.push(specTable([
  ["enBase10", "public static int enBase10(String, int)", "Rend la valeur en base 10 ; toute la logique tient ici"],
  ["main", "public static void main(String[])", "Dialogue avec l'utilisateur, et rien d'autre"]
]));

children.push(h2("Exemples attendus"));
children.push(...code([
  "enBase10(\"255\",      10)   ->   255",
  "enBase10(\"1010\",      2)   ->    10",
  "enBase10(\"11111111\",  2)   ->   255",
  "enBase10(\"FF\",       16)   ->   255",
  "enBase10(\"ff\",       16)   ->   255     (la casse est sans importance)",
  "enBase10(\"ABC\",      16)   ->  2748",
  "enBase10(\"777\",       8)   ->   511",
  "enBase10(\"-FF\",      16)   ->  -255     (le signe est accepte)"
]));

children.push(h2("Vérification"));
children.push(verif([
  { t: "be.ephec.java.poo.e05.BaseTest", code: true },
  { t: "Vérifie les conversions ci-dessus : bases 2, 8, 10 et 16, majuscules comme minuscules, et nombre négatif." },
  { t: "Remarquez que ce test n'est possible que parce que enBase10 rend une valeur. Si vous aviez tout écrit dans le main, il n'y aurait rien à vérifier automatiquement. Nous appliquerons cette séparation systématiquement à partir de maintenant." }
]));

children.push(h2("Questions à se poser"));
children.push(bullet("Faut-il vraiment écrire l'algorithme de conversion vous-même, ou le JDK le fait-il déjà ?"));
children.push(bullet("Pourquoi la base maximale est-elle 36 ?"));
children.push(bullet("enBase10 ne rattrape pas l'exception : elle la laisse passer. Est-ce un oubli ? Qui est le mieux placé pour décider quoi faire d'une saisie invalide, la méthode de calcul ou le programme ?"));
children.push(runsSimple([
  "Cette séparation entre le calcul et le dialogue est la règle ",
  { t: "CC-MET.7", code: true },
  " du mémento Clean Code : une méthode fait quelque chose ou répond à une question, pas les deux. C'est aussi ce qui rend ",
  { t: "enBase10", code: true },
  " testable, alors qu'une méthode qui affiche ne l'est pas — voir ",
  { t: "CC-TST.1", code: true },
  "."
]));

// ---------- Document ----------
const doc = new Document({
  creator: "Frédéric Ferrant — EPHEC",
  title: "Exercices Java — Thème POO",
  numbering: {
    config: [{
      reference: "puces",
      levels: [
        { level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: convertInchesToTwip(0.3), hanging: convertInchesToTwip(0.18) } } } },
        { level: 1, format: LevelFormat.BULLET, text: "\u25E6", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: convertInchesToTwip(0.6), hanging: convertInchesToTwip(0.18) } } } }
      ]
    }]
  },
  sections: [{
    properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    children
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(__dirname + "/../../enonces/POO_enonces.docx", buf);
  console.log("écrit :", buf.length, "octets");
});
