const fs = require("fs");
const B = require(__dirname + "/boite.js");
const {
  p, runs, code, h2, tableau, encadre, saut, doc, Packer,
  GREY, AlignmentType, Paragraph, TextRun
} = B;

const ACCENT = "1F4E79";
const aDire = (t) => encadre([[{ t: "À dire — ", b: true }, t]], "7B9E4B");

function couverture(c, module, titre, duree, quand) {
  // Logo de l'EPHEC en haut a gauche (16/10/2026), comme a l'examen.
  c.push(require(__dirname + "/boite.js").logo());
  c.push(new Paragraph({
    spacing: { before: 500, after: 100 }, alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "Démonstration du cours", size: 24, color: GREY })]
  }));
  c.push(new Paragraph({
    spacing: { after: 100 }, alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: module, bold: true, size: 52, color: ACCENT })]
  }));
  c.push(new Paragraph({
    spacing: { after: 300 }, alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: titre, bold: true, size: 30, color: ACCENT })]
  }));
  c.push(tableau(["Durée", "Quand la jouer", "Code final"], [
    [duree, quand, `demos/…/demo/${module.toLowerCase()}/`]
  ], [2000, 4400, 2960], []));
  c.push(p(""));
  c.push(p("Document destiné au professeur — ne pas distribuer",
           { align: AlignmentType.CENTER, italic: true, color: GREY }));
  c.push(saut());
}

function etape(c, n, titre, duree) {
  c.push(new Paragraph({
    spacing: { before: 280, after: 120 }, keepNext: true,
    children: [
      new TextRun({ text: `Étape ${n} · `, bold: true, size: 26, color: "7B9E4B" }),
      new TextRun({ text: titre, bold: true, size: 26, color: ACCENT }),
      new TextRun({ text: `   ${duree}`, size: 20, color: GREY })
    ]
  }));
}

function fin(c, module, rate, renvois, rejouer) {
  c.push(h2("Ce qu'il faut rater exprès"));
  c.push(encadre(rate, "9C2B2B"));
  c.push(h2("Renvois"));
  c.push(tableau(["Code", "Ce qu'il dit"], renvois, [1700, 7660], [0]));
  c.push(h2("Pour rejouer"));
  c.push(runs([
    "Charger l'état de départ : ",
    { t: `python3 _outils/preparer_demo.py ${module.toLowerCase()}`, code: true },
    ". ",
    rejouer
  ]));
}

// =====================================================================

const gen = [];
couverture(gen, "GEN", "L'erreur qui change de camp", "12 minutes", "avant GEN.1");
gen.push(p("La généricité ne rend rien possible qui ne l'était pas. Elle déplace le moment où l'erreur apparaît — et ce déplacement vaut une soirée de débogage."));

etape(gen, 1, "Une pile qui accepte tout", "3 min");
gen.push(runs([
  "Lancer l'état de départ : une ", { t: "Pile", code: true }, " d'", { t: "Object", code: true },
  ". On y empile 10, 20, puis « trente ». Ça compile sans le moindre avertissement."
]));
gen.push(p("Puis lancer. ClassCastException."));
gen.push(aDire("où est l'erreur ? Pas là où ça plante. Le programme s'arrête sur la ligne qui dépile, alors que la faute a été commise trois lignes plus haut."));

etape(gen, 2, "Chercher la faute dans la trace", "2 min");
gen.push(p("Lire la trace ensemble. Elle désigne le transtypage, pas l'empilement."));
gen.push(aDire("dans un vrai programme, ces trois lignes seraient dans trois classes différentes, écrites par trois personnes, à trois mois d'intervalle."));

etape(gen, 3, "Un caractère de plus", "4 min");
gen.push(runs([
  "Ajouter ", { t: "<T>", code: true }, " à la classe, remplacer les ",
  { t: "Object", code: true }, " des signatures par ", { t: "T", code: true },
  ". Déclarer ", { t: "Pile<Integer>", code: true }, " dans le ", { t: "main", code: true }, "."
]));
gen.push(p("La ligne qui empile « trente » devient rouge dans l'éditeur, avant tout lancement."));
gen.push(aDire("la même faute, refusée avant que le programme ne démarre. Voilà tout ce que la généricité apporte, et c'est énorme."));

etape(gen, 4, "Le transtypage disparaît", "2 min");
gen.push(runs([
  "Supprimer le ", { t: "(Integer)", code: true }, " du ", { t: "main", code: true },
  ". Il n'est plus nécessaire : ", { t: "depiler()", code: true }, " rend un ",
  { t: "Integer", code: true }, "."
]));
gen.push(p("Montrer qu'il reste UN transtypage, dans la classe. Il n'a pas disparu, il a été rangé au seul endroit où il soit sûr."));

etape(gen, 5, "La même classe, un autre type", "1 min");
gen.push(runs(["Créer une ", { t: "Pile<String>", code: true }, " juste à côté. Aucune ligne de plus."]));

fin(gen, "GEN",
  [[{ t: "À l'étape 3", b: true }, " — oublier de paramétrer la déclaration : écrire ",
    { t: "Pile pile = new Pile<>();", code: true }],
   ["Ça compile, avec un avertissement jaune : « raw use of parameterized class »."],
   [{ t: "À dire — ", b: true },
    "on vient de renoncer à tout ce qu'on a gagné. Le type brut existe pour la compatibilité avec le code d'avant 2004, et c'est la seule raison."]],
  [["CC-NOM.1", "un nom répond à la question qu'on se pose en le lisant"],
   ["IDE.15", "lire les avertissements et leurs corrections"]],
  "L'état d'arrivée est la version générique, avec la ligne fautive laissée en commentaire.");

// =====================================================================

// ---------------------------------------------------------------------
Packer.toBuffer(doc(gen, "Démo GEN")).then(b => {
  fs.writeFileSync(`${__dirname}/../../_demos/Demo_GEN.docx`, b);
  console.log("Demo_GEN.docx :", Math.round(b.length / 1024), "Ko");
});
