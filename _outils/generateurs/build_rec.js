// build_rec.js — le fascicule du module REC, les exercices recapitulatifs.
//
// Deux series de revision (24/10/2026), a faire chez soi pendant les
// semaines sans cours : la premiere apres JUN (semaine du 30/03), la
// seconde apres FX1 (semaines du 27/04 et du 04/05). Chaque exercice
// reprend la forme d'une question d'examen.
//
//     node _outils/generateurs/build_rec.js

const fs = require("fs");
const B = require(__dirname + "/boite.js");
const {
  p, runs, bullet, bulletRuns, code, h1, h2, tableau, verif, encadre,
  saut, couverture, modeEmploi, doc, Packer, GREY
} = B;

const rec = [];
couverture(rec, "REC", "Exercices récapitulatifs",
  "Deux séries de révision, dans la forme de l'examen");

modeEmploi(rec, "REC", [
  ["REC.1", "be.ephec.java.rec.e01", "Une horloge sur 24 heures"],
  ["REC.2", "be.ephec.java.rec.e02", "Un parc de véhicules"],
  ["REC.3", "be.ephec.java.rec.e03", "Tester, puis corriger"],
  ["REC.4", "be.ephec.java.rec.e04", "Le registre des inscrits"],
  ["REC.5", "be.ephec.java.rec.e05", "Un compte bancaire, à partir de rien"],
  ["REC.6", "be.ephec.java.rec.e06", "Un historique générique"],
  ["REC.7", "be.ephec.java.rec.e07", "Outils génériques et lambdas"],
  ["REC.8", "be.ephec.java.rec.e08", "Un thermomètre, et ses tests"],
  ["REC.9", "be.ephec.java.rec.e09", "Une fenêtre qui filtre"],
  ["REC.10", "be.ephec.java.rec.e10", "Une hiérarchie, à partir de rien"]
]);

// ---------------------------------------------------------------------
//  Pourquoi ces exercices, et comment les prendre
// ---------------------------------------------------------------------
rec.push(h1("Deux séries, et pourquoi"));
rec.push(p("Les modules précédents vous ont fait pratiquer une notion à la fois. L'examen, lui, ne prévient pas : chaque question mobilise plusieurs modules, et c'est à vous de reconnaître lesquels. Ces exercices vous y entraînent. Aucun n'introduit de notion nouvelle ; chacun en combine plusieurs, dans la forme exacte d'une question d'examen."));
rec.push(runs([
  { t: "La première série", b: true },
  " se fait après le module JUN, pendant la semaine sans cours de fin mars. Elle couvre les classes, les exceptions, les hiérarchies, les énumérations, les collections, le mot-clé ",
  { t: "static", code: true },
  " et l'écriture de tests. ",
  { t: "La seconde", b: true },
  " se fait après le premier module JavaFX, pendant les deux semaines sans cours de fin avril. Elle ajoute les types génériques, les lambdas et une première fenêtre."
]));
rec.push(tableau(["Exercice", "La forme d'examen qu'il reprend", "Modules mobilisés"], [
  ["REC.1", "Question 1 : une classe simple et son exception", "POO, EXC"],
  ["REC.2", "Question 4 : une hiérarchie d'interfaces et de classes abstraites", "ABS, ITF, ENU, COL"],
  ["REC.3", "Question 3 : écrire la classe de test, et corriger ce qu'elle révèle", "JUN, EXC"],
  ["REC.4", "Hors forme fixe : static, Map, tri et exception", "STA, COL, EXC"],
  ["REC.5", "Question 1 en conditions réelles : aucun squelette", "POO, EXC"],
  ["REC.6", "Question 2 : une classe générique et une collection", "GEN, COL, EXC"],
  ["REC.7", "Des méthodes génériques qui reçoivent des lambdas", "GEN, LAM"],
  ["REC.8", "Questions 1 et 3 : la classe, et ses tests écrits par vous, avant elle", "POO, EXC, JUN"],
  ["REC.9", "Question 5 : une fenêtre, un filtre d'événements", "FX, LAM"],
  ["REC.10", "Question 4 en conditions réelles : aucun squelette", "ABS, ITF, ENU, COL"]
], [1300, 5260, 2800], [0]));

rec.push(h2("Comment les prendre"));
rec.push(bulletRuns([
  { t: "Lisez la classe de test avant d'écrire. ", b: true },
  "À l'examen, elle vous est donnée ; elle dit, mieux que l'énoncé, ce qui sera vérifié. Prenez l'habitude de la parcourir d'abord."
]));
rec.push(bulletRuns([
  { t: "Chronométrez-vous. ", b: true },
  "Une question d'examen vaut une trentaine de minutes. Si un exercice vous en prend le double, c'est une information : notez ce qui vous a ralenti, et revoyez ce module-là."
]));
rec.push(bulletRuns([
  { t: "Ne regardez pas le corrigé avant d'avoir un test vert ", b: true },
  "ou d'avoir vraiment bloqué. Un corrigé lu trop tôt donne l'impression d'avoir compris ; seul le code qu'on a écrit soi-même tient le jour de l'examen."
]));
rec.push(bulletRuns([
  { t: "Le mémento Clean Code est autorisé à l'examen. ", b: true },
  "Les corrigés y renvoient : c'est le moment de vérifier que vous savez retrouver une règle à partir de son code."
]));
rec.push(saut());

