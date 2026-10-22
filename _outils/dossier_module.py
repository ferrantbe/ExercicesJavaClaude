#!/usr/bin/env python3
"""
dossier_module.py — un dossier par module, avec tout ce qui le concerne.

    python3 _outils/dossier_module.py                tous les modules
    python3 _outils/dossier_module.py ABS PKG        seulement ceux-la
    python3 _outils/dossier_module.py --etudiant     sans les corriges
    python3 _outils/dossier_module.py --decks /chemin/vers/les/decks

Sortie : un .zip par module dans _dossiers/.

DEUX DOSSIERS, ET IL NE FAUT PAS LES CONFONDRE
-----------------------------------------------
Par defaut, le dossier est celui du PROFESSEUR : tout y est, corriges
compris. C'est le classeur de preparation d'une seance.

Avec --etudiant, les corriges, le scenario de demonstration et le code
de la demo sont retires. Les noms de fichiers different pour qu'on ne
puisse pas distribuer l'un pour l'autre.

CE N'EST PAS CE QUE FAIT livrer.py. Celui-ci livre par SEANCE, et une
seance peut porter plusieurs themes — la seance 2 en porte quatre. Il
ne joint ni les fascicules ni les decks. Les deux outils coexistent :
l'un prepare, l'autre distribue.

LES DECKS
---------
Ils ne vivent pas dans ce projet : ils sont produits ailleurs, par
construire_deck.py. Donnez leur dossier avec --decks, et le script
prendra XXX_slides.pptx pour chaque module qui en a un.

Sans cela, ou pour un module dont le deck n'existe pas encore, le
dossier est quand meme produit : un fichier A_VENIR.txt y prend la
place du deck. Huit modules sur quinze sont dans ce cas, et le script
doit rester relancable au fur et a mesure.
"""

import shutil
import sys
import zipfile
from pathlib import Path


def racine_du_projet():
    for dossier in [Path(__file__).resolve().parent, *Path(__file__).resolve().parents]:
        if (dossier / "pom.xml").is_file():
            return dossier
    return None


RACINE = racine_du_projet()
SORTIE = RACINE / "_dossiers" if RACINE else None

# Les documents communs, joints a chaque dossier : sans eux, un module
# seul ne se lit pas — ses renvois pointent dans le vide.
COMMUNS_ETUDIANT = ["Memento_Exercices.docx", "Memento_Clean_Code.docx",
                    "Memento_Technique.docx", "Codes_du_cours.docx"]


def themes():
    base = RACINE / "exercices/src/main/java/be/ephec/java"
    return sorted(d.name.upper() for d in base.iterdir() if d.is_dir())


def copier_arbre(source, cible):
    if source.is_dir():
        shutil.copytree(source, cible, dirs_exist_ok=True)
        return sum(1 for _ in cible.rglob("*") if _.is_file())
    return 0


def construire(code, etudiant, dossier_decks):
    minuscule = code.lower()
    travail = SORTIE / ("tmp_" + code)
    if travail.exists():
        shutil.rmtree(travail)
    travail.mkdir(parents=True)

    compte = {}

    # --- le deck ----------------------------------------------------
    deck = None
    if dossier_decks:
        for nom in (f"{code}_slides.pptx", f"{code}.pptx"):
            candidat = Path(dossier_decks) / nom
            if candidat.is_file():
                deck = candidat
                break
    if deck:
        shutil.copy2(deck, travail / f"{code}_slides.pptx")
        compte["deck"] = 1
    else:
        (travail / "A_VENIR.txt").write_text(
            f"Le deck {code} n'existe pas encore, ou n'a pas ete fourni.\n\n"
            "Relancez dossier_module.py avec --decks une fois qu'il sera pret.\n",
            encoding="utf-8")
        compte["deck"] = 0

    # --- l'enonce ---------------------------------------------------
    fascicule = RACINE / "enonces" / f"{code}_enonces.docx"
    if fascicule.is_file():
        shutil.copy2(fascicule, travail)
        compte["fascicule"] = 1

    # --- les exercices ----------------------------------------------
    paquet = f"be/ephec/java/{minuscule}"
    compte["squelettes"] = copier_arbre(
        RACINE / "exercices/src/main/java" / paquet,
        travail / "exercices/src/main/java" / paquet)
    compte["tests"] = copier_arbre(
        RACINE / "exercices/src/test/java" / paquet,
        travail / "exercices/src/test/java" / paquet)
    ressources = RACINE / "exercices/src/main/resources" / paquet
    if ressources.is_dir():
        copier_arbre(ressources, travail / "exercices/src/main/resources" / paquet)

    # --- les documents communs --------------------------------------
    documents = travail / "documents"
    documents.mkdir()
    for nom in COMMUNS_ETUDIANT:
        source = RACINE / "documents" / nom
        if source.is_file():
            shutil.copy2(source, documents)

    # --- ce qui reste au professeur ---------------------------------
    if not etudiant:
        compte["corriges"] = copier_arbre(
            RACINE / "solutions/src/main/java" / paquet,
            travail / "solutions/src/main/java" / paquet)
        copier_arbre(RACINE / "solutions/src/test/java" / paquet,
                     travail / "solutions/src/test/java" / paquet)

        demo = RACINE / "_demos" / f"Demo_{code}.docx"
        if demo.is_file():
            (travail / "demonstration").mkdir(exist_ok=True)
            shutil.copy2(demo, travail / "demonstration")
            compte["demo"] = 1

        depart = RACINE / "_demos/sources_initiales" / minuscule
        if depart.is_dir():
            copier_arbre(depart, travail / "demonstration/etat_de_depart")
        arrivee = RACINE / "demos/src/main/java/be/ephec/java/demo" / minuscule
        if arrivee.is_dir():
            copier_arbre(arrivee, travail / "demonstration/etat_d_arrivee")

    (travail / "LISEZ_MOI.md").write_text(notice(code, etudiant, compte),
                                          encoding="utf-8")

    suffixe = "etudiant" if etudiant else "professeur"
    archive = SORTIE / f"Module_{code}_{suffixe}.zip"
    if archive.exists():
        archive.unlink()
    with zipfile.ZipFile(archive, "w", zipfile.ZIP_DEFLATED) as z:
        for f in sorted(travail.rglob("*")):
            if f.is_file():
                z.write(f, Path(f"Module_{code}") / f.relative_to(travail))
    shutil.rmtree(travail)
    return archive, compte


