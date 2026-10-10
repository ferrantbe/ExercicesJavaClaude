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

const tab = [];
couverture(tab, "TAB", "Cinq pièges, et pourquoi ils existent",
  "20 minutes", "Séance 6, en ouverture du thème");

tab.push(h2("L'idée"));
tab.push(p("Presque tout se tape en direct, à partir d'un fichier quasi vide. La démonstration n'explique pas les tableaux : elle tombe dans leurs pièges, un par un, et regarde ce que le langage répond."));
tab.push(runs([
  { t: "Le point à faire passer. ", b: true },
  "Un tableau n'est pas une valeur, c'est une ",
  { t: "référence", b: true },
  ". Quatre des cinq pièges en découlent."
]));

etape(tab, 1, "Une case jamais remplie", "2 min");
tab.push(...code(["int[] lundi = new int[5];", "System.out.println(lundi[0]);"]));
tab.push(p("Demander la réponse avant de lancer. Certains diront null, d'autres une erreur. C'est zéro."));
tab.push(aDire("Un tableau de int naît rempli de zéros. Un tableau de String, lui, naît rempli de null — et c'est là que les NullPointerException commencent. Essayez chez vous."));

etape(tab, 2, "Ce que println fait d'un tableau", "3 min");
tab.push(...code(["System.out.println(lundi);"]));
tab.push(p("La sortie ressemble à ceci, avec un nombre différent à chaque exécution :"));
tab.push(...code(["[I@4b67cf4d"]));
tab.push(runs([
  { t: "Décortiquer les trois parties. ", b: true },
  "Le crochet dit « tableau », le I dit « de int », et ce qui suit l'arobase est l'adresse. Un tableau n'a pas de toString() utile, donc on obtient celui d'Object."
]));
tab.push(...code(["System.out.println(Arrays.toString(lundi));"]));
tab.push(aDire("Retenez cette ligne : c'est celle que vous chercherez dans vos notes le jour où un affichage vous donnera du charabia."));

etape(tab, 3, "length, avec ou sans parenthèses", "2 min");
tab.push(...code([
  "lundi.length      un CHAMP, pas de parentheses",
  "nom.length()      une METHODE, avec parentheses"
]));
tab.push(p("C'est une incohérence du langage, pas une règle à comprendre. Le dire franchement plutôt que d'inventer une justification : les étudiants s'en souviendront mieux."));

etape(tab, 4, "Le piège qui compte vraiment", "6 min");
tab.push(runs([
  "Écrire une méthode ",
  { t: "remettreAZero(int[] tableau)", code: true },
  " qui ne rend rien, et l'appeler."
]));
tab.push(...code([
  "int[] releve = {12, 8, 21, 5, 17};",
  "remettreAZero(releve);",
  "System.out.println(Arrays.toString(releve));   // ?"
]));
tab.push(p("Demander un vote à main levée avant de lancer : le tableau a-t-il changé ? La méthode ne rend rien, beaucoup diront non."));
tab.push(aDire("La méthode n'a pas reçu le tableau. Elle a reçu l'adresse du tableau. Elle est donc allée écrire dans le vôtre — il n'y en a jamais eu qu'un."));
tab.push(runs([
  "Enchaîner sur la vraie copie, ",
  { t: "Arrays.copyOf", code: true },
  ", et montrer que modifier la copie ne touche plus à l'original."
]));

etape(tab, 5, "Deux dimensions, et des lignes inégales", "5 min");
tab.push(...code([
  "int[][] semaine = new int[5][7];",
  "semaine.length        -> 5",
  "semaine[0].length     -> 7"
]));
tab.push(aDire("Un tableau à deux dimensions n'existe pas en Java. C'est un tableau dont chaque case contient un autre tableau — d'où les deux length différents."));
tab.push(p("Conséquence immédiate : les lignes n'ont pas à être de la même longueur. Le montrer, parce que ça surprend, et parce que ça explique pourquoi le for-each imbriqué doit parcourir des int[] avant de parcourir des int."));
tab.push(...code([
  "int[][] irregulier = new int[3][];",
  "irregulier[0] = new int[]{1, 2};",
  "irregulier[1] = new int[]{1, 2, 3, 4};"
]));

fin(tab, "TAB", [
  [{ t: "L'affichage en charabia. ", b: true }, "À l'étape 2, lancer sans avoir prévenu, et laisser un silence devant [I@4b67cf4d. Puis : « quelqu'un sait ce que c'est ? »"],
  [{ t: "Le vote de l'étape 4. ", b: true }, "Demander vraiment la main levée, et compter. La moitié de la classe se trompe, et c'est la moitié qui retiendra."],
  [{ t: "length() sur un tableau. ", b: true }, "Taper les parenthèses exprès, et lire l'erreur : cannot find symbol — method length(). Le message ne dit pas « retirez les parenthèses », et c'est justement le genre de message qu'ils devront apprendre à traduire."]
], [
  ["TEC-EXE.3", "ce que contient vraiment une variable : une référence"],
  ["TEC-EXE.2", "le tas, où vit le tableau lui-même"],
  ["CC-NOM.5", "des noms pour les choses ; un tableau en porte plusieurs"]
], runs([
  "Le fichier de départ ne contient que trois lignes : tout se tape en direct. Le résultat complet est dans ",
  { t: "demos/…/demo/tab/Demo.java", code: true },
  "."
]));

// =====================================================================
//  FIC
// =====================================================================

// ---------------------------------------------------------------------
Packer.toBuffer(doc(tab, "Démonstration TAB")).then(b => {
  fs.writeFileSync(`${__dirname}/../../_demos/Demo_TAB.docx`, b);
  console.log("Demo_TAB.docx :", Math.round(b.length / 1024), "Ko");
});
