const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle,
  PageBreak, LevelFormat, convertInchesToTwip, Bookmark, InternalHyperlink
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
const ROUGE = "9C2B2B";
const VERT = "2E6B34";
const W = 9360;
const LIEN = "0563C1";

// Un code de regle : CC-NOM.1, CC-ERR.5 ...
const CODE_REGLE = /^(CC-[A-Z]{3}\.\d+)/;

// Les signets Word n'acceptent ni point ni tiret.
function ancre(code) {
  return code.replace(/[.-]/g, "_");
}

function p(text, o = {}) {
  return new Paragraph({
    spacing: { after: o.after === undefined ? 120 : o.after },
    alignment: o.align,
    children: [new TextRun({ text: typo(text), bold: o.bold, italics: o.italic, size: o.size || 22, color: o.color })]
  });
}

function runs(parts, o = {}) {
  return new Paragraph({
    spacing: { after: o.after === undefined ? 120 : o.after },
    children: parts.map(x => {
      if (typeof x === "string") {
        return new TextRun({ text: x, size: 22 });
      }
      // Un renvoi vers une autre regle devient un lien interne.
      if (x.code && CODE_REGLE.test(x.t) && x.t === x.t.trim()) {
        return new InternalHyperlink({
          anchor: ancre(x.t),
          children: [new TextRun({ text: x.t, size: 22, font: MONO, color: LIEN })]
        });
      }
      return new TextRun({
        text: x.t, size: 22, bold: x.b, italics: x.i,
        font: x.code ? MONO : undefined, color: x.code ? "8B2500" : undefined
      });
    })
  });
}

function bullet(text) {
  return new Paragraph({
    numbering: { reference: "puces", level: 0 },
    spacing: { after: 60 },
    children: [new TextRun({ text, size: 22 })]
  });
}

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 160 },
    children: [new TextRun({ text, bold: true, size: 30, color: ACCENT })]
  });
}

function h2(text) {
  const titre = new TextRun({ text, bold: true, size: 25, color: ACCENT });
  const trouve = text.match(CODE_REGLE);
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 120 },
    children: trouve
      ? [new Bookmark({ id: ancre(trouve[1]), children: [titre] })]
      : [titre]
  });
}

// bloc de code etiquete : variante "mauvais" ou "bon"
function bloc(label, lignes, bon) {
  const fill = bon ? "EDF5ED" : "FBEDED";
  const couleur = bon ? VERT : ROUGE;
  const out = [new Paragraph({
    spacing: { before: 140, after: 0 },
    shading: { type: ShadingType.CLEAR, fill },
    indent: { left: 220 },
    children: [new TextRun({ text: typo(label), bold: true, size: 18, color: couleur })]
  })];
  lignes.forEach((l, i) => out.push(new Paragraph({
    spacing: { after: i === lignes.length - 1 ? 140 : 0 },
    shading: { type: ShadingType.CLEAR, fill },
    indent: { left: 220 },
    children: [new TextRun({ text: l === "" ? " " : l, font: MONO, size: 18 })]
  })));
  return out;
}

const mauvais = (l) => bloc("À ÉVITER", l, false);
const bon = (l) => bloc("PRÉFÉREZ", l, true);

function cell(text, o = {}) {
  return new TableCell({
    width: { size: o.width, type: WidthType.DXA },
    shading: o.fill ? { type: ShadingType.CLEAR, fill: o.fill } : undefined,
    margins: { top: 50, bottom: 50, left: 100, right: 100 },
    children: [new Paragraph({
      spacing: { after: 0 },
      children: [new TextRun({ text: typo(text), bold: o.bold, size: o.mono ? 18 : 20, font: o.mono ? MONO : undefined })]
    })]
  });
}

function celluleLien(texte, code, o = {}) {
  return new TableCell({
    width: { size: o.width, type: WidthType.DXA },
    margins: { top: 50, bottom: 50, left: 100, right: 100 },
    children: [new Paragraph({
      spacing: { after: 0 },
      children: [new InternalHyperlink({
        anchor: ancre(code),
        children: [new TextRun({
          text: texte,
          size: o.mono ? 18 : 20,
          font: o.mono ? MONO : undefined,
          color: o.discret ? undefined : LIEN,
          underline: o.discret ? undefined : {}
        })]
      })]
    })]
  });
}

function indexTable(titre, lignes) {
  const widths = [1700, 7660];
  const rows = [new TableRow({
    tableHeader: true,
    children: [
      // Une seule cellule, etendue sur les deux colonnes : le titre a
      // toute la largeur, au lieu de se casser en deux lignes dans une
      // colonne etroite.
      cell(titre, { bold: true, width: widths[0] + widths[1],
                    fill: "DEEAF6", span: 2 })
    ]
  })];
  lignes.forEach(l => {
    const estRegle = CODE_REGLE.test(l[0]) && l[0] === l[0].trim();
    rows.push(new TableRow({
      children: estRegle
        ? [celluleLien(l[0], l[0], { width: widths[0], mono: true }),
           celluleLien(l[1], l[0], { width: widths[1], discret: true })]
        : [cell(l[0], { width: widths[0], mono: true }),
           cell(l[1], { width: widths[1] })]
    }));
  });
  return new Table({ columnWidths: widths, width: { size: W, type: WidthType.DXA }, rows });
}

function encadre(lignes) {
  return new Table({
    columnWidths: [W],
    width: { size: W, type: WidthType.DXA },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 2, color: "A6A6A6" },
      bottom: { style: BorderStyle.SINGLE, size: 2, color: "A6A6A6" },
      left: { style: BorderStyle.SINGLE, size: 12, color: ACCENT },
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
          children: [new TextRun({ text: t.t, size: 21, bold: t.b, font: t.code ? MONO : undefined })]
        }))
      })]
    })]
  });
}

const c = [];

// ---------------- couverture ----------------
c.push(new Paragraph({
  spacing: { before: 1200, after: 120 }, alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: typo("Programmation orientée objet — Java"), size: 26, color: GREY })]
}));
c.push(new Paragraph({
  spacing: { after: 200 }, alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: typo("Mémento Clean Code"), bold: true, size: 52, color: ACCENT })]
}));
c.push(new Paragraph({
  spacing: { after: 800 }, alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: typo("33 règles pour écrire du code qu'on peut relire"), size: 26, color: GREY })]
}));
c.push(p("EPHEC — Bachelier en informatique, niveau 2", { align: AlignmentType.CENTER, color: GREY }));
c.push(p("Année académique 2026-2027", { align: AlignmentType.CENTER, color: GREY }));
c.push(new Paragraph({ children: [new PageBreak()] }));

// ---------------- mode d'emploi ----------------
c.push(h1("À quoi sert ce mémento"));

c.push(p("Un programme est lu bien plus souvent qu'il n'est écrit — par d'autres, et par vous-même dans six mois. Les règles rassemblées ici ne rendent pas votre code plus rapide ni plus correct : elles le rendent lisible. C'est ce qui décide, en pratique, si un programme peut encore être corrigé un an plus tard."));

c.push(runs([
  "Elles viennent pour l'essentiel de ",
  { t: "Clean Code: A Handbook of Agile Software Craftsmanship", i: true },
  ", de Robert C. Martin. Elles ne sont pas des lois : ce sont des réflexes par défaut, dont on s'écarte parfois en sachant pourquoi."
]));

c.push(h2("Comment l'utiliser"));

c.push(p("Ne le lisez pas d'une traite. Chaque règle porte un code, et les énoncés d'exercices y renvoient au moment où elle devient utile : les règles de nommage dès la première séance, celles sur les erreurs avec le thème EXC, celles sur les tests avec JUN."));
c.push(p("La table qui suit sert de sommaire : cliquez sur une règle pour aller à son explication. Les renvois d'une règle à l'autre dans le texte sont eux aussi cliquables."));

c.push(runs([
  "Le code se lit ainsi : ",
  { t: "CC-ERR.2", code: true },
  " désigne la deuxième règle de la section « Traiter les erreurs ». Le préfixe encode le sujet, pas le rang : l'ajout d'une règle ne renumérote jamais les autres."
]));

c.push(runs([
  { t: "Ces règles comptent à l'examen. ", b: true },
  "Le critère de style de la grille d'évaluation s'appuie sur elles, et un commentaire de correction peut y renvoyer directement."
]));

c.push(new Paragraph({ children: [new PageBreak()] }));

