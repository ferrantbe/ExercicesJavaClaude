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
const LIEN = "0563C1";
const W = 9360;

const CODE_SECTION = /^(TEC-[A-Z]{2,3}\.\d+)/;
const ancre = (c) => c.replace(/[.-]/g, "_");

function p(text, o = {}) {
  return new Paragraph({
    spacing: { after: o.after === undefined ? 120 : o.after },
    alignment: o.align,
    children: [new TextRun({ text: typo(text), bold: o.bold, italics: o.italic, size: o.size || 22, color: o.color })]
  });
}

function morceaux(list) {
  return list.map(x => {
    if (typeof x === "string") return new TextRun({ text: x, size: 22 });
    if (x.code && CODE_SECTION.test(x.t) && x.t === x.t.trim()) {
      return new InternalHyperlink({
        anchor: ancre(x.t),
        children: [new TextRun({ text: x.t, size: 22, font: MONO, color: LIEN })]
      });
    }
    return new TextRun({
      text: x.t, size: 22, bold: x.b, italics: x.i,
      font: x.code ? MONO : undefined, color: x.code ? "8B2500" : undefined
    });
  });
}

function runs(list, o = {}) {
  return new Paragraph({ spacing: { after: o.after === undefined ? 120 : o.after }, children: morceaux(list) });
}

function bullet(text) {
  return new Paragraph({
    numbering: { reference: "puces", level: 0 }, spacing: { after: 60 },
    children: [new TextRun({ text, size: 22 })]
  });
}

function bulletRuns(list) {
  return new Paragraph({
    numbering: { reference: "puces", level: 0 }, spacing: { after: 60 },
    children: morceaux(list)
  });
}

function code(lines) {
  return lines.map((l, i) => new Paragraph({
    spacing: { before: i === 0 ? 100 : 0, after: i === lines.length - 1 ? 160 : 0 },
    shading: { type: ShadingType.CLEAR, fill: "F2F2F2" },
    indent: { left: 220 }, keepLines: true,
    children: [new TextRun({ text: l === "" ? " " : l, font: MONO, size: 19 })]
  }));
}

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1, spacing: { before: 360, after: 160 }, keepNext: true,
    children: [new TextRun({ text, bold: true, size: 32, color: ACCENT })]
  });
}

function h2(text) {
  const trouve = text.match(CODE_SECTION);
  const titre = new TextRun({ text, bold: true, size: 25, color: ACCENT });
  return new Paragraph({
    heading: HeadingLevel.HEADING_2, spacing: { before: 300, after: 120 }, keepNext: true,
    children: trouve ? [new Bookmark({ id: ancre(trouve[1]), children: [titre] })] : [titre]
  });
}

function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3, spacing: { before: 200, after: 80 }, keepNext: true,
    children: [new TextRun({ text, bold: true, size: 22, color: GREY })]
  });
}

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
  const w = largeurs;
  const mono = monoCols || [];
  const header = new TableRow({
    tableHeader: true,
    children: entetes.map((e, i) => cell(e, { bold: true, width: w[i], fill: "DEEAF6" }))
  });
  const body = lignes.map(r => new TableRow({
    cantSplit: true,
    children: r.map((v, i) => cell(v, { width: w[i], mono: mono.includes(i) }))
  }));
  return new Table({ columnWidths: w, width: { size: W, type: WidthType.DXA }, rows: [header, ...body] });
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

const saut = () => new Paragraph({ children: [new PageBreak()] });

const c = [];

// ===================== COUVERTURE =====================
// Logo de l'EPHEC en haut a gauche (16/10/2026), comme a l'examen.
c.push(require(__dirname + "/boite.js").logo());
c.push(new Paragraph({
  spacing: { before: 700, after: 120 }, alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: typo("Programmation orientée objet — Java"), size: 26, color: GREY })]
}));
c.push(new Paragraph({
  spacing: { after: 200 }, alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: typo("Mémento technique"), bold: true, size: 52, color: ACCENT })]
}));
c.push(new Paragraph({
  spacing: { after: 800 }, alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: typo("La plateforme, les interfaces graphiques, la compilation, Maven"), size: 26, color: GREY })]
}));
c.push(p("EPHEC — Bachelier en informatique, niveau 2", { align: AlignmentType.CENTER, color: GREY }));
c.push(p("Année académique 2026-2027", { align: AlignmentType.CENTER, color: GREY }));
c.push(saut());

// ===================== INTRO =====================
c.push(h1("À quoi sert ce mémento"));
c.push(p("Vous allez écrire du Java toute l'année sans avoir besoin de savoir ce qui se passe entre le moment où vous cliquez sur la flèche verte et celui où le texte s'affiche à l'écran. Jusqu'au jour où quelque chose se passe mal — et là, sans ces notions, on cherche à l'aveugle."));
c.push(p("Ce document répond aux questions que le cours ne pose pas directement. Que fait exactement le JDK. Pourquoi un programme Java tourne sur Windows comme sur Mac. Où vivent vos objets. Ce que Maven télécharge pendant la minute d'attente du premier lancement."));
c.push(runs([
  "Il se consulte, il ne se lit pas d'une traite. Chaque section porte un code — ",
  { t: "TEC-EXE.2", code: true },
  " pour le tas, par exemple — et les énoncés d'exercices y renvoient au moment utile. Les codes sont cliquables."
]));

c.push(h3("Les deux autres documents"));
c.push(p("Ce mémento fait partie d'un ensemble de trois. Le mémento Clean Code rassemble les règles d'écriture. Le guide IntelliJ explique comment faire les choses dans l'outil."));
c.push(p("La frontière est simple : ce qui est vrai de Java est ici, ce qui est propre à IntelliJ est dans le guide. Comprendre ce qu'est un JDK relève de ce document ; savoir où cliquer pour en changer relève du guide."));
c.push(saut());

// ===================== SOMMAIRE =====================
c.push(h1("Sommaire"));

