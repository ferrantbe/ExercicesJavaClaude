const fs = require("fs");
const B = require(__dirname + "/boite.js");
const {
  p, runs, bullet, bulletRuns, code, h1, h2, tableau, verif, encadre,
  saut, couverture, modeEmploi, doc, Packer, GREY, AlignmentType
} = B;

// =====================================================================
//  ABS
// =====================================================================
const abs = [];
couverture(abs, "ABS", "Classes abstraites",
  "Ce qui est commun monte, ce qui varie descend");

modeEmploi(abs, "ABS", [
  ["ABS.1", "be.ephec.java.abs.e01", "Des formes géométriques"],
  ["ABS.2", "be.ephec.java.abs.e02", "Des animaux qui font du bruit"],
  ["ABS.3", "be.ephec.java.abs.e03", "Deux banques, un seul traitement"],
  ["ABS.4", "be.ephec.java.abs.e04", "Une hiérarchie à deux niveaux"],
  ["ABS.5", "be.ephec.java.abs.e05", "Tout écrire, à partir de rien"]
]);

abs.push(h2("Ce qu'il faut avoir en tête"));
abs.push(p("Une classe abstraite ne s'instancie pas. Elle sert de socle : elle porte ce que toutes ses sous-classes ont en commun, et laisse abstrait ce qui les distingue."));
abs.push(...code([
  "public abstract class Forme {",
  "",
  "    // ce qui VARIE : chaque sous-classe le definit",
  "    public abstract String nom();",
  "",
  "    // ce qui est COMMUN : ecrit une seule fois",
  "    public void affiche() {",
  "        System.out.println(\"Je suis un \" + nom());",
  "    }",
  "}"
]));
abs.push(runs([
  { t: "La règle de partage. ", b: true },
  "Une méthode dont le code serait identique dans toutes les sous-classes appartient à la classe mère. Une méthode dont le code diffère à chaque fois est abstraite. Le reste du thème n'est que l'application de ce principe."
]));
abs.push(runs([
  "Recopier la même méthode dans trois sous-classes est une erreur très fréquente à l'examen. Voir ",
  { t: "CC-CLS.3", code: true },
  " du mémento Clean Code, qui la traite précisément."
]));
abs.push(saut());

// --- ABS.1
abs.push(h1("ABS.1 — Des formes géométriques"));
abs.push(p("Package : be.ephec.java.abs.e01", { italic: true, color: GREY }));
abs.push(h2("Objectif"));
abs.push(p("Écrire une première classe abstraite, et décider ce qui monte et ce qui descend."));
abs.push(h2("Énoncé"));
abs.push(runs([
  "Complétez la classe abstraite ",
  { t: "Shape", code: true },
  ", qui représente une forme géométrique. Elle porte la position de son centre — un ",
  { t: "Point", code: true },
  ", fourni — et une rotation en degrés."
]));
abs.push(tableau(["Élément", "Signature", "Rôle"], [
  ["nom", "public abstract String nom()", "« cercle », « carre » ou « triangle »"],
  ["affiche", "public void affiche()", "Écrit « Je suis un cercle et je m'affiche »"],
  ["efface", "public void efface()", "Écrit « Je suis un carre et je m'efface »"],
  ["getCentre", "public Point getCentre()", "Le centre"],
  ["getRotation", "public double getRotation()", "La rotation, toujours entre 0 et 360"],
  ["setRotation", "public void setRotation(double)", "Fixe la rotation, ramenée dans l'intervalle"]
], [2100, 3700, 3560]));
abs.push(runs([
  "Complétez ensuite les trois classes ",
  { t: "Circle", code: true },
  ", ",
  { t: "Square", code: true },
  " et ",
  { t: "Triangle", code: true },
  ". Chacune ne devrait contenir qu'une seule méthode."
]));
abs.push(runs([
  "Écrivez enfin le ",
  { t: "Programme", code: true },
  " : un ",
  { t: "tableau de Shape", b: true },
  " contenant les trois formes, parcouru pour les afficher puis les effacer."
]));
abs.push(h2("Sur la rotation"));
abs.push(runs([
  "La rotation vaut toujours entre 0 inclus et 360 exclu. ",
  { t: "setRotation(370)", code: true },
  " donne 10, ",
  { t: "setRotation(360)", code: true },
  " donne 0."
]));
abs.push(encadre([
  [{ t: "Un piège de l'arithmétique Java", b: true }],
  ["En Java, le reste de la division garde le signe du dividende : -90 % 360 vaut -90 et non 270. Un modulo seul ne suffit donc pas à ramener une valeur dans un intervalle positif."],
  ["Le test vérifie ce cas. Cherchez comment corriger le résultat en une expression."]
]));
abs.push(h2("Vérification"));
abs.push(verif([
  { t: "be.ephec.java.abs.e01.ShapeTest", code: true },
  { t: "Vérifie que Shape est bien abstraite, le nom de chaque forme, la conservation du centre, la normalisation de la rotation y compris pour les valeurs négatives, et le polymorphisme dans un tableau de Shape." }
]));
abs.push(h2("Questions à se poser"));
abs.push(bulletRuns([
  "Essayez d'écrire ",
  { t: "new Shape(new Point(0, 0))", code: true },
  ". Que dit le compilateur, et pourquoi ?"
]));
abs.push(bullet("Le constructeur de Shape est déclaré protected et non public. Qu'est-ce que cela change, sachant qu'on ne peut de toute façon pas instancier la classe ?"));
abs.push(bullet("Vos trois sous-classes font-elles plus d'une méthode ? Si oui, qu'est-ce qui aurait dû monter dans Shape ?"));
abs.push(bullet("Le tableau est déclaré Shape[] et ne contient aucun Shape. Comment est-ce possible ?"));
abs.push(saut());

