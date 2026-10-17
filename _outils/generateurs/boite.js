const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle,
  PageBreak, LevelFormat, convertInchesToTwip,
  Bookmark, InternalHyperlink, ImageRun
} = require("docx");

const MONO = "Consolas";
const ACCENT = "1F4E79";
const GREY = "595959";
const W = 9360;

/**
 * L'espace insecable, pose a la source.
 *
 * En typographie francaise, « : » « ; » « ? » « ! » et « » » se collent au
 * mot precedent par un espace qui ne doit jamais tomber en fin de ligne.
 * Sans lui, Word peut renvoyer un deux-points seul a la ligne suivante.
 *
 * On le pose ICI plutot qu'en post-traitement : un document regenere
 * naitrait sinon avec des espaces ordinaires, et il faudrait penser a
 * relancer l'outil. Ce qui se fait a la source ne s'oublie pas.
 *
 * LE CODE EST EPARGNE. Dans un bloc ou un fragment monospace, les deux
 * points appartiennent au langage — un « case NIM -> » ou un
 * « Map<String, Integer> » n'a que faire de la typographie francaise.
 */
const INSECABLE = "\u00a0";

function typo(texte) {
  if (typeof texte !== "string") return texte;
  return texte
    .replace(/ ([:;?!»])/g, INSECABLE + "$1")
    .replace(/« /g, "«" + INSECABLE);
}

/**
 * La ligne « Package : … » qui suit le titre d'un exercice reste attachee
 * au paragraphe suivant. Le titre l'est deja a elle (keepNext des h1) :
 * sans ce second maillon, titre et ligne de package pouvaient finir seuls
 * en bas de page, l'enonce commencant sur la page d'apres.
 */
const LIGNE_PACKAGE = /^Package\s*:/;

function p(text, o = {}) {
  return new Paragraph({
    spacing: { after: o.after === undefined ? 120 : o.after },
    alignment: o.align,
    keepNext: o.keepNext || LIGNE_PACKAGE.test(String(text)),
    children: [new TextRun({ text: typo(text), bold: o.bold, italics: o.italic, size: o.size || 22, color: o.color })]
  });
}

function morceaux(list) {
  // Un paragraphe est decoupe en fragments, et la ponctuation tombe
  // souvent a la frontiere : « Voir » + « pom.xml » en monospace +
  // « : sa raison d'etre ». Le remplacement fragment par fragment ne
  // verrait pas cet espace-la, puisqu'il termine un fragment et que le
  // signe en commence un autre. On recolle donc les bords.
  const textes = list.map(x => (typeof x === "string" ? x : x.t) || "");
  const monospace = list.map(x => typeof x !== "string" && !!x.code);

  const corriges = textes.map((t, i) => (monospace[i] ? t : typo(t)));

  for (let i = 0; i < corriges.length - 1; i++) {
    const suite = corriges[i + 1];
    if (!suite) continue;
    if (corriges[i].endsWith(" ") && ":;?!»".includes(suite[0])) {
      corriges[i] = corriges[i].slice(0, -1) + INSECABLE;
    } else if (corriges[i].endsWith("«") && suite.startsWith(" ")) {
      corriges[i + 1] = INSECABLE + suite.slice(1);
    }
  }

  return list.map((x, i) => typeof x === "string"
    ? new TextRun({ text: corriges[i], size: 22 })
    : new TextRun({
        text: corriges[i], size: 22, bold: x.b, italics: x.i,
        font: x.code ? MONO : undefined, color: x.code ? "8B2500" : undefined
      }));
}

