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
const pkg = [];
couverture(pkg, "PKG", "Déménager une classe, et voir ce qui casse",
  "20 à 25 minutes", "Séance 5, avant les exercices PKG");

pkg.push(h2("L'idée"));
pkg.push(p("Un distributeur de boissons tient dans un seul package et fonctionne très bien. On le découpe en trois packages avec l'outil de refactoring, et la compilation se brise. Ce sont les erreurs qui enseignent : chacune désigne un endroit où le code s'appuyait sur une proximité qui vient de disparaître."));
pkg.push(runs([
  { t: "Le point à faire passer. ", b: true },
  "La visibilité « de package » — celle qu'on obtient en n'écrivant aucun modificateur — est un choix par défaut que personne ne fait consciemment. Elle tient tant que tout est au même endroit, et cède au premier déménagement."
]));

etape(pkg, 1, "Le code qui marche", "3 min");
pkg.push(p("Ouvrir les quatre classes. Lancer. Le café est servi, le thé est inconnu, l'eau manque de vingt centimes, la caisse affiche 0,80."));
pkg.push(runs([
  "Montrer la ligne du ",
  { t: "Demo", code: true },
  " qui va poser problème :"
]));
pkg.push(...code(["distributeur.stock.ajouter(new Boisson(\"Eau\", 1.20));"]));
pkg.push(aDire("On atteint le stock du distributeur, et on lui parle directement. Personne ne nous en empêche. Est-ce que ça vous paraît normal ?"));
pkg.push(p("Montrer aussi qu'aucun champ n'a de modificateur, dans les quatre classes. Poser la question : quelle est leur visibilité ? La réponse — « celle du package » — n'est presque jamais un choix délibéré."));

etape(pkg, 2, "Le déménagement", "5 min");
pkg.push(p("Créer deux packages sous le package de travail : produit et machine. Puis, en direct :"));
pkg.push(tableau(["Classe", "Vers"], [
  ["Boisson", "produit"],
  ["Stock", "produit"],
  ["Distributeur", "machine"],
  ["Demo", "elle ne bouge pas"]
], [3000, 6360], [0]));
pkg.push(runs([
  { t: "Le faire avec l'outil : ", b: true },
  "clic droit sur la classe, ",
  { t: "Refactor > Move Class", code: true },
  ", ou ",
  { t: "F6", code: true },
  ". Pas de glisser-déposer, pas de couper-coller — le guide IntelliJ détaille la manœuvre."
]));
pkg.push(aDire("Regardez ce qu'IntelliJ vient de faire tout seul : il a changé la ligne package en haut du fichier, et il a ajouté les imports partout où il fallait. C'est exactement ce qu'on ferait à la main, en oubliant un endroit sur trois."));

etape(pkg, 3, "Les erreurs, une par une", "8 min");
pkg.push(p("La compilation est maintenant cassée. Ouvrir la liste des erreurs et les traiter dans l'ordre, en lisant chaque message à voix haute avant de corriger."));
pkg.push(tableau(["Ce qui casse", "Pourquoi", "Ce qu'on en fait"], [
  ["Boisson n'est plus visible", "la classe elle-même n'était pas publique", "la rendre publique"],
  ["son constructeur non plus", "même raison", "le rendre public"],
  ["boisson.nom, boisson.prix", "champs sans modificateur, autre package", "les passer en privé, ajouter deux accesseurs"],
  ["stock.ajouter(...) depuis Demo", "méthode sans modificateur", "voir l'étape 4"]
], [2600, 3200, 3560], [0]));
pkg.push(runs([
  { t: "Sur le troisième point, ne pas prendre le raccourci. ", b: true },
  "Le réflexe est de rendre les champs publics : deux clics, et ça compile. Faire remarquer que c'est un engagement définitif — un champ public ne peut plus changer de type ni disparaître — alors qu'un accesseur peut être réécrit sans que personne le sache."
]));
pkg.push(aDire("On vient de transformer une contrainte technique en décision de conception. C'est toujours comme ça que ça se passe : le compilateur pose la question, et c'est vous qui répondez."));

etape(pkg, 4, "La ligne qu'on ne peut plus écrire", "5 min");
pkg.push(runs([
  "Revenir au ",
  { t: "Demo", code: true },
  ". La ligne de l'étape 1 ne compile plus, et il n'y a pas de bonne façon de la faire compiler."
]));
pkg.push(p("Laisser un silence, puis proposer la vraie solution : ce n'est pas au programme d'atteindre le stock, c'est au distributeur de s'approvisionner."));
pkg.push(...code([
  "// avant",
  "distributeur.stock.ajouter(new Boisson(\"Eau\", 1.20));",
  "",
  "// apres",
  "distributeur.approvisionner(new Boisson(\"Eau\", 1.20));"
]));
pkg.push(aDire("Le découpage en packages vient de nous forcer à écrire une meilleure API. On ne l'aurait jamais fait spontanément : tant que tout était au même endroit, rien ne nous dérangeait."));

