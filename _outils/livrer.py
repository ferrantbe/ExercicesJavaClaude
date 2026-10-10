#!/usr/bin/env python3
"""
livrer.py — fabrique les archives d'une seance.

    python3 _outils/livrer.py               demande quelle seance livrer
    python3 _outils/livrer.py 1              les deux archives de la seance 1
    python3 _outils/livrer.py 1 --enonces    seulement les enonces
    python3 _outils/livrer.py 1 --solutions   seulement les solutions
    python3 _outils/livrer.py 1 --verifier   ne produit rien, controle seulement

Le dossier courant n'a aucune importance : le script retrouve la racine du
projet en remontant depuis sa propre position jusqu'au pom.xml. Les archives
sont deposees dans <racine>/livraisons/.

Aucune dependance : Python 3.8 ou plus recent suffit.

------------------------------------------------------------------------------
CE QUE LE SCRIPT CONTROLE AVANT DE PRODUIRE QUOI QUE CE SOIT
------------------------------------------------------------------------------

1. FUITE DE CORRIGE  (le controle qui compte)
   Tout fichier de exercices/src/main doit soit lever une
   UnsupportedOperationException, soit porter la mention FOURNIE dans son
   en-tete. Sinon, c'est probablement une solution laissee par erreur dans
   l'arbre des enonces, et le script refuse de fabriquer l'archive.

2. CORRIGE INACHEVE
   Aucun fichier de solutions/ ne doit contenir UnsupportedOperationException
   ni TODO. Sinon la solution n'est pas finie.

3. TESTS MANQUANTS
   Signale les exercices sans classe de test. Simple avertissement : POO.4
   n'en a legitimement pas.

4. DUPLICATION DES TESTS
   Les classes de test de exercices/src/test sont recopiees dans l'archive
   des solutions, sous solutions/src/test. C'est ce qui permet de verifier
   qu'une solution passe bien au vert. Rien a faire a la main.
------------------------------------------------------------------------------
"""

import argparse
import json
import os
import re
import sys
import zipfile
from pathlib import Path

# Nom du dossier racine reproduit DANS l'archive. L'etudiant extrait donc
# l'archive dans le dossier PARENT de son projet, et les dossiers fusionnent.
RACINE_ARCHIVE = "ExercicesJava"

PAQUET_BASE = Path("src") / "main" / "java" / "be" / "ephec" / "java"
PAQUET_TEST = Path("src") / "test" / "java" / "be" / "ephec" / "java"
PAQUET_DEMO = Path("src") / "main" / "java" / "be" / "ephec" / "java" / "demo"
PAQUET_DEMO_TEST = Path("src") / "test" / "java" / "be" / "ephec" / "java" / "demo"
RESSOURCES = Path("src") / "main" / "resources" / "be" / "ephec" / "java"

IGNORES = {"target", ".idea", "__pycache__"}

ROUGE = "\033[31m"
JAUNE = "\033[33m"
VERT = "\033[32m"
NEUTRE = "\033[0m"


def trouver_racine():
    """
    Remonte depuis l'emplacement de ce script jusqu'au dossier qui contient
    pom.xml. Permet de lancer le script depuis n'importe ou : double-clic
    dans IntelliJ, terminal ouvert dans _outils/, ou racine du projet.
    """
    for dossier in [Path(__file__).resolve().parent, *Path(__file__).resolve().parents]:
        if (dossier / "pom.xml").is_file():
            return dossier
    return None


def choisir_seance(manifeste):
    """Affiche les seances disponibles et demande laquelle livrer."""
    print("Seances disponibles :")
    print()
    for cle, entree in sorted(manifeste.items(), key=lambda c: int(c[0]) if c[0].isdigit() else 999):
        if not cle.isdigit():
            continue
        themes = ", ".join(entree["themes"]) if entree["themes"] else "(aucun exercice propre)"
        print(f"  {cle:>3}   {entree['nom']:<28} {themes}")
    print()

    if not sys.stdin.isatty():
        sys.exit(colore("Preciser le numero de seance en parametre.", ROUGE))

    reponse = input("Quelle seance livrer ? ").strip()
    if reponse not in manifeste:
        sys.exit(colore(f"Seance {reponse!r} absente de livraisons.json", ROUGE))
    print()
    return reponse


def colore(texte, couleur):
    return couleur + texte + NEUTRE if sys.stdout.isatty() else texte


def fichiers_java(dossier):
    """Tous les .java sous un dossier, en ignorant les repertoires techniques."""
    if not dossier.is_dir():
        return []
    trouves = []
    for chemin in sorted(dossier.rglob("*.java")):
        if IGNORES & set(chemin.parts):
            continue
        trouves.append(chemin)
    return trouves


