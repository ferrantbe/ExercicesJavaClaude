const fs = require("fs");
const B = require(__dirname + "/boite.js");
const {
  p, runs, code, h2, tableau, encadre, saut, doc, Packer,
  GREY, AlignmentType, Paragraph, TextRun
} = B;

const ACCENT = "1F4E79";
const aDire = (t) => encadre([[{ t: "À dire — ", b: true }, t]], "7B9E4B");

function couverture(c, module, titre, duree, quand) {
  // Page de garde commune (modele ABS, 17/10/2026), avec le tableau des
  // demonstrations sous le titre.
  const B = require(__dirname + "/boite.js");
  B.pageDeGarde(c, {
    surtitre: "Démonstration du cours",
    titre: module,
    sousTitre: titre,
    entre: [
      new Paragraph({ spacing: { before: 400 }, children: [] }),
      tableau(["Durée", "Quand la jouer", "Code final"], [
        [duree, quand, `demos/…/demo/${module.toLowerCase()}/`]
      ], [2000, 4400, 2960], []),
      B.ligneGarde("Document destiné au professeur — ne pas distribuer", 28,
                   { italique: true, avant: 300 })
    ],
    espaceBas: 4000
  });
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

const fic = [];
couverture(fic, "FIC", "Les mêmes données, deux fichiers, côte à côte",
  "25 minutes", "Séance 12, avant les exercices FIC");

fic.push(h2("L'idée"));
fic.push(p("Écrire le même carnet d'adresses de deux façons, puis ouvrir les deux fichiers dans l'éditeur, l'un à côté de l'autre. Aucune explication ne remplace ce coup d'œil : l'un se lit, l'autre non."));
fic.push(runs([
  { t: "Le point à faire passer. ", b: true },
  "Le choix entre texte et binaire n'est pas une question de goût. Il engage la ",
  { t: "durabilité", b: true },
  " : un fichier texte survit aux évolutions du programme qui l'a écrit, un fichier binaire non."
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
  ["CC-ERR.6", "n'avalez pas une exception en silence"],
  ["GEN 3.3 et 3.5", "deck GEN : l'effacement de type, qui explique le transtypage à la relecture"],
  ["STA.2", "depuisLigne() est une fabrique, comme deMinutes()"]
], runs([
  "Les fichiers produits vont dans ",
  { t: "sortie/", code: true },
  ", à la racine du projet. Les supprimer avant de rejouer."
]));

// =====================================================================

// ---------------------------------------------------------------------
Packer.toBuffer(doc(fic, "Démonstration FIC")).then(b => {
  fs.writeFileSync(`${__dirname}/../../_demos/Demo_FIC.docx`, b);
  console.log("Demo_FIC.docx :", Math.round(b.length / 1024), "Ko");
});
