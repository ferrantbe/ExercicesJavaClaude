#!/usr/bin/env python3
"""
verifier_renvois.py — controle les renvois vers les mementos.

    python3 _outils/verifier_renvois.py            les erreurs
    python3 _outils/verifier_renvois.py --couverture  ce qui n'est jamais cite
    python3 _outils/verifier_renvois.py --par-module  combien par fascicule

Le probleme
-----------
Les fascicules et les scenarios citent les mementos par code : CC-NOM.7,
TEC-EXE.2. Rien ne garantit que le code existe, ni qu'il dise ce que le
renvoi pretend.

Deux fautes sont possibles, et les deux sont arrivees :

    TEC-EXC.2     un code qui n'existe pas — la section EXC non plus
    TEC-EXE.1     un code qui existe, mais decrit comme « reference et
                  valeur » alors qu'il parle de la pile

La premiere se detecte seule. La seconde demande de comparer le libelle
du renvoi au titre de la regle, et le script ne peut que la signaler a
l'oeil humain — il rapproche les deux textes et laisse juger.

Ce qui est lu
-------------
Les generateurs de _outils/generateurs/, parce que c'est la que les
renvois sont ECRITS. Les .docx en sont le produit : les relire
demanderait de les ouvrir, pour la meme information.
"""

import re
import sys
from difflib import SequenceMatcher
from pathlib import Path

RENVOI = re.compile(r"\b((?:CC|TEC)-[A-Z]{2,4}\.\d+)\b")

# Un renvoi dans un tableau : ["CC-NOM.7", "ce qu'il dit"]
RENVOI_DECRIT = re.compile(
    r'\["((?:CC|TEC)-[A-Z]{2,4}\.\d+)"\s*,\s*"([^"]+)"\]')

# La definition d'une regle dans un memento
DEFINITION = re.compile(
    r'"((?:CC|TEC)-[A-Z]{2,4}\.\d+)"\s*,\s*"([^"]{0,120})"')

MEMENTOS = ("build_memento.js", "build_memento_technique.js")

# Un renvoi ne recopie pas le titre de la regle : il la reformule pour le
# contexte. « la duplication entre sous-classes » renvoie legitimement a
# « Ne vous repetez pas ».
#
# Ces glosses-la ont ete relues et validees. Les lister ici evite que
# l'outil les signale a chaque passage — neuf faux positifs permanents
# apprendraient vite a ne plus lire sa sortie.


def racine_du_projet():
    for dossier in [Path(__file__).resolve().parent, *Path(__file__).resolve().parents]:
        if (dossier / "pom.xml").is_file():
            return dossier
    return None


RACINE = racine_du_projet()
GENERATEURS = RACINE / "_outils" / "generateurs" if RACINE else None
VALIDEES = RACINE / "_outils" / "renvois_valides.txt" if RACINE else None


def glosses_validees():
    """Les couples code/fichier dont la reformulation a deja ete relue."""
    if not VALIDEES or not VALIDEES.is_file():
        return set()
    couples = set()
    for ligne in VALIDEES.read_text(encoding="utf-8").splitlines():
        ligne = ligne.split("#")[0].strip()
        if ligne:
            code, _, fichier = ligne.partition(" ")
            couples.add((code.strip(), fichier.strip()))
    return couples


def regles():
    """Rend {code -> titre} pour tout ce que les mementos definissent."""
    definies = {}
    for nom in MEMENTOS:
        fichier = GENERATEURS / nom
        if not fichier.is_file():
            continue
        for code, titre in DEFINITION.findall(fichier.read_text(encoding="utf-8")):
            definies.setdefault(code, titre)
    return definies


def sources():
    """Les generateurs qui CITENT, par opposition a ceux qui definissent."""
    return [f for f in sorted(GENERATEURS.glob("build_*.js"))
            if f.name not in MEMENTOS]


def citations():
    """Rend {code -> [(fichier, libelle ou None)]}."""
    trouvees = {}
    for fichier in sources():
        texte = fichier.read_text(encoding="utf-8")

        decrits = {}
        for code, libelle in RENVOI_DECRIT.findall(texte):
            decrits.setdefault(code, libelle)

        for code in set(RENVOI.findall(texte)):
            trouvees.setdefault(code, []).append((fichier.name, decrits.get(code)))
    return trouvees


def ressemblance(a, b):
    return SequenceMatcher(None, a.lower(), b.lower()).ratio()


