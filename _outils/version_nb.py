#!/usr/bin/env python3
"""
version_nb.py — la version noir et blanc d'un document, pour l'impression
(confirmee en N/B le 20/10/2026). La version couleur reste celle qui est
distribuee en PDF ; celle-ci est faite pour le papier.

    python3 _outils/version_nb.py enonces/Recueil_des_exercices.docx
        -> enonces/Recueil_des_exercices_NB.docx
    python3 _outils/version_nb.py --dossier _support/supports_par_modules/NB _support/Support_POO.docx
        -> _support/supports_par_modules/NB/Support_POO_NB.docx

Sans --dossier, la version N/B se range a cote de l'original ; les supports
rangent les leurs dans _support/supports_par_modules/NB (choix de Frederic, 21/10/2026).

Ce qui change :
- le code (Consolas orange) passe en noir : la police suffit a le distinguer ;
- les blocs de code perdent leur fond gris et sont entoures d'un filet fin ;
- les liens bleus et les titres bleus passent en noir ;
- toute autre couleur (bords des encadres, fonds des en-tetes de tableau)
  est convertie en son gris equivalent, de meme luminosite ;
- les couleurs de theme (themeColor) sont retirees, sans quoi Word
  retrouverait l'orange du theme.
Les images ne sont pas touchees : les figures du support sont deja en gris,
et une capture d'ecran en couleur s'imprime correctement en niveaux de gris.
"""
import re
import shutil
import sys
import zipfile
from pathlib import Path

NOIR = {"E97132", "0563C1", "1F4E79"}       # code, liens, titres
FOND_CODE = "F2F2F2"
FILET = ('<w:pBdr><w:top w:val="single" w:sz="4" w:space="4" w:color="808080"/>'
         '<w:left w:val="single" w:sz="4" w:space="4" w:color="808080"/>'
         '<w:bottom w:val="single" w:sz="4" w:space="4" w:color="808080"/>'
         '<w:right w:val="single" w:sz="4" w:space="4" w:color="808080"/></w:pBdr>')


def gris(hexa):
    """Le gris de meme luminosite qu'une couleur (ITU-R BT.601)."""
    r, g, b = int(hexa[0:2], 16), int(hexa[2:4], 16), int(hexa[4:6], 16)
    l = round(0.299 * r + 0.587 * g + 0.114 * b)
    return f"{l:02X}" * 3


def convertir_xml(x):
    x = re.sub(r'\s*w:theme(?:Color|Shade|Tint)="[^"]*"', "", x)
    # 1. les blocs de code : le fond gris d'un paragraphe devient un filet
    def bloc(m):
        ppr = m.group(0)
        if f'w:fill="{FOND_CODE}"' not in ppr or "<w:pBdr" in ppr:
            return ppr
        ppr = re.sub(r'<w:shd [^>]*w:fill="%s"[^>]*/>' % FOND_CODE, "", ppr)
        # pBdr se place apres keepNext/keepLines/pageBreakBefore et avant shd/spacing/ind
        m2 = re.search(r"<w:(?:shd|tabs|spacing|ind|jc|rPr)\b", ppr)
        pos = m2.start() if m2 else ppr.rindex("</w:pPr>")
        return ppr[:pos] + FILET + ppr[pos:]
    x = re.sub(r"<w:pPr>.*?</w:pPr>", bloc, x, flags=re.S)
    # 2. les couleurs : le texte (w:color w:val), les fonds (w:fill) et les
    #    bords (w:color, attribut des bordures)
    def ton(hexa):
        h = hexa.upper()
        if h in ("000000", "FFFFFF"):
            return h
        return "000000" if h in NOIR else gris(h)
    x = re.sub(r'(<w:color w:val=")([0-9A-Fa-f]{6})"', lambda m: m.group(1) + ton(m.group(2)) + '"', x)
    x = re.sub(r'(w:fill=")([0-9A-Fa-f]{6})"', lambda m: m.group(1) + gris(m.group(2)) + '"', x)
    x = re.sub(r'(\sw:color=")([0-9A-Fa-f]{6})"', lambda m: m.group(1) + gris(m.group(2)) + '"', x)
    return x


def version_nb(source, dossier=None):
    source = Path(source)
    cible = (Path(dossier) if dossier else source.parent) / (source.stem + "_NB" + source.suffix)
    cible.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(source) as z:
        parties = {k: z.read(k) for k in z.namelist()}
    for k in parties:
        if re.match(r"word/(document|styles|footer\d*|header\d*|numbering)\.xml$", k):
            parties[k] = convertir_xml(parties[k].decode("utf-8")).encode("utf-8")
    tmp = str(cible) + ".tmp"
    with zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as z:
        for k, v in parties.items():
            z.writestr(k, v)
    shutil.move(tmp, cible)
    return cible


if __name__ == "__main__":
    args = sys.argv[1:]
    dossier = None
    if "--dossier" in args:
        i = args.index("--dossier")
        dossier = args[i + 1]
        del args[i:i + 2]
    for f in args:
        print(version_nb(f, dossier))
