const fs = require("fs");
const B = require(__dirname + "/boite.js");
const {
  p, runs, bullet, bulletRuns, code, h1, h2, tableau, verif, encadre,
  saut, couverture, modeEmploi, doc, Packer, GREY
} = B;

// =====================================================================
//  COL
// =====================================================================
const col = [];
couverture(col, "COL", "Collections",
  "Des structures qui grandissent, et qui savent chercher");

modeEmploi(col, "COL", [
  ["COL.1", "be.ephec.java.col.e01", "Deux façons d'être trié"],
  ["COL.2", "be.ephec.java.col.e02", "Un annuaire"],
  ["COL.3", "be.ephec.java.col.e03", "Lire des noms et les trier"],
  ["COL.4", "be.ephec.java.col.e04", "Compter les mots d'un texte"],
  ["COL.5", "be.ephec.java.col.e05", "Filtrer avec un prédicat"],
  ["COL.6", "be.ephec.java.col.e06", "Un ensemble sans doublons"],
  ["COL.7", "be.ephec.java.col.e07", "Une table de collections"],
  ["COL.8", "be.ephec.java.col.e08", "Trois ordres pour une bibliothèque"]
]);

col.push(h2("Trois familles, trois promesses"));
col.push(p("Un tableau a une taille fixe et ne sait rien faire d'autre que ranger. Les collections grandissent toutes seules et portent chacune une promesse différente."));
col.push(tableau(["Famille", "Ce qu'elle garantit", "Représentants"], [
  ["List", "un ordre, des doublons possibles, un accès par position", "ArrayList, LinkedList"],
  ["Set", "aucun doublon", "HashSet, TreeSet"],
  ["Map", "une valeur par clé", "HashMap, TreeMap"]
], [1500, 4600, 3260], [0, 2]));
col.push(runs([
  { t: "Le choix se fait sur la promesse, pas sur l'habitude. ", b: true },
  "Si les doublons n'ont pas de sens, un ",
  { t: "Set", code: true },
  " l'interdit — et vous n'aurez plus à y penser. Si l'ordre compte, un ",
  { t: "TreeSet", code: true },
  " ou une ",
  { t: "TreeMap", code: true },
  " veillent à maintenir l'ordre en permanence. Confier une règle à la structure vaut mieux que de compter sur la vigilance de celui qui l'utilise."
]));
col.push(runs([
  "Vous verrez au fil des exercices que ce choix se lit dans la déclaration : ",
  { t: "Map<String, Set<String>>", code: true },
  " dit à lui seul qu'un étudiant a des cours, sans répétition possible."
]));
col.push(saut());

// --- COL.1
col.push(h1("COL.1 — Deux façons d'être trié"));
col.push(p("Package : be.ephec.java.col.e01", { italic: true, color: GREY }));
col.push(h2("Objectif"));
col.push(p("Distinguer une collection qu'on trie d'une collection qui reste triée."));
col.push(h2("Énoncé"));
col.push(runs([
  "Complétez la classe ",
  { t: "Tri", code: true },
  ", qui expose deux méthodes statiques."
]));
col.push(tableau(["Élément", "Signature", "Rôle"], [
  ["triee", "public static List<Integer> triee(List<Integer>)", "Une NOUVELLE liste triée ; la liste reçue est intacte"],
  ["ensembleTrie", "public static Set<Integer> ensembleTrie(List<Integer>)", "Un TreeSet, trié en permanence"]
], [2100, 4200, 3060]));
col.push(runs([
  { t: "Indice : ", b: true },
  "la classe ",
  { t: "Collections", code: true },
  " et sa méthode statique ",
  { t: "sort", code: true },
  ". Attention, elle trie sur place et ne retourne rien — d'où la copie à faire avant."
]));
col.push(runs([
  "Écrivez ensuite le ",
  { t: "Programme", code: true },
  " : il demande n, tire n entiers au hasard entre 0 et 1000, et affiche les deux résultats."
]));
col.push(h2("Comment vérifier votre code"));
col.push(verif([
  { t: "be.ephec.java.col.e01.TriTest", code: true },
  { t: "Vérifie le tri, le fait que la liste reçue ne soit pas modifiée, le cas de la liste vide, et que le TreeSet soit à la fois trié et débarrassé des doublons." }
]));
col.push(h2("Questions à se poser"));
col.push(bullet("Comparez la taille de la liste et celle de l'ensemble, sur 100 tirages entre 0 et 1000. Pourquoi diffèrent-elles ?"));
col.push(bullet("Un TreeSet est trié en permanence. Qu'est-ce que cela coûte, et quand ce coût en vaut-il la peine ?"));
col.push(bulletRuns([
  "Que se passerait-il si ",
  { t: "triee", code: true },
  " triait la liste reçue au lieu d'en copier une ? Voir ",
  { t: "CC-MET.7", code: true },
  " du mémento Clean Code."
]));
col.push(saut());

