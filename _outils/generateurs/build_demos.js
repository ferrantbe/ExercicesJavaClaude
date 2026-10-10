const fs = require("fs");
const B = require(__dirname + "/boite.js");
const {
  p, runs, bullet, code, h1, h2, tableau, encadre, saut, doc, Packer,
  GREY, AlignmentType, Paragraph, TextRun, PageBreak
} = B;

const ACCENT = "1F4E79";

// Un bloc « A dire », visuellement distinct du reste.
function aDire(texte) {
  return encadre([[{ t: "À dire — ", b: true }, texte]], "7B9E4B");
}

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

function etape(c, numero, titre, duree) {
  c.push(new Paragraph({
    spacing: { before: 280, after: 120 }, keepNext: true,
    children: [
      new TextRun({ text: `Étape ${numero} · `, bold: true, size: 26, color: "7B9E4B" }),
      new TextRun({ text: titre, bold: true, size: 26, color: ACCENT }),
      new TextRun({ text: `   ${duree}`, size: 20, color: GREY })
    ]
  }));
}

// =====================================================================
//  POO
// =====================================================================
const poo = [];
couverture(poo, "POO", "Construire une classe, puis l'encapsuler",
           "12 à 15 minutes", "avant POO.1");

etape(poo, 1, "Partir de rien", "2 min");
poo.push(p("Créer une classe Livre vide, dans un package vide. Taper le squelette à la main, sans générateur : les étudiants doivent voir qu'une classe n'a rien de magique."));
poo.push(...code(["public class Livre { }"]));
poo.push(aDire("une classe est un moule. Elle ne fait encore rien."));

etape(poo, 2, "Des champs publics, et ce qui se passe", "3 min");
poo.push(runs([
  "Ajouter ",
  { t: "titre", code: true }, ", ",
  { t: "auteur", code: true }, ", ",
  { t: "anneeDeParution", code: true },
  ", tous en ",
  { t: "public", code: true },
  ". Écrire un ",
  { t: "main", code: true },
  " qui crée un Livre et remplit ses champs directement. Lancer : ça marche."
]));
poo.push(runs([{ t: "Puis, devant eux, écrire :", b: true }]));
poo.push(...code(["livre.anneeDeParution = -3000;"]));
poo.push(p("Lancer : ça marche aussi. Laisser le silence s'installer."));
poo.push(aDire("rien n'a protesté. Le programme est faux et personne ne le sait. Voilà le problème qu'on va résoudre."));

etape(poo, 3, "Fermer, puis rouvrir", "4 min");
poo.push(runs([
  "Passer les trois champs en ",
  { t: "private", code: true },
  ". Lancer : ne compile plus. Lire le message d'erreur à voix haute."
]));
poo.push(runs([
  "Générer les accesseurs avec ",
  { t: "Alt+Inser", code: true },
  " / ",
  { t: "⌘N", code: true },
  " — c'est le moment de montrer le générateur, voir ",
  { t: "IDE.12", code: true },
  " du guide. Lancer : ça remarche."
]));
poo.push(aDire("on a fait un détour pour revenir au même résultat. À quoi bon ? Réponse à l'étape suivante."));

etape(poo, 4, "Ce que le détour permet", "3 min");
poo.push(runs([
  "Dans ",
  { t: "setAnneeDeParution", code: true },
  ", ajouter la vérification. Relancer avec ",
  { t: "-3000", code: true },
  " : le programme refuse."
]));
poo.push(aDire("c'est la seule chose qu'un champ public ne permettra jamais. L'accesseur n'est pas une formalité, c'est l'endroit où l'on peut mettre une règle."));

etape(poo, 5, "La donnée qui n'existe pas", "3 min");
poo.push(runs([
  "Demander : « et si je veux l'âge du livre ? » Laisser proposer un champ ",
  { t: "age", code: true },
  ". L'écrire. Puis demander ce qui se passe l'an prochain. Supprimer le champ, écrire la méthode qui calcule."
]));
poo.push(aDire("une donnée qu'on peut calculer n'a pas à être stockée. C'est exactement POO.3, qu'ils feront tout à l'heure."));

poo.push(h2("Ce qu'il faut rater exprès"));
poo.push(encadre([
  [{ t: "À l'étape 3", b: true }, " — taper ", { t: "nom = nom", code: true },
   " au lieu de ", { t: "this.nom = nom", code: true }, " dans un setter."],
  ["Le compilateur ne dit rien, l'affectation ne fait rien, et le getter rend null. Laisser chercher trente secondes avant de montrer le this."],
  ["C'est la première question de POO.2."]
], "9C2B2B"));

poo.push(h2("Renvois"));
poo.push(tableau(["Code", "Ce qu'il dit"], [
  ["CC-OBJ.2", "un objet expose des comportements, pas ses données"],
  ["CC-NOM.1", "un nom répond à la question qu'on se pose en le lisant"],
  ["IDE.12", "générer les accesseurs"]
], [1600, 7760], [0]));