// ---------------------------------------------------------------------
//  REC.1
// ---------------------------------------------------------------------
rec.push(h1("REC.1 — Une horloge sur 24 heures"));
rec.push(p("Package : be.ephec.java.rec.e01", { italic: true, color: GREY }));
rec.push(h2("Objectif"));
rec.push(p("Écrire une classe simple avec ses règles de validité, son exception personnalisée et son affichage formaté — la question 1 de l'examen."));
rec.push(h2("Énoncé"));
rec.push(runs([
  "La classe ",
  { t: "Horloge24h", code: true },
  " représente une heure de la journée : des heures de 0 à 23, des minutes de 0 à 59. Toute valeur hors de ces bornes est refusée par une ",
  { t: "HeureInvalideException", code: true },
  ", que vous écrivez aussi. On peut avancer l'horloge d'une durée ; passé minuit, elle repart de zéro."
]));
rec.push(h2("Spécifications à respecter"));
rec.push(tableau(["Élément", "Signature", "Rôle"], [
  ["constructeur", "Horloge24h(int heures, int minutes) throws HeureInvalideException", "Refuse une heure hors bornes"],
  ["getHeures, getMinutes", "int getHeures(), int getMinutes()", "Les deux composants"],
  ["setHeures, setMinutes", "void setHeures(int) throws HeureInvalideException, idem pour setMinutes", "Refusent la valeur hors bornes ; l'horloge ne change alors pas"],
  ["ajouter", "void ajouter(int heures, int minutes)", "Avance l'horloge ; les minutes qui dépassent 59 deviennent une heure, les heures qui dépassent 23 repartent de 0"],
  ["ajouter", "void ajouter(Horloge24h duree)", "La même chose, à partir d'une autre horloge"],
  ["toString", "String toString()", [{ t: "\"HH:MM\"", code: true }, ", toujours deux chiffres par composant"]],
  ["HeureInvalideException", "hérite d'Exception", "Contrôlée ; son message nomme la valeur refusée"]
], [2100, 4160, 3100]));
rec.push(h2("Exemples attendus"));
rec.push(...code([
  "new Horloge24h(9, 3).toString()     ->  \"09:03\"",
  "",
  "Horloge24h h = new Horloge24h(23, 50);",
  "h.ajouter(0, 20);                    ->  \"00:10\"",
  "h.ajouter(new Horloge24h(1, 15));    ->  \"01:25\"",
  "",
  "new Horloge24h(24, 0)                ->  HeureInvalideException",
  "h.setMinutes(60)                     ->  HeureInvalideException, h inchangee"
]));
rec.push(h2("Ce qu'il faut remarquer"));
rec.push(runs([
  "Le constructeur et les deux modificateurs vérifient les mêmes bornes. Ne les écrivez pas trois fois : le constructeur peut appeler les modificateurs (",
  { t: "CC-CLS.3", code: true },
  "). Pour l'addition, ramenez tout en minutes, additionnez, puis redécoupez : le reste de la division fait le tour du cadran à votre place."
]));
rec.push(h2("Comment vérifier votre code"));
rec.push(verif([
  { t: "be.ephec.java.rec.e01.Horloge24hTest", code: true },
  { t: "Vérifie que l'exception est contrôlée, les bornes des deux côtés, que l'horloge reste intacte après un refus, le format sur deux chiffres, la retenue des minutes, le tour du cadran, et que l'horloge passée en durée ne change pas." }
]));
rec.push(h2("Questions à se poser"));
rec.push(bulletRuns([
  "Que fait votre ",
  { t: "ajouter", code: true },
  " avec une durée négative ? L'énoncé ne le dit pas : décidez, et dites-le dans la Javadoc (",
  { t: "CC-COM.2", code: true },
  ")."
]));
rec.push(bulletRuns([
  "Pourquoi une exception ",
  { t: "contrôlée", i: true },
  " ici, alors que ",
  { t: "IllegalArgumentException", code: true },
  " aurait suffi ? Qu'est-ce que cela change pour le ",
  { t: "Programme", code: true },
  " ? Voir ",
  { t: "CC-ERR.1", code: true },
  "."
]));
rec.push(saut());

