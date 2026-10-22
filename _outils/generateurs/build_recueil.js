// build_recueil.js — le debut du recueil de tous les exercices.
//
// Demande de Frederic du 19/10/2026 : un fascicule unique, avec une table
// des matieres qui reprend au moins les modules et chaque exercice.
//
// Ce script ne produit que le debut du recueil : page de garde, table des
// matieres, et la presentation commune « Comment travailler ces
// exercices » (le memento Exercices, insere par construire_recueil.py). Les quinze fascicules sont ensuite ajoutes a la suite par
//     python3 _outils/construire_recueil.py
// qui appelle ce script lui-meme.

const fs = require("fs");
const { TableOfContents, Paragraph, TextRun } = require("docx");
const B = require(__dirname + "/boite.js");
const { h1, p, runs, saut, doc, Packer } = B;

const sortie = process.argv[2] || __dirname + "/recueil_debut.docx";
const c = [];
B.pageDeGarde(c, {
  titre: "Recueil des exercices",
  accroche: "Tous les modules du cours, dans l'ordre des séances",
  mentionIA: true
});

// Le titre de la table n'est pas un titre de niveau 1 : sinon, il
// figurerait dans la table elle-meme.
c.push(new Paragraph({ spacing: { before: 360, after: 200 },
  children: [new TextRun({ text: "Table des matières", bold: true, size: 30, color: "1F4E79" })] }));
c.push(new TableOfContents("Table des matières", { hyperlink: true, headingStyleRange: "1-2" }));
c.push(saut());

// La presentation commune est le memento Exercices complet (22/10/2026) :
// construire_recueil.py insere son contenu a la place de MEMENTO_ICI, pour
// qu'un seul texte soit a tenir a jour.
c.push(h1("Comment travailler ces exercices"));
c.push(new Paragraph({ children: [new TextRun("MEMENTO_ICI")] }));
c.push(runs([
  "Chaque module s'ouvre sur le tableau de ses exercices. Leurs codes sont ",
  { t: "cliquables", b: true },
  " : ils mènent directement à l'exercice, comme les lignes de la table des matières."
]));

Packer.toBuffer(doc(c, "Recueil des exercices", { majChamps: true })).then(b => {
  fs.writeFileSync(sortie, b);
  console.log("debut du recueil :", Math.round(b.length / 1024), "Ko");
});