poo.push(h2("Pour rejouer"));
poo.push(runs([
  "Partir d'un package vide, ou copier l'état de l'étape 2 depuis ",
  { t: "_demos/sources_initiales/poo/", code: true },
  " si vous voulez gagner les deux premières minutes."
]));

// =====================================================================
//  EXC
// =====================================================================
const exc = [];
couverture(exc, "EXC", "Faire planter le programme, lire la trace, corriger",
           "10 à 12 minutes", "avant EXC.1");
exc.push(p("C'est la démonstration la plus rentable de l'année : une trace d'exception ne se montre pas sur une slide, elle se lit à l'écran, en direct, pendant que le programme vient de s'arrêter."));

etape(exc, 1, "Le planter", "2 min");
exc.push(runs([
  "Lancer ",
  { t: "Demo", code: true },
  " dans son état initial. Il s'arrête sur une ",
  { t: "ArithmeticException", code: true },
  ". Ne rien expliquer tout de suite."
]));
exc.push(aDire("quelqu'un peut me dire où est l'erreur ?"));
exc.push(p("Laisser répondre. La plupart regarderont la dernière ligne."));

etape(exc, 2, "Lire dans le bon sens", "3 min");
exc.push(runs([
  "Montrer que la ",
  { t: "première", b: true },
  " ligne ",
  { t: "at", code: true },
  " dit où l'exception a été levée, et que les suivantes remontent jusqu'au ",
  { t: "main", code: true },
  ". Cliquer sur les numéros de ligne : IntelliJ y emmène directement."
]));
exc.push(aDire("l'erreur est dans moyenne(), mais la cause est ailleurs : c'est le main qui a passé un panier vide. Une trace sert autant à trouver le coupable qu'à remonter jusqu'à celui qui l'a mis en position de faillir."));

etape(exc, 3, "Trois corrections possibles", "4 min");
exc.push(p("Les proposer et les discuter à haute voix, sans les coder toutes."));
exc.push(tableau(["Correction", "Ce qu'elle donne"], [
  ["rendre 0 quand le panier est vide",
   "le programme continue avec une valeur fausse — un panier vide n'a pas une moyenne de zéro, il n'a pas de moyenne"],
  ["tester avant d'appeler, dans le main",
   "marche, mais chaque appelant devra y penser, et le premier qui oubliera fera replanter le programme"],
  ["lever une exception explicite dans moyenne()",
   "la méthode dit elle-même ce qu'elle refuse, une fois pour toutes, et le message explique pourquoi"]
], [3400, 5960], []));
exc.push(p("Coder la troisième. Relancer : le message est maintenant lisible."));

etape(exc, 4, "Et l'attraper", "2 min");
exc.push(runs([
  "Entourer l'appel d'un ",
  { t: "try/catch", code: true },
  " dans le ",
  { t: "main", code: true },
  ". Montrer que le programme continue au lieu de s'arrêter."
]));
exc.push(aDire("lever et attraper sont deux gestes distincts, faits à deux endroits différents. On lève là où l'on constate le problème, on attrape là où l'on peut y faire quelque chose."));

exc.push(h2("Ce qu'il faut rater exprès"));
exc.push(encadre([
  [{ t: "À l'étape 4", b: true }, " — écrire d'abord un ", { t: "catch", code: true }, " vide."],
  ["Relancer : le programme ne dit plus rien du tout, et tout va bien en apparence."],
  [{ t: "À dire — ", b: true },
   "on vient de faire pire qu'avant. Le plantage était bruyant mais honnête ; ce silence est un mensonge. Voir CC-ERR.3."]
], "9C2B2B"));

exc.push(h2("Renvois"));
exc.push(tableau(["Code", "Ce qu'il dit"], [
  ["CC-ERR.1", "préférer une exception à un code de retour arrangé"],
  ["CC-ERR.3", "ne jamais avaler une exception en silence"],
  ["CC-ERR.4", "un message qui dit ce qui était attendu et ce qui est arrivé"],
  ["TEC-EXE.1", "la pile d'appels, qui est ce que la trace affiche"]
], [1600, 7760], [0]));

exc.push(h2("Pour rejouer"));
exc.push(runs([
  "Copier ",
  { t: "_demos/sources_initiales/exc/", code: true },
  " : le panier y est sans garde et le main sans try, exactement comme à l'étape 1."
]));

// =====================================================================
//  JUN
// =====================================================================
const jun = [];
couverture(jun, "JUN", "Rouge, vert, puis nettoyer", "15 minutes", "avant JUN.1");
jun.push(p("C'est la démonstration qu'on ne peut pas remplacer par des slides : le cycle du développement piloté par les tests ne se comprend qu'en le voyant, avec la barre qui passe du rouge au vert."));