const runs = (l, o = {}) => new Paragraph({
  spacing: { after: o.after === undefined ? 120 : o.after }, keepNext: o.keepNext,
  children: morceaux(l)
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

/**
 * Le code d'un exercice : ABS.1, TMP.12…
 *
 * Il sert a deux choses : poser un signet sur le titre de l'exercice, et
 * fabriquer le lien qui y mene depuis le tableau d'ouverture. Les deux
 * doivent tomber d'accord, d'ou cette unique fonction.
 */
const CODE_EXERCICE = /^([A-Z]{2,3})\.(\d+)\b/;
const ancre = (code) => "ex-" + code.replace(".", "-");

const h1 = (t) => new Paragraph({
  heading: HeadingLevel.HEADING_1, spacing: { before: 360, after: 160 }, keepNext: true,
  // Un titre qui commence par un code d'exercice porte un signet, pour
  // que le tableau d'ouverture puisse y renvoyer.
  children: [(() => {
    const trouve = CODE_EXERCICE.exec(t);
    const texte = new TextRun({ text: typo(t), bold: true, size: 30, color: ACCENT });
    return trouve
      ? new Bookmark({ id: ancre(trouve[0]), children: [texte] })
      : texte;
  })()]
});

const h2 = (t) => new Paragraph({
  heading: HeadingLevel.HEADING_2, spacing: { before: 240, after: 100 }, keepNext: true,
  children: [new TextRun({ text: typo(t), bold: true, size: 24, color: GREY })]
});

/**
 * Une cellule dont le contenu renvoie a l'exercice du meme nom.
 *
 * On ne met pas de numero de page : il bougerait a la premiere image
 * ajoutee. Le signet, lui, suit son titre.
 */
function celluleLien(code, o = {}) {
  return new TableCell({
    width: { size: o.width, type: WidthType.DXA },
    shading: o.fill ? { type: ShadingType.CLEAR, fill: o.fill } : undefined,
    margins: { top: 55, bottom: 55, left: 100, right: 100 },
    children: [new Paragraph({
      spacing: { after: 0 },
      children: [new InternalHyperlink({
        anchor: ancre(code),
        children: [new TextRun({
          text: code, size: 18, font: MONO, color: "2B6CB0", underline: {}
        })]
      })]
    })]
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
      // Une cellule monospace porte du code : on ne la touche pas.
      children: [new TextRun({ text: o.mono ? text : typo(text), bold: o.bold, size: o.mono ? 18 : 20, font: o.mono ? MONO : undefined })]
    })]
  });
}

function tableau(entetes, lignes, largeurs, monoCols, lier) {
  const w = largeurs || [2200, 3400, 3760];
  const mono = monoCols === undefined ? [0, 1] : monoCols;
  return new Table({
    columnWidths: w, width: { size: W, type: WidthType.DXA },
    rows: [
      new TableRow({
        tableHeader: true,
        // Quand seule la premiere colonne porte un titre, on fusionne la
        // ligne. Sans cela le titre se comprime dans une colonne etroite,
        // souvent sur deux lignes, alors que la place est juste a cote.
        children: entetes.slice(1).every(e => !e || !String(e).trim())
          ? [cell(entetes[0], { bold: true, fill: "DEEAF6",
                                width: w.reduce((a, b) => a + b, 0),
                                span: entetes.length })]
          : entetes.map((e, i) => cell(e, { bold: true, width: w[i], fill: "DEEAF6" }))
      }),
      ...lignes.map(r => new TableRow({
        cantSplit: true,
        children: r.map((val, i) => (i === 0 && lier && CODE_EXERCICE.test(String(val)))
          ? celluleLien(String(val), { width: w[i] })
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

/**
 * Les titres de section communs a tous les exercices.
 *
 * Ils sont definis ici pour qu'un changement de libelle se fasse en un
 * seul endroit (renommage du 16/10/2026 : « Specifications » et
 * « Verification » sont devenus plus explicites pour les etudiants).
 */
const TITRES = {
  objectif: "Objectif",
  contexte: "Contexte",
  enonce: "Énoncé",
  specifications: "Spécifications à respecter",
  fourni: "Ce qui vous est fourni",
  exemples: "Exemples attendus",
  verification: "Comment vérifier votre code",
  observer: "Ce que vous devez observer",
  questions: "Questions à se poser"
};

/**
 * Le logo de l'EPHEC, en haut a gauche de chaque page de garde.
 *
 * Repris de la page de garde de l'examen de seconde session, a la meme
 * taille (4,2 x 2 cm). L'image ne fait que 363 x 173 pixels : suffisant a
 * cette taille, a remplacer si une version de meilleure definition existe.
 */
const LOGO = fs.readFileSync(__dirname + "/logo_ephec.png");
function logo() {
  return new Paragraph({
    spacing: { after: 0 },
    children: [new ImageRun({
      type: "png", data: LOGO,
      transformation: { width: 159, height: 76 },
      altText: { name: "logo", title: "EPHEC", description: "Logo de l'EPHEC" }
    })]
  });
}

function couverture(c, theme, titre, sous) {
  c.push(logo());
  c.push(new Paragraph({
    spacing: { before: 700, after: 120 }, alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: typo("Programmation orientée objet — Java"), size: 26, color: GREY })]
  }));
  c.push(new Paragraph({
    spacing: { after: 100 }, alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: typo("Thème " + theme), bold: true, size: 52, color: ACCENT })]
  }));
  c.push(new Paragraph({
    spacing: { after: 200 }, alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: typo(titre), bold: true, size: 32, color: ACCENT })]
  }));
  c.push(new Paragraph({
    spacing: { after: 800 }, alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: typo(sous), size: 26, color: GREY })]
  }));
  c.push(p("EPHEC — Bachelier en informatique, niveau 2", { align: AlignmentType.CENTER, color: GREY }));
  c.push(p("Année académique 2026-2027", { align: AlignmentType.CENTER, color: GREY }));
  c.push(saut());
}

