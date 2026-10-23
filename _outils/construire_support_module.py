#!/usr/bin/env python3
"""
construire_support_module.py — le support de cours d'un module, de sa source
_support/generateurs/Support_XXX.md au document
_support/supports_par_modules/Couleur/Support_XXX.docx.

    python3 _outils/construire_support_module.py TMP

Meme chaine qu'un fascicule : generation (build_support.js), style,
pagination, typographie ; puis la version noir et blanc (_support/supports_par_modules/NB/Support_XXX_NB.docx),
pour l'impression.
"""
import re
import subprocess
import sys
import tempfile
from pathlib import Path

RACINE = Path(__file__).resolve().parent.parent


def construire(module):
    outils = RACINE / "_outils"
    docx = RACINE / f"_support/supports_par_modules/Couleur/Support_{module}.docx"
    subprocess.run(["node", str(outils / "generateurs/build_support.js"), module], check=True)
    subprocess.run([sys.executable, str(outils / "style_documents.py"), str(docx)], check=True, capture_output=True)
    subprocess.run([sys.executable, str(outils / "adoucir_captures.py"), str(docx)], check=True, capture_output=True)
    subprocess.run([sys.executable, str(outils / "reduire_images.py"), str(docx)], check=True, capture_output=True)
    # la page de garde dans sa section AVANT de compter les pages : sans
    # elle, la ligne EPHEC pouvait deborder sur une page de trop
    subprocess.run([sys.executable, str(outils / "garde.py"), str(docx)], check=True, capture_output=True)
    tmp = Path(tempfile.mkdtemp())
    subprocess.run(["soffice", "--headless", "--convert-to", "pdf", "--outdir", str(tmp), str(docx)], capture_output=True)
    n = int(re.search(r"Pages:\s+(\d+)", subprocess.run(["pdfinfo", str(tmp / (docx.stem + ".pdf"))],
                                                          capture_output=True, text=True).stdout).group(1))
    subprocess.run([sys.executable, str(outils / "ajouter_pagination.py"), str(docx), docx.stem, str(n - 1)],
                   check=True, capture_output=True)
    subprocess.run([sys.executable, str(outils / "typographie.py"), str(docx)], check=True, capture_output=True)
    for f in RACINE.rglob("*.avant"):
        f.unlink()
    # la version noir et blanc, pour l'impression (20/10/2026)
    subprocess.run([sys.executable, str(outils / "version_nb.py"), "--dossier",
                    str(RACINE / "_support/supports_par_modules/NB"), str(docx)], check=True, capture_output=True)
    print(f"{docx.name} : {n} pages, et sa version _NB")


if __name__ == "__main__":
    for m in sys.argv[1:]:
        construire(m)
