const fs = require("fs");
const B = require(__dirname + "/boite.js");
const {
  p, runs, bullet, bulletRuns, code, h1, h2, tableau, encadre,
  saut, doc, Packer, GREY, AlignmentType, Paragraph, TextRun
} = B;

const ACCENT = "1F4E79";
const c = [];

// =====================================================================
// Page de garde commune (modele ABS, 17/10/2026).
require(__dirname + "/boite.js").pageDeGarde(c, {
  titre: "Travailler les exercices",
  accroche: "Ce qui vaut pour les quinze thèmes"
});

// =====================================================================
c.push(h1("À quoi sert ce document"));
c.push(p("Chaque fascicule d'exercices commence par la liste de son thème. Ce qui suivait cette liste — comment lancer les tests, comment lire un test vert, pourquoi laisser son code compilable — était identique dans les quinze."));
c.push(p("C'est ici désormais, une fois pour toutes. Lisez ces quelques pages en début d'année, et revenez-y le jour où quelque chose vous surprend."));

// =====================================================================
c.push(h1("Les classes de test"));
c.push(runs([
  "Elles sont déjà écrites, sous ",
  { t: "src/test/java", code: true },
  ". Lancez-les avec la double flèche verte dans la marge. Tout part rouge : votre objectif est le vert."
]));
c.push(runs([
  "Les squelettes lèvent une ",
  { t: "UnsupportedOperationException", code: true },
  " : remplacez ces lignes par votre code. Ne changez ni les noms, ni les types. Quand une méthode ou un constructeur est déjà déclaré, complétez son corps plutôt que de le régénérer."
]));
c.push(runs([
  { t: "Un test vert ne garantit pas que la réponse est correcte. ", b: true },
  "Il vérifie le comportement, pas la lisibilité ni la pertinence de la conception — qui comptent aussi à l'examen."
]));

c.push(h2("Une cinquantaine de tests sont verts dès le départ"));
c.push(p("Ce n'est pas une erreur. Ils relèvent de trois situations, qu'il vaut la peine de savoir distinguer."));

c.push(h2("1. Un test qui garde une contrainte"));
c.push(p("Une classe qui doit rester abstraite, un champ qui doit rester privé, une constante qui doit rester finale. Le squelette les respecte déjà."));
c.push(runs([
  "Ces tests servent le jour où, bloqué par un message, on est tenté de retirer le mot qui gêne. Supprimer ",
  { t: "abstract", code: true },
  " fait disparaître « cannot be instantiated » — et casse tout ce que l'exercice montrait. Le test rouge vous le dira avant le correcteur."
]));

c.push(h2("2. Un exercice où TOUS les tests sont verts au départ"));
c.push(runs([
  "Il y en a trois dans le recueil, et ils ne demandent pas d'écrire du code : ils demandent d'en ",
  { t: "transformer", i: true },
  ". Réduire une surface publique, découper un programme en packages, écrire une classe de test."
]));
c.push(runs([
  "Les tests verts y sont un ",
  { t: "filet", b: true },
  ", pas un objectif : ils prouvent que votre transformation n'a rien cassé. C'est leur passage au ",
  { t: "rouge", b: true },
  " qui est le signal."
]));
c.push(p("Retenez-en que le vert n'est pas toujours une cible. Il arrive qu'il soit une garantie."));

c.push(h2("3. Un test qui vérifie ce que le compilateur a écrit"));
c.push(runs([
  "Les accesseurs, le ",
  { t: "toString", code: true },
  " et le ",
  { t: "equals", code: true },
  " d'un ",
  { t: "record", code: true },
  ". Vous ne les avez pas écrits : le compilateur les a écrits, parce que vous avez déclaré un record."
]));
c.push(p("Les voir verts, c'est constater de ses yeux ce qu'une seule ligne de déclaration vous a évité d'écrire."));

// =====================================================================
c.push(h1("Laissez toujours votre code compilable"));
c.push(runs([
  "Tout le dossier ",
  { t: "src/main/java", code: true },
  " se compile d'un seul bloc. Un exercice laissé à moitié écrit empêche donc de lancer ",
  { t: "tous", i: true },
  " les autres, y compris ceux des séances précédentes."
]));
c.push(runs([
  { t: "Prenez-en une habitude, et non une contrainte. ", b: true },
  "Avant de passer à autre chose, posez-vous la question : est-ce que ça compile ? Si oui, tant mieux. Si non, deux issues — vous corrigez, ou vous mettez le morceau en chantier entre commentaires avec ",
  { t: "Ctrl+/", code: true },
  " / ",
  { t: "⌘/", code: true },
  ". Dans les deux cas, vous repartez d'un état sain."
]));
c.push(runs([
  "C'est aussi ce que l'examen demande : on y rend du code qui compile. Autant que le réflexe soit pris dès janvier. Voir ",
  { t: "ERR.9", code: true },
  " du guide IntelliJ si vous vous retrouvez bloqué."
]));

c.push(h2("L'exception qui confirme la règle"));
c.push(runs([
  "Un seul exercice du recueil, ",
  { t: "ABS.5", code: true },
  ", vous livre sa classe de test ",
  { t: "entièrement en commentaire", b: true },
  ". Elle appelle des classes que vous n'avez pas encore écrites, et elle bloquerait tout le module."
]));
c.push(p("Vous la décommenterez une fois vos classes en place. C'est précisément parce que la règle ci-dessus existe que cet exercice doit s'en écarter."));

// =====================================================================
c.push(h1("Les codes, et où ils mènent"));
c.push(p("Vous rencontrerez trois familles de codes dans les fascicules. Chacune renvoie à un document différent."));
c.push(tableau(["Code", "Exemple", "Où le chercher"], [
  ["THM.n", "ABS.3", "un exercice, dans le fascicule de son thème"],
  ["CC-XXX.n", "CC-NOM.7", "une règle du mémento Clean Code"],
  ["TEC-XXX.n", "TEC-MVN.4", "une notion du mémento technique"],
  ["IDE.n / ERR.n", "ERR.9", "une manœuvre ou une panne, dans le guide IntelliJ"]
], [1800, 1900, 5660], [0, 1]));
c.push(runs([
  { t: "La numérotation des exercices est thématique, pas chronologique. ", b: true },
  { t: "EXC.3", code: true },
  " est le troisième exercice du thème Exceptions, quelle que soit la séance où il tombe. Un exercice garde donc son code même si le calendrier change."
]));

Packer.toBuffer(doc(c, "Travailler les exercices")).then(b => {
  fs.writeFileSync(__dirname + "/../../documents/Memento_Exercices.docx", b);
  console.log("Memento_Exercices :", Math.round(b.length / 1024), "Ko");
});
