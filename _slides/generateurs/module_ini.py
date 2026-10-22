#!/usr/bin/env python3
"""Configuration du module INI pour finaliser_deck.py uniquement.

Ce deck a ete construit par un moteur propre, construire_deck_ini.py,
avant que le moteur generique construire_deck.py n'existe ; ce moteur
n'existe plus. Ce fichier ne porte donc que ce que lit le finaliseur ;
construire_deck.py le refuse, faute de PLAN, et le dit.

Le deck de reference est _slides/slides_de_cours (voir _slides/LISEZ_MOI.md) :
on le modifie directement, et on reporte la modification dans le scenario.
Le reconstruire de zero demanderait d'ecrire un PLAN et des retouches sur
mesure ; ce n'est pas fait (decision du 22/10/2026).

Usage : python3 finaliser_deck.py INI entree.pptx sortie.pptx
"""

CODE = "INI"
ORDRE = 1    # rang du deck dans le cours
SANS_MOTEUR = True   # aucun moteur ne reconstruit ce deck : le deck est la reference

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
