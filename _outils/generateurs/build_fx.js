const fs = require("fs");
const B = require(__dirname + "/boite.js");
const {
  p, runs, bullet, bulletRuns, code, h1, h2, tableau, verif, encadre,
  saut, couverture, modeEmploi, doc, Packer, GREY
} = B;

const fx = [];
couverture(fx, "FX", "Interfaces graphiques avec JavaFX",
  "Relier ce qu'on voit à ce qui s'exécute");

modeEmploi(fx, "FX", [
  ["FX.1", "be.ephec.java.fx.e01", "Un compteur de participants"],
  ["FX.2", "be.ephec.java.fx.e02", "Un bouton Reset"],
  ["FX.3", "be.ephec.java.fx.e03", "Deux compteurs, et une mise en page"],
  ["FX.4", "be.ephec.java.fx.e04", "Compter au clavier"],
  ["FX.5", "be.ephec.java.fx.e05", "Un événement voyage"],
  ["FX.6", "be.ephec.java.fx.e06", "Écouter une propriété"],
  ["FX.7", "be.ephec.java.fx.e07", "Un Slider et un Label"],
  ["FX.8", "be.ephec.java.fx.e08", "Une calculatrice, en MVC"]
]);

fx.push(h2("La classe à lancer"));
fx.push(runs([
  "Chaque exercice contient une classe ",
  { t: "Lanceur", code: true },
  ". ",
  { t: "C'est elle qu'il faut exécuter", b: true },
  ", pas celle qui hérite d'Application."
]));
fx.push(runs([
  "Lancer l'autre donne un message déroutant — « des composants d'exécution JavaFX obligatoires sont manquants » — alors que tout est pourtant installé. L'explication tient en une page : ",
  { t: "TEC-FX.4", code: true },
  " du mémento technique."
]));
fx.push(p("Vous n'avez rien à écrire dans cette classe, et rien à y comprendre pour faire les exercices. Lisez la page le jour où la curiosité vous prend, ou celui où vous rencontrerez le message dans un projet à vous."));

fx.push(h2("Ce thème n'a aucune classe de test"));
fx.push(p("C'est le seul du recueil dans ce cas, et ce n'est pas un oubli. On ne vérifie pas une fenêtre par une assertion : il faudrait simuler des clics, attendre que l'affichage se rafraîchisse, et l'on finirait par tester JavaFX plutôt que votre code."));
fx.push(runs([
  { t: "La vérification vous revient donc. ", b: true },
  "Chaque énoncé se termine par une liste de ce que vous devez ",
  { t: "observer", i: true },
  " en lançant l'application. Parcourez-la point par point : c'est elle qui remplace le vert de la barre JUnit."
]));
fx.push(runs([
  "Une exception : le ",
  { t: "Modele", code: true },
  " de ",
  { t: "FX.8", code: true },
  " ne connaît rien à JavaFX, et se teste comme n'importe quelle classe. C'est précisément ce que l'architecture MVC permet de gagner."
]));

fx.push(h2("Le vocabulaire, du plus grand au plus petit"));
fx.push(tableau(["Terme", "Ce que c'est"], [
  ["Stage", "la fenêtre, fournie par le système"],
  ["Scene", "ce que la fenêtre affiche"],
  ["racine", "le composant unique que la scène contient"],
  ["conteneur", "un composant qui en contient d'autres — HBox, VBox, BorderPane"],
  ["contrôle", "un composant avec lequel on interagit — Button, TextField, Slider"]
], [1800, 7560], [0]));
fx.push(...code([
  "public class MonApp extends Application {",
  "",
  "    public static void main(String[] args) { launch(args); }",
  "",
  "    @Override",
  "    public void start(Stage stage) {",
  "        Button bouton = new Button(\"Cliquez\");",
  "        bouton.setOnAction(evenement -> jeFaisQuelqueChose());",
  "",
  "        stage.setScene(new Scene(new HBox(bouton)));",
  "        stage.setTitle(\"Mon application\");",
  "        stage.show();",
  "    }",
  "}"
]));

