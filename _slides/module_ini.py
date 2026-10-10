#!/usr/bin/env python3
"""Configuration du module INI pour finaliser_deck.py uniquement.

Ce deck a ete construit par construire_deck_ini.py, avant que le moteur
generique construire_deck.py n'existe. Ce fichier ne porte donc que ce que
lit le finaliseur ; construire_deck.py le refuse, faute de PLAN.

Usage : python3 finaliser_deck.py INI entree.pptx sortie.pptx
"""

CODE = "INI"
ORDRE = 1    # rang du deck dans le cours
MOTEUR = "construire_deck_ini.py"   # moteur de construction propre a ce deck

# Lu par finaliser_deck.py.
# SECTIONS : le texte des intercalaires du deck, numero retire, mot pour mot
#            (casse mise a part) ; un intercalaire absent de cette liste
#            n'est ni numerote ni repere.
# LIBELLES : la version courte, pour le sommaire et le repere en bas de slide.
SECTIONS = [
    "Le cours",
    "Ma façon de travailler",
    "Les mémentos",
]

LIBELLES = [
    "Le cours",
    "Ma façon de travailler",
    "Les mémentos",
]
