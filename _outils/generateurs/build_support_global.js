// build_support_global.js — le support de cours complet, tous les modules
// dans l'ordre des seances (22/10/2026).
//
//   node build_support_global.js chemin/sortie.docx
//
// Une section par module : elle commence sur une page de droite, par la
// page de titre du module, et son pied de page nomme le module en cours.
// Au debut, la page de garde et la table des matieres ; a la fin, l'index.
// La table des matieres et l'index sont de vrais champs Word, remplis a
// l'ouverture (Word demande de mettre a jour les champs) ; les marques
// d'index sont posees ensuite par indexer.py. L'assemblage complet (style,
// marges, index, N/B) est fait par construire_support_global.py.

const fs = require("fs");
const path = require("path");
const {
  Document, Paragraph, TextRun, AlignmentType, Footer, PageNumber, SectionType,
  TableOfContents, StyleLevel, LevelFormat, convertInchesToTwip, TabStopType, PageBreak
} = require("docx");
const B = require(__dirname + "/boite.js");
const { construire } = require(__dirname + "/build_support.js");

// --introduction (23/10/2026) : le seul module INI, suivi des annexes ; le
// document d'accueil du cours, sur Moodle
const INTRODUCTION = process.argv.includes("--introduction");
const ORDRE = INTRODUCTION ? ["INI"] : ["INI", "POO", "TMP", "TAB", "ENU", "ABS", "ITF", "PKG", "COL",
               "EXC", "JUN", "GEN", "LAM", "FX", "FIC", "REC"];
const sortie = process.argv[2];
// recto seul par defaut (la Presse, 22/10/2026) : chaque module commence
// sur la page suivante ; --recto-verso : sur une page de droite
const RECTO_VERSO = process.argv.includes("--recto-verso");
const DEBUT_MODULE = RECTO_VERSO ? SectionType.ODD_PAGE : SectionType.NEXT_PAGE;
const LARGEUR = RECTO_VERSO ? 9694 : 9354;   // largeur du texte, marges de reliure
const etat = { numeros: {}, notes: {}, compte: 0 };

// le pied de page d'une section : le module a gauche, le numero a droite
function pied(texte) {
  return new Footer({ children: [new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: LARGEUR }],
    children: [
      new TextRun({ text: texte, size: 18, color: "808080" }),
      new TextRun({ children: ["\t", PageNumber.CURRENT], size: 18 })
    ]
  })] });
}
const vide = new Footer({ children: [new Paragraph({ children: [] })] });

