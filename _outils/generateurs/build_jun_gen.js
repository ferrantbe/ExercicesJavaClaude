const fs = require("fs");
const B = require(__dirname + "/boite.js");
const {
  p, runs, bullet, bulletRuns, code, h1, h2, tableau, verif, encadre,
  saut, couverture, modeEmploi, doc, Packer, GREY
} = B;

// =====================================================================
//  JUN
// =====================================================================
const jun = [];
couverture(jun, "JUN", "Tests unitaires avec JUnit",
  "Écrire ce qui dira, tout seul, que le code est cassé");

modeEmploi(jun, "JUN", [
  ["JUN.1", "be.ephec.java.jun.e01", "Le test comme spécification"],
  ["JUN.2", "be.ephec.java.jun.e02", "Détecter un défaut"],
  ["JUN.3", "be.ephec.java.jun.e03", "Écrire une classe de test"]
]);

jun.push(h2("Ce thème fonctionne à l'envers"));
jun.push(p("Depuis le début de l'année, les classes de test vous sont fournies et vous écrivez le code qui les fait passer. Ici, c'est l'inverse : c'est vous qui devez les écrire."));
jun.push(p("D'où une difficulté que ce thème ne cache pas. Vérifier automatiquement du code est facile — c'est ce que fait chaque exercice depuis janvier. Vérifier automatiquement un test l'est beaucoup moins, parce qu'un test qui ne vérifie rien passe au vert aussi bien qu'un bon."));
jun.push(runs([
  { t: "C'est la raison d'être des trois exercices. ", b: true },
  { t: "JUN.1", code: true },
  " vous fait lire un test comme une spécification. ",
  { t: "JUN.2", code: true },
  " vous confronte à du code volontairement défectueux, ce qui rend la qualité de votre vérification mesurable. ",
  { t: "JUN.3", code: true },
  " vous fait écrire une vraie classe de test."
]));
jun.push(encadre([
  [{ t: "Le défaut le plus fréquent, et le plus difficile à voir", b: true }],
  ["Une méthode annotée @Test qui se contente d'appeler du code passe au vert quoi qu'il arrive : elle n'échoue que si une exception inattendue survient. Elle donne une impression de couverture sans vérifier aucun comportement."],
  ["C'est l'erreur la plus répandue dans les classes de test rendues à l'examen. Avant de considérer un test comme écrit, cherchez son assertion. Voir CC-TST.2 du mémento Clean Code."]
]));
jun.push(h2("Les trois temps d'un test"));
jun.push(...code([
  "@Test",
  "@DisplayName(\"Un retrait diminue le contenu du montant retire\")",
  "void unRetraitDiminueLeContenu() throws ContenuInsuffisant {",
  "    Tirelire tirelire = new TirelireCorrecte();     // preparer",
  "    tirelire.depot(50);",
  "",
  "    tirelire.retrait(20);                            // agir",
  "",
  "    assertEquals(30, tirelire.getContenu(), 0.001);  // verifier",
  "}"
]));
jun.push(p("Préparer, agir, vérifier — séparés par des lignes vides. La structure se retrouve dans presque tous les tests et se repère d'un coup d'œil. Prenez-la comme modèle."));
jun.push(saut());

