#!/usr/bin/env python3
"""Configuration du module ABS pour construire_deck.py.

Arborescence attendue, relative au dossier de ce fichier :
    gabarit_deck.pptx         gabarit commun : theme, dispositions, 4 slides modeles
    d03.pptx                  ancien deck 03, qui fournit l'intercalaire
    scenario/Scenario_ABS.md  le scenario

Usage : python3 construire_deck.py module_abs ABS_deck.pptx
"""
from pathlib import Path

ICI = Path(__file__).resolve().parent.parent   # _slides (les generateurs sont dans _slides/generateurs)

CODE = "ABS"
ORDRE = 6    # rang du deck dans le cours
SCENARIO = ICI / "scenario" / "Scenario_ABS.md"
GABARIT = ICI / "gabarit_deck.pptx"   # a la racine de _slides (22/10/2026)
SOURCES = {"d03": ICI / "sources" / "d03.pptx"}

# Slides prelevees dans les decks sources : (deck, numero[, nom de forme])
GABARIT_TITRE = ("gabarit", 1)
GABARIT_INTERCALAIRE = ("d03", 13)       # « Classe Abstraite », pleine page
ICONE_DEMO = ("gabarit", 3, "Picture 3")
IMAGE_EXO = ("gabarit", 4, "Picture 12")

FASCICULES = {"ABS": "fascicule ABS", "G": "fil rouge GameHub"}

# Lu par finaliser_deck.py.
# SECTIONS : le texte des intercalaires du deck, numero retire, mot pour mot
#            (casse mise a part) ; un intercalaire absent de cette liste
#            n'est ni numerote ni repere.
# LIBELLES : la version courte, pour le sommaire et le repere en bas de slide.
SECTIONS = [
    "L'héritage en Java",
    "Le même code, trois fois",
    "La classe abstraite",
    "Ce qui monte, ce qui descend",
    "Le polymorphisme",
    "La mère appelle la fille",
    "Deux étages",
    "Décider soi-même",
]

LIBELLES = [
    "L'héritage en Java",
    "Le même code, trois fois",
    "La classe abstraite",
    "Ce qui monte, ce qui descend",
    "Le polymorphisme",
    "La mère appelle la fille",
    "Deux étages",
    "Décider soi-même",
]

# Titre des intercalaires, sans numero : le finaliseur le pose.
# Les titres doivent etre ceux de SECTIONS, dans le meme ordre :
# finaliser_deck.py le verifie et previent en cas d'ecart.
INTERCALAIRES = {
    "1.1": ("L'héritage en Java", None),
    "2.1": ("Le même code, trois fois", None),
    "3.1": ("La classe abstraite", None),
    "4.1": ("Ce qui monte, ce qui descend", None),
    "5.1": ("Le polymorphisme", None),
    "6.1": ("La mère appelle la fille", None),
    "7.1": ("Deux étages", None),
    "8.1": ("Décider soi-même", None),
}

PLAN = [
    ("0.1", "titre", None),

    ("1.1", "inter", None),
    ("1.2", "new", None), ("1.3", "new", None), ("1.4", "new", None),
    ("1.5", "new", None), ("1.6", "table", None), ("1.7", "new", None),

    ("2.1", "inter", None), ("2.1a", "new", None),
    ("2.2", "new", None), ("2.3", "new", None), ("2.4", "demo", "Demo_ABS"),
    ("2.5", "new", None),

    ("3.1", "inter", None),
    ("3.2", "new", None), ("3.3", "new", None), ("3.4", "new", None),

    ("4.1", "inter", None),
    ("4.2", "new", None), ("4.3", "new", None), ("4.4", "new", None), ("4.4a", "new", None),
    ("4.5", "new", None), ("4.6", "renvoi", None),

    ("5.1", "inter", None),
    ("5.2", "new", None), ("5.3", "new", None), ("5.4", "new", None),
    ("5.5", "renvoi", None),

    ("6.1", "inter", None),
    ("6.2", "new", None), ("6.3", "new", None), ("6.4", "new", None),
    ("6.5", "new", None), ("6.6", "new", None), ("6.7", "renvoi", None),

    ("7.1", "inter", None),
    ("7.2", "new", None), ("7.3", "new", None), ("7.4", "new", None),
    ("7.5", "renvoi", None),

    ("8.1", "inter", None),
    ("8.2", "new", None), ("8.3", "renvoi", None),
]