// --- COL.2
col.push(h1("COL.2 — Un annuaire"));
col.push(p("Package : be.ephec.java.col.e02", { italic: true, color: GREY }));
col.push(h2("Objectif"));
col.push(p("Se servir d'une table associative, et découvrir que le choix de son implémentation change ce qu'on peut en attendre."));
col.push(h2("Énoncé"));
col.push(runs([
  "Le record ",
  { t: "Fiche", code: true },
  " vous est fourni : un nom, un numéro, une adresse. Complétez la classe ",
  { t: "Annuaire", code: true },
  ", qui associe un nom à une fiche."
]));
col.push(tableau(["Élément", "Signature", "Rôle"], [
  ["ajouter", "public void ajouter(Fiche)", "Indexe la fiche par son nom"],
  ["chercher", "public Fiche chercher(String)", "La fiche, ou null si le nom est inconnu"],
  ["taille", "public int taille()", "Le nombre de fiches"],
  ["nomsDansLOrdre", "public List<String> nomsDansLOrdre()", "Les noms, par ordre alphabétique"]
], [2200, 3800, 3360]));
col.push(p("Commencez par une HashMap, comme le demande l'énoncé d'origine."));
col.push(encadre([
  [{ t: "La question qui fait l'exercice", b: true }],
  ["Peut-on faire en sorte que les fiches apparaissent dans l'ordre des noms ?"],
  ["Répondez d'abord avec la HashMap, en triant les clés au moment de les retourner. Puis remplacez la HashMap par une TreeMap et regardez ce que devient nomsDansLOrdre : une seule ligne change dans toute la classe, et le test passe toujours."],
  ["Lequel des deux préférez-vous, et pourquoi ? La réponse dépend de la fréquence à laquelle on demande cet ordre."]
]));
col.push(h2("Comment vérifier votre code"));
col.push(verif([
  { t: "be.ephec.java.col.e02.AnnuaireTest", code: true },
  { t: "Vérifie la recherche, le cas d'un nom absent, le remplacement d'une fiche de même nom, l'ordre alphabétique et le cas de l'annuaire vide." }
]));
col.push(h2("Questions à se poser"));
col.push(bulletRuns([
  "Ajouter deux fiches de même nom ne fait pas grandir l'annuaire. Où est-ce écrit dans votre code ? Regardez ce que retourne ",
  { t: "put", code: true },
  " dans la Javadoc."
]));
col.push(bullet("chercher retourne null pour un nom inconnu. L'énoncé le demande, mais est-ce une bonne idée ? Voir CC-ERR.2 — et comparez avec ce que fait COL.7."));
col.push(saut());

// --- COL.3
col.push(h1("COL.3 — Lire des noms et les trier"));
col.push(p("Package : be.ephec.java.col.e03", { italic: true, color: GREY }));
col.push(h2("Objectif"));
col.push(p("Remplir une collection à partir d'un flux de texte, puis la trier."));
col.push(h2("Contexte"));
col.push(runs([
  "Dans un vrai programme, les noms viendraient d'un fichier. Trois lignes suffisent :"
]));
col.push(...code([
  "File fichier = new File(\"etudiants.txt\");",
  "Scanner scanner = new Scanner(fichier);"
]));
col.push(runs([
  "La classe fournie ",
  { t: "SourceDeTexte", code: true },
  " vous retourne un ",
  { t: "Scanner", code: true },
  " déjà ouvert, pour que l'exercice porte sur les collections et non sur les chemins de fichiers — sujet du module ",
  { t: "FIC", code: true },
  ". Le reste de votre code serait identique : un ",
  { t: "Scanner", code: true },
  " se lit de la même façon, quelle que soit sa source."
]));
col.push(h2("Énoncé"));
col.push(tableau(["Élément", "Signature", "Rôle"], [
  ["lire", "public static List<String> lire(Scanner)", "Tous les noms, un par ligne, dans l'ordre de lecture"],
  ["triee", "public static List<String> triee(List<String>)", "Une nouvelle liste, par ordre alphabétique"]
], [1900, 4200, 3260]));
col.push(runs([
  { t: "Indice : ", b: true },
  { t: "scanner.hasNextLine()", code: true },
  " et ",
  { t: "scanner.nextLine()", code: true },
  "."
]));
col.push(h2("Comment vérifier votre code"));
col.push(verif([
  { t: "be.ephec.java.col.e03.NomsTest", code: true },
  { t: "Vérifie la lecture, le cas d'une source vide, le tri sans modification de la liste reçue, et le contenu de la source fournie." },
  { t: "Remarquez que le test passe au Scanner une simple chaîne de caractères. C'est possible parce que lire ne sait pas d'où vient son Scanner — et c'est ce qui la rend testable sans dépendre d'aucun fichier." }
]));
col.push(h2("Questions à se poser"));
col.push(bulletRuns([
  { t: "nextLine()", code: true },
  " lit une ligne, ",
  { t: "next()", code: true },
  " lit un mot. Que se passerait-il si un nom contenait une espace et que vous utilisiez ",
  { t: "next()", code: true },
  " ?"
]));
col.push(bullet("Le tri est alphabétique. Où est définie cette notion d'ordre pour des String, sachant que vous n'avez rien écrit à ce sujet ?"));
col.push(saut());

