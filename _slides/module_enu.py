#!/usr/bin/env python3
"""Configuration du module ENU pour construire_deck.py.

Arborescence attendue, relative au dossier de ce fichier :
    gabarit_deck.pptx         gabarit commun : theme, dispositions, 4 slides modeles
    d02.pptx                  ancien deck 02, qui fournit l'intercalaire
    scenario/Scenario_ENU.md  le scenario

Usage : python3 construire_deck.py module_enu ENU_deck.pptx
"""
from pathlib import Path

ICI = Path(__file__).resolve().parent

CODE = "ENU"
ORDRE = 5    # rang du deck dans le cours
SCENARIO = ICI / "scenario" / "Scenario_ENU.md"
GABARIT = ICI / "sources" / "gabarit_deck.pptx"
SOURCES = {"d02": ICI / "sources" / "d02.pptx"}

# Slides prelevees dans les decks sources : (deck, numero[, nom de forme])
GABARIT_TITRE = ("gabarit", 1)
GABARIT_INTERCALAIRE = ("d02", 44)       # « Rencontres du troisieme type », pleine page
ICONE_DEMO = ("gabarit", 3, "Picture 3")
IMAGE_EXO = ("gabarit", 4, "Picture 12")

FASCICULES = {"ENU": "fascicule ENU", "G": "fil rouge GameHub"}

# Lu par finaliser_deck.py.
# SECTIONS : le texte des intercalaires du deck, numero retire, mot pour mot
#            (casse mise a part) ; un intercalaire absent de cette liste
#            n'est ni numerote ni repere.
# LIBELLES : la version courte, pour le sommaire et le repere en bas de slide.
SECTIONS = [
    "Des valeurs qui se comptent",
    "Déclarer une énumération",
    "L'ordre porte l'information",
    "Comparer et aiguiller : switch",
    "Une enum est une classe",
    "Un détour par deux outils",
    "Les records",
]

LIBELLES = [
    "Des valeurs qui se comptent",
    "Déclarer une énumération",
    "L'ordre porte l'information",
    "Comparer et aiguiller",
    "Une enum est une classe",
    "Random et StringJoiner",
    "Les records",
]

# Titre des intercalaires, sans numero : le finaliseur le pose.
# Les titres doivent etre ceux de SECTIONS, dans le meme ordre :
# finaliser_deck.py le verifie et previent en cas d'ecart.
INTERCALAIRES = {
    "1.1": ("Des valeurs qui se comptent", None),
    "2.1": ("Déclarer une énumération", None),
    "3.1": ("L'ordre porte l'information", None),
    "4.1": ("Comparer et aiguiller", None),
    "5.1": ("Une enum est une classe", None),
    "6.1": ("Un détour par deux outils", None),
    "7.1": ("Les records", None),
}

PLAN = [
    ("0.1", "titre", None),

    ("1.1", "inter", None),
    ("1.2", "new", None), ("1.3", "table", None),

    ("2.1", "inter", None),
    ("2.2", "new", None), ("2.3", "table", None), ("2.4", "new", None),

    ("3.1", "inter", None),
    ("3.2", "demo", "Demo_ENU"), ("3.3", "new", None), ("3.4", "new", None),
    ("3.5", "renvoi", None),

    ("4.1", "inter", None),
    ("4.2", "new", None), ("4.3", "new", None), ("4.4", "new", None),
    ("4.5", "new", None), ("4.6", "new", None), ("4.7", "renvoi", None),

    ("5.1", "inter", None),
    ("5.2", "new", None), ("5.3", "new", None), ("5.4", "new", None),

    ("6.1", "inter", None),
    ("6.2", "new", None), ("6.3", "new", None), ("6.4", "renvoi", None),

    ("7.1", "inter", None),
    ("7.2", "new", None), ("7.3", "new", None), ("7.4", "new", None),
    ("7.5", "new", None), ("7.6", "new", None), ("7.7", "table", None),
    ("7.8", "renvoi", None), ("7.9", "renvoi", None),
]
