#!/usr/bin/env python3
"""
lier_renvois.py — les renvois du texte deviennent des liens cliquables
(23/10/2026).

    python3 _outils/lier_renvois.py fichier.docx

Un renvoi ecrit en Consolas (une cellule de code isolee dans le texte) devient
un lien interne vers son signet, s'il existe dans le document :

    IDE.14, ERR.7         -> IDE_14, ERR_7        (le guide, en annexe)
    CC-MET.9, TEC-MVN.2   -> CC_MET_9, TEC_MVN_2  (les mementos, en annexe)
    COL §6                -> sec-COL-6            (une section d'un module)
    COL.8                 -> ex-COL-8             (un exercice, dans le recueil)

Les signets des sections (« COL §6 — ... ») sont poses par l'outil sur les
titres qui les portent ; les autres existent deja (sommaires des annexes,
table du recueil). Un renvoi sans cible reste du texte : rien ne casse.
L'apparence ne change pas, ni soulignement ni couleur : sur papier, un lien
ne se distingue pas du texte. Dans Word, Ctrl+clic (Cmd+clic sur Mac) suit
le lien ; dans le PDF exporte par Word, un clic suffit.

Ne touche ni aux blocs de code, ni aux liens existants, ni a la table des
matieres. Relance sans effet sur un document deja traite.
"""
import re
import shutil
import sys
import zipfile
from pathlib import Path

from lxml import etree

W = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
Q = lambda nom: f"{{{W}}}{nom}"

MOTIFS = [
    (re.compile(r"(IDE|ERR)\.(\d+)"), lambda m: f"{m[1]}_{m[2]}"),
    (re.compile(r"(CC|TEC)-([A-Z]{3})\.(\d+)"), lambda m: f"{m[1]}_{m[2]}_{m[3]}"),
    (re.compile(r"([A-Z]{2,3}) §(\d+)"), lambda m: f"sec-{m[1]}-{m[2]}"),
    (re.compile(r"([A-Z]{2,3})\.(\d+)"), lambda m: f"ex-{m[1]}-{m[2]}"),
]
TITRE_SECTION = re.compile(r"^([A-Z]{2,3}) §(\d+)\b")


def texte(element):
    t = "".join(x.text or "" for x in element.iter(Q("t")))
    return t.replace("\u00a0", " ").replace("\u202f", " ")


def en_consolas(run):
    polices = run.find(Q("rPr") + "/" + Q("rFonts"))
    return polices is not None and "Consolas" in (polices.get(Q("ascii")) or "")


def lier(xml):
    racine = etree.fromstring(xml)
    corps = racine.find(Q("body"))
    signets = {b.get(Q("name")) for b in racine.iter(Q("bookmarkStart"))}
    ident = max([int(b.get(Q("id"))) for b in racine.iter(Q("bookmarkStart"))] or [0]) + 1

    # 1. un signet sur chaque titre de section « XXX §n — ... »
    poses = 0
    for p in corps.iter(Q("p")):
        style = p.find(Q("pPr") + "/" + Q("pStyle"))
        if style is None or not style.get(Q("val"), "").startswith("Heading"):
            continue
        m = TITRE_SECTION.match(texte(p).strip())
        if not m:
            continue
        nom = f"sec-{m[1]}-{m[2]}"
        if nom in signets:
            continue
        debut = etree.Element(Q("bookmarkStart")); debut.set(Q("id"), str(ident)); debut.set(Q("name"), nom)
        fin = etree.Element(Q("bookmarkEnd")); fin.set(Q("id"), str(ident))
        ppr = p.find(Q("pPr"))
        position = list(p).index(ppr) + 1 if ppr is not None else 0
        p.insert(position, debut)
        p.append(fin)
        signets.add(nom)
        ident += 1
        poses += 1

    # 2. les renvois en Consolas deviennent des liens
    liens, sans_cible = 0, set()
    for run in list(corps.iter(Q("r"))):
        parent = run.getparent()
        if parent.tag != Q("p") or not en_consolas(run):
            continue
        ppr = parent.find(Q("pPr"))
        if ppr is not None and ppr.find(Q("shd")) is not None:
            continue                                       # un bloc de code
        t = texte(run).strip()
        for motif, cible in MOTIFS:
            m = motif.fullmatch(t)
            if not m:
                continue
            nom = cible(m)
            if nom in signets:
                lien = etree.Element(Q("hyperlink"))
                lien.set(Q("anchor"), nom)
                lien.set(Q("history"), "1")
                parent.replace(run, lien)
                lien.append(run)
                liens += 1
            else:
                sans_cible.add(t)
            break
    return etree.tostring(racine, xml_declaration=True, encoding="UTF-8", standalone=True), poses, liens, sans_cible


def main(chemin):
    chemin = Path(chemin)
    with zipfile.ZipFile(chemin) as z:
        ordre = z.namelist()
        parties = {k: z.read(k) for k in ordre}
    xml, poses, liens, sans_cible = lier(parties["word/document.xml"])
    parties["word/document.xml"] = xml
    tmp = chemin.with_suffix(".tmp.docx")
    with zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as z:
        for k in ordre:
            z.writestr(k, parties[k])
    shutil.move(str(tmp), str(chemin))
    print(f"{chemin.name} : {liens} liens, {poses} signets de section"
          + (f" ; sans cible : {', '.join(sorted(sans_cible))}" if sans_cible else ""))


if __name__ == "__main__":
    for f in sys.argv[1:]:
        main(f)
