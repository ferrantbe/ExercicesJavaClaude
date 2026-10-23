#!/usr/bin/env python3
"""
construire_support_global.py — le support de cours complet (22/10/2026).

    python3 _outils/construire_support_global.py                (recto seul)
    python3 _outils/construire_support_global.py --recto-verso

Produit _support/Support_de_cours.docx, et sa version N/B a cote. Les quinze modules, dans l'ordre des seances (INI a
FIC), a partir des memes sources que les supports par module
(_support/generateurs/Support_XXX.md) :

1. build_support_global.js : page de garde, table des matieres, une section
   par module (pied de page qui nomme le module), une section par annexe, et
   la section de l'index ; les annexes (guide IntelliJ, memento technique,
   memento Clean Code, sans leur page de garde) sont inserees ensuite ;
2. style, bordures adoucies des captures, page de garde en en-tete et pied ;
3. marges en miroir pour la reliure, comme le recueil ;
4. indexer.py : les marques d'index (liste : index.txt) et le champ INDEX ;
5. typographie, puis la version noir et blanc.

La table des matieres et l'index sont des champs Word : a l'ouverture, Word
propose de mettre a jour les champs ; il faut accepter, puis enregistrer,
avant d'exporter en PDF.
"""
import subprocess
import sys
from pathlib import Path

RACINE = Path(__file__).resolve().parent.parent
OUTILS = RACINE / "_outils"
SORTIE = RACINE / "_support/Support_de_cours.docx"
sys.path.insert(0, str(OUTILS))
import construire_recueil  # noqa: E402


def lancer(*args):
    subprocess.run([sys.executable, *map(str, args)], check=True, capture_output=True)


def decaler_titres(chemin):
    """Module en Titre 1, section en Titre 2, sous-section en Titre 3 : la
    table des matieres de Word ne reconnait que ses styles de titre."""
    import re, zipfile, shutil
    with zipfile.ZipFile(chemin) as z:
        ordre = z.namelist()
        parties = {k: z.read(k) for k in ordre}
    x = parties["word/document.xml"].decode("utf-8")
    x = x.replace('w:val="Heading2"', 'w:val="Heading3"').replace('w:val="Heading1"', 'w:val="Heading2"')
    x = x.replace('w:val="TitreModule"', 'w:val="Heading1"')
    parties["word/document.xml"] = x.encode("utf-8")
    with zipfile.ZipFile(str(chemin) + ".tmp", "w", zipfile.ZIP_DEFLATED) as z:
        for k in ordre:
            z.writestr(k, parties[k])
    shutil.move(str(chemin) + ".tmp", chemin)


ANNEXES = [("A", "Guide_IntelliJ"), ("B", "Memento_Technique"), ("C", "Memento_Clean_Code")]


def inserer_annexes(chemin):
    """Le contenu des documents de reference, a la place des paragraphes
    ANNEXE_X_ICI : sans leur page de garde, ni leur derniere section."""
    from docx import Document
    from docx.oxml.ns import qn
    from docxcompose.composer import Composer
    maitre = Document(str(chemin))
    composeur = Composer(maitre)
    for lettre, nom in ANNEXES:
        annexe = Document(str(RACINE / f"documents/{nom}.docx"))
        corps = annexe.element.body
        enfants = list(corps)
        fin = next(i for i, e in enumerate(enfants)
                   if e.tag == qn("w:p") and e.find(".//" + qn("w:sectPr")) is not None)
        for e in enfants[:fin + 1]:
            corps.remove(e)
        # la derniere section de l'annexe reste : docxcompose s'en sert pour
        # inserer, sans la recopier dans le support
        # Pas de saut de page avant chaque partie : une partie commence a la
        # suite de la precedente, au lieu de laisser une page presque vide
        # (22/10/2026). Les paragraphes qui ne portent qu'un saut de page
        # disparaissent ; les « saut de page avant » aussi.
        for p in list(corps.iter(qn("w:p"))):
            sauts = [b for b in p.iter(qn("w:br")) if b.get(qn("w:type")) == "page"]
            texte = "".join(x.text or "" for x in p.iter(qn("w:t"))).strip()
            if sauts and not texte and p.find(".//" + qn("w:sectPr")) is None:
                p.getparent().remove(p)
            else:
                for b in sauts:
                    b.getparent().remove(b)
            for e in p.iter(qn("w:pageBreakBefore")):
                e.getparent().remove(e)
        repere = f"ANNEXE_{lettre}_ICI"
        cible = next(e for e in maitre.element.body
                     if e.tag == qn("w:p") and repere in "".join(t.text or "" for t in e.iter(qn("w:t"))))
        position = list(maitre.element.body).index(cible)
        composeur.insert(position, annexe)
        maitre.element.body.remove(cible)
    composeur.save(str(chemin))


def main():
    mode = ["--recto-verso"] if "--recto-verso" in sys.argv else []
    subprocess.run(["node", str(OUTILS / "generateurs/build_support_global.js"), str(SORTIE), *mode], check=True)
    inserer_annexes(SORTIE)
    decaler_titres(SORTIE)
    lancer(OUTILS / "style_documents.py", SORTIE)
    lancer(OUTILS / "adoucir_captures.py", SORTIE)
    lancer(OUTILS / "reduire_images.py", SORTIE)
    lancer(OUTILS / "garde.py", SORTIE)
    construire_recueil.marges_reliure(SORTIE, miroir="--recto-verso" in sys.argv)
    r = subprocess.run([sys.executable, str(OUTILS / "indexer.py"), str(SORTIE)], check=True, capture_output=True, text=True)
    print(r.stdout.strip())
    r = subprocess.run([sys.executable, str(OUTILS / "lier_renvois.py"), str(SORTIE)], check=True, capture_output=True, text=True)
    print(r.stdout.strip())
    lancer(OUTILS / "typographie.py", SORTIE)
    for f in RACINE.rglob("*.avant"):
        f.unlink()
    lancer(OUTILS / "version_nb.py", SORTIE)
    print("Support de cours :", SORTIE.relative_to(RACINE))


if __name__ == "__main__":
    main()
