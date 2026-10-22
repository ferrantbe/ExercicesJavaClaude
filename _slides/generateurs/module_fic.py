#!/usr/bin/env python3
"""Configuration du module FIC pour construire_deck.py et finaliser_deck.py.

Arborescence attendue, relative au dossier de ce fichier :
    sources/gabarit_deck.pptx  gabarit commun : theme, dispositions, 4 slides modeles
    sources/d02.pptx           ancien deck 02, qui fournit l'intercalaire : d12,
                               le deck source du theme, n'a pas d'intercalaire
                               pleine page
    scenario/Scenario_FIC.md   le scenario

La matiere vient de sources/d12.pptx, reecrite dans le scenario : aucune
slide n'en est importee telle quelle.

Usage :
    python3 construire_deck.py module_fic FIC_deck.pptx
    python3 finaliser_deck.py FIC FIC_deck.pptx FIC_slides.pptx
"""
from pathlib import Path

ICI = Path(__file__).resolve().parent.parent   # _slides (les generateurs sont dans _slides/generateurs)

CODE = "FIC"
ORDRE = 15   # rang du deck dans le cours : apres les deux decks FX
SCENARIO = ICI / "scenario" / "Scenario_FIC.md"
GABARIT = ICI / "gabarit_deck.pptx"   # a la racine de _slides (22/10/2026)
SOURCES = {"d02": ICI / "sources" / "d02.pptx"}

# Slides prelevees dans les decks sources : (deck, numero[, nom de forme])
GABARIT_TITRE = ("gabarit", 1)
GABARIT_INTERCALAIRE = ("d02", 13)       # « Structure », pleine page, comme PKG
ICONE_DEMO = ("gabarit", 3, "Picture 3")
IMAGE_EXO = ("gabarit", 4, "Picture 12")

FASCICULES = {"FIC": "fascicule FIC", "G": "fil rouge GameHub"}

# Lu par finaliser_deck.py.
# SECTIONS : le texte des intercalaires du deck, numero retire, mot pour mot
#            (casse mise a part) ; un intercalaire absent de cette liste
#            n'est ni numerote ni repere.
# LIBELLES : la version courte, pour le sommaire et le repere en bas de slide.
SECTIONS = [
    "Ce qui entre, ce qui sort",
    "Fermer quoi qu'il arrive",
    "Écrire et relire du texte",
    "Écrire l'objet tel quel",
]

LIBELLES = [
    "Les flux",
    "Fermer un flux",
    "Le texte",
    "Les objets",
]

# Titre des intercalaires, sans numero : le finaliseur le pose.
# Les titres sont ceux de SECTIONS, dans le meme ordre : ils en sont tires,
# pour qu'un titre change a un seul endroit.
INTERCALAIRES = {f"{n}.1": (titre, None) for n, titre in enumerate(SECTIONS, 1)}

# Une seule image pour les quatre sections : celle de la slide modele.
# Frederic les differenciera ensuite dans PowerPoint.
IMAGES_INTERCALAIRE = {}

PLAN = [
    ("0.1", "titre", None),

    ("1.1", "inter", None),
    ("1.2", "new", None), ("1.3", "new", None), ("1.4", "table", None),
    ("1.5", "new", None), ("1.6", "renvoi", None),

    ("2.1", "inter", None),
    ("2.2", "new", None), ("2.3", "new", None), ("2.4", "new", None),

    ("3.1", "inter", None),
    ("3.2", "new", None), ("3.3", "new", None), ("3.4", "new", None),
    ("3.5", "new", None), ("3.6", "new", None),

    ("4.1", "inter", None),
    ("4.2", "new", None), ("4.3", "demo", "Demo_FIC"),
    ("4.4", "new", None), ("4.5", "new", None), ("4.6", "table", None),
    ("4.7", "renvoi", None),

    ("5.1", "renvoi", None),
]


# L'intercalaire « Structure » du deck 02 porte son titre en 66 pt : le plus
# long des titres de ce module (« 3. Ecrire et relire du texte », 28
# caracteres) passerait a la ligne. Meme taille reduite que PKG, qui utilise
# le meme intercalaire, pour toutes les sections.
TAILLE_INTERCALAIRE = 54


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
