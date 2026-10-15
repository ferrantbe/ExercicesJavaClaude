#!/usr/bin/env python3
"""Applique d'un coup toutes les regles automatiques a un deck.

    python3 _outils/mettre_aux_normes.py deck.pptx [--sortie autre.pptx] [--essai]

Enchaine, dans cet ordre, les outils de _outils/ :
  1. uniformiser_intercalaires  titres d'intercalaire : Calibri gras, 66 pt ou moins
  2. organiser_exercices        slides d'exercices : icones, groupes, un clic par exercice
  3. animer_sommaire            « Au programme » : une section par clic
     animer_lignes              tableau en bandeaux sombres : une ligne par clic
  4. ajuster_code               zone de code trop large : retrecie a son contenu, centree
  5. animer_code                code (ou schema) sous le texte : en fondu, au clic
  6. appliquer_consolas         mots de code en Consolas, cas sans ambiguite seulement

Chaque outil peut etre relance sans risque : un deck deja aux normes ressort
inchange. Les cas ambigus de la regle Consolas sont listes, jamais appliques.
Les retouches faites a la main (formes, animations propres a une slide) sont
gardees : rien n'est regenere.
"""
import argparse
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ICI = Path(__file__).resolve().parent
ETAPES = ["uniformiser_intercalaires", "organiser_exercices", "animer_sommaire",
          "animer_lignes", "ajuster_code", "animer_code", "appliquer_consolas"]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("deck")
    ap.add_argument("--sortie")
    ap.add_argument("--essai", action="store_true", help="rapport seul, rien d'ecrit")
    a = ap.parse_args()
    with tempfile.TemporaryDirectory() as tmp:
        travail = Path(tmp) / "deck.pptx"
        shutil.copy(a.deck, travail)
        for etape in ETAPES:
            print(f"--- {etape}")
            r = subprocess.run([sys.executable, str(ICI / f"{etape}.py"), str(travail)],
                               capture_output=True, text=True)
            sortie = (r.stdout + r.stderr).strip()
            print(sortie if sortie else "  rien a faire")
            if r.returncode != 0:
                print(f"ECHEC a l'etape {etape} : rien n'a ete ecrit")
                sys.exit(1)
        if a.essai:
            print("\n(essai : rien d'ecrit)")
        else:
            shutil.copy(travail, a.sortie or a.deck)
            print(f"\n-> {a.sortie or a.deck}")


if __name__ == "__main__":
    main()
