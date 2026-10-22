const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle,
  PageBreak, LevelFormat, convertInchesToTwip,
  Bookmark, InternalHyperlink, ImageRun, TabStopType, Tab, FootnoteReferenceRun
} = require("docx");

const MONO = "Consolas";
const ACCENT = "1F4E79";
const GREY = "595959";
const W = 9360;

/**
 * L'espace insecable, pose a la source.
 *
 * En typographie francaise, « : » « ; » « ? » « ! » et « » » se collent au
 * mot precedent par un espace qui ne doit jamais tomber en fin de ligne.
 * Sans lui, Word peut renvoyer un deux-points seul a la ligne suivante.
 *
 * On le pose ICI plutot qu'en post-traitement : un document regenere
 * naitrait sinon avec des espaces ordinaires, et il faudrait penser a
 * relancer l'outil. Ce qui se fait a la source ne s'oublie pas.
 *
 * LE CODE EST EPARGNE. Dans un bloc ou un fragment monospace, les deux
 * points appartiennent au langage — un « case NIM -> » ou un
 * « Map<String, Integer> » n'a que faire de la typographie francaise.
 */
const INSECABLE = "\u00a0";

function typo(texte) {
  if (typeof texte !== "string") return texte;
  return texte
    .replace(/ ([:;?!»])/g, INSECABLE + "$1")
    .replace(/« /g, "«" + INSECABLE);
}

/**
 * La ligne « Package : … » qui suit le titre d'un exercice reste attachee
 * au paragraphe suivant. Le titre l'est deja a elle (keepNext des h1) :
 * sans ce second maillon, titre et ligne de package pouvaient finir seuls
 * en bas de page, l'enonce commencant sur la page d'apres.
 */
const LIGNE_PACKAGE = /^Package\s*:/;

function p(text, o = {}) {
  return new Paragraph({
    spacing: { after: o.after === undefined ? 120 : o.after },
    alignment: o.align,
    keepNext: o.keepNext || LIGNE_PACKAGE.test(String(text)),
    children: [new TextRun({ text: typo(text), bold: o.bold, italics: o.italic, size: o.size || 22, color: o.color })]
  });
}

function morceaux(list) {
  // Un paragraphe est decoupe en fragments, et la ponctuation tombe
  // souvent a la frontiere : « Voir » + « pom.xml » en monospace +
  // « : sa raison d'etre ». Le remplacement fragment par fragment ne
  // verrait pas cet espace-la, puisqu'il termine un fragment et que le
  // signe en commence un autre. On recolle donc les bords.
  const textes = list.map(x => (typeof x === "string" ? x : x.t) || "");
  const monospace = list.map(x => typeof x !== "string" && !!x.code);

  const corriges = textes.map((t, i) => (monospace[i] ? t : typo(t)));

  for (let i = 0; i < corriges.length - 1; i++) {
    const suite = corriges[i + 1];
    if (!suite) continue;
    if (corriges[i].endsWith(" ") && ":;?!»".includes(suite[0])) {
      corriges[i] = corriges[i].slice(0, -1) + INSECABLE;
    } else if (corriges[i].endsWith("«") && suite.startsWith(" ")) {
      corriges[i + 1] = INSECABLE + suite.slice(1);
    }
  }

  return list.map((x, i) => typeof x === "string"
    ? new TextRun({ text: corriges[i], size: 22 })
    : x.note !== undefined
    ? new FootnoteReferenceRun(x.note)          // appel de note (support, 21/10/2026)
    : new TextRun({
        text: corriges[i], size: 22, bold: x.b, italics: x.i,
        font: x.code ? MONO : undefined, color: x.code ? "8B2500" : undefined
      }));
}

const runs = (l, o = {}) => new Paragraph({
  spacing: { after: o.after === undefined ? 120 : o.after }, keepNext: o.keepNext,
  children: morceaux(l)
});

const bullet = (t) => new Paragraph({
  numbering: { reference: "puces", level: 0 }, spacing: { after: 60 },
  children: [new TextRun({ text: typo(t), size: 22 })]
});

const bulletRuns = (l) => new Paragraph({
  numbering: { reference: "puces", level: 0 }, spacing: { after: 60 }, children: morceaux(l)
});

