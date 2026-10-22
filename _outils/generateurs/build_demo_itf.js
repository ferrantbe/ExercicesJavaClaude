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

const itf = [];
couverture(itf, "ITF", "Trois mots, et le programme accepte l'inconnu",
           "12 minutes", "avant ITF.1");
itf.push(p("Cette démonstration se joue sur le patron Observateur, avec vos classes du cours. Son intérêt tient à l'ampleur du résultat comparée à celle du changement : trois mots."));

etape(itf, 1, "Ça marche déjà", "2 min");
itf.push(p("Lancer l'état de départ. Un fournisseur, deux clients qui s'abonnent et se désabonnent, des produits qui arrivent. Tout fonctionne."));
itf.push(aDire("il n'y a aucun bug à corriger. Ce qu'on va changer, c'est ce que ce code permet de faire DEMAIN."));

etape(itf, 2, "La demande qui coince", "3 min");
itf.push(runs([
  "Annoncer qu'une épicerie veut être prévenue elle aussi. Écrire ",
  { t: "Magasin", code: true },
  " avec sa méthode ", { t: "update()", code: true },
  ", puis tenter ", { t: "fournisseur.addSubscriber(epicerie)", code: true }, "."
]));
itf.push(p("Le compilateur refuse : un Magasin n'est pas un Client."));
itf.push(aDire("le magasin sait exactement ce qu'il faut faire. Il a la bonne méthode, avec la bonne signature. Et pourtant il est refusé — parce que le fournisseur a été écrit pour une CLASSE, pas pour une capacité."));

etape(itf, 3, "La fausse bonne idée", "2 min");
itf.push(runs([
  "Laisser proposer de faire hériter ", { t: "Magasin", code: true }, " de ",
  { t: "Client", code: true }, ". Le faire. Ça compile."
]));
itf.push(aDire("un magasin est-il un client ? Non. Il commande au lieu d'acheter, il n'a rien en commun avec lui. On vient de mentir au compilateur pour lui faire plaisir. Défaire."));

etape(itf, 4, "Extraire ce qui est vraiment commun", "4 min");
itf.push(runs([
  "Créer l'interface ", { t: "Abonne", code: true }, " avec la seule méthode ",
  { t: "update()", code: true },
  ". Faire l'implémenter aux deux classes. Puis, dans le fournisseur, remplacer les trois ",
  { t: "Client", code: true }, " par ", { t: "Abonne", code: true }, "."
]));
itf.push(p("Relancer : le magasin est prévenu comme les clients."));
itf.push(aDire("trois mots ont changé. Le fournisseur ne sait plus à qui il parle, et c'est exactement pour ça qu'il peut parler à n'importe qui."));

etape(itf, 5, "L'épreuve", "1 min");
itf.push(p("Demander ce qu'il faudrait pour ajouter un entrepôt. Une classe, trois lignes, et pas une seule modification ailleurs."));

fin(itf, "ITF",
  [[{ t: "À l'étape 4", b: true }, " — oublier ", { t: "implements Abonne", code: true },
    " sur une des deux classes."],
   ["Le message d'erreur ne dit pas « il manque implements » : il dit qu'on ne peut pas convertir un Client en Abonne. Laisser chercher."],
   [{ t: "À dire — ", b: true },
    "avoir la bonne méthode ne suffit pas en Java. Il faut DÉCLARER qu'on tient la promesse. D'autres langages font autrement, et chacun a ses raisons."]],
  [["CC-CLS.4", "une conception qui absorbe le changement"],
   ["CC-OBJ.1", "parler à un objet plutôt que l'interroger"]],
  "L'état d'arrivée contient l'interface, les deux implémentations et le fournisseur découplé.");

// =====================================================================

// ---------------------------------------------------------------------
Packer.toBuffer(doc(itf, "Démo ITF")).then(b => {
  fs.writeFileSync(`${__dirname}/../../_demos/Demo_ITF.docx`, b);
  console.log("Demo_ITF.docx :", Math.round(b.length / 1024), "Ko");
});
