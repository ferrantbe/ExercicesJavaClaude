#!/usr/bin/env python3
"""
verifier_comptes.py — le tableau des themes dit-il la verite ?

    python3 _outils/verifier_comptes.py

Le document Codes_du_cours annonce un nombre d'exercices par theme. Rien
ne garantissait qu'il suive l'ajout d'un exercice : PKG est reste a 4
pendant plusieurs jours apres l'ecriture de PKG.5, et personne ne l'a vu.

Ce script compte les packages sur le disque et compare. Il verifie aussi
le nombre d'increments annonce pour le fil rouge, qui vit dans l'autre
projet — la valeur y etait restee a G.20 alors qu'il en compte 30.
"""

import json
import re
import sys
from pathlib import Path


def racine_du_projet():
    for dossier in [Path(__file__).resolve().parent, *Path(__file__).resolve().parents]:
        if (dossier / "pom.xml").is_file():
            return dossier
    return None


RACINE = racine_du_projet()


def main():
    if RACINE is None:
        sys.exit("Racine du projet introuvable.")
    print(f"Projet : {RACINE}")

    base = RACINE / "exercices/src/main/java/be/ephec/java"
    reel = {d.name.upper(): sum(1 for x in d.iterdir()
                                if x.is_dir() and re.fullmatch(r"e\d+", x.name))
            for d in sorted(base.iterdir()) if d.is_dir()}

    source = (RACINE / "_outils/generateurs/build_codes.js").read_text(encoding="utf-8")
    annonce = dict(re.findall(r'\["([A-Z]{2,3})", "[^"]*", "[^"]*", "([^"]+)"\]', source))

    ecarts = []
    for code, dit in annonce.items():
        if dit == "a definir" or dit == "\u00e0 d\u00e9finir":
            continue
        attendu = reel.get(code)
        if attendu is None or str(attendu) != dit:
            ecarts.append((code, dit, attendu))

    # le fil rouge, dans l'autre projet
    increments = RACINE.parent / "GameHubClaude" / "_outils" / "gamehub_increments.json"
    if not increments.is_file():
        increments = RACINE.parent / "gamehub" / "_outils" / "gamehub_increments.json"
    if increments.is_file():
        table = json.loads(increments.read_text(encoding="utf-8"))
        dernier = max(int(c.split(".")[1]) for c in table)
        cite = re.search(r'{ t: "G\.(\d+)", code: true },\s*\n\s*" : son ordre', source)
        if cite and int(cite.group(1)) != dernier:
            ecarts.append(("GameHub", f"G.{cite.group(1)}", f"G.{dernier}"))
    else:
        print("  (projet GameHub introuvable : son compte n'est pas verifie)")

    if ecarts:
        print(f"\n{len(ecarts)} ecart(s) entre le document et le disque :\n")
        for code, dit, vrai in ecarts:
            print(f"   {code:<10} le document annonce {dit}, il y en a {vrai}")
        sys.exit(1)

    print("\nLe tableau des themes correspond au disque.")


if __name__ == "__main__":
    main()