// --- JUN.1
jun.push(h1("JUN.1 — Le test comme spécification"));
jun.push(p("Package : be.ephec.java.jun.e01", { italic: true, color: GREY }));
jun.push(h2("Objectif"));
jun.push(p("Découvrir qu'un bon test se lit avant d'être exécuté."));
jun.push(h2("Énoncé"));
jun.push(runs([
  { t: "Ouvrez CalculatriceTest avant d'écrire une ligne. ", b: true },
  "Il est fourni complet, et il constitue tout l'énoncé : vous y trouverez les signatures, les valeurs attendues, et ce qui doit se produire quand on divise par zéro."
]));
jun.push(runs([
  "Complétez ensuite la classe ",
  { t: "Calculatrice", code: true },
  " pour que les cinq tests passent au vert."
]));
jun.push(p("C'est le principe du développement piloté par les tests : on écrit le test d'abord, on le voit échouer, puis on écrit le code qui le fait passer. Vous n'aurez à faire que les deux dernières étapes."));
jun.push(h2("Deux choses ne s'inventent pas"));
jun.push(runs([
  "Elles ne figurent que dans le test, et nulle part ailleurs. ",
  { t: "La division entière tronque", b: true },
  " — 11 / 4 vaut 2, pas 3. Et ",
  { t: "la division par zéro doit laisser passer l'exception", b: true },
  " : ne rendez pas 0, n'attrapez rien."
]));
jun.push(p("Ce second point mérite qu'on s'y arrête. Rendre 0 ferait passer une erreur pour un résultat, et le programme continuerait avec une valeur fausse. C'est exactement ce que CC-ERR.1 du mémento Clean Code proscrit."));
jun.push(h2("Vérification"));
jun.push(verif([
  { t: "be.ephec.java.jun.e01.CalculatriceTest", code: true },
  { t: "Cinq tests, un par opération plus celui de la division par zéro. Ils sont votre énoncé autant que votre vérification." }
]));
jun.push(h2("Questions à se poser"));
jun.push(bullet("Lisez les @DisplayName. Sauriez-vous écrire la classe uniquement à partir d'eux, sans lire le corps des tests ? C'est le but qu'ils poursuivent."));
jun.push(bulletRuns([
  "Un test contient plusieurs ",
  { t: "assertEquals", code: true },
  ". Cela contredit-il ",
  { t: "CC-TST.2", code: true },
  ", qui demande de ne vérifier qu'une chose par test ?"
]));
jun.push(bullet("Le message passé au troisième argument d'un assertEquals ne s'affiche qu'en cas d'échec. À quoi sert-il, et quand vaut-il la peine d'en écrire un ?"));
jun.push(saut());

// --- JUN.2
jun.push(h1("JUN.2 — Détecter un défaut"));
jun.push(p("Package : be.ephec.java.jun.e02", { italic: true, color: GREY }));
jun.push(h2("Objectif"));
jun.push(p("Mesurer la qualité d'une vérification à ce qu'elle est capable de démasquer."));
jun.push(h2("Contexte"));
jun.push(runs([
  "L'interface ",
  { t: "Tirelire", code: true },
  " définit un contrat en trois méthodes : ",
  { t: "depot", code: true },
  ", ",
  { t: "retrait", code: true },
  " — qui lève ",
  { t: "ContenuInsuffisant", code: true },
  " si le montant dépasse le contenu — et ",
  { t: "getContenu", code: true },
  "."
]));
jun.push(p("Quatre classes l'implémentent. Une seule respecte le contrat ; les trois autres ont chacune un défaut différent."));
jun.push(h2("Énoncé"));
jun.push(runs([
  "Complétez ",
  { t: "Verificateur.estCorrecte(Tirelire)", code: true },
  ", qui rend ",
  { t: "true", code: true },
  " si la tirelire respecte son contrat et ",
  { t: "false", code: true },
  " sinon. Elle doit démasquer les trois défectueuses et laisser passer la bonne."
]));
jun.push(p("Le contrat compte cinq clauses. Vérifiez-les une par une :"));
jun.push(bullet("une tirelire neuve est vide ;"));
jun.push(bullet("un dépôt augmente le contenu d'autant ;"));
jun.push(bullet("un retrait possible diminue le contenu d'autant ;"));
jun.push(bulletRuns([
  "un retrait trop grand lève ",
  { t: "ContenuInsuffisant", code: true },
  " ;"
]));
jun.push(bullet("et dans ce cas, le contenu n'a pas bougé."));
jun.push(encadre([
  [{ t: "Ce n'est pas encore une classe de test JUnit", b: true }],
  ["C'est le raisonnement qu'une classe de test met en œuvre, écrit à la main pour qu'on puisse le vérifier automatiquement. Chaque clause vérifiée correspond à ce que serait une méthode @Test."],
  ["Ne lisez pas le code des implémentations pour trouver leurs défauts. Repérer un bug en lisant ne prouve rien ; un test qui échoue, si — et c'est ce qui continuera de fonctionner quand le code changera dans six mois."]
]));
jun.push(h2("Vérification"));
jun.push(verif([
  { t: "be.ephec.java.jun.e02.VerificateurTest", code: true },
  { t: "Confronte votre vérificateur à la bonne implémentation et aux trois défectueuses. Chaque message d'échec vous indique ce que la vérification manquante aurait dû observer." },
  { t: "Un dernier test refuse un vérificateur qui rendrait toujours la même réponse : c'est exactement ce que fait une classe de test sans assertion." }
]));
jun.push(h2("Questions à se poser"));
jun.push(bullet("Une seule des trois défectueuses lève correctement l'exception, et se trompe ailleurs. Laquelle, et quelle clause l'a démasquée ?"));
jun.push(bullet("Si vous aviez oublié la cinquième clause — le contenu inchangé après un refus — laquelle des trois serait passée à travers ?"));
jun.push(bulletRuns([
  "Comparez avec ",
  { t: "EXC.1", code: true },
  ", où le test vérifiait qu'un point ne bouge pas quand le déplacement est refusé. La même idée : vérifier l'état après l'échec, pas seulement l'échec."
]));
jun.push(saut());