def controler(themes, racine, sans_tests=frozenset()):
    """Renvoie (erreurs, avertissements).

    sans_tests : themes dont les exercices n'ont volontairement pas de
    classe de test. Une interface graphique ne se verifie pas par un test
    unitaire ; l'enonce decrit alors ce qu'il faut observer. Sans cette
    liste, le theme FX produirait huit avertissements a chaque livraison,
    et le bruit finirait par masquer un vrai probleme.
    """
    erreurs, avertissements = [], []

    for theme in themes:
        src_ex = racine / "exercices" / PAQUET_BASE / theme
        src_so = racine / "solutions" / PAQUET_BASE / theme
        src_te = racine / "exercices" / PAQUET_TEST / theme

        if not src_ex.is_dir():
            erreurs.append(f"[{theme}] absent de exercices/ : {src_ex}")
            continue

        # --- 1. fuite de solution ---------------------------------------
        for fichier in fichiers_java(src_ex):
            texte = fichier.read_text(encoding="utf-8")
            a_trou = ("UnsupportedOperationException" in texte
                      or re.search(r"\bTODO\b", texte))
            fournie = "FOURNI" in texte
            if not a_trou and not fournie:
                erreurs.append(
                    f"[{theme}] {fichier.relative_to(racine)} ne contient ni "
                    "UnsupportedOperationException ni TODO, et n'est pas marquee "
                    "FOURNIE. Corrige oublie dans l'arbre des enonces ?"
                )

        # --- 2. solution inachevee ---------------------------------------
        if src_so.is_dir():
            for fichier in fichiers_java(src_so):
                texte = fichier.read_text(encoding="utf-8")
                if "UnsupportedOperationException" in texte:
                    erreurs.append(
                        f"[{theme}] {fichier.relative_to(racine)} leve encore "
                        "UnsupportedOperationException : solution incomplete."
                    )
                if re.search(r"\bTODO\b", texte):
                    erreurs.append(
                        f"[{theme}] {fichier.relative_to(racine)} contient "
                        "encore un TODO."
                    )
            if not fichiers_java(src_so):
                erreurs.append(
                    f"[{theme}] le dossier solutions/ existe mais ne contient aucun "
                    "fichier : les corriges n'ont pas ete ecrits.")
        else:
            erreurs.append(f"[{theme}] aucune solution dans solutions/")

        # --- 3. tests manquants ----------------------------------------
        exercices = sorted(d.name for d in src_ex.iterdir() if d.is_dir())
        if theme not in sans_tests:
            for exercice in exercices:
                if not fichiers_java(src_te / exercice):
                    avertissements.append(
                        f"[{theme}] {exercice} n'a aucune classe de test"
                    )

    return erreurs, avertissements


def synchroniser_tests(themes, racine):
    """
    Recopie les classes de test de exercices/ vers solutions/, SUR LE DISQUE.

    Sans cela, le module solutions n'aurait aucun test et il serait impossible
    de verifier dans IntelliJ qu'une solution passe au vert avant de le publier.

    Les tests s'ecrivent donc UNIQUEMENT dans exercices/src/test. Toute
    modification faite du cote solutions/ sera ecrasee au prochain appel.
    """
    copies = []
    for theme in themes:
        source = racine / "exercices" / PAQUET_TEST / theme
        for fichier in fichiers_java(source):
            destination = racine / "solutions" / PAQUET_TEST / fichier.relative_to(
                racine / "exercices" / PAQUET_TEST)
            destination.parent.mkdir(parents=True, exist_ok=True)
            contenu = fichier.read_text(encoding="utf-8")
            if not destination.is_file() or destination.read_text(encoding="utf-8") != contenu:
                destination.write_text(contenu, encoding="utf-8")
                copies.append(destination.relative_to(racine))
    return copies