// --- ABS.2
abs.push(h1("ABS.2 — Des animaux qui font du bruit"));
abs.push(p("Package : be.ephec.java.abs.e02", { italic: true, color: GREY }));
abs.push(h2("Objectif"));
abs.push(p("Refaire le même geste sur un cas plus court, et voir le polymorphisme à l'œuvre sur un tableau dont on ignore le contenu."));
abs.push(h2("Énoncé"));
abs.push(runs([
  "Complétez la classe abstraite ",
  { t: "Animal", code: true },
  " et ses deux sous-classes ",
  { t: "Dog", code: true },
  " et ",
  { t: "Cat", code: true },
  "."
]));
abs.push(tableau(["Élément", "Signature", "Rôle"], [
  ["cri", "public abstract String cri()", "« J'aboie » pour un chien, « Je miaule » pour un chat"],
  ["makeNoise", "public void makeNoise()", "Écrit le cri sur la console"]
], [2100, 3700, 3560]));
abs.push(runs([
  "Écrivez ensuite le ",
  { t: "Programme", code: true },
  " : un tableau de dix ",
  { t: "Animal", code: true },
  ", rempli au hasard avec une chance sur deux d'obtenir un chien ou un chat, puis parcouru en appelant ",
  { t: "makeNoise()", code: true },
  " sur chaque élément."
]));
abs.push(runs([
  { t: "Contrainte : aucun test de type. ", b: true },
  "Pas d'",
  { t: "instanceof", code: true },
  ", pas de comparaison de classe. C'est le polymorphisme qui doit choisir la bonne méthode — voir ",
  { t: "CC-CLS.4", code: true },
  " du mémento Clean Code."
]));
abs.push(h2("Vérification"));
abs.push(verif([
  { t: "be.ephec.java.abs.e02.AnimalTest", code: true },
  { t: "Vérifie que la classe est abstraite, le cri de chaque animal, et que les éléments d'un tableau d'Animal rendent bien le cri de leur type réel." }
]));
abs.push(h2("Questions à se poser"));
abs.push(bullet("Ajoutez une Vache. Combien de lignes faut-il modifier dans le Programme ?"));
abs.push(bullet("Refaites l'exercice en supprimant la classe abstraite, avec deux classes indépendantes. Qu'est-ce qui devient impossible ?"));
abs.push(saut());