// le titre d'un module, en haut de sa premiere page : son nom, son sujet,
// son accroche ; le texte du module suit sur la meme page (22/10/2026)
function titreDeModule(meta) {
  return [
    new Paragraph({ spacing: { before: 1700, after: 120 }, alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Module " + meta.module, size: 36, color: "808080" })] }),
    new Paragraph({ style: "TitreModule", alignment: AlignmentType.CENTER, spacing: { after: 360 },
      children: [new TextRun({ text: `${meta.module} — ${meta.titre}`, size: 56, bold: true, color: "1F4E79" })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 1200 },
      children: [new TextRun({ text: meta.accroche, italics: true, size: 26 })] })
  ];
}

const sections = [];

// 1. page de garde et table des matieres
const debut = [];
B.pageDeGarde(debut, {
  surtitre: "Programmation orientée objet — Java",
  titre: INTRODUCTION ? "Introduction et annexes" : "Support de cours",
  sousTitre: INTRODUCTION ? "Le module d'introduction, le guide IntelliJ et les mémentos"
                          : "Tous les modules, dans l'ordre des séances",
  accroche: INTRODUCTION ? "À lire avant le premier module" : "Du module INI au module REC", mentionIA: true
});
// le titre de la table n'a pas le style des modules : il n'y figurerait pas
debut.push(new Paragraph({ spacing: { after: 360 },
  children: [new TextRun({ text: "Table des matières", size: 56, bold: true, color: "1F4E79" })] }));
// Word ne reconnait sans faute que ses styles de titre integres : la table
// des matieres prend les niveaux 1 et 2, et construire_support_global.py
// decale les titres (module en Titre 1, section en Titre 2, sous-section en
// Titre 3) avant de poser l'index (22/10/2026).
debut.push(new TableOfContents("Table des matières", { hyperlink: true, headingStyleRange: "1-2" }));
sections.push({ properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
                footers: { default: vide }, children: debut });

// 2. un module par section, sur une page de droite
for (const code of ORDRE) {
  const { c, meta } = construire(code, etat, { garde: false, sautPremiereSection: true });
  sections.push({
    properties: { type: DEBUT_MODULE,
                  page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    footers: { default: pied(`Support de cours · Module ${meta.module} — ${meta.titre}`) },
    children: [...titreDeModule(meta), ...c]
  });
}

// 3. les annexes : les documents de reference, une section chacune. Leur
// contenu est insere par construire_support_global.py a la place du
// paragraphe ANNEXE_X_ICI (22/10/2026). Le memento Exercices va au recueil.
const ANNEXES = [["A", "Guide IntelliJ IDEA", "Installer, ouvrir, écrire, exécuter, dépanner"],
                 ["B", "Mémento technique", "Ce qu'IntelliJ fait à votre place"],
                 ["C", "Mémento Clean Code", "Des règles simples pour écrire du code lisible"]];
for (const [lettre, titre, accroche] of ANNEXES) {
  sections.push({
    properties: { type: DEBUT_MODULE, page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    footers: { default: pied(`Support de cours · Annexe ${lettre} — ${titre}`) },
    children: [
      ...titreDeModule({ module: lettre, titre, accroche }).map((p, k) => k === 0
        ? new Paragraph({ spacing: { before: 1700, after: 120 }, alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: "Annexe " + lettre, size: 36, color: "808080" })] })
        : k === 1
        ? new Paragraph({ style: "TitreModule", alignment: AlignmentType.CENTER, spacing: { after: 360 },
            children: [new TextRun({ text: `Annexe ${lettre} — ${titre}`, size: 56, bold: true, color: "1F4E79" })] })
        : p),
      new Paragraph({ children: [new TextRun(`ANNEXE_${lettre}_ICI`)] })
    ]
  });
}

// 4. l'index, sur une page de droite ; le champ est pose par indexer.py
sections.push({
  properties: { type: DEBUT_MODULE, page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
  footers: { default: pied("Support de cours · Index") },
  children: [
    new Paragraph({ style: "TitreModule", spacing: { after: 360 },
      children: [new TextRun({ text: "Index", size: 56, bold: true, color: "1F4E79" })] }),
    new Paragraph({ children: [new TextRun("INDEX_ICI")] })
  ]
});

const document = new Document({
  creator: "Frédéric Ferrant — EPHEC", title: "Support de cours - Programmation orientée objet - Java",
  features: { updateFields: true },
  footnotes: etat.notes,
  // Les styles que Word applique aux lignes de l'index : texte en 10 pt
  // (demande du 22/10/2026), lettres de groupe un peu plus grandes.
  styles: { paragraphStyles: [{
    id: "TitreModule", name: "Titre de module", basedOn: "Normal", next: "Normal",
    run: { size: 56, bold: true, color: "1F4E79" }, paragraph: { spacing: { after: 240 } }
  }, {
    id: "Index1", name: "index 1", basedOn: "Normal", next: "Normal",
    run: { size: 20 }, paragraph: { spacing: { after: 0 }, indent: { left: 200, hanging: 200 } }
  }, {
    id: "Index2", name: "index 2", basedOn: "Normal", next: "Normal",
    run: { size: 20 }, paragraph: { spacing: { after: 0 }, indent: { left: 400, hanging: 200 } }
  }, {
    id: "IndexHeading", name: "index heading", basedOn: "Normal", next: "Index1",
    run: { size: 24, bold: true, color: "1F4E79" }, paragraph: { spacing: { before: 200, after: 60 } }
  }] },
  numbering: { config: [{ reference: "puces", levels: [{
    level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
    style: { paragraph: { indent: { left: convertInchesToTwip(0.3), hanging: convertInchesToTwip(0.18) } } }
  }] }] },
  sections
});

B.Packer.toBuffer(document).then(b => {
  fs.writeFileSync(sortie, b);
  console.log("Support global :", Math.round(b.length / 1024), "Ko,", ORDRE.length, "modules,", etat.compte, "notes");
});