// --- JUN.3
jun.push(h1("JUN.3 — Écrire une classe de test"));
jun.push(p("Package : be.ephec.java.jun.e03", { italic: true, color: GREY }));
jun.push(h2("Objectif"));
jun.push(p("Écrire, cette fois, une vraie classe de test JUnit."));
jun.push(h2("Énoncé"));
jun.push(runs([
  "La classe ",
  { t: "Moyenne", code: true },
  " vous est fournie, complète et correcte. Elle expose deux méthodes statiques."
]));
jun.push(tableau(["Élément", "Signature", "Comportement"], [
  ["calculer", "public static double calculer(List<Integer>)", "La moyenne ; lève IllegalArgumentException si la liste est vide ou nulle, ou si une note sort de [0, 20]"],
  ["reussite", "public static boolean reussite(List<Integer>)", "true si la moyenne atteint 10"]
], [1600, 3600, 4160]));
jun.push(runs([
  "Créez, dans ",
  { t: "src/test/java", code: true },
  " et à côté de la classe fournie, votre propre classe ",
  { t: "be.ephec.java.jun.e03.MoyenneTest", code: true },
  ". Elle doit compter au moins cinq méthodes annotées ",
  { t: "@Test", code: true },
  ", chacune portant un ",
  { t: "@DisplayName", code: true },
  " qui énonce le comportement vérifié."
]));
jun.push(h2("Les cas à couvrir"));
jun.push(p("Un test qui ne couvre que le cas où tout se passe bien ne protège de rien : les défauts se logent dans les bords."));
jun.push(bullet("le cas nominal — deux ou trois notes ordinaires ;"));
jun.push(bullet("une seule note ;"));
jun.push(bullet("une moyenne qui ne tombe pas juste ;"));
jun.push(bullet("les bornes acceptées — 0 et 20 ;"));
jun.push(bullet("la liste vide, et la liste nulle ;"));
jun.push(bullet("une note hors bornes, au-dessus comme en dessous ;"));
jun.push(bullet("la réussite exactement à 10, juste au-dessus et juste en dessous."));
jun.push(runs([
  { t: "Pour comparer deux double, ", b: true },
  { t: "assertEquals", code: true },
  " demande un troisième argument, la tolérance : ",
  { t: "assertEquals(14.0, moyenne, 0.001)", code: true },
  ". Sans elle, deux calculs mathématiquement égaux peuvent différer au dernier chiffre."
]));
jun.push(h2("Vérification"));
jun.push(verif([
  { t: "be.ephec.java.jun.e03.RedactionTest", code: true },
  { t: "Contrôle que votre classe existe, qu'elle compte au moins cinq méthodes @Test, que chacune porte un @DisplayName, et que leurs noms décrivent un comportement plutôt qu'un numéro." },
  { t: "Il ne peut PAS vérifier que vos tests sont pertinents — aucun outil ne le peut. Le vert que vous obtiendrez ici ne dit rien de la qualité de ce que vous avez écrit. C'est précisément pourquoi JUN.2 existait." }
]));
jun.push(h2("Questions à se poser"));
jun.push(bullet("Écrivez un test qui passe au vert sans rien vérifier. Combien de temps vous faut-il ? C'est aussi le temps qu'il faut pour se donner une fausse assurance."));
jun.push(bulletRuns([
  "Modifiez temporairement ",
  { t: "Moyenne", code: true },
  " pour y introduire un défaut — un ",
  { t: ">", code: true },
  " au lieu d'un ",
  { t: ">=", code: true },
  ". Vos tests le détectent-ils ? C'est la seule mesure honnête de leur valeur."
]));
jun.push(bullet("Combien de vos tests survivraient si la méthode changeait de nom ? Et si son comportement changeait ? La différence dit ce qu'un test protège vraiment."));

