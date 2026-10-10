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

const lam = [];
couverture(lam, "LAM", "Ce qu'une lambda peut remplacer, et ce qu'elle ne peut pas",
           "12 minutes", "avant LAM.1");
lam.push(p("Deux classes anonymes côte à côte, qui se ressemblent comme deux gouttes d'eau. L'une deviendra une lambda, l'autre jamais — et toute la démonstration tient à comprendre pourquoi."));

etape(lam, 1, "Lire les deux, les comparer", "3 min");
lam.push(runs([
  "Lancer l'état de départ. Une ", { t: "ClasseAbstraite", code: true },
  " et une ", { t: "MonInterface", code: true },
  ", toutes deux instanciées par une classe anonyme de six lignes."
]));
lam.push(aDire("qu'est-ce qu'une classe anonyme ? Une classe qu'on écrit à l'endroit où on s'en sert, parce qu'elle ne servira qu'une fois et ne mérite pas un nom."));

etape(lam, 2, "Laisser IntelliJ décider", "3 min");
lam.push(runs([
  "Placer le curseur sur le ", { t: "new MonInterface()", code: true }, ", faire ",
  { t: "Alt+Entrée", code: true }, ". IntelliJ propose « Replace with lambda ». Accepter."
]));
lam.push(p("Six lignes deviennent une."));
lam.push(runs([
  "Faire le MÊME geste sur ", { t: "new ClasseAbstraite()", code: true },
  ". IntelliJ ne propose rien."
]));
lam.push(aDire("l'outil connaît une règle que nous n'avons pas encore énoncée. Laquelle ?"));

etape(lam, 3, "Trouver la règle", "3 min");
lam.push(p("Laisser chercher. Comparer les deux types : l'un est une interface à une seule méthode, l'autre une classe abstraite avec une méthode concrète en plus."));
lam.push(runs([
  "Ajouter ", { t: "@FunctionalInterface", code: true }, " sur l'interface : le compilateur accepte. Ajouter une seconde méthode : il refuse, et dit pourquoi."
]));
lam.push(aDire("une lambda n'est pas un objet à moitié construit, c'est une fonction. Elle n'a ni état, ni constructeur, ni méthode concrète à offrir. Une interface qui ne demande qu'une chose lui convient ; une classe abstraite, jamais."));

etape(lam, 4, "Une lambda est un objet", "2 min");
lam.push(runs([
  "Ranger la lambda dans une variable, la passer à une méthode ",
  { t: "executer(MonInterface)", code: true },
  ", montrer que la méthode accepte indifféremment la lambda et la classe anonyme."
]));
lam.push(aDire("la méthode ne connaît que l'interface. Les deux écritures produisent le même objet, elle ne peut pas les distinguer."));

etape(lam, 5, "Faire le chemin inverse", "1 min");
lam.push(runs([
  "Sur la lambda, ", { t: "Alt+Entrée", code: true },
  " puis « Replace with anonymous class ». Le code revient à son point de départ."
]));
lam.push(aDire("ce sont deux écritures de la même chose, et l'outil passe de l'une à l'autre dans les deux sens. Retenez-le : quand une lambda vous paraît illisible, dépliez-la pour comprendre, puis repliez-la."));

fin(lam, "LAM",
  [[{ t: "À l'étape 3", b: true }, " — ajouter une seconde méthode à l'interface SANS retirer ",
    { t: "@FunctionalInterface", code: true }, "."],
   ["Le compilateur refuse l'interface elle-même, et la lambda devient rouge à son tour, ailleurs dans le fichier."],
   [{ t: "À dire — ", b: true },
    "l'annotation ne sert qu'à ça, et ça vaut la peine : sans elle, l'erreur serait apparue chez tous ceux qui utilisent l'interface, et pas à l'endroit où quelqu'un a fait la bêtise."]],
  [["CC-NOM.1", "un nom répond à la question qu'on se pose en le lisant"],
   ["CC-MET.2", "des méthodes courtes"],
   ["IDE.16", "les transformations proposées par Alt+Entrée"]],
  "L'état d'arrivée contient la lambda, la classe anonyme conservée pour la comparaison, et la méthode qui accepte les deux.");

// =====================================================================

// ---------------------------------------------------------------------
Packer.toBuffer(doc(lam, "Démo LAM")).then(b => {
  fs.writeFileSync(`${__dirname}/../../_demos/Demo_LAM.docx`, b);
  console.log("Demo_LAM.docx :", Math.round(b.length / 1024), "Ko");
});
