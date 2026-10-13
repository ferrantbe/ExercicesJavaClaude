#!/usr/bin/env python3
"""Organise les slides de renvoi aux exercices d'un deck.

    python3 _outils/organiser_exercices.py deck.pptx [--sortie autre.pptx] [--essai]

La logique (13/10/2026) :
- une slide de renvoi porte deux sortes de cartes : les exercices du module
  (POO.1, TAB.3...) et les etapes du fil rouge (G.1, G.2...) ; chaque sorte
  a son icone, le petit cerveau ou le logo GameHub ;
- slide d'une seule sorte : l'icone seule, en haut a droite, a hauteur du
  titre ;
- slide des deux sortes : chaque icone a droite de la premiere carte de sa
  sorte, centree sur elle, et groupee avec elle ;
- chaque exercice forme un groupe : son fond, son code, son titre et, pour
  le dernier exercice du module, la ligne de renvois au memento (« Nommer :
  CC-MET.4 ») ;
- s'il y a plusieurs exercices, chacun apparait au clic, dans l'ordre de
  la slide, balayage depuis la gauche ; un exercice seul n'est pas anime.

La slide est reconstruite a chaque passage : le resultat ne depend que de
son contenu, et l'outil peut etre relance sans risque.
"""
import argparse
import copy
import re
import sys
from pathlib import Path

from lxml import etree
from pptx import Presentation
from pptx.oxml.ns import qn
from pptx.util import Emu, Inches

ICI = Path(__file__).resolve().parent
LOGO_GAMEHUB = ICI.parent / "_slides" / "icones" / "gamehub.jpg"
CODE = re.compile(r"^(?P<code>G|[A-Z]{2,3}\d?)\.\d+$")
RENVOIS_MEMENTO = re.compile(r"^[A-ZÉa-zéèêàç ]+ ?: ?(CC|TEC|IDE|ERR)-?[A-Z]*\.?\d")
X_ICONE = {"module": Inches(11.3), "gamehub": Inches(11.46)}
Y_HAUT = {"module": Inches(0.52), "gamehub": Inches(0.57)}     # a hauteur du titre
NOM_BLOC = {"module": "Exercices du module", "gamehub": "Exercices GameHub"}


def taille_image(sh):
    try:
        return sh.image.size
    except Exception:
        return None


def sorte_icone(sh):
    if sh.shape_type != 13:
        return None
    t = taille_image(sh)
    if t == (320, 320):
        return "module"
    if t == (512, 512) or "gamehub" in sh.name.lower():
        return "gamehub"
    return None


def codes_dans(sh):
    """Les codes de carte contenus dans une forme (recursif)."""
    if sh.shape_type == 6:
        return [c for s in sh.shapes for c in codes_dans(s)]
    if sh.has_text_frame:
        m = CODE.match(sh.text_frame.text.strip())
        if m and m.group("code") not in ("IDE", "ERR", "TEC", "CC"):    # renvois aux memento, pas des exercices
            return ["gamehub" if m.group("code") == "G" else "module"]
    return []


def icones_dans(sh):
    if sh.shape_type == 6:
        return [i for s in sh.shapes for i in icones_dans(s)]
    s = sorte_icone(sh)
    return [s] if s else []


