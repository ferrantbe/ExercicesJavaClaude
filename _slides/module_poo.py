#!/usr/bin/env python3
"""Configuration du module POO pour finaliser_deck.py uniquement.

Ce deck a ete construit par construire_deck_poo.py, avant que le moteur
generique construire_deck.py n'existe. Ce fichier ne porte donc que ce que
lit le finaliseur ; construire_deck.py le refuse, faute de PLAN.

Le dossier de captures Javadoc, quatrieme argument du finaliseur, ne
concerne que ce module.

Usage : python3 finaliser_deck.py POO entree.pptx sortie.pptx
"""

CODE = "POO"
ORDRE = 2    # rang du deck dans le cours
MOTEUR = "construire_deck_poo.py"   # moteur de construction propre a ce deck

# Lu par finaliser_deck.py.
# SECTIONS : le texte des intercalaires du deck, numero retire, mot pour mot
#            (casse mise a part) ; un intercalaire absent de cette liste
#            n'est ni numerote ni repere.
# LIBELLES : la version courte, pour le sommaire et le repere en bas de slide.
SECTIONS = [
    "De C# à Java",
    "Classe et objet",
    "Encapsulation",
    "static",
    "Entrée de données au clavier",
    "Primitifs et références",
    "Les wrappers",
]

LIBELLES = [
    "De C# à Java",
    "Classe et objet",
    "Encapsulation",
    "Membres de classe (static)",
    "Saisie clavier et Javadoc",
    "Primitifs et références",
    "Les wrappers",
]