// --- COL.4
col.push(h1("COL.4 — Compter les mots d'un texte"));
col.push(p("Package : be.ephec.java.col.e04", { italic: true, color: GREY }));
col.push(h2("Objectif"));
col.push(p("L'usage le plus courant d'une table associative : accumuler un décompte."));
col.push(h2("Énoncé"));
col.push(tableau(["Élément", "Signature", "Rôle"], [
  ["compter", "public static Map<String, Integer> compter(Scanner)", "Combien de fois chaque mot apparaît"],
  ["rapport", "public static String rapport(Map<String, Integer>)", "Le décompte en texte, trié"]
], [1800, 4400, 3160]));
col.push(runs([
  { t: "Indice pour compter : ", b: true },
  "cherchez ",
  { t: "getOrDefault", code: true },
  " dans la Javadoc de ",
  { t: "Map", code: true },
  ". Elle remplace « si le mot est absent mettre 1, sinon incrémenter » par une seule ligne."
]));
col.push(p("Le format du rapport est imposé, un mot par ligne, par ordre alphabétique, sans retour à la ligne final :"));
col.push(...code([
  "abeille : 1",
  "chat : 1",
  "zebre : 2"
]));
col.push(h2("La question de l'ordre"));
col.push(runs([
  "Dans le ",
  { t: "Programme", code: true },
  ", affichez la Map directement, sans passer par ",
  { t: "rapport", code: true },
  ". Dans quel ordre les mots sortent-ils ? Recommencez avec une ",
  { t: "TreeMap", code: true },
  " à la place de la ",
  { t: "HashMap", code: true },
  " et comparez."
]));
col.push(p("Retenez ce que vous observez : une HashMap ne garantit aucun ordre. Celui que vous voyez dépend du code de hachage des clés, il paraît souvent aléatoire, et surtout il n'est pas stable d'une version de Java à l'autre. Un programme qui s'appuierait dessus fonctionnerait aujourd'hui et pas demain."));
col.push(h2("Comment vérifier votre code"));
col.push(verif([
  { t: "be.ephec.java.col.e04.OccurrencesTest", code: true },
  { t: "Vérifie le décompte, le cas d'un mot absent, celui d'un texte vide, le format exact du rapport, et le texte fourni." }
]));
col.push(h2("Questions à se poser"));
col.push(bullet("Le rapport trie les clés au lieu de supposer un ordre. Que serait devenu le test si vous aviez parcouru la HashMap telle quelle ?"));
col.push(bullet("« Le » et « le » comptent-ils pour le même mot dans votre version ? Est-ce souhaitable, et que faudrait-il changer ?"));
col.push(saut());

// --- COL.5
col.push(h1("COL.5 — Filtrer avec un prédicat"));
col.push(p("Package : be.ephec.java.col.e05", { italic: true, color: GREY }));
col.push(h2("Objectif"));
col.push(p("Passer un comportement en paramètre à une méthode d'une collection."));
col.push(h2("Contexte"));
col.push(runs([
  "L'interface ",
  { t: "Collection", code: true },
  " déclare :"
]));
col.push(...code([
  "boolean removeIf(Predicate<? super E> filtre)"
]));
col.push(runs([
  "Elle supprime tous les éléments pour lesquels le filtre répond ",
  { t: "true", code: true },
  ". Et ",
  { t: "Predicate", code: true },
  " est une interface du JDK : elle déclare une seule méthode, ",
  { t: "boolean test(T valeur)", code: true },
  ". Vous savez donc déjà tout faire — c'est exactement ",
  { t: "ITF.1", code: true },
  ", avec une interface écrite par quelqu'un d'autre."
]));
col.push(h2("Énoncé"));
col.push(runs([
  "Complétez la classe ",
  { t: "EstPair", code: true },
  ", qui implémente ",
  { t: "Predicate<Integer>", code: true },
  ", puis les deux méthodes de ",
  { t: "Filtrage", code: true },
  "."
]));
col.push(tableau(["Élément", "Signature", "Rôle"], [
  ["test", "public boolean test(Integer)", "Répond si le nombre est pair"],
  ["supprimerLesPairs", "public static void supprimerLesPairs(List<Integer>)", "Modifie la liste reçue"],
  ["compterLesPairs", "public static int compterLesPairs(List<Integer>)", "Compte sans rien supprimer"]
], [2400, 4200, 2760]));
col.push(encadre([
  [{ t: "Pourquoi une classe nommée", b: true }],
  B.bt("Écrire une classe entière pour une seule expression est verbeux, et il existe deux écritures plus courtes que vous verrez au module `LAM` : la classe anonyme, puis la lambda. Les trois font exactement la même chose."),
  ["La classe nommée a pourtant un avantage qu'on oublie : elle porte un nom, elle se réutilise, et elle se teste séparément — ce que fait justement la classe de test."]
]));
col.push(h2("Comment vérifier votre code"));
col.push(verif([
  { t: "be.ephec.java.col.e05.FiltrageTest", code: true },
  { t: "Vérifie le prédicat, y compris sur zéro et sur les négatifs, le comptage qui ne supprime rien, la suppression, et le fonctionnement sur une LinkedList." }
]));
col.push(h2("Questions à se poser"));
col.push(bulletRuns([
  "Essayez de supprimer les pairs avec une boucle ",
  { t: "for", code: true },
  " et un ",
  { t: "remove", code: true },
  " au passage. Quelle exception obtenez-vous, et pourquoi ",
  { t: "removeIf", code: true },
  " existe-t-elle ?"
]));
col.push(bulletRuns([
  { t: "removeIf", code: true },
  " est déclarée sur ",
  { t: "Collection", code: true },
  ", pas sur ",
  { t: "List", code: true },
  ". Sur quelles autres structures fonctionne-t-elle donc ?"
]));
col.push(saut());