const sommaire = [
  ["La plateforme Java", [
    ["TEC-PLA.1", "JVM, JRE, JDK : qui fait quoi"],
    ["TEC-PLA.2", "Les trois éditions"],
    ["TEC-PLA.3", "Les versions et le support long terme"],
    ["TEC-PLA.4", "Que contient ma machine"]
  ]],
  ["Les interfaces graphiques", [
    ["TEC-FX.1", "Trois générations, et pourquoi"],
    ["TEC-FX.2", "JavaFX ne fait plus partie du JDK"],
    ["TEC-FX.3", "Les modules de JavaFX"],
    ["TEC-FX.4", "Pourquoi une application JavaFX refuse de démarrer"]
  ]],
  ["De votre code au programme qui tourne", [
    ["TEC-CMP.1", "Trois états de votre programme"],
    ["TEC-CMP.2", "Pourquoi Java tourne partout"],
    ["TEC-CMP.3", "Le classpath"],
    ["TEC-CMP.4", "Le dossier target"]
  ]],
  ["Ce qui se passe pendant l'exécution", [
    ["TEC-EXE.1", "La pile"],
    ["TEC-EXE.2", "Le tas"],
    ["TEC-EXE.3", "Ce que contient vraiment une variable"],
    ["TEC-EXE.4", "Le ramasse-miettes"]
  ]],
  ["Maven", [
    ["TEC-MVN.1", "À quoi sert Maven"],
    ["TEC-MVN.2", "Le pom.xml"],
    ["TEC-MVN.3", "Un projet, plusieurs modules"],
    ["TEC-MVN.4", "Le cycle de vie"],
    ["TEC-MVN.5", "Le dépôt local"]
  ]],
  ["Recevoir les fichiers du cours", [
    ["TEC-ZIP.1", "Extraire une archive au bon endroit"],
    ["TEC-ZIP.2", "Ne pas écraser son propre travail"]
  ]],
  ["Git, en deux mots", [
    ["TEC-GIT.1", "Ce qu'est un gestionnaire de versions"],
    ["TEC-GIT.2", "Pourquoi certains dossiers sont ignorés"],
    ["TEC-GIT.3", "Le dépôt du fil rouge, et comment le parcourir"]
  ]]
];

sommaire.forEach(([titre, entrees]) => {
  const w = [1900, 7460];
  const rows = [new TableRow({
    tableHeader: true,
    children: [cell(titre, { bold: true, width: W, span: 2, fill: "DEEAF6" })]
  })];
  entrees.forEach(([codeSec, libelle]) => {
    rows.push(new TableRow({
      children: [
        new TableCell({
          width: { size: w[0], type: WidthType.DXA },
          margins: { top: 50, bottom: 50, left: 100, right: 100 },
          children: [new Paragraph({
            spacing: { after: 0 },
            children: [new InternalHyperlink({
              anchor: ancre(codeSec),
              children: [new TextRun({ text: codeSec, size: 18, font: MONO, color: LIEN, underline: {} })]
            })]
          })]
        }),
        new TableCell({
          width: { size: w[1], type: WidthType.DXA },
          margins: { top: 50, bottom: 50, left: 100, right: 100 },
          children: [new Paragraph({
            spacing: { after: 0 },
            children: [new InternalHyperlink({
              anchor: ancre(codeSec),
              children: [new TextRun({ text: typo(libelle), size: 20 })]
            })]
          })]
        })
      ]
    }));
  });
  c.push(new Table({ columnWidths: w, width: { size: W, type: WidthType.DXA }, rows }));
  c.push(p("", { after: 160 }));
});
c.push(saut());

// ===================== PLA =====================
c.push(h1("La plateforme Java"));

c.push(h2("TEC-PLA.1 — JVM, JRE, JDK : qui fait quoi"));
c.push(p("Trois sigles, trois choses emboîtées l'une dans l'autre. Chacune contient la précédente."));
c.push(tableau(["Sigle", "Nom", "Contenu"], [
  ["JVM", "Java Virtual Machine", "Le programme qui exécute du bytecode Java"],
  ["JRE", "Java Runtime Environment", "La JVM, plus la bibliothèque standard (String, List, LocalDate…)"],
  ["JDK", "Java Development Kit", "Le JRE, plus les outils de développement : javac, javadoc, jar, jdb"]
], [1400, 3200, 4760], [0]));
c.push(...code([
  "  JDK  =  JRE  +  javac, javadoc, jar, jdb, ...",
  "          |",
  "          +--  JVM  +  bibliotheque standard"
]));
c.push(p("La conséquence pratique tient en une phrase : pour exécuter un programme Java il suffit d'un JRE, pour en écrire un il faut un JDK. Comme vous écrivez du code, c'est un JDK qu'il vous faut."));
c.push(encadre([
  [{ t: "Une correction par rapport à ce que vous lirez ailleurs", b: true }],
  ["Beaucoup de schémas trouvés sur Internet présentent le JRE comme un produit qu'on télécharge séparément. C'était vrai jusqu'à Java 8. Depuis Java 11, le JRE n'est plus distribué seul : on installe un JDK, point. Le mot reste utile pour désigner la partie « exécution » de ce JDK, mais vous ne trouverez pas de JRE à télécharger."]
]));

c.push(h2("TEC-PLA.2 — Les trois éditions"));
c.push(p("Java se décline en trois éditions, qui ne visent pas les mêmes machines."));
c.push(tableau(["Édition", "Pour quoi", "Vous concerne ?"], [
  ["Java SE", "Standard. Applications de bureau, consoles, bibliothèques.", "Oui — c'est ce cours"],
  ["Jakarta EE", "Entreprise. Applications serveur, web, transactions.", "Plus tard, en spécialisation"],
  ["Java ME", "Micro. Systèmes embarqués, cartes à puce.", "Non, et de plus en plus marginal"]
], [1800, 4800, 2760]));
c.push(p("Quand une documentation parle de « Java » sans préciser, il s'agit presque toujours de Java SE."));
c.push(runs([
  { t: "Note de vocabulaire. ", b: true },
  "L'édition entreprise s'appelait Java EE ou J2EE. Oracle en a transféré le développement à la fondation Eclipse à la fin des années 2010, et pour des raisons de marque elle a été renommée ",
  { t: "Jakarta EE", b: true },
  ". Vous rencontrerez les deux noms selon l'âge du document que vous lisez."
]));

c.push(h2("TEC-PLA.3 — Les versions et le support long terme"));
c.push(p("Depuis 2018, une nouvelle version de Java sort tous les six mois, en mars et en septembre. La plupart ne sont maintenues que six mois, jusqu'à la suivante."));
c.push(runs([
  "Tous les deux ans environ, une version est désignée ",
  { t: "LTS", b: true },
  " — Long Term Support. Celle-là est maintenue pendant plusieurs années : elle reçoit des correctifs de sécurité longtemps après sa sortie. Les versions LTS récentes sont 8, 11, 17, 21 et 25."
]));
c.push(runs([
  { t: "Ce cours utilise Java 21. ", b: true },
  "N'installez pas une version plus récente en pensant bien faire. Une version supérieure accepte des constructions que 21 ignore : votre code compilerait chez vous et refuserait de compiler ailleurs — sur la machine d'un condisciple, ou à l'examen."
]));
c.push(runs([
  "Le projet du cours fixe d'ailleurs cette contrainte lui-même, dans son ",
  { t: "pom.xml", code: true },
  " : voir ",
  { t: "TEC-MVN.2", code: true },
  "."
]));