// --- ABS.3
abs.push(h1("ABS.3 — Deux banques, un seul traitement"));
abs.push(p("Package : be.ephec.java.abs.e03", { italic: true, color: GREY }));
abs.push(h2("Objectif"));
abs.push(p("Compléter un dispositif écrit par quelqu'un d'autre, en n'ajoutant que ce qui manque réellement."));
abs.push(h2("Contexte"));
abs.push(p("Une application affiche les mouvements bancaires de ses utilisateurs. Elle fonctionne aujourd'hui avec une seule banque, Fric en Vrac. Il faut y ajouter Banquier Pépère."));
abs.push(p("Le problème : les deux banques livrent les mêmes informations, mais pas dans le même ordre de colonnes."));
abs.push(...code([
  "Fric en Vrac      compte, montant, communication",
  "Banquier Pepere   communication, compte, montant"
]));
abs.push(h2("Ce qui vous est fourni"));
abs.push(tableau(["Classe", "Rôle"], [
  ["Mouvement", "Un mouvement : compte, montant, communication"],
  ["FricEnVracDataProvider", "Les données brutes de la première banque"],
  ["BanquierPepereDataProvider", "Celles de la seconde"],
  ["VisualiseurDeDonneesBancaires", "La classe abstraite : conversion, total, rapport"],
  ["VisualiseurFricEnVrac", "Le visualiseur de la première banque — votre modèle"]
], [3400, 5960], [0]));
abs.push(runs([
  "La classe abstraite laisse trois choses indéfinies : d'où viennent les données, comment s'appelle la banque, et comment se lit une ligne. Tout le reste — convertir l'ensemble, additionner, mettre en forme — y est déjà écrit."
]));
abs.push(h2("Énoncé"));
abs.push(runs([
  "Complétez ",
  { t: "VisualiseurBanquierPepere", code: true },
  " en définissant les trois méthodes abstraites, puis écrivez le ",
  { t: "Programme", code: true },
  " : un tableau contenant les deux visualiseurs, parcouru pour afficher chaque rapport et chaque total."
]));
abs.push(encadre([
  [{ t: "La mesure de la réussite", b: true }],
  ["Votre classe devrait faire une vingtaine de lignes, dont trois méthodes de deux lignes chacune. Si elle est plus longue, vous avez recopié quelque chose qui existait déjà dans la classe mère."],
  ["Et le Programme ne doit contenir ni instanceof, ni condition sur la banque : il traite un tableau de VisualiseurDeDonneesBancaires sans savoir ce qu'il contient."]
]));
abs.push(h2("Vérification"));
abs.push(verif([
  { t: "be.ephec.java.abs.e03.VisualiseurTest", code: true },
  { t: "Vérifie d'abord le visualiseur fourni, qui sert de référence, puis le vôtre : le nombre de mouvements, l'ordre des colonnes, le total calculé par la classe mère, la forme du rapport, et le traitement des deux banques dans un même tableau." }
]));
abs.push(h2("Questions à se poser"));
abs.push(bullet("Une troisième banque arrive, avec encore un autre ordre de colonnes. Combien de classes faut-il écrire, et combien faut-il en modifier ?"));
abs.push(bullet("La méthode qui convertit une ligne est déclarée protected. Pourquoi pas public, puisque c'est une méthode qu'une autre classe doit définir ?"));
abs.push(bullet("Le rapport et le total sont écrits une seule fois, dans la classe mère. Qu'est-ce qui se serait passé le jour d'une correction du calcul si chaque visualiseur avait eu le sien ?"));

abs.push(saut());

