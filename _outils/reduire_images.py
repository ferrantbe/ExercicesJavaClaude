#!/usr/bin/env python3
"""
reduire_images.py — des captures a la bonne taille, et des images pas plus
lourdes que l'impression ne le demande (23/10/2026).

    python3 _outils/reduire_images.py fichier.docx
    python3 _outils/reduire_images.py fichier.docx --toutes-captures

Deux traitements, dans le document seulement : les fichiers de _captures et
de _support/figures ne sont jamais touches.

1. Une capture d'ecran affichee trop grand est retrecie. Les captures
   viennent d'un ecran Retina : deux pixels de l'image pour un pixel de
   l'ecran. Une capture affichee a l'echelle 1 reproduit le texte d'IntelliJ
   a sa taille d'ecran, environ 10 pt : c'est trop gros sur papier. La
   limite est fixee a 0,75, soit un texte d'environ 7 pt, lisible et
   compact. Sont des captures : les images marquees « capture » par le
   generateur du support, ou toutes les images avec --toutes-captures (le
   guide IntelliJ n'en contient pas d'autres).

2. Toute image plus fine que 220 points par pouce, a sa taille d'affichage,
   est reechantillonnee a 220 ppp, en gardant son format (le PNG garde le
   texte des captures net). C'est le reglage « Impression » de la fonction
   Compresser les images de Word, mais applique a chaque generation.
"""
import io
import re
import shutil
import sys
import zipfile
from pathlib import Path

from PIL import Image

EMU_PAR_POUCE = 914400
ECHELLE_MAX = 0.75        # taille du texte des captures, par rapport a l'ecran
PPP = 220                 # resolution d'impression visee
RETINA = 2                # pixels d'image par pixel d'ecran


def traiter(chemin, toutes_captures=False):
    chemin = Path(chemin)
    with zipfile.ZipFile(chemin) as z:
        ordre = z.namelist()
        parties = {k: z.read(k) for k in ordre}
    xml = parties["word/document.xml"].decode("utf-8")
    rels = dict(re.findall(r'Id="([^"]+)"[^>]*?Target="([^"]+)"',
                           parties["word/_rels/document.xml.rels"].decode("utf-8")))
    largeur_px = {}

    def taille(cible):
        if cible not in largeur_px:
            largeur_px[cible] = Image.open(io.BytesIO(parties["word/" + cible])).size[0]
        return largeur_px[cible]

    retrecies = 0
    besoin = {}                                        # media -> plus grande largeur affichee (pouces)

    def dessin(m):
        nonlocal retrecies
        d = m.group(0)
        rid = re.search(r'r:embed="([^"]+)"', d)
        ext = re.search(r'<wp:extent cx="(\d+)" cy="(\d+)"', d)
        if not rid or not ext or rels.get(rid.group(1), "").startswith("http"):
            return d
        cible = rels[rid.group(1)]
        if "word/" + cible not in parties:
            return d
        cx, cy = int(ext.group(1)), int(ext.group(2))
        capture = toutes_captures or 'name="capture"' in d or 'title="capture"' in d
        if capture:
            maxi = taille(cible) / RETINA / 96 * ECHELLE_MAX * EMU_PAR_POUCE
            if cx > maxi * 1.02:
                ratio = maxi / cx
                ncx, ncy = int(cx * ratio), int(cy * ratio)
                d = d.replace(f'cx="{cx}" cy="{cy}"', f'cx="{ncx}" cy="{ncy}"')
                cx = ncx
                retrecies += 1
        besoin[cible] = max(besoin.get(cible, 0), cx / EMU_PAR_POUCE)
        return d

    xml = re.sub(r"<w:drawing>.*?</w:drawing>", dessin, xml, flags=re.S)
    parties["word/document.xml"] = xml.encode("utf-8")

    avant = sum(len(parties["word/" + c]) for c in besoin)
    reduites = 0
    for cible, pouces in besoin.items():
        image = Image.open(io.BytesIO(parties["word/" + cible]))
        cible_px = int(pouces * PPP)
        if image.size[0] <= cible_px * 1.1:
            continue
        hauteur = round(image.size[1] * cible_px / image.size[0])
        petite = image.resize((cible_px, hauteur), Image.LANCZOS)
        sortie = io.BytesIO()
        format_ = image.format or ("PNG" if cible.lower().endswith(".png") else "JPEG")
        if format_ == "JPEG":
            petite.convert("RGB").save(sortie, "JPEG", quality=90, optimize=True)
        else:
            petite.save(sortie, format_, optimize=True)
        if len(sortie.getvalue()) < len(parties["word/" + cible]):
            parties["word/" + cible] = sortie.getvalue()
            reduites += 1
    apres = sum(len(parties["word/" + c]) for c in besoin)

    tmp = chemin.with_suffix(".tmp.docx")
    with zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as z:
        for k in ordre:
            z.writestr(k, parties[k])
    shutil.move(str(tmp), str(chemin))
    print(f"{chemin.name} : {retrecies} capture(s) retrecie(s), {reduites} image(s) "
          f"reechantillonnee(s), images {avant / 1048576:.1f} -> {apres / 1048576:.1f} Mo")


if __name__ == "__main__":
    arguments = [a for a in sys.argv[1:] if not a.startswith("--")]
    for f in arguments:
        traiter(f, "--toutes-captures" in sys.argv)