// --- COL.6
col.push(h1("COL.6 — Un ensemble sans doublons"));
col.push(p("Package : be.ephec.java.col.e06", { italic: true, color: GREY }));
col.push(h2("Objectif"));
col.push(p("Constater les deux services que rend un Set : l'unicité, et la rapidité de la recherche."));
col.push(h2("Énoncé"));
col.push(tableau(["Élément", "Signature", "Rôle"], [
  ["sansDoublons", "public static Set<Integer> sansDoublons(List<Integer>)", "Les mêmes valeurs, une seule fois chacune"],
  ["aEteTire", "public static boolean aEteTire(Set<Integer>, int)", "Le nombre figure-t-il dans l'ensemble"],
  ["doublons", "public static int doublons(List<Integer>)", "Combien de valeurs ont été perdues"]
], [2100, 4400, 2860]));
col.push(runs([
  { t: "Indice : ", b: true },
  { t: "HashSet", code: true },
  " a un constructeur qui accepte n'importe quelle ",
  { t: "Collection", code: true },
  ". Et pour compter les doublons, une soustraction suffit — inutile de compter les répétitions une par une."
]));
col.push(h2("Comment vérifier votre code"));
col.push(verif([
  { t: "be.ephec.java.col.e06.TirageTest", code: true },
  { t: "Vérifie l'élimination des doublons, l'appartenance, le décompte des doublons perdus, et le cas de la liste vide." }
]));
col.push(h2("Questions à se poser"));
col.push(bulletRuns([
  "Un ",
  { t: "Set", code: true },
  " répond à « me contiens-tu ? » sans parcourir ses éléments. Comment est-ce possible, et qu'est-ce qui rend cela impossible pour une ",
  { t: "List", code: true },
  " ?"
]));
col.push(bullet("Sur 100 tirages entre 1 et 1000, combien de doublons obtenez-vous en moyenne ? Le chiffre est plus élevé que l'intuition ne le suggère."));
col.push(bullet("Que perdez-vous en passant d'une List à un Set, en dehors des doublons ?"));
col.push(saut());

// --- COL.7
col.push(h1("COL.7 — Une table de collections"));
col.push(p("Package : be.ephec.java.col.e07", { italic: true, color: GREY }));
col.push(h2("Objectif"));
col.push(p("Emboîter deux structures, et laisser la structure porter une règle métier."));
col.push(h2("Énoncé"));
col.push(runs([
  "Complétez la classe ",
  { t: "Inscriptions", code: true },
  ", qui associe à chaque étudiant l'ensemble des cours qu'il suit — une ",
  { t: "Map<String, Set<String>>", code: true },
  "."
]));
col.push(tableau(["Élément", "Signature", "Rôle"], [
  ["inscrire", "public void inscrire(String, String)", "Inscrit un étudiant à un cours"],
  ["coursDe", "public Set<String> coursDe(String)", "Ses cours, ou un ensemble VIDE s'il est inconnu"],
  ["etudiants", "public List<String> etudiants()", "Les noms, par ordre alphabétique"],
  ["rapport", "public String rapport()", "Un étudiant par ligne, cours triés"]
], [2000, 4000, 3360]));
col.push(...code([
  "Lovelace : Algebre, Java",
  "Turing : Java"
]));
col.push(runs([
  { t: "Indice : ", b: true },
  "cherchez ",
  { t: "computeIfAbsent", code: true },
  " dans la Javadoc de ",
  { t: "Map", code: true },
  ". Elle remplace « si l'étudiant n'existe pas encore, lui créer un ensemble vide, puis y ajouter le cours »."
]));
col.push(h2("Deux décisions de conception"));
col.push(runs([
  { t: "Un Set et non une List pour les cours. ", b: true },
  "Un étudiant ne s'inscrit pas deux fois au même cours. Écrit ainsi, c'est la structure qui l'interdit — personne n'a besoin d'y penser au moment d'appeler ",
  { t: "inscrire", code: true },
  "."
]));
col.push(runs([
  { t: "Un ensemble vide plutôt que null. ", b: true },
  { t: "coursDe", code: true },
  " d'un étudiant inconnu retourne un ensemble vide, sur lequel l'appelant peut boucler sans rien vérifier. Comparez avec le ",
  { t: "chercher", code: true },
  " de ",
  { t: "COL.2", code: true },
  ", qui retourne ",
  { t: "null", code: true },
  " — et voyez lequel des deux vous préféreriez utiliser. C'est la règle ",
  { t: "CC-ERR.2", code: true },
  " du mémento Clean Code."
]));
col.push(h2("Comment vérifier votre code"));
col.push(verif([
  { t: "be.ephec.java.col.e07.InscriptionsTest", code: true },
  { t: "Vérifie l'inscription à plusieurs cours, l'ensemble vide pour un inconnu, l'absence d'effet d'une inscription en double, l'ordre alphabétique et le format du rapport." }
]));
col.push(h2("Questions à se poser"));
col.push(bulletRuns([
  "Écrivez ",
  { t: "inscrire", code: true },
  " sans ",
  { t: "computeIfAbsent", code: true },
  ", avec un test explicite. Combien de lignes, et laquelle des deux versions préférez-vous relire dans six mois ?"
]));
col.push(bullet("Quelle structure choisiriez-vous pour répondre à la question inverse : quels étudiants suivent le cours de Java ?"));
col.push(saut());

