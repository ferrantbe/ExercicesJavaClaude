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
const gen = [];
couverture(gen, "GEN", "L'erreur qui change de camp", "12 minutes", "avant GEN.1");
gen.push(p("La généricité ne rend rien possible qui ne l'était pas. Elle déplace le moment où l'erreur apparaît — et ce déplacement vaut une soirée de débogage."));

etape(gen, 1, "Une pile qui accepte tout", "3 min");
gen.push(runs([
  "Lancer l'état de départ : une ", { t: "Pile", code: true }, " d'", { t: "Object", code: true },
  ". On y empile 10, 20, puis « trente ». Ça compile sans le moindre avertissement."
]));
gen.push(p("Puis lancer. ClassCastException."));
gen.push(aDire("où est l'erreur ? Pas là où ça plante. Le programme s'arrête sur la ligne qui dépile, alors que la faute a été commise trois lignes plus haut."));

etape(gen, 2, "Chercher la faute dans la trace", "2 min");
gen.push(p("Lire la trace ensemble. Elle désigne le transtypage, pas l'empilement."));
gen.push(aDire("dans un vrai programme, ces trois lignes seraient dans trois classes différentes, écrites par trois personnes, à trois mois d'intervalle."));

etape(gen, 3, "Un caractère de plus", "4 min");
gen.push(runs([
  "Ajouter ", { t: "<T>", code: true }, " à la classe, remplacer les ",
  { t: "Object", code: true }, " des signatures par ", { t: "T", code: true },
  ". Déclarer ", { t: "Pile<Integer>", code: true }, " dans le ", { t: "main", code: true }, "."
]));
gen.push(p("La ligne qui empile « trente » devient rouge dans l'éditeur, avant tout lancement."));
gen.push(aDire("la même faute, refusée avant que le programme ne démarre. Voilà tout ce que la généricité apporte, et c'est énorme."));

etape(gen, 4, "Le transtypage disparaît", "2 min");
gen.push(runs([
  "Supprimer le ", { t: "(Integer)", code: true }, " du ", { t: "main", code: true },
  ". Il n'est plus nécessaire : ", { t: "depiler()", code: true }, " rend un ",
  { t: "Integer", code: true }, "."
]));
gen.push(p("Montrer qu'il reste UN transtypage, dans la classe. Il n'a pas disparu, il a été rangé au seul endroit où il soit sûr."));

etape(gen, 5, "La même classe, un autre type", "1 min");
gen.push(runs(["Créer une ", { t: "Pile<String>", code: true }, " juste à côté. Aucune ligne de plus."]));

fin(gen, "GEN",
  [[{ t: "À l'étape 3", b: true }, " — oublier de paramétrer la déclaration : écrire ",
    { t: "Pile pile = new Pile<>();", code: true }],
   ["Ça compile, avec un avertissement jaune : « raw use of parameterized class »."],
   [{ t: "À dire — ", b: true },
    "on vient de renoncer à tout ce qu'on a gagné. Le type brut existe pour la compatibilité avec le code d'avant 2004, et c'est la seule raison."]],
  [["CC-NOM.1", "un nom répond à la question qu'on se pose en le lisant"],
   ["IDE.15", "lire les avertissements et leurs corrections"]],
  "L'état d'arrivée est la version générique, avec la ligne fautive laissée en commentaire.");

// =====================================================================
const enu = [];
couverture(enu, "ENU", "Le cycle sans conditions", "10 minutes", "avant ENU.1");

etape(enu, 1, "Trois modes, trois conditions", "2 min");
enu.push(runs([
  "Lancer l'état de départ : un lecteur de musique dont le bouton enchaîne ",
  { t: "NORMAL", code: true }, ", ", { t: "ALEATOIRE", code: true }, ", ",
  { t: "REPETITION", code: true }, ". Ça marche."
]));
enu.push(runs(["Montrer les trois ", { t: "if", code: true }, " de ",
               { t: "modeSuivant()", code: true }, "."]));

etape(enu, 2, "Ajouter un mode", "2 min");
enu.push(runs([
  "Ajouter ", { t: "REPETITION_UNE", code: true },
  " à l'enum. Relancer : le lecteur ne l'atteint jamais, et reste bloqué sur trois modes."
]));
enu.push(aDire("le compilateur n'a rien dit. On a ajouté une valeur et cassé le comportement, en silence."));

etape(enu, 3, "L'ordre EST le cycle", "4 min");
enu.push(runs([
  "Montrer ", { t: "Mode.values()", code: true }, " dans le débogueur, puis ",
  { t: "ordinal()", code: true }, ". Réécrire la méthode en deux lignes :"
]));
enu.push(...code([
  "Mode[] cycle = Mode.values();",
  "mode = cycle[(mode.ordinal() + 1) % cycle.length];"
]));
enu.push(p("Relancer : les quatre modes défilent."));
enu.push(aDire("il n'y a plus une seule condition. L'ordre de déclaration porte l'information, et le code se contente de le suivre."));

