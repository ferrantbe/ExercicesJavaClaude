#!/usr/bin/env python3
"""Configuration du module PKG pour construire_deck.py et finaliser_deck.py.

Arborescence attendue, relative au dossier de ce fichier :
    gabarit_deck.pptx         gabarit commun : theme, dispositions, 4 slides modeles
    d02.pptx                  ancien deck 02 (02__Java_IN2_2026.pptx renomme),
                              qui fournit l'intercalaire
    scenario/Scenario_PKG.md  le scenario

Usage :
    python3 construire_deck.py module_pkg PKG_deck.pptx
    python3 finaliser_deck.py PKG PKG_deck.pptx PKG_slides.pptx
"""
from pathlib import Path

ICI = Path(__file__).resolve().parent.parent   # _slides (les generateurs sont dans _slides/generateurs)

CODE = "PKG"
ORDRE = 8    # rang du deck dans le cours : apres INI, POO, TMP, TAB, ENU, ABS, ITF
SCENARIO = ICI / "scenario" / "Scenario_PKG.md"
GABARIT = ICI / "gabarit_deck.pptx"   # a la racine de _slides (22/10/2026)
SOURCES = {"d02": ICI / "sources" / "d02.pptx"}

# Slides prelevees dans les decks sources : (deck, numero[, nom de forme])
GABARIT_TITRE = ("gabarit", 1)
GABARIT_INTERCALAIRE = ("d02", 13)       # « Structure », pleine page
ICONE_DEMO = ("gabarit", 3, "Picture 3")
IMAGE_EXO = ("gabarit", 4, "Picture 12")

FASCICULES = {"PKG": "fascicule PKG", "ABS": "fascicule ABS", "G": "fil rouge GameHub"}

# Lu par finaliser_deck.py.
# SECTIONS : le texte des intercalaires du deck, numero retire, mot pour mot
#            (casse mise a part) ; un intercalaire absent de cette liste
#            n'est ni numerote ni repere.
# LIBELLES : la version courte, pour le sommaire et le repere en bas de slide.
SECTIONS = [
    "Un package, un dossier",
    "Le niveau sans mot-clé",
    "Champ public ou accesseur",
    "La surface publique",
    "Découper en packages",
    "Le quatrième niveau",
]

LIBELLES = [
    "Packages et dossiers",
    "La visibilité de package",
    "Champ public ou accesseur",
    "Réduire la surface publique",
    "Découper en packages",
    "Quatrième niveau : protected",
]

# Titre des intercalaires, sans numero : le finaliseur le pose.
# Les titres sont ceux de SECTIONS, dans le meme ordre : ils en sont tires,
# pour qu'un titre change a un seul endroit.
INTERCALAIRES = {f"{n}.1": (titre, None) for n, titre in enumerate(SECTIONS, 1)}

PLAN = [
    ("0.1", "titre", None),

    ("1.1", "inter", None),
    ("1.2", "new", None), ("1.3", "new", None), ("1.4", "new", None),
    ("1.5", "new", None),

    ("2.1", "inter", None),
    ("2.2", "new", None), ("2.3", "new", None), ("2.4", "demo", "Demo_PKG"),
    ("2.5", "renvoi", None),

    ("3.1", "inter", None),
    ("3.2", "new", None), ("3.3", "new", None), ("3.4", "renvoi", None),

    ("4.1", "inter", None),
    ("4.2", "new", None), ("4.3", "new", None), ("4.4", "new", None),
    ("4.5", "renvoi", None),

    ("5.1", "inter", None),
    ("5.2", "new", None), ("5.3", "new", None), ("5.4", "new", None),
    ("5.5", "renvoi", None),

    ("6.1", "inter", None),
    ("6.2", "new", None), ("6.3", "table", None), ("6.4", "new", None),
    ("6.5", "renvoi", None),
]


# L'intercalaire « Structure » du deck 02 porte son titre en 66 pt : le plus
# long des titres de ce module (« 3. Champ public ou accesseur ») passerait a
# la ligne. On les pose tous a la meme taille reduite, comme ITF.
TAILLE_INTERCALAIRE = 54


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
