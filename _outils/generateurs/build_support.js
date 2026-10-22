// build_support.js — le support de cours d'un module, depuis sa source
// _support/generateurs/Support_XXX.md (demande du 20/10/2026). Le document
// produit va dans _support/, a cote du dossier figures/.
//
//     node build_support.js TMP
//
// La source est du Markdown simple, lisible et modifiable a la main :
//   ---             en-tete : module, titre, accroche
//   ## titre        une section (titre de niveau 1 dans le document)
//   ### titre       une sous-section (niveau 2)
//   texte           un paragraphe ; `code`, **gras**, *italique*
//   - point         une liste
//   ```java         un bloc de code
//   ::: cote-a-cote deux blocs de code cote a cote (fermer par :::), par
//                   exemple le meme programme en C# et en Java
//   | a | b |       un tableau (premiere ligne : en-tete)
//   > **Titre**     un encadre ; le titre choisit la couleur :
//   > texte           À retenir, Attention, Démonstration, Exercices,
//   > - point         À la fin de ce module…
//   texte[^1]       un appel de note de bas de page, et plus loin, sur sa
//   [^1]: texte     propre ligne, le texte de la note
//   ![legende](f)   une figure : ../figures/xxx.png, relatif a la source
//
// Le document passe ensuite par la chaine habituelle (style, pagination,
// typographie) : python3 _outils/construire_support_module.py TMP

const fs = require("fs");
const path = require("path");
const { Paragraph, TextRun, AlignmentType, ImageRun, Table, TableRow, TableCell, WidthType, BorderStyle } = require("docx");
const B = require(__dirname + "/boite.js");
const { h1, h2, code, tableau, encadre, doc, Packer, saut } = B;

const DOSSIER = path.join(__dirname, "..", "..", "_support");

// Le contenu d'un module, sous forme de fonction (22/10/2026) : le support
// d'un module l'appelle seul, le support global l'appelle pour chaque module
// en partageant l'etat des notes de bas de page, numerotees d'un bout a
// l'autre du document. Avec garde: false, pas de page de garde.
function construire(module_, etat = { numeros: {}, notes: {}, compte: 0 }, options = { garde: true }) {
// les sources sont rangees a part, comme les generateurs (20/10/2026)
const source = fs.readFileSync(path.join(DOSSIER, "generateurs", `Support_${module_}.md`), "utf-8");

// ---------- en-tete
const m = source.match(/^---\n([\s\S]*?)\n---\n/);
const meta = {};
m[1].split("\n").forEach(l => { const i = l.indexOf(":"); meta[l.slice(0, i).trim()] = l.slice(i + 1).trim(); });
// Les notes de bas de page : « [^id]: texte » sur sa propre ligne definit la
// note ; « [^id] » dans le texte l'appelle. Les notes sont numerotees dans
// l'ordre de leurs appels (21/10/2026).
const definitions = {};
const lignes = source.slice(m[0].length).split("\n").filter(l => {
  const d = l.match(/^\[\^([\w-]+)\]:\s*(.*)$/);
  if (d) { definitions[d[1]] = d[2]; return false; }
  return true;
});
const numeros = {};
const notes = etat.notes;

// ---------- le texte d'une ligne : `code`, **gras**, *italique*
function fragments(texte) {
  const out = [];
  const re = /(\[\^[\w-]+\]|`[^`]+`|\*\*(?:[^*]|`[^`]*`)+?\*\*|\*[^*]+\*)/g;
  let pos = 0, k;
  while ((k = re.exec(texte))) {
    if (k.index > pos) out.push(texte.slice(pos, k.index));
    const t = k[0];
    if (t.startsWith("[^")) {
      const id = t.slice(2, -1);
      if (!(id in definitions)) throw new Error(`note [^${id}] sans definition`);
      if (!(id in numeros)) {
        numeros[id] = ++etat.compte;
        // le texte d'une note : Cormorant 9, code en Consolas 8 (la partie
        // footnotes.xml n'est pas reprise par l'outil de style)
        notes[numeros[id]] = { children: [new Paragraph({ children: fragments(definitions[id]).map(x =>
          typeof x === "string"
            ? new TextRun({ text: x, size: 18, font: "Cormorant Garamond" })
            : new TextRun({ text: x.t, size: 16, bold: x.b, italics: x.i,
                font: x.code ? "Consolas" : "Cormorant Garamond", color: x.code ? "E97132" : undefined })) })] };
      }
      out.push({ note: numeros[id] });
    }
    else if (t.startsWith("`")) out.push({ t: t.slice(1, -1), code: true });
    else if (t.startsWith("**")) {
      // du gras qui contient du code : **`between` compte des unites entieres.**
      for (const x of fragments(t.slice(2, -2))) out.push(typeof x === "string" ? { t: x, b: true } : { ...x, b: true });
    }
    else out.push({ t: t.slice(1, -1), i: true });
    pos = re.lastIndex;
  }
  if (pos < texte.length) out.push(texte.slice(pos));
  return out;
}