// =====================================================================
//  GEN
// =====================================================================
const gen = [];
couverture(gen, "GEN", "Types génériques",
  "Écrire une classe une fois, l'utiliser avec n'importe quel type");

modeEmploi(gen, "GEN", [
  ["GEN.1", "be.ephec.java.gen.e01", "Une paire, un seul type"],
  ["GEN.2", "be.ephec.java.gen.e02", "Un couple, deux types"],
  ["GEN.3", "be.ephec.java.gen.e03", "Deux sortes de triplets"],
  ["GEN.4", "be.ephec.java.gen.e04", "Le joker"],
  ["GEN.5", "be.ephec.java.gen.e05", "Une méthode générique"],
  ["GEN.6", "be.ephec.java.gen.e06", "Hériter d'une classe générique"]
]);

gen.push(h2("Ce qu'il faut avoir en tête"));
gen.push(p("Vous utilisez la généricité depuis le thème COL, sans l'avoir écrite. C'est ce que signifient les chevrons de List<Integer> ou Map<String, Fiche> : la classe est écrite une fois, le type est décidé à l'utilisation."));
gen.push(...code([
  "public class Paire<T> {        // T : parametre de type",
  "    private final T premier;   // s'utilise comme n'importe quel type",
  "}",
  "",
  "Paire<Integer> notes = new Paire<>(12, 16);   // T vaut Integer ici",
  "Paire<String>  mots  = new Paire<>(\"a\", \"b\"); // et String la"
]));
gen.push(runs([
  { t: "Ce que cela apporte. ", b: true },
  "Sans généricité, il faudrait une classe par type, ou une classe d'",
  { t: "Object", code: true },
  " avec un transtypage à chaque lecture. Le transtypage n'est pas seulement pénible : il déplace l'erreur de la compilation vers l'exécution."
]));
gen.push(...code([
  "Paire paire = new Paire(12, \"seize\");            // compile !",
  "int somme = (Integer) paire.getSecond() + 1;      // plante a l'execution",
  "",
  "Paire<Integer> paire = new Paire<>(12, \"seize\");  // ne compile pas"
]));
gen.push(p("Une erreur détectée à la compilation coûte quelques secondes ; la même détectée en production coûte une soirée."));
gen.push(runs([
  { t: "Une convention de nommage. ", b: true },
  "Les lettres n'ont aucune importance pour le compilateur, mais l'usage veut ",
  { t: "T", code: true },
  " pour un type quelconque, ",
  { t: "K", code: true },
  " et ",
  { t: "V", code: true },
  " pour une clé et une valeur, ",
  { t: "E", code: true },
  " pour l'élément d'une collection."
]));
gen.push(saut());

