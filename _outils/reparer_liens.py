#!/usr/bin/env python3
"""
reparer_liens.py — reinstalle les liens internes d'un memento.

    python3 _outils/reparer_liens.py Memento_Clean_Code.docx

Le probleme qu'il repare
------------------------
Les trois documents de reference — memento Clean Code, memento technique,
guide IntelliJ — sont truffes de renvois internes : le sommaire pointe vers
chaque regle, et les regles se citent entre elles.

Ces renvois reposent sur des signets Word. Or Word en perd a l'enregistrement :
sur le memento Clean Code, 16 des 33 signets avaient disparu apres une passe
d'edition, et tous les liens correspondants retombaient en tete du document.

Ce que fait le script
---------------------
Il retire les anciens signets de sections, puis en repose un sur chaque titre
dont le texte commence par un code de section, avec des identifiants uniques.
Les renvois retrouvent leur cible.

Codes reconnus : CC-NOM.1, TEC-FX.2, IDE.28, ERR.8 — soit les nomenclatures
des trois documents.

A lancer apres chaque edition manuelle d'un memento, puis verifier un lien
situe en fin de document : c'est la que les pertes commencent.
"""

import re
import shutil
import sys
import zipfile
from pathlib import Path

# CC-NOM.1 / TEC-ZIP.2 / IDE.29 / ERR.8
CODE = re.compile(r"^\s*((?:CC|TEC)-[A-Z]{2,3}\.\d+|IDE\.\d+|ERR\.\d+)")

# Word francais nomme le style "Titre2", l'anglais "Heading2".
TITRE = re.compile(r"(Heading|Titre)\d")

PREMIER_ID = 1000


def texte_de(paragraphe):
    brut = "".join(re.findall(r"<w:t[^>]*>(.*?)</w:t>", paragraphe, re.S))
    return (brut.replace("&lt;", "<").replace("&gt;", ">").replace("&amp;", "&"))


def ancre(code):
    return code.replace(".", "_").replace("-", "_")


def poser_signet(paragraphe, nom, identifiant):
    debut = f'<w:bookmarkStart w:id="{identifiant}" w:name="{nom}"/>'
    fin = f'<w:bookmarkEnd w:id="{identifiant}"/>'
    ppr = re.search(r"<w:pPr>.*?</w:pPr>", paragraphe, re.S)
    if ppr:
        paragraphe = paragraphe[:ppr.end()] + debut + paragraphe[ppr.end():]
    else:
        ouverture = re.match(r"<w:p\b[^>]*>", paragraphe).group(0)
        paragraphe = ouverture + debut + paragraphe[len(ouverture):]
    return paragraphe[:-len("</w:p>")] + fin + "</w:p>"


def main(chemin):
    chemin = Path(chemin)
    with zipfile.ZipFile(chemin) as archive:
        entrees = {n: archive.read(n) for n in archive.namelist()}
        ordre = list(archive.namelist())

    xml = entrees["word/document.xml"].decode("utf-8")

    # --- 1. purge des anciens signets de sections ------------------------
    anciens = set(re.findall(r'<w:bookmarkStart[^>]*w:name="((?:CC|TEC|IDE|ERR)_[^"]+)"', xml))
    ids = set(re.findall(r'<w:bookmarkStart[^>]*w:id="(\d+)"[^>]*w:name="(?:CC|TEC|IDE|ERR)_', xml))
    ids |= set(re.findall(r'<w:bookmarkStart[^>]*w:name="(?:CC|TEC|IDE|ERR)_[^"]*"[^>]*w:id="(\d+)"', xml))
    xml = re.sub(r'<w:bookmarkStart[^>]*w:name="(?:CC|TEC|IDE|ERR)_[^"]*"[^>]*/>', "", xml)
    for i in ids:
        xml = xml.replace(f'<w:bookmarkEnd w:id="{i}"/>', "")

    # --- 2. un signet par titre de section -------------------------------
    paragraphes = re.findall(r"<w:p\b.*?</w:p>|<w:p\b[^>]*/>", xml, re.S)
    morceaux = re.split(r"<w:p\b.*?</w:p>|<w:p\b[^>]*/>", xml, flags=re.S)

    identifiant = PREMIER_ID
    poses = []
    refaits = []
    for paragraphe in paragraphes:
        style = re.search(r'<w:pStyle w:val="([^"]+)"', paragraphe)
        code = CODE.match(texte_de(paragraphe))
        if code and style and TITRE.match(style.group(1)):
            paragraphe = poser_signet(paragraphe, ancre(code.group(1)), identifiant)
            identifiant += 1
            poses.append(code.group(1))
        refaits.append(paragraphe)

    xml = morceaux[0]
    for paragraphe, suite in zip(refaits, morceaux[1:]):
        xml += paragraphe + suite

    # --- 3. controle : chaque renvoi trouve-t-il sa cible ? --------------
    noms = {ancre(c) for c in poses}
    cibles = set(re.findall(r'w:anchor="([^"]+)"', xml))
    orphelines = sorted(cibles - noms)
    inutilises = sorted(noms - cibles)

    entrees["word/document.xml"] = xml.encode("utf-8")
    temporaire = chemin.with_suffix(".tmp.docx")
    with zipfile.ZipFile(temporaire, "w", zipfile.ZIP_DEFLATED) as sortie:
        for nom in ordre:
            sortie.writestr(nom, entrees[nom])
    shutil.move(str(temporaire), str(chemin))

    print(f"{chemin.name} : {len(anciens)} anciens signets retires, "
          f"{len(poses)} reposes")
    if orphelines:
        print("  renvois sans cible :", ", ".join(orphelines))
    if inutilises:
        print("  sections jamais citees :", ", ".join(inutilises))
    if not orphelines and not inutilises:
        print("  tous les renvois pointent vers une section existante")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    for fichier in sys.argv[1:]:
        main(fichier)