// --- COL.8 (ajoute le 23/10/2026 : Comparable et Comparator, COL §6)
col.push(h1("COL.8 — Trois ordres pour une bibliothèque"));
col.push(p("Package : be.ephec.java.col.e08", { italic: true, color: GREY }));
col.push(h2("Objectif"));
col.push(runs([
  "Donner un ordre naturel à une classe avec ",
  { t: "Comparable", code: true },
  ", puis lui fournir d'autres ordres de l'extérieur avec ",
  { t: "Comparator", code: true },
  "."
]));
col.push(h2("Énoncé"));
col.push(runs([
  "Le record ",
  { t: "Livre", code: true },
  " a un titre, un auteur et une année de parution. Complétez les quatre classes suivantes ; le ",
  { t: "Programme", code: true },
  " est fourni, et affiche la même bibliothèque dans les trois ordres."
]));
col.push(tableau(["Élément", "Signature", "Rôle"], [
  ["Livre", "public int compareTo(Livre autre)", "L'ordre naturel : par titre, alphabétiquement"],
  ["ParAnnee", "public int compare(Livre premier, Livre second)", "Par année, puis par titre à égalité"],
  ["ParAuteur", "public int compare(Livre premier, Livre second)", "Par auteur, puis par titre"],
  ["parTitre", "public static List<Livre> parTitre(List<Livre>)", "Une nouvelle liste, dans l'ordre naturel"],
  ["parAnnee", "public static List<Livre> parAnnee(List<Livre>)", "Une nouvelle liste, triée avec ParAnnee"],
  ["rangesParAuteur", "public static Set<Livre> rangesParAuteur(List<Livre>)", "Un TreeSet construit avec ParAuteur"]
], [1900, 4300, 3160]));
col.push(runs([
  { t: "Indices : ", b: true },
  "une ",
  { t: "String", code: true },
  " sait déjà se comparer ; pour les années, ",
  { t: "Integer.compare", code: true },
  " plutôt qu'une soustraction (voir COL §6). La méthode ",
  { t: "sort", code: true },
  " d'une ",
  { t: "List", code: true },
  " reçoit un comparateur, et le constructeur de ",
  { t: "TreeSet", code: true },
  " aussi. Comme dans ",
  { t: "COL.1", code: true },
  ", aucune méthode de ",
  { t: "Tris", code: true },
  " ne modifie la liste reçue."
]));
col.push(h2("Comment vérifier votre code"));
col.push(verif([
  { t: "be.ephec.java.col.e08.TrisTest", code: true },
  { t: "Vérifie l'ordre naturel, les trois tris, le départage à égalité, que l'ensemble garde tous les livres, et que la liste reçue n'est pas modifiée." }
]));
col.push(h2("Questions à se poser"));
col.push(bulletRuns([
  "Retirez le second critère de ",
  { t: "ParAuteur", code: true },
  " (le titre), et relancez le test. Combien de livres reste-t-il dans l'ensemble, et pourquoi ?"
]));
col.push(bullet("Pourquoi l'ordre par titre est-il l'ordre naturel, et pas l'ordre par année ? Qu'est-ce qui rend un ordre « naturel » pour une classe ?"));
col.push(bulletRuns([
  "Au module ",
  { t: "LAM", code: true },
  ", chacun des deux comparateurs tiendra en une ligne. Lesquelles de ces classes vous paraîtront alors encore utiles ?"
]));

// =====================================================================
//  EXC
// =====================================================================
const exc = [];
couverture(exc, "EXC", "Exceptions",
  "Signaler ce qui ne va pas, et le traiter là où on peut y faire quelque chose");

modeEmploi(exc, "EXC", [
  ["EXC.1", "be.ephec.java.exc.e01", "Lever sa propre exception"],
  ["EXC.2", "be.ephec.java.exc.e02", "Un compte, sans exception"],
  ["EXC.3", "be.ephec.java.exc.e03", "Un numéro de compte vérifié"],
  ["EXC.4", "be.ephec.java.exc.e04", "Provoquer, puis traiter"],
  ["EXC.5", "be.ephec.java.exc.e05", "Lire une trace"]
]);

exc.push(h2("Ce qu'il faut avoir en tête"));
exc.push(p("Une exception est un objet. La lever interrompt le cours normal du programme et remonte la pile des appels jusqu'à trouver quelqu'un qui l'attrape. Si personne ne l'attrape, le programme s'arrête et affiche une trace."));
exc.push(...code([
  "throw new MonException(\"ce qui ne va pas\");     // lever",
  "",
  "try {",
  "    quelqueChoseQuiPeutEchouer();",
  "} catch (MonException e) {",
  "    System.out.println(e.getMessage());          // attraper",
  "}"
]));
exc.push(h2("Contrôlée ou non contrôlée"));
exc.push(tableau(["", "Contrôlée", "Non contrôlée"], [
  ["Hérite de", "Exception", "RuntimeException"],
  ["Le compilateur", "oblige à traiter ou à déclarer", "n'exige rien"],
  ["À utiliser pour", "une erreur prévisible dont l'appelant doit se soucier", "une erreur de programmation"],
  ["Exemples", "fichier introuvable, IBAN invalide", "division par zéro, indice hors limites"]
], [1900, 3700, 3760], []));
exc.push(runs([
  "Vos exceptions à vous seront contrôlées dans ",
  { t: "EXC.1", code: true },
  " et ",
  { t: "EXC.3", code: true },
  ". Celles d'",
  { t: "EXC.4", code: true },
  " sont levées par la JVM et ne sont pas contrôlées : le code compile sans ",
  { t: "try", code: true },
  ", et plante à l'exécution. C'est tout le piège."
]));
exc.push(saut());