// --- GEN.1
gen.push(h1("GEN.1 — Une paire, un seul type"));
gen.push(p("Package : be.ephec.java.gen.e01", { italic: true, color: GREY }));
gen.push(h2("Objectif"));
gen.push(p("Écrire sa première classe générique."));
gen.push(h2("Énoncé"));
gen.push(runs([
  "Complétez la classe ",
  { t: "Paire<T>", code: true },
  ", qui modélise une paire de deux objets de même type."
]));
gen.push(tableau(["Élément", "Signature", "Rôle"], [
  ["constructeur", "public Paire(T premier, T second)", "Les deux valeurs, immuables"],
  ["getPremier", "public T getPremier()", "La première"],
  ["getSecond", "public T getSecond()", "La seconde"],
  ["toString", "public String toString()", "Format imposé, ci-dessous"]
], [2000, 3700, 3660]));
gen.push(...code([
  "premiere valeur : 12 - deuxieme valeur : 16"
]));
gen.push(runs([
  "Écrivez ensuite le ",
  { t: "Programme", code: true },
  " : une paire d'",
  { t: "Integer", code: true },
  ", une paire de ",
  { t: "Double", code: true },
  ", affichées."
]));
gen.push(h2("L'expérience à faire"));
gen.push(runs([
  "Essayez ",
  { t: "new Paire<Integer>(12, \"seize\")", code: true },
  " et lisez ce que dit le compilateur. Cette erreur — refusée avant même que le programme ne démarre — est exactement le service que rend la généricité."
]));
gen.push(h2("Vérification"));
gen.push(verif([
  { t: "be.ephec.java.gen.e01.PaireTest", code: true },
  { t: "Vérifie une paire d'Integer, une paire de String, le format du toString, et le fait qu'aucun transtypage ne soit nécessaire pour additionner les deux valeurs." }
]));
gen.push(h2("Questions à se poser"));
gen.push(bulletRuns([
  "Le losange vide du ",
  { t: "new Paire<>(12, 16)", code: true },
  " : d'où le compilateur déduit-il qu'il s'agit d'Integer ?"
]));
gen.push(bulletRuns([
  "Peut-on écrire ",
  { t: "Paire<int>", code: true },
  " ? Essayez, et retenez la réponse : elle explique pourquoi on manipule des ",
  { t: "Integer", code: true },
  " et non des ",
  { t: "int", code: true },
  " dans les collections."
]));
gen.push(saut());

// --- GEN.2
gen.push(h1("GEN.2 — Un couple, deux types"));
gen.push(p("Package : be.ephec.java.gen.e02", { italic: true, color: GREY }));
gen.push(h2("Objectif"));
gen.push(p("Déclarer plusieurs paramètres de type."));
gen.push(h2("Énoncé"));
gen.push(runs([
  "Complétez ",
  { t: "Couple2<U, V>", code: true },
  ", qui modélise un couple de deux objets de types possiblement différents. Mêmes méthodes qu'en ",
  { t: "GEN.1", code: true },
  ", même format de ",
  { t: "toString", code: true },
  "."
]));
gen.push(runs([
  "Le ",
  { t: "Programme", code: true },
  " crée un couple de deux ",
  { t: "Integer", code: true },
  ", puis un couple contenant un ",
  { t: "Integer", code: true },
  " et un ",
  { t: "Double", code: true },
  "."
]));
gen.push(runs([
  { t: "Notez le premier des deux cas. ", b: true },
  "Deux paramètres de type ",
  { t: "autorisent", i: true },
  " la différence, ils ne l'",
  { t: "imposent", i: true },
  " pas : ",
  { t: "Couple2<Integer, Integer>", code: true },
  " est parfaitement valide."
]));
gen.push(h2("Vérification"));
gen.push(verif([
  { t: "be.ephec.java.gen.e02.Couple2Test", code: true },
  { t: "Vérifie deux types différents, deux types identiques, la combinaison Integer et Double, et le format du toString." }
]));
gen.push(h2("Questions à se poser"));
gen.push(bulletRuns([
  "Si ",
  { t: "Couple2<T, T>", code: true },
  " fait le travail de ",
  { t: "Paire<T>", code: true },
  ", pourquoi garder les deux classes ? Réfléchissez à ce qu'un type ",
  { t: "dit", i: true },
  ", en plus de ce qu'il stocke."
]));
gen.push(saut());