fx.push(h2("Deux réflexes à prendre tout de suite"));
fx.push(runs([
  { t: "Ce qui doit survivre à start est un champ. ", b: true },
  "Une variable locale de ",
  { t: "start", code: true },
  " disparaît à la fin de la méthode, alors que la fenêtre, elle, reste ouverte. Tout composant que vous devrez relire ou modifier plus tard est donc un champ de la classe."
]));
fx.push(runs([
  { t: "La lambda dit quand, la méthode dit quoi. ", b: true },
  "Écrivez le traitement dans une méthode nommée, et faites-la appeler par la lambda. Vous gagnez un nom, et la possibilité d'appeler le même traitement depuis ailleurs — ce dont ",
  { t: "FX.4", code: true },
  " aura besoin. Voir ",
  { t: "CC-MET.2", code: true },
  "."
]));
fx.push(runs([
  { t: "Si l'application ne démarre pas, ", b: true },
  "voir ",
  { t: "ERR.4", code: true },
  " du guide IntelliJ — « JavaFX runtime components are missing ». C'est le message le plus fréquent des premières minutes, et il n'a rien à voir avec votre code."
]));
fx.push(saut());

// --- FX.1
fx.push(h1("FX.1 — Un compteur de participants"));
fx.push(p("Package : be.ephec.java.fx.e01", { italic: true, color: GREY }));
fx.push(h2("Objectif"));
fx.push(p("Écrire sa première application, et brancher un bouton."));
fx.push(h2("Énoncé"));
fx.push(p("Créez une application composée d'un champ texte et d'un bouton. Elle vous permettra de compter les participants à un événement : à chaque participant, vous enfoncerez le bouton « +1 » et la valeur du champ texte sera incrémentée. La valeur initiale est « 0 »."));
fx.push(tableau(["Élément", "Rôle"], [
  ["TextField", "affiche le compte, en lecture seule"],
  ["Button « +1 »", "ajoute un participant"],
  ["HBox", "range les deux côte à côte"]
], [2600, 6760], [0]));
fx.push(h2("Ce que vous devez observer"));
fx.push(bullet("la fenêtre s'ouvre, porte un titre, et affiche « 0 » ;"));
fx.push(bullet("chaque clic augmente le nombre de un, sans jamais sauter ni revenir en arrière ;"));
fx.push(bullet("on ne peut pas taper dans le champ texte."));
fx.push(h2("Questions à se poser"));
fx.push(bulletRuns([
  "Déclarez le compteur en variable locale de ",
  { t: "start", code: true },
  " plutôt qu'en champ. Que dit le compilateur, et que vous apprend son message ?"
]));
fx.push(bullet("Le champ texte est en lecture seule. Rien ne l'imposait : pourquoi est-ce quand même la bonne décision ?"));
fx.push(bulletRuns([
  "Que se passe-t-il si vous oubliez ",
  { t: "stage.show()", code: true },
  " ? Le programme plante-t-il ?"
]));
fx.push(saut());

// --- FX.2
fx.push(h1("FX.2 — Un bouton Reset"));
fx.push(p("Package : be.ephec.java.fx.e02", { italic: true, color: GREY }));
fx.push(h2("Objectif"));
fx.push(p("Deux gestionnaires sur deux composants, et la première duplication à éviter."));
fx.push(h2("Énoncé"));
fx.push(p("Reprenez l'application précédente en lui ajoutant un bouton « Reset » qui remet le compteur à zéro."));
fx.push(encadre([
  [{ t: "Le squelette vous impose une troisième méthode", b: true }],
  ["incrementer() et remettreAZero() finissent toutes deux par la même chose : écrire le compteur dans le champ. Le squelette déclare rafraichir() pour que cette ligne ne soit écrite qu'une fois."],
  ["Ce n'est pas une coquetterie. Au prochain exercice, vous aurez deux champs, et cette ligne en deviendra deux. Le jour où l'affichage change, vous voudrez avoir un seul endroit à modifier. Voir CC-CLS.3."]
]));
fx.push(h2("Ce que vous devez observer"));
fx.push(bullet("« +1 » continue de fonctionner comme en FX.1 ;"));
fx.push(bullet("« Reset » ramène l'affichage à « 0 », quel que soit le compte atteint ;"));
fx.push(bullet("après un Reset, « +1 » repart bien de 1 et non du nombre précédent."));
fx.push(h2("Questions à se poser"));
fx.push(bullet("Les deux boutons ne se connaissent pas. Où est écrit le lien qui fait qu'ils agissent sur le même compteur ?"));
fx.push(saut());