function code(lines, o = {}) {
  // o.avant / o.apres : l'espace avant la premiere ligne et apres la derniere
  // (0 quand un autre bloc de code suit ou precede, 22/10/2026)
  const avant = o.avant === undefined ? 100 : o.avant;
  const apres = o.apres === undefined ? 160 : o.apres;
  return lines.map((l, i) => new Paragraph({
    spacing: { before: i === 0 ? avant : 0, after: i === lines.length - 1 ? apres : 0 },
    shading: { type: ShadingType.CLEAR, fill: "F2F2F2" },
    indent: { left: 220 }, keepLines: true,
    // un bloc court ne se coupe pas entre deux pages (20/10/2026) ; un bloc
    // de plus de 30 lignes le peut, sans quoi il laisserait une page vide
    keepNext: lines.length <= 30 && i < lines.length - 1,
    children: [new TextRun({ text: l === "" ? " " : l, font: MONO, size: 19 })]
  }));
}

/**
 * Le code d'un exercice : ABS.1, TMP.12…
 *
 * Il sert a deux choses : poser un signet sur le titre de l'exercice, et
 * fabriquer le lien qui y mene depuis le tableau d'ouverture. Les deux
 * doivent tomber d'accord, d'ou cette unique fonction.
 */
const CODE_EXERCICE = /^([A-Z]{2,3})\.(\d+)\b/;
const ancre = (code) => "ex-" + code.replace(".", "-");