etape(enu, 4, "L'épreuve", "2 min");
enu.push(p("Ajouter un cinquième mode. Relancer. Rien n'a été touché dans le lecteur, et tout suit."));
enu.push(aDire("c'est le test d'une bonne conception : ce qui change souvent doit se changer à un seul endroit."));

fin(enu, "ENU",
  [[{ t: "À l'étape 3", b: true }, " — oublier les parenthèses : ",
    { t: "mode.ordinal() + 1 % cycle.length", code: true }],
   ["Ça compile, et le lecteur ne bouge plus du premier mode : la priorité du modulo l'emporte sur l'addition."],
   [{ t: "À dire — ", b: true },
    "aucune erreur, aucun avertissement, un comportement faux. Ce sont les pires. Un test l'aurait attrapé tout de suite."]],
  [["CC-MET.2", "des méthodes courtes"],
   ["CC-CLS.4", "une conception qui absorbe le changement"]],
  "L'état d'arrivée contient quatre modes et la version sans condition.");

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
  ". Elle rend un objet, pas un nombre. Taper ", { t: "duree.", code: true },
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
const col = [];
couverture(col, "COL", "Choisir une collection en se trompant d'abord",
           "12 minutes", "avant COL.1");

etape(col, 1, "Une liste, parce que c'est le réflexe", "2 min");
col.push(p("Lancer l'état de départ : une liste d'invités. Turing y est deux fois, et l'ordre est celui des insertions."));
col.push(aDire("quatre invités pour trois personnes. Qui corrige ça, et où ?"));

etape(col, 2, "La mauvaise réponse", "3 min");
col.push(runs([
  "Laisser proposer un ", { t: "if (!invites.contains(nom))", code: true }, " dans ",
  { t: "inviter", code: true }, ". L'écrire. Ça marche."
]));
col.push(aDire("ça marche, et pourtant c'est fragile. La règle vit dans une méthode ; le jour où quelqu'un ajoute une seconde façon d'inviter, il faudra y penser à nouveau."));

etape(col, 3, "La bonne réponse tient en un mot", "3 min");
col.push(runs([
  "Supprimer le test. Remplacer ", { t: "ArrayList", code: true }, " par ",
  { t: "HashSet", code: true }, ", et ", { t: "List", code: true }, " par ",
  { t: "Set", code: true }, ". Relancer : trois invités."
]));
col.push(aDire("la règle n'est plus dans le code, elle est dans la structure. Personne ne peut plus l'oublier, parce qu'il n'y a plus rien à ne pas oublier."));

etape(col, 4, "Le deuxième problème, même remède", "3 min");
col.push(runs([
  "Faire remarquer l'ordre, imprévisible. Laisser proposer un tri à l'affichage. Puis remplacer ",
  { t: "HashSet", code: true }, " par ", { t: "TreeSet", code: true },
  " : un mot, et l'ordre est permanent."
]));
col.push(aDire("il n'y a plus un seul instant où la liste ne soit pas triée. Trier à l'affichage laisse toujours une fenêtre où elle ne l'est pas."));

etape(col, 5, "Récapituler", "1 min");
col.push(tableau(["Ce qu'on veut", "Ce qu'on choisit"], [
  ["un ordre, des doublons permis", "List"],
  ["aucun doublon", "Set"],
  ["aucun doublon, et trié en permanence", "TreeSet"],
  ["une valeur par clé", "Map"]
], [4400, 4960], []));
col.push(aDire("on ne choisit pas une collection par habitude, on la choisit sur la promesse qu'elle tient."));

fin(col, "COL",
  [[{ t: "À l'étape 3", b: true }, " — ne changer que le ", { t: "new", code: true },
    " et laisser la déclaration en ", { t: "List", code: true }, "."],
   ["Le compilateur refuse : un HashSet n'est pas une List. Profiter du message."],
   [{ t: "À dire — ", b: true },
    "le type de la variable est une promesse faite au reste du programme. La changer, c'est changer cette promesse, et le compilateur vérifie que tout le monde suit."]],
  [["CC-OBJ.2", "un objet expose des comportements, pas ses données"],
   ["CC-CLS.4", "confier une règle à la structure plutôt qu'à la vigilance"]],
  "L'état d'arrivée utilise un TreeSet et rend une vue non modifiable.");

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
[["STA", sta], ["GEN", gen], ["ENU", enu], ["TMP", tmp], ["COL", col], ["ABS", abs]]
  .forEach(([nom, contenu]) => {
    Packer.toBuffer(doc(contenu, `Démo ${nom}`)).then(b => {
      fs.writeFileSync(`${__dirname}/../../_demos/Demo_${nom}.docx`, b);
      console.log(`Demo_${nom}.docx :`, Math.round(b.length / 1024), "Ko");
    });
  });