// ---------------------------------------------------------------------
//  REC.2
// ---------------------------------------------------------------------
rec.push(h1("REC.2 — Un parc de véhicules"));
rec.push(p("Package : be.ephec.java.rec.e02", { italic: true, color: GREY }));
rec.push(h2("Objectif"));
rec.push(p("Écrire une hiérarchie à deux niveaux sous une interface, avec une énumération et une liste parcourue sans test de type — la question 4 de l'examen."));
rec.push(h2("Contexte"));
rec.push(runs([
  "Une commune taxe les véhicules de son parc. La taxe dépend de la sorte de véhicule et de son énergie. Le parc, lui, ne veut connaître que des ",
  { t: "Vehicule", code: true },
  " : il demande à chacun sa taxe et sa description, sans savoir lequel est une voiture ou une moto."
]));
rec.push(h2("Énoncé"));
rec.push(p("Les classes sont déclarées, leurs liens d'héritage aussi ; les corps sont à écrire. La hiérarchie est la suivante."));
rec.push(tableau(["Classe", "Nature", "Ce qu'elle apporte"], [
  ["Taxable", "interface", [{ t: "double taxeAnnuelle()", code: true }]],
  ["Vehicule", "abstraite, implémente Taxable", "Marque, année, énergie ; " + "nombreDeRoues() abstraite ; description()"],
  ["Automobile", "abstraite, hérite de Vehicule", "Quatre roues"],
  ["DeuxRoues", "abstraite, hérite de Vehicule", "Deux roues"],
  ["Voiture", "hérite d'Automobile", "Une puissance en kW ; taxe = 2 € par kW"],
  ["Camionnette", "hérite d'Automobile", "Une charge utile en kg ; taxe = 120 € + 1 € par 10 kg"],
  ["Moto", "hérite de DeuxRoues", "Une cylindrée en cm³ ; taxe = 0,25 € par cm³"],
  ["Scooter", "hérite de DeuxRoues", "Rien de plus ; taxe = 25 € de forfait"]
], [1900, 3000, 4460], [0]));
rec.push(runs([
  "Chaque taxe est ensuite multipliée par le coefficient de l'énergie, que porte l'énumération ",
  { t: "Energie", code: true },
  " : 1,0 pour l'essence, 1,25 pour le diesel, 0,2 pour l'électrique. Les divisions sont réelles : 5 kg valent un demi-euro."
]));
rec.push(h2("Spécifications à respecter"));
rec.push(tableau(["Élément", "Signature", "Rôle"], [
  ["description", "String description()", [{ t: "\"Toyota (2019), 4 roues, essence\"", code: true }, " — écrite une seule fois, dans Vehicule"]],
  ["Parc.ajouter", "void ajouter(Vehicule)", "Range le véhicule, dans l'ordre d'arrivée"],
  ["Parc.taille", "int taille()", "Le nombre de véhicules"],
  ["Parc.taxeTotale", "double taxeTotale()", "La somme des taxes"],
  ["Parc.descriptions", "List<String> descriptions()", "Une description par véhicule, dans l'ordre d'ajout"],
  ["Parc.compter", "int compter(Energie)", "Combien roulent à cette énergie"],
  ["Parc.doyen", "Vehicule doyen()", [
    "Le plus ancien ; à année égale, le premier ajouté. Parc vide : ",
    { t: "IllegalStateException", code: true }
  ]]
], [2100, 3400, 3860]));
rec.push(h2("Ce qui vous est fourni"));
rec.push(runs([
  { t: "Energie", code: true },
  ", complète : trois valeurs, un libellé, un coefficient. Lisez-la : c'est elle qui donne le texte de la description et le facteur de la taxe. Les classes de la hiérarchie sont déclarées avec leurs liens ",
  { t: "extends", code: true },
  " et ",
  { t: "implements", code: true },
  " ; à l'examen, vous les écririez vous-même. ",
  { t: "REC.10", code: true },
  ", dans la seconde série, vous le fera faire."
]));
rec.push(h2("Comment vérifier votre code"));
rec.push(verif([
  { t: "be.ephec.java.rec.e02.ParcTest", code: true },
  { t: "Vérifie quelles classes sont abstraites, le lien avec Taxable, les accesseurs, le nombre de roues, la description, les quatre formules de taxe avec les trois énergies, et les six méthodes du parc, dont le doyen à année égale et le parc vide." }
]));
rec.push(h2("Questions à se poser"));
rec.push(bulletRuns([
  { t: "Vehicule", code: true },
  " implémente ",
  { t: "Taxable", code: true },
  " sans écrire ",
  { t: "taxeAnnuelle", code: true },
  ". Pourquoi le compilateur l'accepte-t-il, et que se passerait-il si ",
  { t: "Scooter", code: true },
  " oubliait de l'écrire ?"
]));
rec.push(bulletRuns([
  "Votre ",
  { t: "Parc", code: true },
  " contient-il un ",
  { t: "instanceof", code: true },
  " ou un test sur le type ? Si oui, quelle méthode de la hiérarchie aurait dû faire ce travail ? Voir ",
  { t: "CC-CLS.4", code: true },
  "."
]));
rec.push(bulletRuns([
  "Si la commune ajoute une énergie, hybride par exemple, combien de fichiers faut-il toucher ? Et si elle ajoute une sorte de véhicule ?"
]));
rec.push(saut());

// ---------------------------------------------------------------------
//  REC.3
// ---------------------------------------------------------------------
rec.push(h1("REC.3 — Tester, puis corriger"));
rec.push(p("Package : be.ephec.java.rec.e03", { italic: true, color: GREY }));
rec.push(h2("Objectif"));
rec.push(p("Écrire la classe de test d'une classe fournie à partir de ses règles, la lancer, et corriger ce que les tests révèlent — la question 3 de l'examen."));
rec.push(h2("Énoncé"));
rec.push(runs([
  "La classe ",
  { t: "VerificateurDeMotDePasse", code: true },
  " vous est fournie. Elle a été écrite par quelqu'un d'autre, livrée sans test, et rien ne garantit qu'elle respecte ses règles. Les voici :"
]));
rec.push(bullet("niveau 1 : un mot de passe est valide s'il compte au moins 4 caractères ;"));
rec.push(bullet("niveau 2 : la règle du niveau 1, et au moins un chiffre ;"));
rec.push(bulletRuns([
  "un mot de passe ",
  { t: "null", code: true },
  " n'est jamais valide ;"
]));
rec.push(bulletRuns([
  "tout niveau autre que 1 ou 2 est refusé à la construction, par une ",
  { t: "IllegalArgumentException", code: true },
  "."
]));
rec.push(runs([
  "Écrivez ",
  { t: "VerificateurDeMotDePasseTest", code: true },
  " dans ",
  { t: "src/test/java", code: true },
  ", dans le package de l'exercice, avec au moins sept tests. Puis lancez-la, et corrigez la classe fournie là où un test est rouge — et seulement là."
]));
rec.push(h2("Spécifications à respecter"));
rec.push(tableau(["Cas à couvrir", "Ce que le test affirme"], [
  ["niveau 1, quatre caractères", "valide"],
  ["niveau 1, trois caractères", "invalide"],
  ["niveau 2, quatre caractères dont un chiffre", "valide"],
  ["niveau 2, sans chiffre", "invalide"],
  ["niveau 2, trop court malgré un chiffre", "invalide"],
  ["null, aux deux niveaux", "invalide"],
  ["niveau 0 ou 3", [{ t: "IllegalArgumentException", code: true }, " à la construction"]]
], [4000, 5360], [0]));
rec.push(encadre([
  [{ t: "Testez les bornes des deux côtés. ", b: true }, "« Au moins 4 » se vérifie avec 4 (accepté) et avec 3 (refusé). Un test avec 8 caractères ne dit rien de la borne : c'est précisément là que les erreurs d'une unité se cachent (", { t: "CC-TST.2", code: true }, ")."]
]));
rec.push(h2("Comment vérifier votre code"));
rec.push(verif([
  { t: "be.ephec.java.rec.e03.RedactionTest", code: true },
  { t: "Vérifie que votre classe de test existe, qu'elle compte au moins sept méthodes @Test, et que chacune porte un @DisplayName. Elle ne peut pas juger vos tests : c'est votre propre classe, verte après correction, qui le fait." }
]));
rec.push(h2("Questions à se poser"));
rec.push(bullet("Combien de défauts vos tests ont-ils révélés ? Si la réponse est zéro, relisez la table des cas : l'un d'eux manque."));
rec.push(bulletRuns([
  "Vous avez corrigé la classe. Vos tests sont-ils restés les mêmes ? Ils doivent l'être : un test qu'on retouche pour qu'il passe ne teste plus rien (",
  { t: "CC-TST.1", code: true },
  ")."
]));
rec.push(bullet("Le nom de chaque méthode de test dit-il la règle vérifiée, ou seulement « test1 » ? Le jour de l'examen, c'est aussi cela qui est lu."));
rec.push(saut());

