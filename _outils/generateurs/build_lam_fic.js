const fs = require("fs");
const B = require(__dirname + "/boite.js");
const {
  p, runs, bullet, bulletRuns, code, h1, h2, tableau, verif, encadre,
  saut, couverture, modeEmploi, doc, Packer, GREY
} = B;

// =====================================================================
//  LAM
// =====================================================================
const lam = [];
couverture(lam, "LAM", "Lambdas et références de méthodes",
  "Passer un comportement comme on passe une valeur");

modeEmploi(lam, "LAM", [
  ["LAM.1", "be.ephec.java.lam.e01", "Un tableau de comportements"],
  ["LAM.2", "be.ephec.java.lam.e02", "Écrire son interface fonctionnelle"],
  ["LAM.3", "be.ephec.java.lam.e03", "Celle du JDK, et les références de méthodes"]
]);

lam.push(h2("Ce qui change, et ce qui ne change pas"));
lam.push(runs([
  "Vous savez déjà tout faire. En ",
  { t: "ITF.1", code: true },
  ", une méthode recevait un ",
  { t: "Calculateur", code: true },
  " en paramètre et déclenchait un calcul sans savoir lequel. En ",
  { t: "COL.5", code: true },
  ", vous avez écrit une classe ",
  { t: "EstPair", code: true },
  " pour la passer à ",
  { t: "removeIf", code: true },
  "."
]));
lam.push(p("Ce thème n'ajoute aucune capacité. Il ajoute une écriture — et une écriture qui change tout, parce qu'elle rend praticable ce qui était seulement possible."));
lam.push(...code([
  "new Calculateur() {                       // classe anonyme",
  "    public int calcul(int n) { return n * n; }",
  "}",
  "",
  "(int n) -> { return n * n; }              // lambda complete",
  "",
  "n -> n * n                                // lambda abregee"
]));
lam.push(p("Les trois produisent exactement le même objet. On peut omettre le type du paramètre, les parenthèses s'il est unique, les accolades et le return si le corps tient en une expression."));
lam.push(h2("Une seule condition"));
lam.push(runs([
  "Une lambda ne s'écrit que pour une interface ",
  { t: "fonctionnelle", i: true },
  " : une interface qui ne déclare qu'UNE méthode abstraite. Sans cela, le compilateur ne saurait pas quelle méthode vous êtes en train d'implémenter."
]));
lam.push(runs([
  "L'annotation ",
  { t: "@FunctionalInterface", code: true },
  " n'est pas obligatoire, mais elle demande au compilateur de vérifier cette règle. Si quelqu'un ajoute une seconde méthode plus tard, il le signalera — au lieu de laisser toutes les lambdas cesser de compiler sans explication."
]));
lam.push(saut());

// --- LAM.1
lam.push(h1("LAM.1 — Un tableau de comportements"));
lam.push(p("Package : be.ephec.java.lam.e01", { italic: true, color: GREY }));
lam.push(h2("Objectif"));
lam.push(p("Écrire ses premières lambdas, et ranger des comportements dans un tableau."));
lam.push(h2("Énoncé"));
lam.push(runs([
  "L'interface ",
  { t: "Calculateur", code: true },
  " vous est fournie : elle déclare ",
  { t: "int calcul(int n)", code: true },
  " et rien d'autre. Complétez la classe ",
  { t: "Calculs", code: true },
  "."
]));
lam.push(tableau(["Élément", "Signature", "Rôle"], [
  ["traite", "public static int traite(int, Calculateur)", "Applique le calculateur au nombre"],
  ["calculateurs", "public static Calculateur[] calculateurs()", "Quatre lambdas : carré, double, opposé, inchangé"],
  ["tousLesCalculs", "public static String tousLesCalculs(int)", "Les quatre résultats, séparés par une espace"]
], [2200, 4000, 3160]));
lam.push(...code([
  "tousLesCalculs(3)    ->  \"9 6 -3 3\"",
  "tousLesCalculs(-2)   ->  \"4 -4 2 -2\""
]));
lam.push(h2("Le point de l'exercice"));
lam.push(runs([
  { t: "Un tableau de calculateurs. ", b: true },
  "On y range des comportements comme on rangerait des nombres, et le programme les applique sans savoir ce qu'ils font. Comparez avec ",
  { t: "ITF.1", code: true },
  " : la même idée demandait quatre fichiers, elle tient ici en quatre lignes."
]));
lam.push(h2("Comment vérifier votre code"));
lam.push(verif([
  { t: "be.ephec.java.lam.e01.CalculsTest", code: true },
  { t: "Vérifie la délégation, le contenu et l'ordre du tableau, les résultats combinés, et le fait qu'une lambda écrite dans le test — un cube, absent du tableau — fonctionne tout autant." }
]));
lam.push(h2("Questions à se poser"));
lam.push(bulletRuns([
  "Écrivez ",
  { t: "n -> n * n", code: true },
  " sous ses trois formes, de la classe anonyme à la lambda abrégée. Laquelle préférez-vous relire ? Laquelle préférez-vous écrire ?"
]));
lam.push(bulletRuns([
  "Ajoutez une seconde méthode à l'interface ",
  { t: "Calculateur", code: true },
  ". Que dit le compilateur, et sur quelle ligne ?"
]));
lam.push(bulletRuns([
  "Une lambda n'a pas de nom, et pourtant elle fait quelque chose. Comment le lecteur sait-il quoi ? Voir ",
  { t: "CC-MET.1", code: true },
  " : quand le nom disparaît, c'est la variable qui la reçoit qui doit parler."
]));
lam.push(saut());