// --- ABS.4
abs.push(h1("ABS.4 — Une hiérarchie à deux niveaux"));
abs.push(p("Package : be.ephec.java.abs.e04", { italic: true, color: GREY }));
abs.push(h2("Objectif"));
abs.push(p("Placer chaque donnée et chaque calcul au bon étage d'une hiérarchie, et décider où implémenter une méthode d'interface."));
abs.push(h2("Contexte"));
abs.push(p("Une société de services facture ses prestations de deux façons : au forfait, ou à l'heure. Chaque façon connaît deux variantes."));
abs.push(runs([
  "Les trois exercices précédents n'avaient ",
  { t: "qu'un seul", b: true },
  " niveau d'abstraction. Celui-ci en a deux, et c'est la forme que prend la question 4 de l'examen."
]));
abs.push(h2("La structure imposée"));
abs.push(...code([
  "Facturable          interface : double montant()",
  " |",
  " +- Prestation      abstraite : le client, et facture()",
  "     |",
  "     +- Forfait     abstraite : prixForfait",
  "     |   +- Abonnement",
  "     |   +- Installation",
  "     |",
  "     +- Horaire     abstraite : tauxHoraire, heures",
  "         +- Depannage",
  "         +- Urgence"
]));
abs.push(h2("Ce que chaque classe concrète ajoute"));
abs.push(tableau(["Classe", "Champ supplémentaire", "Ce que rend montant()"], [
  ["Abonnement", "—", "prixForfait"],
  ["Installation", "deplacement (double)", "prixForfait + deplacement"],
  ["Depannage", "—", "heures x tauxHoraire"],
  ["Urgence", "majoration (double)", "heures x tauxHoraire x (1 + majoration)"]
], [1900, 3200, 4260], [0]));
abs.push(runs([
  "La majoration est une ",
  { t: "fraction", i: true },
  " : 0.5 pour cinquante pour cent."
]));
abs.push(h2("Ce qui vous est fourni"));
abs.push(runs([
  "L'interface ",
  { t: "Facturable", code: true },
  " et les signatures des constructeurs. Tout le reste est à écrire."
]));
abs.push(h2("Deux décisions vous appartiennent"));
abs.push(bulletRuns([
  { t: "Où implémenter montant(). ", b: true },
  "L'interface l'exige, mais ni Prestation, ni Forfait, ni Horaire ne savent calculer. Où la méthode doit-elle donc apparaître ?"
]));
abs.push(bulletRuns([
  { t: "Quelle visibilité pour les accesseurs intermédiaires. ", b: true },
  "Le prix du forfait est un détail de calcul dont les sous-classes ont besoin. Doit-il être public ? Voir ",
  { t: "PKG.5", code: true },
  "."
]));
abs.push(h2("Le programme"));
abs.push(runs([
  "Rangez une prestation de chaque sorte dans un ",
  { t: "tableau de Prestation", b: true },
  ", parcourez-le, affichez chaque facture et le total."
]));
abs.push(runs([
  "Si vous écrivez un ",
  { t: "instanceof", code: true },
  " dans cette boucle, c'est que la hiérarchie est mal découpée. Reprenez-la."
]));
abs.push(h2("Vérification"));
abs.push(verif([
  ["Abonnement(Ada, 125)", "125.00"],
  ["Installation(Alan, 200, 45.50)", "245.50"],
  ["Depannage(Grace, 65, 3)", "195.00"],
  ["Urgence(Charles, 65, 2, 0.5)", "195.00"],
  ["facture() du premier", "Ada : 125.00 EUR"],
  ["total des quatre", "760.50"]
]));
abs.push(h2("Questions à se poser"));
abs.push(bulletRuns([
  "Prestation implémente Facturable sans écrire ",
  { t: "montant()", code: true },
  ". Est-ce légal, et pourquoi le compilateur l'accepte-t-il ?"
]));
abs.push(bulletRuns([
  "La méthode ",
  { t: "facture()", code: true },
  " appelle ",
  { t: "montant()", code: true },
  ", qui n'existe nulle part quand on l'écrit. Comment est-ce possible ?"
]));
abs.push(bullet("Ajoutez une cinquième sorte de prestation. Combien de classes existantes devez-vous modifier ?"));

abs.push(saut());

// --- ABS.5
abs.push(h1("ABS.5 — Tout écrire, à partir de rien"));
abs.push(p("Package : be.ephec.java.abs.e05", { italic: true, color: GREY }));
abs.push(h2("Ce qui change, et c'est beaucoup"));
abs.push(runs([
  { t: "Cet exercice n'a pas de squelette. ", b: true },
  "C'est le seul du recueil. Les quatre précédents vous donnaient les classes, les signatures et les types : il restait à remplir les corps. Ici, vous partez d'un fichier ",
  { t: "Programme", code: true },
  " vide."
]));
abs.push(p("L'énoncé décrit ce que le programme doit faire. Il ne dit pas combien de classes écrire, ni laquelle est abstraite, ni où placer chaque méthode. Ce sont les décisions de l'exercice, et ce sont celles qu'on vous demandera à l'examen."));
abs.push(encadre([
  [{ t: "La classe de test est fournie, mais en commentaire", b: true }],
  ["Elle appelle des classes qui n'existent pas encore. Un fichier qui ne compile pas empêche la compilation de tout le module — y compris les exercices déjà réussis."],
  ["Quand vos classes seront écrites : sélectionnez tout le contenu du fichier et faites Ctrl+/ pour retirer les commentaires d'un coup. Les noms attendus sont rappelés en tête du fichier."]
]));