c.push(h2("TEC-PLA.4 — Que contient ma machine"));
c.push(p("Deux commandes, dans un terminal sous macOS ou Linux, dans une invite de commandes sous Windows."));
c.push(...code([
  "java -version      # la version qui EXECUTE",
  "javac -version     # la version qui COMPILE"
]));
c.push(p("La première doit répondre quelque chose comme :"));
c.push(...code([
  "openjdk version \"21.0.12\" 2024-07-16 LTS",
  "OpenJDK Runtime Environment Corretto-21.0.12.7.1",
  "OpenJDK 64-Bit Server VM Corretto-21.0.12.7.1 (build 21.0.12+7-LTS, mixed mode)"
]));
c.push(runs([
  { t: "Si javac répond que la commande est introuvable ", b: true },
  "alors que ",
  { t: "java", code: true },
  " fonctionne, vous avez un environnement d'exécution mais pas de kit de développement. Vous pouvez lancer des programmes Java, pas en compiler."
]));
c.push(runs([
  { t: "Si les deux répondent des versions différentes", b: true },
  ", plusieurs JDK cohabitent sur votre machine et ce n'est pas le même qui est trouvé en premier. Ça n'a rien d'anormal, mais il faut savoir lequel IntelliJ utilise — qui n'est d'ailleurs pas nécessairement celui de ces commandes."
]));
c.push(h3("Lister tous les JDK installés"));
c.push(p("Sous macOS :"));
c.push(...code([
  "/usr/libexec/java_home -V"
]));
c.push(p("Sous Windows, dans PowerShell :"));
c.push(...code([
  "Get-ChildItem \"C:\\Program Files\\Java\", \"C:\\Program Files\\Eclipse Adoptium\" -EA 0"
]));
c.push(runs([
  "C'est la commande à connaître le jour où IntelliJ vous annonce une version que vous ne vous souvenez pas d'avoir installée. Le réglage effectivement utilisé par IntelliJ, lui, se vérifie dans ",
  { t: "Project Structure", code: true },
  " : voir la section IDE.6 du guide IntelliJ."
]));
c.push(saut());

// ===================== CMP =====================
c.push(h1("Les interfaces graphiques"));

c.push(h2("TEC-FX.1 — Trois générations, et pourquoi"));
c.push(p("Java a connu trois bibliothèques successives pour construire des fenêtres. Elles ne se sont pas remplacées par mode : chacune corrige un défaut de la précédente."));
c.push(tableau(["Bibliothèque", "Apparue", "Principe"], [
  ["AWT", "1995, avec Java 1.0", "Chaque bouton est un vrai bouton du système d'exploitation"],
  ["Swing", "1998, avec Java 2", "Java dessine lui-même tous les composants"],
  ["JavaFX", "2008, intégrée au JDK de 2012 à 2018", "Description déclarative de l'interface, styles, écrans tactiles"]
], [1800, 2700, 4860], [0]));

c.push(h3("AWT et sa limite"));
c.push(p("AWT confie l'affichage au système : un bouton AWT sous Windows est un bouton Windows, et sous macOS un bouton macOS. L'idée paraît bonne — l'application ressemble aux autres applications de la machine — mais elle impose de se limiter au dénominateur commun des trois systèmes, et les comportements diffèrent d'un poste à l'autre. Le même programme ne se comporte pas tout à fait pareil partout, ce qui est exactement ce que Java cherchait à éviter."));

c.push(h3("Swing et son principe"));
c.push(p("Swing prend le contre-pied : Java dessine lui-même chaque composant, pixel par pixel. L'apparence et le comportement deviennent identiques partout, au prix d'une interface qui ne ressemble à aucune autre sur la machine."));
c.push(p("Swing introduit une organisation qu'on retrouvera à l'identique dans JavaFX, et qu'il vaut donc la peine de connaître :"));
c.push(bulletRuns([
  { t: "les composants", b: true },
  " — boutons, champs de texte, images ;"
]));
c.push(bulletRuns([
  { t: "les conteneurs", b: true },
  " — des composants qui en contiennent d'autres ;"
]));
c.push(bulletRuns([
  { t: "les gestionnaires de placement", b: true },
  " — à qui l'on confie la disposition, plutôt que de fixer des coordonnées, ce qui permet à la fenêtre de s'adapter quand on la redimensionne ;"
]));
c.push(bulletRuns([
  { t: "les gestionnaires d'événements", b: true },
  " — un clic devient un objet, transmis à du code qui décide quoi en faire."
]));

c.push(h3("JavaFX"));
c.push(p("JavaFX conserve ces quatre familles et y ajoute trois choses : la possibilité de décrire l'interface dans un fichier séparé plutôt qu'en code, une mise en forme par feuilles de style comparable au CSS du web, et la prise en charge des écrans tactiles."));
c.push(p("C'est aujourd'hui la bibliothèque officielle. Le développement d'AWT et de Swing est arrêté — ils restent livrés avec le JDK, pour que les applications existantes continuent de fonctionner, mais ils n'évoluent plus."));
c.push(encadre([
  [{ t: "AWT n'a pourtant pas disparu de votre écran", b: true }],
  ["Swing est bâti sur AWT, et certaines classes AWT restent utilisées partout — notamment celles qui représentent les événements. Vous trouverez donc un KeyEvent dans java.awt.event et un autre dans javafx.scene.input."],
  ["Les deux portent le même nom et n'ont rien à voir. Quand la complétion vous en propose un, lisez le nom complet avant de valider : importer celui d'AWT dans une application JavaFX donne un code qui ne compile pas, avec un message qui n'aide pas. Voir IDE.11 du guide IntelliJ."]
]));

c.push(h2("TEC-FX.2 — JavaFX ne fait plus partie du JDK"));
c.push(p("JavaFX a été livrée avec le JDK depuis Java 8, puis en a été retirée à partir de Java 11. Depuis, c'est un projet distinct, OpenJFX, développé en logiciel libre."));
c.push(runs([
  { t: "La conséquence est directe. ", b: true },
  "Installer un JDK 21 ne vous donne pas JavaFX. Il faut l'ajouter au projet comme n'importe quelle bibliothèque externe, en la déclarant dans le ",
  { t: "pom.xml", code: true },
  " — voir ",
  { t: "TEC-MVN.2", code: true },
  ". C'est ce que fait le projet du cours, et c'est pourquoi le premier chargement télécharge davantage de choses qu'un projet ordinaire."
]));
c.push(p("Cela explique aussi une bizarrerie que vous rencontrerez : une application JavaFX ne se lance pas toujours d'un simple clic sur la flèche verte, parce que la bibliothèque doit être signalée à la JVM au démarrage. Le projet du cours contient un greffon Maven qui s'en charge, et l'application se lance alors par la commande Maven correspondante."));
c.push(runs([
  "Si vous voyez le message ",
  { t: "JavaFX runtime components are missing", code: true },
  ", c'est exactement ce problème : la bibliothèque est présente mais n'a pas été annoncée au lancement."
]));

