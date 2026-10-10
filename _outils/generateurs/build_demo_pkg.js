const fs = require("fs");
const B = require(__dirname + "/boite.js");
const {
  p, runs, code, h2, tableau, encadre, saut, doc, Packer,
  GREY, AlignmentType, Paragraph, TextRun
} = B;

const ACCENT = "1F4E79";
const aDire = (t) => encadre([[{ t: "À dire — ", b: true }, t]], "7B9E4B");

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
//  PKG
// =====================================================================

const pkg = [];
couverture(pkg, "PKG", "Déménager une classe, et voir ce qui casse",
  "20 à 25 minutes", "Séance 5, avant les exercices PKG");

pkg.push(h2("L'idée"));
pkg.push(p("Un distributeur de boissons tient dans un seul package et fonctionne très bien. On le découpe en trois packages avec l'outil de refactoring, et la compilation se brise. Ce sont les erreurs qui enseignent : chacune désigne un endroit où le code s'appuyait sur une proximité qui vient de disparaître."));
pkg.push(runs([
  { t: "Le point à faire passer. ", b: true },
  "La visibilité « de package » — celle qu'on obtient en n'écrivant aucun modificateur — est un choix par défaut que personne ne fait consciemment. Elle tient tant que tout est au même endroit, et cède au premier déménagement."
]));

etape(pkg, 1, "Le code qui marche", "3 min");
pkg.push(p("Ouvrir les quatre classes. Lancer. Le café est servi, le thé est inconnu, l'eau manque de vingt centimes, la caisse affiche 0,80."));
pkg.push(runs([
  "Montrer la ligne du ",
  { t: "Demo", code: true },
  " qui va poser problème :"
]));
pkg.push(...code(["distributeur.stock.ajouter(new Boisson(\"Eau\", 1.20));"]));
pkg.push(aDire("On atteint le stock du distributeur, et on lui parle directement. Personne ne nous en empêche. Est-ce que ça vous paraît normal ?"));
pkg.push(p("Montrer aussi qu'aucun champ n'a de modificateur, dans les quatre classes. Poser la question : quelle est leur visibilité ? La réponse — « celle du package » — n'est presque jamais un choix délibéré."));

etape(pkg, 2, "Le déménagement", "5 min");
pkg.push(p("Créer deux packages sous le package de travail : produit et machine. Puis, en direct :"));
pkg.push(tableau(["Classe", "Vers"], [
  ["Boisson", "produit"],
  ["Stock", "produit"],
  ["Distributeur", "machine"],
  ["Demo", "elle ne bouge pas"]
], [3000, 6360], [0]));
pkg.push(runs([
  { t: "Le faire avec l'outil : ", b: true },
  "clic droit sur la classe, ",
  { t: "Refactor > Move Class", code: true },
  ", ou ",
  { t: "F6", code: true },
  ". Pas de glisser-déposer, pas de couper-coller — le guide IntelliJ détaille la manœuvre."
]));
pkg.push(aDire("Regardez ce qu'IntelliJ vient de faire tout seul : il a changé la ligne package en haut du fichier, et il a ajouté les imports partout où il fallait. C'est exactement ce qu'on ferait à la main, en oubliant un endroit sur trois."));

etape(pkg, 3, "Les erreurs, une par une", "8 min");
pkg.push(p("La compilation est maintenant cassée. Ouvrir la liste des erreurs et les traiter dans l'ordre, en lisant chaque message à voix haute avant de corriger."));
pkg.push(tableau(["Ce qui casse", "Pourquoi", "Ce qu'on en fait"], [
  ["Boisson n'est plus visible", "la classe elle-même n'était pas publique", "la rendre publique"],
  ["son constructeur non plus", "même raison", "le rendre public"],
  ["boisson.nom, boisson.prix", "champs sans modificateur, autre package", "les passer en privé, ajouter deux accesseurs"],
  ["stock.ajouter(...) depuis Demo", "méthode sans modificateur", "voir l'étape 4"]
], [2600, 3200, 3560], [0]));
pkg.push(runs([
  { t: "Sur le troisième point, ne pas prendre le raccourci. ", b: true },
  "Le réflexe est de rendre les champs publics : deux clics, et ça compile. Faire remarquer que c'est un engagement définitif — un champ public ne peut plus changer de type ni disparaître — alors qu'un accesseur peut être réécrit sans que personne le sache."
]));
pkg.push(aDire("On vient de transformer une contrainte technique en décision de conception. C'est toujours comme ça que ça se passe : le compilateur pose la question, et c'est vous qui répondez."));

