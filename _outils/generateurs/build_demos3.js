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
const fx = [];
couverture(fx, "FX", "Le lien entre un composant et le code",
           "15 minutes", "avant FX.1");
fx.push(p("C'est le seul geste de l'année qu'un étudiant ne peut pas deviner, et c'est la question 5 de l'examen. Deux applications : le lien lui-même, puis le voyage de l'événement."));

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

etape(fx, 3, "L'événement porte de l'information", "3 min");
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
    "on ne donne pas au bouton ce que la méthode rend, on lui donne de quoi l'appeler plus tard. C'est toute la différence entre une valeur et un comportement."]],
  [["CC-MET.8", "une méthode agit ou répond, jamais les deux"],
   ["IDE.16", "les transformations proposées par Alt+Entrée"],
   ["TEC-FX.4", "pourquoi une application JavaFX refuse de démarrer, et la classe de lancement"]],
  "L'état d'arrivée contient les deux applications, les trois écritures du gestionnaire en commentaire, et le filtre avec sa case à cocher.");

// ---------------------------------------------------------------------
[["ITF", itf], ["LAM", lam], ["FX", fx]].forEach(([nom, contenu]) => {
  Packer.toBuffer(doc(contenu, `Démo ${nom}`)).then(b => {
    fs.writeFileSync(`${__dirname}/../../_demos/Demo_${nom}.docx`, b);
    console.log(`Demo_${nom}.docx :`, Math.round(b.length / 1024), "Ko");
  });
});