// ---------------------------------------------------------------------
//  REC.4
// ---------------------------------------------------------------------
rec.push(h1("REC.4 — Le registre des inscrits"));
rec.push(p("Package : be.ephec.java.rec.e04", { italic: true, color: GREY }));
rec.push(h2("Objectif"));
rec.push(runs([
  "Combiner un compteur ",
  { t: "static", code: true },
  ", une ",
  { t: "Map", code: true },
  ", un tri par comparateur et une exception personnalisée : les notions qui se glissent dans n'importe quelle question."
]));
rec.push(h2("Énoncé"));
rec.push(runs([
  "Chaque ",
  { t: "Etudiant", code: true },
  " reçoit à sa création un matricule unique, ",
  { t: "ET-0001", code: true },
  " pour le premier créé, ",
  { t: "ET-0002", code: true },
  " pour le suivant. Le ",
  { t: "Registre", code: true },
  " range les inscrits par matricule et sait les retrouver, les trier par nom puis prénom, et compter les noms par initiale."
]));
rec.push(h2("Spécifications à respecter"));
rec.push(tableau(["Élément", "Signature", "Rôle"], [
  ["Etudiant", "Etudiant(String nom, String prenom)", "Attribue le matricule suivant"],
  ["getMatricule", "String getMatricule()", [{ t: "\"ET-\"", code: true }, " et le numéro sur quatre chiffres"]],
  ["getNombreCrees", "static int getNombreCrees()", "Les étudiants créés depuis le lancement"],
  ["toString", "String toString()", [{ t: "\"ET-0042 Lovelace Ada\"", code: true }]],
  ["ParNom", "implements Comparator<Etudiant>", "Par nom, puis par prénom"],
  ["Registre.inscrire", "void inscrire(Etudiant)", [{ t: "IllegalArgumentException", code: true }, " si déjà inscrit"]],
  ["Registre.trouver", "Etudiant trouver(String) throws EtudiantInconnuException", "Par matricule ; l'exception est contrôlée et cite le matricule"],
  ["Registre.parNom", "List<Etudiant> parNom()", "Tous les inscrits, triés avec ParNom"],
  ["Registre.parInitiale", "Map<Character, Integer> parInitiale()", [{ t: "{L=2, T=1}", code: true }, " pour Lovelace, Liskov et Turing"]]
], [2100, 4000, 3260]));
rec.push(h2("Ce qu'il faut remarquer"));
rec.push(runs([
  "Le compteur ne peut appartenir à aucun étudiant, puisqu'il les compte tous : il est ",
  { t: "static", code: true },
  ", et son accesseur aussi (",
  { t: "STA", code: true },
  "). Les valeurs d'une ",
  { t: "Map", code: true },
  " ne se trient pas sur place : copiez-les dans une liste, puis triez la liste. Pour compter par initiale, ",
  { t: "getOrDefault", code: true },
  " évite de tester si la lettre est déjà là."
]));
rec.push(h2("Comment vérifier votre code"));
rec.push(verif([
  { t: "be.ephec.java.rec.e04.RegistreTest", code: true },
  { t: "Vérifie que le compteur est un champ static, qu'il avance d'un par création, le format du matricule, l'inscription et la recherche, l'exception contrôlée et son message, le refus du doublon, le comparateur, le tri et le compte par initiale." }
]));
rec.push(encadre([
  [{ t: "Le compteur est partagé par tous les tests. ", b: true }, "JUnit ne garantit pas leur ordre : les tests ne supposent jamais que le prochain matricule sera ", { t: "ET-0001", code: true }, ", ils comparent avant et après. Gardez cette précaution en tête quand vous testerez vous-même une classe à état ", { t: "static", code: true }, "."]
]));
rec.push(h2("Questions à se poser"));
rec.push(bulletRuns([
  "Pourquoi ",
  { t: "inscrire", code: true },
  " lève-t-elle une exception du JDK, et ",
  { t: "trouver", code: true },
  " une exception à vous ? Qu'est-ce qui distingue les deux situations ? Voir ",
  { t: "CC-ERR.5", code: true },
  "."
]));
rec.push(bulletRuns([
  "Une ",
  { t: "HashMap", code: true },
  " ne garantit aucun ordre. Qu'auriez-vous dû choisir pour que ",
  { t: "parInitiale", code: true },
  " rende les lettres dans l'ordre alphabétique sans rien trier ?"
]));
rec.push(saut());

