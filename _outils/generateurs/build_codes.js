const fs = require("fs");
const B = require(__dirname + "/boite.js");
const { p, runs, code, h1, h2, tableau, encadre, saut, doc, Packer,
        Packer: _P, GREY, AlignmentType, Paragraph, TextRun } = B;

const c = [];

// ---------- couverture ----------
c.push(new Paragraph({
  spacing: { before: 1200, after: 120 }, alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "Programmation orientée objet — Java", size: 26, color: GREY })]
}));
c.push(new Paragraph({
  spacing: { after: 200 }, alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "Les codes du cours", bold: true, size: 46, color: "1F4E79" })]
}));
c.push(new Paragraph({
  spacing: { after: 800 }, alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "À quoi correspond chaque abréviation", size: 26, color: GREY })]
}));
c.push(p("EPHEC — Bachelier en informatique, niveau 2", { align: AlignmentType.CENTER, color: GREY }));
c.push(p("Année académique 2026-2027", { align: AlignmentType.CENTER, color: GREY }));
c.push(saut());

// ---------- intro ----------
c.push(h1("Une table, pour tout le cours"));
c.push(p("Vous rencontrerez des codes courts partout : sur les fascicules d'exercices, dans les noms de packages, dans les archives que vous recevez, et dans les renvois d'un document à l'autre. Ils désignent tous la même chose."));
c.push(runs([
  "Le code ",
  { t: "COL", code: true },
  " nomme à la fois le thème « Collections », le fascicule ",
  { t: "COL_enonces.docx", code: true },
  ", le package ",
  { t: "be.ephec.java.col", code: true },
  " et les exercices ",
  { t: "COL.1", code: true },
  " à ",
  { t: "COL.7", code: true },
  "."
]));
c.push(runs([
  { t: "La numérotation est thématique, pas chronologique. ", b: true },
  { t: "EXC.3", code: true },
  " est le troisième exercice du thème Exceptions, quelle que soit la séance où il tombe. Un exercice garde donc son code même si le calendrier change."
]));

// ---------- themes ----------
c.push(h1("Les thèmes d'exercices"));
c.push(tableau(["Code", "Titre", "Ce que vous y travaillez", "Exercices"], [
  ["POO", "Classes, objets et encapsulation", "Première classe, champs, accesseurs, données calculées", "5"],
  ["STA", "static", "Constantes, champs et méthodes de classe", "2"],
  ["TMP", "Dates et heures", "LocalDate, LocalDateTime, durées, formatage", "6"],
  ["PKG", "Packages et visibilité", "Niveaux de visibilité, surface publique, découpage", "5"],
  ["TAB", "Tableaux, boucles, ternaire", "Tableaux à une et deux dimensions, associations", "4"],
  ["ENU", "Énumérations et records", "enum, record, données immuables", "4"],
  ["ABS", "Classes abstraites", "Hiérarchies, méthodes abstraites, factorisation", "5"],
  ["ITF", "Interfaces", "Implémentation multiple, patron Observateur", "4"],
  ["COL", "Collections", "List, Set, Map, parcours, filtrage", "7"],
  ["EXC", "Exceptions", "Levée, capture, exceptions personnalisées, trace", "5"],
  ["JUN", "Tests unitaires JUnit", "Assertions, TDD, écriture de classes de test", "3"],
  ["GEN", "Types génériques", "Classes et méthodes paramétrées, joker", "6"],
  ["LAM", "Lambdas et références de méthodes", "Interfaces fonctionnelles, java.util.function", "3"],
  ["FX", "JavaFX", "Fenêtres, composants, gestion d'événements", "8"],
  ["FIC", "Fichiers", "Lecture et écriture, sérialisation", "3"],
  ["REC", "Exercices récapitulatifs", "Révision transversale avant l'examen", "à définir"]
], [1000, 3050, 4000, 1310], [0]));
c.push(runs([
  "Le fil rouge ",
  { t: "GameHub", b: true },
  " garde un code à part, ",
  { t: "G", code: true },
  ", et une numérotation séquentielle de ",
  { t: "G.1", code: true },
  " à ",
  { t: "G.30", code: true },
  " : son ordre est imposé par les dépendances entre incréments, pas par un thème."
]));
c.push(runs([
  "Le ",
  { t: "démineur", b: true },
  " est un exercice facultatif, dans son propre projet. Il n'a ni code de thème ni numéro : il ne dépend d'aucun autre exercice, et rien ne dépend de lui."
]));
c.push(saut());