// --- FX.3
fx.push(h1("FX.3 — Deux compteurs, et une mise en page"));
fx.push(p("Package : be.ephec.java.fx.e03", { italic: true, color: GREY }));
fx.push(h2("Objectif"));
fx.push(p("Composer des conteneurs pour obtenir une disposition à deux colonnes."));
fx.push(h2("Énoncé"));
fx.push(p("Votre application fonctionnant bien, on vous demande maintenant de compter séparément les hommes et les femmes. Ajoutez donc un deuxième bouton et un deuxième champ texte, ainsi qu'un libellé au-dessus de chaque compteur. Le bouton « Reset » remet les deux à zéro."));
fx.push(p("La difficulté n'est plus l'événement, c'est l'agencement. Un HBox range ses enfants côte à côte, un VBox les empile, et on les imbrique :"));
fx.push(...code([
  "VBox",
  " +- HBox          les deux colonnes",
  " |   +- VBox      libelle + champ + bouton, hommes",
  " |   +- VBox      libelle + champ + bouton, femmes",
  " +- Button        Reset"
]));
fx.push(runs([
  { t: "Pour l'espacement : ", b: true },
  { t: "new VBox(10, a, b)", code: true },
  " met dix pixels entre les enfants, et ",
  { t: "setStyle(\"-fx-padding: 15;\")", code: true },
  " donne une marge intérieure au conteneur."
]));
fx.push(h2("Ce que vous devez observer"));
fx.push(bullet("deux colonnes côte à côte, chacune surmontée de son libellé ;"));
fx.push(bullet("chaque bouton « +1 » n'agit que sur son propre compteur ;"));
fx.push(bullet("« Reset » remet les deux à zéro en une fois ;"));
fx.push(bullet("la fenêtre reste lisible si on l'agrandit."));
fx.push(h2("Questions à se poser"));
fx.push(bullet("Les deux colonnes sont identiques à trois choses près. Pouvez-vous les fabriquer par une seule méthode qui prend ces trois choses en paramètres ?"));
fx.push(bulletRuns([
  "Cette méthode rendrait un ",
  { t: "VBox", code: true },
  " au lieu de modifier un état. Pourquoi est-ce préférable ? Voir ",
  { t: "CC-MET.7", code: true },
  "."
]));
fx.push(saut());

// --- FX.4
fx.push(h1("FX.4 — Compter au clavier"));
fx.push(p("Package : be.ephec.java.fx.e04", { italic: true, color: GREY }));
fx.push(h2("Objectif"));
fx.push(p("Traiter un événement qui n'appartient à aucun composant."));
fx.push(h2("Énoncé"));
fx.push(p("Cliquer sur les boutons n'est pas très pratique quand les gens défilent. Faites en sorte que les compteurs s'incrémentent quand on enfonce la touche 1 pour le premier et 2 pour le second, et qu'une pression sur 0 remette les deux à zéro."));
fx.push(p("Les boutons continuent de fonctionner : on ajoute une façon de faire, on n'en retire pas."));
fx.push(encadre([
  [{ t: "Le point délicat", b: true }],
  ["Un événement clavier ne se pose pas sur un bouton : une touche frappée n'appartient à aucun composant en particulier. Posez le gestionnaire sur la racine."],
  [{ t: "racine.addEventHandler(KeyEvent.KEY_TYPED, evenement -> ...)", code: true }],
  ["KEY_TYPED donne le caractère frappé, par getCharacter(). C'est une String, pas un char."]
]));
fx.push(h2("Ce que vous devez observer"));
fx.push(bullet("les touches 1, 2 et 0 agissent comme les boutons correspondants ;"));
fx.push(bullet("les boutons fonctionnent toujours ;"));
fx.push(bullet("toute autre touche ne provoque rien — ni erreur, ni message, ni gel de la fenêtre ;"));
fx.push(bullet("cela marche que vous ayez cliqué sur un bouton juste avant ou non."));
fx.push(h2("Questions à se poser"));
fx.push(bullet("Pourquoi poser le gestionnaire sur la racine plutôt que sur un champ texte fonctionne-t-il même quand un bouton a le focus ? La réponse est le sujet de l'exercice suivant."));
fx.push(bulletRuns([
  "Cherchez la différence entre ",
  { t: "KEY_TYPED", code: true },
  " et ",
  { t: "KEY_PRESSED", code: true },
  ". Laquelle utiliseriez-vous pour réagir à la touche « flèche haut » ?"
]));
fx.push(saut());