abs.push(h2("Le contexte"));
abs.push(p("Un service postal facture trois sortes d'envois. Chacun a un destinataire et un poids en grammes."));
abs.push(tableau(["Sorte", "Ce qu'elle coûte"], [
  ["Lettre", "1,10 € jusqu'à 50 g inclus ; 2,20 € au-delà"],
  ["Colis", "4,00 € de forfait, plus 0,005 € par gramme"],
  ["Recommandé", "7,00 €, quel que soit le poids"]
], [2200, 7160], [0]));

abs.push(h2("Ce que le programme doit faire"));
abs.push(bullet("créer un envoi de chaque sorte ;"));
abs.push(bulletRuns([
  "les ranger dans un tableau du ",
  { t: "type le plus général possible", b: true },
  " ;"
]));
abs.push(bulletRuns([
  "le parcourir en affichant l'étiquette de chacun, au format ",
  { t: "Ada Lovelace - 120 g - 4.60 EUR", code: true },
  " ;"
]));
abs.push(bullet("afficher le total."));
abs.push(runs([
  { t: "Aucun test de type dans cette boucle. ", b: true },
  "Si vous y écrivez un ",
  { t: "instanceof", code: true },
  " ou un ",
  { t: "switch", code: true },
  " sur la sorte d'envoi, la hiérarchie est mal découpée."
]));

abs.push(h2("Les trois questions à se poser avant d'écrire"));
abs.push(bulletRuns([
  { t: "Qu'est-ce que les trois sortes ont en commun ? ", b: true },
  "Ce qui est commun monte dans la classe mère, et ne s'écrit qu'une fois."
]));
abs.push(bulletRuns([
  { t: "Que sait faire un envoi « en général » ? ", b: true },
  "S'il y a une chose qu'il ne sait pas faire alors que toutes ses sortes la savent, vous tenez votre méthode abstraite."
]));
abs.push(bulletRuns([
  { t: "L'étiquette doit-elle être écrite trois fois ? ", b: true },
  "Regardez ce qui y change d'une sorte à l'autre. Puis relisez ",
  { t: "ABS.1", code: true },
  "."
]));

abs.push(h2("Vérification"));
abs.push(verif([
  ["lettre de 20 g", "1.10"],
  ["lettre de 50 g", "1.10  (la borne est incluse)"],
  ["lettre de 51 g", "2.20"],
  ["colis de 120 g", "4.60"],
  ["colis de 1000 g", "9.00"],
  ["recommandé, quel que soit le poids", "7.00"],
  ["étiquette d'un colis de 120 g", "Ada Lovelace - 120 g - 4.60 EUR"],
  ["total des trois exemples", "12.70"]
]));
abs.push(runs([
  { t: "Faites attention à la borne des 50 grammes. ", b: true },
  "« Jusqu'à 50 g » les inclut : c'est ",
  { t: "<=", code: true },
  " et non ",
  { t: "<", code: true },
  ". Une erreur d'un gramme ne se voit pas en essayant au hasard, et le test à la borne l'attrape tout de suite."
]));

abs.push(h2("Questions à se poser"));
abs.push(bullet("Le recommandé ignore le poids : sa méthode de calcul ne lit aucun champ. Pourquoi hérite-t-il quand même de la classe mère ?"));
abs.push(bullet("Ajoutez une quatrième sorte d'envoi. Combien de classes existantes devez-vous modifier ?"));
abs.push(bulletRuns([
  "Comparez le temps passé sur cet exercice et sur ",
  { t: "ABS.4", code: true },
  ". Où est passée la différence : à écrire, ou à décider ?"
]));

// =====================================================================
//  ITF
// =====================================================================
const itf = [];
couverture(itf, "ITF", "Interfaces",
  "Décrire ce qu'on attend, sans dire qui le fera");

modeEmploi(itf, "ITF", [
  ["ITF.1", "be.ephec.java.itf.e01", "Une interface et deux implémentations"],
  ["ITF.2", "be.ephec.java.itf.e02", "Payer en ligne"],
  ["ITF.3", "be.ephec.java.itf.e03", "Des formes qui se déplacent et tournent"],
  ["ITF.4", "be.ephec.java.itf.e04", "Prévenir sans connaître"]
]);