// ---------------------------------------------------------------------
//  REC.5
// ---------------------------------------------------------------------
rec.push(h1("REC.5 — Un compte bancaire, à partir de rien"));
rec.push(p("Package : be.ephec.java.rec.e05", { italic: true, color: GREY }));
rec.push(h2("Objectif"));
rec.push(p("Refaire la question 1 dans les conditions de l'examen : aucune classe n'existe, seule la classe de test dit ce qui est attendu."));
rec.push(h2("Ce qui change, et c'est beaucoup"));
rec.push(runs([
  { t: "Cet exercice n'a pas de squelette, ", b: true },
  "comme ",
  { t: "ABS.5", code: true },
  ". Vous partez d'un fichier ",
  { t: "Programme", code: true },
  " vide, et vous créez les trois classes dans le package. Les noms sont imposés, parce que la classe de test les emploie ; tout le reste — les champs, la façon dont chaque exception reçoit ses informations, la forme des messages — est à vous."
]));
rec.push(encadre([
  [{ t: "La classe de test est fournie, mais en commentaire", b: true }],
  ["Elle appelle des classes qui n'existent pas encore. Un fichier qui ne compile pas empêche la compilation de tout le module — y compris les exercices déjà réussis."],
  ["Quand vos classes seront écrites : sélectionnez tout le contenu du fichier et faites Ctrl+/ pour retirer les commentaires d'un coup. Les noms attendus sont rappelés en tête du fichier."]
]));
rec.push(h2("Énoncé"));
rec.push(runs([
  "Un ",
  { t: "CompteBancaire", code: true },
  " a un numéro, un titulaire et un solde, nul à l'ouverture. On y dépose et on en retire de l'argent. Un montant négatif ou nul est refusé par une ",
  { t: "MontantInvalideException", code: true },
  " ; un retrait qui dépasse le solde, par une ",
  { t: "SoldeInsuffisantException", code: true },
  " dont le message cite le solde et le montant demandé. Une opération refusée ne change pas le solde."
]));
rec.push(h2("Spécifications à respecter"));
rec.push(tableau(["Élément", "Signature", "Rôle"], [
  ["constructeur", "CompteBancaire(String numero, String titulaire)", "Solde initial : 0"],
  ["accesseurs", "String getNumero(), String getTitulaire(), double getSolde()", ""],
  ["deposer", "void deposer(double montant) throws MontantInvalideException", "Augmente le solde"],
  ["retirer", "void retirer(double montant) throws MontantInvalideException, SoldeInsuffisantException", "Diminue le solde ; retirer tout le solde est permis"],
  ["toString", "String toString()", [{ t: "\"BE01 - Ada Lovelace : 150.00 EUR\"", code: true }, " — ", { t: "String.format", code: true }, " avec ", { t: "Locale.US", code: true }, " pour le point"]],
  ["les deux exceptions", "héritent d'Exception", "Contrôlées"]
], [2000, 4600, 2760]));
rec.push(h2("Comment vérifier votre code"));
rec.push(verif([
  { t: "be.ephec.java.rec.e05.CompteBancaireTest", code: true },
  { t: "Une fois décommentée : vérifie le compte neuf, que les deux exceptions sont contrôlées, les dépôts, les retraits jusqu'à zéro compris, les deux refus et le solde intact après chacun, le message qui cite les deux montants, et l'affichage." }
]));
rec.push(h2("Questions à se poser"));
rec.push(bulletRuns([
  "Un retrait de −5 € est-il un montant invalide ou un solde insuffisant ? Dans quel ordre vos vérifications se font-elles, et pourquoi cet ordre-là ?"
]));
rec.push(bulletRuns([
  "Le contrôle du montant est le même pour ",
  { t: "deposer", code: true },
  " et ",
  { t: "retirer", code: true },
  ". L'avez-vous écrit deux fois ? Voir ",
  { t: "CC-CLS.3", code: true },
  "."
]));
rec.push(bulletRuns([
  "Combien de temps vous a pris cet exercice, sans squelette ? C'est votre repère le plus fidèle pour la question 1 de l'examen."
]));

rec.push(saut());

// ---------------------------------------------------------------------
//  REC.6
// ---------------------------------------------------------------------
rec.push(h1("REC.6 — Un historique générique"));
rec.push(p("Package : be.ephec.java.rec.e06", { italic: true, color: GREY }));
rec.push(h2("Objectif"));
rec.push(p("Écrire une classe générique qui enveloppe une collection, et montrer dans un programme à qui sert le paramètre de type — la question 2 de l'examen."));
rec.push(h2("Énoncé"));
rec.push(runs([
  "La classe ",
  { t: "Historique<T>", code: true },
  " enregistre des éléments dans l'ordre où ils arrivent : les commandes tapées par un utilisateur, les températures relevées par une station, les états d'une machine. Un historique ne contient qu'une sorte d'éléments, et c'est ",
  { t: "T", code: true },
  " qui dit laquelle."
]));
rec.push(h2("Spécifications à respecter"));
rec.push(tableau(["Élément", "Signature", "Rôle"], [
  ["enregistrer", "void enregistrer(T element)", "Ajoute à la fin"],
  ["dernier", "T dernier()", [{ t: "IllegalStateException", code: true }, " si l'historique est vide — l'exception existe dans le JDK"]],
  ["tout", "List<T> tout()", [
    "Du plus ancien au plus récent, ", { t: "non modifiable", b: true },
    " : celui qui la reçoit ne peut ni ajouter ni retirer (", { t: "Collections.unmodifiableList", code: true }, ")"
  ]],
  ["taille, estVide", "int taille(), boolean estVide()", ""],
  ["occurrences", "int occurrences(T element)", "Combien de fois cet élément a été enregistré"]
], [2100, 3400, 3860]));
rec.push(runs([
  "Le ",
  { t: "Programme", code: true },
  " crée ",
  { t: "deux historiques de types différents", b: true },
  ", y enregistre quelques valeurs, affiche le dernier élément, le tout et une occurrence, puis montre ce qui arrive quand on tente d'ajouter dans la liste rendue par ",
  { t: "tout()", code: true },
  ", et quand on demande ",
  { t: "dernier()", code: true },
  " à un historique vide. À l'examen, ce programme vaut des points : un seul historique de ",
  { t: "String", code: true },
  " ne montre pas que vous avez compris."
]));
rec.push(h2("Comment vérifier votre code"));
rec.push(verif([
  { t: "be.ephec.java.rec.e06.HistoriqueTest", code: true },
  { t: "Vérifie que la classe est générique, l'historique vide et son exception, l'ordre, le dernier, que tout() refuse l'ajout et le retrait tout en suivant les ajouts faits ensuite, que occurrences compare par valeur, et que le même code sert à deux types." }
]));
rec.push(h2("Questions à se poser"));
rec.push(bulletRuns([
  "Pourquoi ",
  { t: "tout()", code: true },
  " rend-elle une vue non modifiable plutôt qu'une copie ? Qu'est-ce qu'une copie ne ferait pas, que le test « tout() reflète les ajouts » exige ?"
]));
rec.push(bulletRuns([
  "Dans ",
  { t: "occurrences", code: true },
  ", avez-vous comparé avec ",
  { t: "==", code: true },
  " ou avec ",
  { t: "equals", code: true },
  " ? Essayez les deux avec des ",
  { t: "Integer", code: true },
  " de valeur 1000 : le test vous dira lequel est juste, le module COL vous dira pourquoi."
]));
rec.push(bulletRuns([
  "Que faudrait-il changer pour que ",
  { t: "Historique", code: true },
  " n'accepte que des éléments comparables, et puisse rendre le plus grand ? Voir ",
  { t: "GEN.4", code: true },
  "."
]));
rec.push(saut());