/**
 * Ce que chaque section d'un exercice apporte, dans l'ordre ou elles
 * apparaissent. Le fascicule FX n'a pas de tests automatiques : la ligne
 * de verification y est remplacee par ce qu'il faut observer a l'ecran.
 */
function sectionsExercice(theme) {
  const verifier = theme === "FX"
    ? [TITRES.observer, "Ce que la fenêtre doit montrer et comment elle doit réagir. Les interfaces JavaFX ne sont pas testées automatiquement : c'est vous qui vérifiez, en manipulant."]
    : [TITRES.verification, "La classe de test à lancer et ce qu'elle contrôle. Tant qu'elle n'est pas entièrement verte, l'exercice n'est pas terminé."];
  return [
    [TITRES.objectif, "Ce que l'exercice vous fait pratiquer, en une ou deux phrases."],
    [TITRES.contexte, "Facultatif. La situation ou le rappel qui éclaire l'énoncé."],
    [TITRES.enonce, "Ce qu'il faut écrire. Un énoncé long est parfois découpé en deux parties."],
    [TITRES.specifications, "Les noms, les signatures et les comportements imposés. Les tests s'appuient dessus : respectez-les à la lettre."],
    [TITRES.fourni, "Les classes déjà écrites que vous trouverez dans le package de l'exercice."],
    [TITRES.exemples, "Des valeurs d'entrée et les résultats qu'elles doivent produire."],
    verifier,
    [TITRES.questions, "Des questions pour prendre du recul une fois l'exercice réussi. Il n'y a rien à rendre : ce sont elles qui fixent ce que vous avez appris."]
  ];
}

/** Le tableau des sections, pose dans l'encadre gris. */
function tableauSections(theme) {
  const w = [2500, 6380];
  const cellule = (contenu, largeur, o = {}) => new TableCell({
    width: { size: largeur, type: WidthType.DXA },
    shading: { type: ShadingType.CLEAR, fill: o.fill || "FFFFFF" },
    margins: { top: 50, bottom: 50, left: 100, right: 100 },
    children: [new Paragraph({
      spacing: { after: 0 },
      children: [new TextRun({ text: typo(contenu), bold: o.bold, size: 20 })]
    })]
  });
  return new Table({
    columnWidths: w, width: { size: w[0] + w[1], type: WidthType.DXA },
    rows: [
      new TableRow({ tableHeader: true, children: [
        cellule("Section", w[0], { bold: true, fill: "D9D9D9" }),
        cellule("Ce qu'elle vous apporte", w[1], { bold: true, fill: "D9D9D9" })
      ] }),
      ...sectionsExercice(theme).map(([titre, sens]) => new TableRow({
        cantSplit: true,
        children: [cellule(titre, w[0], { bold: true }), cellule(sens, w[1])]
      }))
    ]
  });
}