// --- LAM.2
lam.push(h1("LAM.2 — Écrire son interface fonctionnelle"));
lam.push(p("Package : be.ephec.java.lam.e02", { italic: true, color: GREY }));
lam.push(h2("Objectif"));
lam.push(p("Faire passer un critère de sélection en paramètre."));
lam.push(h2("Énoncé"));
lam.push(runs([
  "Complétez l'interface fonctionnelle ",
  { t: "Filtrage", code: true },
  " — une seule méthode, ",
  { t: "boolean test(int valeur)", code: true },
  " — puis la méthode ",
  { t: "Affichage.selectionner(int[], Filtrage)", code: true },
  ", qui rend les éléments retenus séparés par une espace."
]));
lam.push(...code([
  "int[] tableau = {1, 4, -9, 5, -7, -3, 2};",
  "",
  "selectionner(tableau, e -> e > 0)    ->  \"1 4 5 2\"",
  "selectionner(tableau, e -> e < 0)    ->  \"-9 -7 -3\"",
  "selectionner(tableau, e -> e > 1000) ->  \"\""
]));
lam.push(runs([
  "Le ",
  { t: "Programme", code: true },
  " affiche les positifs, en passant le critère sous forme d'expression lambda."
]));
lam.push(h2("La question à garder"));
lam.push(runs([
  "Cherchez, parmi les interfaces fonctionnelles du JDK vues au cours, celle qui ferait exactement le travail de votre ",
  { t: "Filtrage", code: true },
  ". Elle vit dans ",
  { t: "java.util.function", code: true },
  ". ",
  { t: "LAM.3", code: true },
  " s'en sert, et votre interface disparaît."
]));
lam.push(h2("Comment vérifier votre code"));
lam.push(verif([
  { t: "be.ephec.java.lam.e02.AffichageTest", code: true },
  { t: "Vérifie quatre filtres différents — dont un qui ne retient rien et un qui retient tout — et le cas du tableau vide." },
  { t: "Remarquez que le test passe des lambdas que la méthode n'a jamais vues. C'est le même service qu'en ITF.1 : selectionner ne connaît que l'interface." }
]));
lam.push(h2("Questions à se poser"));
lam.push(bulletRuns([
  "Le séparateur ne doit apparaître ni avant le premier élément ni après le dernier. Vous aviez déjà résolu ce problème en ",
  { t: "TAB.1", code: true },
  " : la solution est-elle la même ?"
]));
lam.push(bullet("Une lambda peut-elle utiliser une variable locale déclarée avant elle ? Essayez, puis essayez de modifier cette variable ensuite."));
lam.push(bulletRuns([
  "Une lambda qui modifie quelque chose au passage est légale, et c'est un piège. Voir ",
  { t: "CC-MET.7", code: true },
  "."
]));
lam.push(saut());

