#!/usr/bin/env python3
"""
adoucir_captures.py — bordure adoucie de 4 pt sur les captures d'ecran.

    python3 _outils/adoucir_captures.py fichier.docx [...]

Une capture d'ecran garde, autour de la fenetre, un reste d'ombre ou de
fond qui fait un halo sur la page. Frederic leur applique a la main, dans
Word, Format de l'image > Effets > Bordure adoucie, 4 pt (22/10/2026). Cet
outil fait la meme chose sur les images marquees « capture » par le
generateur du support (« ![legende|7|capture](...) » dans la source).
Relance sans effet sur une image deja adoucie.
"""
import re
import shutil
import sys
import zipfile
from pathlib import Path

RAYON = 50800          # 4 pt, en EMU (12 700 EMU par point)


def adoucir(xml):
    n = 0

    def traiter(m):
        nonlocal n
        dessin = m.group(0)
        if 'name="capture"' not in dessin and 'title="capture"' not in dessin:
            return dessin
        if "softEdge" in dessin:
            return dessin
        n += 1
        effet = f'<a:effectLst><a:softEdge rad="{RAYON}"/></a:effectLst>'
        # l'effet se place dans pic:spPr, apres la geometrie (et le trait)
        return re.sub(r"(<pic:spPr\b.*?)(</pic:spPr>)",
                      lambda k: k.group(1) + effet + k.group(2), dessin, count=1, flags=re.S)

    xml = re.sub(r"<w:drawing>.*?</w:drawing>", traiter, xml, flags=re.S)
    return xml, n


def traiter_fichier(chemin):
    chemin = Path(chemin)
    with zipfile.ZipFile(chemin) as z:
        ordre = z.namelist()
        entrees = {k: z.read(k) for k in ordre}
    xml, n = adoucir(entrees["word/document.xml"].decode("utf-8"))
    if n:
        entrees["word/document.xml"] = xml.encode("utf-8")
        tmp = chemin.with_suffix(".tmp.docx")
        with zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as z:
            for k in ordre:
                z.writestr(k, entrees[k])
        shutil.move(str(tmp), str(chemin))
    print(f"{chemin.name} : {n} capture(s) adoucie(s)")


if __name__ == "__main__":
    for f in sys.argv[1:]:
        traiter_fichier(f)
