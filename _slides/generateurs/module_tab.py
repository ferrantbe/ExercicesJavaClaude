#!/usr/bin/env python3
"""Configuration du module TAB pour construire_deck.py.

Arborescence attendue, relative au dossier de ce fichier :
    gabarit_deck.pptx         gabarit commun : thème, dispositions, 4 slides modèles
    d02.pptx                  ancien deck 02 (02__Java_IN2_2026_-_Dates__packages__
                              tableaux__enum__record.pptx renomme), qui fournit
                              l'intercalaire ; d02b.pptx, qui n'existe plus, avait
                              la meme numerotation
    scenario/Scenario_TAB.md  le scenario

Usage : python3 construire_deck.py module_tab TAB_deck.pptx
"""
from pathlib import Path

ICI = Path(__file__).resolve().parent.parent   # _slides (les generateurs sont dans _slides/generateurs)

CODE = "TAB"
ORDRE = 4    # rang du deck dans le cours
SCENARIO = ICI / "scenario" / "Scenario_TAB.md"
GABARIT = ICI / "gabarit_deck.pptx"   # a la racine de _slides (22/10/2026)
SOURCES = {"d02": ICI / "sources" / "d02.pptx"}

# Slides prelevees dans les decks sources : (deck, numero[, nom de forme])
GABARIT_TITRE = ("gabarit", 1)
GABARIT_INTERCALAIRE = ("d02", 35)       # image de section, a remplacer ensuite
ICONE_DEMO = ("gabarit", 3, "Picture 3")
IMAGE_EXO = ("gabarit", 4, "Picture 12")

FASCICULES = {"TAB": "fascicule TAB", "G": "fil rouge GameHub"}

# Lu par finaliser_deck.py.
# SECTIONS : le texte des intercalaires du deck, numero retire, mot pour mot
#            (casse mise a part) ; un intercalaire absent de cette liste
#            n'est ni numerote ni repere.
# LIBELLES : la version courte, pour le sommaire et le repere en bas de slide.
SECTIONS = [
    "Un tableau, c'est une taille fixe",
    "Parcourir un tableau",
    "Lignes de tailles différentes",
    "L'opérateur ternaire",
    "Des objets qui se connaissent",
]

LIBELLES = [
    "Un tableau, une taille fixe",
    "Parcourir un tableau",
    "Des lignes inégales",
    "L'opérateur ternaire",
    "Des objets qui se connaissent",
]

# Titre des intercalaires, sans numero : le finaliseur le pose.
# Les titres doivent etre ceux de SECTIONS, dans le meme ordre :
# finaliser_deck.py le verifie et previent en cas d'ecart.
INTERCALAIRES = {
    "1.1": ("Un tableau, c'est une taille fixe", None),
    "2.1": ("Parcourir un tableau", None),
    "3.1": ("Lignes de tailles différentes", None),
    "4.1": ("L'opérateur ternaire", None),
    "5.1": ("Des objets qui se connaissent", None),
}

# Une image de fond par section. Sans entree ici, l'intercalaire garde celle
# de la slide modele designee par GABARIT_INTERCALAIRE.
IMAGES_INTERCALAIRE = {}   # a remplir apres le premier retour du deck retouche

PLAN = [
    ("0.1", "titre", None),

    ("1.1", "inter", None),
    ("1.2", "demo", "Demo_TAB"), ("1.3", "new", None), ("1.4", "new", None),
    ("1.5", "new", None),

    ("2.1", "inter", None),
    ("2.2", "new", None), ("2.3", "new", None), ("2.4", "new", None),
    ("2.5", "new", None), ("2.6", "renvoi", None),

    ("3.1", "inter", None),
    ("3.2", "new", None), ("3.3", "renvoi", None),

    ("4.1", "inter", None),
    ("4.2", "new", None), ("4.3", "new", None), ("4.4", "new", None),
    ("4.5", "renvoi", None),

    ("5.1", "inter", None),
    ("5.2", "new", None), ("5.3", "new", None), ("5.4", "new", None),
    ("5.5", "renvoi", None),

    ("6.1", "new", None),
]
