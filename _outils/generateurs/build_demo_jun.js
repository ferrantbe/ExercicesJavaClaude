const fs = require("fs");
const B = require(__dirname + "/boite.js");
const {
  p, runs, bullet, code, h1, h2, tableau, encadre, saut, doc, Packer,
  GREY, AlignmentType, Paragraph, TextRun, PageBreak
} = B;

const ACCENT = "1F4E79";

// Un bloc « A dire », visuellement distinct du reste.
function aDire(texte) {
  return encadre([[{ t: "À dire — ", b: true }, texte]], "7B9E4B");
}

function couverture(c, module, titre, duree, quand) {
  c.push(new Paragraph({
    spacing: { before: 1000, after: 100 }, alignment: AlignmentType.CENTER,
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

function etape(c, numero, titre, duree) {
  c.push(new Paragraph({
    spacing: { before: 280, after: 120 }, keepNext: true,
    children: [
      new TextRun({ text: `Étape ${numero} · `, bold: true, size: 26, color: "7B9E4B" }),
      new TextRun({ text: titre, bold: true, size: 26, color: ACCENT }),
      new TextRun({ text: `   ${duree}`, size: 20, color: GREY })
    ]
  }));
}

// =====================================================================
//  POO
// =====================================================================

const jun = [];
couverture(jun, "JUN", "Rouge, vert, puis nettoyer", "15 minutes", "avant JUN.1");
jun.push(p("C'est la démonstration qu'on ne peut pas remplacer par des slides : le cycle du développement piloté par les tests ne se comprend qu'en le voyant, avec la barre qui passe du rouge au vert."));

etape(jun, 1, "Écrire le test d'abord", "3 min");
jun.push(runs([
  "Package vide. Créer ",
  { t: "RomainTest", code: true },
  " dans ",
  { t: "src/test", code: true },
  ", et écrire :"
]));
jun.push(...code([
  "@Test",
  "void unVaut1() {",
  "    assertEquals(1, Romain.enChiffres(\"I\"));",
  "}"
]));
jun.push(runs([
  "La classe ",
  { t: "Romain", code: true },
  " n'existe pas : tout est rouge dans l'éditeur. ",
  { t: "Alt+Entrée", code: true },
  ", « Create class Romain ». Puis « Create method »."
]));
jun.push(aDire("le test vient d'écrire la signature à ma place. Il ne vérifie rien encore, il DÉCRIT ce que je veux."));

etape(jun, 2, "Le voir échouer", "2 min");
jun.push(p("Lancer. Rouge."));
jun.push(aDire("c'est une étape, pas un accident. Un test qu'on n'a jamais vu échouer ne prouve rien : il pourrait être vert par erreur."));

etape(jun, 3, "La plus petite chose qui passe", "2 min");
jun.push(runs(["Écrire ", { t: "return 1;", code: true }, ". Lancer. Vert."]));
jun.push(runs([{ t: "Les étudiants protestent. Les laisser protester.", b: true }]));
jun.push(aDire("vous avez raison, c'est ridicule. Mais mon test ne demande rien de plus. Si je veux mieux, j'écris un meilleur test."));

etape(jun, 4, "Un deuxième test force le vrai code", "4 min");
jun.push(...code([
  "assertEquals(5, Romain.enChiffres(\"V\"));    rouge",
  "    -> ecrire la table de correspondance      vert",
  "",
  "assertEquals(2, Romain.enChiffres(\"II\"));   rouge",
  "    -> ajouter la boucle                      vert"
]));
jun.push(aDire("à chaque tour, le test tire le code d'un cran. Je n'ai jamais écrit de code que rien ne demandait."));

etape(jun, 5, "Le cas qui fait tout basculer", "3 min");
jun.push(runs([
  "Ajouter ",
  { t: "assertEquals(4, Romain.enChiffres(\"IV\"));", code: true },
  " : rouge, la somme naïve donne 6."
]));
jun.push(p("Laisser chercher. Puis montrer la règle soustractive."));
jun.push(aDire("ce cas-là, je ne l'aurais pas vu en écrivant le code d'abord. C'est en cherchant quoi tester que je l'ai trouvé."));

etape(jun, 6, "Nettoyer sans crainte", "1 min");
jun.push(p("Renommer une variable, extraire une méthode, reformater. Relancer après chaque geste : vert, vert, vert."));
jun.push(aDire("voilà ce que les tests achètent vraiment. Pas la preuve que le code marche : le droit de le modifier sans trembler."));

jun.push(h2("Ce qu'il faut rater exprès"));
jun.push(encadre([
  [{ t: "À l'étape 2", b: true }, " — écrire un test sans assertion :"],
  [{ t: "@Test  void cinqVaut5() { Romain.enChiffres(\"V\"); }", code: true }],
  ["Le lancer : vert, immédiatement, alors que rien n'est écrit."],
  [{ t: "À dire — ", b: true },
   "ce test ne vérifie rien et ne le dira jamais. C'est le défaut le plus fréquent dans les classes de test rendues à l'examen. Voir CC-TST.2."]
], "9C2B2B"));

jun.push(h2("Renvois"));
jun.push(tableau(["Code", "Ce qu'il dit"], [
  ["CC-TST.1", "un test doit être lisible avant d'être malin"],
  ["CC-TST.2", "une assertion par test, et au moins une"],
  ["IDE.17", "lancer les tests et lire le rapport"]
], [1600, 7760], [0]));

jun.push(h2("Où se trouve l'état final"));
jun.push(runs([
  "La classe ",
  { t: "Romain", code: true },
  " est dans ",
  { t: "demos/src/main/java/…/demo/jun/", code: true },
  ", et sa classe de test dans ",
  { t: "demos/src/test/java/…/demo/jun/", code: true },
  ". Les deux sont publiées avec les corrigés de la séance."
]));
jun.push(p("L'ordre des méthodes de RomainTest raconte l'ordre dans lequel le code est né : chacune était rouge avant que la ligne correspondante ne soit écrite."));

jun.push(h2("Pour rejouer"));
jun.push(runs([
  "Repartir d'un package vide : l'intérêt est dans le chemin. ",
  { t: "_demos/sources_initiales/jun/", code: true },
  " contient l'état de l'étape 3 — le ",
  { t: "return 1;", code: true },
  " — parce qu'aucun état antérieur ne compile, ce qui est précisément le sujet des deux premières étapes."
]));

// ---------------------------------------------------------------------

// ---------------------------------------------------------------------
Packer.toBuffer(doc(jun, "Démo JUN")).then(b => {
  fs.writeFileSync(`${__dirname}/../../_demos/Demo_JUN.docx`, b);
  console.log("Demo_JUN.docx :", Math.round(b.length / 1024), "Ko");
});