// --- LAM.3
lam.push(h1("LAM.3 — Celle du JDK, et les références de méthodes"));
lam.push(p("Package : be.ephec.java.lam.e03", { italic: true, color: GREY }));
lam.push(h2("Objectif"));
lam.push(p("Découvrir que le JDK avait déjà l'interface, et donner un nom à ses critères."));
lam.push(h2("Énoncé — première partie"));
lam.push(runs([
  { t: "Filtrage", code: true },
  " était un doublon. ",
  { t: "java.util.function.IntPredicate", code: true },
  " déclare exactement ",
  { t: "boolean test(int)", code: true },
  ". Reprenez ",
  { t: "selectionner", code: true },
  " en l'utilisant : rien d'autre ne change."
]));
lam.push(runs([
  { t: "Ce n'était pas du temps perdu. ", b: true },
  "En écrivant votre propre interface, vous avez compris ce qu'est une interface fonctionnelle. Mais avant d'en écrire une, regardez désormais ce que contient ",
  { t: "java.util.function", code: true },
  " : ",
  { t: "Predicate", code: true },
  ", ",
  { t: "Function", code: true },
  ", ",
  { t: "Supplier", code: true },
  ", ",
  { t: "Consumer", code: true },
  " et leurs variantes primitives couvrent la plupart des besoins."
]));
lam.push(h2("Énoncé — seconde partie"));
lam.push(runs([
  "Écrivez trois méthodes statiques — ",
  { t: "estPositif", code: true },
  ", ",
  { t: "estNegatif", code: true },
  ", ",
  { t: "estPair", code: true },
  " — chacune sur une ligne, avec la signature qu'attend ",
  { t: "IntPredicate", code: true },
  ". Puis la méthode ",
  { t: "rapport", code: true },
  ", qui les passe par ",
  { t: "référence de méthode", b: true },
  " :"
]));
lam.push(...code([
  "Affichage::estPositif          au lieu de       e -> e > 0"
]));
lam.push(p("Le rapport tient en trois lignes, sans retour à la ligne final :"));
lam.push(...code([
  "Les positifs: 1 4 5 2",
  "Les negatifs: -9 -7 -3",
  "Les pairs: 4 2"
]));
lam.push(encadre([
  [{ t: "Lambda ou référence de méthode ?", b: true }],
  ["Les deux produisent le même objet, et sont interchangeables — le test le vérifie explicitement."],
  ["La lambda est anonyme et s'écrit sur place : parfaite pour un critère utilisé une fois. La référence donne un nom au critère, ce qui le rend réutilisable et testable séparément — la classe de test vérifie d'ailleurs les trois critères isolément avant de vérifier le rapport."],
  ["Le nom est aussi une explication. Comparez « e -> e % 2 == 0 » et « estPair » dans une expression un peu longue. Voir CC-NOM.1."]
]));
lam.push(h2("Comment vérifier votre code"));
lam.push(verif([
  { t: "be.ephec.java.lam.e03.AffichageTest", code: true },
  { t: "Vérifie les trois critères isolément — y compris zéro, qui n'est ni positif ni négatif mais bien pair —, l'équivalence entre lambda et référence de méthode, et le format du rapport." }
]));
lam.push(h2("Questions à se poser"));
lam.push(bulletRuns([
  "Reprenez ",
  { t: "COL.5", code: true },
  " et remplacez la classe ",
  { t: "EstPair", code: true },
  " par une lambda, puis par une référence de méthode. Combien de lignes disparaissent ?"
]));
lam.push(bulletRuns([
  "Une référence de méthode s'écrit aussi sur une instance — ",
  { t: "monObjet::maMethode", code: true },
  " — et sur un constructeur — ",
  { t: "Etudiant::new", code: true },
  ". Cherchez dans quel contexte cette dernière forme sert."
]));
lam.push(bullet("Vos trois critères sont des méthodes statiques. Auraient-ils pu être des méthodes d'instance ? Qu'est-ce qui change à l'appel ?"));

// =====================================================================
//  FIC
// =====================================================================
const fic = [];
couverture(fic, "FIC", "Fichiers",
  "Faire survivre des objets à l'arrêt du programme");

modeEmploi(fic, "FIC", [
  ["FIC.1", "be.ephec.java.fic.e01", "Trois classes qui se connaissent"],
  ["FIC.2", "be.ephec.java.fic.e02", "Enregistrer des objets"],
  ["FIC.3", "be.ephec.java.fic.e03", "Enregistrer du texte"]
]);

