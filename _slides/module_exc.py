#!/usr/bin/env python3
"""Configuration du module EXC pour construire_deck.py et finaliser_deck.py.

Arborescence attendue, relative au dossier de ce fichier :
    gabarit_deck.pptx         gabarit commun : theme, dispositions, 4 slides modeles
    d06.pptx                  ancien deck 06 (06__Java_IN2_2026_-_Exceptions.pptx
                              renomme), qui fournit l'intercalaire
    scenario/Scenario_EXC.md  le scenario

Usage :
    python3 construire_deck.py module_exc EXC_deck.pptx
    python3 finaliser_deck.py EXC EXC_deck.pptx EXC_slides.pptx
"""
from pathlib import Path

ICI = Path(__file__).resolve().parent

CODE = "EXC"
ORDRE = 10   # rang du deck dans le cours : juste apres COL
SCENARIO = ICI / "scenario" / "Scenario_EXC.md"
GABARIT = ICI / "sources" / "gabarit_deck.pptx"
SOURCES = {"d06": ICI / "sources" / "d06.pptx"}

# Slides prelevees dans les decks sources : (deck, numero[, nom de forme])
GABARIT_TITRE = ("gabarit", 1)
GABARIT_INTERCALAIRE = ("d06", 20)       # « Les Exceptions », meme structure que d05/4
ICONE_DEMO = ("gabarit", 3, "Picture 3")
IMAGE_EXO = ("gabarit", 4, "Picture 12")

FASCICULES = {"EXC": "fascicule EXC", "G": "fil rouge GameHub"}

# Lu par finaliser_deck.py.
# SECTIONS : le texte des intercalaires du deck, numero retire, mot pour mot
#            (casse mise a part) ; un intercalaire absent de cette liste
#            n'est ni numerote ni repere.
# LIBELLES : la version courte, pour le sommaire et le repere en bas de slide.
SECTIONS = [
    "Un objet qui interrompt",
    "Lever, puis déclarer",
    "Attraper là où l'on peut agir",
    "Ce que le compilateur ne voit pas",
]

LIBELLES = [
    "Le mécanisme",
    "Lever et déclarer",
    "Attraper",
    "Les non contrôlées",
]

# Titre des intercalaires, sans numero : le finaliseur le pose.
# Les titres sont ceux de SECTIONS, dans le meme ordre : ils en sont tires,
# pour qu'un titre change a un seul endroit.
INTERCALAIRES = {f"{n}.1": (titre, None) for n, titre in enumerate(SECTIONS, 1)}

# Une seule image pour les quatre sections : celle de l'ancien deck, deja
# dans la slide modele. Frederic les differenciera ensuite dans PowerPoint.
IMAGES_INTERCALAIRE = {}

PLAN = [
    ("0.1", "titre", None),

    ("1.1", "inter", None),
    ("1.2", "demo", "Demo_EXC"),
    ("1.3", "new", None), ("1.4", "new", None), ("1.5", "new", None),

    ("2.1", "inter", None),
    ("2.2", "new", None), ("2.3", "new", None), ("2.4", "new", None),
    ("2.5", "renvoi", None),

    ("3.1", "inter", None),
    ("3.2", "new", None), ("3.3", "new", None), ("3.4", "new", None),
    ("3.5", "new", None), ("3.6", "renvoi", None),

    ("4.1", "inter", None),
    ("4.2", "new", None), ("4.3", "renvoi", None), ("4.4", "table", None),
    ("4.5", "new", None), ("4.6", "renvoi", None),

    ("5.1", "renvoi", None),
]


# L'intercalaire du deck 06 porte son titre en 60 pt : le plus long de ce
# module, numero compris (« 4. Ce que le compilateur ne voit pas »,
# 36 caracteres), passerait a la ligne. Taille estimee avec Carlito, la
# police de substitution de Calibri (Corbel n'est pas disponible pour le
# rendu) : 9 pouces a 44 pt pour une boite de 11,5. A confirmer dans
# PowerPoint. Meme valeur qu'ITF.
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