def construire(themes, racine, sortie, solutions):
    """Fabrique une archive. Renvoie la liste des chemins qu'elle contient."""
    module = "solutions" if solutions else "exercices"
    entrees = []

    for theme in themes:
        # Code source du module concerne.
        base = racine / module / PAQUET_BASE / theme
        for fichier in fichiers_java(base):
            entrees.append((fichier, fichier.relative_to(racine)))

        # Classes de test. Celles de l'etudiant vivent dans exercices/ et sont
        # recopiees vers solutions/ par synchroniser_tests. Pour l'archive des
        # solutions on prend donc directement le dossier solutions/, qui les
        # contient toutes — y compris les classes de test propres au corrige,
        # comme le modele de reponse d'un exercice ou c'est l'etudiant qui
        # doit ecrire les tests.
        # Ressources du theme : fichiers FXML, images, jeux de donnees.
        # Elles vivent a cote du code, dans src/main/resources, et suivent
        # le meme decoupage par theme. Sans elles, FX.8 ne se lancerait pas.
        ressources = racine / module / RESSOURCES / theme
        if ressources.is_dir():
            for fichier in sorted(ressources.rglob("*")):
                if fichier.is_file():
                    entrees.append((fichier, Path(module) / fichier.relative_to(racine / module)))

        source_tests = "solutions" if solutions else "exercices"
        tests = racine / source_tests / PAQUET_TEST / theme
        for fichier in fichiers_java(tests):
            destination = Path(module) / fichier.relative_to(racine / source_tests)
            entrees.append((fichier, destination))

        # Demonstrations du cours. Elles ne partent qu'avec les SOLUTIONS :
        # l'interet d'une demo est dans sa construction en direct, et la
        # publier avant la seance la viderait de son sens. Apres coup, elle
        # vaut un corrige de plus.
        if solutions:
            # Sources principales ET classes de test : la demonstration du
            # theme JUN construit une classe de test en direct, et la livrer
            # sans elle n'aurait aucun sens.
            for dossier in (racine / "demos" / PAQUET_DEMO / theme,
                            racine / "demos" / PAQUET_DEMO_TEST / theme):
                for fichier in fichiers_java(dossier):
                    entrees.append((fichier, fichier.relative_to(racine)))

    sortie.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(sortie, "w", zipfile.ZIP_DEFLATED) as archive:
        for source, relatif in entrees:
            archive.write(source, str(Path(RACINE_ARCHIVE) / relatif))

    return [str(Path(RACINE_ARCHIVE) / r) for _, r in entrees]


def main():
    analyseur = argparse.ArgumentParser(description="Fabrique les archives d'une seance.")
    analyseur.add_argument("seance", nargs="?", default=None,
                           help="numero de seance ; demande interactivement si omis")
    analyseur.add_argument("--enonces", action="store_true", help="seulement l'archive des enonces")
    analyseur.add_argument("--solutions", action="store_true", help="seulement l'archive des solutions")
    analyseur.add_argument("--verifier", action="store_true", help="controler sans rien produire")
    analyseur.add_argument("--racine", default=None,
                           help="racine du projet ; detectee automatiquement si omise")
    args = analyseur.parse_args()

    racine = Path(args.racine).resolve() if args.racine else trouver_racine()
    if racine is None or not (racine / "pom.xml").is_file():
        sys.exit(colore(
            "Racine du projet introuvable : aucun pom.xml au-dessus de "
            f"{Path(__file__).resolve().parent}", ROUGE))

    print(f"Projet : {racine}")
    print()

    manifeste = json.loads((racine / "_outils" / "livraisons.json").read_text(encoding="utf-8"))
    sans_tests = frozenset(manifeste.get("sans_tests", []))

    seance = args.seance if args.seance is not None else choisir_seance(manifeste)
    if seance not in manifeste:
        sys.exit(colore(f"Seance {seance} absente de livraisons.json", ROUGE))

    entree = manifeste[seance]
    themes = entree["themes"]
    if not themes:
        print(f"Seance {seance} ({entree['nom']}) : aucun theme a livrer.")
        return

    print(f"Seance {seance} — themes : {', '.join(themes)}")
    print()

    for chemin in synchroniser_tests(themes, racine):
        print(f"  test recopie    {chemin}")

    erreurs, avertissements = controler(themes, racine, sans_tests)

    for message in avertissements:
        print(colore("  avertissement  ", JAUNE) + message)
    for message in erreurs:
        print(colore("  ERREUR         ", ROUGE) + message)

    if erreurs:
        print()
        sys.exit(colore(f"{len(erreurs)} erreur(s) : aucune archive produite.", ROUGE))

    if avertissements:
        print()
    print(colore("Controles passes.", VERT))
    print()

    if args.verifier:
        return

    faire_enonces = args.enonces or not args.solutions
    faire_solutions = args.solutions or not args.enonces

    for solutions, suffixe in ((False, "exercices"), (True, "solutions")):
        if solutions and not faire_solutions:
            continue
        if not solutions and not faire_enonces:
            continue

        sortie = racine / "livraisons" / f"{entree['nom']}_{suffixe}.zip"
        contenu = construire(themes, racine, sortie, solutions)

        print(f"{sortie.relative_to(racine)}  ({len(contenu)} fichiers)")
        for chemin in contenu:
            print(f"    {chemin}")
        print()


if __name__ == "__main__":
    main()