// ---------------- index ----------------
c.push(h1("Les règles en un coup d'œil"));

c.push(indexTable("Nommer", [
  ["CC-NOM.1", "Le nom communique l'intention"],
  ["CC-NOM.2", "Le nom ne dit pas autre chose que ce qu'il désigne"],
  ["CC-NOM.3", "Le nom se prononce"],
  ["CC-NOM.4", "Le nom n'encode pas le type"],
  ["CC-NOM.5", "Noms pour les choses, verbes pour les actions, prédicats pour les booléens"],
  ["CC-NOM.6", "La longueur du nom suit la portée"],
  ["CC-NOM.7", "Pas de nombre magique : nommez-le"],
  ["CC-NOM.8", "Déclarez une variable près de l'endroit où elle sert"]
]));
c.push(p("", { after: 200 }));

c.push(indexTable("Écrire une méthode", [
  ["CC-MET.1", "Le nom de la méthode dit ce qu'elle fait"],
  ["CC-MET.2", "Une méthode reste courte"],
  ["CC-MET.3", "Une méthode ne fait qu'une seule chose"],
  ["CC-MET.4", "Le vocabulaire est cohérent d'une méthode à l'autre"],
  ["CC-MET.5", "Pas de drapeau booléen en paramètre"],
  ["CC-MET.6", "Deux paramètres au plus"],
  ["CC-MET.7", "Pas d'effet de bord"],
  ["CC-MET.8", "Une méthode agit ou répond, jamais les deux"]
]));
c.push(p("", { after: 200 }));

c.push(indexTable("Commenter", [
  ["CC-COM.1", "Un commentaire nécessaire signale un code à réécrire"],
  ["CC-COM.2", "Pas de code laissé en commentaire"],
  ["CC-COM.3", "Une Javadoc ne répète pas la signature"]
]));
c.push(p("", { after: 200 }));

c.push(indexTable("Objets et encapsulation", [
  ["CC-OBJ.1", "Demandez à l'objet d'agir, ne lui demandez pas ses entrailles"],
  ["CC-OBJ.2", "Un accesseur n'est pas une obligation"]
]));
c.push(p("", { after: 200 }));

c.push(indexTable("Traiter les erreurs", [
  ["CC-ERR.1", "Une erreur se signale par une exception, pas par une valeur de retour"],
  ["CC-ERR.2", "Ne rendez pas null"],
  ["CC-ERR.3", "Ne passez pas null en paramètre"],
  ["CC-ERR.4", "Le message d'exception dit ce qui a échoué et avec quelle valeur"],
  ["CC-ERR.5", "Définissez vos exceptions selon ce que l'appelant doit distinguer"]
]));
c.push(p("", { after: 200 }));

c.push(indexTable("Écrire des tests", [
  ["CC-TST.1", "Le code de test se soigne comme le code de production"],
  ["CC-TST.2", "Un test vérifie une seule chose"],
  ["CC-TST.3", "Un test est rapide, indépendant, répétable et auto-vérifiant"]
]));
c.push(p("", { after: 200 }));

c.push(indexTable("Structurer une classe", [
  ["CC-CLS.1", "Une classe n'a qu'une raison de changer"],
  ["CC-CLS.2", "Une classe reste petite"],
  ["CC-CLS.3", "Ne vous répétez pas"],
  ["CC-CLS.4", "Préférez le polymorphisme à une chaîne de tests sur un type"]
]));

c.push(new Paragraph({ children: [new PageBreak()] }));

// ================= SECTION NOM =================
c.push(h1("Nommer"));
c.push(p("Les noms que vous choisissez sont un moyen de communication : avec les autres développeurs, avec le correcteur, et avec vous-même dans trois ans. C'est la seule partie du code que personne ne peut deviner à votre place.", { italic: true, color: GREY }));

// --- CC-NOM.1
c.push(h2("CC-NOM.1 — Le nom communique l'intention"));
c.push(p("Si vous avez besoin d'un commentaire pour expliquer ce que contient une variable, c'est que son nom ne le dit pas. Mettez l'explication dans le nom et supprimez le commentaire."));
c.push(...mauvais([
  "int d;   // temps ecoule en jours"
]));
c.push(...bon([
  "int tempsEcouleEnJours;"
]));
c.push(p("L'effet se voit surtout sur un calcul un peu long. Voici la méthode que Robert C. Martin donne en exemple, avant et après :"));
c.push(...mauvais([
  "public static Date addMonths(int months, Date base) {",
  "    int yy = (12 * base.getYear() + base.getMonth() + months - 1) / 12;",
  "    int mm = (12 * base.getYear() + base.getMonth() + months - 1) % 12 + 1;",
  "    int dd = Math.min(base.getDayOfMonth(), Date.lastDayOfMonth(mm, yy));",
  "    return Date.createInstance(dd, mm, yy);",
  "}"
]));
c.push(...bon([
  "public static Date addMonths(int monthsToAdd, Date base) {",
  "    int baseYear         = base.getYear();",
  "    int baseMonth        = base.getMonth() - JANUARY;",
  "    int monthsInBaseYear = 12 * baseYear;",
  "    int baseMonths       = baseMonth + monthsInBaseYear;",
  "    int resultMonths     = baseMonths + monthsToAdd;",
  "    int resultYear       = resultMonths / 12;",
  "    int resultMonth      = resultMonths % 12 + JANUARY;",
  "    int lastDay          = Date.lastDayOfMonth(resultMonth, resultYear);",
  "    int resultDay        = Math.min(base.getDayOfMonth(), lastDay);",
  "    return Date.createInstance(resultDay, resultMonth, resultYear);",
  "}"
]));
c.push(p("La seconde version est plus longue et fait exactement la même chose. Mais on peut la lire : les noms racontent le calcul, là où la première demandait de le reconstituer."));

// --- CC-NOM.2
c.push(h2("CC-NOM.2 — Le nom ne dit pas autre chose que ce qu'il désigne"));
c.push(p("Un nom qui ment est pire qu'un nom vague : il installe une certitude fausse. Veillez à ce que le mot signifie ce qu'il indique, et qu'il indique ce qu'il signifie."));
c.push(...mauvais([
  "public class Pair {",
  "    private Object first, second, third;",
  "",
  "    public Pair(Object first, Object second, Object third) { ... }",
  "}"
]));
c.push(...bon([
  "public class Triplet {",
  "    private Object first, second, third;",
  "",
  "    public Triplet(Object first, Object second, Object third) { ... }",
  "}"
]));
c.push(runs([
  "Ce cas arrive rarement d'emblée : il naît d'une évolution. La classe était bien une paire, on lui a ajouté un troisième élément, et personne n'a renommé. Quand le code change, les noms doivent suivre — ",
  { t: "Maj+F6", code: true },
  " dans IntelliJ renomme partout sans rien casser."
]));
c.push(p("Même piège avec un nom trop précis : appeler listeEtudiants une variable de type Set induit en erreur. Préférez etudiants."));

// --- CC-NOM.3
c.push(h2("CC-NOM.3 — Le nom se prononce"));
c.push(p("Le test est simple : imaginez que vous devez en parler à voix haute à un collègue, au téléphone. Un nom qu'on doit épeler est un nom à changer."));
c.push(...mauvais([
  "private int pq_gwta;",
  "",
  "private int getYYYY() {",
  "    return this.year;",
  "}"
]));
c.push(...bon([
  "private int pointsGagnesAuTotal;",
  "",
  "private int getAnnee() {",
  "    return this.annee;",
  "}"
]));
c.push(p("Ce n'est pas un détail de confort : un nom qu'on ne peut pas prononcer ne peut pas être discuté, et un nom qui ne peut pas être discuté ne sera jamais corrigé."));

// --- CC-NOM.4
c.push(h2("CC-NOM.4 — Le nom n'encode pas le type"));
c.push(p("La notation hongroise, inventée en 1991, préfixait chaque variable par une abréviation de son type. Elle avait un sens à l'époque des éditeurs de texte sans coloration ni saut à la déclaration. Aujourd'hui votre IDE vous donne le type en survolant l'identifiant, et le préfixe ne fait qu'ajouter du bruit — sans compter qu'il devient faux dès que le type change."));
c.push(...mauvais([
  "private boolean bDanger;",
  "private int     iValeur;",
  "private String  strNom;"
]));
c.push(...bon([
  "private boolean enDanger;",
  "private int     valeur;",
  "private String  nom;"
]));
c.push(runs([
  "Une exception tolérée : le préfixe ",
  { t: "I", code: true },
  " devant un nom d'interface (",
  { t: "IForme", code: true },
  "). C'est une habitude venue du monde .NET, encore répandue, et elle a le mérite de distinguer l'interface de son implémentation. Vous la rencontrerez ; en Java, la convention majoritaire est de ne pas l'employer."
]));