// --- EXC.1
exc.push(h1("EXC.1 — Lever sa propre exception"));
exc.push(p("Package : be.ephec.java.exc.e01", { italic: true, color: GREY }));
exc.push(h2("Objectif"));
exc.push(p("Écrire une exception, la lever au bon moment, et laisser l'objet dans un état correct quand on la lève."));
exc.push(h2("Énoncé"));
exc.push(runs([
  "Complétez ",
  { t: "MoveException", code: true },
  " — une classe qui hérite d'",
  { t: "Exception", code: true },
  " et transmet un message à sa classe mère — puis la méthode ",
  { t: "deplace(int dx, int dy)", code: true },
  " de ",
  { t: "Point", code: true },
  "."
]));
exc.push(p("Un point ne peut pas sortir du quadrant positif. Si l'une des coordonnées deviendrait négative, le déplacement n'a pas lieu et la méthode lève l'exception, avec ce message exact :"));
exc.push(...code([
  "Deplacement refuse : (-3, 5) sort du quadrant positif"
]));
exc.push(encadre([
  [{ t: "Le vrai piège de l'exercice", b: true }],
  ["Le test vérifie qu'après un déplacement refusé, le point n'a pas bougé du tout."],
  ["Si vous écrivez dans les champs avant de vérifier, l'objet reste à moitié déplacé chaque fois que l'exception est levée. Une méthode qui échoue doit laisser l'objet tel qu'elle l'a trouvé — calculez d'abord, vérifiez, et n'écrivez qu'après."]
]));
exc.push(h2("Comment vérifier votre code"));
exc.push(verif([
  { t: "be.ephec.java.exc.e01.PointTest", code: true },
  { t: "Vérifie que l'exception est contrôlée, le déplacement valide, le refus, l'intégrité du point après refus, le message exact, et que zéro reste accepté." }
]));
exc.push(h2("Questions à se poser"));
exc.push(bulletRuns([
  "Faites hériter ",
  { t: "MoveException", code: true },
  " de ",
  { t: "RuntimeException", code: true },
  " au lieu d'",
  { t: "Exception", code: true },
  ". Que devient le ",
  { t: "try", code: true },
  " de votre programme ? Est-ce un progrès ?"
]));
exc.push(bullet("Un déplacement refusé est-il une erreur de programmation ou un événement normal ? Votre réponse justifie le choix de la classe mère."));
exc.push(saut());

// --- EXC.2
exc.push(h1("EXC.2 — Un compte, sans exception"));
exc.push(p("Package : be.ephec.java.exc.e02", { italic: true, color: GREY }));
exc.push(h2("Objectif"));
exc.push(p("Écrire d'abord la version sans exception, pour voir précisément ce qui lui manque."));
exc.push(h2("Énoncé"));
exc.push(runs([
  "Complétez la classe ",
  { t: "Compte", code: true },
  ". Un compte qui vient d'être créé est à zéro."
]));
exc.push(tableau(["Élément", "Signature", "Rôle"], [
  ["getSolde", "public double getSolde()", "Le solde courant"],
  ["ajoute", "public void ajoute(double)", "Ajoute au solde"],
  ["retire", "public double retire(double)", "Retire, et retourne ce qui a réellement été retiré"]
], [1900, 3500, 3960]));
exc.push(p("On ne peut pas retirer plus que le solde : sur un compte à 100, un retrait de 120 retourne 100 et laisse le solde à zéro."));
exc.push(runs([
  "Écrivez ensuite ",
  { t: "GestionDeCompte", code: true },
  " et faites les trois essais : un dépôt, un retrait possible, un retrait excessif."
]));
exc.push(h2("La question à garder"));
exc.push(p("Sur un compte à 100, un retrait de 100 et un retrait de 120 retournent tous deux 100. L'appelant peut-il savoir si son retrait a été complet ? Que devrait-il faire pour s'en assurer ?"));
exc.push(p("Gardez votre réponse : c'est exactement le problème que l'exercice suivant résout."));
exc.push(h2("Comment vérifier votre code"));
exc.push(verif([
  { t: "be.ephec.java.exc.e02.CompteTest", code: true },
  { t: "Vérifie un nouveau compte, le dépôt, le retrait possible, le retrait plafonné, et le retrait sur un compte vide." }
]));
exc.push(saut());