/**
 * L'introduction du fascicule, dans un encadre gris clair.
 *
 * Le gris dit au lecteur que ce bloc n'est pas un exercice mais la facon
 * de lire ceux qui suivent (demande du 16/10/2026). Le tableau des
 * exercices reste en dehors : c'est un sommaire, et il devra pouvoir etre
 * remplace par une table des matieres dans le recueil unique.
 */
function encadreIntroduction(theme) {
  const para = (l, o = {}) => new Paragraph({
    spacing: { before: o.before || 0, after: o.after === undefined ? 100 : o.after },
    keepNext: true, children: morceaux(l)
  });
  return new Table({
    columnWidths: [W], width: { size: W, type: WidthType.DXA },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 2, color: "BFBFBF" },
      bottom: { style: BorderStyle.SINGLE, size: 2, color: "BFBFBF" },
      left: { style: BorderStyle.SINGLE, size: 2, color: "BFBFBF" },
      right: { style: BorderStyle.SINGLE, size: 2, color: "BFBFBF" },
      insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE }
    },
    rows: [new TableRow({
      cantSplit: true,
      children: [new TableCell({
        width: { size: W, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: "F2F2F2" },
        margins: { top: 140, bottom: 140, left: 180, right: 180 },
        children: [
          para([
            "Les exercices de ce thème se trouvent tous dans ",
            { t: "be.ephec.java." + theme.toLowerCase(), code: true },
            ", chacun dans un sous-package."
          ]),
          para([
            { t: "Chaque exercice est autonome. ", b: true },
            "Son package contient tout ce dont il a besoin et n'importe jamais une classe d'un autre exercice. ",
            "Quand un exercice reprend une classe d'un exercice précédent, vous partez d'une copie : ",
            "vous pouvez donc en rater un sans être bloqué pour la suite."
          ]),
          para([
            { t: "Comment lancer les tests, comment lire un test vert, pourquoi laisser votre code compilable : ", b: true },
            "tout cela est commun à tous les thèmes et se trouve dans un document à part, ",
            { t: "Memento_Exercices.docx", code: true },
            ". Lisez-le une fois en début d'année."
          ]),
          para([{ t: "Comment se lit un exercice", b: true }], { before: 120, after: 60 }),
          para(["Chaque exercice suit la même structure. Toutes les sections ne figurent pas dans tous les exercices."]),
          tableauSections(theme),
          para([
            "D'autres titres apparaissent ponctuellement : un piège à connaître, une remarque, un rappel. ",
            "Ce sont des encarts propres à l'exercice, à lire avant de commencer."
          ], { before: 120, after: 0 })
        ]
      })]
    })]
  });
}

function modeEmploi(c, theme, lignes) {
  c.push(h1("Comment travailler ces exercices"));
  c.push(encadreIntroduction(theme));
  c.push(new Paragraph({ spacing: { after: 120 }, children: [] }));
  c.push(runs([
    "Les exercices du thème. Leurs codes sont ",
    { t: "cliquables", b: true },
    " : ils mènent directement à l'exercice."
  ], { keepNext: true }));
  // Le dernier argument demande des liens vers les exercices.
  c.push(tableau(["Exercice", "Package", "Sujet"], lignes, undefined, [1], true));
}

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


module.exports = {
  p, runs, bullet, bulletRuns, code, h1, h2, cell, tableau, typo,
  encadre, verif, saut, couverture, modeEmploi, doc, logo, TITRES,
  Packer, MONO, ACCENT, GREY, W, AlignmentType, Paragraph, TextRun, PageBreak
};
