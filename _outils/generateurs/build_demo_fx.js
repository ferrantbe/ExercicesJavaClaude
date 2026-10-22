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

const fx = [];
couverture(fx, "FX", "Le lien entre un composant et le code",
           "18 minutes, en trois temps", "avant FX.1, FX.4 et FX.5");
fx.push(p("C'est le seul geste de l'année qu'un étudiant ne peut pas deviner, et c'est la question 5 de l'examen. Deux applications : le lien lui-même, puis le voyage de l'événement."));
fx.push(runs([
  { t: "Jouée en trois temps. ", b: true },
  "Le deck FX1 l'appelle trois fois : étapes 1 et 2 avant ",
  { t: "FX.1", code: true },
  " (slide 3.3), étape 3 avant ",
  { t: "FX.4", code: true },
  " (slide 4.2), étapes 4 et 5 avant ",
  { t: "FX.5", code: true },
  " (slide 5.2). Chaque reprise coûte une minute de plus que le déroulé ci-dessous : rouvrir le code, relancer l'application."
]));

etape(fx, 1, "Le bouton qui ne fait rien", "2 min");
fx.push(runs([
  "Lancer ", { t: "ClicApp", code: true },
  " dans son état de départ. La fenêtre s'ouvre, le bouton s'enfonce quand on clique. Et rien."
]));
fx.push(aDire("tout est correct. Le bouton existe, il est affiché, il réagit visuellement. Il manque une seule chose : personne ne lui a dit quoi déclencher."));

etape(fx, 2, "Brancher, en trois écritures", "4 min");
fx.push(runs([
  "Écrire d'abord la classe anonyme complète : ",
  { t: "new EventHandler<ActionEvent>() { ... }", code: true }, ". Lancer : ça marche."
]));
fx.push(runs([
  "Puis ", { t: "Alt+Entrée", code: true }, " pour la replier en lambda. Puis montrer ",
  { t: "addEventHandler(ActionEvent.ACTION, ...)", code: true }, ", dont ",
  { t: "setOnAction", code: true }, " est le raccourci."
]));
fx.push(aDire("un gestionnaire est un objet avec une méthode. C'est tout. Si vous avez suivi la démonstration sur les lambdas, vous venez de reconnaître exactement la même chose."));

etape(fx, 3, "L'événement contient de l'information", "3 min");
fx.push(runs([
  "Ajouter un ", { t: "KeyEvent.KEY_TYPED", code: true },
  " sur la SCÈNE, et afficher ", { t: "evenement.getCharacter()", code: true }, "."
]));
fx.push(aDire("deux choses nouvelles. D'abord le gestionnaire reçoit l'événement, pas seulement le signal qu'il a eu lieu. Ensuite on l'a posé sur la scène et non sur le bouton : une touche frappée n'appartient à aucun composant."));

etape(fx, 4, "Un événement voyage", "4 min");
fx.push(runs([
  "Passer à ", { t: "PropagationApp", code: true },
  ". Un cercle dans un conteneur, deux gestionnaires sur le cercle, un filtre sur le conteneur. Cliquer : les trois s'affichent, dans l'ordre."
]));
fx.push(...code([
  "conteneur, filtre          <- a la DESCENTE",
  "cercle, gestionnaire 1     <- a la REMONTEE",
  "cercle, gestionnaire 2"
]));
fx.push(aDire("l'événement descend de la fenêtre vers le cercle, puis remonte. Un filtre intervient à l'aller, un gestionnaire au retour. C'est pour ça qu'ils portent deux noms."));

etape(fx, 5, "L'interrompre", "2 min");
fx.push(runs([
  "Cocher la case : le filtre appelle ", { t: "consume()", code: true },
  ". Recliquer sur le cercle. Ses deux gestionnaires ne s'exécutent plus."
]));
fx.push(aDire("le conteneur a intercepté l'événement avant que le cercle ne le voie. C'est ce qu'on fait pour bloquer une saisie, ou pour qu'un panneau modal empêche tout clic derrière lui."));

fin(fx, "FX",
  [[{ t: "À l'étape 2", b: true }, " — écrire ", { t: "bouton.setOnAction(clicBouton());", code: true },
    " avec les parenthèses."],
   ["Le compilateur refuse : on lui passe le RÉSULTAT de la méthode, pas la méthode. C'est l'erreur la plus fréquente des premières heures de JavaFX."],
   [{ t: "À dire — ", b: true },
    "on ne donne pas au bouton ce que la méthode retourne, on lui donne de quoi l'appeler plus tard. C'est toute la différence entre une valeur et un comportement."]],
  [["CC-MET.8", "une méthode agit ou répond, jamais les deux"],
   ["IDE.15", "les transformations proposées par Alt+Entrée"],
   ["TEC-FX.4", "pourquoi une application JavaFX refuse de démarrer, et la classe de lancement"]],
  "L'état d'arrivée contient les deux applications, les trois écritures du gestionnaire en commentaire, et le filtre avec sa case à cocher.");

// ---------------------------------------------------------------------

// ---------------------------------------------------------------------
Packer.toBuffer(doc(fx, "Démo FX")).then(b => {
  fs.writeFileSync(`${__dirname}/../../_demos/Demo_FX.docx`, b);
  console.log("Demo_FX.docx :", Math.round(b.length / 1024), "Ko");
});