// --- EXC.3
exc.push(h1("EXC.3 — Un numéro de compte vérifié"));
exc.push(p("Package : be.ephec.java.exc.e03", { italic: true, color: GREY }));
exc.push(h2("Objectif"));
exc.push(p("Valider dans le constructeur, avec une famille d'exceptions plutôt qu'une seule — ou l'inverse, selon ce dont l'appelant a besoin."));
exc.push(h2("Contexte : le contrôle d'un IBAN"));
exc.push(p("Un compte belge porte un numéro de la forme BECC NNNN NNNN NNNN. Sa validité se vérifie ainsi :"));
exc.push(...code([
  "1. retirer tout ce qui n'est ni lettre ni chiffre",
  "2. deplacer les quatre premiers caracteres a la fin",
  "3. passer en majuscules",
  "4. remplacer chaque lettre par sa position dans l'alphabet plus 9",
  "     A vaut 10, B vaut 11, ... Z vaut 35",
  "5. le reste de la division du nombre obtenu par 97 doit valoir 1"
]));
exc.push(runs([
  { t: "Le nombre obtenu dépasse largement un ", b: true },
  { t: "long", code: true },
  { t: ". ", b: true },
  "Utilisez ",
  { t: "java.math.BigInteger", code: true },
  ", qui n'a pas de limite de taille."
]));
exc.push(h2("Énoncé"));
exc.push(runs([
  "Complétez les quatre classes d'exception, puis la classe ",
  { t: "Compte", code: true },
  ". Le constructeur reçoit le numéro et le vérifie en trois temps, dans cet ordre : la longueur, le préfixe, le contrôle modulo 97."
]));
exc.push(tableau(["Erreur", "Exception", "Message imposé"], [
  ["longueur", "IbanLongueurException", "L'IBAN doit contenir 16 caracteres, en contient 12"],
  ["préfixe", "IbanPrefixeException", "L'IBAN doit commencer par BE, commence par FR"],
  ["modulo", "IbanModuloException", "Le controle modulo 97 est incorrect : 28 au lieu de 1"]
], [1500, 3000, 4860], [1]));
exc.push(runs([
  "Les trois héritent d'",
  { t: "IbanInvalideException", code: true },
  ", qui hérite d'",
  { t: "Exception", code: true },
  ". Le numéro est mémorisé sous sa forme nettoyée, sans espaces."
]));
exc.push(runs([
  { t: "Les messages sont vérifiés au caractère près. ", b: true },
  "Chacun dit ce qui était attendu ET ce qui a été reçu : « IBAN invalide » n'aiderait personne à corriger sa saisie. Voir ",
  { t: "CC-ERR.4", code: true },
  " du mémento Clean Code."
]));
exc.push(h2("La question qui fait l'exercice"));
exc.push(encadre([
  [{ t: "Trois exceptions ou une seule ?", b: true }],
  ["Dans GestionDeCompte, essayez les quatre numéros donnés en commentaire. Combien de blocs catch écrivez-vous ?"],
  ["Si votre réaction est la même dans les trois cas — afficher le problème — un seul catch sur la classe mère suffit, et trois blocs identiques n'apporteraient rien. Si elle devait différer — proposer une correction pour une faute de frappe, rediriger vers une banque étrangère — alors les trois classes distinctes prennent tout leur sens."],
  ["C'est la règle CC-ERR.5 : on ne définit pas une exception par cause technique, mais selon ce que l'appelant doit distinguer. Ici, la hiérarchie offre les deux."]
]));
exc.push(h2("Comment vérifier votre code"));
exc.push(verif([
  { t: "be.ephec.java.exc.e03.CompteTest", code: true },
  { t: "Vérifie la hiérarchie des exceptions, le calcul du modulo, l'acceptation d'un IBAN valide, les trois refus avec leur message exact, l'ordre des contrôles, et qu'un seul catch attrape bien les trois." }
]));
exc.push(h2("Questions à se poser"));
exc.push(bullet("La validation est dans le constructeur. Qu'est-ce que cela garantit qu'une méthode valider() appelée séparément ne garantirait pas ?"));
exc.push(bulletRuns([
  "Écrivez deux ",
  { t: "catch", code: true },
  ", d'abord sur ",
  { t: "IbanInvalideException", code: true },
  " puis sur ",
  { t: "IbanPrefixeException", code: true },
  ". Que dit le compilateur, et pourquoi a-t-il raison ?"
]));
exc.push(saut());

// --- EXC.4
exc.push(h1("EXC.4 — Provoquer, puis traiter"));
exc.push(p("Package : be.ephec.java.exc.e04", { italic: true, color: GREY }));
exc.push(h2("Objectif"));
exc.push(p("Rencontrer des exceptions qu'on n'a pas écrites, et que le compilateur ne signale pas."));
exc.push(h2("Énoncé — première partie"));
exc.push(runs([
  { t: "Écrivez d'abord le Programme SANS aucun try. ", b: true },
  "Il demande la taille d'un tableau, le crée, demande une position, et y place la valeur 12."
]));
exc.push(...code([
  "int[] tableau = new int[taille];",
  "tableau[position] = 12;"
]));
exc.push(p("Lancez-le deux fois : une taille négative, puis une position hors limites. Notez les deux messages d'erreur — c'est en les lisant que vous saurez quelles exceptions attraper. Remarquez surtout que le code a compilé sans rien dire."));
exc.push(h2("Énoncé — seconde partie"));
exc.push(runs([
  "Complétez ",
  { t: "Tableau.placerDouze(int taille, int position)", code: true },
  ", qui fait la même chose mais ne laisse jamais échapper d'exception. Elle retourne un compte-rendu, aux formulations imposées :"
]));
exc.push(...code([
  "placerDouze(5, 2)    ->  \"12 place en position 2 d'un tableau de 5 cases\"",
  "placerDouze(-3, 0)   ->  \"Taille impossible : -3\"",
  "placerDouze(5, 7)    ->  \"Position 7 hors du tableau de 5 cases\""
]));

