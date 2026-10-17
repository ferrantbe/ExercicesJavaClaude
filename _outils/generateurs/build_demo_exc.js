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

const exc = [];
couverture(exc, "EXC", "Faire planter le programme, lire la trace, corriger",
           "10 à 12 minutes", "avant EXC.1");
exc.push(p("C'est la démonstration la plus rentable de l'année : une trace d'exception ne se montre pas sur une slide, elle se lit à l'écran, en direct, pendant que le programme vient de s'arrêter."));

etape(exc, 1, "Le planter", "2 min");
exc.push(runs([
  "Lancer ",
  { t: "Demo", code: true },
  " dans son état initial. Il s'arrête sur une ",
  { t: "ArithmeticException", code: true },
  ". Ne rien expliquer tout de suite."
]));
exc.push(aDire("quelqu'un peut me dire où est l'erreur ?"));
exc.push(p("Laisser répondre. La plupart regarderont la dernière ligne."));

etape(exc, 2, "Lire dans le bon sens", "3 min");
exc.push(runs([
  "Montrer que la ",
  { t: "première", b: true },
  " ligne ",
  { t: "at", code: true },
  " dit où l'exception a été levée, et que les suivantes remontent jusqu'au ",
  { t: "main", code: true },
  ". Cliquer sur les numéros de ligne : IntelliJ y emmène directement."
]));
exc.push(aDire("l'erreur est dans moyenne(), mais la cause est ailleurs : c'est le main qui a passé un panier vide. Une trace sert autant à trouver le coupable qu'à remonter jusqu'à celui qui l'a mis en position de faillir."));

etape(exc, 3, "Trois corrections possibles", "4 min");
exc.push(p("Les proposer et les discuter à haute voix, sans les coder toutes."));
exc.push(tableau(["Correction", "Ce qu'elle donne"], [
  ["rendre 0 quand le panier est vide",
   "le programme continue avec une valeur fausse — un panier vide n'a pas une moyenne de zéro, il n'a pas de moyenne"],
  ["tester avant d'appeler, dans le main",
   "marche, mais chaque appelant devra y penser, et le premier qui oubliera fera replanter le programme"],
  ["lever une exception explicite dans moyenne()",
   "la méthode dit elle-même ce qu'elle refuse, une fois pour toutes, et le message explique pourquoi"]
], [3400, 5960], []));
exc.push(p("Coder la troisième. Relancer : le message est maintenant lisible."));

etape(exc, 4, "Et l'attraper", "2 min");
exc.push(runs([
  "Entourer l'appel d'un ",
  { t: "try/catch", code: true },
  " dans le ",
  { t: "main", code: true },
  ". Montrer que le programme continue au lieu de s'arrêter."
]));
exc.push(aDire("lever et attraper sont deux gestes distincts, faits à deux endroits différents. On lève là où l'on constate le problème, on attrape là où l'on peut y faire quelque chose."));

exc.push(h2("Ce qu'il faut rater exprès"));
exc.push(encadre([
  [{ t: "À l'étape 4", b: true }, " — écrire d'abord un ", { t: "catch", code: true }, " vide."],
  ["Relancer : le programme ne dit plus rien du tout, et tout va bien en apparence."],
  [{ t: "À dire — ", b: true },
   "on vient de faire pire qu'avant. Le plantage était bruyant mais honnête ; ce silence est un mensonge. Voir CC-ERR.3."]
], "9C2B2B"));

exc.push(h2("Renvois"));
exc.push(tableau(["Code", "Ce qu'il dit"], [
  ["CC-ERR.1", "préférer une exception à un code de retour arrangé"],
  ["CC-ERR.3", "ne jamais avaler une exception en silence"],
  ["CC-ERR.4", "un message qui dit ce qui était attendu et ce qui est arrivé"],
  ["TEC-EXE.1", "la pile d'appels, qui est ce que la trace affiche"]
], [1600, 7760], [0]));

exc.push(h2("Pour rejouer"));
exc.push(runs([
  "Copier ",
  { t: "_demos/sources_initiales/exc/", code: true },
  " : le panier y est sans garde et le main sans try, exactement comme à l'étape 1."
]));

// =====================================================================
//  JUN
// =====================================================================

// ---------------------------------------------------------------------
Packer.toBuffer(doc(exc, "Démo EXC")).then(b => {
  fs.writeFileSync(`${__dirname}/../../_demos/Demo_EXC.docx`, b);
  console.log("Demo_EXC.docx :", Math.round(b.length / 1024), "Ko");
});