etape(pkg, 5, "Ce que les imports racontent", "3 min");
pkg.push(runs([
  "Ouvrir ",
  { t: "Distributeur", code: true },
  " et montrer les deux imports en haut."
]));
pkg.push(aDire("Cette liste, c'est la liste des choses dont cette classe dépend. Au début de la démonstration, elle était vide — pas parce qu'il n'y avait pas de dépendances, mais parce qu'on ne les voyait pas."));
pkg.push(p("Conclure sur le lien avec la suite : protected n'a pas servi ici, parce qu'il ne sert à rien sans héritage. Il faudra y revenir après les classes abstraites."));

fin(pkg, "PKG", [
  [{ t: "Le déplacement à la main. ", b: true }, "À l'étape 2, faire exprès de déplacer un fichier en le glissant dans l'arborescence plutôt qu'avec F6. IntelliJ demande alors s'il faut refactoriser — répondre non, et constater que la ligne package est restée fausse. Annuler, et recommencer avec F6."],
  [{ t: "Le réflexe « tout en public ». ", b: true }, "À l'étape 3, corriger d'abord un champ en le passant public, sans commentaire. Puis revenir dessus deux minutes plus tard : « au fait, qu'est-ce qu'on vient de promettre en faisant ça ? »"],
  [{ t: "protected, pour rien. ", b: true }, "Si un étudiant propose protected pour les champs de Boisson, l'essayer. Ça ne compile toujours pas, et le message le dit."]
], [
  ["CC-CLS.1", "une classe fait une chose ; un package aussi"],
  ["CC-OBJ.1", "exposer des méthodes, pas des champs"],
  ["CC-NOM.6", "la longueur du nom suit la portée ; un package est une portée"],
  ["PKG.5", "l'exercice qui reprend protected, une fois l'héritage connu"]
], runs([
  "Le code final est dans ",
  { t: "demos/…/demo/pkg/", code: true },
  ", déjà découpé."
]));

// =====================================================================
//  TAB
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
const fic = [];
couverture(fic, "FIC", "Les mêmes données, deux fichiers, côte à côte",
  "25 minutes", "Séance 12, avant les exercices FIC");

fic.push(h2("L'idée"));
fic.push(p("Écrire le même carnet d'adresses de deux façons, puis ouvrir les deux fichiers dans l'éditeur, l'un à côté de l'autre. Aucune explication ne remplace ce coup d'œil : l'un se lit, l'autre non."));
fic.push(runs([
  { t: "Le point à faire passer. ", b: true },
  "Le choix entre texte et binaire n'est pas une question de goût. Il engage la ",
  { t: "durabilité", b: true },
  " : un fichier texte survit à la mort du programme qui l'a écrit, un fichier binaire non."
]));

etape(fic, 1, "Rien ne survit", "2 min");
fic.push(p("Lancer l'état de départ. Trois contacts s'affichent. Fermer le programme, relancer : les mêmes trois contacts, parce qu'ils sont écrits en dur. Rien n'a été conservé de ce que l'utilisateur aurait pu faire."));

etape(fic, 2, "La version texte", "6 min");
fic.push(runs([
  "Écrire ",
  { t: "enLigne()", code: true },
  " dans Contact, puis la boucle d'écriture."
]));
fic.push(...code([
  "try (PrintWriter sortie = new PrintWriter(TEXTE)) {",
  "    for (Contact contact : carnet) {",
  "        sortie.println(contact.enLigne());",
  "    }",
  "}"
]));
fic.push(runs([
  { t: "S'arrêter sur les parenthèses du try. ", b: true },
  "Elles déclarent une ressource, qui sera fermée automatiquement — même si une exception survient au milieu de la boucle."
]));
fic.push(aDire("Sans ça, il faudrait un finally, et il faudrait penser à l'écrire. Personne n'y pense tout le temps. Le langage a fini par prendre le problème à sa charge."));
fic.push(p("Lancer, puis ouvrir carnet.txt dans IntelliJ. Il est lisible, et modifiable au bloc-notes."));

etape(fic, 3, "La version binaire, et l'échec", "5 min");
fic.push(runs([
  "Écrire l'enregistrement binaire ",
  { t: "sans", b: true },
  " toucher à la classe Contact, et lancer."
]));
fic.push(...code(["java.io.NotSerializableException: …Contact"]));
fic.push(aDire("Java refuse d'écrire un objet dont la classe ne l'a pas autorisé. Il faut une permission explicite."));
fic.push(runs([
  "Ajouter ",
  { t: "implements Serializable", code: true },
  ", et faire remarquer qu'il n'y a ",
  { t: "rien", b: true },
  " à implémenter : aucune méthode, aucun champ. C'est une interface marqueur — elle n'annonce pas un service, elle appose une étiquette."
]));
fic.push(p("Relancer. Une seule instruction écrit la liste entière, là où le texte en demandait une par contact."));