itf.push(h2("Interface ou classe abstraite ?"));
itf.push(p("Les deux permettent de manipuler des objets différents à travers un type commun. La différence tient à ce qu'elles peuvent porter."));
itf.push(tableau(["", "Classe abstraite", "Interface"], [
  ["Contient du code ?", "oui, et des champs", "des signatures seulement"],
  ["Combien par classe ?", "une seule", "autant qu'on veut"],
  ["Ce qu'elle exprime", "« est un »", "« sait faire »"]
], [2600, 3400, 3360], []));
itf.push(runs([
  "Un carré ",
  { t: "est une", i: true },
  " forme : classe abstraite. Un carré ",
  { t: "sait", i: true },
  " se déplacer, comme une image ou un texte, qui ne sont pas des formes : interface."
]));
itf.push(runs([
  { t: "Les interfaces de ces exercices vous sont fournies. ", b: true },
  "Elles tiennent en trois lignes et servent de modèle. Le travail porte sur ce qui compte vraiment : les implémenter, et écrire du code qui dépend de l'interface et non des classes concrètes."
]));
itf.push(saut());

// --- ITF.1
itf.push(h1("ITF.1 — Une interface et deux implémentations"));
itf.push(p("Package : be.ephec.java.itf.e01", { italic: true, color: GREY }));
itf.push(h2("Objectif"));
itf.push(p("Le cas le plus simple possible, pour isoler l'idée : une méthode qui reçoit un comportement en paramètre."));
itf.push(h2("Énoncé"));
itf.push(runs([
  "L'interface ",
  { t: "Calculateur", code: true },
  " vous est fournie : elle déclare ",
  { t: "int calcule(int a, int b)", code: true },
  " et rien d'autre."
]));
itf.push(bulletRuns([
  "Complétez ",
  { t: "Addition", code: true },
  " et ",
  { t: "Multiplication", code: true },
  ", qui l'implémentent."
]));
itf.push(bulletRuns([
  "Complétez ",
  { t: "Programme.effectueCalcul(int a, int b, Calculateur calculateur)", code: true },
  ", qui effectue un calcul à l'aide du calculateur reçu."
]));
itf.push(bulletRuns([
  "Écrivez le ",
  { t: "main", code: true },
  " : créez les deux objets et effectuez quelques calculs."
]));
itf.push(h2("Le point important"));
itf.push(runs([
  "Regardez le type du troisième paramètre : ",
  { t: "Calculateur", code: true },
  ", et non ",
  { t: "Addition", code: true },
  ". La méthode ne sait pas quel calcul elle déclenche, et n'a pas besoin de le savoir."
]));
itf.push(p("La conséquence est spectaculaire : elle fonctionnera avec des calculateurs qui n'existaient pas quand elle a été écrite. Le test le démontre en lui passant une soustraction fabriquée sur place."));
itf.push(h2("Vérification"));
itf.push(verif([
  { t: "be.ephec.java.itf.e01.CalculateurTest", code: true },
  { t: "Vérifie que les deux classes implémentent l'interface, que chacune calcule correctement, que effectueCalcul délègue, et qu'elle accepte un calculateur qu'elle n'a jamais vu." }
]));
itf.push(h2("Questions à se poser"));
itf.push(bulletRuns([
  "L'interface ne dit ni ",
  { t: "public", code: true },
  " ni ",
  { t: "abstract", code: true },
  " devant sa méthode. Ajoutez-les : le compilateur proteste-t-il ? Pourquoi les omet-on ?"
]));
itf.push(bulletRuns([
  "Que se passerait-il si ",
  { t: "effectueCalcul", code: true },
  " prenait un ",
  { t: "Addition", code: true },
  " en paramètre ? Écrivez-la ainsi, puis essayez de lui passer une multiplication."
]));
itf.push(saut());

