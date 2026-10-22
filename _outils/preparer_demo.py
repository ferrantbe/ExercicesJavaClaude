#!/usr/bin/env python3
"""
preparer_demo.py — charge l'etat de depart d'une demonstration.

    python3 _outils/preparer_demo.py poo
    python3 _outils/preparer_demo.py            liste les demonstrations
    python3 _outils/preparer_demo.py --vider    remet le bac a sable a neuf

Ce que fait le script
---------------------
Il vide le module `_travail/` et y recopie les sources initiales de la
demonstration demandee.

Les sources initiales reprennent la structure d'un module Maven, en plus court :

    _demos/sources_initiales/jun/
        main/    ->  _travail/src/main/java/be/ephec/java/travail/
        test/    ->  _travail/src/test/java/be/ephec/java/travail/

C'est la structure qui dit ou va chaque fichier, et non son nom : une classe de
test ne s'appelle pas toujours quelque chose Test, et une classe nommee
Testeur n'en est pas une.

Le package est deja `be.ephec.java.travail` dans les sources initiales : rien a
renommer.

Pourquoi un module a part
-------------------------
Le bac a sable est separe de `demos/` pour deux raisons. Du code a moitie tape
pendant le cours ne doit pas empecher `demos/` de compiler, puisque c'est la
reference publiee avec les corriges. Et rien de ce qui est dans `_travail/` ne
peut partir par accident : `livrer.py` ne connait que exercices, solutions et
demos.

Apres la demonstration
----------------------
Il n'y a rien a faire. L'etat d'arrivee est deja dans `demos/`, ecrit et
relu ; le bac a sable sera ecrase a la demonstration suivante.
"""

import shutil
import sys
from pathlib import Path

GARDES = {"Bienvenue.java"}


def racine_du_projet():
    for dossier in [Path(__file__).resolve().parent, *Path(__file__).resolve().parents]:
        if (dossier / "pom.xml").is_file():
            return dossier
    return None


RACINE = racine_du_projet()


def disponibles(sources):
    return sorted(d.name for d in sources.iterdir() if d.is_dir())


def compter(depart):
    """Rend (nb fichiers main, nb fichiers test) pour une demonstration."""
    return (len(list((depart / "main").glob("*.java"))),
            len(list((depart / "test").glob("*.java"))))


def vider(main, test):
    retires = 0
    for dossier in (main, test):
        dossier.mkdir(parents=True, exist_ok=True)
        for fichier in dossier.glob("*.java"):
            if fichier.name in GARDES:
                continue
            fichier.unlink()
            retires += 1
    return retires


def main():
    if RACINE is None:
        sys.exit("Racine du projet introuvable : aucun pom.xml au-dessus de "
                 f"{Path(__file__).resolve().parent}")

    sources = RACINE / "_demos" / "sources_initiales"
    travail = RACINE / "_travail" / "src"
    dossier_main = travail / "main" / "java" / "be" / "ephec" / "java" / "travail"
    dossier_test = travail / "test" / "java" / "be" / "ephec" / "java" / "travail"

    print(f"Projet : {RACINE}")

    if not sources.is_dir():
        sys.exit(f"{sources} n'existe pas.")

    arguments = [a for a in sys.argv[1:] if not a.startswith("--")]

    if "--vider" in sys.argv:
        print(f"Bac a sable vide : {vider(dossier_main, dossier_test)} fichier(s) retire(s).")
        return

    if not arguments:
        print("\nDemonstrations disponibles :\n")
        for nom in disponibles(sources):
            nb_main, nb_test = compter(sources / nom)
            scenario = RACINE / "_demos" / f"Demo_{nom.upper()}.docx"
            marque = "scenario" if scenario.is_file() else "sans scenario"
            detail = f"{nb_main} main"
            if nb_test:
                detail += f", {nb_test} test"
            print(f"   {nom:<8}{detail:<18}{marque}")
        print("\n   python3 _outils/preparer_demo.py <module>")
        return

    module = arguments[0].lower()
    depart = sources / module
    if not depart.is_dir():
        sys.exit(f"Aucune source initiale pour « {module} ». "
                 f"Disponibles : {', '.join(disponibles(sources))}")

    if not (depart / "main").is_dir():
        sys.exit(f"{depart} ne contient pas de dossier main/. "
                 "Les sources initiales se rangent en main/ et test/.")

    retires = vider(dossier_main, dossier_test)

    copies = []
    for origine, cible, etiquette in ((depart / "main", dossier_main, "main"),
                                      (depart / "test", dossier_test, "test")):
        if not origine.is_dir():
            continue
        for fichier in sorted(origine.glob("*.java")):
            shutil.copy2(fichier, cible / fichier.name)
            copies.append((fichier.name, etiquette))

    print(f"\n{retires} fichier(s) retire(s), {len(copies)} charge(s) depuis "
          f"_demos/sources_initiales/{module}/ :\n")
    for nom, ou in copies:
        print(f"   src/{ou}/java/be/ephec/java/travail/{nom}")

    scenario = RACINE / "_demos" / f"Demo_{module.upper()}.docx"
    print()
    if scenario.is_file():
        print(f"Scenario : _demos/{scenario.name}")
    else:
        print(f"Pas de scenario ecrit pour {module}.")
    print("Dans IntelliJ : rechargez Maven si le module n'apparait pas.")


if __name__ == "__main__":
    main()