etape(fic, 4, "Les deux fichiers, côte à côte", "5 min");
fic.push(runs([
  { t: "Le moment de la démonstration. ", b: true },
  "Ouvrir carnet.txt et carnet.dat dans deux onglets, et les mettre côte à côte avec ",
  { t: "Split Right", code: true },
  "."
]));
fic.push(tableau(["", "carnet.txt", "carnet.dat"], [
  ["Taille", "95 octets", "278 octets"],
  ["Lisible", "oui", "non"],
  ["Modifiable à la main", "oui — et c'est un risque", "non"],
  ["Relisible par un autre langage", "oui", "non"]
], [2400, 3480, 3480], [0]));
fic.push(runs([
  "Chercher ",
  { t: "be.ephec", code: true },
  " dans le fichier binaire : le nom complet de la classe y figure en clair, au milieu des octets."
]));
fic.push(aDire("Le fichier binaire ne contient pas des données. Il contient des objets Java. Il est plus court à écrire, et il vous enchaîne à la classe qui l'a produit."));

etape(fic, 5, "L'expérience qui décide", "6 min");
fic.push(p("Ajouter un champ à Contact — un pays, par exemple — puis relancer sans réécrire le fichier .dat."));
fic.push(...code([
  "java.io.InvalidClassException: …Contact; local class incompatible:",
  "stream classdesc serialVersionUID = 5183801162750319505,",
  "local class serialVersionUID = -6128983082801885300"
]));
fic.push(p("Le fichier écrit dix minutes plus tôt est devenu illisible. Le fichier texte, lui, s'ouvre toujours."));
fic.push(runs([
  "Montrer la parade : fixer un ",
  { t: "serialVersionUID", code: true },
  " à la main."
]));
fic.push(...code(["private static final long serialVersionUID = 1L;"]));
fic.push(p("Refaire l'expérience : la relecture fonctionne, et le champ ajouté vaut zéro. Ce n'est pas une réparation magique — c'est une affirmation. On dit à Java « c'est toujours la même classe », et on prend la responsabilité de ce que signifie relire un ancien fichier."));
fic.push(aDire("Retenez la règle : du texte pour ce qui doit durer et être lu par d'autres, du binaire pour ce qui est temporaire et ne sort pas de votre programme."));

fin(fic, "FIC", [
  [{ t: "L'oubli de Serializable. ", b: true }, "À l'étape 3, lancer sans l'avoir ajouté. L'exception est courte et parlante, et elle rend la suite évidente."],
  [{ t: "L'ouverture du .dat. ", b: true }, "Ouvrir le fichier binaire dans l'éditeur sans prévenir, et laisser le charabia à l'écran quelques secondes."],
  [{ t: "La modification au bloc-notes. ", b: true }, "Modifier un code postal directement dans carnet.txt, relancer la lecture : ça marche. Puis remplacer le code postal par du texte, et relancer : NumberFormatException. La lisibilité a un prix."],
  [{ t: "Le champ ajouté. ", b: true }, "L'étape 5 ne fonctionne que si le .dat n'est PAS réécrit entre-temps. Commenter l'appel d'écriture avant de relancer, sinon l'expérience rate."]
], [
  ["CC-MET.3", "une méthode ne fait qu'une chose : écrire, ou mettre en forme"],
  ["CC-ERR.1", "ne pas avaler une exception"],
  ["GEN.1", "l'effacement de type, qui explique le transtypage à la relecture"],
  ["STA.2", "depuisLigne() est une fabrique, comme deMinutes()"]
], runs([
  "Les fichiers produits vont dans ",
  { t: "sortie/", code: true },
  ", à la racine du projet. Les supprimer avant de rejouer."
]));

// =====================================================================
Promise.all([
  Packer.toBuffer(doc(pkg, "Démonstration PKG")).then(b =>
    fs.writeFileSync(__dirname + "/../../_demos/Demo_PKG.docx", b)),
  Packer.toBuffer(doc(tab, "Démonstration TAB")).then(b =>
    fs.writeFileSync(__dirname + "/../../_demos/Demo_TAB.docx", b)),
  Packer.toBuffer(doc(fic, "Démonstration FIC")).then(b =>
    fs.writeFileSync(__dirname + "/../../_demos/Demo_FIC.docx", b))
]).then(() => console.log("PKG, TAB et FIC ecrits"));