fic.push(h2("Ce qu'il faut avoir en tête"));
fic.push(p("Tout ce que votre programme construit disparaît quand il s'arrête. Écrire dans un fichier est la façon la plus simple de faire survivre une information — et il y a deux façons de s'y prendre, aux propriétés opposées."));
fic.push(tableau(["", "Sérialisation (.dat)", "Texte (.txt)"], [
  ["Ce qu'on écrit", "l'objet entier, tel quel", "ce qu'on a décidé d'écrire"],
  ["Qui peut le lire", "un programme Java, et lui seul", "n'importe qui, n'importe quoi"],
  ["Si la classe change", "les anciens fichiers deviennent illisibles", "le fichier reste lisible"],
  ["Effort d'écriture", "presque nul", "il faut choisir un format"]
], [2100, 3800, 3460], []));
fic.push(runs([
  { t: "Aucun des deux n'est meilleur. ", b: true },
  "La question à se poser est : qui lira ce fichier, et quand ? ",
  { t: "FIC.2", code: true },
  " et ",
  { t: "FIC.3", code: true },
  " enregistrent exactement les mêmes étudiants, et vous comparerez les deux résultats."
]));
fic.push(h2("Deux réflexes à prendre"));
fic.push(runs([
  { t: "Le try-avec-ressources. ", b: true },
  "Un flux doit être fermé, y compris si une exception survient au milieu. Cette écriture s'en charge toute seule :"
]));
fic.push(...code([
  "try (PrintWriter sortie = new PrintWriter(new FileWriter(fichier))) {",
  "    sortie.println(\"...\");",
  "}   // ferme automatiquement, meme en cas d'exception"
]));
fic.push(runs([
  { t: "Les exceptions d'entrée-sortie sont contrôlées. ", b: true },
  "Un fichier peut être absent, verrouillé, plein. Le compilateur vous obligera donc à traiter ou à déclarer ",
  { t: "IOException", code: true },
  " — voir le tableau du thème ",
  { t: "EXC", code: true },
  "."
]));
fic.push(saut());

// --- FIC.1
fic.push(h1("FIC.1 — Trois classes qui se connaissent"));
fic.push(p("Package : be.ephec.java.fic.e01", { italic: true, color: GREY }));
fic.push(h2("Objectif"));
fic.push(p("Construire le petit modèle qui servira aux deux exercices suivants. Aucun fichier ici."));
fic.push(h2("Énoncé"));
fic.push(tableau(["Classe", "Ce qu'elle porte", "Méthodes"], [
  ["Enseignant", "nom, prénom — au constructeur", "les accesseurs, toString"],
  ["Cours", "intitulé au constructeur, chargé de cours modifiable", "accesseurs, setter, toString"],
  ["Etudiant", "nom, prénom au constructeur ; la liste de cours démarre vide", "inscrire, desinscrire, getCours, nombreDeCours, toString"]
], [1600, 4000, 3760], [0]));
fic.push(p("Les formats de toString sont imposés :"));
fic.push(...code([
  "Enseignant   ->  \"Alan Turing\"",
  "Cours        ->  \"Java (Alan Turing)\"",
  "Etudiant     ->  \"Lovelace Ada : Java, Algebre\"",
  "             ->  \"Lovelace Ada\"          s'il n'a aucun cours"
]));
fic.push(p("Une seconde inscription au même cours ne change rien ; désinscrire un cours absent ne provoque pas d'erreur."));
fic.push(encadre([
  [{ t: "Ce que rend getCours", b: true }],
  ["Un test vérifie qu'on ne peut pas vider l'étudiant à travers la liste qu'il rend. Si vous rendez la liste elle-même, n'importe qui peut appeler clear() dessus et contourner desinscrire — l'encapsulation ne sert alors plus à rien."],
  ["Cherchez Collections.unmodifiableList dans la Javadoc. Voir CC-OBJ.2 du mémento Clean Code."]
]));
fic.push(h2("Comment vérifier votre code"));
fic.push(verif([
  { t: "be.ephec.java.fic.e01.EtudiantTest", code: true },
  { t: "Vérifie les trois classes, les formats de toString, l'inscription et la désinscription — y compris les cas sans effet — et la protection de la liste rendue." }
]));
fic.push(saut());

