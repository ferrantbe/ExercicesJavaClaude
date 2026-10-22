const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle,
  PageBreak, LevelFormat, convertInchesToTwip, ImageRun, Bookmark, InternalHyperlink
} = require("docx");

// Les captures d'ecran ne sont pas dans le projet : elles pesent trop, et
// elles doivent de toute facon etre refaites sur votre machine. Placez-les
// dans un dossier et donnez son chemin ici avant de regenerer le guide.
/**
 * Les captures d'ecran du guide, dans le projet.
 *
 * Elles y sont, desormais. Le guide etait le seul document qu'on ne
 * pouvait pas regenerer : ses images vivaient ailleurs, et leurs tailles
 * dans un fichier tenu a la main.
 */
const CAPTURES = process.env.CAPTURES
  || path.join(__dirname, "..", "..", "_captures");

/** Encombrement maximal d'une image, en points. */
const LARGEUR_MAX = 600;
const HAUTEUR_MAX = 400;

/**
 * Word compte en centimetres, ce generateur en points a 96 par pouce.
 *
 * On expose donc les centimetres, parce que c'est dans cette unite qu'on
 * juge une largeur en relisant le document : « celle-ci tiendrait mieux
 * en 8 cm ».
 */
const cm = (valeur) => Math.round(valeur / 2.54 * 96);

/**
 * Mesure un PNG sans bibliotheque.
 *
 * L'en-tete IHDR place la largeur et la hauteur aux octets 16 a 23, en
 * gros-boutiste. Cela remplace le fichier tailles.json, qu'il fallait
 * completer a la main a chaque capture ajoutee — une etape de plus, et
 * une occasion d'oublier.
 */
function mesurer(fichier) {
  const octets = fs.readFileSync(fichier);
  return [octets.readUInt32BE(16), octets.readUInt32BE(20)];
}

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