// --- CC-NOM.5
c.push(h2("CC-NOM.5 — Noms pour les choses, verbes pour les actions, prédicats pour les booléens"));
c.push(p("Un code bien nommé se lit comme une phrase. Cela suppose de respecter la nature grammaticale de ce qu'on nomme."));
c.push(indexTable("Ce qu'on nomme", [
  ["classe", "un nom : Compte, CompteEpargne, MessageParser, DocumentArchiver"],
  ["variable", "un nom : solde, joueurCourant, listeDeCartes"],
  ["méthode", "un verbe : regrouper, imprimer, envoyer, identifier, creer"],
  ["booléen", "un prédicat, qui se lit après un if : estActif, isClosed, estVide"],
  ["enum", "souvent un adjectif ou un état : TODO, BUSY, DONE, SMALL, LARGE"]
]));
c.push(p("Le résultat se lit à voix haute sans effort :", { after: 60 }));
c.push(...bon([
  "if (panier.estVide())",
  "    afficherMessageDeBienvenue();",
  "",
  "if (paiement.estPossible())",
  "    enregistrerPaiement(paiement);",
  "",
  "if (etudiant.getPoints(cours).estCodeEchec())",
  "    etudiant.recommence(cours);"
]));

// --- CC-NOM.6
c.push(h2("CC-NOM.6 — La longueur du nom suit la portée"));
c.push(p("Pour une variable, plus la portée est large, plus le nom doit être explicite. Un compteur de boucle utilisé sur trois lignes peut s'appeler i ; une variable déclarée en début de méthode et relue trente lignes plus bas ne le peut pas."));
c.push(...mauvais([
  "Tracker tr = new Tracker();",
  "",
  "// ... trente lignes de code ...",
  "",
  "for (int i = 0; i < 10; i++) {",
  "    Message m = new Message();",
  "    m.setSujet(tr.getNom());",
  "    m.envoyer();",
  "}"
]));
c.push(...bon([
  "Tracker tracker = new Tracker();",
  "",
  "// ... trente lignes de code ...",
  "",
  "for (int i = 0; i < 10; i++) {",
  "    Message message = new Message();",
  "    message.setSujet(tracker.getNom());",
  "    message.envoyer();",
  "}"
]));
c.push(runs([
  { t: "Pour les méthodes et les classes, la règle s'inverse. ", b: true },
  "Ce qui est public et largement utilisé porte un nom court ; ce qui est privé et sert à un seul endroit porte un nom long et descriptif."
]));
c.push(...bon([
  "public void agir() {",
  "    tournerDUnAngleAleatoire();",
  "    chercherUnVerDeTerre();",
  "}"
]));

// --- CC-NOM.7
c.push(h2("CC-NOM.7 — Pas de nombre magique : nommez-le"));
c.push(p("Un nombre écrit en dur au milieu du code ne dit ni d'où il vient ni ce qu'il représente. Le lecteur doit le deviner, et celui qui devra le changer devra d'abord tous les retrouver."));
c.push(...mauvais([
  'if (joueur.getPoints() > 10) {',
  '    joueur.promouvoir();',
  '}',
  '',
  'double total = montant * 1.21;'
]));
c.push(...bon([
  'private static final int    POINTS_POUR_PROMOTION = 10;',
  'private static final double TAUX_TVA_STANDARD     = 1.21;',
  '',
  'if (joueur.getPoints() > POINTS_POUR_PROMOTION) {',
  '    joueur.promouvoir();',
  '}',
  '',
  'double total = montant * TAUX_TVA_STANDARD;'
]));
c.push(p("La constante fait deux choses à la fois : elle explique le nombre, et elle le rassemble en un seul endroit. Le jour où le taux de TVA change, il y a une ligne à modifier, pas une chasse à mener dans tout le projet."));
c.push(runs([
  { t: "Tous les nombres ne sont pas magiques. ", b: true },
  "Le critère n'est pas la valeur, c'est ce qu'elle encode. Un nombre qui traduit une ",
  "décision — un seuil, un taux, une limite — pourrait changer un jour, et il mérite un nom. ",
  "Un nombre qui appartient à la mécanique du code ne changera jamais et se passe très bien ",
  "du sien."
]));
c.push(...mauvais([
  'for (int i = 0; i < joueurs.size(); i++) {',
  '    ...',
  '}',
  '',
  'if (joueurs.size() > 4) {',
  '    ...',
  '}'
]));
c.push(...bon([
  '// la boucle ne change pas : le 0 et le i++ sont la mecanique du parcours',
  'for (int i = 0; i < joueurs.size(); i++) {',
  '    ...',
  '}',
  '',
  '// seul le 4 disparait : lui seul encodait une decision',
  'if (joueurs.size() > SEUIL_GRAND_GROUPE) {',
  '    ...',
  '}'
]));
c.push(p("Comparez les deux blocs : la boucle est identique. Ce n'est pas un oubli — c'est la démonstration que ses nombres n'avaient rien à se reprocher. Un seul des trois méritait un nom."));
c.push(runs([
  "Le test à s'appliquer : si quelqu'un vous demandait pourquoi ce nombre-là plutôt qu'un ",
  "autre, auriez-vous quelque chose à répondre ? Si oui, la réponse est le nom de la constante."
]));
c.push(p("Le problème n'est d'ailleurs pas propre aux nombres. Une chaîne de caractères recopiée à plusieurs endroits pose exactement la même difficulté, et une faute de frappe y passe inaperçue — le compilateur ne vérifie pas le contenu d'un littéral."));
c.push(...mauvais([
  'if (utilisateur.getRole().equals("ADMIN")) { ... }',
  '',
  'if (autre.getRole().equals("ADMLN")) { ... }      // qui verra la faute ?'
]));
c.push(...bon([
  'private static final String ROLE_ADMIN = "ADMIN";',
  '',
  'if (utilisateur.getRole().equals(ROLE_ADMIN)) { ... }',
  '',
  'if (autre.getRole().equals(ROLE_ADMLN)) { ... }   // ne compile pas'
]));

// --- CC-NOM.8
c.push(h2("CC-NOM.8 — Déclarez une variable près de l'endroit où elle sert"));
c.push(p("Grouper toutes les déclarations en tête de méthode est une habitude héritée de langages qui l'imposaient. En Java, elle oblige le lecteur à faire des allers-retours et élargit inutilement la portée de chaque variable."));
c.push(...mauvais([
  'public void distribuer(List<Joueur> joueurs) {',
  '    Carte carte;',
  '    int i;',
  '    Joueur joueur;',
  '',
  '    Collections.shuffle(paquet);',
  '',
  '    for (i = 0; i < joueurs.size(); i++) {',
  '        joueur = joueurs.get(i);',
  '        carte = paquet.remove(0);',
  '        joueur.recevoir(carte);',
  '    }',
  '}'
]));
c.push(...bon([
  'public void distribuer(List<Joueur> joueurs) {',
  '    Collections.shuffle(paquet);',
  '',
  '    for (Joueur joueur : joueurs) {',
  '        Carte carte = paquet.remove(0);',
  '        joueur.recevoir(carte);',
  '    }',
  '}'
]));
c.push(runs([
  "Chaque variable naît là où elle sert et disparaît avec le bloc. C'est ",
  { t: "CC-NOM.6", code: true },
  " vu sous un autre angle : plutôt que d'allonger le nom pour compenser une portée large, réduisez la portée."
]));

c.push(new Paragraph({ children: [new PageBreak()] }));

// ================= SECTION MET =================
c.push(h1("Écrire une méthode"));
c.push(p("Une méthode est l'unité de lecture d'un programme. Si elle tient dans un écran et porte un nom exact, on peut la comprendre sans lire ce qu'elle appelle — et c'est ce qui rend un programme entier abordable.", { italic: true, color: GREY }));