// --- FIC.2
fic.push(h1("FIC.2 — Enregistrer des objets"));
fic.push(p("Package : be.ephec.java.fic.e02", { italic: true, color: GREY }));
fic.push(h2("Objectif"));
fic.push(p("Écrire des objets dans un fichier et les relire, sans écrire une ligne de format."));
fic.push(h2("Contexte"));
fic.push(runs([
  "Les trois classes de ",
  { t: "FIC.1", code: true },
  " vous sont fournies ici, complètes, avec une seule différence : elles implémentent ",
  { t: "Serializable", code: true },
  "."
]));
fic.push(runs([
  "Cette interface ne déclare AUCUNE méthode. C'est un marqueur : une façon de dire à la JVM « cette classe accepte d'être transformée en octets ». Sans elle, l'écriture lèverait ",
  { t: "NotSerializableException", code: true },
  "."
]));
fic.push(h2("Énoncé"));
fic.push(tableau(["Élément", "Signature", "Rôle"], [
  ["enregistrer", "public static void enregistrer(List<Etudiant>, File)", "Écrit la liste, en un seul writeObject"],
  ["relire", "public static List<Etudiant> relire(File)", "Relit la liste"]
], [1900, 4400, 3060]));
fic.push(runs([
  { t: "Les deux classes à connaître : ", b: true },
  { t: "ObjectOutputStream", code: true },
  " construit sur un ",
  { t: "FileOutputStream", code: true },
  " pour écrire, ",
  { t: "ObjectInputStream", code: true },
  " sur un ",
  { t: "FileInputStream", code: true },
  " pour relire."
]));
fic.push(h2("Trois choses à observer"));
fic.push(runs([
  { t: "Un seul writeObject suffit pour toute la liste. ", b: true },
  "La sérialisation suit les références : écrire la liste écrit les étudiants, donc leurs cours, donc leurs enseignants. C'est pourquoi les trois classes doivent être ",
  { t: "Serializable", code: true },
  ", et pas seulement celle qu'on nomme. Le test le vérifie."
]));
fic.push(runs([
  { t: "readObject rend un Object. ", b: true },
  "Un transtypage est inévitable, et le compilateur avertit qu'il ne peut pas le vérifier. Ce n'est pas une erreur de votre part : la sérialisation est antérieure à la généricité, et le fichier ne contient aucune trace du type paramétré."
]));
fic.push(runs([
  { t: "Ouvrez etudiants.dat dans un éditeur de texte. ", b: true },
  "Vous y verrez quelques noms de classes noyés dans des octets illisibles. Le format est fait pour la JVM, pas pour vous. Gardez l'image : ",
  { t: "FIC.3", code: true },
  " prend l'autre parti."
]));
fic.push(h2("Comment vérifier votre code"));
fic.push(verif([
  { t: "be.ephec.java.fic.e02.EnregistrementTest", code: true },
  { t: "Vérifie la création du fichier, l'aller-retour complet, la conservation des cours et de leurs enseignants, et le cas de la liste vide." },
  { t: "Le test écrit dans un dossier temporaire fourni par JUnit — l'annotation @TempDir — créé avant le test et supprimé après. Vos tests ne laisseront jamais de fichiers dans le projet." }
]));
fic.push(h2("Questions à se poser"));
fic.push(bulletRuns([
  "Que se passe-t-il si relire reçoit un fichier qui n'existe pas ? Votre méthode doit-elle retourner null, une liste vide, ou lever une exception ? Voir ",
  { t: "CC-ERR.1", code: true },
  " et ",
  { t: "CC-ERR.2", code: true },
  "."
]));
fic.push(bullet("Renommez un champ d'Etudiant, puis relisez un fichier écrit avant le changement. Que se passe-t-il ? Cherchez ce qu'est un serialVersionUID."));
fic.push(bullet("Un mot de passe stocké dans un champ part-il dans le fichier ? Cherchez le mot-clé transient."));
fic.push(bulletRuns([
  "Le message d'erreur que vous affichez en cas d'échec dit-il quel fichier a échoué ? Voir ",
  { t: "CC-ERR.4", code: true },
  "."
]));
fic.push(saut());