c.push(h2("TEC-FX.3 — Les modules de JavaFX"));
c.push(p("JavaFX est découpée en sept modules. Un projet ne déclare que ceux dont il a besoin, ce qui évite d'embarquer un lecteur vidéo dans une application qui n'affiche que des boutons."));
c.push(tableau(["Module", "Contenu"], [
  ["javafx.base", "L'API de base : propriétés, liaisons, collections observables"],
  ["javafx.graphics", "Conteneurs, formes, images, animations, effets"],
  ["javafx.controls", "Les composants : boutons, champs, tableaux, listes"],
  ["javafx.fxml", "Le format FXML, qui décrit une interface en XML"],
  ["javafx.media", "Lecture audio et vidéo"],
  ["javafx.web", "Affichage de contenu web"],
  ["javafx.swing", "Passerelle pour intégrer du JavaFX dans une application Swing"]
], [2400, 6960], [0]));
c.push(runs([
  "Ce cours utilise les quatre premiers. ",
  { t: "javafx.fxml", code: true },
  " mérite une mention particulière : il permet de décrire la fenêtre dans un fichier ",
  { t: ".fxml", code: true },
  " séparé du code Java. La description de l'interface d'un côté, le comportement de l'autre — c'est ce qui rend praticable la séparation en modèle, vue et contrôleur."
]));

c.push(h2("TEC-FX.4 — Pourquoi une application JavaFX refuse de démarrer"));
c.push(p("Vous rencontrerez ce message, et il déroute parce qu'il semble faux : les bibliothèques sont bien là, Maven les a téléchargées, IntelliJ les affiche dans la ligne de commande."));
c.push(...code([
  "Erreur : des composants d'execution JavaFX obligatoires pour",
  "executer cette application sont manquants."
]));
c.push(h2("Ce qui se passe réellement"));
c.push(runs([
  "Une bibliothèque peut être fournie de deux façons. Sur le ",
  { t: "classpath", b: true },
  ", la manière historique, décrite en ",
  { t: "TEC-CMP.3", code: true },
  ". Ou sur le ",
  { t: "chemin de modules", b: true },
  ", apparu avec Java 9, où chaque bibliothèque déclare ce qu'elle offre et ce qu'elle exige."
]));
c.push(runs([
  "Le lanceur du JDK examine la classe qu'on lui demande d'exécuter. ",
  { t: "Si elle hérite d'Application", b: true },
  ", il en déduit que c'est une application JavaFX, et il exige alors que JavaFX soit chargé comme module. Il vérifie, ne le trouve pas, et s'arrête — avant d'avoir exécuté la moindre ligne de votre code."
]));
c.push(runs([
  "Or Maven, lui, place les bibliothèques sur le classpath ordinaire. Les deux ne s'entendent pas, et c'est tout le problème : ",
  { t: "rien ne manque", i: true },
  ", les jars sont présents et complets. C'est leur mode de chargement qui ne convient pas au contrôle."
]));

c.push(h2("La parade : une classe de lancement"));
c.push(p("Le contrôle ne se déclenche que si la classe principale hérite d'Application. Il suffit donc de lui en présenter une autre."));
c.push(...code([
  "public class LanceurDemineur {",
  "",
  "    public static void main(String[] args) {",
  "        Application.launch(Demineur.class, args);",
  "    }",
  "}"
]));
c.push(runs([
  "Cette classe n'hérite de rien. Le lanceur ne reconnaît pas une application JavaFX, ne cherche pas de module, et exécute le ",
  { t: "main", code: true },
  ". C'est ensuite ",
  { t: "Application.launch", code: true },
  " qui démarre JavaFX — depuis le classpath, sans protester, parce que le contrôle est derrière nous."
]));
c.push(encadre([
  [{ t: "Ce n'est pas un bricolage", b: true }],
  ["C'est la forme recommandée dès qu'on distribue une application JavaFX sans passer par les modules, et vous la retrouverez telle quelle dans beaucoup de projets."],
  ["Conséquence pratique : la classe à lancer n'est pas celle qui hérite d'Application. Dans ce cours, c'est toujours celle dont le nom commence par Lanceur."]
]));

c.push(h2("Les deux autres solutions, et leur prix"));
c.push(tableau(["Solution", "Ce qu'elle coûte"], [
  ["Ajouter --module-path et --add-modules aux options de la machine virtuelle",
   "le chemin dépend de la machine : la configuration d'exécution n'est plus transportable d'un poste à l'autre"],
  ["Déclarer un module-info.java",
   "la solution propre, mais elle impose que toutes les dépendances soient modulaires, tests compris"],
  ["Passer par mvn javafx:run",
   "le plugin monte le chemin de modules lui-même ; il faut penser à passer par la fenêtre Maven plutôt que par le bouton Run"]
], [3600, 5760], [0]));
c.push(p("La classe de lancement a l'avantage de ne rien demander : ni configuration, ni ligne de commande, ni fichier supplémentaire à tenir à jour."));

c.push(saut());

c.push(h1("De votre code au programme qui tourne"));

c.push(h2("TEC-CMP.1 — Trois états de votre programme"));
c.push(p("Ce que vous écrivez et ce que la machine exécute ne sont pas la même chose. Entre les deux, il y a une traduction."));
c.push(...code([
  "  Personne.java          votre code, du texte que vous lisez",
  "        |",
  "        |   javac        le compilateur",
  "        v",
  "  Personne.class         du bytecode, illisible pour vous",
  "        |",
  "        |   java         la machine virtuelle",
  "        v",
  "  le programme s'execute"
]));
c.push(runs([
  { t: "javac", code: true },
  " lit vos fichiers ",
  { t: ".java", code: true },
  " et produit des fichiers ",
  { t: ".class", code: true },
  ". C'est là que sont détectées les erreurs de compilation : une parenthèse manquante, un type qui ne correspond pas, une méthode qui n'existe pas."
]));
c.push(runs([
  { t: "java", code: true },
  " prend un fichier ",
  { t: ".class", code: true },
  " et l'exécute. C'est là qu'apparaissent les erreurs d'exécution : une division par zéro, un ",
  { t: "null", code: true },
  " inattendu, un fichier introuvable."
]));
c.push(encadre([
  [{ t: "Pourquoi cette distinction compte", b: true }],
  ["Elle vous dit dans quelle direction chercher. Une erreur signalée avant que le programme ne démarre vient de javac : le code est mal écrit. Une erreur qui interrompt un programme en cours de route vient de la JVM : le code est correct mais ce qu'il rencontre ne l'est pas."],
  ["IntelliJ vous le dit d'ailleurs : les messages de compilation commencent par « java: », ceux d'exécution apparaissent dans la fenêtre Run avec une trace d'appels."]
]));

