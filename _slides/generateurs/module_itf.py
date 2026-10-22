#!/usr/bin/env python3
"""Configuration du module ITF pour construire_deck.py.

Arborescence attendue, relative au dossier de ce fichier :
    gabarit_deck.pptx         gabarit commun : theme, dispositions, 4 slides modeles
    d03.pptx                  ancien deck 03 (03__Java_IN2_2026_-_Classes_abstraites__
                              Interfaces.pptx renomme), qui fournit l'intercalaire
    scenario/Scenario_ITF.md  le scenario

Usage : python3 construire_deck.py module_itf ITF_deck.pptx
"""
from pathlib import Path

ICI = Path(__file__).resolve().parent.parent   # _slides (les generateurs sont dans _slides/generateurs)

CODE = "ITF"
ORDRE = 7    # rang du deck dans le cours
SCENARIO = ICI / "scenario" / "Scenario_ITF.md"
GABARIT = ICI / "gabarit_deck.pptx"   # a la racine de _slides (22/10/2026)
SOURCES = {"d03": ICI / "sources" / "d03.pptx"}

# Slides prelevees dans les decks sources : (deck, numero[, nom de forme])
# Le deck ITF a d'abord ete construit avec le deck ABS livre comme gabarit,
# d'ou des numeros (3, 12, 23) qui ne correspondaient plus a rien dans le
# gabarit commun. Aligne sur lui le 09/10/2026.
GABARIT_TITRE = ("gabarit", 1)
GABARIT_INTERCALAIRE = ("d03", 29)       # « Les interfaces », pleine page
ICONE_DEMO = ("gabarit", 3, "Picture 3")
IMAGE_EXO = ("gabarit", 4, "Picture 12")

FASCICULES = {
    "ITF": "fascicule ITF",
    "ABS": "fascicule ABS",
    "G": "fil rouge GameHub",
}

# Lu par finaliser_deck.py.
# SECTIONS : le texte des intercalaires du deck, numero retire, mot pour mot
#            (casse mise a part) ; un intercalaire absent de cette liste
#            n'est ni numerote ni repere.
# LIBELLES : la version courte, pour le sommaire et le repere en bas de slide.
SECTIONS = [
    "Ce qu'une interface déclare",
    "Plusieurs interfaces à la fois",
    "Interface ou classe abstraite ?",
    "Dépendre d'un contrat",
    "Le patron Observateur",
    "Autres caractéristiques de l’interface",
]

LIBELLES = [
    "Ce qu'une interface déclare",
    "Plusieurs interfaces à la fois",
    "Interface ou classe abstraite ?",
    "Dépendre d'un contrat",
    "Le patron Observateur",
    "Ce qu'une interface contient aussi",
]

# Titre des intercalaires, sans numero : le finaliseur le pose.
# Les titres doivent etre ceux de SECTIONS, dans le meme ordre :
# finaliser_deck.py le verifie et previent en cas d'ecart.
INTERCALAIRES = {
    "1.1": ("Ce qu'une interface déclare", None),
    "2.1": ("Plusieurs interfaces à la fois", None),
    "3.1": ("Interface ou abstraite ?", None),
    "4.1": ("Dépendre d'un contrat", None),
    "5.1": ("Le patron Observateur", None),
    "6.1": ("Ce qu'elle contient aussi", None),
}

# L'image de la slide modele sert aux six sections : Frederic les
# differencie ensuite dans PowerPoint. L'ancienne image, intercalaire_itf.png,
# n'a pas ete conservee.
IMAGES_INTERCALAIRE = {}

PLAN = [
    ("0.1", "titre", None),

    ("1.1", "inter", None),
    ("1.2", "demo", "Demo_ITF"),
    ("1.3", "new", None), ("1.4", "new", None), ("1.5", "new", None),
    ("1.6", "new", None), ("1.7", "renvoi", None),

    ("2.1", "inter", None),
    ("2.2", "new", None), ("2.3", "new", None), ("2.4", "new", None),
    ("2.5", "renvoi", None),

    ("3.1", "inter", None),
    ("3.2", "table", None), ("3.3", "new", None), ("3.4", "renvoi", None),

    ("4.1", "inter", None), ("4.1a", "new", None),
    ("4.2", "new", None), ("4.3", "new", None), ("4.4", "new", None), ("4.4a", "new", None),
    ("4.5", "new", None), ("4.6", "new", None),

    ("5.1", "inter", None),
    ("5.2", "new", None), ("5.3", "new", None), ("5.4", "new", None),
    ("5.5", "new", None), ("5.6", "renvoi", None),

    ("6.1", "inter", None),
    ("6.2", "new", None), ("6.3", "new", None), ("6.4", "new", None),
    ("6.5", "new", None),

    ("7.1", "renvoi", None),
]


# Les titres d'intercalaire de ce module sont plus longs que ceux d'ABS : a
# 60 pt ils passeraient a la ligne. On les pose tous a la meme taille reduite,
# pour qu'ils restent reguliers d'une section a l'autre.
TAILLE_INTERCALAIRE = 44


def retoucher(slide, ident, bloc):
    if ident not in INTERCALAIRES:
        return
    from pptx.util import Pt
    boites = [s for s in slide.shapes if s.has_text_frame
              and s.text_frame.text.strip() and not s.is_placeholder]
    if not boites:
        return
    titre = min(boites, key=lambda s: (s.top, s.left))
    for par in titre.text_frame.paragraphs:
        for run in par.runs:
            run.font.size = Pt(TAILLE_INTERCALAIRE)