etape(jun, 1, "Écrire le test d'abord", "3 min");
jun.push(runs([
  "Package vide. Créer ",
  { t: "RomainTest", code: true },
  " dans ",
  { t: "src/test", code: true },
  ", et écrire :"
]));
jun.push(...code([
  "@Test",
  "void unVaut1() {",
  "    assertEquals(1, Romain.enChiffres(\"I\"));",
  "}"
]));
jun.push(runs([
  "La classe ",
  { t: "Romain", code: true },
  " n'existe pas : tout est rouge dans l'éditeur. ",
  { t: "Alt+Entrée", code: true },
  ", « Create class Romain ». Puis « Create method »."
]));
jun.push(aDire("le test vient d'écrire la signature à ma place. Il ne vérifie rien encore, il DÉCRIT ce que je veux."));

etape(jun, 2, "Le voir échouer", "2 min");
jun.push(p("Lancer. Rouge."));
jun.push(aDire("c'est une étape, pas un accident. Un test qu'on n'a jamais vu échouer ne prouve rien : il pourrait être vert par erreur."));

etape(jun, 3, "La plus petite chose qui passe", "2 min");
jun.push(runs(["Écrire ", { t: "return 1;", code: true }, ". Lancer. Vert."]));
jun.push(runs([{ t: "Les étudiants protestent. Les laisser protester.", b: true }]));
jun.push(aDire("vous avez raison, c'est ridicule. Mais mon test ne demande rien de plus. Si je veux mieux, j'écris un meilleur test."));

etape(jun, 4, "Un deuxième test force le vrai code", "4 min");
jun.push(...code([
  "assertEquals(5, Romain.enChiffres(\"V\"));    rouge",
  "    -> ecrire la table de correspondance      vert",
  "",
  "assertEquals(2, Romain.enChiffres(\"II\"));   rouge",
  "    -> ajouter la boucle                      vert"
]));
jun.push(aDire("à chaque tour, le test tire le code d'un cran. Je n'ai jamais écrit de code que rien ne demandait."));

etape(jun, 5, "Le cas qui fait tout basculer", "3 min");
jun.push(runs([
  "Ajouter ",
  { t: "assertEquals(4, Romain.enChiffres(\"IV\"));", code: true },
  " : rouge, la somme naïve donne 6."
]));
jun.push(p("Laisser chercher. Puis montrer la règle soustractive."));
jun.push(aDire("ce cas-là, je ne l'aurais pas vu en écrivant le code d'abord. C'est en cherchant quoi tester que je l'ai trouvé."));

etape(jun, 6, "Nettoyer sans crainte", "1 min");
jun.push(p("Renommer une variable, extraire une méthode, reformater. Relancer après chaque geste : vert, vert, vert."));
jun.push(aDire("voilà ce que les tests achètent vraiment. Pas la preuve que le code marche : le droit de le modifier sans trembler."));

jun.push(h2("Ce qu'il faut rater exprès"));
jun.push(encadre([
  [{ t: "À l'étape 2", b: true }, " — écrire un test sans assertion :"],
  [{ t: "@Test  void cinqVaut5() { Romain.enChiffres(\"V\"); }", code: true }],
  ["Le lancer : vert, immédiatement, alors que rien n'est écrit."],
  [{ t: "À dire — ", b: true },
   "ce test ne vérifie rien et ne le dira jamais. C'est le défaut le plus fréquent dans les classes de test rendues à l'examen. Voir CC-TST.2."]
], "9C2B2B"));

jun.push(h2("Renvois"));
jun.push(tableau(["Code", "Ce qu'il dit"], [
  ["CC-TST.1", "un test doit être lisible avant d'être malin"],
  ["CC-TST.2", "une assertion par test, et au moins une"],
  ["IDE.17", "lancer les tests et lire le rapport"]
], [1600, 7760], [0]));

jun.push(h2("Où se trouve l'état final"));
jun.push(runs([
  "La classe ",
  { t: "Romain", code: true },
  " est dans ",
  { t: "demos/src/main/java/…/demo/jun/", code: true },
  ", et sa classe de test dans ",
  { t: "demos/src/test/java/…/demo/jun/", code: true },
  ". Les deux sont publiées avec les corrigés de la séance."
]));
jun.push(p("L'ordre des méthodes de RomainTest raconte l'ordre dans lequel le code est né : chacune était rouge avant que la ligne correspondante ne soit écrite."));

jun.push(h2("Pour rejouer"));
jun.push(runs([
  "Repartir d'un package vide : l'intérêt est dans le chemin. ",
  { t: "_demos/sources_initiales/jun/", code: true },
  " contient l'état de l'étape 3 — le ",
  { t: "return 1;", code: true },
  " — parce qu'aucun état antérieur ne compile, ce qui est précisément le sujet des deux premières étapes."
]));

// ---------------------------------------------------------------------
const sorties = [
  ["poo", poo, "Démo POO"],
  ["exc", exc, "Démo EXC"],
  ["jun", jun, "Démo JUN"]
];
sorties.forEach(([nom, contenu, titre]) => {
  Packer.toBuffer(doc(contenu, titre)).then(b => {
    fs.writeFileSync(`${__dirname}/../../_demos/Demo_${nom.toUpperCase()}.docx`, b);
    console.log(`Demo_${nom.toUpperCase()}.docx :`, Math.round(b.length / 1024), "Ko");
  });
});