c.push(h2("TEC-CMP.2 — Pourquoi Java tourne partout"));
c.push(p("Un programme écrit en C doit être recompilé pour chaque système. En Java, non : le même fichier .class s'exécute sur Windows, macOS et Linux."));
c.push(...code([
  "        Personne.class",
  "       /      |       \\",
  "     JVM     JVM      JVM",
  "  Windows    Mac     Linux"
]));
c.push(p("Le bytecode n'est pas destiné à un processeur : il est destiné à la JVM. C'est elle qui diffère d'un système à l'autre, et qui traduit le bytecode en instructions que la machine comprend. Vous compilez une fois, vous exécutez partout — à condition qu'une JVM soit installée."));
c.push(p("C'est ce qui explique aussi qu'un programme Java soit un peu plus lent à démarrer qu'un programme compilé directement : il y a une traduction supplémentaire au moment de l'exécution."));

c.push(h2("TEC-CMP.3 — Le classpath"));
c.push(runs([
  "Quand votre programme utilise ",
  { t: "ArrayList", code: true },
  ", la JVM doit trouver le fichier ",
  { t: "ArrayList.class", code: true },
  " quelque part. La liste des endroits où elle cherche s'appelle le ",
  { t: "classpath", b: true },
  "."
]));
c.push(p("Il contient trois sortes de choses : la bibliothèque standard, fournie avec le JDK ; les bibliothèques externes, comme JUnit ; et vos propres classes compilées."));
c.push(runs([
  "Vous n'aurez normalement jamais à le construire à la main : Maven le fabrique à partir des dépendances déclarées dans le ",
  { t: "pom.xml", code: true },
  ", et IntelliJ le transmet à la JVM au lancement."
]));
c.push(runs([
  "Le connaître sert surtout à comprendre un message. ",
  { t: "ClassNotFoundException", code: true },
  " et ",
  { t: "NoClassDefFoundError", code: true },
  " veulent tous deux dire la même chose : une classe manque au classpath. Presque toujours, une dépendance n'a pas été téléchargée."
]));

c.push(h2("TEC-CMP.4 — Le dossier target"));
c.push(runs([
  "Maven range tout ce qu'il produit dans un dossier ",
  { t: "target", code: true },
  ", à la racine de chaque module. Vous y trouverez vos ",
  { t: ".class", code: true },
  ", les rapports de test, et l'archive ",
  { t: ".jar", code: true },
  " si vous en fabriquez une."
]));
c.push(runs([
  { t: "Rien de ce que contient ce dossier n'a de valeur. ", b: true },
  "Tout s'y recrée intégralement à partir de ",
  { t: "src", code: true },
  " et du ",
  { t: "pom.xml", code: true },
  ". C'est pourquoi il est ignoré par Git, absent des archives que vous recevez, et pourquoi vous pouvez le supprimer sans crainte."
]));
c.push(p("Le supprimer est d'ailleurs un réflexe utile quand quelque chose se comporte bizarrement : cela force une recompilation complète et élimine l'hypothèse d'un fichier compilé périmé."));
c.push(saut());

// ===================== EXE =====================
c.push(h1("Ce qui se passe pendant l'exécution"));
c.push(p("Pendant qu'il tourne, votre programme occupe deux zones de mémoire aux comportements très différents. Comprendre laquelle contient quoi éclaire une bonne partie de ce qui surprend en début d'apprentissage.", { italic: true, color: GREY }));

c.push(h2("TEC-EXE.1 — La pile"));
c.push(p("Chaque fois qu'une méthode est appelée, la JVM empile un bloc contenant ses paramètres et ses variables locales. Quand la méthode se termine, le bloc est retiré et tout ce qu'il contenait disparaît."));
c.push(p("D'où le nom : les blocs s'empilent et se dépilent, et on ne retire jamais que celui du dessus — c'est-à-dire la méthode en cours."));
c.push(...code([
  "main()                      <-- appelle inscrire()",
  "  inscrire(pseudos)         <-- appelle ajouter()",
  "    ajouter(joueur)         <-- methode en cours d'execution",
  "",
  "  ^ la pile : trois blocs, le dernier appele est en haut"
]));
c.push(runs([
  "Vous avez déjà vu cette pile sans le savoir : c'est exactement ce qu'affiche une trace d'exception, lue de bas en haut. Et le débogueur la montre en direct dans son panneau ",
  { t: "Frames", code: true },
  " — voir IDE.19 du guide IntelliJ."
]));
c.push(runs([
  "La pile a une taille limitée. Une méthode qui s'appelle elle-même sans condition d'arrêt empile des blocs jusqu'à la saturer, et la JVM lève alors une ",
  { t: "StackOverflowError", code: true },
  ". Ce message ne veut rien dire d'autre que : trop d'appels imbriqués, cherchez une récursion sans fin."
]));

c.push(h2("TEC-EXE.2 — Le tas"));
c.push(runs([
  "Les objets, eux, ne vivent pas dans la pile. Chaque ",
  { t: "new", code: true },
  " réserve de la place dans une seconde zone, le ",
  { t: "tas", b: true },
  ", et y construit l'objet."
]));
c.push(p("La différence essentielle est de durée de vie. Le contenu de la pile disparaît dès que la méthode se termine ; un objet du tas survit tant que quelque chose le désigne. C'est ce qui permet à une méthode de créer un objet et de le rendre à son appelant — l'objet reste, seul le bloc de pile a disparu."));
c.push(...code([
  "public Partie inscrire(String... pseudos) {",
  "    Partie partie = new Partie();   // l'objet va dans le TAS",
  "    ...                             // la variable est dans la PILE",
  "    return partie;                  // le bloc de pile disparait,",
  "}                                   // l'objet du tas survit"
]));
c.push(runs([
  "Le tas aussi a une limite. La saturer donne une ",
  { t: "OutOfMemoryError", code: true },
  " : trop d'objets créés, ou des objets qu'on n'arrive plus à libérer. Retenez la paire — ",
  { t: "StackOverflowError", code: true },
  " concerne les appels, ",
  { t: "OutOfMemoryError", code: true },
  " concerne les objets."
]));