// --- CC-MET.1
c.push(h2("CC-MET.1 — Le nom de la méthode dit ce qu'elle fait"));
c.push(p("Le nom doit suffire à l'appelant. S'il faut ouvrir le corps de la méthode pour savoir ce qu'elle fait exactement, le nom est incomplet."));
c.push(...mauvais([
  'public LocalDate addToDate(LocalDate date, int month) {',
  '    return date.plus(month, ChronoUnit.MONTHS);',
  '}',
  '',
  'LocalDate date = LocalDate.now();',
  'date = addToDate(date, 3);      // trois quoi ? jours ? mois ?'
]));
c.push(...bon([
  'public LocalDate addMonthsToDate(LocalDate date, int months) {',
  '    return date.plus(months, ChronoUnit.MONTHS);',
  '}',
  '',
  'LocalDate date = LocalDate.now();',
  'date = addMonthsToDate(date, 3);'
]));
c.push(runs([
  "Notez au passage que le paramètre est passé au pluriel : ",
  { t: "months", code: true },
  " et non ",
  { t: "month", code: true },
  ", puisqu'il en désigne plusieurs. C'est ",
  { t: "CC-NOM.1", code: true },
  " appliqué à un paramètre."
]));

// --- CC-MET.2
c.push(h2("CC-MET.2 — Une méthode reste courte"));
c.push(p("Deux à cinq lignes est l'objectif. C'est court, et volontairement : le but n'est pas d'écrire moins de code, mais de le répartir dans des méthodes qui portent chacune un nom."));
c.push(p("Le moyen d'y arriver n'est pas de compter les lignes, c'est de limiter l'indentation. Le corps d'une méthode devrait tenir en une conditionnelle, une boucle ou un try/catch, contenant un seul appel."));
c.push(...mauvais([
  'public void afficherElements(List<String> liste) {',
  '    if (liste.isEmpty()) {',
  '        System.out.println("La liste est vide.");',
  '    } else {',
  '        for (String element : liste) {',
  '            if (!element.isEmpty()) {',
  '                System.out.println("- " + element);',
  '            }',
  '        }',
  '    }',
  '}'
]));
c.push(...bon([
  'public void afficherElements(List<String> liste) {',
  '    if (liste.isEmpty()) {',
  '        System.out.println("La liste est vide.");',
  '    } else {',
  '        afficherElementsNonVides(liste);',
  '    }',
  '}',
  '',
  'private void afficherElementsNonVides(List<String> liste) {',
  '    for (String element : liste) {',
  '        if (!element.isEmpty()) {',
  '            System.out.println("- " + element);',
  '        }',
  '    }',
  '}'
]));
c.push(runs([
  "Il y a maintenant deux méthodes au lieu d'une, et plus de lignes au total. Ce n'est pas un échec : chacune se lit d'un coup d'œil, et ",
  { t: "afficherElementsNonVides", code: true },
  " porte un nom qui explique ce que faisait la boucle imbriquée."
]));

// --- CC-MET.3
c.push(h2("CC-MET.3 — Une méthode ne fait qu'une seule chose"));
c.push(p("Le test pratique : si vous décrivez ce que fait la méthode et que votre phrase contient un « et », ou descend dans le détail de l'implémentation, elle en fait plusieurs."));
c.push(...mauvais([
  'public static void emailClients(List<Client> clients) {',
  '    for (Client client : clients) {',
  '        ClientRecord record = database.lookup(client);',
  '        if (record.isActive()) {',
  '            sendEmail(client);',
  '        }',
  '    }',
  '}'
]));
c.push(...bon([
  'public static void emailClients(List<Client> clients) {',
  '    for (Client client : clients) {',
  '        if (isActiveClient(client)) {',
  '            sendEmail(client);',
  '        }',
  '    }',
  '}',
  '',
  'private static boolean isActiveClient(Client client) {',
  '    ClientRecord record = database.lookup(client);',
  '    return record.isActive();',
  '}'
]));
c.push(p("La première version mélange deux niveaux : l'intention (envoyer un courriel aux clients actifs) et le moyen de savoir si un client est actif (une consultation en base). La seconde les sépare. Effet secondaire agréable, isActiveClient devient réutilisable ailleurs."));

// --- CC-MET.4
c.push(h2("CC-MET.4 — Le vocabulaire est cohérent d'une méthode à l'autre"));
c.push(p("Des actions semblables portent le même verbe. Sinon le lecteur cherche une différence de sens là où il n'y en a pas."));
c.push(...mauvais([
  'public void loadSingleData();',
  'public void fetchDataFiltered();',
  'public void getAllData();'
]));
c.push(...bon([
  'public void getSingleData();',
  'public void getFilteredData();',
  'public void getAllData();'
]));
c.push(p("Quelle est la différence entre load, fetch et get ? Aucune, dans cet exemple — et c'est précisément le problème : le lecteur suppose qu'il y en a une. Choisissez un verbe par famille d'actions et tenez-vous-y, dans une classe comme dans une équipe."));

// --- CC-MET.5
c.push(h2("CC-MET.5 — Pas de drapeau booléen en paramètre"));
c.push(p("Un booléen qui pilote le comportement d'une méthode annonce qu'elle fait deux choses. Il rend aussi les appels illisibles : rien ne dit ce que signifie true."));
c.push(...mauvais([
  'double d = distance(pointA, pointB, true);'
]));
c.push(...bon([
  'double d = distanceEnKilometres(pointA, pointB);',
  'double d = distanceEnMiles(pointA, pointB);'
]));
c.push(runs([
  "Deux méthodes au lieu d'une, chacune avec un nom qui dit ce qu'elle rend. C'est ",
  { t: "CC-MET.3", code: true },
  " vu depuis la signature : un drapeau booléen est presque toujours le symptôme d'une méthode qui n'a pas été coupée en deux."
]));

// --- CC-MET.6
c.push(h2("CC-MET.6 — Deux paramètres au plus"));
c.push(p("Chaque paramètre supplémentaire est un ordre à retenir et une occasion de se tromper. Au-delà de deux, c'est en général que plusieurs d'entre eux forment un ensemble qui mérite sa propre classe."));
c.push(...mauvais([
  'public void setCustomerAddress(String firstName, String lastName,',
  '                               String streetAddress, String city,',
  '                               String zipCode, String state,',
  '                               String country, String phoneNumber)'
]));
c.push(...bon([
  'public void setCustomerAddress(Address address)'
]));
c.push(p("Le regroupement n'est pas qu'un artifice de comptage : une adresse est bel et bien une chose, et lui donner une classe permet de la valider, de la comparer et de la transporter d'un bloc."));
c.push(encadre([
  { t: "Deux précisions", b: true },
  { t: "Un paramètre variadique en dernière position (String... valeurs) compte pour un seul argument." },
  { t: "Un record est souvent le moyen le plus léger de regrouper des paramètres liés — vous le verrez au thème ENU." }
]));

// --- CC-MET.7
c.push(h2("CC-MET.7 — Pas d'effet de bord"));
c.push(p("Un effet de bord, c'est ce que la méthode fait en plus de ce que son nom annonce. Personne ne s'y attend, donc personne ne s'en méfie."));
c.push(p("Premier cas, l'effet caché sur les données. Imaginez ces deux méthodes :"));
c.push(...mauvais([
  'public Product getProductById(List<Product> products, int id) { ... }',
  '',
  'public int getProductIndexInList(List<Product> products, Product product) { ... }'
]));
c.push(runs([
  "Si l'auteur de ",
  { t: "getProductById", code: true },
  " décide de trier la liste pour accélérer sa recherche, tous les indices rendus auparavant par ",
  { t: "getProductIndexInList", code: true },
  " deviennent faux. Le nom de la méthode ne laissait rien deviner de ce tri. Une méthode dont le nom commence par ",
  { t: "get", code: true },
  " ne doit rien modifier."
]));
c.push(p("Second cas, le mélange du traitement et de l'affichage. C'est de loin le plus fréquent dans vos exercices :"));
c.push(...mauvais([
  'public class CompteBancaire {',
  '    private double solde;',
  '',
  '    public void retirerArgent(double montant) {',
  '        if (solde >= montant) {',
  '            solde -= montant;',
  '            System.out.println("Retrait de " + montant + " effectue.");',
  '        } else {',
  '            System.out.println("Fonds insuffisants.");',
  '        }',
  '    }',
  '}'
]));
c.push(p("La méthode retire de l'argent, ce qui est son travail, mais elle décide aussi de ce qui s'affiche à l'écran — une décision qui ne lui appartient pas. Elle devient inutilisable dans une application graphique, et intestable : il n'y a rien à vérifier qu'un texte parti sur la console."));
c.push(...bon([
  'public class CompteBancaire {',
  '    private double solde;',
  '',
  '    public boolean retirerArgent(double montant) {',
  '        if (solde < montant) {',
  '            return false;',
  '        }',
  '        solde -= montant;',
  '        return true;',
  '    }',
  '}',
  '',
  '// la couche de presentation decide de ce qui s\'affiche',
  'if (compte.retirerArgent(100)) {',
  '    System.out.println("Retrait de 100 effectue.");',
  '} else {',
  '    System.out.println("Fonds insuffisants.");',
  '}'
]));
c.push(runs([
  { t: "Une variante à ne pas retenir. ", b: true },
  "On voit parfois la méthode rester ",
  { t: "void", code: true },
  " et la classe exposer un ",
  { t: "dernierRetraitOK()", code: true },
  " que l'appelant interroge après coup. Cela corrige bien l'affichage, mais introduit un défaut plus grave : la classe mémorise le résultat de la dernière opération, donc deux appels successifs se marchent dessus et l'ordre des instructions devient porteur de sens. Préférez la valeur de retour — ou l'exception, voir ",
  { t: "CC-ERR.1", code: true },
  "."
]));