etape(pkg, 4, "La ligne qu'on ne peut plus écrire", "5 min");
pkg.push(runs([
  "Revenir au ",
  { t: "Demo", code: true },
  ". La ligne de l'étape 1 ne compile plus, et il n'y a pas de bonne façon de la faire compiler."
]));
pkg.push(p("Laisser un silence, puis proposer la vraie solution : ce n'est pas au programme d'atteindre le stock, c'est au distributeur de s'approvisionner."));
pkg.push(...code([
  "// avant",
  "distributeur.stock.ajouter(new Boisson(\"Eau\", 1.20));",
  "",
  "// apres",
  "distributeur.approvisionner(new Boisson(\"Eau\", 1.20));"
]));
pkg.push(aDire("Le découpage en packages vient de nous forcer à écrire une meilleure API. On ne l'aurait jamais fait spontanément : tant que tout était au même endroit, rien ne nous dérangeait."));

etape(pkg, 5, "Ce que les imports racontent", "3 min");
pkg.push(runs([
  "Ouvrir ",
  { t: "Distributeur", code: true },
  " et montrer les deux imports en haut."
]));
pkg.push(aDire("Cette liste, c'est la liste des choses dont cette classe dépend. Au début de la démonstration, elle était vide — pas parce qu'il n'y avait pas de dépendances, mais parce qu'on ne les voyait pas."));
pkg.push(p("Conclure sur le lien avec la suite : protected n'a pas servi ici, parce qu'il ne sert à rien sans héritage. Il faudra y revenir après les classes abstraites."));

fin(pkg, "PKG", [
  [{ t: "Le déplacement à la main. ", b: true }, "À l'étape 2, faire exprès de déplacer un fichier en le glissant dans l'arborescence plutôt qu'avec F6. IntelliJ demande alors s'il faut refactoriser — répondre non, et constater que la ligne package est restée fausse. Annuler, et recommencer avec F6."],
  [{ t: "Le réflexe « tout en public ». ", b: true }, "À l'étape 3, corriger d'abord un champ en le passant public, sans commentaire. Puis revenir dessus deux minutes plus tard : « au fait, qu'est-ce qu'on vient de promettre en faisant ça ? »"],
  [{ t: "protected, pour rien. ", b: true }, "Si un étudiant propose protected pour les champs de Boisson, l'essayer. Ça ne compile toujours pas, et le message le dit."]
], [
  ["CC-CLS.1", "une classe fait une chose ; un package aussi"],
  ["CC-OBJ.1", "exposer des méthodes, pas des champs"],
  ["CC-NOM.6", "la longueur du nom suit la portée ; un package est une portée"],
  ["PKG.5", "l'exercice qui reprend protected, une fois l'héritage connu"]
], runs([
  "Le code final est dans ",
  { t: "demos/…/demo/pkg/", code: true },
  ", déjà découpé."
]));

// =====================================================================
//  TAB
// =====================================================================

// ---------------------------------------------------------------------
Packer.toBuffer(doc(pkg, "Démonstration PKG")).then(b => {
  fs.writeFileSync(`${__dirname}/../../_demos/Demo_PKG.docx`, b);
  console.log("Demo_PKG.docx :", Math.round(b.length / 1024), "Ko");
});
