#!/usr/bin/env python3
"""
style_decks.py — le code et les references dans le texte des slides,
comme Frederic les met en forme a la main (relu sur le deck TAB, 21/10/2026) :
police Consolas, couleur de theme Accent 4, taille et gras inchanges.

    python3 _outils/style_decks.py --verifier [deck.pptx ...]   liste, ne change rien
    python3 _outils/style_decks.py [deck.pptx ...]               applique

Sans fichier, tous les decks de _slides/slides_de_cours.

Ce qui est repere est exactement ce que style_documents.py repere dans les
documents Word : mots et expressions Java (if, return, String.format,
a > b...), renvois (POO.3, CC-MET.9, TEC-EXE.2, IDE.14, TAB §4), et nom de
module apres « module » (« au module COL »).

Ce qui n'est pas touche :
- les zones de code (nommees « Code », ou entierement en Consolas) ;
- le repere de section en bas de slide, les numeros de slide ;
- les notes du presentateur, qui ne s'affichent pas en seance ;
- la slide de titre de chaque deck ;
- un texte deja en Consolas.
"""
import copy
import glob
import re
import sys
from pathlib import Path

from lxml import etree
from pptx import Presentation
from pptx.enum.shapes import MSO_SHAPE_TYPE

RACINE = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(RACINE / "_outils"))
from style_documents import mots_java  # noqa: E402

A = "{http://schemas.openxmlformats.org/drawingml/2006/main}"
IGNORES = ("Repere de section",)


def est_code(r):
    lat = r.find(f"{A}rPr/{A}latin")
    return lat is not None and lat.get("typeface") == "Consolas"


def rpr_code(rpr):
    """Consolas et Accent 4, en gardant taille, gras et le reste."""
    rpr = copy.deepcopy(rpr) if rpr is not None else etree.Element(f"{A}rPr")
    for nom in ("solidFill", "gradFill", "noFill"):
        for e in rpr.findall(A + nom):
            rpr.remove(e)
    for e in rpr.findall(A + "latin"):
        rpr.remove(e)
    remplissage = etree.Element(f"{A}solidFill")
    etree.SubElement(remplissage, f"{A}schemeClr").set("val", "accent4")
    latin = etree.Element(f"{A}latin")
    latin.set("typeface", "Consolas")
    # ordre du schema : ln, remplissage, effets, highlight, uLn..., latin, ea, cs
    apres = [e for e in rpr if etree.QName(e).localname in ("ln",)]
    (apres[-1].addnext(remplissage) if apres else rpr.insert(0, remplissage))
    avant = [e for e in rpr if etree.QName(e).localname in ("ea", "cs", "sym", "hlinkClick", "hlinkMouseOver", "rtl", "extLst")]
    (avant[0].addprevious(latin) if avant else rpr.append(latin))
    return rpr


# Des mots Java qui sont aussi des mots francais : sur une slide, « la case
# d'un tableau » n'est pas le case d'un switch. Ils ne passent en code que
# suivis de ce qui les rend Java (« case VERT -> », « default -> »).
FAUX_AMIS = {"case", "default", "final", "new", "this", "int", "long", "short",
             "double", "float", "char", "byte"}


def faux_ami(texte, a, b):
    mot = texte[a:b]
    if mot not in FAUX_AMIS:
        return False
    suite = texte[b:b + 30]
    return not re.match(r"\s*(?:\w+\s*)?(?:->|:|;|\(|\[|\w+\s*=)", suite) and mot in ("case", "default")


MOTS_JAVA = {"if", "else", "for", "while", "return", "new", "null", "true", "false", "int",
             "this", "static", "final", "public", "private", "class", "void", "switch", "case"}


def faux_code(fragment):
    """Une adresse web, ou une « expression » faite de mots francais :
    « module = un sujet », « l'operateur == suffit », « la fleche -> est »."""
    if re.search(r"(?:https?:|www\.|\.(?:fr|com|be|org|net|php)\b|/\w+/|curid)", fragment):
        return True
    mots = re.findall(r"[^\W\d_][\w]*", fragment)
    if any(re.search(r"[À-ÿ]", m) for m in mots):
        return True
    # une expression n'est du code que si quelque chose y est Java :
    # parenthese, crochet, chiffre, guillemet, point, souligne, mot-cle,
    # ou un nom en camelCase (« Le && s'arrete » n'en a rien)
    if re.search(r"[=&|<>!+\-*/%]", fragment) and not (
            re.search(r"[()\[\]\d\"._]", fragment)
            or any(m in MOTS_JAVA for m in mots)
            or any(re.search(r"[a-z][A-Z]", m) for m in mots)):
        return True
    if mots and all(m.islower() and m not in MOTS_JAVA for m in mots) \
            and not re.search(r"[()\[\]\d\"._]", fragment):
        return True
    return False


