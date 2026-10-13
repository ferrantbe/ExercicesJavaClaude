#!/usr/bin/env python3
"""Configuration du module TMP pour construire_deck.py.

Arborescence attendue, relative au dossier de ce fichier :
    gabarit_deck.pptx         gabarit commun : thème, dispositions, 4 slides modèles
    d02.pptx                  ancien deck 02, qui fournit l'intercalaire
    scenario/Scenario_TMP.md  le scenario

Usage : python3 construire_deck.py module_tmp TMP_deck.pptx
"""
from pathlib import Path

ICI = Path(__file__).resolve().parent

CODE = "TMP"
ORDRE = 3    # rang du deck dans le cours
SCENARIO = ICI / "scenario" / "Scenario_TMP.md"
GABARIT = ICI / "sources" / "gabarit_deck.pptx"
SOURCES = {"d02": ICI / "sources" / "d02.pptx"}

# Slides prelevees dans les decks sources : (deck, numero[, nom de forme])
GABARIT_TITRE = ("gabarit", 1)
GABARIT_INTERCALAIRE = ("d02", 4)        # image de calendriers, pleine page
ICONE_DEMO = ("gabarit", 3, "Picture 3")
IMAGE_EXO = ("gabarit", 4, "Picture 12")

FASCICULES = {"TMP": "fascicule TMP", "G": "fil rouge GameHub"}

# Lu par finaliser_deck.py.
# SECTIONS : le texte des intercalaires du deck, numero retire, mot pour mot
#            (casse mise a part) ; un intercalaire absent de cette liste
#            n'est ni numerote ni repere.
# LIBELLES : la version courte, pour le sommaire et le repere en bas de slide.
SECTIONS = [
    "Les classes de java.time",
    "Mesurer un écart",
    "Une date ne change pas",
    "Un détour par l'affichage",
    "Date ou instant ?",
    "L'arithmétique du calendrier",
    "Period ou Duration",
    "Une date et son texte",
]

LIBELLES = [
    "Les classes de java.time",
    "Mesurer un écart",
    "Une date ne change pas",
    "L'affichage formaté",
    "Date ou instant ?",
    "Arithmétique du calendrier",
    "Period ou Duration",
    "Une date et son texte",
]

# Titre des intercalaires, sans numero : le finaliseur le pose.
# Les titres doivent etre ceux de SECTIONS, dans le meme ordre :
# finaliser_deck.py le verifie et previent en cas d'ecart.
INTERCALAIRES = {
    "1.1": ("Les classes de java.time", None),
    "2.1": ("Mesurer un écart", None),
    "3.1": ("Une date ne change pas", None),
    "4.1": ("Un détour par l'affichage", None),
    "5.1": ("Date ou instant ?", None),
    "6.1": ("L'arithmétique du calendrier", None),
    "7.1": ("Period ou Duration", None),
    "8.1": ("Une date et son texte", None),
}

# Une image de fond par section. Sans entree ici, l'intercalaire garde celle
# de la slide modele designee par GABARIT_INTERCALAIRE.
IMAGES_INTERCALAIRE = {
    f"{n}.1": ICI / "images" / f"TMP_inter_{n}.jpg" for n in range(1, 9)
}

PLAN = [
    ("0.1", "titre", None),

    ("1.1", "inter", None),
    ("1.2", "new", None), ("1.3", "new", None), ("1.4", "table", None),
    ("1.5", "new", None), ("1.6", "new", None), ("1.7", "new", None),
    ("1.8", "new", None), ("1.9", "new", None), ("1.10", "new", None),
    ("1.11", "demo", "Demo_TMP"),

    ("2.1", "inter", None),
    ("2.2", "new", None), ("2.3", "new", None), ("2.4", "renvoi", None),

    ("3.1", "inter", None),
    ("3.2", "new", None), ("3.3", "renvoi", None), ("3.4", "new", None),

    ("4.1", "inter", None),
    ("4.2", "new", None), ("4.3", "new", None), ("4.4", "table", None),
    ("4.5", "new", None), ("4.6", "new", None),

    ("5.1", "inter", None),
    ("5.2", "new", None), ("5.3", "renvoi", None), ("5.4", "new", None),

    ("6.1", "inter", None),
    ("6.2", "new", None), ("6.3", "renvoi", None), ("6.4", "new", None),

    ("7.1", "inter", None),
    ("7.2", "new", None), ("7.3", "new", None), ("7.4", "renvoi", None),
    ("7.5", "new", None),

    ("8.1", "inter", None),
    ("8.2", "new", None), ("8.3", "new", None), ("8.4", "renvoi", None),
    ("8.5", "new", None),

    ("9.1", "new", None),
]
