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

const abs = [];
couverture(abs, "ABS", "Laisser l'outil supprimer la duplication",
           "12 minutes", "avant ABS.1");
abs.push(p("Recopier la même méthode dans trois sous-classes est une erreur très fréquente à l'examen. Cette démonstration montre le geste inverse, et le fait faire par IntelliJ."));

etape(abs, 1, "Trois classes, un seul code", "3 min");
abs.push(p("Lancer l'état de départ : trois notifications, mail, SMS et push. Ouvrir les trois côte à côte — IntelliJ permet de scinder l'éditeur."));
abs.push(aDire("regardez envoyer(). C'est le même code trois fois, à un mot près. Corrigez un jour le refus des messages vides, et vous aurez deux endroits où l'oublier."));

etape(abs, 2, "Ce qu'on ne peut pas faire", "2 min");
abs.push(p("Essayer de mettre les trois dans un tableau. Le compilateur refuse : il n'existe aucun type commun."));
abs.push(aDire("elles font la même chose et n'ont rien en commun aux yeux du compilateur. C'est ce qu'on va corriger."));

etape(abs, 3, "Extraire, sans taper", "4 min");
abs.push(runs([
  "Clic droit sur ", { t: "NotificationMail", code: true }, ", ",
  { t: "Refactor → Extract → Superclass", code: true }, ". Nommer ",
  { t: "Notification", code: true }, ", cocher le destinataire et ",
  { t: "envoyer", code: true }, "."
]));
abs.push(runs([
  "Puis sur les deux autres : ", { t: "Refactor → Pull Members Up", code: true },
  ", choisir ", { t: "Notification", code: true },
  ". Supprimer les méthodes devenues identiques."
]));
abs.push(aDire("je n'ai pas tapé une ligne. L'outil a fait le déplacement et corrigé les déclarations. C'est exactement ce qu'il faut faire quand on repère une duplication : pas la recopier mieux, la faire remonter."));

etape(abs, 4, "Ce qui reste à décider", "2 min");
abs.push(runs([
  "Il reste le nom du canal, qui diffère. Le rendre abstrait : ",
  { t: "protected abstract String canal();", code: true },
  ". Les trois sous-classes tiennent alors en une méthode chacune."
]));

etape(abs, 5, "Le tableau devient possible", "1 min");
abs.push(runs([
  "Reprendre le tableau de l'étape 2. Il compile. La boucle appelle ",
  { t: "envoyer()", code: true }, " sur chaque canal sans savoir lequel c'est."
]));
abs.push(aDire("aucun instanceof, aucun test de type. Ajouter Slack demanderait une classe et un élément de plus dans ce tableau, rien d'autre."));

fin(abs, "ABS",
  [[{ t: "À l'étape 4", b: true }, " — oublier de déclarer ", { t: "Notification", code: true },
    " abstraite, et écrire ", { t: "new Notification(\"x\")", code: true }, " dans le main."],
   ["Ça compile, et la notification n'a pas de canal : la méthode rend null, et le message affiche « Envoi d'un null »."],
   [{ t: "À dire — ", b: true },
    "abstract n'est pas une décoration. C'est ce qui interdit de construire une notification qui n'est rien en particulier."]],
  [["CC-CLS.3", "la duplication entre sous-classes"],
   ["CC-CLS.4", "une conception qui absorbe le changement"],
   ["IDE.21", "les refactorings de déplacement"]],
  "L'état d'arrivée contient la classe abstraite et les trois sous-classes d'une méthode.");

// ---------------------------------------------------------------------

// ---------------------------------------------------------------------
Packer.toBuffer(doc(abs, "Démo ABS")).then(b => {
  fs.writeFileSync(`${__dirname}/../../_demos/Demo_ABS.docx`, b);
  console.log("Demo_ABS.docx :", Math.round(b.length / 1024), "Ko");
});