def degrouper(groupe):
    """Sort les enfants d'un groupe (transformation identite) dans son parent."""
    el = groupe._element
    parent = el.getparent()
    xf = el.find(qn("p:grpSpPr")).find(qn("a:xfrm"))
    off, choff = xf.find(qn("a:off")), xf.find(qn("a:chOff"))
    ext, chext = xf.find(qn("a:ext")), xf.find(qn("a:chExt"))
    sx = int(ext.get("cx")) / max(int(chext.get("cx")), 1)
    sy = int(ext.get("cy")) / max(int(chext.get("cy")), 1)
    pos = parent.index(el)
    for enfant in [c for c in el if c.tag in (qn("p:sp"), qn("p:pic"), qn("p:grpSp"), qn("p:cxnSp"), qn("p:graphicFrame"))]:
        cxf = enfant.find(".//" + qn("a:xfrm"))
        if cxf is not None:
            o, e = cxf.find(qn("a:off")), cxf.find(qn("a:ext"))
            o.set("x", str(int(int(off.get("x")) + (int(o.get("x")) - int(choff.get("x"))) * sx)))
            o.set("y", str(int(int(off.get("y")) + (int(o.get("y")) - int(choff.get("y"))) * sy)))
            e.set("cx", str(int(int(e.get("cx")) * sx)))
            e.set("cy", str(int(int(e.get("cy")) * sy)))
        parent.insert(pos, enfant)
        pos += 1
    parent.remove(el)


TIMING = """<p:timing xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:tnLst><p:par><p:cTn id="1" dur="indefinite" restart="never" nodeType="tmRoot"><p:childTnLst><p:seq concurrent="1" nextAc="seek"><p:cTn id="2" dur="indefinite" nodeType="mainSeq"><p:childTnLst>{clics}</p:childTnLst></p:cTn><p:prevCondLst><p:cond evt="onPrev" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:prevCondLst><p:nextCondLst><p:cond evt="onNext" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:nextCondLst></p:seq></p:childTnLst></p:cTn></p:par></p:tnLst></p:timing>"""
CLIC = """<p:par><p:cTn id="{a}" fill="hold"><p:stCondLst><p:cond delay="indefinite"/></p:stCondLst><p:childTnLst><p:par><p:cTn id="{b}" fill="hold"><p:stCondLst><p:cond delay="0"/></p:stCondLst><p:childTnLst><p:par><p:cTn id="{c}" presetID="22" presetClass="entr" presetSubtype="8" fill="hold" nodeType="clickEffect"><p:stCondLst><p:cond delay="0"/></p:stCondLst><p:childTnLst><p:set><p:cBhvr><p:cTn id="{d}" dur="1" fill="hold"><p:stCondLst><p:cond delay="0"/></p:stCondLst></p:cTn><p:tgtEl><p:spTgt spid="{spid}"/></p:tgtEl><p:attrNameLst><p:attrName>style.visibility</p:attrName></p:attrNameLst></p:cBhvr><p:to><p:strVal val="visible"/></p:to></p:set><p:animEffect transition="in" filter="wipe(left)"><p:cBhvr><p:cTn id="{e}" dur="500"/><p:tgtEl><p:spTgt spid="{spid}"/></p:tgtEl></p:cBhvr></p:animEffect></p:childTnLst></p:cTn></p:par></p:childTnLst></p:cTn></p:par></p:childTnLst></p:cTn></p:par>"""


def poser_animation(slide, ids):
    sld = slide._element
    ancien = sld.find(qn("p:timing"))
    if ancien is not None:
        sld.remove(ancien)
    if len(ids) < 2:
        return
    clics = "".join(CLIC.format(a=3 + 5 * k, b=4 + 5 * k, c=5 + 5 * k, d=6 + 5 * k, e=7 + 5 * k, spid=i)
                    for k, i in enumerate(ids))
    timing = etree.fromstring(TIMING.format(clics=clics))
    ext = sld.find(qn("p:extLst"))
    (ext.addprevious(timing) if ext is not None else sld.append(timing))