// --- ITF.2
itf.push(h1("ITF.2 — Payer en ligne"));
itf.push(p("Package : be.ephec.java.itf.e02", { italic: true, color: GREY }));
itf.push(h2("Objectif"));
itf.push(p("La même idée sur un cas réaliste, où l'interface sépare vraiment deux parties d'un programme."));
itf.push(h2("Énoncé"));
itf.push(runs([
  "L'interface ",
  { t: "Paiement", code: true },
  " est fournie : elle déclare ",
  { t: "String effectuerPaiement(double montant)", code: true },
  "."
]));
itf.push(runs([
  "Complétez ",
  { t: "PayPal", code: true },
  " et ",
  { t: "CarteDeCredit", code: true },
  ". Chacune rend le compte-rendu de ses étapes, séparées par un retour à la ligne, sans retour final."
]));
itf.push(...code([
  "PayPal, pour 42.50 :",
  "    Connexion a PayPal",
  "    Selection du moyen de paiement",
  "    Validation de la transaction de 42.50 euros",
  "",
  "CarteDeCredit, pour 42.50 :",
  "    Authentification de la transaction",
  "    Paiement de 42.50 euros execute"
]));
itf.push(runs([
  "Complétez ensuite ",
  { t: "Client.executePaiement(Paiement, double)", code: true },
  ", puis écrivez le ",
  { t: "Programme", code: true },
  " qui fait exécuter un paiement par chaque moyen."
]));
itf.push(encadre([
  [{ t: "Pourquoi rendre du texte plutôt que l'afficher", b: true }],
  ["Une classe de paiement qui écrirait elle-même sur la console deviendrait inutilisable dans une application graphique, et intestable : on ne vérifie pas ce qui est parti dans la console."],
  ["En rendant le compte-rendu, elle laisse l'appelant décider quoi en faire — l'afficher, l'enregistrer, l'envoyer par courriel. C'est la règle CC-MET.7 du mémento Clean Code."],
  ["Précisez Locale.US dans votre formatage du montant, sinon une machine configurée en français écrirait « 42,50 » avec une virgule, et le test échouerait sur un seul caractère."]
]));
itf.push(h2("Vérification"));
itf.push(verif([
  { t: "be.ephec.java.itf.e02.PaiementTest", code: true },
  { t: "Vérifie le texte exact rendu par chaque moyen de paiement, le format du montant à deux décimales, et que le client se contente de transmettre." }
]));
itf.push(h2("Questions à se poser"));
itf.push(bullet("Le virement bancaire arrive. Quelles classes faut-il écrire, et lesquelles faut-il modifier ?"));
itf.push(bullet("Le Client ne connaît ni PayPal ni la carte. Pourrait-il les connaître ? Qu'est-ce qu'on y perdrait ?"));
itf.push(saut());

// --- ITF.3
itf.push(h1("ITF.3 — Des formes qui se déplacent et tournent"));
itf.push(p("Package : be.ephec.java.itf.e03", { italic: true, color: GREY }));
itf.push(h2("Objectif"));
itf.push(p("Combiner héritage et interfaces sur les formes d'ABS.1, et trancher une question de conception."));
itf.push(h2("Énoncé"));
itf.push(runs([
  "Les formes d'",
  { t: "ABS.1", code: true },
  " sont reprises ici, complètes. Deux interfaces vous sont fournies : ",
  { t: "Translatable", code: true },
  ", qui déclare ",
  { t: "translate(double dx, double dy)", code: true },
  ", et ",
  { t: "Rotatable", code: true },
  ", qui déclare ",
  { t: "rotate(double alpha)", code: true },
  ". La classe ",
  { t: "Shape", code: true },
  " les implémente toutes les deux."
]));
itf.push(p("Complétez les deux méthodes. La translation déplace le centre ; la rotation s'ajoute à la rotation actuelle, toujours ramenée entre 0 et 360. Chacune affiche ce qu'elle fait :"));
itf.push(...code([
  "Je suis un carre et je me deplace de 3.0, 4.0",
  "Je suis un triangle et je tourne de 90.0 degres"
]));
itf.push(h2("La question à trancher"));
itf.push(runs([
  { t: "Ces deux méthodes doivent-elles rester abstraites dans Shape, ou celle-ci peut-elle les définir une fois pour toutes ?", b: true }
]));
itf.push(p("Répondez avant de coder, puis vérifiez : si votre réponse était la bonne, les trois sous-classes n'auront pas une ligne à changer."));
itf.push(h2("Vérification"));
itf.push(verif([
  { t: "be.ephec.java.itf.e03.ShapeTest", code: true },
  { t: "Vérifie que Shape implémente bien les deux interfaces, le déplacement du centre, l'accumulation des translations, la normalisation de la rotation, et que les trois formes se comportent identiquement." },
  { t: "Un dernier test manipule un tableau de Translatable : les objets y sont vus à travers l'interface seulement." }
]));
itf.push(h2("Questions à se poser"));
itf.push(bulletRuns([
  "Dans le ",
  { t: "Programme", code: true },
  ", déclarez un tableau de ",
  { t: "Translatable", code: true },
  " et essayez d'appeler ",
  { t: "rotate", code: true },
  " puis ",
  { t: "nom", code: true },
  " sur ses éléments. Que dit le compilateur, et pourquoi est-ce souhaitable ?"
]));
itf.push(bullet("Une image et un texte pourraient aussi être translatables sans être des formes. Cela se ferait-il avec une classe abstraite ?"));
itf.push(bulletRuns([
  "La normalisation de l'angle apparaît en ",
  { t: "ABS.1", code: true },
  " et ici. Est-ce une duplication au sens de ",
  { t: "CC-CLS.3", code: true },
  " ? Les deux packages étant indépendants, la question mérite d'être posée."
]));
itf.push(saut());

