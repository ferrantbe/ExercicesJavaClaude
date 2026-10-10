const fs = require("fs");
const B = require(__dirname + "/boite.js");
const {
  p, runs, bullet, bulletRuns, code, h1, h2, tableau, verif, encadre,
  saut, couverture, modeEmploi, doc, Packer, GREY
} = B;

const sta = [];
couverture(sta, "STA", "Membres de classe",
  "Ce qui appartient à la classe, et non aux objets");

modeEmploi(sta, "STA", [
  ["STA.1", "be.ephec.java.sta.e01", "Une constante et un compteur d'instances"],
  ["STA.2", "be.ephec.java.sta.e02", "Un constructeur privé et des fabriques"]
]);

sta.push(h2("Ce que static veut dire"));
sta.push(p("Jusqu'ici, tous vos champs appartenaient à un objet : chaque Personne a son nom, chaque Compte son solde. Trois personnes, trois cases en mémoire."));
sta.push(runs([
  "Certaines informations n'appartiennent à ",
  { t: "aucun", b: true },
  " objet en particulier. Combien de réservations ont été émises ? La question porte sur l'ensemble. C'est ce que ",
  { t: "static", code: true },
  " exprime."
]));
sta.push(...code([
  "private int numero;           une case PAR OBJET",
  "private static int emises;    UNE case, partagee par tous"
]));
sta.push(h2("Trois usages, trois raisons"));
sta.push(tableau(["Forme", "Ce qu'elle exprime"], [
  ["public static final", "une constante : même valeur pour tous, et elle ne change pas"],
  ["private static", "un état partagé : il appartient à la classe, pas à un exemplaire"],
  ["public static + méthode", "une question qui porte sur l'ensemble, ou une fabrique"]
], [2400, 6960], [0]));
sta.push(runs([
  { t: "static et final disent deux choses différentes. ", b: true },
  "static, que la valeur est partagée ; final, qu'elle ne change pas. Une constante a besoin des deux, un compteur du premier seulement."
]));

sta.push(h2("Une méthode statique n'a pas de this"));
sta.push(runs([
  "C'est la source d'erreur la plus fréquente du thème. Une méthode statique n'est appelée sur ",
  { t: "aucun", b: true },
  " objet : ",
  { t: "this", code: true },
  " n'y existe donc pas, et le compilateur le dit franchement."
]));
sta.push(...code([
  "non-static variable this cannot be referenced from a static context"
]));
sta.push(p("C'est aussi la raison pour laquelle le main est statique : il s'exécute avant qu'aucun objet n'existe."));
sta.push(saut());

// --- STA.1
sta.push(h1("STA.1 — Une constante et un compteur d'instances"));
sta.push(p("Package : be.ephec.java.sta.e01", { italic: true, color: GREY }));
sta.push(h2("Objectif"));
sta.push(p("Distinguer ce qui appartient à l'objet de ce qui appartient à la classe, et le vérifier dans le débogueur."));
sta.push(h2("Contexte"));
sta.push(p("Une salle de spectacle émet des réservations. Chacune porte un nom et un numéro, et les numéros se suivent — la première porte le numéro 1."));
sta.push(runs([
  { t: "Le constructeur ne reçoit pas le numéro. ", b: true },
  "C'est la classe qui le distribue, ce qui garantit qu'aucun ne se répète. Un appelant distrait ne peut plus se tromper."
]));
sta.push(h2("Énoncé"));
sta.push(runs([
  "Complétez ",
  { t: "Reservation", code: true },
  " :"
]));
sta.push(bulletRuns([
  "la constante ",
  { t: "PLACES_MAX", code: true },
  " et le compteur vous sont ",
  { t: "déclarés", b: true },
  " : un champ ne peut pas lever d'exception comme le font les méthodes à compléter, et sans eux la classe de test ne compilerait pas. La valeur de la constante, elle, est à corriger ;"
]));
sta.push(bulletRuns([
  "lisez leurs modificateurs et demandez-vous ce que chacun apporte : ",
  { t: "public static final", code: true },
  " pour l'une, ",
  { t: "private static", code: true },
  " pour l'autre. Pourquoi pas ",
  { t: "final", code: true },
  " sur le compteur ?"
]));
sta.push(bullet("le constructeur, qui incrémente le compteur et en tire le numéro ;"));
sta.push(bulletRuns([
  { t: "nombreEmises()", code: true },
  " et ",
  { t: "resteDeLaPlace()", code: true },
  ", qui répondent sur l'ensemble ;"
]));
sta.push(bulletRuns([
  "un ",
  { t: "toString()", code: true },
  " rendant ",
  { t: "Reservation n3 : Grace Hopper", code: true },
  "."
]));
sta.push(h2("À faire dans le débogueur"));
sta.push(p("Placez un point d'arrêt dans le constructeur et créez trois réservations. Dans le panneau Variables, regardez les deux champs :"));
sta.push(bullet("le numéro diffère d'un objet à l'autre ;"));
sta.push(bullet("le compteur, lui, est le même partout — il n'y a qu'une case."));
sta.push(encadre([
  [{ t: "L'erreur à commettre exprès", b: true }],
  ["Écrivez return this.numero; dans nombreEmises(). Lisez le refus du compilateur : il explique tout le thème en une phrase."]
]));
sta.push(h2("Vérification"));
sta.push(verif([
  ["nombreEmises() avant toute création", "0"],
  ["numéro de la première réservation", "1"],
  ["numéro de la troisième", "3"],
  ["nombreEmises() après trois créations", "3"],
  ["toString() de la troisième", "Reservation n3 : Grace Hopper"],
  ["resteDeLaPlace()", "true"]
]));
sta.push(h2("Questions à se poser"));
sta.push(bulletRuns([
  "Que se passe-t-il si vous incrémentez le compteur ",
  { t: "après", i: true },
  " avoir affecté le numéro ? Essayez."
]));
sta.push(bulletRuns([
  "Le compteur est privé. Qu'est-ce que cela empêche exactement, puisque personne ne pourrait le remettre à zéro de toute façon ? Voir ",
  { t: "CC-OBJ.1", code: true },
  "."
]));
sta.push(bulletRuns([
  "Le champ partagé rend les tests dépendants de leur ordre : la classe de test le dit et l'assume. Est-ce acceptable ? Voir ",
  { t: "CC-TST.3", code: true },
  "."
]));
sta.push(bulletRuns([
  "Pourquoi ",
  { t: "PLACES_MAX", code: true },
  " s'écrit-il en majuscules, alors que Java n'y oblige pas ? Voir ",
  { t: "CC-NOM.7", code: true },
  "."
]));
sta.push(saut());