// --- GEN.3
gen.push(h1("GEN.3 — Deux sortes de triplets"));
gen.push(p("Package : be.ephec.java.gen.e03", { italic: true, color: GREY }));
gen.push(h2("Objectif"));
gen.push(p("Refaire le geste sur trois éléments, et comparer les deux approches."));
gen.push(h2("Énoncé"));
gen.push(runs([
  "Complétez ",
  { t: "TripletI<T>", code: true },
  " — trois éléments de même type — et ",
  { t: "TripletD<T, U, V>", code: true },
  " — trois éléments de types possiblement différents. Chacune expose son constructeur et trois accesseurs."
]));
gen.push(runs([
  "Le ",
  { t: "Programme", code: true },
  " crée un ",
  { t: "TripletI", code: true },
  " de ",
  { t: "String", code: true },
  ", un d'",
  { t: "Integer", code: true },
  ", puis un ",
  { t: "TripletD", code: true },
  " contenant un ",
  { t: "String", code: true },
  ", un ",
  { t: "Integer", code: true },
  " et un ",
  { t: "Double", code: true },
  "."
]));
gen.push(h2("Vérification"));
gen.push(verif([
  { t: "be.ephec.java.gen.e03.TripletTest", code: true },
  { t: "Vérifie les deux classes, y compris le cas d'un TripletD dont les trois types coïncident." }
]));
gen.push(h2("Questions à se poser"));
gen.push(bulletRuns([
  { t: "TripletD", code: true },
  " est strictement plus permissive que ",
  { t: "TripletI", code: true },
  ". Faut-il pour autant se passer de la seconde ? Que perdrait-on ?"
]));
gen.push(bullet("Combien de paramètres de type avant que la déclaration ne devienne illisible ? À partir de quel moment vaudrait-il mieux écrire une vraie classe, avec des noms de champs ?"));
gen.push(saut());

// --- GEN.4
gen.push(h1("GEN.4 — Le joker"));
gen.push(p("Package : be.ephec.java.gen.e04", { italic: true, color: GREY }));
gen.push(h2("Objectif"));
gen.push(p("Rencontrer la règle la plus déroutante de la généricité, et comprendre pourquoi elle existe."));
gen.push(h2("Contexte"));
gen.push(runs([
  "Le package fournit ",
  { t: "Personne", code: true },
  ", ",
  { t: "Etudiant", code: true },
  " qui en hérite, et un ",
  { t: "Triplet<T>", code: true },
  " complet."
]));
gen.push(p("Vous devez écrire une méthode capable de traiter aussi bien un triplet de personnes qu'un triplet d'étudiants. Commencez par la version évidente :"));
gen.push(...code([
  "public static String noms(Triplet<Personne> triplet) { ... }"
]));
gen.push(p("Elle compile. Puis essayez de lui passer un Triplet<Etudiant> — et lisez le refus du compilateur."));
gen.push(encadre([
  [{ t: "Un Etudiant est une Personne, mais un Triplet<Etudiant> n'est pas un Triplet<Personne>", b: true }],
  ["La règle surprend tout le monde, et elle a une bonne raison. Si la substitution était permise, la méthode pourrait ranger une Personne ordinaire dans un triplet que son propriétaire croit rempli d'Etudiants. Le problème n'apparaîtrait qu'à la lecture suivante, ailleurs, sans rapport apparent."],
  ["Java l'interdit donc à la compilation. Les tableaux, eux, l'autorisent — et le paient d'une ArrayStoreException à l'exécution."]
]));
gen.push(h2("Énoncé"));
gen.push(runs([
  "Complétez ",
  { t: "Affichage.noms(Triplet<? extends Personne>)", code: true },
  ", qui rend les trois noms séparés par ",
  { t: "\", \"", code: true },
  ". Le joker se lit « un triplet de quelque chose qui est une Personne »."
]));
gen.push(...code([
  "noms(triplet)   ->   \"Ada, Alan, Grace\""
]));
gen.push(p("On peut lire un tel triplet — tout ce qu'il contient est au moins une Personne. On ne peut rien y écrire, et c'est précisément ce qui rend la lecture sûre."));
gen.push(h2("Vérification"));
gen.push(verif([
  { t: "be.ephec.java.gen.e04.AffichageTest", code: true },
  { t: "Vérifie que la même méthode accepte un Triplet<Personne>, un Triplet<Etudiant>, et un Triplet<Personne> contenant un mélange des deux." }
]));
gen.push(h2("Questions à se poser"));
gen.push(bulletRuns([
  "Dans ",
  { t: "noms", code: true },
  ", essayez d'écrire quelque chose dans le triplet reçu. Que dit le compilateur, et pourquoi a-t-il raison ?"
]));
gen.push(bullet("Un Triplet<Personne> peut contenir un Etudiant, mais un Triplet<Etudiant> n'est pas un Triplet<Personne>. Ces deux phrases se contredisent-elles ?"));
gen.push(saut());