def contenu_orphelin():
    """Du contenu pousse APRES la construction du document.

    Un generateur empile ses paragraphes dans une liste, puis appelle
    Packer.toBuffer pour fabriquer le fichier. Une ligne ajoutee APRES cet
    appel s'execute sans erreur et n'apparait nulle part : la liste est
    deja consommee.

    Trois renvois ont vecu deux jours dans cet angle mort. Ils figuraient
    dans le generateur, donc l'outil les comptait, et ils etaient absents
    du document. C'est ce controle-la qui les a trouves.
    """
    coupables = []
    for fichier in sorted(GENERATEURS.glob("build_*.js")):
        lignes = fichier.read_text(encoding="utf-8").split("\n")
        construction = next((i for i, l in enumerate(lignes)
                             if "Packer.toBuffer" in l), None)
        if construction is None:
            continue
        apres = [i + 1 for i, l in enumerate(lignes)
                 if i > construction and re.match(r"^[a-z]\w*\.push\(", l)]
        if apres:
            coupables.append((fichier.name, apres))
    return coupables


def main():
    if RACINE is None:
        sys.exit("Racine du projet introuvable.")
    if not GENERATEURS.is_dir():
        sys.exit(f"Dossier des generateurs introuvable : {GENERATEURS}")

    print(f"Projet : {RACINE}")
    definies = regles()
    citees = citations()

    if not definies:
        sys.exit("Aucune regle trouvee dans les mementos.")

    # --- couverture ---------------------------------------------------
    if "--couverture" in sys.argv:
        jamais = sorted(set(definies) - set(citees))
        print(f"\n{len(definies) - len(jamais)} regles citees sur {len(definies)}.\n")
        if jamais:
            print("Jamais citees :\n")
            section = None
            for code in jamais:
                s = code.split(".")[0]
                if s != section:
                    section = s
                    print(f"  {section}")
                print(f"     {code:<11} {definies[code]}")
        return

    # --- comptes par module -------------------------------------------
    if "--par-module" in sys.argv:
        comptes = {}
        for code, endroits in citees.items():
            for fichier, _ in endroits:
                comptes.setdefault(fichier, set()).add(code)
        print()
        for fichier in sorted(comptes, key=lambda f: -len(comptes[f])):
            print(f"  {len(comptes[fichier]):>3}  {fichier}")
        return

    # --- les erreurs ---------------------------------------------------
    orphelins = contenu_orphelin()
    if orphelins:
        print(f"\n{len(orphelins)} generateur(s) poussent du contenu APRES la "
              "construction du document :\n")
        for nom, lignes in orphelins:
            lignes = ", ".join(str(l) for l in lignes[:6])
            print(f"   {nom}  ligne(s) {lignes}")
        print("\n   Ce contenu ne figure dans AUCUN document : la liste de")
        print("   paragraphes est deja consommee quand ces lignes s'executent.")
        print("   Deplacez-les avant l'appel a Packer.toBuffer.")

    inconnues = []
    douteuses = []
    validees = glosses_validees()
    ignorees = 0

    for code, endroits in sorted(citees.items()):
        if code not in definies:
            for fichier, _ in endroits:
                inconnues.append((code, fichier))
            continue
        for fichier, libelle in endroits:
            if not libelle or ressemblance(libelle, definies[code]) >= 0.35:
                continue
            if (code, fichier) in validees:
                ignorees += 1
                continue
            douteuses.append((code, fichier, libelle, definies[code]))

    if inconnues:
        print(f"\n{len(inconnues)} renvoi(s) vers une regle INEXISTANTE :\n")
        for code, fichier in inconnues:
            print(f"   {code:<11} cite dans {fichier}")

    if douteuses:
        print(f"\n{len(douteuses)} libelle(s) a verifier — le renvoi et la regle"
              " ne se ressemblent pas :\n")
        for code, fichier, libelle, titre in douteuses:
            print(f"   {code}  ({fichier})")
            print(f"      le renvoi dit  : {libelle}")
            print(f"      la regle dit   : {titre}")
            print(f"      si la reformulation vous convient, ajoutez cette ligne")
            print(f"      a _outils/renvois_valides.txt :   {code} {fichier}\n")

    if not inconnues and not douteuses and not orphelins:
        print(f"\nLes {len(citees)} renvois pointent vers une regle existante.")
        if ignorees:
            print(f"{ignorees} reformulation(s) deja relue(s) et validee(s).")
        return

    sys.exit(1 if (inconnues or orphelins) else 0)


if __name__ == "__main__":
    main()