c.push(h2("TEC-EXE.3 — Ce que contient vraiment une variable"));
c.push(p("Voici le point qui explique le plus de surprises de première année."));
c.push(p("Une variable de type primitif — int, double, boolean — contient sa valeur. Une variable d'objet, non : elle contient une référence, c'est-à-dire de quoi retrouver l'objet dans le tas. L'objet est ailleurs."));
c.push(...code([
  "  PILE                          TAS",
  "  ----------------              ---------------------",
  "  nombre  =  5                  ",
  "  personne  =  --------------->  [ Personne: nom, prenom ]"
]));
c.push(h3("Première conséquence : le passage de paramètres"));
c.push(runs([
  "Java passe toujours les arguments ",
  { t: "par valeur", i: true },
  " : la méthode reçoit une copie. Pour un ",
  { t: "int", code: true },
  ", la valeur copiée est le nombre, et modifier la copie ne change rien à l'original. Pour un objet, la valeur copiée est la ",
  { t: "référence", i: true },
  " — la copie désigne donc le même objet, et les modifications faites à travers elle sont visibles de partout."
]));
c.push(p("Ce n'est pas un « passage par référence » : réaffecter le paramètre à l'intérieur de la méthode ne changerait rien chez l'appelant. C'est le comportement que l'exercice POO.4 vous fait constater."));
c.push(h3("Seconde conséquence : deux noms, un objet"));
c.push(...code([
  "Personne a = new Personne();",
  "Personne b = a;              // b designe le MEME objet",
  "",
  "b.setNom(\"Lovelace\");",
  "System.out.println(a.getNom());   // affiche Lovelace"
]));
c.push(runs([
  "Le débogueur rend cela visible : il affiche un numéro à côté de chaque objet, ",
  { t: "Personne@827", code: true },
  " par exemple. Deux variables qui portent le même numéro désignent le même objet. Ce numéro n'a aucune signification en soi et change à chaque exécution — il ne sert qu'à distinguer les objets entre eux."
]));

c.push(h2("TEC-EXE.4 — Le ramasse-miettes"));
c.push(runs([
  "En Java, on ne libère jamais la mémoire à la main. Il n'existe pas de ",
  { t: "delete", code: true },
  ". Un programme séparé, le ",
  { t: "ramasse-miettes", b: true },
  " — garbage collector —, tourne en arrière-plan et récupère la place des objets que plus personne ne désigne."
]));
c.push(...code([
  "Personne p = new Personne();   // l'objet est cree dans le tas",
  "p = null;                      // plus rien ne le designe",
  "                               // le ramasse-miettes le recuperera",
  "                               // un jour, sans qu'on sache quand"
]));
c.push(p("Le critère est l'accessibilité, pas la portée : un objet reste vivant tant qu'une variable, un champ ou une collection le désigne, même indirectement. Un objet placé dans une liste survit à la disparition de la variable qui l'a créé."));
c.push(runs([
  { t: "Vous ne contrôlez pas le moment. ", b: true },
  "Il existe bien une méthode ",
  { t: "System.gc()", code: true },
  ", mais elle ne fait que suggérer, et l'usage recommandé est de ne pas l'appeler. Écrivez votre code sans vous préoccuper de la libération : c'est précisément ce que Java vous offre par rapport à des langages où l'oubli d'un ",
  { t: "free", code: true },
  " est une fuite de mémoire."
]));

c.push(h3("À faire une fois, dans le débogueur"));
c.push(encadre([
  [{ t: "Voir la pile et le tas de ses propres yeux", b: true }],
  ["Ouvrez la classe Inscription de l'exercice PKG.4. Posez un point d'arrêt sur la ligne qui ajoute un joueur à la partie, puis lancez Application en mode débogage."],
  ["Au deuxième ou troisième arrêt, regardez le panneau Frames : vous y lisez la pile, inscrire appelée depuis main. Puis dépliez la variable partie dans le panneau Variables."],
  ["Répondez alors à trois questions. Combien d'objets Joueur existent à cet instant ? Qui les désigne ? Et que deviendraient-ils si la méthode rendait autre chose que partie ?"],
  ["La marche à suivre dans l'outil est décrite en IDE.19 du guide IntelliJ."]
]));
c.push(saut());

// ===================== MVN =====================
c.push(h1("Maven"));

c.push(h2("TEC-MVN.1 — À quoi sert Maven"));
c.push(p("Maven résout trois problèmes que vous n'avez pas encore rencontrés parce qu'il s'en occupe déjà."));
c.push(bulletRuns([
  { t: "Il impose une structure. ", b: true },
  "Le code dans ",
  { t: "src/main/java", code: true },
  ", les tests dans ",
  { t: "src/test/java", code: true },
  ", le résultat dans ",
  { t: "target", code: true },
  ". Cette convention est la même dans tous les projets Maven du monde, ce qui fait qu'on s'y retrouve immédiatement dans un projet inconnu."
]));
c.push(bulletRuns([
  { t: "Il gère les bibliothèques. ", b: true },
  "Vous déclarez que le projet a besoin de JUnit ; Maven va le chercher, ainsi que tout ce dont JUnit a lui-même besoin."
]));
c.push(bulletRuns([
  { t: "Il rend la compilation reproductible. ", b: true },
  "Le même projet compilé sur une autre machine donne le même résultat, avec les mêmes versions de tout."
]));
c.push(p("Sans Maven, il faudrait télécharger les bibliothèques à la main, les ranger quelque part, et construire soi-même le classpath. C'est faisable, et c'est fastidieux."));

c.push(h2("TEC-MVN.2 — Le pom.xml"));
c.push(runs([
  "Tout tient dans un fichier, le ",
  { t: "pom.xml", code: true },
  " — Project Object Model. Il décrit le projet et ses besoins."
]));
c.push(...code([
  "<groupId>be.ephec.java</groupId>       <!-- qui publie -->",
  "<artifactId>exercices</artifactId>     <!-- quoi -->",
  "<version>1.0-SNAPSHOT</version>        <!-- quelle version -->",
  "",
  "<properties>",
  "    <maven.compiler.release>21</maven.compiler.release>",
  "</properties>",
  "",
  "<dependencies>",
  "    <dependency>",
  "        <groupId>org.junit.jupiter</groupId>",
  "        <artifactId>junit-jupiter</artifactId>",
  "        <version>5.10.2</version>",
  "        <scope>test</scope>",
  "    </dependency>",
  "</dependencies>"
]));
c.push(p("Les trois premières lignes forment les coordonnées du projet : elles l'identifient de façon unique, exactement comme elles identifient JUnit un peu plus bas. Toute bibliothèque du monde Java se désigne par ce triplet."));
c.push(runs([
  { t: "maven.compiler.release", code: true },
  " fixe la version de Java. C'est cette ligne qui garantit que votre code compilera de la même façon partout, quelle que soit la version du JDK installé — voir ",
  { t: "TEC-PLA.3", code: true },
  "."
]));
c.push(runs([
  { t: "scope test", code: true },
  " signifie que JUnit n'est disponible que pour le code de test. C'est volontaire : si vous tentez d'importer une classe JUnit dans ",
  { t: "src/main/java", code: true },
  ", cela ne compilera pas — et c'est tant mieux, du code de production n'a rien à faire avec une bibliothèque de test."
]));