// --- FX.5
fx.push(h1("FX.5 — Un événement voyage"));
fx.push(p("Package : be.ephec.java.fx.e05", { italic: true, color: GREY }));
fx.push(h2("Objectif"));
fx.push(p("Constater qu'un événement traverse toute la hiérarchie, deux fois."));
fx.push(h2("Énoncé — première partie"));
fx.push(p("Créez un Stage contenant l'empilement suivant, de l'extérieur vers l'intérieur :"));
fx.push(...code([
  "Stage",
  " +- Scene",
  "     +- BorderPane",
  "         +- StackPane",
  "             +- Rectangle",
  "             +- Circle"
]));
fx.push(runs([
  "Posez un ",
  { t: "EventFilter", code: true },
  " sur le ",
  { t: "BorderPane", code: true },
  " et ",
  { t: "deux", b: true },
  " ",
  { t: "EventHandler", code: true },
  " sur le ",
  { t: "Circle", code: true },
  ", tous pour ",
  { t: "MouseEvent.MOUSE_CLICKED", code: true },
  ". Chacun affiche une ligne sur la console."
]));
fx.push(p("Cliquez sur le cercle. Les trois s'affichent. Notez l'ordre : il n'est pas celui qu'on attend."));
fx.push(h2("Énoncé — seconde partie"));
fx.push(p("Modifiez votre code pour que les deux gestionnaires du cercle ne réagissent plus — sans les supprimer, et sans toucher au cercle. Une seule ligne suffit, dans le filtre."));
fx.push(h2("Ce que vous devez observer"));
fx.push(bullet("le filtre du conteneur s'affiche AVANT les deux gestionnaires du cercle ;"));
fx.push(bullet("les deux gestionnaires s'exécutent tous les deux, dans l'ordre où ils ont été posés ;"));
fx.push(bullet("un clic sur le rectangle, à côté du cercle, ne déclenche que le filtre ;"));
fx.push(bullet("après la seconde partie, plus aucune ligne du cercle ne s'affiche."));
fx.push(h2("Questions à se poser"));
fx.push(bullet("Filtre et gestionnaire portent deux noms parce qu'ils interviennent à deux moments. Lesquels, et dans quel sens l'événement va-t-il à chaque fois ?"));
fx.push(bulletRuns([
  "Deux gestionnaires sur le même événement s'exécutent tous les deux. En quoi est-ce différent de ",
  { t: "setOnMouseClicked", code: true },
  ", appelé deux fois ?"
]));
fx.push(bullet("Citez un cas réel où l'on veut qu'un conteneur empêche ses enfants de réagir."));
fx.push(saut());

// --- FX.6
fx.push(h1("FX.6 — Écouter une propriété"));
fx.push(p("Package : be.ephec.java.fx.e06", { italic: true, color: GREY }));
fx.push(h2("Objectif"));
fx.push(p("Réagir à un changement de valeur, ce qui n'est pas réagir à un événement."));
fx.push(h2("Énoncé"));
fx.push(runs([
  "Cherchez dans la Javadoc de ",
  { t: "TextField", code: true },
  " : a-t-elle des propriétés ? Trouvez celle à laquelle il faut ajouter un Listener pour afficher les valeurs successives encodées dans le champ. Écrivez l'application qui met cela en œuvre."
]));
fx.push(encadre([
  [{ t: "La démarche compte autant que le résultat", b: true }],
  ["Ne cherchez pas la réponse ailleurs que dans l'éditeur. Ctrl+Q sur le type ouvre sa Javadoc ; la complétion vous donne la liste de ses méthodes."],
  ["Une propriété se reconnaît à son accesseur : une méthode dont le nom finit par Property et qui rend un objet, non une valeur. C'est exactement la démarche de la démonstration TMP."]
]));
fx.push(h2("Ce que vous devez observer"));
fx.push(bullet("chaque caractère tapé produit une ligne sur la console ;"));
fx.push(bullet("effacer un caractère en produit une aussi ;"));
fx.push(bulletRuns([
  "coller du texte avec ",
  { t: "Ctrl+V", code: true },
  " en produit une seule, avec toute la valeur — et c'est là que cette approche bat un gestionnaire de touches ;"
]));
fx.push(bullet("l'ancienne et la nouvelle valeur sont toutes deux disponibles."));
fx.push(h2("Questions à se poser"));
fx.push(bullet("Le Listener reçoit trois arguments. À quoi sert le premier, que l'on ignore presque toujours ?"));
fx.push(bullet("Un gestionnaire sur KEY_TYPED aurait-il détecté un collage ? Et une modification faite par le programme lui-même ?"));
fx.push(saut());