def traiter_slide(slide, logo):
    """Reconstruit la slide de renvoi. Rend la liste des changements (vide si rien)."""
    avant = etree.tostring(slide.shapes._spTree) + etree.tostring(slide._element.find(qn("p:timing")) if slide._element.find(qn("p:timing")) is not None else etree.Element("x"))
    if not any(codes_dans(sh) for sh in slide.shapes):
        return []
    # 1. tout a plat : on degroupe ce qui contient une carte ou une icone
    refaire = True
    while refaire:
        refaire = False
        for sh in list(slide.shapes):
            if sh.shape_type == 6 and (codes_dans(sh) or icones_dans(sh)):
                degrouper(sh)
                refaire = True
                break
    # 2. les exercices, dans l'ordre de la slide
    codes = sorted([sh for sh in slide.shapes if codes_dans(sh)], key=lambda c: c.top)
    sortes = [s for s in ("module", "gamehub") if any(codes_dans(c) == [s] for c in codes)]
    exercices = []
    for c in codes:
        membres = [sh for sh in slide.shapes
                   if abs(sh.top - c.top) < Inches(0.05) and sh.left < Inches(11)
                   and (sh.shape_type == 1 or (sh.has_text_frame and not sh.is_placeholder))]
        exercices.append({"sorte": codes_dans(c)[0], "membres": membres, "haut": c.top, "bas": c.top + c.height})
    renvois = [sh for sh in slide.shapes if sh.has_text_frame and not sh.is_placeholder
               and RENVOIS_MEMENTO.match(sh.text_frame.text.strip())]
    derniers_module = [e for e in exercices if e["sorte"] == "module"]
    if renvois and derniers_module:
        derniers_module[-1]["membres"] += renvois
    # 3. les icones
    icones = {}
    for sh in list(slide.shapes):
        k = sorte_icone(sh)
        if k in sortes and k not in icones:
            icones[k] = sh
        elif k is not None:
            sh._element.getparent().remove(sh._element)
    if "gamehub" in sortes and "gamehub" not in icones and logo is not None:
        icones["gamehub"] = slide.shapes.add_picture(str(logo), X_ICONE["gamehub"], Y_HAUT["gamehub"],
                                                    Inches(1.33), Inches(1.33))
        icones["gamehub"].name = "iconGameHub"
    mixte = len(sortes) == 2
    for s, ic in icones.items():
        if mixte:
            premier = next(e for e in exercices if e["sorte"] == s)
            ic.left, ic.top = X_ICONE[s], Emu(int((premier["haut"] + premier["bas"]) / 2 - ic.height / 2))
            premier["membres"].append(ic)
        else:
            ic.left, ic.top = X_ICONE[s], Y_HAUT[s]
    # 4. un groupe par exercice s'il y en a plusieurs, puis l'animation
    ids = []
    arbre = slide.shapes._spTree
    if len(exercices) > 1:
        for k, e in enumerate(exercices, 1):
            uniques = list({id(m._element): m for m in e["membres"]}.values())
            membres = sorted(uniques, key=lambda m: arbre.index(m._element))
            g = slide.shapes.add_group_shape(membres)
            g.name = f"Exercice {k}"
            ids.append(g.shape_id)
    poser_animation(slide, ids)
    apres = etree.tostring(slide.shapes._spTree) + etree.tostring(slide._element.find(qn("p:timing")) if slide._element.find(qn("p:timing")) is not None else etree.Element("x"))
    if _sans_ids(avant) == _sans_ids(apres):
        return []
    n = len(exercices)
    return [f"{n} exercice{'s' if n > 1 else ''}" + (", deux sortes" if mixte else "")
            + (", un groupe et un clic par exercice" if n > 1 else ", sans animation")]


def _sans_ids(xml):
    """Compare deux etats sans tenir compte des identifiants renumerotes."""
    return re.sub(rb'(id|spid)="\d+"', b"", re.sub(rb'name="(Groupe|Group|Exercice) [^"]*"', b"", xml))

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("deck")
    ap.add_argument("--sortie")
    ap.add_argument("--essai", action="store_true")
    a = ap.parse_args()
    prs = Presentation(a.deck)
    logo = LOGO_GAMEHUB if LOGO_GAMEHUB.exists() else None
    for i, slide in enumerate(prs.slides, 1):
        ch = traiter_slide(slide, logo)
        if ch:
            print(f"  slide {i:2} : {', '.join(dict.fromkeys(ch))}")
    if not a.essai:
        prs.save(a.sortie or a.deck)


if __name__ == "__main__":
    main()