// ---------------------------------------------------------------------
//  REC.7
// ---------------------------------------------------------------------
rec.push(h1("REC.7 — Outils génériques et lambdas"));
rec.push(p("Package : be.ephec.java.rec.e07", { italic: true, color: GREY }));
rec.push(h2("Objectif"));
rec.push(p("Écrire des méthodes génériques qui reçoivent un comportement en paramètre, et les appeler avec des lambdas et des références de méthodes."));
rec.push(h2("Énoncé"));
rec.push(runs([
  "La classe ",
  { t: "Outils", code: true },
  " rassemble quatre méthodes ",
  { t: "static", code: true },
  " et génériques. Trois rendent une nouvelle liste et laissent leur argument intact ; la quatrième modifie la liste reçue."
]));
rec.push(h2("Spécifications à respecter"));
rec.push(tableau(["Élément", "Signature", "Rôle"], [
  ["filtrer", "static <T> List<T> filtrer(List<T>, Predicate<T>)", "Les éléments qui satisfont la condition, dans l'ordre"],
  ["compter", "static <T> int compter(List<T>, Predicate<T>)", "Combien la satisfont"],
  ["transformer", "static <T, R> List<R> transformer(List<T>, Function<T, R>)", "Chaque élément remplacé par le résultat de la fonction ; R peut différer de T"],
  ["echanger", "static <T> void echanger(List<T>, int i, int j)", "Permute deux éléments, dans la liste reçue"]
], [1800, 4400, 3160]));
rec.push(h2("Exemples attendus"));
rec.push(...code([
  "List<String> animaux = new ArrayList<>(",
  "        List.of(\"Chat\", \"Hippopotame\", \"Chien\", \"Cheval\", \"Ours\"));",
  "",
  "Outils.filtrer(animaux, nom -> nom.length() > 5)     ->  [Hippopotame, Cheval]",
  "Outils.compter(animaux, nom -> nom.startsWith(\"C\"))  ->  3",
  "Outils.transformer(animaux, String::length)          ->  [4, 11, 5, 6, 4]",
  "Outils.echanger(animaux, 0, 4);",
  "animaux                                              ->  [Ours, Hippopotame, Chien, Cheval, Chat]"
]));
rec.push(runs([
  "Le ",
  { t: "Programme", code: true },
  " fait ces quatre appels. Sa liste de départ est une ",
  { t: "ArrayList", code: true },
  " : ",
  { t: "List.of", code: true },
  " rend une liste figée, qui refuserait ",
  { t: "echanger", code: true },
  "."
]));
rec.push(h2("Comment vérifier votre code"));
rec.push(verif([
  { t: "be.ephec.java.rec.e07.OutilsTest", code: true },
  { t: "Vérifie que les quatre méthodes sont static, le filtrage et son ordre, que l'argument reste intact, le comptage, la transformation vers un autre type, et l'échange, y compris d'un élément avec lui-même." }
]));
rec.push(h2("Questions à se poser"));
rec.push(bulletRuns([
  { t: "compter", code: true },
  " peut s'écrire en une ligne à partir de ",
  { t: "filtrer", code: true },
  ". L'avez-vous fait, ou avez-vous réécrit la boucle ? Voir ",
  { t: "CC-CLS.3", code: true },
  "."
]));
rec.push(bulletRuns([
  "Pourquoi ",
  { t: "transformer", code: true },
  " a-t-elle deux paramètres de type et pas un seul ? Essayez de l'écrire avec ",
  { t: "<T>", code: true },
  " seulement, et lisez le message du compilateur sur ",
  { t: "String::length", code: true },
  "."
]));
rec.push(bulletRuns([
  "Les trois premières méthodes existent déjà dans le JDK, sous la forme de ",
  { t: "stream().filter", code: true },
  ", ",
  { t: "count", code: true },
  " et ",
  { t: "map", code: true },
  ". Réécrivez le ",
  { t: "Programme", code: true },
  " avec elles : qu'est-ce qui change dans la lecture ?"
]));
rec.push(saut());