// --- CC-MET.8
c.push(h2("CC-MET.8 — Une méthode agit ou répond, jamais les deux"));
c.push(p("Une méthode modifie l'état de l'objet — c'est une commande, et elle ne rend rien — ou bien elle répond à une question sans rien modifier — c'est une requête, et elle rend une valeur. Mélanger les deux produit des appels dont on ne sait pas lire l'intention."));
c.push(...mauvais([
  'public boolean setAttribut(String cle, String valeur) { ... }',
  '',
  'if (setAttribut("nom", "Lovelace")) {',
  '    ...',
  '}'
]));
c.push(p("Que teste ce if ? Que l'attribut existait déjà ? Que l'écriture a réussi ? Impossible de le savoir sans ouvrir la méthode. Séparez :"));
c.push(...bon([
  'public void    setAttribut(String cle, String valeur) { ... }   // commande',
  'public boolean contientAttribut(String cle)           { ... }   // requete',
  '',
  'if (contientAttribut("nom")) {',
  '    setAttribut("nom", "Lovelace");',
  '}'
]));
c.push(runs([
  "Cette règle éclaire la nuance de ",
  { t: "CC-ERR.1", code: true },
  " : ",
  { t: "estDecouvert()", code: true },
  " est une requête, elle rend légitimement un booléen ; ",
  { t: "retirer()", code: true },
  " est une commande, donc son échec se signale par une exception et non par une valeur de retour."
]));
c.push(runs([
  "Un repère de nommage utile : une commande porte un verbe d'action (",
  { t: "ajouter", code: true },
  ", ",
  { t: "retirer", code: true },
  ", ",
  { t: "demarrer", code: true },
  "), une requête porte un nom ou un prédicat (",
  { t: "solde", code: true },
  ", ",
  { t: "estVide", code: true },
  "). Voir ",
  { t: "CC-NOM.5", code: true },
  "."
]));

c.push(new Paragraph({ children: [new PageBreak()] }));

// ================= SECTION COM =================
c.push(h1("Commenter"));
c.push(p("Un commentaire n'est ni compilé, ni testé, ni mis à jour par personne. Il vieillit donc plus vite que le code qu'il décrit, et un commentaire faux fait plus de dégâts qu'un commentaire absent.", { italic: true, color: GREY }));

// --- CC-COM.1
c.push(h2("CC-COM.1 — Un commentaire nécessaire signale un code à réécrire"));
c.push(p("Avant d'écrire un commentaire, demandez-vous s'il n'existe pas un moyen de le dire dans le code. La plupart du temps, il suffit d'extraire une méthode et de lui donner le nom que vous alliez écrire en commentaire."));
c.push(...mauvais([
  '// verifie si l\'employe a droit a tous les avantages',
  'if (employe.getAnciennete() > 5 && employe.getStatut() == Statut.TEMPS_PLEIN) {',
  '    ...',
  '}'
]));
c.push(...bon([
  'if (employe.aDroitATousLesAvantages()) {',
  '    ...',
  '}'
]));
c.push(runs([
  "Le commentaire a disparu et l'information est toujours là — mieux, elle est désormais réutilisable et testable. C'est le même mouvement qu'en ",
  { t: "CC-NOM.1", code: true },
  ", appliqué cette fois à une expression."
]));
c.push(p("Restent les commentaires qui ont leur place : expliquer un pourquoi qu'aucun nom ne peut porter — une contrainte légale, un contournement de bug, une décision de conception surprenante. Ceux-là, écrivez-les."));
c.push(...bon([
  '// L\'arrondi se fait a 2 decimales : impose par la reglementation',
  '// belge sur la facturation (AR du 21/12/2012).',
  'montant = montant.setScale(2, RoundingMode.HALF_UP);'
]));

// --- CC-COM.2
c.push(h2("CC-COM.2 — Pas de code laissé en commentaire"));
c.push(p("Du code commenté pose une question sans réponse à tous ceux qui le liront : est-ce important ? Est-ce que quelqu'un compte le remettre ? Personne n'osera le supprimer, et il restera là des années."));
c.push(...mauvais([
  'public double calculerTarif() {',
  '    // ancienne formule, a garder au cas ou',
  '    // return prixBase * 1.21;',
  '    return prixBase * tauxTva;',
  '}'
]));
c.push(...bon([
  'public double calculerTarif() {',
  '    return prixBase * tauxTva;',
  '}'
]));
c.push(p("Supprimez. Si vous travaillez avec Git, la version précédente est conservée et retrouvable ; si vous n'utilisez pas encore Git, c'est une raison de plus de vous y mettre."));

// --- CC-COM.3
c.push(h2("CC-COM.3 — Une Javadoc ne répète pas la signature"));
c.push(p("Une Javadoc qui paraphrase les noms des paramètres n'apporte rien et donne l'illusion que la méthode est documentée."));
c.push(...mauvais([
  '/**',
  ' * Retire un montant.',
  ' *',
  ' * @param montant le montant',
  ' * @return un boolean',
  ' */',
  'public boolean retirerArgent(double montant) { ... }'
]));
c.push(...bon([
  '/**',
  ' * Retire un montant du compte, si le solde le permet.',
  ' *',
  ' * @param montant le montant a retirer, strictement positif',
  ' * @return true si le retrait a eu lieu, false si le solde etait insuffisant',
  ' */',
  'public boolean retirerArgent(double montant) { ... }'
]));
c.push(p("Une Javadoc utile répond à ce que la signature ne dit pas : quelles valeurs sont acceptables, ce qui se passe dans les cas limites, ce qui est levé et quand. Le reste est déjà écrit juste en dessous."));

c.push(new Paragraph({ children: [new PageBreak()] }));

// ================= SECTION OBJ =================
c.push(h1("Objets et encapsulation"));
c.push(p("Encapsuler ne consiste pas à rendre les champs privés puis à ouvrir un accesseur pour chacun : cela revient au même en plus verbeux. Encapsuler, c'est décider de ce que l'objet accepte de faire, pas de ce qu'il accepte de montrer.", { italic: true, color: GREY }));

// --- CC-OBJ.1
c.push(h2("CC-OBJ.1 — Demandez à l'objet d'agir, ne lui demandez pas ses entrailles"));
c.push(p("Une chaîne d'appels qui traverse plusieurs objets révèle leur structure interne à qui ne devrait pas la connaître. Le jour où l'un d'eux change, tout le code qui traversait la chaîne casse."));
c.push(...mauvais([
  'partie.getVainqueur().getCompte().crediter(10);'
]));
c.push(...bon([
  'partie.crediterVainqueur(10);'
]));
c.push(runs([
  "L'appelant sait maintenant une seule chose : une partie peut créditer son vainqueur. Il ignore qu'un ",
  { t: "Joueur", code: true },
  " possède un ",
  { t: "Compte", code: true },
  ", et le jour où ce n'est plus le cas, seule la classe ",
  { t: "Partie", code: true },
  " est à modifier."
]));
c.push(p("Cette règle porte le nom de loi de Déméter, résumée par la formule « ne parlez qu'à vos amis proches ». En pratique, méfiez-vous de tout enchaînement de plus de deux points sur des objets de votre domaine."));
c.push(runs([
  { t: "Attention à ne pas sur-appliquer. ", b: true },
  "La règle vise les objets de votre domaine, pas les chaînes de construction ou les bibliothèques conçues ainsi. ",
  { t: "LocalDate.now().getYear()", code: true },
  " est parfaitement correct — vous l'avez d'ailleurs écrit en POO.3."
]));