def traiter_paragraphe(p, appliquer):
    runs = p.findall(A + "r")
    if not runs:
        return []
    texte = "".join(r.findtext(A + "t") or "" for r in runs)
    # comme dans les documents Word : seul ce qui est surement du code
    # (categorie « auto ») ; un mot ambigu (interface, package, record...)
    # reste en texte
    zones = [(a, b) for a, b, _, cat in mots_java(texte)
             if cat == "auto" and not faux_ami(texte, a, b) and not faux_code(texte[a:b])]
    if not zones:
        return []
    # chaque caractere : (indice du run d'origine, est-ce du code a poser ?)
    marque = []
    for k, r in enumerate(runs):
        deja = est_code(r)
        for _ in r.findtext(A + "t") or "":
            marque.append([k, False, deja])
    trouves = []
    for a, b in zones:
        if all(marque[i][2] for i in range(a, b)):
            continue                      # deja en Consolas
        trouves.append(texte[a:b])
        for i in range(a, b):
            marque[i][1] = True
    if not trouves or not appliquer:
        return trouves
    # recomposer les runs : un run par suite de caracteres de meme origine
    # et de meme statut
    nouveaux, i = [], 0
    while i < len(texte):
        k, code, deja = marque[i]
        j = i
        while j < len(texte) and marque[j][0] == k and marque[j][1] == code:
            j += 1
        r = copy.deepcopy(runs[k])
        r.find(A + "t").text = texte[i:j]
        if code and not deja:
            ancien = r.find(A + "rPr")
            neuf = rpr_code(ancien)
            if ancien is not None:
                r.replace(ancien, neuf)
            else:
                r.insert(0, neuf)
        nouveaux.append(r)
        i = j
    for r in runs:
        r.getparent().remove(r)
    fin = p.find(A + "endParaRPr")
    for r in nouveaux:
        (fin.addprevious(r) if fin is not None else p.append(r))
    return trouves


def cadres(formes):
    for sh in formes:
        if sh.shape_type == MSO_SHAPE_TYPE.GROUP:
            yield from cadres(sh.shapes)
            continue
        if sh.name in IGNORES or sh.name.split(" ")[0] == "Code":
            continue
        if sh.is_placeholder and "num" in sh.name.lower():
            continue
        if getattr(sh, "has_table", False) and sh.has_table:
            for ligne in sh.table.rows:
                for case in ligne.cells:
                    yield case.text_frame
        elif sh.has_text_frame:
            runs = [r for p in sh.text_frame.paragraphs for r in p.runs if r.text.strip()]
            if runs and all((r.font.name or "") == "Consolas" for r in runs):
                continue                  # une zone de code sans le nom « Code »
            yield sh.text_frame


def traiter_deck(chemin, appliquer):
    prs = Presentation(str(chemin))
    rapport = []
    for n, s in enumerate(prs.slides, 1):
        if n == 1:
            continue                      # la slide de titre du deck garde sa mise en page
        for tf in cadres(s.shapes):
            for p in tf.paragraphs:
                t = traiter_paragraphe(p._p, appliquer)
                if t:
                    rapport.append((n, t))
    if appliquer and rapport:
        prs.save(str(chemin))
    return rapport


if __name__ == "__main__":
    verifier = "--verifier" in sys.argv
    fichiers = [a for a in sys.argv[1:] if not a.startswith("--")] or sorted(glob.glob(str(RACINE / "_slides/slides_de_cours/*.pptx")))
    total = 0
    for f in fichiers:
        r = traiter_deck(f, not verifier)
        total += sum(len(t) for _, t in r)
        print(f"== {Path(f).name} : {sum(len(t) for _, t in r)}")
        for n, t in r:
            print(f"   slide {n} : " + ", ".join(t))
    print(("a formater : " if verifier else "formates : ") + str(total))