// Les fragments en gras peuvent contenir du code : **`n`** ne sert pas ici.
const COULEURS = {
  "À retenir": "1F4E79", "Attention": "C0392B", "Démonstration": "E8BA36",
  "Exercices": "2E7D32"
};

const c = [];
if (options.garde) B.pageDeGarde(c, {
  surtitre: "Support de cours - Programmation orientée objet - Java",
  titre: `Module ${meta.module}`, sousTitre: meta.titre, accroche: meta.accroche
});

let i = 0, dernierEstCode = false, dejaUneSection = false;
while (i < lignes.length) {
  const l = lignes[i];
  if (!l.trim()) { i++; continue; }
  if (!l.startsWith("```")) dernierEstCode = false;

  // « ## 8. Une date et son texte » devient « TMP §8 — Une date et son
  // texte » : un renvoi « voir TMP §8 » reste clair une fois les modules
  // rassembles dans le support global (20/10/2026).
  if (l.startsWith("## ")) {
    const num = l.slice(3).match(/^(\d+)\.\s+(.*)$/);
    // Dans le support global, la premiere section commence sur une nouvelle
    // page : la premiere page du module ne porte que son titre, son
    // introduction et ses objectifs (22/10/2026).
    const sautAvant = options.sautPremiereSection && !dejaUneSection;
    dejaUneSection = true;
    c.push(h1(num ? `${meta.module} §${num[1]} — ${num[2]}` : l.slice(3), { sautAvant }));
    i++; continue;
  }
  if (l.startsWith("### ")) { c.push(h2(l.slice(4))); i++; continue; }

  if (l.trim() === "::: cote-a-cote") {
    // les blocs de code jusqu'a « ::: », chacun dans sa colonne
    const blocs = [];
    i++;
    while (i < lignes.length && lignes[i].trim() !== ":::") {
      if (lignes[i].startsWith("```")) {
        const b = [];
        i++;
        while (i < lignes.length && !lignes[i].startsWith("```")) b.push(lignes[i++]);
        blocs.push(b);
      }
      i++;
    }
    i++;
    const largeur = Math.floor(9026 / blocs.length);
    const sans = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
    c.push(new Table({
      width: { size: largeur * blocs.length, type: WidthType.DXA },
      columnWidths: blocs.map(() => largeur),
      borders: { top: sans, bottom: sans, left: sans, right: sans, insideHorizontal: sans, insideVertical: sans },
      rows: [new TableRow({ cantSplit: true, children: blocs.map(b => new TableCell({
        width: { size: largeur, type: WidthType.DXA },
        margins: { left: 60, right: 60 },
        children: code(b)
      })) })]
    }));
    c.push(new Paragraph({ spacing: { after: 60 }, children: [] }));
    dernierEstCode = false;
    continue;
  }

  if (l.startsWith("```")) {
    const bloc = [];
    i++;
    while (i < lignes.length && !lignes[i].startsWith("```")) bloc.push(lignes[i++]);
    i++;
    // Deux blocs qui se suivent (une classe, puis le code qui l'utilise)
    // restent separes par une ligne de code vide, sans fond gris : meme
    // police, meme retrait, aucun espace avant ni apres (22/10/2026).
    let k = i;
    while (k < lignes.length && !lignes[k].trim()) k++;
    const suiviDeCode = k < lignes.length && lignes[k].startsWith("```");
    if (dernierEstCode) c.push(new Paragraph({ spacing: { before: 0, after: 0 },
      indent: { left: 220 },
      children: [new TextRun({ text: " ", font: "Consolas", size: 19 })] }));
    c.push(...code(bloc, { avant: dernierEstCode ? 0 : undefined, apres: suiviDeCode ? 0 : undefined }));
    dernierEstCode = true;
    continue;
  }

  if (l.startsWith("|")) {
    const rangs = [];
    while (i < lignes.length && lignes[i].startsWith("|")) {
      const cases = lignes[i].trim().slice(1, -1).split("|").map(x => x.trim());
      if (!cases.every(x => /^:?-+:?$/.test(x))) rangs.push(cases);
      i++;
    }
    const [entetes, ...corps] = rangs;
    // largeurs calculees : le moins de lignes possible (voir boite.js)
    c.push(tableau(entetes.map(x => fragments(x)), corps.map(r => r.map(x => fragments(x))), "auto", []));
    c.push(new Paragraph({ spacing: { after: 60 }, children: [] }));
    continue;
  }

  if (l.startsWith(">")) {
    const bloc = [];
    while (i < lignes.length && lignes[i].startsWith(">")) bloc.push(lignes[i++].replace(/^>\s?/, ""));
    const tete = bloc[0].match(/^\*\*([^*]+)\*\*\s*(?:-\s*(.*))?$/);
    const titre = tete ? tete[1] : null;
    const couleur = Object.entries(COULEURS).find(([k]) => titre && titre.startsWith(k));
    const contenu = [];
    if (titre) contenu.push([{ t: titre, b: true }, ...(tete[2] ? [" - ", ...fragments(tete[2])] : [])]);
    for (const x of (titre ? bloc.slice(1) : bloc)) {
      if (!x.trim()) continue;
      contenu.push(fragments(x.startsWith("- ") ? "•  " + x.slice(2) : x));
    }
    c.push(encadre(contenu, couleur ? couleur[1] : undefined));
    c.push(new Paragraph({ spacing: { after: 60 }, children: [] }));
    continue;
  }

  if (l.startsWith("- ")) {
    while (i < lignes.length && lignes[i].startsWith("- ")) c.push(B.bulletRuns(fragments(lignes[i++].slice(2))));
    continue;
  }

  // une liste numerotee « 1. ... » : un paragraphe par point, numero en
  // retrait (22/10/2026 : les points etaient fondus en un seul paragraphe)
  if (/^\d+\. /.test(l)) {
    while (i < lignes.length && /^\d+\. /.test(lignes[i])) {
      const m = lignes[i++].match(/^(\d+)\. (.*)$/);
      c.push(new Paragraph({
        spacing: { after: 60 }, indent: { left: 567, hanging: 283 },
        children: B.morceaux([m[1] + ".\t"].concat(fragments(m[2]))),
        tabStops: [{ type: "left", position: 567 }]
      }));
    }
    c.push(new Paragraph({ spacing: { after: 60 }, children: [] }));
    continue;
  }

  const fig = l.match(/^!\[(.*?)(?:\|(\d+(?:\.\d+)?))?(\|capture)?\]\((.*)\)$/);
  if (fig) {
    // une figure de _support/figures ; « ![legende|10](...) » fixe sa
    // largeur en centimetres (13 par defaut), la hauteur suit l'image.
    // le chemin est relatif a la source, comme dans un apercu Markdown
    // (IntelliJ affiche alors la figure) : ../figures/poo-xxx.png
    // « ![legende|7|capture](...) » : une capture d'ecran, dont les bords
    // seront adoucis de 4 pt (adoucir_captures.py, 22/10/2026)
    const fichier = path.join(DOSSIER, "generateurs", fig[4]);
    const png = fs.readFileSync(fichier);
    const lp = png.readUInt32BE(16), hp = png.readUInt32BE(20);
    const largeurCm = fig[2] ? parseFloat(fig[2]) : 13;
    const px = Math.round(largeurCm / 2.54 * 96);
    c.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 120, after: 60 }, keepNext: true,
      children: [new ImageRun({ type: "png", data: png, transformation: { width: px, height: Math.round(px * hp / lp) },
        altText: fig[3] ? { title: "capture", description: fig[1], name: "capture" } : undefined })] }));
    c.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 },
      children: [new TextRun({ text: fig[1], italics: true, size: 20, color: "595959" })] }));
    i++;
    continue;
  }

  // un paragraphe : les lignes jusqu'a la prochaine ligne vide
  const para = [];
  while (i < lignes.length && lignes[i].trim() && !/^(#|```|\||>|- |!\[)/.test(lignes[i])) para.push(lignes[i++]);
  c.push(B.runs(fragments(para.join(" "))));
}

return { c, meta };
}

module.exports = { construire };

if (require.main === module) {
  const module_ = process.argv[2];
  const etat = { numeros: {}, notes: {}, compte: 0 };
  const { c } = construire(module_, etat);
  const sortie = path.join(DOSSIER, "supports_par_modules", "Couleur", `Support_${module_}.docx`);
  Packer.toBuffer(doc(c, `Support de cours - module ${module_}`, { notes: etat.notes })).then(b => {
    fs.writeFileSync(sortie, b);
    console.log(`Support_${module_} :`, Math.round(b.length / 1024), "Ko");
  });
}