// --- CC-OBJ.2
c.push(h2("CC-OBJ.2 — Un accesseur n'est pas une obligation"));
c.push(p("Générer mécaniquement un getter et un setter pour chaque champ annule l'encapsulation qu'on venait de mettre en place. Chaque accesseur est une décision : ce champ doit-il vraiment être lisible, et surtout modifiable, depuis l'extérieur ?"));
c.push(...mauvais([
  'public class Partie {',
  '    private List<Joueur> joueurs;',
  '',
  '    public List<Joueur> getJoueurs()               { return joueurs; }',
  '    public void setJoueurs(List<Joueur> joueurs)   { this.joueurs = joueurs; }',
  '}',
  '',
  '// n\'importe qui peut vider la partie de ses joueurs :',
  'partie.getJoueurs().clear();'
]));
c.push(...bon([
  'public class Partie {',
  '    private final List<Joueur> joueurs = new ArrayList<>();',
  '',
  '    public void ajouterJoueur(Joueur joueur) {',
  '        joueurs.add(joueur);',
  '    }',
  '',
  '    public int nombreDeJoueurs() {',
  '        return joueurs.size();',
  '    }',
  '}'
]));
c.push(p("La seconde version n'expose aucune liste. Elle expose deux opérations, qui sont ce dont l'appelant a réellement besoin. Et le jour où une partie doit refuser un cinquième joueur, il y a un endroit où écrire cette règle."));
c.push(runs([
  "Vous avez rencontré cette question dès POO.2, à propos du champ ",
  { t: "age", code: true },
  " : un getter sans setter, un setter, ou rien. La réponse était « rien », parce que la donnée elle-même n'avait pas lieu d'être."
]));

c.push(new Paragraph({ children: [new PageBreak()] }));

// ================= SECTION ERR =================
c.push(h1("Traiter les erreurs"));
c.push(p("Ces quatre règles s'appliquent au thème EXC, mais elles décident aussi de la lisibilité du code qui les appelle. Mal traitée, une erreur oblige chaque appelant à vérifier, à commenter, et finalement à oublier de vérifier.", { italic: true, color: GREY }));

// --- CC-ERR.1
c.push(h2("CC-ERR.1 — Une erreur se signale par une exception, pas par une valeur de retour"));
c.push(p("Une valeur de retour qui code un échec oblige l'appelant à s'en souvenir. Rien dans le langage ne l'y contraint, et le jour où il oublie, le programme continue avec des données fausses — sans rien signaler."));
c.push(...mauvais([
  "public boolean retirer(double montant) {",
  "    if (solde < montant) {",
  "        return false;",
  "    }",
  "    solde -= montant;",
  "    return true;",
  "}",
  "",
  "// chez l'appelant, rien n'oblige a ecrire ceci :",
  "compte.retirer(500);   // et si le retrait a echoue ?"
]));
c.push(...bon([
  "public void retirer(double montant) {",
  "    if (solde < montant) {",
  "        throw new SoldeInsuffisantException(",
  "                \"Retrait de \" + montant + \" refuse : solde de \" + solde);",
  "    }",
  "    solde -= montant;",
  "}",
  "",
  "// chez l'appelant, l'echec ne peut plus passer inapercu :",
  "compte.retirer(500);"
]));
c.push(runs([
  { t: "Nuance. ", b: true },
  "Un booléen de retour n'est pas toujours mauvais : il est bien meilleur qu'un ",
  { t: "System.out.println", code: true },
  " dans la classe (voir ",
  { t: "CC-MET.7", code: true },
  "). La question à se poser est : s'agit-il d'une ",
  { t: "réponse", i: true },
  " ou d'une ",
  { t: "erreur", i: true },
  " ? ",
  { t: "estDecouvert()", code: true },
  " rend légitimement un booléen, parce que les deux réponses sont normales. ",
  { t: "retirer()", code: true },
  " ne le devrait pas, parce que l'échec est anormal."
]));

// --- CC-ERR.2
c.push(h2("CC-ERR.2 — Ne rendez pas null"));
c.push(p("Rendre null revient à demander à chaque appelant d'écrire une vérification, pour toujours. Un seul oubli et le programme s'arrête sur une NullPointerException, à un endroit qui n'a rien à voir avec la cause."));
c.push(...mauvais([
  "public Joueur chercherJoueur(String pseudo) {",
  "    for (Joueur joueur : joueurs) {",
  "        if (joueur.getPseudo().equals(pseudo)) {",
  "            return joueur;",
  "        }",
  "    }",
  "    return null;",
  "}"
]));
c.push(...bon([
  "public Joueur chercherJoueur(String pseudo) {",
  "    for (Joueur joueur : joueurs) {",
  "        if (joueur.getPseudo().equals(pseudo)) {",
  "            return joueur;",
  "        }",
  "    }",
  "    throw new JoueurInconnuException(\"Aucun joueur nomme \" + pseudo);",
  "}"
]));
c.push(runs([
  "La règle vaut aussi pour les collections, et là c'est encore plus simple : rendez une collection vide, jamais ",
  { t: "null", code: true },
  ". L'appelant peut alors faire son ",
  { t: "for", code: true },
  " sans rien vérifier, et la boucle ne tourne simplement pas."
]));
c.push(...mauvais([
  "if (partie.getJoueurs() != null) {",
  "    for (Joueur joueur : partie.getJoueurs()) { ... }",
  "}"
]));
c.push(...bon([
  "for (Joueur joueur : partie.getJoueurs()) { ... }"
]));

// --- CC-ERR.3
c.push(h2("CC-ERR.3 — Ne passez pas null en paramètre"));
c.push(p("Le symétrique de la règle précédente. Une méthode qui accepte null pour l'un de ses paramètres doit le tester, et son comportement devient difficile à décrire. Quand un paramètre est facultatif, écrivez plutôt deux méthodes."));
c.push(...mauvais([
  "public void demarrer(Joueur premier, Joueur second, Strategie strategie) {",
  "    if (strategie == null) {",
  "        strategie = new StrategieTimide();",
  "    }",
  "    ...",
  "}",
  "",
  "partie.demarrer(alice, bob, null);"
]));
c.push(...bon([
  "public void demarrer(Joueur premier, Joueur second) {",
  "    demarrer(premier, second, new StrategieTimide());",
  "}",
  "",
  "public void demarrer(Joueur premier, Joueur second, Strategie strategie) {",
  "    ...",
  "}",
  "",
  "partie.demarrer(alice, bob);"
]));
c.push(p("La surcharge dit explicitement ce que veut l'appelant, et la méthode principale n'a plus de cas particulier à traiter."));

