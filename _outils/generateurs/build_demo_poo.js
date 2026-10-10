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

const poo = [];
couverture(poo, "POO", "Construire une classe, puis l'encapsuler",
           "12 à 15 minutes", "avant POO.1");

etape(poo, 1, "Partir de rien", "2 min");
poo.push(p("Créer une classe Livre vide, dans un package vide. Taper le squelette à la main, sans générateur : les étudiants doivent voir qu'une classe n'a rien de magique."));
poo.push(...code(["public class Livre { }"]));
poo.push(aDire("une classe est un moule. Elle ne fait encore rien."));

etape(poo, 2, "Des champs publics, et ce qui se passe", "3 min");
poo.push(runs([
  "Ajouter ",
  { t: "titre", code: true }, ", ",
  { t: "auteur", code: true }, ", ",
  { t: "anneeDeParution", code: true },
  ", tous en ",
  { t: "public", code: true },
  ". Écrire un ",
  { t: "main", code: true },
  " qui crée un Livre et remplit ses champs directement. Lancer : ça marche."
]));
poo.push(runs([{ t: "Puis, devant eux, écrire :", b: true }]));
poo.push(...code(["livre.anneeDeParution = -3000;"]));
poo.push(p("Lancer : ça marche aussi. Laisser le silence s'installer."));
poo.push(aDire("rien n'a protesté. Le programme est faux et personne ne le sait. Voilà le problème qu'on va résoudre."));

etape(poo, 3, "Fermer, puis rouvrir", "4 min");
poo.push(runs([
  "Passer les trois champs en ",
  { t: "private", code: true },
  ". Lancer : ne compile plus. Lire le message d'erreur à voix haute."
]));
poo.push(runs([
  "Générer les accesseurs avec ",
  { t: "Alt+Inser", code: true },
  " / ",
  { t: "⌘N", code: true },
  " — c'est le moment de montrer le générateur, voir ",
  { t: "IDE.12", code: true },
  " du guide. Lancer : ça remarche."
]));
poo.push(aDire("on a fait un détour pour revenir au même résultat. À quoi bon ? Réponse à l'étape suivante."));

etape(poo, 4, "Ce que le détour permet", "3 min");
poo.push(runs([
  "Dans ",
  { t: "setAnneeDeParution", code: true },
  ", ajouter la vérification. Relancer avec ",
  { t: "-3000", code: true },
  " : le programme refuse."
]));
poo.push(aDire("c'est la seule chose qu'un champ public ne permettra jamais. L'accesseur n'est pas une formalité, c'est l'endroit où l'on peut mettre une règle."));

etape(poo, 5, "La donnée qui n'existe pas", "3 min");
poo.push(runs([
  "Demander : « et si je veux l'âge du livre ? » Laisser proposer un champ ",
  { t: "age", code: true },
  ". L'écrire. Puis demander ce qui se passe l'an prochain. Supprimer le champ, écrire la méthode qui calcule."
]));
poo.push(aDire("une donnée qu'on peut calculer n'a pas à être stockée. C'est exactement POO.3, qu'ils feront tout à l'heure."));

poo.push(h2("Ce qu'il faut rater exprès"));
poo.push(encadre([
  [{ t: "À l'étape 3", b: true }, " — taper ", { t: "nom = nom", code: true },
   " au lieu de ", { t: "this.nom = nom", code: true }, " dans un setter."],
  ["Le compilateur ne dit rien, l'affectation ne fait rien, et le getter rend null. Laisser chercher trente secondes avant de montrer le this."],
  ["C'est la première question de POO.2."]
], "9C2B2B"));

poo.push(h2("Renvois"));
poo.push(tableau(["Code", "Ce qu'il dit"], [
  ["CC-OBJ.2", "un objet expose des comportements, pas ses données"],
  ["CC-NOM.1", "un nom répond à la question qu'on se pose en le lisant"],
  ["IDE.12", "générer les accesseurs"]
], [1600, 7760], [0]));

poo.push(h2("Pour rejouer"));
poo.push(runs([
  "Partir d'un package vide, ou copier l'état de l'étape 2 depuis ",
  { t: "_demos/sources_initiales/poo/", code: true },
  " si vous voulez gagner les deux premières minutes."
]));

// =====================================================================
//  EXC
// =====================================================================

// ---------------------------------------------------------------------
Packer.toBuffer(doc(poo, "Démo POO")).then(b => {
  fs.writeFileSync(`${__dirname}/../../_demos/Demo_POO.docx`, b);
  console.log("Demo_POO.docx :", Math.round(b.length / 1024), "Ko");
});