// --- GEN.5
gen.push(h1("GEN.5 — Une méthode générique"));
gen.push(p("Package : be.ephec.java.gen.e05", { italic: true, color: GREY }));
gen.push(h2("Objectif"));
gen.push(p("Déclarer un paramètre de type sur une méthode plutôt que sur une classe."));
gen.push(h2("Contexte"));
gen.push(runs([
  "Jusqu'ici, ",
  { t: "T", code: true },
  " appartenait à la classe. Il peut aussi n'appartenir qu'à une méthode : il se déclare alors juste avant le type de retour."
]));
gen.push(...code([
  "public static <T> String otGnirts(T objet) { ... }",
  "           ^^^  la methode est generique, la classe ne l'est pas"
]));
gen.push(h2("Énoncé"));
gen.push(runs([
  "Complétez ",
  { t: "UtilGenerique.otGnirts", code: true },
  ", qui rend le ",
  { t: "toString", code: true },
  " de l'objet, à l'envers — d'où son nom incongru."
]));
gen.push(...code([
  "otGnirts(\"Java\")   ->  \"avaJ\"",
  "otGnirts(1234)     ->  \"4321\"",
  "otGnirts(-12)      ->  \"21-\""
]));
gen.push(runs([
  { t: "Indice : ", b: true },
  { t: "StringBuilder", code: true },
  " possède une méthode ",
  { t: "reverse()", code: true },
  "."
]));
gen.push(runs([
  "Le ",
  { t: "Programme", code: true },
  " l'appelle sur un ",
  { t: "String", code: true },
  ", un ",
  { t: "Integer", code: true },
  ", un ",
  { t: "Double", code: true },
  ", et sur un objet d'une classe que vous écrivez avec son propre ",
  { t: "toString", code: true },
  "."
]));
gen.push(h2("Une remarque honnête"));
gen.push(runs([
  "Cette méthode ne fait rien de ",
  { t: "T", code: true },
  " sinon appeler son ",
  { t: "toString", code: true },
  ". Elle aurait donc pu prendre un ",
  { t: "Object", code: true },
  " et fonctionner tout autant : la généricité n'apporte ici presque rien."
]));
gen.push(runs([
  "Elle prend tout son sens quand le type de retour dépend de ",
  { t: "T", code: true },
  " :"
]));
gen.push(...code([
  "public static <T> T premier(List<T> liste)"
]));
gen.push(p("L'appelant récupère alors un T, pas un Object, et n'a aucun transtypage à écrire. C'est là que la différence se voit."));
gen.push(h2("Vérification"));
gen.push(verif([
  { t: "be.ephec.java.gen.e05.UtilGeneriqueTest", code: true },
  { t: "Vérifie sur une chaîne — y compris vide et d'un caractère —, sur un entier positif et négatif, sur un décimal, et sur un objet quelconque muni d'un toString." }
]));
gen.push(h2("Questions à se poser"));
gen.push(bulletRuns([
  "Réécrivez la méthode avec ",
  { t: "Object", code: true },
  " en paramètre. Le test passe-t-il toujours ? Qu'avez-vous perdu ?"
]));
gen.push(bulletRuns([
  "Que se passe-t-il si l'on passe ",
  { t: "null", code: true },
  " ? Comparez ",
  { t: "objet.toString()", code: true },
  " et ",
  { t: "String.valueOf(objet)", code: true },
  "."
]));
gen.push(saut());