exc.push(h2("Le programme, et pourquoi il boucle"));
exc.push(runs([
  { t: "Annoncez d'abord ce que le programme fait. ", b: true },
  "Sans cela l'utilisateur voit surgir deux questions sans savoir ce qu'on attend de lui. Dites aussi ce qui peut mal tourner : c'est le sujet de l'exercice, pas un accident."
]));
exc.push(runs([
  "Demandez ensuite la taille ",
  { t: "une seule fois", b: true },
  ", puis ",
  { t: "bouclez sur la position", b: true },
  " jusqu'à ce que l'utilisateur entre ",
  { t: "-6", code: true },
  ". Rappelez-lui les positions valides et la façon de sortir."
]));
exc.push(p("La boucle n'est pas un ornement. Elle permet d'essayer plusieurs positions dans le même tableau, et c'est en les essayant qu'on voit où sont les limites. Redémarrer le programme entre chaque essai décourage l'expérimentation — or c'est elle qui enseigne ici."));
exc.push(encadre([
  [{ t: "Un message calculé peut devenir absurde", b: true }],
  ["« Positions valides : 0 à taille - 1 » donne « 0 à -4 » si l'utilisateur entre -3. Le message est juste au sens du calcul, et il ne veut rien dire."],
  ["Prévoyez le cas. C'est une habitude à prendre : dès qu'un texte affiché contient une valeur calculée, demandez-vous quelle saisie le rendrait ridicule."]
]));
exc.push(runs([
  { t: "Vérifiez enfin ce que la boucle change. ", b: true },
  "Avec votre première version, sans try, le programme s'arrête net à la première erreur : la boucle ne repart pas. Avec les try, elle survit et l'utilisateur peut réessayer. C'est exactement ce que l'exercice veut montrer."
]));
exc.push(h2("Comment vérifier votre code"));
exc.push(verif([
  { t: "be.ephec.java.exc.e04.TableauTest", code: true },
  { t: "Vérifie le cas normal, les deux bornes valides, la taille négative, la position hors limites dans les deux sens, et surtout qu'aucune exception ne sort de la méthode." }
]));
exc.push(h2("Questions à se poser"));
exc.push(bullet("Un indice négatif et un indice trop grand lèvent la même exception. Cela vous paraît-il logique ?"));
exc.push(bullet("Faut-il mettre tout le corps de la méthode dans le try, ou seulement ce qui peut échouer ? Que gagne-t-on à réduire le bloc ?"));
exc.push(bullet("Ces exceptions ne sont pas contrôlées : le compilateur ne vous oblige à rien. Pourquoi ce choix, à votre avis, alors qu'un IBAN invalide l'est ?"));
exc.push(saut());

// --- EXC.5
exc.push(h1("EXC.5 — Lire une trace"));
exc.push(p("Package : be.ephec.java.exc.e05", { italic: true, color: GREY }));
exc.push(h2("Objectif"));
exc.push(p("Savoir lire ce que le programme affiche quand il s'arrête — et comprendre que le lieu de l'erreur n'est pas toujours sa cause."));
exc.push(h2("Énoncé"));
exc.push(runs([
  "Le package contient un petit jeu de rôle en quatre classes. Lancez ",
  { t: "ProgrammeJdR", code: true },
  ". Il plante. ",
  { t: "Lisez la trace avant de toucher au code.", b: true }
]));
exc.push(p("Complétez ensuite la classe Diagnostic, dont chaque méthode répond à une question sur ce que vous avez lu."));
exc.push(tableau(["Élément", "Ce qu'il faut répondre"], [
  ["typeDException", "Le nom simple de l'exception levée"],
  ["messageDeLException", "Ce qui suit les deux points, sur la première ligne"],
  ["classeFautive", "La classe où l'exception a été levée"],
  ["methodeFautive", "Le nom de la méthode, tel qu'il figure dans la trace"],
  ["methodeAppelante", "Celle qui a appelé le code fautif"]
], [2600, 6760], [0]));
exc.push(runs([
  { t: "Attention à methodeFautive : ", b: true },
  "ce n'est pas forcément un nom que vous avez écrit. Recopiez exactement ce que dit la trace, ponctuation comprise. La réponse vous apprendra quelque chose sur la façon dont la JVM désigne certaines méthodes."
]));
exc.push(h2("Comment se lit une trace"));
exc.push(p("La première ligne donne le type de l'exception et son message. Les lignes « at » qui suivent remontent la chaîne des appels : la première dit où l'erreur s'est produite, la dernière est toujours le point d'entrée du programme."));
exc.push(runs([
  "C'est la pile d'appels décrite en ",
  { t: "TEC-EXE.1", code: true },
  " du mémento technique, affichée au moment où tout s'arrête. Le numéro de ligne entre parenthèses est cliquable dans IntelliJ."
]));
exc.push(h2("La correction"));
exc.push(runs([
  "Complétez enfin ",
  { t: "degatsParCibleSansPlanter", code: true },
  ", qui retourne les dégâts par cible, ou 0 si le sort ne vise personne. ",
  { t: "Vous ne pouvez pas modifier la classe fautive : ", b: true },
  "traitez le problème là où vous avez la main."
]));
exc.push(h2("Comment vérifier votre code"));
exc.push(verif([
  { t: "be.ephec.java.exc.e05.DiagnosticTest", code: true },
  { t: "Vérifie vos cinq réponses et la correction. Les messages d'échec vous mettent sur la voie si vous vous trompez." }
]));
exc.push(h2("Questions à se poser"));
exc.push(bullet("L'erreur est dans une classe, mais la cause est ailleurs : quelle méthode a mis le programme dans cette situation ? Une trace sert autant à trouver le coupable qu'à remonter jusqu'à celui qui l'a mis en position de faillir."));
exc.push(bulletRuns([
  "On aurait pu entourer l'appel d'un ",
  { t: "try/catch", code: true },
  " au lieu de tester le nombre de cibles. Les deux fonctionnent — lequel préférez-vous, pour un cas parfaitement prévisible ?"
]));

// ---------------------------------------------------------------------
Packer.toBuffer(doc(col, "Exercices Java — Module COL")).then(b => {
  fs.writeFileSync(__dirname + "/../../enonces/par_module/COL_enonces.docx", b);
  console.log("COL :", Math.round(b.length / 1024), "Ko");
});
Packer.toBuffer(doc(exc, "Exercices Java — Module EXC")).then(b => {
  fs.writeFileSync(__dirname + "/../../enonces/par_module/EXC_enonces.docx", b);
  console.log("EXC :", Math.round(b.length / 1024), "Ko");
});