// --- FX.7
fx.push(h1("FX.7 — Un Slider et un Label"));
fx.push(p("Package : be.ephec.java.fx.e07", { italic: true, color: GREY }));
fx.push(h2("Objectif"));
fx.push(p("Refaire le geste précédent sur une valeur numérique, et rencontrer deux pièges."));
fx.push(h2("Énoncé"));
fx.push(runs([
  "Le ",
  { t: "Slider", code: true },
  " présente une ",
  { t: "valueProperty", code: true },
  " liée à la valeur du curseur. Écrivez une application dans laquelle un ",
  { t: "Label", code: true },
  " se met à jour en fonction de cette valeur, à l'aide d'un ",
  { t: "ChangeListener", code: true },
  "."
]));
fx.push(tableau(["Le piège", "Ce qu'il faut faire"], [
  ["le Listener reçoit un Number, pas un double", "nouvelleValeur.doubleValue()"],
  ["un double brut s'affiche avec quinze décimales", "String.format(\"%1$,.2f\", valeur)"],
  ["un Listener ne se déclenche qu'aux changements", "afficher la valeur initiale avant l'ouverture"]
], [4200, 5160], []));
fx.push(runs([
  { t: "Une remarque sur le formatage. ", b: true },
  "Tous les exercices depuis ",
  { t: "TAB.1", code: true },
  " imposaient ",
  { t: "Locale.US", code: true },
  " pour que le résultat soit prévisible et donc testable. Ici, c'est un humain qui lit : laissez la locale de la machine faire son travail. Le même réflexe donnerait la mauvaise réponse."
]));
fx.push(h2("Ce que vous devez observer"));
fx.push(bullet("le Label affiche une valeur dès l'ouverture, sans qu'on ait touché au curseur ;"));
fx.push(bullet("la valeur suit le curseur pendant le glissement, pas seulement au relâchement ;"));
fx.push(bullet("deux décimales, jamais quinze ;"));
fx.push(bullet("les bornes 0 et 100 s'affichent correctement."));
fx.push(h2("Questions à se poser"));
fx.push(bulletRuns([
  "Retirez l'appel qui affiche la valeur initiale. Que voit l'utilisateur en ouvrant l'application, et pourquoi est-ce gênant ?"
]));
fx.push(bullet("Pourquoi le Listener reçoit-il un Number alors que la propriété est une DoubleProperty ?"));
fx.push(saut());

