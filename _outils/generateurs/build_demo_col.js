const fs = require("fs");
const B = require(__dirname + "/boite.js");
const {
  p, runs, code, h2, tableau, encadre, saut, doc, Packer,
  GREY, AlignmentType, Paragraph, TextRun
} = B;

const ACCENT = "1F4E79";
const aDire = (t) => encadre([[{ t: "À dire — ", b: true }, t]], "7B9E4B");

function couverture(c, module, titre, duree, quand) {
  // Page de garde commune (modele ABS, 17/10/2026), avec le tableau des
  // demonstrations sous le titre.
  const B = require(__dirname + "/boite.js");
  B.pageDeGarde(c, {
    surtitre: "Démonstration du cours",
    titre: module,
    sousTitre: titre,
    entre: [
      new Paragraph({ spacing: { before: 400 }, children: [] }),
      tableau(["Durée", "Quand la jouer", "Code final"], [
        [duree, quand, `demos/…/demo/${module.toLowerCase()}/`]
      ], [2000, 4400, 2960], []),
      B.ligneGarde("Document destiné au professeur — ne pas distribuer", 28,
                   { italique: true, avant: 300 })
    ],
    espaceBas: 4000
  });
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

const col = [];
couverture(col, "COL", "Choisir une collection en se trompant d'abord",
           "12 minutes", "avant COL.1");

etape(col, 1, "Une liste, parce que c'est le réflexe", "2 min");
col.push(p("Lancer l'état de départ : une liste d'invités. Turing y est deux fois, et l'ordre est celui des insertions."));
col.push(aDire("quatre invités pour trois personnes. Qui corrige ça, et où ?"));

etape(col, 2, "La mauvaise réponse", "3 min");
col.push(runs([
  "Laisser proposer un ", { t: "if (!invites.contains(nom))", code: true }, " dans ",
  { t: "inviter", code: true }, ". L'écrire. Ça marche."
]));
col.push(aDire("ça marche, et pourtant c'est fragile. La règle vit dans une méthode ; le jour où quelqu'un ajoute une seconde façon d'inviter, il faudra y penser à nouveau."));

etape(col, 3, "La bonne réponse tient en un mot", "3 min");
col.push(runs([
  "Supprimer le test. Remplacer ", { t: "ArrayList", code: true }, " par ",
  { t: "HashSet", code: true }, ", et ", { t: "List", code: true }, " par ",
  { t: "Set", code: true }, ". Relancer : trois invités."
]));
col.push(aDire("la règle n'est plus dans le code, elle est dans la structure. Personne ne peut plus l'oublier, parce qu'il n'y a plus rien à ne pas oublier."));

etape(col, 4, "Le deuxième problème, même remède", "3 min");
col.push(runs([
  "Faire remarquer l'ordre, imprévisible. Laisser proposer un tri à l'affichage. Puis remplacer ",
  { t: "HashSet", code: true }, " par ", { t: "TreeSet", code: true },
  " : un mot, et l'ordre est permanent."
]));
col.push(aDire("il n'y a plus un seul instant où la liste ne soit pas triée. Trier à l'affichage laisse toujours une fenêtre où elle ne l'est pas."));

etape(col, 5, "Récapituler", "1 min");
col.push(tableau(["Ce qu'on veut", "Ce qu'on choisit"], [
  ["un ordre, des doublons permis", "List"],
  ["aucun doublon", "Set"],
  ["aucun doublon, et trié en permanence", "TreeSet"],
  ["une valeur par clé", "Map"]
], [4400, 4960], []));
col.push(aDire("on ne choisit pas une collection par habitude, on la choisit sur la promesse qu'elle tient."));

fin(col, "COL",
  [[{ t: "À l'étape 3", b: true }, " — ne changer que le ", { t: "new", code: true },
    " et laisser la déclaration en ", { t: "List", code: true }, "."],
   ["Le compilateur refuse : un HashSet n'est pas une List. Profiter du message."],
   [{ t: "À dire — ", b: true },
    "le type de la variable est une promesse faite au reste du programme. La changer, c'est changer cette promesse, et le compilateur vérifie que tout le monde suit."]],
  [["CC-OBJ.2", "un objet expose des comportements, pas ses données"],
   ["CC-CLS.4", "confier une règle à la structure plutôt qu'à la vigilance"]],
  "L'état d'arrivée utilise un TreeSet et retourne une vue non modifiable.");

// =====================================================================

// ---------------------------------------------------------------------
Packer.toBuffer(doc(col, "Démo COL")).then(b => {
  fs.writeFileSync(`${__dirname}/../../_demos/Demo_COL.docx`, b);
  console.log("Demo_COL.docx :", Math.round(b.length / 1024), "Ko");
});
