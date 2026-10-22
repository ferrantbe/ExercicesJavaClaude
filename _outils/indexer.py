#!/usr/bin/env python3
"""
indexer.py — les marques d'index du support global, et le champ INDEX
(22/10/2026).

    python3 _outils/indexer.py Support_de_cours.docx

La liste des termes est _support/generateurs/index.txt (voir son mode
d'emploi). Pour chaque terme, une marque d'index (champ XE) est posee :
  - dans chaque titre de section ou il apparait ;
  - a sa premiere apparition dans chaque section (TMP §4, COL §3...) ;
  - jamais dans un bloc de code, ni avant le premier module ;
  - dans les annexes, seulement les titres d'entree : « IDE.19 — Le
    debogueur » donne l'entree « Debogueur (IDE.19) ».
Un terme renvoie ainsi a quelques pages, pas a toutes. Le paragraphe
« INDEX_ICI » de la derniere section devient le champ INDEX, en deux
colonnes, avec une lettre en tete de chaque groupe. Word remplit la table
des matieres et l'index a l'ouverture, quand il propose de mettre a jour
les champs.
"""
import html
import re
import shutil
import sys
import zipfile
from pathlib import Path

RACINE = Path(__file__).resolve().parent.parent
LISTE = RACINE / "_support/generateurs/index.txt"


def lire_liste():
    entrees = []
    for ligne in LISTE.read_text(encoding="utf-8").splitlines():
        if not ligne.strip() or ligne.lstrip().startswith("#"):
            continue
        nom, _, formes = ligne.partition("|")
        nom = nom.strip()
        if not formes.strip():
            formes = nom.split(">")[-1].strip()
        liste = []
        for f in formes.split(";"):
            f = f.strip()
            if not f:
                continue
            code = f.startswith("`") and f.endswith("`")
            f = f.strip("`")
            motif = re.compile(r"(?<![\w.])" + re.escape(f) + r"(?!\w)" if code else
                               r"(?<!\w)" + re.escape(f) + r"(?!\w)", 0 if code else re.IGNORECASE)
            liste.append((code, motif))
        xe = ":".join(p.strip() for p in nom.split(">"))
        entrees.append((xe, liste))
    return entrees


def texte_runs(p):
    """Le texte ordinaire et le texte en Consolas d'un paragraphe."""
    ordinaire, code = [], []
    for r in re.findall(r"<w:r\b.*?</w:r>", p, re.S):
        t = html.unescape("".join(re.findall(r"<w:t[^>]*>([^<]*)</w:t>", r)))
        (code if "Consolas" in r else ordinaire).append(t)
    # les runs se suivent sans espace ; l'apostrophe typographique est
    # ramenee a l'apostrophe droite de la liste
    net = lambda l: "".join(l).replace("\u2019", "'").replace("\u00a0", " ").replace("\u202f", " ")
    return net(ordinaire), " ".join(code)


def champ_xe(texte):
    t = texte.replace('"', "'")
    return ('<w:r><w:fldChar w:fldCharType="begin"/></w:r>'
            f'<w:r><w:instrText xml:space="preserve"> XE "{t}" </w:instrText></w:r>'
            '<w:r><w:fldChar w:fldCharType="end"/></w:r>')


CHAMP_INDEX = ('<w:p><w:r><w:fldChar w:fldCharType="begin" w:dirty="true"/></w:r>'
               '<w:r><w:instrText xml:space="preserve"> INDEX \\e "\t" \\c "2" \\z "1036" \\h "A" </w:instrText></w:r>'
               '<w:r><w:fldChar w:fldCharType="separate"/></w:r>'
               '<w:r><w:t>Mettez les champs à jour pour afficher l\'index (dans Word : clic droit, Mettre à jour le champ).</w:t></w:r>'
               '<w:r><w:fldChar w:fldCharType="end"/></w:r></w:p>')