// ---------- documents ----------
c.push(h1("Les trois documents de référence"));
c.push(p("Ils ne dépendent d'aucune séance et servent toute l'année. Les fascicules d'exercices y renvoient par un code, sans reproduire le contenu."));
c.push(tableau(["Document", "Codes", "Ce qu'on y trouve"], [
  ["Mémento Clean Code", "CC-*", "34 règles d'écriture, de nommage et de conception"],
  ["Mémento technique", "TEC-*", "La plateforme, les interfaces graphiques, la compilation, l'exécution, Maven"],
  ["Guide IntelliJ", "IDE.* et ERR.*", "Installer, ouvrir, écrire, exécuter, et une annexe d'erreurs"]
], [2600, 2200, 4560], [1]));

c.push(h2("Les sections du mémento Clean Code"));
c.push(tableau(["Code", "Section", "Règles"], [
  ["CC-NOM", "Les noms", "8"],
  ["CC-MET", "Les méthodes", "8"],
  ["CC-COM", "Les commentaires", "3"],
  ["CC-OBJ", "Objets et structures de données", "2"],
  ["CC-ERR", "Le traitement des erreurs", "5"],
  ["CC-TST", "Les tests", "3"],
  ["CC-CLS", "Les classes", "4"]
], [1400, 5400, 2560], [0]));

c.push(h2("Les sections du mémento technique"));
c.push(tableau(["Code", "Section", "Ce qu'on y trouve"], [
  ["TEC-PLA", "La plateforme Java", "JVM, JRE, JDK, éditions, versions"],
  ["TEC-FX", "Les interfaces graphiques", "AWT, Swing, JavaFX et leurs modules"],
  ["TEC-CMP", "De votre code au programme", ".java, .class, bytecode, classpath"],
  ["TEC-EXE", "Pendant l'exécution", "La pile, le tas, les références, le ramasse-miettes"],
  ["TEC-MVN", "Maven", "pom.xml, modules, cycle de vie, dépôt local"],
  ["TEC-ZIP", "Recevoir les fichiers du cours", "Extraire une archive au bon endroit"],
  ["TEC-GIT", "Git, en deux mots", "Gestion de versions, fichiers ignorés"]
], [1400, 3200, 4760], [0]));

c.push(runs([
  "Le guide IntelliJ numérote simplement : ",
  { t: "IDE.1", code: true },
  " à ",
  { t: "IDE.29", code: true },
  " pour les sections, ",
  { t: "ERR.1", code: true },
  " à ",
  { t: "ERR.8", code: true },
  " pour l'annexe des erreurs."
]));
c.push(saut());

// ---------- organisation du projet ----------
c.push(h1("L'organisation du projet"));
c.push(p("Le projet que vous recevez est organisé ainsi :"));
c.push(...code([
  "ExercicesJava/",
  "    pom.xml         configuration commune — ne pas modifier",
  "    documents/      les trois documents de reference, et ce fichier-ci",
  "    enonces/        les fascicules d'exercices, un par theme",
  "    exercices/      VOTRE code. C'est ici que vous travaillez.",
  "    solutions/      les corriges, publies apres chaque seance"
]));
c.push(encadre([
  [{ t: "Les dossiers commençant par un souligné", b: true }],
  ["Si vous voyez des dossiers dont le nom commence par _ — _outils, _todos, _objectifs — c'est que vous avez sous les yeux la version de travail du professeur. Ils ne figurent pas dans les archives que vous recevez."]
]));

c.push(h2("Où trouver quoi"));
c.push(tableau(["Vous cherchez…", "Regardez dans"], [
  ["l'énoncé d'un exercice", "enonces/, le fascicule du thème"],
  ["une règle d'écriture", "documents/Memento_Clean_Code.docx"],
  ["comment fonctionne le JDK ou Maven", "documents/Memento_Technique.docx"],
  ["comment faire quelque chose dans IntelliJ", "documents/Guide_IntelliJ.docx"],
  ["que signifie un message d'erreur", "l'annexe ERR.* du guide IntelliJ"],
  ["le squelette à compléter", "exercices/src/main/java/be/ephec/java/<theme>/"],
  ["la classe de test", "exercices/src/test/java/be/ephec/java/<theme>/"]
], [4400, 4960], []));

// ---------------------------------------------------------------------
Packer.toBuffer(doc(c, "Les codes du cours")).then(b => {
  fs.writeFileSync(__dirname + "/../../documents/Codes_du_cours.docx", b);
  console.log("écrit :", Math.round(b.length / 1024), "Ko");
});
