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

const enu = [];
couverture(enu, "ENU", "Le cycle sans conditions", "10 minutes", "avant ENU.1");

etape(enu, 1, "Trois modes, trois conditions", "2 min");
enu.push(runs([
  "Lancer l'état de départ : un lecteur de musique dont le bouton enchaîne ",
  { t: "NORMAL", code: true }, ", ", { t: "ALEATOIRE", code: true }, ", ",
  { t: "REPETITION", code: true }, ". Ça marche."
]));
enu.push(runs(["Montrer les trois ", { t: "if", code: true }, " de ",
               { t: "modeSuivant()", code: true }, "."]));

etape(enu, 2, "Ajouter un mode", "2 min");
enu.push(runs([
  "Ajouter ", { t: "REPETITION_UNE", code: true },
  " à l'enum. Relancer : le lecteur ne l'atteint jamais, et reste bloqué sur trois modes."
]));
enu.push(aDire("le compilateur n'a rien dit. On a ajouté une valeur et cassé le comportement, en silence."));

etape(enu, 3, "L'ordre EST le cycle", "4 min");
enu.push(runs([
  "Montrer ", { t: "Mode.values()", code: true }, " dans le débogueur, puis ",
  { t: "ordinal()", code: true }, ". Réécrire la méthode en deux lignes :"
]));
enu.push(...code([
  "Mode[] cycle = Mode.values();",
  "mode = cycle[(mode.ordinal() + 1) % cycle.length];"
]));
enu.push(p("Relancer : les quatre modes défilent."));
enu.push(aDire("il n'y a plus une seule condition. L'ordre de déclaration porte l'information, et le code se contente de le suivre."));

etape(enu, 4, "L'épreuve", "2 min");
enu.push(p("Ajouter un cinquième mode. Relancer. Rien n'a été touché dans le lecteur, et tout suit."));
enu.push(aDire("c'est le test d'une bonne conception : ce qui change souvent doit se changer à un seul endroit."));

fin(enu, "ENU",
  [[{ t: "À l'étape 3", b: true }, " — oublier les parenthèses : ",
    { t: "mode.ordinal() + 1 % cycle.length", code: true }],
   ["Ça compile, et le lecteur ne bouge plus du premier mode : la priorité du modulo l'emporte sur l'addition."],
   [{ t: "À dire — ", b: true },
    "aucune erreur, aucun avertissement, un comportement faux. Ce sont les pires. Un test l'aurait attrapé tout de suite."]],
  [["CC-MET.2", "des méthodes courtes"],
   ["CC-CLS.4", "une conception qui absorbe le changement"]],
  "L'état d'arrivée contient quatre modes et la version sans condition.");

// =====================================================================

// ---------------------------------------------------------------------
Packer.toBuffer(doc(enu, "Démo ENU")).then(b => {
  fs.writeFileSync(`${__dirname}/../../_demos/Demo_ENU.docx`, b);
  console.log("Demo_ENU.docx :", Math.round(b.length / 1024), "Ko");
});