// --- FX.8
fx.push(h1("FX.8 — Une calculatrice, en MVC"));
fx.push(p("Package : be.ephec.java.fx.e08", { italic: true, color: GREY }));
fx.push(h2("Objectif"));
fx.push(p("Construire une application complète, et séparer ce qui s'affiche de ce qui calcule."));
fx.push(h2("Contexte : l'architecture MVC"));
fx.push(p("Dès qu'une application dépasse quelques composants, on sépare trois responsabilités."));
fx.push(tableau(["Rôle", "Ce qu'il fait", "Ici"], [
  ["le Modèle", "les données et la logique métier", "Modele.java — à écrire"],
  ["la Vue", "la description de l'écran", "calculatrice.fxml — fourni"],
  ["le Contrôleur", "écoute la vue, interroge le modèle, met la vue à jour", "Controleur.java — à écrire"]
], [1900, 4400, 3060], [0]));
fx.push(runs([
  { t: "Le modèle ne connaît rien à JavaFX. ", b: true },
  "Aucun import, aucune référence à un composant. C'est ce qui le rend testable : vous pourriez écrire une classe de test JUnit pour ",
  { t: "calculer()", code: true },
  ", alors qu'aucun test ne peut vérifier une fenêtre."
]));
fx.push(h2("Le FXML, et les deux mécanismes à comprendre"));
fx.push(p("La vue vous est fournie. Lisez-la : tout ce qu'elle contient remplace du code que vous auriez écrit à la main dans les sept exercices précédents."));
fx.push(tableau(["Dans le FXML", "Dans le contrôleur"], [
  ["fx:controller=\"...Controleur\"", "désigne la classe qui reçoit les événements"],
  ["fx:id=\"affichage\"", "@FXML private Text affichage — injecté au chargement"],
  ["onAction=\"#chiffrePresse\"", "@FXML private void chiffrePresse(ActionEvent)"]
], [3400, 5960], []));
fx.push(h2("Énoncé"));
fx.push(runs([
  "Complétez ",
  { t: "Modele", code: true },
  " et ",
  { t: "Controleur", code: true },
  ". ",
  { t: "ApplicationCalculatrice", code: true },
  " et le FXML vous sont fournis."
]));
fx.push(tableau(["Méthode", "Ce qu'elle fait"], [
  ["Modele.calculer", "applique l'opérateur — \"+\", \"-\", \"x\" ou \"/\" — aux deux nombres"],
  ["chiffrePresse", "un seul gestionnaire pour les dix boutons de chiffres"],
  ["operateurPresse", "les opérateurs et le « = »"],
  ["effacer", "le bouton « C »"]
], [2600, 6760], [0]));
fx.push(encadre([
  [{ t: "Un seul gestionnaire pour dix boutons", b: true }],
  ["Le FXML branche les dix chiffres sur la même méthode. C'est l'événement qui dit lequel a été pressé :"],
  [{ t: "String chiffre = ((Button) evenement.getSource()).getText();", code: true }],
  ["Écrire dix méthodes aurait fonctionné, et aurait été dix fois la même chose."]
]));
fx.push(h2("La logique, une fois posée"));
fx.push(p("Quand on presse un opérateur : s'il y avait déjà un opérateur en attente, on calcule ; on affiche le résultat ; on retient le nouvel opérateur. Le « = » suit le même chemin, sauf qu'il ne met rien en attente."));
fx.push(p("Le contrôleur doit donc retenir, entre deux clics, le premier nombre et l'opérateur choisi. Réfléchissez aussi au cas du tout premier opérateur pressé : il n'y a rien en attente."));
fx.push(h2("Deux règles d'affichage imposées"));
fx.push(bullet("si l'écran montre « 0 », un chiffre le remplace ; sinon il s'y accole — sans quoi taper 5 puis 6 afficherait « 056 » ;"));
fx.push(bullet("après un opérateur, le chiffre suivant repart de zéro — sans quoi 5 + 6 afficherait « 56 »."));
fx.push(h2("La division par zéro"));
fx.push(runs([
  "La calculatrice affiche ",
  { t: "Erreur", code: true },
  " et se remet à zéro. Le modèle lève une exception plutôt que de rendre 0 : rendre 0 ferait passer une erreur pour un résultat, et le contrôleur continuerait à calculer avec une valeur fausse. Voir ",
  { t: "CC-ERR.1", code: true },
  "."
]));
fx.push(h2("Ce que vous devez observer"));
fx.push(bullet("12 + 5 = affiche 17 ; 12 − 5 = affiche 7 ; 12 x 5 = affiche 60 ;"));
fx.push(bullet("13 / 4 = affiche 3, parce que le modèle travaille sur des entiers ;"));
fx.push(bullet("1 / 0 = affiche « Erreur », et la calculatrice repart proprement ensuite ;"));
fx.push(bullet("taper 5 puis 6 affiche « 56 », et non « 056 » ;"));
fx.push(bullet("après 5 +, taper 6 affiche « 6 » et non « 56 » ;"));
fx.push(bullet("2 + 3 + 4 = affiche 9 : chaque opérateur calcule ce qui précède ;"));
fx.push(bullet("« C » remet tout à zéro, y compris l'opérateur en attente."));
fx.push(h2("Questions à se poser"));
fx.push(bullet("Écrivez une classe de test JUnit pour le Modèle. Combien de temps cela vous prend-il ? Et pour le contrôleur ?"));
fx.push(bulletRuns([
  "Le champ ",
  { t: "affichage", code: true },
  " vaut ",
  { t: "null", code: true },
  " tant que le FXML n'est pas chargé. Où pourriez-vous mettre du code qui s'exécute juste après l'injection ? Cherchez ",
  { t: "initialize", code: true },
  " dans la documentation de FXML."
]));
fx.push(bullet("La vue ne connaît pas le modèle, et le modèle ne connaît pas la vue. Qui fait le lien, et que se passerait-il si on l'enlevait ?"));

Packer.toBuffer(doc(fx, "Exercices Java — Thème FX")).then(b => {
  fs.writeFileSync(__dirname + "/../../enonces/FX_enonces.docx", b);
  console.log("FX :", Math.round(b.length / 1024), "Ko");
});
