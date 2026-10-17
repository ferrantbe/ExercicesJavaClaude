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

const tmp = [];
couverture(tmp, "TMP", "Explorer une classe du JDK sans quitter l'éditeur",
           "12 minutes", "avant TMP.1");
tmp.push(p("Cette démonstration ne porte sur aucune API en particulier. Elle porte sur la méthode : comment trouver, seul, ce qu'on ne connaît pas encore. C'est ce que les énoncés demandent tout au long de l'année quand ils disent « cherchez dans la Javadoc »."));

etape(tmp, 1, "Poser la question", "1 min");
tmp.push(runs(["Deux ", { t: "LocalTime", code: true },
               " : 18h00 et 21h35. Combien de temps dure le cours ?"]));
tmp.push(aDire("interdiction d'ouvrir un navigateur. Tout est dans l'éditeur."));

etape(tmp, 2, "La complétion comme table des matières", "3 min");
tmp.push(runs([
  "Taper ", { t: "debut.", code: true }, " et lire la liste à voix haute. S'arrêter sur ",
  { t: "until", code: true }, "."
]));
tmp.push(runs([
  { t: "Ctrl+Q", code: true }, " / ", { t: "F1", code: true },
  " dessus : elle demande une unité. Donc il faut une unité, et il faut savoir laquelle."
]));

etape(tmp, 3, "Suivre les liens", "3 min");
tmp.push(runs([
  "Dans la bulle, cliquer sur ", { t: "TemporalUnit", code: true }, ", arriver à ",
  { t: "ChronoUnit", code: true }, ", y voir ", { t: "MINUTES", code: true }, " et ",
  { t: "HOURS", code: true }, "."
]));
tmp.push(aDire("la documentation n'est pas une page qu'on lit, c'est un réseau qu'on parcourt. Trois clics et on est arrivé."));

etape(tmp, 4, "L'autre chemin", "3 min");
tmp.push(runs([
  "Taper ", { t: "Duration.", code: true }, " et trouver ", { t: "between", code: true },
  ". Elle retourne un objet, pas un nombre. Taper ", { t: "duree.", code: true },
  " et découvrir ", { t: "toHours", code: true }, ", ", { t: "toMinutes", code: true }, "."
]));
tmp.push(...code([
  "duree.toMinutes()   ->  215      le total",
  "duree.toHours()     ->  3"
]));

etape(tmp, 5, "Le piège que seule la Javadoc révèle", "2 min");
tmp.push(runs([
  "Écrire ", { t: "duree.toHours() + \"h\" + duree.toMinutes()", code: true },
  " : on obtient ", { t: "3h215", code: true }, ". Chercher pourquoi dans la bulle. Trouver ",
  { t: "toMinutesPart()", code: true }, "."
]));
tmp.push(aDire("la complétion vous montre les noms ; elle ne vous dit pas ce qu'ils font. C'est la Javadoc qui distingue toMinutes de toMinutesPart, et elle est à une touche."));

fin(tmp, "TMP",
  [[{ t: "À l'étape 5", b: true }, " — livrer ", { t: "3h215", code: true },
    " et ne pas le voir tout de suite."],
   ["Laisser la sortie affichée quelques secondes avant que quelqu'un ne réagisse."],
   [{ t: "À dire — ", b: true },
    "le programme n'a pas planté, rien n'était souligné, et le résultat est absurde. Aucun outil ne vous protège de ça : il faut lire ce qu'on affiche."]],
  [["IDE.14", "lire la Javadoc sans quitter l'éditeur"],
   ["IDE.11", "complétion et import automatique"],
   ["TEC-PLA.1", "JVM, JRE, JDK : le JDK apporte la bibliothèque standard"]],
  "L'état d'arrivée contient le chemin parcouru, commenté étape par étape.");

// =====================================================================

// ---------------------------------------------------------------------
Packer.toBuffer(doc(tmp, "Démo TMP")).then(b => {
  fs.writeFileSync(`${__dirname}/../../_demos/Demo_TMP.docx`, b);
  console.log("Demo_TMP.docx :", Math.round(b.length / 1024), "Ko");
});