ENTREE_ANNEXE = re.compile(r"^((?:IDE|ERR|TEC-[A-Z]{3}|CC-[A-Z]{3})\.\d+)\s+[\u2014\u2013-]\s+(.+)$")
ARTICLE = re.compile(r"^(?:Le |La |Les |L'|L\u2019|Un |Une |Des |Du )")


def entree_d_annexe(titre):
    """« IDE.19 — Le débogueur » devient « Débogueur (IDE.19) » : le sujet,
    sans article, puis le code entre parentheses."""
    m = ENTREE_ANNEXE.match(titre.strip())
    if not m:
        return None
    sujet = ARTICLE.sub("", m.group(2).strip())
    return f"{sujet[:1].upper()}{sujet[1:]} ({m.group(1)})"


def indexer(xml, entrees):
    # le premier module : son titre est le premier paragraphe en Titre 1
    debut = xml.find('w:val="Heading1"')
    debut = max(xml.rfind("<w:p ", 0, debut), xml.rfind("<w:p>", 0, debut))
    tete, corps = xml[:debut], xml[debut:]
    paras = list(re.finditer(r"<w:p\b[^>]*>.*?</w:p>", corps, re.S))
    section, annexes = "", False
    vus, compte = set(), {}
    morceaux, pos = [], 0
    for m in paras:
        p = m.group(0)
        if "INDEX_ICI" in p:
            break
        titre = 'w:val="Heading1"' in p or 'w:val="Heading2"' in p
        if titre:
            section = html.unescape("".join(re.findall(r"<w:t[^>]*>([^<]*)</w:t>", p)))
            if section.startswith("Annexe "):
                annexes = True
        ajouts = []
        if annexes:
            # Dans les annexes, seuls les titres d'entree vont a l'index
            # (22/10/2026) : le texte a son sommaire et ses codes.
            if 'w:val="Heading3"' in p:
                xe = entree_d_annexe(html.unescape("".join(re.findall(r"<w:t[^>]*>([^<]*)</w:t>", p))))
                if xe:
                    ajouts.append(xe)
                    compte[xe] = 1
        elif "F2F2F2" not in p:                           # pas dans un bloc de code
            ordinaire, code = texte_runs(p)
            for xe, formes in entrees:
                if not titre and (xe, section) in vus:
                    continue
                for est_code, motif in formes:
                    if motif.search(code if est_code else ordinaire):
                        ajouts.append(xe)
                        vus.add((xe, section))
                        compte[xe] = compte.get(xe, 0) + 1
                        break
        if ajouts:
            morceaux.append(corps[pos:m.start()])
            morceaux.append(p[:-len("</w:p>")] + "".join(champ_xe(x) for x in ajouts) + "</w:p>")
            pos = m.end()
    morceaux.append(corps[pos:])
    corps = "".join(morceaux)
    corps = re.sub(r"<w:p\b[^>]*>(?:(?!</w:p>).)*INDEX_ICI.*?</w:p>", lambda _: CHAMP_INDEX, corps, count=1, flags=re.S)
    return tete + corps, compte


def main(chemin):
    chemin = Path(chemin)
    with zipfile.ZipFile(chemin) as z:
        ordre = z.namelist()
        parties = {k: z.read(k) for k in ordre}
    entrees = lire_liste()
    xml, compte = indexer(parties["word/document.xml"].decode("utf-8"), entrees)
    parties["word/document.xml"] = xml.encode("utf-8")
    tmp = chemin.with_suffix(".tmp.docx")
    with zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as z:
        for k in ordre:
            z.writestr(k, parties[k])
    shutil.move(str(tmp), str(chemin))
    absents = [xe for xe, _ in entrees if xe not in compte]
    annexes = sum(1 for k in compte if k.endswith(")") and "(" in k and k not in dict(entrees))
    print(f"index : {len(entrees)} entrees, {sum(compte.values())} marques, dont {annexes} titres d'annexes"
          + (f" ; jamais trouvees : {', '.join(absents)}" if absents else ""))
    return compte


if __name__ == "__main__":
    main(sys.argv[1])