// --- ITF.4
itf.push(h1("ITF.4 — Prévenir sans connaître"));
itf.push(p("Package : be.ephec.java.itf.e04", { italic: true, color: GREY }));
itf.push(h2("Objectif"));
itf.push(p("Voir ce qu'une interface rend possible : ajouter un acteur à un programme sans toucher au programme."));
itf.push(h2("Contexte"));
itf.push(runs([
  "Un magasin prévient plusieurs personnes quand un produit arrive. Aujourd'hui, un ",
  { t: "Client", code: true },
  " et un ",
  { t: "Employe", code: true },
  " sont abonnés, et chacun réagit à sa façon."
]));
itf.push(p("Ce dispositif porte un nom, le patron Observateur. Il repose entièrement sur le fait que le magasin ne connaît aucun de ses observateurs : il ne connaît que l'interface qu'ils respectent."));
itf.push(h2("Énoncé"));
itf.push(runs([
  "Un ",
  { t: "Prospect", code: true },
  " veut lui aussi être prévenu. Complétez la classe, dont le message doit valoir exactement :"
]));
itf.push(...code([
  "Publicite pour le nouveau grille-pain envoyee a Dupont"
]));
itf.push(runs([
  "Écrivez ensuite le ",
  { t: "Programme", code: true },
  " : créez un magasin, abonnez-y les trois acteurs, réceptionnez un produit, et affichez le dernier message de chacun."
]));
itf.push(runs([
  { t: "Vous ne modifiez ni le Magasin, ni l'interface, ni les deux autres observateurs. ", b: true },
  "Si vous vous surprenez à devoir le faire, relisez le ",
  { t: "Magasin", code: true },
  " : rien n'y nomme un Client ou un Employé."
]));
itf.push(h2("Vérification"));
itf.push(verif([
  { t: "be.ephec.java.itf.e04.MagasinTest", code: true },
  { t: "Vérifie que Prospect implémente l'interface, son message avant et après une annonce, la diffusion aux trois acteurs en un seul appel, et le remplacement du message à la réception suivante." }
]));
itf.push(h2("Questions à se poser"));
itf.push(bullet("Combien de fichiers avez-vous modifiés pour ajouter un troisième acteur ? Combien en auriez-vous modifiés si le Magasin avait tenu trois listes séparées, une par type d'acteur ?"));
itf.push(bullet("Le magasin appelle nouveauProduit sur chaque abonné. Comment sait-il quelle version exécuter ?"));
itf.push(bulletRuns([
  "Le tableau du ",
  { t: "Magasin", code: true },
  " a une taille fixe de dix. Où est la limite de ce montage, et qu'est-ce qui la lèvera au thème ",
  { t: "COL", code: true },
  " ?"
]));

// ---------------------------------------------------------------------
Packer.toBuffer(doc(abs, "Exercices Java — Thème ABS")).then(b => {
  fs.writeFileSync(__dirname + "/../../enonces/ABS_enonces.docx", b);
  console.log("ABS :", Math.round(b.length / 1024), "Ko");
});
Packer.toBuffer(doc(itf, "Exercices Java — Thème ITF")).then(b => {
  fs.writeFileSync(__dirname + "/../../enonces/ITF_enonces.docx", b);
  console.log("ITF :", Math.round(b.length / 1024), "Ko");
});