c.push(h2("TEC-MVN.3 — Un projet, plusieurs modules"));
c.push(runs([
  "Le projet du cours est composé de deux modules, ",
  { t: "exercices", code: true },
  " et ",
  { t: "solutions", code: true },
  ", chapeautés par un projet parent."
]));
c.push(...code([
  "ExercicesJava/",
  "    pom.xml            <-- le parent : declare les deux modules",
  "    exercices/",
  "        pom.xml        <-- herite du parent",
  "        src/",
  "    solutions/",
  "        pom.xml",
  "        src/"
]));
c.push(p("Le parent porte ce qui est commun : la version de Java, les versions des bibliothèques. Les modules n'ont plus qu'à déclarer ce qui leur est propre. Changer la version de Java se fait donc à un seul endroit."));
c.push(p("Les deux modules sont indépendants l'un de l'autre : le module des solutions ne dépend pas de celui des exercices, ce qui garantit qu'aucune classe de l'un ne peut être importée par l'autre par accident."));

c.push(h2("TEC-MVN.4 — Le cycle de vie"));
c.push(p("Maven définit une suite d'étapes ordonnées. Demander une étape exécute automatiquement toutes celles qui la précèdent."));
c.push(tableau(["Étape", "Ce qu'elle fait"], [
  ["compile", "Compile src/main/java vers target/classes"],
  ["test", "Compile les tests et les exécute (compile d'abord)"],
  ["package", "Fabrique le .jar (compile et test d'abord)"],
  ["clean", "Supprime target — s'utilise seule, hors du cycle"]
], [2000, 7360], [0]));
c.push(runs([
  "Vous n'aurez pas souvent à les lancer vous-même : IntelliJ le fait pour vous quand vous cliquez sur la flèche verte. Elles apparaissent dans la fenêtre Maven, sous ",
  { t: "Lifecycle", code: true },
  ", et se lancent d'un double clic."
]));
c.push(runs([
  "Le seul cas où vous y viendrez : ",
  { t: "clean", code: true },
  " puis un nouveau lancement, quand vous soupçonnez un fichier compilé périmé. Voir ",
  { t: "TEC-CMP.4", code: true },
  "."
]));

c.push(h2("TEC-MVN.5 — Le dépôt local"));
c.push(runs([
  "Les bibliothèques téléchargées ne sont pas rangées dans le projet, mais dans un dossier commun à tous vos projets : ",
  { t: ".m2/repository", code: true },
  ", dans votre dossier personnel."
]));
c.push(p("C'est ce qui explique la minute d'attente au premier chargement, et son absence les fois suivantes : Maven regarde d'abord dans ce dépôt local, et ne va sur Internet que si la bibliothèque y manque. Un second projet utilisant JUnit 5.10.2 la trouvera déjà là."));
c.push(runs([
  "Ce dossier peut être supprimé sans risque : tout se retéléchargera. C'est le remède de dernier recours quand une bibliothèque semble corrompue — mais comptez alors à nouveau le temps de téléchargement."
]));
c.push(saut());

// ===================== GIT =====================
c.push(h1("Recevoir les fichiers du cours"));

c.push(h2("TEC-ZIP.1 — Extraire une archive au bon endroit"));
c.push(runs([
  "Chaque séance donne lieu à une archive. Elle contient elle-même un dossier ",
  { t: "ExercicesJava", code: true },
  ", au même nom que le vôtre :"
]));
c.push(...code([
  "SeanceNN_..._exercices.zip",
  "    ExercicesJava/",
  "        exercices/src/main/java/be/ephec/java/tab/...",
  "        exercices/src/test/java/be/ephec/java/tab/...",
  "        enonces/TAB_enonces.docx"
]));
c.push(runs([
  { t: "Elle doit donc être extraite dans le dossier PARENT du vôtre, pas à sa racine. ", b: true },
  "Les deux arborescences fusionnent alors, et les nouveaux packages viennent s'ajouter aux anciens. Extraite à la racine, elle produirait un absurde ",
  { t: "ExercicesJava/ExercicesJava/...", code: true },
  " que Maven ignorerait."
]));
c.push(runs([
  "Pour retrouver ce dossier parent sans se tromper : dans IntelliJ, clic droit sur la racine du projet, ",
  { t: "Open In", code: true },
  " puis ",
  { t: "Finder", code: true },
  " ou ",
  { t: "Explorer", code: true },
  ", et remontez d'un niveau."
]));

c.push(h3("macOS : passez par le Terminal"));
c.push(p("Le double-clic ne convient pas. L'Utilitaire d'archive extrait toujours à côté du fichier zip, et s'il rencontre un dossier du même nom il en crée un second — « ExercicesJava 2 » — au lieu de fusionner. Vous vous retrouvez avec deux projets, dont un incomplet."));
c.push(...code([
  "unzip -o ~/Downloads/SeanceNN_..._exercices.zip -d ~/chemin/du/parent"
]));
c.push(runs([
  { t: "unzip", code: true },
  " fusionne dans les dossiers existants, ce que le Finder ne fait pas de façon fiable. L'option ",
  { t: "-o", code: true },
  " évite qu'il pose une question pour chaque fichier."
]));
c.push(runs([
  "Astuce : tapez ",
  { t: "unzip -o ", code: true },
  " puis faites glisser le fichier zip depuis le Finder dans la fenêtre du Terminal — son chemin s'écrit tout seul. Même chose pour le dossier de destination après ",
  { t: "-d", code: true },
  "."
]));
c.push(encadre([
  [{ t: "Pourquoi pas le glisser-déposer", b: true }],
  ["On serait tenté d'extraire n'importe où puis de faire glisser le dossier ExercicesJava sur celui du projet. Le Finder propose alors « Remplacer », ce qui supprimerait tout votre travail, et ne propose « Fusionner » que dans certains cas."],
  ["Le risque n'en vaut pas la peine : une ligne de Terminal fait le travail sans ambiguïté."]
]));

c.push(h3("Windows : Extraire tout, en corrigeant le chemin"));
c.push(runs([
  "Clic droit sur le zip, ",
  { t: "Extraire tout", code: true },
  ". Une boîte de dialogue demande la destination, et Windows fusionne correctement les dossiers."
]));
c.push(runs([
  { t: "Attention au chemin proposé. ", b: true },
  "Windows ajoute par défaut un sous-dossier portant le nom du zip. Effacez cette partie pour ne garder que le dossier parent de votre projet, sinon vous obtiendrez ",
  { t: "...\\SeanceNN_..._exercices\\ExercicesJava\\...", code: true },
  " — un niveau de trop."
]));
c.push(p("En PowerShell, si vous préférez :"));
c.push(...code([
  "Expand-Archive -Path \"$HOME\\Downloads\\SeanceNN_..._exercices.zip\" `",
  "               -DestinationPath \"C:\\chemin\\parent\" -Force"
]));