// ---------------------------------------------------------------------
//  REC.8
// ---------------------------------------------------------------------
rec.push(h1("REC.8 — Un thermomètre, et ses tests"));
rec.push(p("Package : be.ephec.java.rec.e08", { italic: true, color: GREY }));
rec.push(h2("Objectif"));
rec.push(p("Écrire d'abord les tests, puis la classe : les questions 1 et 3 de l'examen, dans l'ordre inverse de l'habitude."));
rec.push(h2("Énoncé"));
rec.push(runs([
  "Un ",
  { t: "Thermometre", code: true },
  " mesure de −100 à +100 degrés Celsius, bornes comprises, et démarre à 0. Une valeur hors de cet intervalle est refusée par une ",
  { t: "TemperatureInvalideException", code: true },
  ", contrôlée, dont le message cite la valeur. Le thermomètre sait aussi se convertir en Fahrenheit."
]));
rec.push(runs([
  { t: "L'ordre compte. ", b: true },
  "Écrivez ",
  { t: "ThermometreTest", code: true },
  " dans ",
  { t: "src/test/java", code: true },
  " à partir du tableau ci-dessous, ",
  { t: "avant", i: true },
  " de toucher à ",
  { t: "Thermometre", code: true },
  ". Lancez : tout est rouge, et c'est normal. Puis complétez la classe jusqu'au vert. C'est la démarche du module JUN, sur un cas de la taille d'une question d'examen."
]));
rec.push(h2("Spécifications à respecter"));
rec.push(tableau(["Élément", "Signature", "Rôle"], [
  ["MINIMUM, MAXIMUM", "public static final double", "−100 et 100 ; vos tests les emploient plutôt que de recopier les nombres"],
  ["getTemperature", "double getTemperature()", "0 au départ"],
  ["setTemperature", "void setTemperature(double) throws TemperatureInvalideException", "Refuse hors bornes ; la température ne change alors pas"],
  ["enFahrenheit", "double enFahrenheit()", [{ t: "celsius × 9 / 5 + 32", code: true }]],
  ["toString", "String toString()", [{ t: "\"21.5 C\"", code: true }, " — une décimale, ", { t: "Locale.US", code: true }, " ; pas de symbole degré, il ne passe pas sur toutes les consoles"]]
], [2100, 4000, 3260]));
rec.push(tableau(["Cas à couvrir", "Ce que le test affirme"], [
  ["thermomètre neuf", "0"],
  ["une valeur ordinaire", "retenue"],
  ["−100 et 100", "acceptées"],
  ["juste au-delà des bornes", "exception, et la température n'a pas changé"],
  ["l'exception", "contrôlée, message qui cite la valeur"],
  ["Fahrenheit", "0 → 32, 100 → 212, −40 → −40"],
  ["toString", [{ t: "\"21.5 C\"", code: true }, ", ", { t: "\"0.0 C\"", code: true }]]
], [4000, 5360], [0]));
rec.push(h2("Comment vérifier votre code"));
rec.push(verif([
  { t: "be.ephec.java.rec.e08.RedactionTest", code: true },
  { t: "Vérifie que votre ThermometreTest existe, avec au moins six méthodes @Test, chacune avec un @DisplayName. Ce sont vos tests qui vérifient la classe ; le corrigé contient la classe de test attendue, pour comparer après coup." }
]));
rec.push(h2("Questions à se poser"));
rec.push(bulletRuns([
  "Vos tests sur les bornes vérifient-ils 100 ",
  { t: "et", i: true },
  " 100,1 ? Un test qui ne vérifie que 150 laisse passer une classe qui refuse 100 (",
  { t: "CC-TST.2", code: true },
  ")."
]));
rec.push(bullet("Combien de temps avez-vous mis pour les tests, et combien pour la classe ? La proportion vous surprend-elle ?"));
rec.push(saut());

// ---------------------------------------------------------------------
//  REC.9
// ---------------------------------------------------------------------
rec.push(h1("REC.9 — Une fenêtre qui filtre"));
rec.push(p("Package : be.ephec.java.rec.e09", { italic: true, color: GREY }));
rec.push(h2("Objectif"));
rec.push(p("Construire une petite fenêtre, poser un filtre d'événements et un gestionnaire, et garder la règle en dehors de la fenêtre pour pouvoir la tester — la question 5 de l'examen, dans la portée du premier module JavaFX."));
rec.push(h2("Énoncé"));
rec.push(runs([
  "La fenêtre ",
  { t: "SaisieFiltree", code: true },
  " contient un champ de texte et deux étiquettes. Le champ ",
  { t: "refuse les voyelles", b: true },
  " : on tape « bonjour », il affiche « bnjr ». Une étiquette compte les caractères du champ, l'autre signale la dernière voyelle refusée."
]));
rec.push(runs([
  "La règle vit dans ",
  { t: "Filtre", code: true },
  ", une classe sans le moindre import JavaFX, et c'est elle qui est testée. La fenêtre l'applique : un ",
  { t: "EventFilter", code: true },
  " sur ",
  { t: "KeyEvent.KEY_TYPED", code: true },
  " consomme l'événement quand ",
  { t: "Filtre.estRefuse(event.getCharacter())", code: true },
  " ; un ",
  { t: "EventHandler", code: true },
  " sur ",
  { t: "KEY_RELEASED", code: true },
  " met le compteur à jour, à un moment où le champ contient déjà le caractère accepté."
]));
rec.push(h2("Spécifications à respecter"));
rec.push(tableau(["Élément", "Signature", "Rôle"], [
  ["Filtre.estRefuse", "static boolean estRefuse(String caractere)", "Vrai pour a, e, i, o, u, y, en minuscule ou en majuscule"],
  ["Filtre.libelleCompteur", "static String libelleCompteur(String texte)", [{ t: "\"4 caractere(s)\"", code: true }]],
  ["SaisieFiltree", "extends Application", [
    "Un ", { t: "TextField", code: true }, ", deux ", { t: "Label", code: true }, " dans un ", { t: "VBox", code: true },
    " ; le filtre, le gestionnaire, un titre"
  ]],
  ["Lanceur", "fournie", [{ t: "C'est elle qu'on lance", b: true }, " : voir ", { t: "TEC-FX.4", code: true }]]
], [2200, 3700, 3460]));
rec.push(h2("Comment vérifier votre code"));
rec.push(verif([
  { t: "be.ephec.java.rec.e09.FiltreTest", code: true },
  { t: "Vérifie la règle : les voyelles dans les deux casses sont refusées, les consonnes, chiffres et espaces passent, et le libellé du compteur." }
]));
rec.push(h2("Ce que vous devez observer"));
rec.push(bullet("Tapez « bonjour » : le champ affiche « bnjr », le compteur « 4 caractere(s) », la troisième ligne « Refuse : u »."));
rec.push(bullet("Tapez une majuscule « E » : refusée aussi."));
rec.push(bullet("Effacez avec la touche Retour arrière : le compteur redescend. Si ce n'est pas le cas, votre gestionnaire n'écoute pas le bon événement."));
rec.push(h2("Questions à se poser"));
rec.push(bulletRuns([
  "Pourquoi le compteur écoute-t-il ",
  { t: "KEY_RELEASED", code: true },
  " et non ",
  { t: "KEY_TYPED", code: true },
  " ? Essayez : avec ",
  { t: "KEY_TYPED", code: true },
  ", le compte a une frappe de retard. Dans quel ordre le champ et votre gestionnaire reçoivent-ils l'événement ?"
]));
rec.push(bulletRuns([
  "Que se passe-t-il si vous collez « bonjour » avec Ctrl+V au lieu de le taper ? Le filtre sur ",
  { t: "KEY_TYPED", code: true },
  " suffit-il ? Que faudrait-il filtrer à la place ?"
]));
rec.push(bulletRuns([
  "La règle est dans ",
  { t: "Filtre", code: true },
  ", testée ; la fenêtre ne l'est pas. Qu'est-ce qui, dans ",
  { t: "SaisieFiltree", code: true },
  ", pourrait encore être faux sans qu'aucun test ne le voie ?"
]));
rec.push(saut());