const CODE_SECTION = /^(IDE\.\d+|ERR\.\d+)/;      // titres : debut de chaine
const CODE_RENVOI  = /^(IDE\.\d+|ERR\.\d+)$/;     // renvois : chaine entiere
const ancre = (c) => c.replace(/\./g, "_");

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
    if (x.code && CODE_RENVOI.test(x.t.trim())) {
      return new InternalHyperlink({
        anchor: ancre(x.t.trim()),
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

// --- image ------------------------------------------------------------
/**
 * @param largeurCm largeur imposee, en centimetres. Sans elle, l'image
 *                  occupe toute la largeur utile — ce qui convient a une
 *                  fenetre entiere, et pas du tout a un menu de six
 *                  entrees ou a trois lignes de code.
 */
function image(fichier, legende, largeurCm) {
  const chemin = path.join(CAPTURES, fichier);

  // Sans l'image, on ne s'arrete pas : on marque l'emplacement. Cela
  // permet de relire le texte avant d'avoir refait les captures.
  if (!fs.existsSync(chemin)) {
    return [new Paragraph({
      spacing: { before: 140, after: 160 },
      children: [new TextRun({
        text: "[capture manquante : " + fichier + "]",
        italics: true, size: 20, color: "9C2B2B"
      })]
    })];
  }

  const [largeur, hauteur] = mesurer(chemin);
  const echelle = largeurCm
    ? cm(largeurCm) / largeur
    : Math.min(LARGEUR_MAX / largeur, HAUTEUR_MAX / hauteur, 1);

  const out = [new Paragraph({
    spacing: { before: 140, after: legende ? 40 : 160 },
    alignment: AlignmentType.CENTER,
    keepNext: !!legende,
    children: [new ImageRun({
      type: "png",
      data: fs.readFileSync(chemin),
      transformation: {
        width: Math.round(largeur * echelle),
        height: Math.round(hauteur * echelle)
      }
    })]
  })];
  if (legende) {
    out.push(new Paragraph({
      spacing: { after: 200 }, alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: typo(legende), size: 18, italics: true, color: GREY })]
    }));
  }
  return out;
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
// Page de garde commune (modele ABS, 17/10/2026).
require(__dirname + "/boite.js").pageDeGarde(c, {
  titre: "Guide IntelliJ IDEA",
  accroche: "Installer, ouvrir, écrire, exécuter, dépanner"
});

// ===================== MODE D'EMPLOI =====================
c.push(h1("À quoi sert ce guide"));
c.push(p("IntelliJ IDEA est l'outil dans lequel vous passerez toutes vos heures de Java cette année. Ce guide n'en fait pas le tour — personne n'en fait le tour — mais il couvre ce dont vous aurez besoin, dans l'ordre où vous en aurez besoin."));
c.push(p("Les deux premières sections servent le premier soir : installer, et ouvrir le projet du cours. Les suivantes servent toute l'année et se consultent au coup par coup. L'annexe rassemble les messages d'erreur les plus fréquents, avec leur cause et leur remède."));
c.push(runs([
  "Chaque section porte un code — ",
  { t: "IDE.17", code: true },
  " pour le lancement des tests, par exemple — et les énoncés d'exercices y renvoient au moment utile. Les codes sont cliquables dans ce document."
]));

c.push(h3("Deux conventions"));
c.push(runs([
  "Les noms de menus sont donnés en anglais, tels qu'ils apparaissent à l'écran dans l'installation par défaut : ",
  { t: "File → Project Structure", code: true },
  ". Les explications, elles, restent en français."
]));
c.push(runs([
  "Les raccourcis sont donnés dans les deux systèmes, séparés par une barre oblique : ",
  { t: "Ctrl+Alt+L", code: true },
  " sous Windows et Linux, ",
  { t: "⌥⌘L", code: true },
  " sous macOS. Les symboles Mac se lisent ",
  { t: "⌘", code: true },
  " commande, ",
  { t: "⌥", code: true },
  " option, ",
  { t: "⇧", code: true },
  " majuscule, ",
  { t: "⌃", code: true },
  " contrôle."
]));

c.push(h3("Les captures d'écran"));
c.push(p("Elles ont été prises sous macOS avec un thème sombre. Sous Windows, les fenêtres ont une autre apparence mais le même contenu, et les menus portent les mêmes noms. Ne vous laissez pas troubler par les couleurs."));
c.push(saut());

// ===================== SOMMAIRE =====================
c.push(h1("Sommaire"));

const sommaire = [
  ["Avant de commencer", [
    ["IDE.1", "Quelle édition d'IntelliJ"],
    ["IDE.2", "Installer IntelliJ"],
    ["IDE.3", "Le JDK ne vient pas avec IntelliJ"]
  ]],
  ["Ouvrir le projet du cours", [
    ["IDE.4", "Ouvrir par le pom.xml, jamais par le dossier"],
    ["IDE.5", "Installer un JDK depuis IntelliJ"],
    ["IDE.6", "Vérifier le SDK du projet"]
  ]],
  ["L'écran", [
    ["IDE.7", "Les quatre zones"],
    ["IDE.8", "La fenêtre Project, créer une classe"],
    ["IDE.9", "La fenêtre Maven"],
    ["IDE.10", "Ouvrir et fermer les fenêtres d'outils"]
  ]],
  ["Écrire du code", [
    ["IDE.11", "Complétion et import automatique"],
    ["IDE.12", "Générer accesseurs et constructeurs"],
    ["IDE.13", "Les modèles : psvm, sout, fori"],
    ["IDE.14", "Lire la Javadoc sans quitter l'éditeur"],
    ["IDE.15", "Les avertissements et leurs corrections"]
  ]],
  ["Exécuter", [
    ["IDE.16", "Lancer une classe"],
    ["IDE.17", "Lancer les tests et lire le rapport"],
    ["IDE.18", "Passer des arguments au programme"],
    ["IDE.19", "Le débogueur"]
  ]],
  ["Transformer du code sans le casser", [
    ["IDE.20", "Renommer"],
    ["IDE.21", "Déplacer une classe"],
    ["IDE.22", "Extraire une méthode"]
  ]],
  ["Naviguer", [
    ["IDE.23", "Aller à la déclaration, et revenir"],
    ["IDE.24", "Chercher n'importe quoi"],
    ["IDE.25", "La structure d'un fichier"]
  ]],
  ["Raccourcis et réglages", [
    ["IDE.26", "Les raccourcis à connaître"],
    ["IDE.27", "Plugins et apparence"],
    ["IDE.28", "JavaFX : rien à configurer, ou presque"],
    ["IDE.29", "Installer Scene Builder"]
  ]],
  ["Annexe — Erreurs et solutions", [
    ["ERR.1", "JDK isn't specified for module"],
    ["ERR.2", "Cannot resolve symbol"],
    ["ERR.3", "Tout est rouge sans raison"],
    ["ERR.4", "Pas de flèche verte sur une classe de test"],
    ["ERR.5", "Deux classes du même nom"],
    ["ERR.6", "Lancer malgré une erreur de compilation"],
    ["ERR.7", "JavaFX runtime components are missing"],
    ["ERR.8", "source level should be in ... : 21"],
    ["ERR.9", "Un exercice inachevé bloque tous les autres"],
    ["ERR.10", "Un fichier disparaît de la fenêtre Project"],
    ["ERR.11", "Les modules Maven ont disparu : plus rien ne se lance"]
  ]]
];

sommaire.forEach(([titre, entrees]) => {
  const w = [1500, 7860];
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

// ===================== A =====================
c.push(h1("A — Avant de commencer"));

c.push(h2("IDE.1 — Quelle édition d'IntelliJ"));
c.push(runs([
  "IntelliJ existe en deux éditions. L'édition ",
  { t: "Community", b: true },
  " est gratuite et suffit intégralement pour ce cours : elle gère Java, Maven, JUnit et le débogueur. L'édition ",
  { t: "Ultimate", b: true },
  " est payante et ajoute des outils dont nous n'aurons pas l'usage — serveurs d'applications, frameworks web, bases de données."
]));
c.push(p("Prenez Community. Rien dans ce guide ni dans les exercices ne demande Ultimate."));

c.push(h2("IDE.2 — Installer IntelliJ"));
c.push(runs([
  "Téléchargez depuis ",
  { t: "jetbrains.com/idea/download", code: true },
  ", en veillant à prendre la version correspondant à votre machine. Sur un Mac récent, choisissez la variante ",
  { t: "Apple Silicon", code: true },
  " et non ",
  { t: "Intel", code: true },
  " : la seconde fonctionne, mais plus lentement."
]));
c.push(p("L'installation ne demande aucun réglage particulier. Au premier démarrage, IntelliJ propose d'importer des paramètres existants : répondez que vous n'en avez pas."));

c.push(h2("IDE.3 — Le JDK ne vient pas avec IntelliJ"));
c.push(p("C'est la source de confusion la plus fréquente en début d'année, alors autant l'énoncer tout de suite."));
c.push(runs([
  "IntelliJ est un ",
  { t: "éditeur", i: true },
  ". Il ne compile pas votre code lui-même : il confie ce travail à un JDK, qui est un logiciel distinct. Installer IntelliJ n'installe donc pas Java, et sans JDK rien ne compilera."
]));
c.push(runs([
  "IntelliJ affiche bien un numéro de version de Java dans sa fenêtre ",
  { t: "About", code: true },
  " — c'est celui du Java qui fait tourner IntelliJ lui-même, pas celui qui compilera votre code. Les deux n'ont aucun rapport."
]));
c.push(runs([
  "Deux façons d'installer un JDK. Soit vous le téléchargez chez son éditeur et vous l'installez comme n'importe quel logiciel. Soit vous le laissez faire à IntelliJ, ce qui est plus simple et se fait à l'étape suivante, une fois le projet ouvert. Nous prendrons cette seconde voie : voir ",
  { t: "IDE.5", code: true },
  "."
]));
c.push(encadre([
  [{ t: "Quelle version, quelle distribution", b: true }],
  ["Ce cours utilise ", { t: "Java 21", b: true }, ", qui est une version à support long terme. N'installez pas une version plus récente : votre code pourrait compiler chez vous et pas à l'examen."],
  ["La distribution — Amazon Corretto, Eclipse Temurin, Oracle — importe peu : ce sont des empaquetages du même Java. Corretto et Temurin sont gratuits sans condition."]
]));
c.push(saut());

// ===================== B =====================
c.push(h1("B — Ouvrir le projet du cours"));

c.push(h2("IDE.4 — Ouvrir par le pom.xml, jamais par le dossier"));
c.push(runs([
  "Le projet du cours est un projet ",
  { t: "Maven", b: true },
  " composé de trois modules Maven, ",
  { t: "exercices", code: true },
  ", ",
  { t: "solutions", code: true },
  " et ",
  { t: "demos", code: true },
  ". Sa description tient dans un fichier ",
  { t: "pom.xml", code: true },
  " placé à la racine."
]));
c.push(runs([
  { t: "File → Open", code: true },
  ", puis sélectionnez le fichier ",
  { t: "pom.xml", code: true },
  " lui-même — pas le dossier qui le contient. IntelliJ propose alors « Open as Project » : acceptez."
]));
c.push(...image("ide-04-ouvrir-pom.png", "Sélectionner le pom.xml de la racine, et non le dossier."));
c.push(runs([
  "Le ",
  { t: "pom.xml", code: true },
  " est le fichier qui décrit le projet à Maven : ses modules, ses bibliothèques, sa version de Java. Le mémento technique le détaille en ",
  { t: "TEC-MVN.2", code: true },
  ", et explique à quoi sert Maven en ",
  { t: "TEC-MVN.1", code: true },
  ". Notre projet en compte plusieurs modules — voir ",
  { t: "TEC-MVN.3", code: true },
  "."
]));
c.push(runs([
  { t: "Pourquoi cette insistance. ", b: true },
  "Si vous ouvrez le dossier, IntelliJ crée parfois des modules ordinaires au lieu de modules Maven. Ces modules n'ont pas de JDK, ne connaissent pas les bibliothèques déclarées dans le ",
  { t: "pom.xml", code: true },
  ", et rien ne compile. C'est la cause de l'erreur décrite en ",
  { t: "ERR.1", code: true },
  "."
]));
c.push(p("Au premier chargement, IntelliJ télécharge les bibliothèques dont le projet a besoin — JUnit, JavaFX. Comptez une à deux minutes, avec une barre de progression en bas de la fenêtre. C'est un téléchargement unique : les fois suivantes, l'ouverture est immédiate."));

c.push(h2("IDE.5 — Installer un JDK depuis IntelliJ"));
c.push(runs([
  { t: "File → Project Structure → Project", code: true },
  ". Dépliez la liste du champ ",
  { t: "SDK", code: true },
  " : elle contient les JDK qu'IntelliJ a trouvés sur votre machine, et une entrée ",
  { t: "Download JDK…", code: true },
  " en bas."
]));
c.push(...image("ide-05-telecharger-jdk.png", "La liste du champ SDK, avec l'entrée Download JDK."));
c.push(p("Choisissez la version 21 et une distribution Amazon Corretto ou Eclipse Temurin. IntelliJ télécharge et installe le JDK tout seul, puis le sélectionne."));
c.push(runs([
  { t: "Attention à l'architecture. ", b: true },
  "Sur un Mac Apple Silicon, prenez la variante ",
  { t: "aarch64", code: true },
  " et non ",
  { t: "x86_64", code: true },
  ". Si la liste ne le précise pas, elle propose déjà la bonne."
]));

c.push(h2("IDE.6 — Vérifier le SDK du projet"));
c.push(runs([
  "Toujours dans ",
  { t: "File → Project Structure → Project", code: true },
  ", deux champs comptent."
]));
c.push(bulletRuns([
  { t: "SDK", b: true },
  " : le JDK qui compilera votre code. Il doit nommer un JDK 21."
]));
c.push(bulletRuns([
  { t: "Language level", b: true },
  " : la version du langage que vous êtes autorisé à écrire. Mettez-la sur 21 également."
]));
c.push(...image("ide-06-sdk-projet.png", "Les deux champs à vérifier : SDK et Language level."));
c.push(runs([
  "Les modules Maven n'ont pas de JDK propre : ils héritent de celui du projet. Vous n'avez donc rien à régler module par module — et si un module affiche un JDK explicite au lieu de « Project SDK », c'est une anomalie à corriger. Voir ",
  { t: "ERR.1", code: true },
  "."
]));
c.push(saut());

// ===================== C =====================
c.push(h1("C — L'écran"));

c.push(h2("IDE.7 — Les quatre zones"));
c.push(...image("ide-07-ecran-complet.png", "IntelliJ, projet ouvert."));
c.push(p("L'écran se lit en quatre zones."));
c.push(bulletRuns([
  { t: "À gauche", b: true },
  ", les fenêtres d'outils : Project le plus souvent, mais aussi Maven, Structure, Debug. Elles s'ouvrent et se ferment à volonté."
]));
c.push(bulletRuns([
  { t: "Au centre", b: true },
  ", l'éditeur, avec un onglet par fichier ouvert. C'est là que vous passerez l'essentiel de votre temps."
]));
c.push(bulletRuns([
  { t: "En bas", b: true },
  ", les fenêtres de résultat : Run pour l'exécution, Debug pour le débogage, Terminal. Elles apparaissent quand vous lancez quelque chose."
]));
c.push(bulletRuns([
  { t: "En haut à droite", b: true },
  ", la barre de lancement : la configuration courante, la flèche verte, l'insecte du débogueur."
]));
c.push(p("Tout le reste — les bandeaux de boutons sur les bords — n'est qu'un raccourci vers ces mêmes fenêtres. Ne cherchez pas à tout retenir : trois ou quatre suffisent, et les autres se découvriront d'elles-mêmes."));

c.push(h2("IDE.8 — La fenêtre Project, créer une classe"));
c.push(...image("ide-08-fenetre-projet.png", "L'arborescence du projet, dépliée."));
c.push(p("L'arborescence a l'air compliquée, mais elle obéit à une convention Maven simple et invariable."));
c.push(tableau(["Dossier", "Contenu"], [
  ["src/main/java", "Votre code. Les classes que vous écrivez."],
  ["src/test/java", "Les classes de test. Fournies, à ne pas modifier."],
  ["target", "Le résultat de la compilation. Généré, jamais édité à la main."],
  ["pom.xml", "La description du projet : modules, bibliothèques, version de Java."]
], [2600, 6760], [0]));
c.push(runs([
  "Le dossier ",
  { t: "target", code: true },
  " se recrée intégralement à chaque compilation. C'est pourquoi il est ignoré par Git et absent des archives : il ne contient rien qu'on ne puisse refabriquer. Le mémento technique décrit ce qu'il contient en ",
  { t: "TEC-CMP.4", code: true },
  ", et ce qui distingue votre source, le bytecode et le programme en cours d'exécution en ",
  { t: "TEC-CMP.1", code: true },
  "."
]));
c.push(runs([
  "Notez aussi que ",
  { t: "src/main/java", code: true },
  " et ",
  { t: "src/test/java", code: true },
  " contiennent les ",
  { t: "mêmes", i: true },
  " noms de packages. Ce n'est pas une erreur : une classe de test vit dans le même package que la classe qu'elle teste, ce qui lui donne accès à ses membres non publics."
]));

// Creer une classe (20/10/2026) : l'examen demande d'en creer, et aucune
// section ne le montrait. Captures de Frederic.
c.push(h3("Créer une classe"));
c.push(runs([
  "Dans les exercices, les classes existent déjà. À l'examen, certaines questions vous demandent d'en créer une. Faites un clic droit sur le package qui doit l'accueillir, par exemple ",
  { t: "be.ephec.java.poo.e01", code: true },
  ", puis choisissez New, puis Java Class."
]));
c.push(...image("ide-08-nouvelle-classe.png", "Clic droit sur le package, New, puis Java Class.", 14));
c.push(runs([
  "IntelliJ demande alors le nom de la classe et son genre : une classe ordinaire, une interface, un ",
  { t: "record", code: true },
  ", une énumération (",
  { t: "enum", code: true },
  ")… Le nom suit les conventions : une majuscule initiale, sans espace ni accent, et sans l'extension ",
  { t: ".java", code: true },
  ", qu'IntelliJ ajoute lui-même."
]));
c.push(...image("ide-08-type-de-classe.png", "Le nom de la classe, puis son genre.", 9));
c.push(runs([
  "Le fichier créé contient déjà la ligne ",
  { t: "package", code: true },
  " et la déclaration de la classe, vide : il ne reste qu'à l'écrire. Choisir le bon package compte : une classe créée ailleurs ne sera pas trouvée par la classe de test qui l'attend."
]));

c.push(h2("IDE.9 — La fenêtre Maven"));
c.push(...image("ide-09-fenetre-maven.png", "Le projet parent et ses modules."));
c.push(runs([
  "Cette fenêtre montre le projet tel que Maven le voit : un projet parent, et sous lui un dossier par module — ",
  { t: "exercices", code: true },
  ", ",
  { t: "solutions", code: true },
  " et ",
  { t: "demos", code: true },
  ". Si l'un d'eux n'y figure pas, c'est qu'IntelliJ ne l'a pas reconnu comme module Maven, et il faut relire IDE.4."
]));
c.push(runs([
  "Le bouton de rechargement, en haut à gauche de cette fenêtre, force IntelliJ à relire les ",
  { t: "pom.xml", code: true },
  ". C'est le premier geste à faire quand une bibliothèque semble introuvable alors qu'elle est déclarée. Voir ",
  { t: "ERR.2", code: true },
  "."
]));

c.push(p("Sous chaque module, quatre dossiers. Deux vous serviront, les deux autres presque jamais."));
c.push(tableau(["Dossier", "Ce qu'il contient"], [
  ["Lifecycle", "les étapes de construction : clean, compile, test, package…"],
  ["Dependencies", "les bibliothèques du module, telles que le pom.xml les déclare"],
  ["Plugins", "les outils que Maven ajoute, comme javafx ou surefire"],
  ["Repositories", "les serveurs où Maven va chercher ce qui lui manque"]
], [2200, 7160], [0]));
c.push(runs([
  { t: "Dépliez Lifecycle : ", b: true },
  "vous y trouverez les étapes du cycle de construction. Un double-clic sur l'une d'elles la lance, et Maven exécute au passage toutes celles qui la précèdent — lancer ",
  { t: "test", code: true },
  " compile donc d'abord. Le mémento technique détaille cet enchaînement en ",
  { t: "TEC-MVN.4", code: true },
  "."
]));
c.push(runs([
  { t: "Dépliez Dependencies : ", b: true },
  "vous y verrez les bibliothèques réellement utilisées, avec leur version. C'est l'endroit où vérifier qu'une dépendance déclarée dans le ",
  { t: "pom.xml", code: true },
  " est bien arrivée."
]));
c.push(runs([
  "Elles ne sont téléchargées qu'une fois : Maven les conserve ensuite sur votre machine, ce qui explique pourquoi le premier chargement d'un projet est long et les suivants immédiats. Voir ",
  { t: "TEC-MVN.5", code: true },
  "."
]));
c.push(h2("IDE.10 — Ouvrir et fermer les fenêtres d'outils"));
c.push(p("Les fenêtres d'outils portent un numéro, et le raccourci qui les ouvre reprend ce numéro. Le même raccourci les referme, ce qui rend l'écran modulable en une frappe."));
c.push(tableau(["Fenêtre", "Windows / Linux", "macOS"], [
  ["Project", "Alt+1", "⌘1"],
  ["Run", "Alt+4", "⌘4"],
  ["Debug", "Alt+5", "⌘5"],
  ["Terminal", "Alt+F12", "⌥F12"],
  ["Tout masquer sauf l'éditeur", "Ctrl+Maj+F12", "⇧⌘F12"]
], [3400, 3000, 2960], [1, 2]));
c.push(p("La dernière ligne est la plus utile : elle bascule entre un écran chargé et l'éditeur seul, plein écran. Pratique quand on écrit, et pour se retrouver quand tout est ouvert."));
c.push(saut());

// ===================== D =====================
c.push(h1("D — Écrire du code"));

c.push(h2("IDE.11 — Complétion et import automatique"));
c.push(p("IntelliJ propose des complétions au fil de la frappe : tapez les premières lettres et la liste apparaît. Entrée valide la proposition surlignée."));
c.push(runs([
  "Le point important est ailleurs. Quand vous acceptez une complétion sur une classe qui n'est pas encore importée — ",
  { t: "Scanner", code: true },
  ", ",
  { t: "LocalDate", code: true },
  ", ",
  { t: "ArrayList", code: true },
  " — IntelliJ ajoute l'",
  { t: "import", code: true },
  " en tête de fichier tout seul. Vous n'avez jamais à écrire un import à la main."
]));
c.push(runs([
  "Si un nom de classe apparaît en rouge parce que son import manque, placez le curseur dessus et faites ",
  { t: "Alt+Entrée", code: true },
  " / ",
  { t: "⌥⏎", code: true },
  " : la première proposition sera de l'importer."
]));
c.push(runs([
  { t: "Une nuance qui compte. ", b: true },
  "La complétion propose parfois plusieurs classes de même nom venant de bibliothèques différentes. ",
  { t: "Date", code: true },
  " existe en trois versions, et ",
  { t: "KeyEvent", code: true },
  " en deux — une pour JavaFX, une pour AWT. Lisez le nom complet affiché à droite de la proposition avant de valider : importer la mauvaise donne un code qui ne compile pas, avec un message qui n'aide pas."
]));

c.push(h2("IDE.12 — Générer accesseurs et constructeurs"));
c.push(runs([
  "Placez le curseur dans le corps d'une classe et faites ",
  { t: "Alt+Inser", code: true },
  " / ",
  { t: "⌘N", code: true },
  ". Le menu Generate propose de fabriquer ce qui se déduit mécaniquement des champs."
]));
c.push(...image("ide-12-generer.png", "Le menu Generate.", 4.8));
c.push(bulletRuns([
  { t: "Getter and Setter", b: true },
  " : les accesseurs des champs que vous choisissez."
]));
c.push(bulletRuns([
  { t: "Constructor", b: true },
  " : un constructeur initialisant les champs sélectionnés."
]));
c.push(bulletRuns([
  { t: "Override Methods", b: true },
  " : les méthodes héritées que vous voulez redéfinir."
]));
c.push(encadre([
  [{ t: "Attention aux doublons", b: true }],
  ["Les squelettes d'exercices déclarent souvent déjà les accesseurs, avec un corps qui lève une exception. Dans ce cas, complétez ce corps — ne régénérez pas, vous obtiendriez deux méthodes du même nom et la classe ne compilerait plus."],
  ["Générer ne dispense pas de réfléchir : un getter et un setter pour chaque champ annule l'encapsulation qu'on vient de mettre en place. Voir la règle CC-OBJ.2 du mémento Clean Code."]
]));

c.push(h2("IDE.13 — Les modèles : psvm, sout, fori"));
c.push(p("Certaines suites de caractères se déplient en code quand on les tape puis qu'on appuie sur Tab. Trois valent d'être connues dès la première séance."));
c.push(tableau(["Vous tapez", "Vous obtenez"], [
  ["psvm", "public static void main(String[] args) { }"],
  ["sout", "System.out.println();"],
  ["fori", "une boucle for indexée complète"],
  ["iter", "une boucle for-each sur la collection la plus proche"]
], [2000, 7360], [0, 1]));
c.push(runs([
  "Il en existe des dizaines d'autres. ",
  { t: "Ctrl+J", code: true },
  " / ",
  { t: "⌘J", code: true },
  " affiche la liste de ceux disponibles à l'endroit où vous êtes."
]));

c.push(h2("IDE.14 — Lire la Javadoc sans quitter l'éditeur"));
c.push(p("Plusieurs exercices vous demandent d'aller lire la documentation d'une méthode du JDK. Vous n'avez pas besoin d'ouvrir un navigateur : la documentation est dans IntelliJ."));
c.push(runs([
  "Survolez le nom de la méthode avec la souris, ou placez-y le curseur et faites ",
  { t: "Ctrl+Q", code: true },
  " / ",
  { t: "F1", code: true },
  "."
]));
c.push(...image("ide-14-javadoc.png", "La documentation de Integer.parseInt(String, int)."));
c.push(p("Cette bulle contient tout ce qu'un énoncé peut vous demander de chercher : la signature exacte, ce que la méthode retourne, et surtout la liste des cas où elle lève une exception. Sur la capture, on lit que le radix doit se situer entre MIN_RADIX et MAX_RADIX — exactement ce que demande l'exercice POO.5."));
c.push(p("Les liens de la bulle sont cliquables : de proche en proche, on remonte à toute la bibliothèque standard."));

c.push(h2("IDE.15 — Les avertissements et leurs corrections"));
c.push(p("Un souligné rouge signale une erreur : le code ne compile pas. Un souligné jaune ou gris signale autre chose, et c'est celui qui nous intéresse ici — le code compile parfaitement, mais IntelliJ estime qu'on peut faire mieux."));
c.push(...image("ide-15-code.png", "Le code compile. Le souligné jaune signale autre chose.", 8));
c.push(p("Survolez la partie soulignée : le message explique ce qui est en cause."));
c.push(...image("ide-15-avertissement.png", "Le diagnostic au survol.", 8));
c.push(runs([
  "Puis ",
  { t: "Alt+Entrée", code: true },
  " / ",
  { t: "⌥⏎", code: true },
  " ouvre la liste des corrections possibles. La première est en général la bonne, et un aperçu montre le résultat avant que vous ne validiez."
]));
c.push(...image("ide-15-correction.png", "Les corrections proposées, avec l'aperçu du résultat.", 8));
c.push(runs([
  "Dans cet exemple, un ",
  { t: "if/else", code: true },
  " qui affecte ",
  { t: "true", code: true },
  " dans une branche et ",
  { t: "false", code: true },
  " dans l'autre ne fait que recopier sa propre condition. IntelliJ propose de le remplacer par ",
  { t: "test = i > 4;", code: true },
  ", qui dit la même chose en une ligne."
]));
c.push(encadre([
  [{ t: "Ces avertissements recoupent le mémento Clean Code", b: true }],
  ["La variable jamais utilisée, la méthode qui pourrait être static, la condition inutilement compliquée : IntelliJ effectue gratuitement une partie du travail de relecture que le mémento vous demande de faire à la main."],
  ["Prenez l'habitude de lire ces messages au lieu de les ignorer. Ils ne sont pas tous pertinents — vous apprendrez à faire le tri — mais ils sont bien plus souvent justes que le contraire."]
]));
c.push(saut());

// ===================== E =====================
c.push(h1("E — Exécuter"));

c.push(h2("IDE.16 — Lancer une classe"));
c.push(runs([
  "Une classe est exécutable si elle contient une méthode ",
  { t: "main", code: true },
  ". IntelliJ le repère et affiche une flèche verte dans la marge, à hauteur de la déclaration."
]));
c.push(...image("ide-16-lancer-main.png", "La flèche verte, dans la marge, à côté du main.", 8));
c.push(runs([
  "Cliquez dessus et choisissez ",
  { t: "Run", code: true },
  ". La fenêtre Run s'ouvre en bas et affiche la sortie du programme. Le raccourci ",
  { t: "Maj+F10", code: true },
  " / ",
  { t: "⌃R", code: true },
  " relance ce que vous avez lancé la dernière fois, sans repasser par la marge."
]));
c.push(runs([
  "Si votre programme lit au clavier avec un ",
  { t: "Scanner", code: true },
  ", c'est dans cette fenêtre Run que vous tapez : cliquez dedans avant de saisir."
]));

c.push(h2("IDE.17 — Lancer les tests et lire le rapport"));
c.push(p("C'est le geste que vous répéterez le plus souvent de toute l'année, et celui qui vous dira si votre travail est correct."));
c.push(runs([
  "Ouvrez la classe de test indiquée en fin d'énoncé. Une double flèche verte apparaît dans la marge à hauteur du nom de la classe : elle lance tous les tests du fichier. Une flèche simple, en face de chaque méthode, n'en lance qu'un. Le raccourci est ",
  { t: "Ctrl+Maj+F10", code: true },
  " / ",
  { t: "⌃⇧R", code: true },
  "."
]));
c.push(p("Au départ, tout échoue. C'est normal : vous n'avez encore rien écrit."));
c.push(...image("ide-17-tests-rouge.png", "Quatre tests sur quatre échouent : l'état initial."));
c.push(p("Le panneau se lit en trois temps. À gauche, la liste des tests, chacun avec sa croix ou sa coche. En haut, le compte. À droite, pour le test sélectionné, la raison de l'échec."));
c.push(runs([
  { t: "Lisez cette raison. ", b: true },
  "Les messages sont écrits pour vous : ici, « Le champ 'nom' n'existe pas dans la classe Personne » vous dit exactement quoi faire. Se contenter de voir la croix rouge et retourner au code à l'aveugle vous fera perdre bien plus de temps que de lire trois lignes."
]));
c.push(p("Quand tout est correct, l'ensemble passe au vert."));
c.push(...image("ide-17-tests-vert.png", "Le même fichier de test, une fois le travail fait."));
c.push(encadre([
  [{ t: "Pourquoi les deux captures ne montrent pas le même module", b: true }],
  ["La première est prise dans le module exercices, la seconde dans solutions. Les deux modules contiennent les mêmes classes de test, à l'identique : le corrigé subit exactement les tests que vous subissez, il n'en a pas de plus indulgents."],
  ["Vous obtiendrez le second résultat sur votre propre code, dans le module exercices."]
]));

c.push(h2("IDE.18 — Passer des arguments au programme"));
c.push(runs([
  "La méthode ",
  { t: "main", code: true },
  " reçoit un tableau de chaînes, ",
  { t: "String[] args", code: true },
  ". Pour le remplir, il faut passer par la configuration de lancement : ",
  { t: "Run → Edit Configurations", code: true },
  ", champ ",
  { t: "Program arguments", code: true },
  "."
]));
c.push(...image("ide-18-arguments.png", "Le champ Program arguments d'une configuration de lancement."));
c.push(p("Les arguments sont séparés par des espaces. Pour en passer un qui contient une espace, entourez-le de guillemets."));

c.push(h2("IDE.19 — Le débogueur"));
c.push(p("Le débogueur suspend le programme à l'endroit de votre choix et vous laisse regarder ce qui s'y passe. C'est de loin le meilleur moyen de comprendre ce que fait vraiment votre code — et bien plus efficace que de semer des affichages un peu partout."));
c.push(h3("Le poser"));
c.push(p("Cliquez dans la marge, à gauche d'une ligne : un point rouge apparaît. C'est un point d'arrêt. Lancez ensuite le programme avec l'insecte plutôt qu'avec la flèche verte. L'exécution s'arrête sur cette ligne, avant de l'exécuter."));
c.push(...image("ide-19-debogueur.png", "Arrêt au troisième tour de boucle."));
c.push(h3("Le lire"));
c.push(bulletRuns([
  { t: "Frames", b: true },
  ", à gauche : la pile des appels. Sur la capture, ",
  { t: "inscrire", code: true },
  " a été appelée depuis ",
  { t: "main", code: true },
  ". C'est la pile dont parle le mémento technique, rendue visible."
]));
c.push(bulletRuns([
  { t: "Variables", b: true },
  ", à droite : tout ce qui existe à cet instant. Les objets se déplient et montrent leur contenu — ici, ",
  { t: "partie", code: true },
  " contient une liste de deux joueurs, ce qui confirme qu'on est au troisième tour."
]));
c.push(bulletRuns([
  "Les annotations grises dans l'éditeur affichent la valeur des variables directement à côté du code."
]));
c.push(bulletRuns([
  { t: "Evaluate expression", b: true },
  ", en haut du panneau Variables : tapez une expression — ",
  { t: "Reservation.emises", code: true },
  ", ",
  { t: "liste.size()", code: true },
  " — pour voir sa valeur à l'instant de l'arrêt. C'est utile pour ce que le panneau n'affiche pas de lui-même."
]));
// Capture de Frederic (18/10/2026), arret dans le constructeur de STA.1.
c.push(...image("ide-19-champ-statique.png",
  "Arrêt dans le constructeur de Reservation : nom et numero sont dans this, le compteur static emises est affiché à part."));
c.push(runs([
  "Un champ ",
  { t: "static", code: true },
  " n'apparaît pas quand on déplie ",
  { t: "this" , code: true },
  " : il n'appartient pas à l'objet. IntelliJ l'affiche à part quand la ligne d'arrêt l'utilise ; sinon, demandez-le dans Evaluate expression."
]));
c.push(h3("Avancer"));
c.push(tableau(["Action", "Windows / Linux", "macOS"], [
  ["Ligne suivante, sans entrer dans les appels", "F8", "F8"],
  ["Entrer dans la méthode appelée", "F7", "F7"],
  ["Sortir de la méthode courante", "Maj+F8", "⇧F8"],
  ["Reprendre jusqu'au prochain arrêt", "F9", "⌥⌘R"]
], [4400, 2600, 2360], [1, 2]));
c.push(encadre([
  [{ t: "Trois choses qui surprennent au début", b: true }],
  ["Au début d'un constructeur, les champs valent encore 0 ou null, et IntelliJ annonce ", { t: "Object is being initialized", code: true }, ". Avancez avec F8 pour les voir se remplir."],
  ["Les objets portent un numéro — Partie@827, ArrayList@835. Ce numéro n'a aucune signification en soi et change à chaque exécution : il sert seulement à distinguer deux objets l'un de l'autre. Deux variables qui affichent le même numéro désignent le même objet, et c'est une observation précieuse."],
  ["Déplier une chaîne de caractères montre ses entrailles — un tableau d'octets, un champ hash. Ignorez-les : c'est la mécanique interne de String, pas quelque chose que vous ayez à comprendre."]
]));
c.push(saut());

// ===================== F =====================
c.push(h1("F — Transformer du code sans le casser"));
c.push(p("Renommer une classe, déplacer une méthode, extraire un bout de code : ces opérations sont mécaniques et IntelliJ les fait à votre place, en corrigeant partout où c'est nécessaire. Les faire à la main, c'est se garantir un oubli."));

c.push(h2("IDE.20 — Renommer"));
c.push(runs([
  "Curseur sur le nom, puis ",
  { t: "Maj+F6", code: true },
  ". Tapez le nouveau nom et validez : IntelliJ met à jour toutes les utilisations, dans tout le projet, y compris le nom du fichier si c'est une classe."
]));
c.push(runs([
  "Cela vaut pour tout : classes, méthodes, variables, paramètres, packages. Il n'y a donc aucune raison de conserver un mauvais nom par crainte du travail de correction — voir ",
  { t: "CC-NOM.2", code: true },
  " du mémento Clean Code, qui repose entièrement sur cette possibilité."
]));

c.push(h2("IDE.21 — Déplacer une classe"));
c.push(runs([
  "Sélectionnez la classe dans la fenêtre Project, puis ",
  { t: "F6", code: true },
  ". Indiquez le package de destination."
]));
c.push(...image("ide-21-deplacer.png", "La boîte Move, avec le package de destination."));
c.push(runs([
  "IntelliJ déplace le fichier, corrige sa déclaration de ",
  { t: "package", code: true },
  ", et ajoute les ",
  { t: "import", code: true },
  " nécessaires dans toutes les classes qui l'utilisaient."
]));
c.push(encadre([
  [{ t: "Déplacer, pas copier-coller", b: true }],
  ["La tentation est de créer le nouveau package, d'y coller le fichier et de supprimer l'ancien. Cela marche parfois, et donne parfois deux classes du même nom dans deux packages, ce qui produit des erreurs incompréhensibles. Voir ERR.5."],
  ["L'exercice PKG.4 est bâti sur ce geste, et sa classe de test vérifie explicitement que rien ne subsiste à l'ancien emplacement."]
]));

c.push(h2("IDE.22 — Extraire une méthode"));
c.push(runs([
  "Sélectionnez les lignes à extraire, puis ",
  { t: "Ctrl+Alt+M", code: true },
  " / ",
  { t: "⌥⌘M", code: true },
  ". IntelliJ crée une méthode contenant ces lignes, détermine seul les paramètres nécessaires et la valeur de retour, et remplace les lignes d'origine par un appel."
]));
c.push(runs([
  "C'est l'outil du mémento Clean Code : ",
  { t: "CC-MET.2", code: true },
  " demande des méthodes courtes, ",
  { t: "CC-MET.3", code: true },
  " qu'une méthode ne fasse qu'une chose, et ",
  { t: "CC-COM.1", code: true },
  " de remplacer un commentaire par une méthode bien nommée. Les trois se font avec ce raccourci."
]));
c.push(saut());

// ===================== G =====================
c.push(h1("G — Naviguer"));

c.push(h2("IDE.23 — Aller à la déclaration, et revenir"));
c.push(runs([
  { t: "Ctrl+clic", code: true },
  " / ",
  { t: "⌘clic", code: true },
  " sur n'importe quel nom saute à sa déclaration. Cela fonctionne sur vos classes comme sur celles du JDK : vous pouvez lire le code source de ",
  { t: "ArrayList", code: true },
  " en un clic."
]));
c.push(runs([
  "Pour revenir d'où vous venez : ",
  { t: "Ctrl+Alt+←", code: true },
  " / ",
  { t: "⌘[", code: true },
  ". C'est le bouton « page précédente » de l'éditeur, et il mémorise tout un historique."
]));

c.push(h2("IDE.24 — Chercher n'importe quoi"));
c.push(runs([
  "Appuyez deux fois sur ",
  { t: "Maj", code: true },
  ". Une barre de recherche s'ouvre et cherche partout à la fois : classes, fichiers, symboles, et jusqu'aux commandes d'IntelliJ."
]));
c.push(...image("ide-24-recherche.png", "Search Everywhere."));
c.push(p("C'est le raccourci à retenir si vous n'en retenez qu'un. Vous cherchez une classe dont vous ne savez plus dans quel package elle vit, ou un réglage dont vous ne savez plus dans quel menu il se cache : les deux se trouvent ici."));

c.push(h2("IDE.25 — La structure d'un fichier"));
c.push(runs([
  { t: "Ctrl+F12", code: true },
  " / ",
  { t: "⌘F12", code: true },
  " affiche la liste des champs et méthodes du fichier courant. Tapez quelques lettres pour filtrer, validez pour y sauter."
]));
c.push(p("Utile dès qu'une classe dépasse l'écran — ce qui, si vous suivez le mémento Clean Code, ne devrait pas arriver souvent."));
c.push(saut());

// ===================== H =====================
c.push(h1("H — Raccourcis et réglages"));

c.push(h2("IDE.26 — Les raccourcis à connaître"));
c.push(p("IntelliJ en compte plusieurs centaines. Voici ceux qui servent réellement, regroupés par usage. Apprenez-en deux ou trois par semaine plutôt que la liste entière."));

c.push(h3("Écrire"));
c.push(tableau(["Action", "Windows / Linux", "macOS"], [
  ["Compléter", "Ctrl+Espace", "⌃Espace"],
  ["Corriger, importer, proposer", "Alt+Entrée", "⌥⏎"],
  ["Générer (accesseurs, constructeur)", "Alt+Inser", "⌘N"],
  ["Reformater le code", "Ctrl+Alt+L", "⌥⌘L"],
  ["Dupliquer la ligne", "Ctrl+D", "⌘D"],
  ["Déplacer la ligne", "Alt+Maj+↑ ↓", "⌥⇧↑ ↓"],
  ["Commenter la sélection", "Ctrl+/", "⌘/"],
  ["Coller un contenu précédent", "Ctrl+Maj+V", "⇧⌘V"]
], [4000, 2800, 2560], [1, 2]));

c.push(h3("Naviguer"));
c.push(tableau(["Action", "Windows / Linux", "macOS"], [
  ["Chercher partout", "Maj Maj", "⇧⇧"],
  ["Aller à la déclaration", "Ctrl+clic", "⌘clic"],
  ["Revenir en arrière", "Ctrl+Alt+←", "⌘["],
  ["Structure du fichier", "Ctrl+F12", "⌘F12"],
  ["Fichier récent", "Ctrl+E", "⌘E"]
], [4000, 2800, 2560], [1, 2]));

c.push(h3("Exécuter"));
c.push(tableau(["Action", "Windows / Linux", "macOS"], [
  ["Relancer la dernière exécution", "Maj+F10", "⌃R"],
  ["Lancer ce qui est sous le curseur", "Ctrl+Maj+F10", "⌃⇧R"],
  ["Déboguer la dernière configuration", "Maj+F9", "⌃D"],
  ["Ligne suivante en débogage", "F8", "F8"]
], [4000, 2800, 2560], [1, 2]));

c.push(h3("Transformer"));
c.push(tableau(["Action", "Windows / Linux", "macOS"], [
  ["Renommer", "Maj+F6", "⇧F6"],
  ["Déplacer", "F6", "F6"],
  ["Extraire une méthode", "Ctrl+Alt+M", "⌥⌘M"],
  ["Extraire une variable", "Ctrl+Alt+V", "⌥⌘V"]
], [4000, 2800, 2560], [1, 2]));
c.push(runs([
  "Si vous ne devez en retenir que deux : ",
  { t: "Maj Maj", code: true },
  " pour trouver n'importe quoi, et ",
  { t: "Alt+Entrée", code: true },
  " / ",
  { t: "⌥⏎", code: true },
  " pour qu'IntelliJ propose la correction de ce qu'il vient de signaler."
]));

c.push(h2("IDE.27 — Plugins et apparence"));
c.push(runs([
  { t: "Settings → Plugins", code: true },
  " sous Windows, ",
  { t: "IntelliJ IDEA → Settings → Plugins", code: true },
  " sous macOS. Deux méritent le détour."
]));
c.push(bulletRuns([
  { t: "Key Promoter X", b: true },
  " affiche le raccourci correspondant chaque fois que vous faites quelque chose à la souris. C'est le moyen le plus efficace d'apprendre les raccourcis : ils arrivent au moment où ils serviraient."
]));
c.push(bulletRuns([
  { t: "PlantUML integration", b: true },
  " affiche les diagrammes de classes utilisés dans certains énoncés."
]));
c.push(runs([
  "L'apparence se règle dans ",
  { t: "Settings → Appearance", code: true },
  ". Thème clair ou sombre, taille de la police de l'éditeur : réglez-les à votre confort, et augmentez la police si vous devez projeter votre écran."
]));
c.push(h2("IDE.28 — JavaFX : rien à configurer, ou presque"));
c.push(p("Vous trouverez en ligne des procédures expliquant qu'il faut télécharger un SDK JavaFX, l'installer, puis indiquer à IntelliJ où il se trouve. Ne les suivez pas pour ce cours : elles concernent les projets sans Maven."));
c.push(runs([
  "JavaFX ne fait plus partie du JDK depuis Java 11 — voir ",
  { t: "TEC-FX.2", code: true },
  " du mémento technique. C'est donc une bibliothèque comme une autre, et le projet du cours la déclare dans son ",
  { t: "pom.xml", code: true },
  " au même titre que JUnit :"
]));
c.push(...code([
  "<dependency>",
  "    <groupId>org.openjfx</groupId>",
  "    <artifactId>javafx-controls</artifactId>",
  "    <version>21.0.2</version>",
  "</dependency>"
]));
c.push(p("Maven la télécharge au premier chargement et la place sur le classpath. Vous n'avez rien à installer, rien à désigner, rien à régler."));

c.push(runs([
  "Une seule chose peut être ajoutée, et elle est facultative : Scene Builder, l'éditeur visuel de fichiers ",
  { t: ".fxml", code: true },
  ". Voir ",
  { t: "IDE.29", code: true },
  "."
]));

c.push(h3("Lancer une application JavaFX"));
c.push(runs([
  "C'est le seul point où JavaFX se distingue vraiment. Une application JavaFX a besoin que la bibliothèque soit annoncée à la JVM au démarrage, ce qu'un simple clic sur la flèche verte ne fait pas toujours. Deux façons de procéder, selon ce que l'énoncé indique."
]));
c.push(bulletRuns([
  { t: "Depuis IntelliJ", b: true },
  ", en lançant une classe de démarrage distincte de la classe d'application : le ",
  { t: "Lanceur", code: true },
  ". C'est le montage que le projet du cours utilise, et il est expliqué le moment venu dans le fascicule ",
  { t: "FX", code: true },
  "."
]));
c.push(bulletRuns([
  { t: "Depuis Maven", b: true },
  ", par le greffon JavaFX, qui construit lui-même la ligne de commande correcte. C'est la solution de secours quand le lancement normal échoue : la procédure suit."
]));

c.push(h3("Lancer par Maven : javafx:run"));
c.push(runs([
  { t: "1. Ouvrez la fenêtre Maven. ", b: true },
  "Cliquez sur l'icône ",
  { t: "m", code: true },
  " de la barre verticale de droite, ou passez par ",
  { t: "View → Tool Windows → Maven", code: true },
  "."
]));
c.push(runs([
  { t: "2. Dépliez le bon module. ", b: true },
  "La fenêtre montre le projet parent, puis ses modules, chacun nommé « Exercices Java IN2 — … » : ",
  { t: "enonces", i: true }, " (vos exercices), ",
  { t: "solutions", i: true }, ", ",
  { t: "demos du cours", i: true }, " et ",
  { t: "bac a sable du cours", i: true },
  ". Dépliez celui qui contient la classe à lancer, en général ",
  { t: "enonces", i: true },
  ". Pas le nœud du haut, marqué « (parent) » : depuis lui, Maven lancerait la commande dans chaque module, l'un après l'autre."
]));
c.push(runs([
  { t: "3. Lancez. ", b: true },
  "Sous le module, dépliez ",
  { t: "Plugins → javafx", code: true },
  ", puis double-cliquez sur ",
  { t: "javafx:run", code: true },
  ". La console Maven s'ouvre en bas, puis la fenêtre de l'application apparaît ; la fermer termine l'exécution. La première fois, Maven télécharge le greffon : il faut une connexion internet, et quelques secondes de patience."
]));
c.push(...image("ide-28-javafx-run.png", "La fenêtre Maven : le greffon javafx, sous Plugins, dans le module à lancer.", 9));
c.push(runs([
  { t: "Quelle classe est lancée ? ", b: true },
  "Celle que désigne la propriété ",
  { t: "javafx.mainClass", code: true },
  " dans le ",
  { t: "pom.xml", code: true },
  " du module : pour les énoncés et les solutions, le premier exercice JavaFX, ",
  { t: "be.ephec.java.fx.e01.CompteurParticipants", code: true },
  ". Le greffon accepte directement la classe d'application : inutile de passer par le Lanceur."
]));
c.push(runs([
  { t: "Lancer un autre exercice", b: true },
  ", sans toucher au ",
  { t: "pom.xml", code: true },
  " : faites un clic droit sur ",
  { t: "javafx:run", code: true },
  " et choisissez ",
  { t: "Modify Run Configuration…", code: true },
  "."
]));
c.push(...image("ide-28-javafx-menu.png", "Le menu contextuel de javafx:run.", 8));
c.push(runs([
  "Dans la fenêtre qui s'ouvre, trois réglages :"
]));
c.push(bulletRuns([
  { t: "Name", b: true },
  " : un nom parlant, « FX.2 » par exemple."
]));
c.push(bulletRuns([
  { t: "Run", b: true },
  " : la commande. Gardez ce qu'IntelliJ a écrit, et ajoutez la classe à lancer après ",
  { t: "javafx:run", code: true },
  " :"
]));
c.push(...code([
  "javafx:run -Djavafx.mainClass=be.ephec.java.fx.e02.CompteurParticipants -f pom.xml"
]));
c.push(bulletRuns([
  { t: "Working directory", b: true },
  " : le dossier dont Maven lit le ",
  { t: "pom.xml", code: true },
  ". Vérifiez qu'il désigne bien le module, par exemple le dossier ",
  { t: "exercices", code: true },
  ". S'il indique la racine du projet, choisissez le dossier du module avec l'icône de dossier : sinon, Maven partirait du ",
  { t: "pom.xml", code: true },
  " parent et lancerait la commande dans chaque module."
]));
c.push(...image("ide-28-javafx-config.png", "La configuration d'exécution : son nom, la commande Maven, le dossier de travail.", 10));
c.push(p("Validez par OK. La configuration apparaît ensuite dans la liste déroulante en haut à droite d'IntelliJ, et la flèche verte la relance."));
c.push(runs([
  "Si vous obtenez le message ",
  { t: "JavaFX runtime components are missing", code: true },
  ", c'est exactement ce problème : voir ",
  { t: "ERR.7", code: true },
  "."
]));

c.push(h2("IDE.29 — Installer Scene Builder"));
c.push(runs([
  "Scene Builder est un éditeur visuel de fichiers ",
  { t: ".fxml", code: true },
  " : on y compose la fenêtre en déposant les composants à la souris, et il écrit le XML correspondant. Il est gratuit."
]));
c.push(runs([
  { t: "Ce n'est pas un greffon d'IntelliJ, mais un logiciel séparé. ", b: true },
  "IntelliJ ne fait que lui passer la main quand vous ouvrez un fichier FXML. Il faut donc l'installer, puis dire à IntelliJ où il se trouve — deux étapes distinctes, et c'est la seconde qu'on oublie."
]));

c.push(h3("1. Télécharger"));
c.push(runs([
  "Sur ",
  { t: "gluonhq.com/products/scene-builder", code: true },
  ", en prenant la version correspondant à votre système. Sur un Mac Apple Silicon, vérifiez qu'il s'agit bien de la variante ",
  { t: "aarch64", code: true },
  " et non ",
  { t: "x64", code: true },
  "."
]));
c.push(runs([
  { t: "Quelle version. ", b: true },
  "Les numéros de Scene Builder suivent ceux de JavaFX. Le cours utilise JavaFX 21 : prenez Scene Builder 21, ou la version disponible la plus proche. Un Scene Builder plus récent que votre JavaFX peut écrire dans le FXML des attributs que votre version ne comprend pas — le fichier s'ouvre alors correctement dans l'éditeur et échoue au lancement."
]));

c.push(h3("2. Installer"));
c.push(p("Installation ordinaire : un .dmg à glisser dans Applications sous macOS, un installateur sous Windows. Aucun réglage à faire pendant l'installation."));
c.push(p("Notez le chemin où il atterrit, vous en aurez besoin à l'étape suivante. Par défaut :"));
c.push(...code([
  "macOS     /Applications/SceneBuilder.app",
  "Windows   C:\\Users\\<vous>\\AppData\\Local\\SceneBuilder\\SceneBuilder.exe"
]));

c.push(h3("3. Le déclarer dans IntelliJ"));
c.push(runs([
  { t: "Settings → Languages & Frameworks → JavaFX", code: true },
  ", champ ",
  { t: "Path to SceneBuilder", code: true },
  ". Désignez le fichier repéré ci-dessus."
]));
c.push(p("C'est la seule ligne à renseigner. Tant qu'elle est vide, IntelliJ ouvre les fichiers FXML comme du XML ordinaire, sans onglet d'édition visuelle — et rien n'indique qu'il manque quelque chose."));

c.push(h3("4. Vérifier"));
c.push(runs([
  "Ouvrez n'importe quel fichier ",
  { t: ".fxml", code: true },
  " du projet. Deux onglets doivent apparaître en bas de l'éditeur : ",
  { t: "Text", code: true },
  " et ",
  { t: "Scene Builder", code: true },
  ". Le second affiche la fenêtre telle qu'elle sera, avec la palette de composants sur le côté."
]));
c.push(p("Si l'onglet n'apparaît pas, le chemin est erroné ou pointe vers le dossier plutôt que vers l'exécutable."));

c.push(h3("S'en servir, ou pas"));
c.push(p("Scene Builder fait gagner du temps sur les fenêtres complexes, où placer les composants à la main devient fastidieux. Il rend aussi visible ce qu'un gestionnaire de placement fait réellement, ce qui aide à comprendre pourquoi une fenêtre se réorganise quand on la redimensionne."));
c.push(runs([
  { t: "Mais vous pouvez très bien vous en passer, et je vous conseille de commencer sans. ", b: true },
  "Écrire quelques fichiers FXML à la main apprend leur structure, et cette structure est ce que l'examen évalue — pas votre habileté à la souris."
]));
c.push(encadre([
  [{ t: "Deux attributs à ne jamais perdre de vue", b: true }],
  ["Un fichier FXML contient un attribut fx:controller sur son élément racine, qui désigne la classe contrôleur, et des attributs fx:id sur les composants que le contrôleur manipule. Ce sont eux qui relient la vue au code."],
  ["Scene Builder les gère, mais ils se règlent dans un panneau discret. Si votre application se lance avec une fenêtre vide, ou lève une exception au démarrage en évoquant un champ null, vérifiez d'abord ces deux attributs dans l'onglet Text."]
]));

c.push(saut());

// ===================== ANNEXE =====================
c.push(h1("Annexe — Erreurs et solutions"));
c.push(p("Les messages les plus fréquents, leur cause, et ce qu'il faut faire. Cherchez le message que vous avez à l'écran plutôt que de lire l'annexe en entier.", { italic: true, color: GREY }));

c.push(h2("ERR.1 — JDK isn't specified for module"));
c.push(...code([
  "java: JDK isn't specified for module 'solutions'"
]));
c.push(p("Un module Maven ne définit pas son propre JDK : il hérite de celui du projet. Ce message signifie donc presque toujours qu'aucun JDK n'est déclaré au niveau du projet, et il nomme simplement le premier module qu'IntelliJ a essayé de compiler."));
c.push(runs([
  { t: "File → Project Structure → Project", code: true },
  ", champ SDK : choisissez un JDK 21. S'il n'y en a aucun dans la liste, voir ",
  { t: "IDE.5", code: true },
  "."
]));
c.push(runs([
  "Si le SDK du projet est correct et que le message persiste, vérifiez le module lui-même : ",
  { t: "Project Structure → Modules", code: true },
  ", onglet ",
  { t: "Dependencies", code: true },
  ", champ ",
  { t: "Module SDK", code: true },
  ". Il doit indiquer « Project SDK » et non un JDK nommé."
]));
c.push(runs([
  "En dernier recours, fermez le projet, supprimez le dossier ",
  { t: ".idea", code: true },
  " et les fichiers ",
  { t: ".iml", code: true },
  ", puis rouvrez par le ",
  { t: "pom.xml", code: true },
  ". Vous ne perdez rien : ce dossier ne contient que des préférences d'affichage."
]));

c.push(h2("ERR.2 — Cannot resolve symbol"));
c.push(...code([
  "java: cannot find symbol",
  "  symbol:   class Test",
  "  location: package org.junit.jupiter.api"
]));
c.push(p("Une classe venant d'une bibliothèque est introuvable. Le plus souvent, IntelliJ n'a pas encore chargé ce que déclare le pom.xml — après un premier chargement interrompu, ou après avoir déplié une nouvelle archive dans le projet."));
c.push(runs([
  "Ouvrez la fenêtre Maven et cliquez sur le bouton de rechargement. Voir ",
  { t: "IDE.9", code: true },
  ". Si le téléchargement échoue, vérifiez votre connexion : Maven va chercher les bibliothèques sur Internet à la première utilisation."
]));

c.push(h2("ERR.3 — Tout est rouge sans raison"));
c.push(p("Des dizaines de classes soulignées en rouge alors que le code n'a pas changé, souvent après une mise à jour d'IntelliJ ou l'ajout de fichiers dans le projet. Les index de résolution sont désynchronisés."));
c.push(runs([
  { t: "File → Invalidate Caches… → Invalidate and Restart", code: true },
  ". IntelliJ reconstruit ses index au redémarrage, ce qui prend une minute. Rien n'est perdu : ni votre code, ni vos réglages."
]));

c.push(h2("ERR.4 — Pas de flèche verte sur une classe de test"));
c.push(p("Trois causes possibles, dans l'ordre de fréquence."));
c.push(bulletRuns([
  "Le fichier n'est pas sous ",
  { t: "src/test/java", code: true },
  " mais sous ",
  { t: "src/main/java", code: true },
  ". Déplacez-le avec ",
  { t: "F6", code: true },
  "."
]));
c.push(bulletRuns([
  "La déclaration de ",
  { t: "package", code: true },
  " ne correspond pas à l'emplacement du fichier dans l'arborescence. Les deux doivent coïncider exactement."
]));
c.push(bulletRuns([
  "JUnit n'est pas chargé : voir ",
  { t: "ERR.2", code: true },
  "."
]));
c.push(bulletRuns([
  "Aucune classe du projet n'a de flèche verte, pas seulement les tests : voir ",
  { t: "ERR.11", code: true },
  "."
]));

c.push(h2("ERR.5 — Deux classes du même nom"));
c.push(p("Des erreurs incompréhensibles après une réorganisation : une méthode existe pourtant, un import semble correct mais ne l'est pas. Presque toujours, une classe a été copiée-collée dans un nouveau package sans être supprimée de l'ancien. Vous en modifiez une, le programme utilise l'autre."));
c.push(runs([
  "Cherchez le nom de la classe avec ",
  { t: "Maj Maj", code: true },
  " : si deux résultats apparaissent dans deux packages différents, vous tenez le coupable. Supprimez celle qui est à la mauvaise place, et à l'avenir déplacez avec ",
  { t: "F6", code: true },
  " au lieu de copier — voir ",
  { t: "IDE.21", code: true },
  "."
]));

c.push(h2("ERR.6 — Lancer malgré une erreur de compilation"));
c.push(p("Par défaut, IntelliJ compile tout le module avant de lancer quoi que ce soit. Une erreur dans une classe empêche donc de lancer une autre classe, même sans rapport avec elle."));
c.push(runs([
  "Il est possible de contourner ce comportement : ",
  { t: "Settings → Build, Execution, Deployment → Compiler → Java Compiler", code: true },
  ", basculez ",
  { t: "Use compiler", code: true },
  " sur ",
  { t: "Eclipse", code: true },
  ", puis cochez ",
  { t: "Proceed on errors", code: true },
  ". L'option n'apparaît qu'après avoir changé de compilateur."
]));
c.push(...image("ide-27-compilateur.png", "L'option Proceed on errors, disponible avec le compilateur Eclipse."));
c.push(encadre([
  [{ t: "Ne le faites pas dans ce projet", b: true }],
  ["Le compilateur Eclipse embarqué dans IntelliJ 2024.3 ne gère Java que jusqu'à la version 18. Ce cours utilise Java 21 : dès que vous basculez dessus, plus rien ne compile, et vous obtenez le message décrit en ERR.8."],
  ["L'option est donc inutilisable ici, et c'est aussi bien : changer de compilateur pour contourner une erreur de compilation est un pis-aller. Le bon réflexe reste de lire le message et de corriger."],
  ["Dans le projet du cours, le problème que l'option prétend résoudre ne se pose de toute façon pas : les squelettes fournis compilent toujours, puisqu'ils lèvent une exception au lieu d'être vides."]
], "9C2B2B"));

c.push(h2("ERR.7 — JavaFX runtime components are missing"));
c.push(...code([
  "Error: JavaFX runtime components are missing,",
  "and are required to run this application"
]));
c.push(p("La bibliothèque JavaFX est bien présente dans le projet, mais elle n'a pas été annoncée à la JVM au démarrage. Ce n'est pas une dépendance manquante : c'est une histoire de mode de lancement."));
c.push(runs([
  "Lancez par ",
  { t: "javafx:run", code: true },
  " depuis la fenêtre Maven, ou par la classe de démarrage prévue par l'énoncé. Voir ",
  { t: "IDE.28", code: true },
  "."
]));
c.push(runs([
  "L'explication de fond — pourquoi JavaFX est sortie du JDK et ce que cela change — se trouve en ",
  { t: "TEC-FX.2", code: true },
  " du mémento technique."
]));

c.push(h2("ERR.8 — source level should be in ... : 21"));
c.push(...code([
  "java: java.lang.IllegalArgumentException: source level should be in",
  "'1.1'...'1.8','9'...'18' (or '5.0'..'18.0'): 21"
]));
c.push(runs([
  "Ce message ne vient pas de ",
  { t: "javac", code: true },
  " mais du compilateur Eclipse. Il dit qu'on lui demande de compiler en Java 21 alors qu'il ne connaît le langage que jusqu'à la version 18."
]));
c.push(runs([
  { t: "La cause est presque toujours la même : ", b: true },
  "le compilateur du projet a été basculé sur Eclipse, souvent pour accéder à l'option décrite en ",
  { t: "ERR.6", code: true },
  ". Une fois basculé, il le reste."
]));
c.push(runs([
  { t: "Le remède. ", b: true },
  { t: "Settings → Build, Execution, Deployment → Compiler → Java Compiler", code: true },
  ", champ ",
  { t: "Use compiler", code: true },
  " : remettez-le sur ",
  { t: "Javac", code: true },
  ". Relancez ensuite la compilation."
]));
c.push(p("Si le message persiste, vérifiez dans le même écran que le champ « Project bytecode version » et les « Target bytecode version » par module indiquent 21 ou « Same as language level »."));
c.push(encadre([
  [{ t: "Un message qui désigne le coupable", b: true }],
  ["La liste des versions acceptées est signée : elle s'arrête à 18, ce qui ne correspond à aucun JDK que vous auriez installé. C'est le genre de détail qui permet d'identifier l'outil fautif sans chercher plus loin."],
  ["À l'inverse, javac dirait quelque chose comme « release version 21 not supported », en nommant la version qu'il connaît."]
]));

c.push(h2("ERR.9 — Un exercice inachevé bloque tous les autres"));
c.push(p("Vous laissez un exercice à moitié écrit, avec une accolade manquante ou un type qui ne correspond pas. Et soudain plus rien ne se lance — pas même un exercice fait la semaine dernière, qui n'a aucun rapport."));
c.push(runs([
  { t: "Ce n'est pas une panne, c'est ainsi que Java compile. ", b: true },
  "Tout le dossier ",
  { t: "src/main/java", code: true },
  " du module se compile d'un seul bloc, et ",
  { t: "src/test/java", code: true },
  " en dépend. Un seul fichier fautif suffit donc à empêcher la production de tous les autres."
]));
c.push(h3("Ce qui n'est PAS bloqué"));
c.push(runs([
  "Le projet compte trois modules Maven indépendants — ",
  { t: "exercices", code: true },
  ", ",
  { t: "solutions", code: true },
  " et ",
  { t: "demos", code: true },
  " — et aucun ne dépend des deux autres. Une erreur dans votre code n'empêche donc ni d'ouvrir un corrigé, ni de lancer une démonstration du cours."
]));
c.push(h3("Trois façons de s'en sortir"));
c.push(runs([
  { t: "1. Commenter le code fautif. ", b: true },
  "Sélectionnez les lignes en chantier et faites ",
  { t: "Ctrl+/", code: true },
  " / ",
  { t: "⌘/", code: true },
  ". Tout recompile, vous reprenez votre travail plus tard. C'est la solution en dix secondes, et celle à prendre comme réflexe."
]));
c.push(runs([
  { t: "2. Remettre le squelette d'origine. ", b: true },
  "Extrayez l'archive de la séance dans un dossier temporaire — et non par-dessus votre projet, voir ",
  { t: "TEC-ZIP.1", code: true },
  " — puis recopiez le seul fichier concerné. Vous perdez ce que vous aviez écrit dans ce fichier-là, rien d'autre : ",
  { t: "TEC-ZIP.2", code: true },
  " du mémento technique explique pourquoi."
]));
c.push(runs([
  { t: "3. Demander à IntelliJ de lancer malgré tout. ", b: true },
  "Dans ",
  { t: "Run → Edit Configurations", code: true },
  ", section ",
  { t: "Before launch", code: true },
  ", remplacez la tâche ",
  { t: "Build", code: true },
  " par ",
  { t: "Build, no error check", code: true },
  ". IntelliJ compile alors ce qu'il peut et lance votre classe si elle-même est correcte."
]));
c.push(encadre([
  [{ t: "La troisième solution a ses limites", b: true }],
  ["Elle ne fonctionne que si la classe que vous lancez a réellement compilé. Si c'est elle qui contient l'erreur, rien ne la sauvera."],
  ["Et elle se règle configuration par configuration, ce qui devient vite fastidieux. Considérez-la comme un dépannage ponctuel, pas comme un réglage à laisser en place."],
  ["Ne cherchez surtout pas à obtenir le même effet en changeant de compilateur : voir ERR.6, qui explique pourquoi cela ne marche pas dans ce projet."]
]));
c.push(h3("Ce qu'il faut en retenir"));
c.push(p("Laissez votre code dans un état qui compile avant de passer à autre chose. Un exercice incomplet mais compilable ne gêne personne ; un exercice à moitié tapé bloque toute la soirée."));
c.push(runs([
  "C'est d'ailleurs pourquoi les squelettes qu'on vous fournit lèvent une ",
  { t: "UnsupportedOperationException", code: true },
  " au lieu d'être vides : un squelette compile dès le premier instant, avant même que vous n'ayez écrit quoi que ce soit."
]));

c.push(h2("ERR.10 — Un fichier disparaît de la fenêtre Project"));
c.push(p("Vous travaillez sur un fichier, et il s'efface de l'arborescence. Parfois le dossier entier. Il revient de lui-même au bout d'un moment, ou au prochain clic dans la fenêtre."));
c.push(runs([
  { t: "Votre fichier n'est pas perdu. ", b: true },
  "Il est sur le disque, exactement là où vous l'avez laissé. C'est la ",
  { t: "vue", i: true },
  " qu'IntelliJ en a qui s'est désynchronisée."
]));

c.push(h3("Pourquoi cela arrive sur un disque réseau"));
c.push(p("IntelliJ ne relit pas le disque à chaque affichage : ce serait trop lent. Il garde une image de l'arborescence en mémoire, et demande au système d'exploitation de le prévenir quand un fichier change."));
c.push(runs([
  { t: "Ce mécanisme d'alerte ne fonctionne pas sur un partage réseau. ", b: true },
  "IntelliJ le sait, et il l'annonce parfois lui-même dans une bulle au démarrage :"
]));
c.push(...code([
  "External file changes sync may be slow:",
  "Project files cannot be watched (are they under network mount?)"
]));
c.push(p("Faute d'être prévenu, IntelliJ se rabat sur une relecture périodique. Entre deux relectures, sa vue peut être en retard. Et si le partage répond lentement au moment exact où il relit un dossier, la lecture échoue : IntelliJ conclut que le dossier est vide, et l'affiche vide. La relecture suivante, réussie, remet tout en place — d'où le retour spontané."));

c.push(h3("Ce qu'il faut faire"));
c.push(runs([
  { t: "Forcez la relecture : ", b: true },
  { t: "File → Reload All from Disk", code: true },
  " — ",
  { t: "Ctrl+Alt+Y", code: true },
  " / ",
  { t: "⌥⌘Y", code: true },
  ". L'arborescence est reconstruite à partir du disque, et le fichier réapparaît."
]));
c.push(p("Si vous voulez vous rassurer avant, ouvrez le dossier dans l'explorateur de fichiers du système : il y verra le fichier, lui."));

c.push(encadre([
  [{ t: "Ce qu'il ne faut surtout pas faire", b: true }],
  ["Recréer le fichier. Vous en obtiendriez un second, vide, qui écraserait le vôtre à l'enregistrement — et là, cette fois, le travail serait bel et bien perdu."],
  ["Le réflexe est compréhensible, et c'est précisément pour cela qu'il faut l'avoir vu écrit avant de se trouver devant l'écran."]
], "9C2B2B"));

c.push(h3("Le même symptôme, une autre cause"));
c.push(runs([
  "Si le fichier ne revient pas après un ",
  { t: "Reload All from Disk", code: true },
  ", ce n'est plus un problème d'affichage. Vérifiez alors qu'il n'a pas été déplacé par un ",
  { t: "F6", code: true },
  " involontaire, ou filtré par la barre de recherche de la fenêtre Project — quelques lettres tapées par erreur dans l'arborescence y font office de filtre, et masquent tout le reste."
]));
c.push(p("En séance d'examen, signalez-le plutôt que d'improviser : cinq secondes de vérification valent mieux qu'un fichier écrasé."));

c.push(h2("ERR.11 — Les modules Maven ont disparu : plus rien ne se lance"));
c.push(runs([
  "Les dossiers ",
  { t: "exercices", code: true },
  ", ",
  { t: "solutions", code: true },
  " ou ",
  { t: "demos", code: true },
  " apparaissent comme des dossiers ordinaires : ",
  { t: "src/main/java", code: true },
  " n'est plus en bleu, aucune flèche verte ne s'affiche à côté des ",
  { t: "main", code: true },
  ", et les tests ne se lancent plus. Cela arrive souvent après avoir récupéré une nouvelle version du projet ou déplié une archive dedans : IntelliJ n'a pas relu les ",
  { t: "pom.xml", code: true },
  "."
]));
c.push(p("IntelliJ propose normalement de le faire lui-même, par une petite icône Maven qui apparaît en haut à droite de l'éditeur. Elle est discrète, et on la manque facilement."));
c.push(runs([
  { t: "Ouvrez la fenêtre Maven et cliquez sur le bouton de rechargement. ", b: true },
  "Voir ",
  { t: "IDE.9", code: true },
  ". Si la fenêtre Maven est vide, faites un clic droit sur le ",
  { t: "pom.xml", code: true },
  " à la racine du projet, puis ",
  { t: "Add as Maven Project", code: true },
  ". Si le problème persiste, voir ",
  { t: "ERR.3", code: true },
  "."
]));
c.push(runs([
  "Avant de recharger, vérifiez que chaque module déclaré par le ",
  { t: "pom.xml", code: true },
  " racine existe bien, avec son propre ",
  { t: "pom.xml", code: true },
  " : s'il en manque un, Maven refuse de charger le projet entier, et tous les modules disparaissent d'un coup."
]));

// ===================== DOCUMENT =====================
const doc = new Document({
  creator: "Frédéric Ferrant — EPHEC",
  title: "Guide IntelliJ IDEA",
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
  fs.writeFileSync(__dirname + "/../../documents/Guide_IntelliJ.docx", b);
  console.log("écrit :", Math.round(b.length / 1024), "Ko");
});