// Un texte avec du code entre accents graves : bt("le champ `public`")
// donne ["le champ ", { t: "public", code: true }] (18/10/2026).
const bt = (texte) => texte.split(/(`[^`]+`)/).filter(x => x)
  .map(x => x.startsWith("`") ? { t: x.slice(1, -1), code: true } : x);

// Un titre peut contenir du code entre accents graves : « Ce que `static`
// veut dire ». Le code y est en Consolas, un peu plus petit que le titre.
function morceauxTitre(t, taille, couleur) {
  return bt(t).map(x => typeof x === "string"
    ? new TextRun({ text: typo(x), bold: true, size: taille, color: couleur })
    : new TextRun({ text: x.t, bold: true, size: taille - 4, font: MONO }));
}

const h1 = (t, o = {}) => new Paragraph({
  heading: HeadingLevel.HEADING_1, spacing: { before: 360, after: 160 }, keepNext: true,
  pageBreakBefore: o.sautAvant,
  // Un titre qui commence par un code d'exercice porte un signet, pour
  // que le tableau d'ouverture puisse y renvoyer.
  children: (() => {
    const trouve = CODE_EXERCICE.exec(t.replace(/`/g, ""));
    const texte = morceauxTitre(t, 30, ACCENT);
    return trouve
      ? [new Bookmark({ id: ancre(trouve[0]), children: texte })]
      : texte;
  })()
});

const h2 = (t) => new Paragraph({
  heading: HeadingLevel.HEADING_2, spacing: { before: 240, after: 100 }, keepNext: true,
  children: morceauxTitre(t, 24, GREY)
});

/**
 * Une cellule dont le contenu renvoie a l'exercice du meme nom.
 *
 * On ne met pas de numero de page : il bougerait a la premiere image
 * ajoutee. Le signet, lui, suit son titre.
 */
function celluleLien(code, o = {}) {
  return new TableCell({
    width: { size: o.width, type: WidthType.DXA },
    shading: o.fill ? { type: ShadingType.CLEAR, fill: o.fill } : undefined,
    margins: { top: 55, bottom: 55, left: 100, right: 100 },
    children: [new Paragraph({
      spacing: { after: 0 },
      children: [new InternalHyperlink({
        anchor: ancre(code),
        children: [new TextRun({
          text: code, size: 18, font: MONO, color: "2B6CB0", underline: {}
        })]
      })]
    })]
  });
}

function cell(text, o = {}) {
  return new TableCell({
    width: { size: o.width, type: WidthType.DXA },
    shading: o.fill ? { type: ShadingType.CLEAR, fill: o.fill } : undefined,
    columnSpan: o.span,
    margins: { top: 55, bottom: 55, left: 100, right: 100 },
    children: [new Paragraph({
      spacing: { after: 0 },
      // Une cellule monospace porte du code : on ne la touche pas.
      // Une cellule peut aussi recevoir des fragments, comme runs() :
      // ["deplacement", " (", "double", ")"] avec du code au milieu.
      children: Array.isArray(text)
        ? text.map(x => typeof x === "string"
            ? new TextRun({ text: typo(x), bold: o.bold, size: 20 })
            : x.note !== undefined
            ? new FootnoteReferenceRun(x.note)    // une note de bas de page dans un tableau
            : new TextRun({ text: x.t, bold: o.bold || x.b, size: x.code ? 18 : 20, font: x.code ? MONO : undefined }))
        : [new TextRun({ text: o.mono ? text : typo(text), bold: o.bold, size: o.mono ? 18 : 20, font: o.mono ? MONO : undefined })]
    })]
  });
}

/**
 * Largeurs de colonnes calculees (demande du 20/10/2026) : la repartition
 * qui fait tenir le tableau dans le moins de lignes possible, comme
 * Frederic le faisait a la main dans Word.
 *
 * Les textes sont mesures avec les largeurs reelles des caracteres de
 * Cormorant Garamond (metriques_polices.json, tirees de la police) et de
 * Consolas (chasse fixe). On prend une marge de 6 % : un texte calcule
 * « juste a la limite » ne doit pas passer a la ligne dans Word.
 */
const METRIQUES = JSON.parse(fs.readFileSync(__dirname + "/metriques_polices.json", "utf-8"));
const MARGE_CELLULE = 2 * 100 + 40;          // marges gauche et droite de cell(), en twips

function largeurMot(mot, code, gras, taille) {
  // taille en demi-points ; resultat en twips (1 pt = 20 twips)
  if (code) return mot.length * METRIQUES.consolas / 1000 * (taille - 2) / 2 * 20;
  const table = gras ? METRIQUES.gras : METRIQUES.regulier;
  let u = 0;
  for (const ch of mot) u += table[ch] || 500;
  return u / 1000 * taille / 2 * 20;
}

function motsDeCellule(val, gras) {
  // Les mots d'une cellule et leur largeur. Un mot peut chevaucher deux
  // fragments : « (static) » est fait de « ( », du code « static » et de
  // « ) », sans espace entre eux ; ses trois largeurs s'additionnent.
  const frags = Array.isArray(val) ? val : [{ t: String(val || ""), code: false }];
  const mots = [];
  let courant = 0;
  for (const f of frags) {
    if (typeof f !== "string" && f.note !== undefined) continue;   // un appel de note ne prend pas de place
    const t = typeof f === "string" ? f : f.t;
    const code = typeof f !== "string" && !!f.code;
    const g = gras || (typeof f !== "string" && !!f.b);
    const morceaux = t.split(/(\s+)/);
    for (const m of morceaux) {
      if (!m) continue;
      if (/^\s+$/.test(m)) { if (courant) mots.push(courant); courant = 0; continue; }
      courant += largeurMot(m, code, g, 20) * 1.06;
    }
  }
  if (courant) mots.push(courant);
  return mots;
}

function lignesNecessaires(mots, largeur) {
  const utile = largeur - MARGE_CELLULE;
  const espace = 55;
  let n = 1, courant = 0;
  for (const m of mots) {
    if (courant === 0) { courant = m; continue; }
    if (courant + espace + m <= utile) courant += espace + m;
    else { n++; courant = m; }
  }
  return n;
}

function largeursAuto(entetes, lignes, total) {
  const rangs = [entetes.map(e => ({ mots: motsDeCellule(e, true) })),
                 ...lignes.map(r => r.map(v => ({ mots: motsDeCellule(v, false) })))];
  const n = entetes.length;
  const naturel = Array(n).fill(0), minimum = Array(n).fill(0);
  for (const r of rangs) r.forEach((c, j) => {
    const plein = c.mots.reduce((a, m) => a + m, 0) + 55 * Math.max(0, c.mots.length - 1);
    naturel[j] = Math.max(naturel[j], plein + MARGE_CELLULE);
    minimum[j] = Math.max(minimum[j], Math.max(0, ...c.mots) + MARGE_CELLULE);
  });
  const somme = t => t.reduce((a, b) => a + b, 0);
  if (somme(naturel) <= total) {
    // tout tient sur une ligne : le surplus se repartit au prorata
    const reste = total - somme(naturel);
    return naturel.map(x => Math.round(x + reste * x / somme(naturel)));
  }
  let w = minimum.slice();
  if (somme(w) > total) return w.map(x => Math.round(x * total / somme(w)));
  // La premiere colonne porte d'ordinaire les intitules des lignes (« Je
  // veux », « Famille »...) : si elle tient sur une ligne dans le quart de
  // la largeur, on la lui donne d'abord. Frederic elargissait ces colonnes
  // a la main pour gagner des lignes (22/10/2026).
  const prioritaire = n > 1 && naturel[0] <= total * 0.25 && naturel[0] + somme(minimum.slice(1)) <= total;
  if (prioritaire) w[0] = naturel[0];
  const cout = ww => rangs.reduce((a, r) => a + Math.max(...r.map((c, j) => lignesNecessaires(c.mots, ww[j]))), 0);
  let reste = total - somme(w);
  const pas = 40;
  // A chaque tour, on essaie pour chaque colonne un petit pas, et aussi un
  // saut jusqu'a la largeur qui la met sur une ligne : un pas seul ne gagne
  // souvent rien (il faut elargir de plusieurs pas avant qu'une cellule
  // perde une ligne), et le saut evite de rester bloque sur ce palier.
  // On garde l'essai qui gagne le plus de lignes par twip (22/10/2026).
  while (reste >= pas) {
    let meilleur = -1, ajout = 0, ratio = 0, base = cout(w);
    for (let j = 0; j < n; j++) {
      if (w[j] >= naturel[j]) continue;
      for (const d of [pas, Math.min(reste, naturel[j] - w[j])]) {
        if (d <= 0) continue;
        const essai = w.slice(); essai[j] += d;
        const g = base - cout(essai);
        if (g > 0 && g / d > ratio) { ratio = g / d; meilleur = j; ajout = d; }
      }
    }
    if (meilleur < 0) break;
    w[meilleur] += ajout; reste -= ajout;
  }
  // ce qui reste va aux colonnes qui passent encore a la ligne
  if (reste > 0) {
    const besoin = naturel.map((x, j) => Math.max(0, x - w[j]));
    const tot = somme(besoin) || n;
    w = w.map((x, j) => x + reste * (somme(besoin) ? besoin[j] : 1) / tot);
  }
  return w.map(Math.round);
}

function tableau(entetes, lignes, largeurs, monoCols, lier) {
  const w = largeurs === "auto" ? largeursAuto(entetes, lignes, W) : (largeurs || [2200, 3400, 3760]);
  const mono = monoCols === undefined ? [0, 1] : monoCols;
  return new Table({
    columnWidths: w, width: { size: W, type: WidthType.DXA },
    rows: [
      new TableRow({
        tableHeader: true,
        // Quand seule la premiere colonne porte un titre, on fusionne la
        // ligne. Sans cela le titre se comprime dans une colonne etroite,
        // souvent sur deux lignes, alors que la place est juste a cote.
        children: entetes.slice(1).every(e => !e || !String(e).trim())
          ? [cell(entetes[0], { bold: true, fill: "DEEAF6",
                                width: w.reduce((a, b) => a + b, 0),
                                span: entetes.length })]
          : entetes.map((e, i) => cell(e, { bold: true, width: w[i], fill: "DEEAF6" }))
      }),
      ...lignes.map(r => new TableRow({
        cantSplit: true,
        children: r.map((val, i) => (i === 0 && lier && CODE_EXERCICE.test(String(val)))
          ? celluleLien(String(val), { width: w[i] })
          : cell(val, { width: w[i], mono: mono.includes(i) }))
      }))
    ]
  });
}

function encadre(lignes, couleur) {
  return new Table({
    columnWidths: [W], width: { size: W, type: WidthType.DXA },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 2, color: "A6A6A6" },
      bottom: { style: BorderStyle.SINGLE, size: 2, color: "A6A6A6" },
      left: { style: BorderStyle.SINGLE, size: 12, color: couleur || ACCENT },
      right: { style: BorderStyle.SINGLE, size: 2, color: "A6A6A6" },
      insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE }
    },
    rows: [new TableRow({
      cantSplit: true,
      children: [new TableCell({
        width: { size: W, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: "F7F9FC" },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: lignes.map((t, i) => estPaire(t)
          ? lignePaire(t, i === lignes.length - 1)
          : new Paragraph({
              spacing: { after: i === lignes.length - 1 ? 0 : 80 },
              children: morceaux(Array.isArray(t) ? t : [t])
            }))
      })]
    })]
  });
}

/**
 * Une ligne de verification « ce qu'on fait / ce qu'on obtient », donnee
 * comme deux chaines : ["deHeures(2).enMinutes()", "120"].
 *
 * Avant le 17/10/2026, les deux moities etaient collees sans separation
 * (« Abonnement(Ada, 125)125.00 ») et build_pkg_tmp.js les perdait tout a
 * fait. Elles sont maintenant separees par une tabulation, en Consolas
 * toutes les deux : c'est ce qu'on lit sur la console (choix de Frederic
 * dans ABS).
 */
const estPaire = (t) => Array.isArray(t) && t.length === 2 && t.every(x => typeof x === "string");
function lignePaire(t, derniere) {
  return new Paragraph({
    spacing: { after: derniere ? 0 : 40 },
    tabStops: [{ type: TabStopType.LEFT, position: 4300 }],
    children: [
      new TextRun({ text: t[0], font: MONO, size: 18 }),
      new TextRun({ children: [new Tab(), t[1]], font: MONO, size: 18 })
    ]
  });
}

const verif = (l) => encadre(l);
const saut = () => new Paragraph({ children: [new PageBreak()] });

/**
 * Les titres de section communs a tous les exercices.
 *
 * Ils sont definis ici pour qu'un changement de libelle se fasse en un
 * seul endroit (renommage du 16/10/2026 : « Specifications » et
 * « Verification » sont devenus plus explicites pour les etudiants).
 */
const TITRES = {
  objectif: "Objectif",
  contexte: "Contexte",
  enonce: "Énoncé",
  specifications: "Spécifications à respecter",
  fourni: "Ce qui vous est fourni",
  exemples: "Exemples attendus",
  verification: "Comment vérifier votre code",
  observer: "Ce que vous devez observer",
  questions: "Questions à se poser"
};

/**
 * Le logo de l'EPHEC, en haut a gauche de chaque page de garde.
 *
 * Repris de la page de garde de l'examen de seconde session, a la meme
 * taille (4,2 x 2 cm). L'image ne fait que 363 x 173 pixels : suffisant a
 * cette taille, a remplacer si une version de meilleure definition existe.
 */
const LOGO = fs.readFileSync(__dirname + "/logo_ephec.png");
function logo() {
  return new Paragraph({
    spacing: { after: 0 },
    children: [new ImageRun({
      type: "png", data: LOGO,
      transformation: { width: 159, height: 76 },
      altText: { name: "logo", title: "EPHEC", description: "Logo de l'EPHEC" }
    })]
  });
}

/**
 * La page de garde commune a tous les documents, sur le modele qu'a fixe
 * Frederic sur ABS le 17/10/2026 :
 *   - en haut, le logo a gauche et « Annee academique 2026-2027 » a droite ;
 *   - au tiers de la page, le bloc de titre centre ;
 *   - en bas, la ligne de l'EPHEC ;
 *   - le tout en Calibri noir, plus grand que le texte courant.
 *
 * Les espaces avant (en vingtiemes de point) remplacent les paragraphes
 * vides du modele, qui en donnent l'equivalent. `entre` recoit ce que
 * certains documents placent sous le titre (le tableau des demos) ;
 * `espaceBas` se reduit d'autant pour que le pied ne change pas de page.
 */
const POLICE_GARDE = "Calibri";
const ANNEE = "2026-2027";
function ligneGarde(texte, taille, o = {}) {
  return new Paragraph({
    alignment: o.align === undefined ? AlignmentType.CENTER : o.align,
    spacing: { before: o.avant || 0, after: o.apres === undefined ? 120 : o.apres },
    children: [new TextRun({
      text: typo(texte), font: POLICE_GARDE, size: taille, bold: o.gras,
      italics: o.italique, color: "000000"
    })]
  });
}

const MENTION_IA = "Ce document a été élaboré avec l'aide de Claude, un assistant d'intelligence artificielle "
  + "développé par Anthropic. L'enseignant en a conçu le contenu et la progression, l'a relu, corrigé "
  + "et validé, et en assume la responsabilité.";

function pageDeGarde(c, { surtitre = "Programmation orientée objet — Java", titre,
                          sousTitre, accroche, entre = [], espaceBas, mentionIA = false }) {
  // Sans sous-titre, le pied descend d'autant pour rester en bas de page.
  if (espaceBas === undefined) espaceBas = sousTitre ? 5450 : 6150;
  const run = (t, gras) => new TextRun({ text: t, font: POLICE_GARDE, size: 36, bold: gras, color: "000000" });
  c.push(new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: 9026 }],
    children: [
      new ImageRun({
        type: "png", data: LOGO, transformation: { width: 159, height: 76 },
        altText: { name: "logo", title: "EPHEC", description: "Logo de l'EPHEC" }
      }),
      new TextRun({ children: [new Tab()], font: POLICE_GARDE, size: 36 }),
      run("Année académique "), run(ANNEE, true)
    ]
  }));
  // le logo est passe dans l'en-tete (garde.py) : le titre descend d'autant
  c.push(ligneGarde(surtitre, 36, { avant: 4400 }));
  c.push(ligneGarde(titre, 72, { gras: true, apres: 100 }));
  if (sousTitre) c.push(ligneGarde(sousTitre, 40, { gras: true, apres: 200 }));
  if (accroche) c.push(ligneGarde(accroche, 36, { apres: 800 }));
  entre.forEach(e => c.push(e));
  // La mention de l'usage de l'IA (22/10/2026), sur les pages de garde du
  // support complet et du recueil : garde.py la place dans le pied de la
  // page de garde, juste au-dessus de la ligne EPHEC.
  if (mentionIA) c.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 },
    children: [new TextRun({ text: MENTION_IA, font: POLICE_GARDE, size: 18, italics: true, color: "595959" })] }));
  c.push(ligneGarde("EPHEC — Bachelier en informatique, niveau 2", 36, { avant: espaceBas }));
  c.push(saut());
}

/**
 * Une capture d'ecran du dossier _captures, centree, a la taille donnee en
 * centimetres (celle que Frederic a choisie dans Word).
 */
const DOSSIER_CAPTURES = __dirname + "/../../_captures/";
const cmEnPixels = (cm) => Math.round(cm * 37.795);
function imageCapture(fichier, largeurCm, hauteurCm) {
  return new ImageRun({
    type: "png", data: fs.readFileSync(DOSSIER_CAPTURES + fichier),
    transformation: { width: cmEnPixels(largeurCm), height: cmEnPixels(hauteurCm) },
    altText: { name: fichier, title: fichier, description: "Capture d'écran" }
  });
}
function capture(fichier, largeurCm, hauteurCm) {
  return new Paragraph({
    alignment: AlignmentType.CENTER, spacing: { after: 120 },
    children: [imageCapture(fichier, largeurCm, hauteurCm)]
  });
}

/**
 * Un bloc de code a gauche et une capture a droite, dans un tableau sans
 * bordure. Dans Word, Frederic avait obtenu la meme chose avec une section a
 * deux colonnes ; le tableau evite des sauts de section que la pagination et
 * le « garder avec le suivant » des titres gerent mal.
 */
function codeEtCapture(lignes, fichier, largeurCm, hauteurCm) {
  const sans = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
  const bords = { top: sans, bottom: sans, left: sans, right: sans };
  const moitie = Math.floor(W / 2);
  return new Table({
    columnWidths: [moitie, W - moitie], width: { size: W, type: WidthType.DXA },
    borders: { ...bords, insideHorizontal: sans, insideVertical: sans },
    rows: [new TableRow({ cantSplit: true, children: [
      new TableCell({ width: { size: moitie, type: WidthType.DXA }, borders: bords,
                      verticalAlign: "center", children: code(lignes) }),
      new TableCell({ width: { size: W - moitie, type: WidthType.DXA }, borders: bords,
                      verticalAlign: "center", children: [capture(fichier, largeurCm, hauteurCm)] })
    ] })]
  });
}

function couverture(c, theme, titre, sous) {
  pageDeGarde(c, { titre: "Module " + theme, sousTitre: titre, accroche: sous });
}

/**
 * Ce que chaque section d'un exercice apporte, dans l'ordre ou elles
 * apparaissent. Le fascicule FX n'a pas de tests automatiques : la ligne
 * de verification y est remplacee par ce qu'il faut observer a l'ecran.
 */
function sectionsExercice(theme) {
  if (theme === null) {
    // Recueil : les deux facons de verifier, FX compris.
    const lignes = sectionsExercice("POO");
    const i = lignes.findIndex(l => l[0] === TITRES.verification);
    lignes.splice(i + 1, 0, [TITRES.observer, "À la place de la précédente, dans les exercices JavaFX : ce que la fenêtre doit montrer. Les interfaces ne sont pas testées automatiquement."]);
    return lignes;
  }
  const verifier = theme === "FX"
    ? [TITRES.observer, "Ce que la fenêtre doit montrer et comment elle doit réagir. Les interfaces JavaFX ne sont pas testées automatiquement : c'est vous qui vérifiez, en manipulant."]
    : [TITRES.verification, "La classe de test à lancer et ce qu'elle contrôle. Tant qu'elle n'est pas entièrement verte, l'exercice n'est pas terminé."];
  return [
    [TITRES.objectif, "Ce que l'exercice vous fait pratiquer, en une ou deux phrases."],
    [TITRES.contexte, "Facultatif. La situation ou le rappel qui éclaire l'énoncé."],
    [TITRES.enonce, "Ce qu'il faut écrire. Un énoncé long est parfois découpé en deux parties."],
    [TITRES.specifications, "Les noms, les signatures et les comportements imposés. Les tests s'appuient dessus : respectez-les à la lettre."],
    [TITRES.fourni, "Les classes déjà écrites que vous trouverez dans le package de l'exercice."],
    [TITRES.exemples, "Des valeurs d'entrée et les résultats qu'elles doivent produire."],
    verifier,
    [TITRES.questions, "Des questions pour prendre du recul une fois l'exercice réussi. Il n'y a rien à rendre : ce sont elles qui fixent ce que vous avez appris."]
  ];
}

/** Le tableau des sections, pose dans l'encadre gris. */
function tableauSections(theme) {
  const w = [2500, 6380];
  const cellule = (contenu, largeur, o = {}) => new TableCell({
    width: { size: largeur, type: WidthType.DXA },
    shading: { type: ShadingType.CLEAR, fill: o.fill || "FFFFFF" },
    margins: { top: 50, bottom: 50, left: 100, right: 100 },
    children: [new Paragraph({
      spacing: { after: 0 },
      children: [new TextRun({ text: typo(contenu), bold: o.bold, size: 20 })]
    })]
  });
  return new Table({
    columnWidths: w, width: { size: w[0] + w[1], type: WidthType.DXA },
    rows: [
      new TableRow({ tableHeader: true, children: [
        cellule("Section", w[0], { bold: true, fill: "D9D9D9" }),
        cellule("Ce qu'elle vous apporte", w[1], { bold: true, fill: "D9D9D9" })
      ] }),
      ...sectionsExercice(theme).map(([titre, sens]) => new TableRow({
        cantSplit: true,
        children: [cellule(titre, w[0], { bold: true }), cellule(sens, w[1])]
      }))
    ]
  });
}

/**
 * L'introduction du fascicule, dans un encadre gris clair.
 *
 * Le gris dit au lecteur que ce bloc n'est pas un exercice mais la facon
 * de lire ceux qui suivent (demande du 16/10/2026). Le tableau des
 * exercices reste en dehors : c'est un sommaire, et il devra pouvoir etre
 * remplace par une table des matieres dans le recueil unique.
 */
function encadreIntroduction(theme) {
  const para = (l, o = {}) => new Paragraph({
    spacing: { before: o.before || 0, after: o.after === undefined ? 100 : o.after },
    keepNext: true, children: morceaux(l)
  });
  return new Table({
    columnWidths: [W], width: { size: W, type: WidthType.DXA },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 2, color: "BFBFBF" },
      bottom: { style: BorderStyle.SINGLE, size: 2, color: "BFBFBF" },
      left: { style: BorderStyle.SINGLE, size: 2, color: "BFBFBF" },
      right: { style: BorderStyle.SINGLE, size: 2, color: "BFBFBF" },
      insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE }
    },
    rows: [new TableRow({
      cantSplit: true,
      children: [new TableCell({
        width: { size: W, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: "F2F2F2" },
        margins: { top: 140, bottom: 140, left: 180, right: 180 },
        children: [
          para([
            ...(theme === null
              ? ["Les exercices de chaque module se trouvent dans ", { t: "be.ephec.java.<module>", code: true },
                 " (par exemple ", { t: "be.ephec.java.poo", code: true }, "), chacun dans un sous-package."]
              : ["Les exercices de ce module se trouvent tous dans ",
                 { t: "be.ephec.java." + theme.toLowerCase(), code: true },
                 ", chacun dans un sous-package."])
          ]),
          para([
            { t: "Chaque exercice est autonome. ", b: true },
            "Son package contient tout ce dont il a besoin et n'importe jamais une classe d'un autre exercice. ",
            "Quand un exercice reprend une classe d'un exercice précédent, vous partez d'une copie : ",
            "vous pouvez donc en rater un sans être bloqué pour la suite."
          ]),
          para([
            { t: "Comment lancer les tests, comment lire un test vert, pourquoi laisser votre code compilable : ", b: true },
            "tout cela est commun à tous les modules et se trouve dans un document à part, ",
            { t: "Memento_Exercices.docx", code: true },
            ". Lisez-le une fois en début d'année."
          ]),
          para([{ t: "Comment se lit un exercice", b: true }], { before: 120, after: 60 }),
          para(["Chaque exercice suit la même structure. Toutes les sections ne figurent pas dans tous les exercices."]),
          tableauSections(theme),
          para([
            "D'autres titres apparaissent ponctuellement : un piège à connaître, une remarque, un rappel. ",
            "Ce sont des encarts propres à l'exercice, à lire avant de commencer."
          ], { before: 120, after: 0 })
        ]
      })]
    })]
  });
}

function modeEmploi(c, theme, lignes) {
  c.push(h1("Comment travailler ces exercices"));
  c.push(encadreIntroduction(theme));
  c.push(new Paragraph({ spacing: { after: 120 }, children: [] }));
  c.push(runs([
    "Les exercices du module. Leurs codes sont ",
    { t: "cliquables", b: true },
    " : ils mènent directement à l'exercice."
  ], { keepNext: true }));
  // Le dernier argument demande des liens vers les exercices.
  c.push(tableau(["Exercice", "Package", "Sujet"], lignes, undefined, [1], true));
}

function doc(children, titre, options = {}) {
  return new Document({
    creator: "Frédéric Ferrant — EPHEC", title: titre,
    // Le recueil demande a Word de mettre a jour sa table des matieres a
    // l'ouverture (options.majChamps).
    features: options.majChamps ? { updateFields: true } : undefined,
    footnotes: options.notes,
    numbering: {
      config: [{
        reference: "puces",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: convertInchesToTwip(0.3), hanging: convertInchesToTwip(0.18) } } }
        }]
      }]
    },
    sections: [{
      properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
      children
    }]
  });
}


module.exports = {
  p, runs, bullet, bulletRuns, code, h1, h2, cell, tableau, typo,
  encadre, verif, saut, couverture, pageDeGarde, ligneGarde, modeEmploi, doc, logo, TITRES,
  capture, codeEtCapture, bt, encadreIntroduction, largeursAuto, morceaux,
  Packer, MONO, ACCENT, GREY, W, AlignmentType, Paragraph, TextRun, PageBreak
};