c.push(h2("TEC-ZIP.2 — Ne pas écraser son propre travail"));
c.push(p("L'archive d'une séance n'apporte que les packages de cette séance-là. Elle ne touche donc pas à ce que vous avez écrit lors des séances précédentes, et il n'y a aucun risque à l'extraire."));
c.push(runs([
  { t: "En revanche, extraire deux fois l'archive d'une même séance écraserait votre travail sur ces exercices-là. ", b: true },
  "Les squelettes reviendraient à leur état d'origine, avec leurs ",
  { t: "UnsupportedOperationException", code: true },
  ", et votre code aurait disparu."
]));
c.push(p("Si vous devez reprendre une archive déjà extraite — parce que vous avez cassé quelque chose, ou pour comparer —, extrayez-la dans un dossier temporaire et recopiez seulement le fichier dont vous avez besoin."));
c.push(runs([
  "C'est exactement le genre d'accident qu'un gestionnaire de versions rend impossible, puisqu'il conserve l'état de chaque fichier à chaque instant. Voir ",
  { t: "TEC-GIT.1", code: true },
  "."
]));

c.push(saut());

c.push(h1("Git, en deux mots"));
c.push(p("Git n'est au programme d'aucun exercice, et il ne sera pas évalué. Vous n'aurez jamais à enregistrer vos modifications, ni à travailler à plusieurs, ni à envoyer quoi que ce soit sur un serveur.", { italic: true, color: GREY }));
c.push(runs([
  { t: "Une exception, et en lecture seule. ", b: true },
  "Le corrigé du fil rouge GameHub peut vous être remis sous la forme d'un dépôt Git, qui conserve les trente incréments et permet de se placer à n'importe lequel. Quatre gestes suffisent à le parcourir, et ils sont décrits en ",
  { t: "TEC-GIT.3", code: true },
  "."
]));
c.push(p("Les deux premières sections existent pour que le mot ne soit pas un mystère, et pour expliquer certains fichiers que vous verrez dans le projet.", { italic: true, color: GREY }));

c.push(h2("TEC-GIT.1 — Ce qu'est un gestionnaire de versions"));
c.push(p("Un gestionnaire de versions enregistre l'historique d'un projet. À intervalles choisis, on lui demande de mémoriser l'état complet des fichiers — cela s'appelle un commit — avec un message décrivant ce qui a changé."));
c.push(p("Il devient alors possible de revenir à n'importe quel état antérieur, de voir ce qui a changé entre deux moments, et de savoir qui a modifié quoi. À plusieurs, chacun travaille de son côté et le système fusionne les contributions."));
c.push(runs([
  "Git est le plus répandu d'entre eux, et de très loin. GitHub, GitLab et Bitbucket sont des services qui hébergent des dépôts Git — ce ne sont pas des outils différents, mais des endroits où poser un dépôt."
]));
c.push(runs([
  { t: "La conséquence pratique pour vous. ", b: true },
  "Puisque l'historique est conservé, on ne garde jamais de code en commentaire « au cas où ». C'est le fondement de la règle ",
  { t: "CC-COM.2", code: true },
  " du mémento Clean Code."
]));

c.push(h2("TEC-GIT.2 — Pourquoi certains dossiers sont ignorés"));
c.push(runs([
  "Le projet contient un fichier ",
  { t: ".gitignore", code: true },
  " listant ce que Git doit laisser de côté. Vous y trouverez au moins ceci :"
]));
c.push(...code([
  "target/      # tout se recree a la compilation",
  ".idea/       # preferences d'affichage d'IntelliJ, propres a chaque poste",
  "*.iml"
]));
c.push(p("La règle qui les réunit : on ne conserve dans l'historique que ce qu'on ne peut pas refabriquer. Un fichier compilé se refabrique à partir de la source. Une préférence d'affichage n'a d'intérêt que pour la personne qui l'a réglée, et l'inclure ferait entrer en conflit les réglages de chacun."));
c.push(runs([
  "C'est aussi pourquoi vous pouvez supprimer ",
  { t: ".idea", code: true },
  " sans rien perdre d'important quand IntelliJ se comporte étrangement — remède mentionné en ERR.1 du guide IntelliJ."
]));

c.push(h2("TEC-GIT.3 — Le dépôt du fil rouge, et comment le parcourir"));
c.push(runs([
  "Le corrigé de GameHub vous est remis sous la forme d'un ",
  { t: "dépôt Git", b: true },
  ". Ce n'est pas un fichier particulier : c'est un dossier ordinaire, qui contient en plus un sous-dossier caché ",
  { t: ".git", code: true },
  " où vit l'historique des trente incréments."
]));
c.push(p("Vous l'ouvrez dans IntelliJ comme n'importe quel projet, et vous pouvez alors vous placer à n'importe quelle étape du fil rouge."));

c.push(h2("Trois notions, et rien d'autre"));
c.push(tableau(["Terme", "Ce que c'est"], [
  ["commit", "l'état complet du projet à un instant, sous un nom lisible"],
  ["historique", "la suite des commits, chacun ne retenant que ce qui a changé"],
  ["étiquette (tag)", "un nom collé sur un commit — ici G.1 à G.30"]
], [2100, 7260], [0]));
c.push(runs([
  { t: "Ce que le dépôt apporte et qu'un document ne peut pas donner : ", b: true },
  "la comparaison. Choisissez un incrément, et IntelliJ affiche les deux versions d'un fichier côte à côte, en marquant en vert ce qui a été ajouté et en bleu ce qui a été modifié."
]));

c.push(encadre([
  [{ t: "Le mode d'emploi est ailleurs, et c'est voulu", b: true }],
  ["Git est un outil vaste, et il n'est pas au programme. Vous l'utiliserez en lecture seule, et quatre gestes suffisent."],
  ["Ils sont décrits pas à pas, captures d'écran à l'appui, dans Git_pour_GameHub.docx — livré avec le dépôt, dans son dossier _documents. Ce mémento ne les recopie pas : deux documents qui disent la même chose finissent toujours par se contredire."]
]));

c.push(h2("Deux choses à savoir avant d'ouvrir le dépôt"));
c.push(bulletRuns([
  { t: "Git doit être installé sur la machine. ", b: true },
  "IntelliJ ne l'embarque pas. Sans lui, l'onglet Git n'apparaît pas et rien de ce qui précède ne fonctionne."
]));
c.push(bulletRuns([
  { t: "Déplacez toujours le dossier entier. ", b: true },
  "Le ",
  { t: ".git", code: true },
  " est caché : copier seulement les sources fait disparaître les trente versions sans qu'aucun message ne le signale."
]));
c.push(runs([
  "Et un conseil qui évite la plupart des ennuis : ",
  { t: "n'écrivez pas dans le dépôt", b: true },
  ". C'est un corrigé qui se lit. Pour essayer des choses, copiez le code dans un projet à vous."
]));

// ===================== DOCUMENT =====================
const doc = new Document({
  creator: "Frédéric Ferrant — EPHEC",
  title: "Mémento technique",
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

Packer.toBuffer(doc).then(b => {
  fs.writeFileSync(__dirname + "/../../documents/Memento_Technique.docx", b);
  console.log("écrit :", Math.round(b.length / 1024), "Ko");
});