// --- GEN.6
gen.push(h1("GEN.6 — Hériter d'une classe générique"));
gen.push(p("Package : be.ephec.java.gen.e06", { italic: true, color: GREY }));
gen.push(h2("Objectif"));
gen.push(p("Combiner héritage et généricité, et distinguer deux mots-clés qu'on confond souvent."));
gen.push(h2("Énoncé"));
gen.push(runs([
  "La classe ",
  { t: "Couple<T>", code: true },
  " vous est fournie. Écrivez ",
  { t: "CoupleNomme<T>", code: true },
  ", qui en hérite et porte en plus un nom."
]));
gen.push(tableau(["Élément", "Signature", "Rôle"], [
  ["constructeur", "public CoupleNomme(String nom, T premier, T second)", "Le nom, puis les deux valeurs"],
  ["getNom", "public String getNom()", "Le nom"],
  ["description", "public String description()", "Redéfinie pour inclure le nom"]
], [2000, 4200, 3160]));
gen.push(...code([
  "Couple       ->  \"premier: 12, second: 16\"",
  "CoupleNomme  ->  \"notes -> premier: 12, second: 16\""
]));
gen.push(encadre([
  [{ t: "Deux mots-clés à ne pas confondre", b: true }],
  ["super(...) appelle un constructeur de la classe MÈRE, et doit être la première instruction du constructeur. this(...) appelle un autre constructeur de la MÊME classe."],
  ["Le même mot super sert aussi à appeler une méthode de la classe mère : super.description() vous évite de recopier son contenu. Recopier fonctionnerait — jusqu'au jour où la description de Couple change et où personne ne pense à répercuter. Voir CC-CLS.3."]
]));
gen.push(h2("Pourquoi description et affiche sont séparées"));
gen.push(runs([
  { t: "Couple", code: true },
  " expose une méthode ",
  { t: "description()", code: true },
  " qui fabrique le texte, et une méthode ",
  { t: "affiche()", code: true },
  " qui l'envoie à l'écran. C'est ce qui permet de tester la première — on ne vérifie pas ce qui est parti dans la console. Voir ",
  { t: "CC-MET.7", code: true },
  " du mémento Clean Code."
]));
gen.push(h2("Vérification"));
gen.push(verif([
  { t: "be.ephec.java.gen.e06.CoupleNommeTest", code: true },
  { t: "Vérifie l'héritage, les accesseurs hérités, la description redéfinie, celle de la classe mère restée intacte, et surtout le polymorphisme : vue comme un Couple, l'instance rend quand même sa propre description." }
]));
gen.push(h2("Questions à se poser"));
gen.push(bulletRuns([
  { t: "affiche()", code: true },
  " n'est pas redéfinie, et pourtant elle affiche le nom pour un ",
  { t: "CoupleNomme", code: true },
  ". Comment est-ce possible ? Comparez avec la classe abstraite du thème ",
  { t: "ABS", code: true },
  " : la classe mère y appelait déjà du code écrit après elle."
]));
gen.push(bulletRuns([
  "Le ",
  { t: "T", code: true },
  " de ",
  { t: "CoupleNomme<T>", code: true },
  " et celui de ",
  { t: "Couple<T>", code: true },
  " sont-ils le même ? Que se passerait-il si l'on écrivait ",
  { t: "class CoupleNomme<T> extends Couple<String>", code: true },
  " ?"
]));

// ---------------------------------------------------------------------
Packer.toBuffer(doc(jun, "Exercices Java — Thème JUN")).then(b => {
  fs.writeFileSync(__dirname + "/../../enonces/JUN_enonces.docx", b);
  console.log("JUN :", Math.round(b.length / 1024), "Ko");
});
Packer.toBuffer(doc(gen, "Exercices Java — Thème GEN")).then(b => {
  fs.writeFileSync(__dirname + "/../../enonces/GEN_enonces.docx", b);
  console.log("GEN :", Math.round(b.length / 1024), "Ko");
});