// --- CC-ERR.4
c.push(h2("CC-ERR.4 — Le message d'exception dit ce qui a échoué et avec quelle valeur"));
c.push(p("Le message d'une exception est souvent la seule information dont vous disposerez pour comprendre un incident. Un message qui ne nomme ni l'opération ni la valeur fautive ne sert à rien."));
c.push(...mauvais([
  "throw new IllegalArgumentException(\"Erreur\");",
  "throw new IllegalArgumentException(\"Valeur invalide\");",
  "throw new IllegalArgumentException();"
]));
c.push(...bon([
  "throw new IllegalArgumentException(",
  "        \"Nombre de cartes invalide : \" + nombre + \" (attendu entre 1 et 52)\");"
]));
c.push(p("Trois ingrédients suffisent : ce qui était attendu, ce qui a été reçu, et le nom de ce qu'on manipulait. Écrivez le message en pensant à quelqu'un qui lira la trace sans avoir le code sous les yeux."));
c.push(h2("CC-ERR.5 — Définissez vos exceptions selon ce que l'appelant doit distinguer"));
c.push(p("Quand vous créez une classe d'exception, la question n'est pas « quelle erreur technique s'est produite ». Elle est : celui qui l'attrape va-t-il réagir différemment ? Si la réponse est non, une seule classe suffit."));
c.push(...mauvais([
  'try {',
  '    compte.retirer(montant);',
  '} catch (SoldeInsuffisantException e) {',
  '    afficherErreur(e.getMessage());',
  '} catch (CompteBloqueException e) {',
  '    afficherErreur(e.getMessage());',
  '} catch (MontantNegatifException e) {',
  '    afficherErreur(e.getMessage());',
  '}'
]));
c.push(p("Trois classes d'exception, trois blocs identiques : la distinction n'a servi à rien, sinon à alourdir chaque appelant. Une seule classe, avec un message précis, aurait suffi."));
c.push(...bon([
  'try {',
  '    compte.retirer(montant);',
  '} catch (RetraitImpossibleException e) {',
  '    afficherErreur(e.getMessage());',
  '}'
]));
c.push(p("L'inverse est vrai aussi : si l'appelant doit vraiment réagir autrement — proposer un découvert dans un cas, appeler le service client dans l'autre — alors deux classes distinctes se justifient pleinement. C'est le besoin de l'appelant qui décide, jamais la cause technique."));
c.push(encadre([
  { t: "Ce que le message ne doit pas faire", b: true },
  { t: "Ne construisez pas le message avec des informations sensibles — mot de passe, numéro de compte complet. La trace d'exception finit souvent dans un fichier de log que beaucoup de gens peuvent lire." },
  { t: "N'écrivez pas non plus le message en pensant à l'utilisateur final : ce n'est pas lui qui le lira. Le message d'exception est destiné au développeur ; le message affiché à l'écran est une autre affaire, décidée par l'appelant." }
]));

c.push(new Paragraph({ children: [new PageBreak()] }));

// ---------------- suite ----------------
// ================= SECTION TST =================
c.push(h1("Écrire des tests"));
c.push(p("Une classe de test est du code que vous relirez et modifierez pendant toute la vie du projet. Elle mérite donc le même soin que le reste — et elle obéit à quelques règles qui lui sont propres.", { italic: true, color: GREY }));

// --- CC-TST.1
c.push(h2("CC-TST.1 — Le code de test se soigne comme le code de production"));
c.push(p("Un test illisible ne sera pas maintenu ; un test non maintenu finit désactivé ; une suite désactivée ne protège plus rien. Les règles de nommage et de longueur s'appliquent donc intégralement aux tests."));
c.push(...mauvais([
  '@Test',
  'void test1() {',
  '    Compte c = new Compte();',
  '    c.deposer(100);',
  '    c.retirerArgent(30);',
  '    assertEquals(70, c.getSolde());',
  '}'
]));
c.push(...bon([
  '@Test',
  '@DisplayName("Un retrait diminue le solde du montant retire")',
  'void unRetraitDiminueLeSolde() {',
  '    Compte compte = new Compte();',
  '    compte.deposer(100);',
  '',
  '    compte.retirerArgent(30);',
  '',
  '    assertEquals(70, compte.getSolde());',
  '}'
]));
c.push(p("Le nom de la méthode de test énonce le comportement attendu. Quand le test passe au rouge, ce nom est la première chose que vous lirez — et souvent la seule dont vous aurez besoin pour comprendre ce qui est cassé."));
c.push(p("Notez aussi la disposition en trois temps, séparés par une ligne vide : préparer, agir, vérifier. Elle se retrouve dans presque tous les tests et se repère d'un coup d'œil."));

// --- CC-TST.2
c.push(h2("CC-TST.2 — Un test vérifie une seule chose"));
c.push(p("Quand un test vérifie trois comportements, son échec ne vous dit pas lequel est cassé, et les vérifications situées après la première qui échoue ne sont même pas exécutées."));
c.push(...mauvais([
  '@Test',
  'void testCompte() {',
  '    Compte compte = new Compte();',
  '    compte.deposer(100);',
  '    assertEquals(100, compte.getSolde());',
  '',
  '    assertTrue(compte.retirerArgent(30));',
  '    assertEquals(70, compte.getSolde());',
  '',
  '    assertFalse(compte.retirerArgent(1000));',
  '    assertEquals(70, compte.getSolde());',
  '}'
]));
c.push(...bon([
  '@Test',
  'void unDepotAugmenteLeSolde() { ... }',
  '',
  '@Test',
  'void unRetraitPossibleDiminueLeSolde() { ... }',
  '',
  '@Test',
  'void unRetraitTropGrandEstRefuseEtLaisseLeSoldeIntact() { ... }'
]));
c.push(p("Plusieurs assertions dans un même test restent acceptables tant qu'elles décrivent un seul comportement — vérifier le résultat rendu et l'état de l'objet après la même action, par exemple. La règle porte sur le nombre de comportements, pas sur le nombre de lignes assertXxx."));
c.push(encadre([
  { t: "Un test sans assertion ne teste rien", b: true },
  { t: "Une méthode annotée @Test qui se contente d'appeler du code passe au vert quoi qu'il arrive : le seul cas où elle échoue est celui d'une exception inattendue. Elle donne donc une impression de couverture sans vérifier aucun comportement." },
  { t: "C'est l'erreur la plus fréquente dans les classes de test rendues à l'examen. Avant de considérer un test comme écrit, cherchez son assertion." }
]));

// --- CC-TST.3
c.push(h2("CC-TST.3 — Un test est rapide, indépendant, répétable et auto-vérifiant"));
c.push(p("Ces qualités sont résumées par l'acronyme F.I.R.S.T., cinq mots anglais."));
c.push(indexTable("Qualité", [
  ["Fast", "Rapide. Une suite lente n'est plus lancée, donc ne sert plus à rien."],
  ["Independent", "Indépendant. Aucun test ne suppose qu'un autre a tourné avant lui, ni dans quel ordre."],
  ["Repeatable", "Répétable. Même résultat sur votre machine, celle du voisin, et dans six mois."],
  ["Self-validating", "Auto-vérifiant. Le test dit vert ou rouge, sans que personne n'ait à lire une sortie console."],
  ["Timely", "Écrit tôt. Idéalement avant le code, comme dans l'exercice JUN.1."]
]));
c.push(p("La répétabilité est celle qui vous piégera le plus tôt. Un test qui s'appuie sur la date du jour, sur un tirage aléatoire ou sur un fichier présent seulement chez vous passera au rouge un matin, sans que rien n'ait changé dans le code."));
c.push(...mauvais([
  '@Test',
  'void ageDeLaPersonne() {',
  '    Personne personne = new Personne();',
  '    personne.setAnneeDeNaissance(1990);',
  '',
  '    assertEquals(36, personne.getAge());     // faux des le 1er janvier',
  '}'
]));
c.push(...bon([
  '@Test',
  'void ageDeLaPersonne() {',
  '    Personne personne = new Personne();',
  '    personne.setAnneeDeNaissance(1990);',
  '',
  '    assertEquals(35, personne.computeAge(2025));',
  '}'
]));
c.push(runs([
  "C'est exactement la raison pour laquelle ",
  { t: "computeAge(int annee)", code: true },
  " existe à côté de ",
  { t: "getAge()", code: true },
  " en POO.3 : le noyau déterministe est testable, la commodité qui dépend du jour ne l'est qu'indirectement."
]));

c.push(new Paragraph({ children: [new PageBreak()] }));

// ================= SECTION CLS =================
c.push(h1("Structurer une classe"));
c.push(p("Les deux dernières règles sont les mêmes que celles sur les méthodes, appliquées un cran au-dessus. Ce n'est pas un hasard : une bonne conception répète le même principe à chaque échelle.", { italic: true, color: GREY }));

// --- CC-CLS.1
c.push(h2("CC-CLS.1 — Une classe n'a qu'une raison de changer"));
c.push(p("Décrivez la classe en une phrase. Si vous devez employer « et », elle porte plusieurs responsabilités — et chacune la fera évoluer pour des motifs différents, à des moments différents, souvent par des personnes différentes."));
c.push(...mauvais([
  'public class Facture {',
  '    public double calculerTotal()   { ... }   // regles metier',
  '    public void enregistrerEnBase() { ... }   // persistance',
  '    public String enHtml()          { ... }   // presentation',
  '}'
]));
c.push(...bon([
  'public class Facture {',
  '    public double calculerTotal() { ... }',
  '}',
  '',
  'public class DepotFactures {',
  '    public void enregistrer(Facture facture) { ... }',
  '}',
  '',
  'public class FactureEnHtml {',
  '    public String convertir(Facture facture) { ... }',
  '}'
]));
c.push(p("Trois raisons de changer, trois classes : un taux de TVA qui bouge, une base de données qu'on remplace, une maquette qu'on refait. Chacune touche un seul fichier."));
c.push(runs([
  "Vous reconnaîtrez ici la même faute qu'en ",
  { t: "CC-MET.7", code: true },
  " avec le ",
  { t: "CompteBancaire", code: true },
  " qui affichait ses messages : mélanger le traitement et la présentation. C'est le cas de figure le plus courant, et le plus coûteux."
]));