// --- STA.2
sta.push(h1("STA.2 — Un constructeur privé et des fabriques"));
sta.push(p("Package : be.ephec.java.sta.e02", { italic: true, color: GREY }));
sta.push(h2("Objectif"));
sta.push(p("Découvrir qu'une méthode statique peut construire des objets, et pourquoi c'est parfois préférable à un constructeur."));
sta.push(h2("Le problème que l'exercice résout"));
sta.push(p("Une durée s'exprime en minutes. Mais quand on écrit :"));
sta.push(...code(["new Duree(2)"]));
sta.push(p("deux quoi ? Heures ? Minutes ? Un constructeur ne peut pas le dire : il porte le nom de sa classe, et rien d'autre. Une méthode, elle, porte le nom qu'on veut."));
sta.push(...code([
  "Duree.deHeures(2)      aucun doute",
  "Duree.deMinutes(2)     aucun doute non plus"
]));
sta.push(runs([
  "Ces méthodes s'appellent des ",
  { t: "fabriques", b: true },
  ". Deux fabriques peuvent avoir la même signature là où deux constructeurs ne le pourraient pas — elles se distinguent par leur nom."
]));
sta.push(h2("Ce qui vous est fourni"));
sta.push(runs([
  "Le champ ",
  { t: "minutes", code: true },
  " et le constructeur, déclaré ",
  { t: "private", code: true },
  ". Personne ne peut donc écrire ",
  { t: "new Duree(...)", code: true },
  " depuis l'extérieur : c'est ce qui oblige à passer par les fabriques."
]));
sta.push(h2("Énoncé"));
sta.push(tableau(["Méthode", "Ce qu'elle fait"], [
  ["deMinutes(int)", "fabrique une durée, exprimée en minutes"],
  ["deHeures(int)", "fabrique une durée, exprimée en heures"],
  ["enMinutes()", "rend le nombre total de minutes"],
  ["plus(Duree)", "rend une NOUVELLE durée, somme des deux"],
  ["total(Duree...)", "additionne un nombre quelconque de durées"],
  ["toString()", "« 3h35 », ou « 45min » en dessous d'une heure"]
], [2200, 7160], [0]));
sta.push(runs([
  { t: "Les trois points de total(Duree...) ", b: true },
  "signifient « zéro, une ou plusieurs ». On l'appelle avec ",
  { t: "Duree.total(a, b, c)", code: true },
  " ou même ",
  { t: "Duree.total()", code: true },
  ", qui doit rendre une durée nulle."
]));
sta.push(encadre([
  [{ t: "Une contrainte d'écriture", b: true }],
  ["plus() rend une NOUVELLE durée : ni celle sur laquelle on l'appelle, ni celle qu'on lui passe ne changent."],
  ["C'est l'immuabilité rencontrée en TMP.2 avec LocalDate, appliquée cette fois à une classe que vous écrivez. Le champ étant final, vous n'avez de toute façon pas le choix."]
]));
sta.push(h2("Vérification"));
sta.push(verif([
  ["deHeures(2).enMinutes()", "120"],
  ["deHeures(3).plus(deMinutes(35))", "3h35"],
  ["deMinutes(15)", "15min"],
  ["deHeures(2)", "2h00"],
  ["total(3h35, 15min, 3h35)", "7h25"],
  ["total()", "0min"],
  ["après a.plus(b), a vaut toujours", "sa valeur initiale"]
]));
sta.push(h2("Questions à se poser"));
sta.push(bulletRuns([
  "Écrivez ",
  { t: "new Duree(90)", code: true },
  " dans le Programme. Que refuse le compilateur, et qu'est-ce que ce refus vous empêche d'écrire de faux ?"
]));
sta.push(bulletRuns([
  "Pourquoi ",
  { t: "total()", code: true },
  " est-elle statique, alors que ",
  { t: "plus()", code: true },
  " ne l'est pas ? Qu'est-ce qui les distingue ?"
]));
sta.push(bullet("Le format « 2h00 » impose deux chiffres pour les minutes. Que donnerait votre code sur une durée de 2h05 si vous l'oubliiez ?"));
sta.push(bulletRuns([
  "Pourriez-vous ajouter une fabrique deSecondes(int) sans toucher au reste de la classe ? Voir ",
  { t: "CC-CLS.1", code: true },
  "."
]));
sta.push(bulletRuns([
  "deMinutes et deHeures disent leur unité dans leur nom. Qu'auriez-vous fait avec un paramètre booléen enHeures ? Voir ",
  { t: "CC-MET.5", code: true },
  "."
]));

Packer.toBuffer(doc(sta, "Exercices Java — Thème STA")).then(b => {
  fs.writeFileSync(__dirname + "/../../enonces/STA_enonces.docx", b);
  console.log("STA :", Math.round(b.length / 1024), "Ko");
});