// ---------------------------------------------------------------------
//  REC.10
// ---------------------------------------------------------------------
rec.push(h1("REC.10 — Une hiérarchie, à partir de rien"));
rec.push(p("Package : be.ephec.java.rec.e10", { italic: true, color: GREY }));
rec.push(h2("Objectif"));
rec.push(p("Refaire la question 4 dans les conditions de l'examen : les noms sont donnés, la conception est à vous."));
rec.push(h2("Ce qui change, et c'est beaucoup"));
rec.push(runs([
  { t: "Cet exercice n'a pas de squelette, ", b: true },
  "comme ",
  { t: "REC.5", code: true },
  " et ",
  { t: "ABS.5", code: true },
  ". Dans ",
  { t: "REC.2", code: true },
  ", les liens d'héritage étaient écrits ; ici, c'est vous qui décidez ce qui est abstrait, où va chaque champ, et comment la pénalité se calcule sans être écrite quatre fois. Les noms sont imposés, parce que la classe de test les emploie ; ils sont rappelés en tête de ",
  { t: "Programme", code: true },
  "."
]));
rec.push(encadre([
  [{ t: "La classe de test est fournie, mais en commentaire", b: true }],
  ["Quand vos classes seront écrites : sélectionnez tout le contenu du fichier et faites Ctrl+/ pour retirer les commentaires d'un coup. Si le fichier ne compile toujours pas, un nom diffère de ceux attendus."]
]));
rec.push(h2("Le contexte"));
rec.push(p("Une médiathèque prête quatre sortes de documents. Chacun a un titre, une année et un état — neuf, bon état, abîmé. Un document rendu en retard coûte une pénalité par jour."));
rec.push(tableau(["Sorte", "Famille", "Durée de prêt", "Pénalité par jour de retard"], [
  ["Livre", "Imprimé, avec un nombre de pages", "21 jours", "0,10 €"],
  ["Revue", "Imprimé, avec un nombre de pages", "7 jours", "0,20 €"],
  ["DVD", "Support, avec une durée en minutes", "7 jours", "1,00 €"],
  ["Jeu vidéo", "Support, avec une durée en minutes", "14 jours", "0,50 €, plafonnée à 10 €"]
], [1500, 3600, 1700, 2560], [0]));
rec.push(p("Un retard nul ou négatif ne coûte rien."));
rec.push(h2("Ce que le programme doit faire"));
rec.push(bulletRuns([
  "créer une ",
  { t: "Mediatheque", code: true },
  " avec un document de chaque sorte, dans une liste du ",
  { t: "type le plus général possible", b: true },
  " ;"
]));
rec.push(bulletRuns([
  "afficher les descriptions, au format ",
  { t: "Dune (1965), livre, bon etat", code: true },
  " ;"
]));
rec.push(bullet("afficher le nombre de documents abîmés, et le total des pénalités pour trois jours de retard sur tout."));
rec.push(h2("Comment vérifier votre code"));
rec.push(verif([
  { t: "be.ephec.java.rec.e10.MediathequeTest", code: true },
  { t: "Une fois décommentée : vérifie l'interface, les classes abstraites, les deux niveaux d'héritage, l'énumération et son libellé, les accesseurs et la description, les durées, les pénalités, le retard nul, le plafond du jeu vidéo, et la médiathèque, vide ou non." }
]));
rec.push(h2("Questions à se poser"));
rec.push(bulletRuns([
  "Où avez-vous écrit « pas de retard, pas de pénalité » ? Une fois, ou quatre ? Le corrigé montre une façon de ne l'écrire qu'une fois, avec deux méthodes abstraites de plus ; en voyez-vous une autre ? Voir ",
  { t: "CC-CLS.3", code: true },
  "."
]));
rec.push(bulletRuns([
  "Pourquoi ",
  { t: "Imprime", code: true },
  " et ",
  { t: "Support", code: true },
  " sont-elles abstraites ? Qu'est-ce qu'un « imprimé » tout court ne sait pas faire ?"
]));
rec.push(bullet("Comparez votre temps avec celui de REC.2, qui avait les mêmes classes en squelette. L'écart, c'est le temps de la conception : c'est lui qu'il faut connaître avant l'examen."));

Packer.toBuffer(doc(rec, "Exercices Java — Module REC")).then(b => {
  fs.writeFileSync(__dirname + "/../../enonces/par_module/REC_enonces.docx", b);
  console.log("REC :", Math.round(b.length / 1024), "Ko");
});