def notice(code, etudiant, compte):
    qui = "l'étudiant" if etudiant else "le professeur"
    lignes = [
        f"# Module {code}",
        "",
        f"Dossier destiné à **{qui}**.",
        "",
    ]
    if not etudiant:
        lignes += [
            "Il contient les corrigés et la démonstration : **ne pas le",
            "distribuer tel quel**. La version étudiante se fabrique avec",
            "`dossier_module.py --etudiant`.",
            "",
        ]
    lignes += ["## Ce qu'il contient", ""]
    if compte.get("deck"):
        lignes.append(f"- `{code}_slides.pptx` — le support de cours")
    else:
        lignes.append("- *le deck n'existe pas encore — voir `A_VENIR.txt`*")
    if compte.get("fascicule"):
        lignes.append(f"- `{code}_enonces.docx` — les énoncés des exercices")
    lignes.append(f"- `exercices/` — {compte.get('squelettes', 0)} squelettes "
                  f"et {compte.get('tests', 0)} classes de test")
    if not etudiant:
        lignes.append(f"- `solutions/` — {compte.get('corriges', 0)} fichiers corrigés")
        if compte.get("demo"):
            lignes.append("- `demonstration/` — le scénario, l'état de départ "
                          "et l'état d'arrivée du code montré en direct")
    lignes += [
        "- `documents/` — les quatre documents de référence, sans lesquels",
        "  les renvois du fascicule pointent dans le vide",
        "",
        "## Ce qu'il ne contient pas",
        "",
        "Le projet Maven complet. Ce dossier rassemble ce qui concerne un",
        "module ; il ne se compile pas seul. Pour travailler, partez du",
        "projet `ExercicesJavaClaude` entier.",
        "",
    ]
    return "\n".join(lignes)


def main():
    if RACINE is None:
        sys.exit("Racine du projet introuvable.")

    etudiant = "--etudiant" in sys.argv
    decks = None
    if "--decks" in sys.argv:
        i = sys.argv.index("--decks")
        if i + 1 < len(sys.argv):
            decks = sys.argv[i + 1]

    ignores = {"--etudiant", "--decks", decks}
    demandes = [a.upper() for a in sys.argv[1:] if a not in ignores and not a.startswith("--")]
    liste = demandes or themes()

    SORTIE.mkdir(exist_ok=True)
    print(f"Projet : {RACINE}")
    print(f"Version : {'étudiant' if etudiant else 'professeur'}")
    print(f"Decks : {decks or 'aucun dossier fourni'}\n")

    sans_deck = []
    for code in liste:
        if code not in themes():
            print(f"   {code} : thème inconnu")
            continue
        archive, compte = construire(code, etudiant, decks)
        if not compte.get("deck"):
            sans_deck.append(code)
        taille = archive.stat().st_size / 1024
        print(f"   {archive.name:<34} {taille:>7.0f} Ko   "
              f"{compte.get('squelettes', 0):>2} squelettes, "
              f"{compte.get('tests', 0):>2} tests"
              + (f", {compte.get('corriges', 0):>2} corrigés" if not etudiant else "")
              + ("" if compte.get("deck") else "   SANS DECK"))

    print()
    if sans_deck:
        print(f"{len(sans_deck)} module(s) sans deck : {', '.join(sans_deck)}")
        print("Relancez avec --decks quand ils seront prêts.")


if __name__ == "__main__":
    main()