// --- CC-CLS.2
c.push(h2("CC-CLS.2 — Une classe reste petite"));
c.push(p("La taille d'une classe ne se mesure pas en lignes mais en responsabilités. Une classe de quarante méthodes est presque toujours plusieurs classes qui s'ignorent."));
c.push(p("Un indice fiable : regardez quels champs chaque méthode utilise. Si un groupe de méthodes ne touche qu'à un sous-ensemble des champs, et un autre groupe au reste, vous tenez deux classes."));
c.push(...mauvais([
  'public class Joueur {',
  '    private String pseudo;',
  '    private String email;',
  '    private String rue;',
  '    private String codePostal;',
  '    private String ville;',
  '    private String pays;',
  '',
  '    public String adresseFormatee()   { ... }   // n\'utilise que les 4 derniers',
  '    public boolean adresseValide()    { ... }   // idem',
  '    public boolean emailValide()      { ... }',
  '}'
]));
c.push(...bon([
  'public class Joueur {',
  '    private String pseudo;',
  '    private String email;',
  '    private Adresse adresse;',
  '',
  '    public boolean emailValide() { ... }',
  '}',
  '',
  'public record Adresse(String rue, String codePostal, String ville, String pays) {',
  '    public String formatee() { ... }',
  '    public boolean valide()  { ... }',
  '}'
]));
c.push(runs([
  "C'est le même regroupement qu'en ",
  { t: "CC-MET.6", code: true },
  " : des données qui voyagent ensemble et que les mêmes méthodes manipulent forment une chose, et cette chose mérite un nom."
]));

// --- CC-CLS.3
c.push(h2("CC-CLS.3 — Ne vous répétez pas"));
c.push(p("Toute duplication est une occasion de divergence. Le jour où la règle change, on modifie une copie et on oublie les autres — et le programme se met à donner deux réponses différentes à la même question."));
c.push(p("La duplication la plus fréquente, et la plus coûteuse, se cache entre les sous-classes d'une même hiérarchie :"));
c.push(...mauvais([
  'public class JeuDeCartes extends Jeu {',
  '    public double calculerTarif() {',
  '        double tarif = prixBase * duree;',
  '        if (nombreDeJoueurs > 4) {',
  '            tarif *= 1.2;',
  '        }',
  '        return tarif;',
  '    }',
  '}',
  '',
  'public class JeuDePlateau extends Jeu {',
  '    public double calculerTarif() {',
  '        double tarif = prixBase * duree;',
  '        if (nombreDeJoueurs > 4) {',
  '            tarif *= 1.2;',
  '        }',
  '        return tarif * 0.9;',
  '    }',
  '}'
]));
c.push(p("Les deux méthodes sont identiques à un coefficient près. Remontez ce qui est commun dans la classe abstraite et ne laissez descendre que ce qui varie :"));
c.push(...bon([
  'public abstract class Jeu {',
  '',
  '    private static final int    SEUIL_GRAND_GROUPE     = 4;',
  '    private static final double MAJORATION_GRAND_GROUPE = 1.2;',
  '',
  '    public double calculerTarif() {',
  '        double tarif = prixBase * duree;',
  '        if (nombreDeJoueurs > SEUIL_GRAND_GROUPE) {',
  '            tarif *= MAJORATION_GRAND_GROUPE;',
  '        }',
  '        return tarif * coefficient();',
  '    }',
  '',
  '    protected abstract double coefficient();',
  '}',
  '',
  'public class JeuDePlateau extends Jeu {',
  '    protected double coefficient() {',
  '        return 0.9;',
  '    }',
  '}'
]));
c.push(runs([
  "Le calcul du tarif n'existe plus qu'à un seul endroit, et chaque sous-classe se réduit à ce qui la distingue vraiment. Notez que les constantes de ",
  { t: "CC-NOM.7", code: true },
  " sont venues d'elles-mêmes : dès qu'on rassemble, les nombres magiques deviennent visibles."
]));
c.push(runs([
  { t: "C'est une erreur très fréquente à l'examen. ", b: true },
  "Devant une hiérarchie, le réflexe est de recopier la méthode dans chaque sous-classe et d'y changer un détail. Le bon réflexe est de chercher ce qui est commun d'abord."
]));

// --- CC-CLS.4
c.push(h2("CC-CLS.4 — Préférez le polymorphisme à une chaîne de tests sur un type"));
c.push(p("Quand une méthode demande à un objet de quel type il est pour décider quoi faire, c'est que le travail devrait être confié à l'objet lui-même."));
c.push(...mauvais([
  'public double calculerTarif(Jeu jeu) {',
  '    if (jeu instanceof JeuDeCartes) {',
  '        return jeu.getPrixBase() * 1.0;',
  '    } else if (jeu instanceof JeuDePlateau) {',
  '        return jeu.getPrixBase() * 0.9;',
  '    } else if (jeu instanceof JeuVideo) {',
  '        return jeu.getPrixBase() * 1.5;',
  '    }',
  '    throw new IllegalArgumentException("Type de jeu inconnu");',
  '}'
]));
c.push(...bon([
  '// chaque sous-classe repond pour elle-meme',
  'double tarif = jeu.calculerTarif();'
]));
c.push(p("La différence décisive apparaît le jour où vous ajoutez un type de jeu. Avec la chaîne de tests, il faut retrouver tous les endroits qui testent le type — et rien ne vous signale ceux que vous avez oubliés : le programme compile et se contente de lever son exception à l'exécution."));
c.push(runs([
  "Avec le polymorphisme, la méthode ",
  { t: "abstract", code: true },
  " de la classe mère oblige le compilateur à réclamer l'implémentation manquante. L'oubli devient impossible."
]));
c.push(runs([
  { t: "Une exception à la règle. ", b: true },
  "Un ",
  { t: "switch", code: true },
  " sur une énumération d'états ou de commandes est parfaitement légitime — ce n'est pas un test de type. La règle vise les cascades de ",
  { t: "instanceof", code: true },
  " et les switch sur un champ qui code le type d'un objet."
]));

c.push(new Paragraph({ children: [new PageBreak()] }));

c.push(h1("La règle du boy-scout"));
c.push(p("Trente-trois règles, cela peut décourager. Elles ne se prennent pas d'un bloc, et personne n'écrit du code parfait du premier coup — pas même l'auteur du livre dont elles viennent."));
c.push(p("Les scouts américains ont une consigne de camp : laissez l'emplacement plus propre que vous ne l'avez trouvé. Appliquée au code, elle donne une règle praticable : chaque fois que vous ouvrez un fichier, améliorez une chose. Un nom plus clair, un commentaire remplacé par une méthode nommée, une constante à la place d'un nombre magique."));
c.push(p("Une seule chose, pas dix. C'est suffisant pour qu'un programme s'améliore avec le temps au lieu de se dégrader — ce qui est, en pratique, le seul objectif atteignable."));

c.push(h1("Pour aller plus loin"));

c.push(runs([
  { t: "Clean Code: A Handbook of Agile Software Craftsmanship", i: true },
  ", Robert C. Martin, Prentice Hall, 2008. Les chapitres 2 (noms), 3 (fonctions), 4 (commentaires), 6 (objets), 7 (erreurs), 9 (tests) et 10 (classes) correspondent aux sections de ce mémento."
]));
c.push(p("Le site cleancoders.com propose les vidéos de l'auteur. La conférence « Clean Code » d'Uncle Bob, disponible en ligne, en donne un aperçu d'une heure."));

// ---------------- document ----------------
const doc = new Document({
  creator: "Frédéric Ferrant — EPHEC",
  title: "Mémento Clean Code",
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
    children: c
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(__dirname + "/../../documents/Memento_Clean_Code.docx", buf);
  console.log("écrit :", buf.length, "octets");
});