// --- FIC.3
fic.push(h1("FIC.3 — Enregistrer du texte"));
fic.push(p("Package : be.ephec.java.fic.e03", { italic: true, color: GREY }));
fic.push(h2("Objectif"));
fic.push(p("Enregistrer les mêmes données dans un format lisible, et mesurer ce qu'on y gagne et ce qu'on y perd."));
fic.push(h2("Énoncé"));
fic.push(tableau(["Élément", "Signature", "Rôle"], [
  ["ecrire", "public static void ecrire(List<Etudiant>, File)", "Un étudiant par ligne"],
  ["lireLignes", "public static List<String> lireLignes(File)", "Les lignes du fichier, telles quelles"],
  ["relire", "public static List<Etudiant> relire(File)", "Reconstruit les étudiants"]
], [1900, 4400, 3060]));
fic.push(p("Le format est imposé : le nom, le prénom et les intitulés de cours séparés par des points-virgules ; les cours séparés entre eux par des virgules."));
fic.push(...code([
  "Lovelace;Ada;Java,Algebre",
  "Turing;Alan;"
]));
fic.push(runs([
  { t: "Un piège à l'analyse. ", b: true },
  { t: "\"Turing;Alan;\".split(\";\")", code: true },
  " rend un tableau de DEUX éléments, pas trois : ",
  { t: "split", code: true },
  " supprime les champs vides de fin. Le second argument ",
  { t: "-1", code: true },
  " le lui interdit. Le test contient un étudiant sans cours, précisément pour ça."
]));
fic.push(h2("La comparaison"));
fic.push(p("Les cours reconstruits n'ont plus de chargé de cours : le format texte ne l'a pas écrit. Créez donc un enseignant « Inconnu Inconnu » pour chacun — et mesurez ce que cela signifie."));
fic.push(encadre([
  [{ t: "La question de fond", b: true }],
  ["Le .dat conserve tout, mais ne se lit que par un programme Java, et seulement tant que les classes n'ont pas changé. Le .txt ne conserve que ce qu'on a décidé d'écrire, mais s'ouvre dans n'importe quel éditeur, se traite par un tableur ou par un autre langage, et survit à toutes les évolutions de vos classes."],
  ["Savez-vous lire etudiants.txt ? Et etudiants.dat ? La réponse à ces deux questions est tout l'enjeu du choix d'un format."]
]));
fic.push(h2("Comment vérifier votre code"));
fic.push(verif([
  { t: "be.ephec.java.fic.e03.EcritListeEtudiantsTest", code: true },
  { t: "Vérifie le format d'écriture au caractère près, le cas de la liste vide, la reconstruction des étudiants — y compris celui sans cours — et le fait que le chargé de cours ait bel et bien été perdu." }
]));
fic.push(h2("Questions à se poser"));
fic.push(bullet("Que se passe-t-il si le nom d'un étudiant contient un point-virgule ? Comment les formats réels — CSV, par exemple — traitent-ils ce problème ?"));
fic.push(bullet("Pour conserver le chargé de cours dans le fichier texte, que faudrait-il ajouter au format ? À partir de quel moment vaudrait-il mieux utiliser un format existant comme JSON ?"));
fic.push(bulletRuns([
  "Le fichier écrit dépend du dossier depuis lequel on lance le programme. Où atterrit ",
  { t: "new File(\"etudiants.txt\")", code: true },
  " quand on lance depuis IntelliJ ? Affichez ",
  { t: "fichier.getAbsolutePath()", code: true },
  " pour le savoir."
]));

// ---------------------------------------------------------------------
lam.push(bulletRuns([
  "Comparez la version avec boucle et la version avec stream. Laquelle dit le plus clairement ce qu'elle fait ? Voir ",
  { t: "CC-MET.3", code: true },
  "."
]));

fic.push(bulletRuns([
  "La méthode qui écrit et celle qui met en forme sont-elles séparées ? Voir ",
  { t: "CC-MET.3", code: true },
  "."
]));

Packer.toBuffer(doc(lam, "Exercices Java — Thème LAM")).then(b => {
  fs.writeFileSync(__dirname + "/../../enonces/LAM_enonces.docx", b);
  console.log("LAM :", Math.round(b.length / 1024), "Ko");
});
Packer.toBuffer(doc(fic, "Exercices Java — Thème FIC")).then(b => {
  fs.writeFileSync(__dirname + "/../../enonces/FIC_enonces.docx", b);
  console.log("FIC :", Math.round(b.length / 1024), "Ko");
});
