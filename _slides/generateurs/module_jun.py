#!/usr/bin/env python3
"""Configuration du module JUN pour construire_deck.py et finaliser_deck.py.

Arborescence attendue, relative au dossier de ce fichier :
    gabarit_deck.pptx         gabarit commun : theme, dispositions, 4 slides modeles
    d07.pptx                  ancien deck 07 (07__Java_IN2_2026_-_JUnit.pptx
                              renomme), qui fournit l'intercalaire
    scenario/Scenario_JUN.md  le scenario

Usage :
    python3 construire_deck.py module_jun JUN_deck.pptx
    python3 finaliser_deck.py JUN JUN_deck.pptx JUN_slides.pptx
"""
from pathlib import Path

ICI = Path(__file__).resolve().parent.parent   # _slides (les generateurs sont dans _slides/generateurs)

CODE = "JUN"
ORDRE = 11   # rang du deck dans le cours : juste apres EXC
SCENARIO = ICI / "scenario" / "Scenario_JUN.md"
GABARIT = ICI / "gabarit_deck.pptx"   # a la racine de _slides (22/10/2026)
SOURCES = {"d07": ICI / "sources" / "d07.pptx"}

# Slides prelevees dans les decks sources : (deck, numero[, nom de forme])
GABARIT_TITRE = ("gabarit", 1)
GABARIT_INTERCALAIRE = ("d07", 12)       # « Tests Unitaires », meme structure que d06/20
ICONE_DEMO = ("gabarit", 3, "Picture 3")
IMAGE_EXO = ("gabarit", 4, "Picture 12")

FASCICULES = {"JUN": "fascicule JUN"}

# Lu par finaliser_deck.py.
# SECTIONS : le texte des intercalaires du deck, numero retire, mot pour mot
#            (casse mise a part) ; un intercalaire absent de cette liste
#            n'est ni numerote ni repere.
# LIBELLES : la version courte, pour le sommaire et le repere en bas de slide.
SECTIONS = [
    "À vous d'écrire les tests",
    "Ce qu'un test contient",
    "Vérifier tout le contrat",
    "Choisir ses cas, et les justifier",
    "Du code qui se laisse tester",
]

LIBELLES = [
    "À vous d'écrire les tests",
    "Écrire un test",
    "Vérifier un contrat",
    "Choisir et justifier",
    "La testabilité",
]

# Titre des intercalaires, sans numero : le finaliseur le pose.
# Les titres sont ceux de SECTIONS, dans le meme ordre : ils en sont tires,
# pour qu'un titre change a un seul endroit.
INTERCALAIRES = {f"{n}.1": (titre, None) for n, titre in enumerate(SECTIONS, 1)}

# Une seule image pour les cinq sections : celle de l'ancien deck, deja
# dans la slide modele. Frederic les differenciera ensuite dans PowerPoint.
IMAGES_INTERCALAIRE = {}

PLAN = [
    ("0.1", "titre", None),

    ("1.1", "inter", None),
    ("1.2", "table", None), ("1.3", "new", None),
    ("1.4", "demo", "Demo_JUN"),

    ("2.1", "inter", None),
    ("2.2", "new", None), ("2.3", "new", None), ("2.4", "table", None),
    ("2.5", "new", None), ("2.6", "renvoi", None),

    ("3.1", "inter", None),
    ("3.2", "new", None), ("3.3", "new", None), ("3.4", "new", None),
    ("3.5", "new", None), ("3.6", "renvoi", None),

    ("4.1", "inter", None),
    ("4.2", "table", None), ("4.3", "new", None),
    ("4.3a", "new", None), ("4.3b", "new", None), ("4.4", "new", None),
    ("4.5", "new", None), ("4.6", "new", None), ("4.7", "renvoi", None),

    ("5.1", "inter", None), ("5.1b", "new", None), ("5.1a", "new", None),
    ("5.2", "new", None), ("5.2a", "new", None), ("5.2b", "new", None), ("5.3", "new", None),
]


# L'intercalaire du deck 07 porte son titre en 60 pt, comme celui du deck 06 :
# le plus long de ce module, numero compris (« 4. Choisir ses cas, et les
# justifier », 36 caracteres), passerait a la ligne. Meme valeur qu'EXC et
# ITF, a confirmer dans PowerPoint.
TAILLE_INTERCALAIRE = 44


def retoucher(slide, ident, bloc):
    if ident not in INTERCALAIRES or TAILLE_INTERCALAIRE is None:
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
