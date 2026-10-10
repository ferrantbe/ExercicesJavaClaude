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

const sta = [];
couverture(sta, "STA", "Ce qui appartient à la classe, ce qui appartient à l'objet",
           "10 minutes", "avant STA.1");

etape(sta, 1, "Numéroter à la main, et se tromper", "2 min");
sta.push(p("Lancer l'état de départ. Trois voitures, dont deux portent le numéro 2 — parce que c'est l'appelant qui numérote."));
sta.push(aDire("le numéro est une donnée de la voiture, mais personne ne sait combien il y a de voitures. Cette information n'appartient à aucune d'elles."));

etape(sta, 2, "Un champ qui n'est à personne", "3 min");
sta.push(runs([
  "Ajouter ", { t: "private static int construites", code: true },
  ", l'incrémenter dans le constructeur, et en tirer le numéro. Retirer le paramètre. Relancer : 1, 2, 3."
]));
sta.push(aDire("il y a maintenant trois voitures et UNE SEULE case mémoire pour le compteur. Elle n'appartient à aucune voiture, elle appartient à la classe."));

etape(sta, 3, "Le vérifier dans le débogueur", "2 min");
sta.push(p("Point d'arrêt dans le constructeur, panneau Variables. Montrer que le numéro diffère d'un objet à l'autre, et que le compteur, lui, est le même partout."));

etape(sta, 4, "Une méthode qui répond sur l'ensemble", "2 min");
sta.push(runs([
  "Ajouter ", { t: "public static int nombreConstruites()", code: true },
  ". L'appeler AVANT toute création : elle répond 0, alors qu'aucun objet n'existe."
]));
sta.push(aDire("on l'appelle sur la classe, pas sur un objet. C'est logique : la question porte sur l'ensemble."));

etape(sta, 5, "La constante", "1 min");
sta.push(runs([
  "Ajouter ", { t: "public static final double TVA = 0.21", code: true },
  " et l'utiliser dans un calcul de prix."
]));
sta.push(aDire("static parce que la valeur est la même pour tous, final parce qu'elle ne changera pas. Les deux mots disent deux choses différentes."));

fin(sta, "STA",
  [[{ t: "À l'étape 4", b: true }, " — écrire ", { t: "return this.numero;", code: true },
    " dans la méthode statique."],
   ["Le compilateur refuse : « non-static variable this cannot be referenced from a static context »."],
   [{ t: "À dire — ", b: true },
    "this désigne l'objet sur lequel on appelle la méthode. Ici il n'y en a pas, donc this n'existe pas. C'est la même raison qui explique pourquoi le main est statique."]],
  [["CC-NOM.7", "une constante nommée plutôt qu'un nombre magique"],
   ["TEC-EXE.2", "où vivent les objets, et ce qui n'y vit pas"]],
  "L'état d'arrivée ajoute le compteur, la méthode de classe et la constante.");

// =====================================================================

// ---------------------------------------------------------------------
Packer.toBuffer(doc(sta, "Démo STA")).then(b => {
  fs.writeFileSync(`${__dirname}/../../_demos/Demo_STA.docx`, b);
  console.log("Demo_STA.docx :", Math.round(b.length / 1024), "Ko");
});
