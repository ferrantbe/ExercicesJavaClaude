#!/usr/bin/env python3
"""
livrer.py — fabrique les archives d'une seance.

    python3 _outils/livrer.py               demande quelle seance livrer
    python3 _outils/livrer.py 1              les deux archives de la seance 1
    python3 _outils/livrer.py 1 --enonces    seulement les enonces
    python3 _outils/livrer.py 1 --solutions   seulement les solutions
    python3 _outils/livrer.py 1 --verifier   ne produit rien, controle seulement

    python3 _outils/livrer.py 0              le projet de depart (livraison zero)
    python3 _outils/livrer.py 3 --depot      et depose les enonces dans le clone
                                             local du depot PUBLIC ExercicesJava
    python3 _outils/livrer.py 3 --depot --solutions   y depose les corriges

Le dossier courant n'a aucune importance : le script retrouve la racine du
projet en remontant depuis sa propre position jusqu'au pom.xml. Les archives
sont deposees dans <racine>/livraisons/.

Aucune dependance : Python 3.8 ou plus recent suffit.

------------------------------------------------------------------------------
CE QUE LE SCRIPT CONTROLE AVANT DE PRODUIRE QUOI QUE CE SOIT
------------------------------------------------------------------------------

1. FUITE DE CORRIGE  (le controle qui compte)
   Tout fichier de exercices/src/main doit soit lever une
   UnsupportedOperationException, soit porter la mention FOURNIE dans son
   en-tete. Sinon, c'est probablement une solution laissee par erreur dans
   l'arbre des enonces, et le script refuse de fabriquer l'archive.

2. CORRIGE INACHEVE
   Aucun fichier de solutions/ ne doit contenir UnsupportedOperationException
   ni TODO. Sinon la solution n'est pas finie.

3. TESTS MANQUANTS
   Signale les exercices sans classe de test. Simple avertissement : POO.4
   n'en a legitimement pas.

4. DUPLICATION DES TESTS
   Les classes de test de exercices/src/test sont recopiees dans l'archive
   des solutions, sous solutions/src/test. C'est ce qui permet de verifier
   qu'une solution passe bien au vert. Rien a faire a la main.
------------------------------------------------------------------------------
LE DEPOT PUBLIC  (--depot)
------------------------------------------------------------------------------
Le depot prive ExercicesJavaClaude contient tout, corriges compris. Le depot
public ExercicesJava ne recoit que ce qui a ete livre, seance apres seance.
Les deux n'ont AUCUN historique commun : le public est alimente par copie de
fichiers, jamais par un push depuis le prive. Sinon les corriges voyageraient
dans l'historique, meme absents des fichiers.

--depot copie dans un clone LOCAL du depot public. Le script ne commite et
ne pousse rien : il affiche ce qui a change et les commandes a lancer, et
c'est le professeur qui relit, commite et pousse.

Par defaut, seuls les ENONCES partent dans le depot. Les corriges et les
demos n'y vont qu'avec --solutions, demande explicitement : un oubli ne peut
donc pas publier un corrige avant la seance.

Avant de copier, le script refuse un dossier qui n'est pas un depot Git, qui
est le projet lui-meme, ou dont l'origine est un depot ...Claude. Apres la
copie, il reverifie TOUT exercices/ dans le depot public : un corrige qui y
traine, d'ou qu'il vienne, est signale.
------------------------------------------------------------------------------
"""

import argparse
import shlex
import shutil
import subprocess
import json
import os
import re
import sys
import zipfile
from pathlib import Path

# Nom du dossier racine reproduit DANS l'archive. L'etudiant extrait donc
# l'archive dans le dossier PARENT de son projet, et les dossiers fusionnent.
RACINE_ARCHIVE = "ExercicesJava"

PAQUET_BASE = Path("src") / "main" / "java" / "be" / "ephec" / "java"
PAQUET_TEST = Path("src") / "test" / "java" / "be" / "ephec" / "java"
PAQUET_DEMO = Path("src") / "main" / "java" / "be" / "ephec" / "java" / "demo"
PAQUET_DEMO_TEST = Path("src") / "test" / "java" / "be" / "ephec" / "java" / "demo"
RESSOURCES = Path("src") / "main" / "resources" / "be" / "ephec" / "java"

IGNORES = {"target", ".idea", "__pycache__"}

# Ce que contient le projet de depart (seance 0), en plus du pom parent
# filtre et du .gitignore ci-dessous. Les dossiers sont copies en entier.
PROJET_DE_DEPART = ["exercices/pom.xml", "solutions/pom.xml",
                    "demos/pom.xml", "documents"]

# Le README de l'etudiant n'est pas celui du projet de travail : celui-ci
# peut parler des outils et des dossiers du professeur. README_publiable.md
# est copie sous le nom README.md.
README_PUBLIABLE = "README_publiable.md"

# Ce qu'un document publie ne doit jamais citer : les noms des depots de
# travail et les dossiers du professeur.
MOTS_PRIVES = ("Claude", "_outils", "_todos", "_objectifs", "_travail",
               "_slides", "_captures", "_demos", "_corrige")

# Le .gitignore du projet etudiant. Celui du professeur parle de decks, de
# livraisons et de dossiers prives : rien de cela n'existe chez l'etudiant.
GITIGNORE_ETUDIANT = """\
# Ce que Git ne doit pas suivre dans votre projet.

# --- ce que Maven et IntelliJ refabriquent
target/
out/
*.class

# --- les reglages locaux d'IntelliJ : ils contiennent des chemins propres
#     a votre machine. IntelliJ les recree a l'ouverture du pom.xml.
.idea/
*.iml

# --- les restes de Word et des systemes
~$*
.~lock.*
.DS_Store
Thumbs.db
"""

ROUGE = "\033[31m"
JAUNE = "\033[33m"
VERT = "\033[32m"
NEUTRE = "\033[0m"


def trouver_racine():
    """
    Remonte depuis l'emplacement de ce script jusqu'au dossier qui contient
    pom.xml. Permet de lancer le script depuis n'importe ou : double-clic
    dans IntelliJ, terminal ouvert dans _outils/, ou racine du projet.
    """
    for dossier in [Path(__file__).resolve().parent, *Path(__file__).resolve().parents]:
        if (dossier / "pom.xml").is_file():
            return dossier
    return None


def choisir_seance(manifeste):
    """Affiche les seances disponibles et demande laquelle livrer."""
    print("Seances disponibles :")
    print()
    for cle, entree in sorted(manifeste.items(), key=lambda c: int(c[0]) if c[0].isdigit() else 999):
        if not cle.isdigit():
            continue
        themes = ", ".join(entree["themes"]) if entree["themes"] else "(aucun exercice propre)"
        print(f"  {cle:>3}   {entree['nom']:<28} {themes}")
    print()

    if not sys.stdin.isatty():
        sys.exit(colore("Preciser le numero de seance en parametre.", ROUGE))

    reponse = input("Quelle seance livrer ? ").strip()
    if reponse != "0" and reponse not in manifeste:
        sys.exit(colore(f"Seance {reponse!r} absente de livraisons.json", ROUGE))
    print()
    return reponse


def colore(texte, couleur):
    return couleur + texte + NEUTRE if sys.stdout.isatty() else texte


def fichiers_java(dossier):
    """Tous les .java sous un dossier, en ignorant les repertoires techniques."""
    if not dossier.is_dir():
        return []
    trouves = []
    for chemin in sorted(dossier.rglob("*.java")):
        if IGNORES & set(chemin.parts):
            continue
        trouves.append(chemin)
    return trouves


def controler(themes, racine, sans_tests=frozenset()):
    """Renvoie (erreurs, avertissements).

    sans_tests : themes dont les exercices n'ont volontairement pas de
    classe de test. Une interface graphique ne se verifie pas par un test
    unitaire ; l'enonce decrit alors ce qu'il faut observer. Sans cette
    liste, le theme FX produirait huit avertissements a chaque livraison,
    et le bruit finirait par masquer un vrai probleme.
    """
    erreurs, avertissements = [], []

    for theme in themes:
        src_ex = racine / "exercices" / PAQUET_BASE / theme
        src_so = racine / "solutions" / PAQUET_BASE / theme
        src_te = racine / "exercices" / PAQUET_TEST / theme

        if not src_ex.is_dir():
            erreurs.append(f"[{theme}] absent de exercices/ : {src_ex}")
            continue

        # --- 1. fuite de solution ---------------------------------------
        for fichier in fichiers_java(src_ex):
            texte = fichier.read_text(encoding="utf-8")
            a_trou = ("UnsupportedOperationException" in texte
                      or re.search(r"\bTODO\b", texte))
            fournie = "FOURNI" in texte
            if not a_trou and not fournie:
                erreurs.append(
                    f"[{theme}] {fichier.relative_to(racine)} ne contient ni "
                    "UnsupportedOperationException ni TODO, et n'est pas marquee "
                    "FOURNIE. Corrige oublie dans l'arbre des enonces ?"
                )

        # --- 2. solution inachevee ---------------------------------------
        if src_so.is_dir():
            for fichier in fichiers_java(src_so):
                texte = fichier.read_text(encoding="utf-8")
                if "UnsupportedOperationException" in texte:
                    erreurs.append(
                        f"[{theme}] {fichier.relative_to(racine)} leve encore "
                        "UnsupportedOperationException : solution incomplete."
                    )
                if re.search(r"\bTODO\b", texte):
                    erreurs.append(
                        f"[{theme}] {fichier.relative_to(racine)} contient "
                        "encore un TODO."
                    )
            if not fichiers_java(src_so):
                erreurs.append(
                    f"[{theme}] le dossier solutions/ existe mais ne contient aucun "
                    "fichier : les corriges n'ont pas ete ecrits.")
        else:
            erreurs.append(f"[{theme}] aucune solution dans solutions/")

        # --- 3. tests manquants ----------------------------------------
        exercices = sorted(d.name for d in src_ex.iterdir() if d.is_dir())
        if theme not in sans_tests:
            for exercice in exercices:
                if not fichiers_java(src_te / exercice):
                    avertissements.append(
                        f"[{theme}] {exercice} n'a aucune classe de test"
                    )

    return erreurs, avertissements


def synchroniser_tests(themes, racine):
    """
    Recopie les classes de test de exercices/ vers solutions/, SUR LE DISQUE.

    Sans cela, le module solutions n'aurait aucun test et il serait impossible
    de verifier dans IntelliJ qu'une solution passe au vert avant de le publier.

    Les tests s'ecrivent donc UNIQUEMENT dans exercices/src/test. Toute
    modification faite du cote solutions/ sera ecrasee au prochain appel.
    """
    copies = []
    for theme in themes:
        source = racine / "exercices" / PAQUET_TEST / theme
        for fichier in fichiers_java(source):
            destination = racine / "solutions" / PAQUET_TEST / fichier.relative_to(
                racine / "exercices" / PAQUET_TEST)
            destination.parent.mkdir(parents=True, exist_ok=True)
            contenu = fichier.read_text(encoding="utf-8")
            if not destination.is_file() or destination.read_text(encoding="utf-8") != contenu:
                destination.write_text(contenu, encoding="utf-8")
                copies.append(destination.relative_to(racine))
    return copies


def collecter(themes, racine, solutions):
    """La liste des (fichier source, chemin relatif dans le projet etudiant)
    qui composent une livraison. Commune a l'archive et au depot public :
    les deux livrent donc exactement la meme chose."""
    module = "solutions" if solutions else "exercices"
    entrees = []

    for theme in themes:
        # Code source du module concerne.
        base = racine / module / PAQUET_BASE / theme
        for fichier in fichiers_java(base):
            entrees.append((fichier, fichier.relative_to(racine)))

        # Classes de test. Celles de l'etudiant vivent dans exercices/ et sont
        # recopiees vers solutions/ par synchroniser_tests. Pour l'archive des
        # solutions on prend donc directement le dossier solutions/, qui les
        # contient toutes — y compris les classes de test propres au corrige,
        # comme le modele de reponse d'un exercice ou c'est l'etudiant qui
        # doit ecrire les tests.
        # Ressources du theme : fichiers FXML, images, jeux de donnees.
        # Elles vivent a cote du code, dans src/main/resources, et suivent
        # le meme decoupage par theme. Sans elles, FX.9 ne se lancerait pas.
        ressources = racine / module / RESSOURCES / theme
        if ressources.is_dir():
            for fichier in sorted(ressources.rglob("*")):
                if fichier.is_file():
                    entrees.append((fichier, Path(module) / fichier.relative_to(racine / module)))

        source_tests = "solutions" if solutions else "exercices"
        tests = racine / source_tests / PAQUET_TEST / theme
        for fichier in fichiers_java(tests):
            destination = Path(module) / fichier.relative_to(racine / source_tests)
            entrees.append((fichier, destination))

        # Demonstrations du cours. Elles ne partent qu'avec les SOLUTIONS :
        # l'interet d'une demo est dans sa construction en direct, et la
        # publier avant la seance la viderait de son sens. Apres coup, elle
        # vaut un corrige de plus.
        if solutions:
            # Sources principales ET classes de test : la demonstration du
            # theme JUN construit une classe de test en direct, et la livrer
            # sans elle n'aurait aucun sens.
            for dossier in (racine / "demos" / PAQUET_DEMO / theme,
                            racine / "demos" / PAQUET_DEMO_TEST / theme):
                for fichier in fichiers_java(dossier):
                    if "slides" in fichier.relative_to(dossier).parts:
                        continue          # deja livre avec la seance, ci-dessous
                    entrees.append((fichier, fichier.relative_to(racine)))

        # Le code des slides (demo/<theme>/slides) n'est pas un corrige : c'est
        # le code montre au cours. Il part avec la seance, solutions ou non
        # (decision du 14/10/2026).
        for dossier in (racine / "demos" / PAQUET_DEMO / theme / "slides",
                        racine / "demos" / PAQUET_DEMO_TEST / theme / "slides"):
            for fichier in fichiers_java(dossier):
                entrees.append((fichier, fichier.relative_to(racine)))
        # les ressources du code des slides (vues FXML du theme FX)
        vues = racine / "demos" / "src" / "main" / "resources" / "be" / "ephec" / "java" / "demo" / theme / "slides"
        if vues.is_dir():
            for fichier in sorted(vues.rglob("*")):
                if fichier.is_file():
                    entrees.append((fichier, fichier.relative_to(racine)))

    return entrees


def construire(themes, racine, sortie, solutions):
    """Fabrique une archive. Renvoie la liste des chemins qu'elle contient."""
    entrees = collecter(themes, racine, solutions)
    if not solutions:
        # Le README annonce un fascicule par theme dans enonces/ : l'archive
        # le livre donc avec le code, comme le depot public.
        entrees += fascicules(themes, racine)[0]
    ecrire_archive(entrees, sortie)
    return [str(Path(RACINE_ARCHIVE) / r) for _, r in entrees]


def ecrire_archive(entrees, sortie):
    """Ecrit les entrees dans un zip, sous le dossier racine ExercicesJava/.
    Une entree peut etre un fichier, ou du texte deja pret (pom filtre,
    .gitignore etudiant)."""
    sortie.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(sortie, "w", zipfile.ZIP_DEFLATED) as archive:
        for source, relatif in entrees:
            nom = str(Path(RACINE_ARCHIVE) / relatif)
            if isinstance(source, str):
                archive.writestr(nom, source)
            else:
                archive.write(source, nom)


# ----------------------------------------------------------------------------
#  La seance 0 : le projet de depart
# ----------------------------------------------------------------------------

def pom_etudiant(racine):
    """Le pom parent, sans le module _travail.

    Le bac a sable des demonstrations n'existe pas chez l'etudiant. Laisser
    sa declaration ferait echouer Maven a l'ouverture du projet : un module
    declare doit exister."""
    texte = (racine / "pom.xml").read_text(encoding="utf-8")
    lignes = [l for l in texte.splitlines(keepends=True)
              if "<module>_travail</module>" not in l]
    texte = "".join(lignes).replace(
        "exercices, solutions, demos, _travail   -->",
        "exercices, solutions, demos             -->")
    if "_travail" in texte:
        sys.exit(colore("Le pom parent cite encore _travail apres filtrage : "
                        "adapter pom_etudiant() a sa nouvelle forme.", ROUGE))
    return texte


def readme_etudiant(racine):
    """README_publiable.md, verifie : il ne doit citer ni les depots de
    travail ni les dossiers du professeur."""
    fichier = racine / README_PUBLIABLE
    if not fichier.is_file():
        sys.exit(colore(f"{README_PUBLIABLE} introuvable a la racine du projet : "
                        "c'est lui qui devient le README de l'etudiant.", ROUGE))
    texte = fichier.read_text(encoding="utf-8")
    trouves = [mot for mot in MOTS_PRIVES if mot in texte]
    if trouves:
        sys.exit(colore(f"{README_PUBLIABLE} cite {', '.join(trouves)} : ce sont "
                        "des noms du projet de travail. Rien n'a ete produit.", ROUGE))
    return texte


def collecter_depart(racine):
    """Les entrees du projet de depart, dans le meme format que collecter()."""
    entrees = [(pom_etudiant(racine), Path("pom.xml")),
               (GITIGNORE_ETUDIANT, Path(".gitignore")),
               (readme_etudiant(racine), Path("README.md"))]
    for element in PROJET_DE_DEPART:
        chemin = racine / element
        if chemin.is_dir():
            for fichier in sorted(chemin.rglob("*")):
                if fichier.is_file() and not (IGNORES & set(fichier.parts)) \
                        and not fichier.name.startswith(("~$", ".~lock")) \
                        and not fichier.name.endswith(".avant"):
                    entrees.append((fichier, fichier.relative_to(racine)))
        elif chemin.is_file():
            entrees.append((chemin, Path(element)))
        else:
            sys.exit(colore(f"Projet de depart : {element} introuvable.", ROUGE))
    return entrees


def fascicules(themes, racine):
    """Les fascicules d'enonces des themes, livres avec le code : dans
    l'archive des enonces comme dans le depot public. Un theme sans fascicule
    (REC, tant qu'il n'est pas ecrit) est simplement signale."""
    entrees, absents = [], []
    for theme in themes:
        fichier = racine / "enonces" / f"{theme.upper()}_enonces.docx"
        if fichier.is_file():
            entrees.append((fichier, fichier.relative_to(racine)))
        else:
            absents.append(theme.upper())
    return entrees, absents


# ----------------------------------------------------------------------------
#  Le depot public
# ----------------------------------------------------------------------------

def git(depot, *arguments):
    resultat = subprocess.run(["git", "-C", str(depot), *arguments],
                              capture_output=True, text=True)
    return resultat.returncode, resultat.stdout.strip()


def controler_depot(depot, racine):
    """Refuse tout dossier qui ne peut pas etre le clone du depot public."""
    if not depot.is_dir():
        sys.exit(colore(f"Depot public introuvable : {depot}\n"
                        "Clonez-le d'abord a cet endroit, ou donnez son "
                        "chemin apres --depot.", ROUGE))
    if not (depot / ".git").exists():
        sys.exit(colore(f"{depot} n'est pas un depot Git.", ROUGE))
    if depot == racine or racine in depot.parents or depot in racine.parents:
        sys.exit(colore("Le depot public ne peut ni etre le projet prive, ni "
                        "le contenir, ni s'y trouver.", ROUGE))
    code, origine = git(depot, "remote", "get-url", "origin")
    if code != 0:
        print(colore("  avertissement  ", JAUNE) +
              f"{depot.name} n'a pas d'origine : impossible de verifier "
              "qu'il s'agit bien du depot public.")
    elif "claude" in origine.lower():
        sys.exit(colore(f"L'origine de {depot} est {origine} : c'est un depot "
                        "PRIVE. Rien n'a ete copie.", ROUGE))
    else:
        print(f"Depot public : {depot}  ({origine})")


def deposer(entrees, depot):
    """Copie les entrees dans le depot. Ne supprime jamais rien.
    Renvoie (ajoutes, modifies)."""
    ajoutes, modifies = [], []
    for source, relatif in entrees:
        if any(partie.startswith("_") for partie in relatif.parts):
            sys.exit(colore(f"{relatif} est un dossier prive (prefixe _) : "
                            "refus de le publier.", ROUGE))
        contenu = source.encode("utf-8") if isinstance(source, str) \
            else source.read_bytes()
        cible = depot / relatif
        if cible.is_file():
            if cible.read_bytes() == contenu:
                continue
            modifies.append(relatif)
        else:
            ajoutes.append(relatif)
        cible.parent.mkdir(parents=True, exist_ok=True)
        cible.write_bytes(contenu)
    return ajoutes, modifies


def fuites_dans_depot(depot):
    """Reverifie tout exercices/src/main du depot public, quelle que soit la
    seance : la regle de controler(), appliquee a ce qui est REELLEMENT
    publie."""
    fautifs = []
    for fichier in fichiers_java(depot / "exercices" / "src" / "main"):
        texte = fichier.read_text(encoding="utf-8")
        if not ("UnsupportedOperationException" in texte
                or re.search(r"\bTODO\b", texte) or "FOURNI" in texte):
            fautifs.append(fichier.relative_to(depot))
    return fautifs


def publier(entrees, depot, message):
    """Depose, reverifie, et dit quoi faire ensuite."""
    ajoutes, modifies = deposer(entrees, depot)

    for chemin in ajoutes:
        print(f"  ajoute         {chemin}")
    for chemin in modifies:
        print(colore("  REMPLACE       ", JAUNE) + str(chemin))
    if modifies:
        print()
        print(colore("  Des fichiers deja publies changent. Un etudiant qui les "
                     "a modifies aura un conflit au prochain pull : annoncez "
                     "le correctif sur le forum, en nommant les fichiers.", JAUNE))
    if not ajoutes and not modifies:
        print("  rien de neuf : le depot public est deja a jour.")
        return

    fautifs = fuites_dans_depot(depot)
    if fautifs:
        print()
        for chemin in fautifs:
            print(colore("  ERREUR         ", ROUGE) +
                  f"{chemin} ressemble a un corrige.")
        sys.exit(colore("Fuite possible dans le depot public : NE PAS "
                        "commiter. Retirer ou corriger le(s) fichier(s) "
                        "signale(s), puis relancer le script.", ROUGE))

    # Chemin et message entre guillemets si besoin : les dossiers du
    # professeur contiennent des espaces, et la commande doit pouvoir etre
    # copiee-collee telle quelle dans le terminal.
    chemin = shlex.quote(str(depot))
    print()
    print(colore("Depot public pret. Relire, puis :", VERT))
    print(f"    git -C {chemin} status")
    print(f"    git -C {chemin} add -A")
    print(f"    git -C {chemin} commit -m {shlex.quote(message)}")
    print(f"    git -C {chemin} {commande_push(depot)}")


def commande_push(depot):
    """Le premier push d'un depot neuf doit lier la branche locale a celle
    de GitHub (-u). Ensuite, un simple push suffit."""
    code, _ = git(depot, "rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{u}")
    if code == 0:
        return "push"
    _, branche = git(depot, "branch", "--show-current")
    return f"push -u origin {branche or 'main'}"


def main():
    analyseur = argparse.ArgumentParser(description="Fabrique les archives d'une seance.")
    analyseur.add_argument("seance", nargs="?", default=None,
                           help="numero de seance, 0 pour le projet de depart ; "
                                "demande interactivement si omis")
    analyseur.add_argument("--enonces", action="store_true", help="seulement l'archive des enonces")
    analyseur.add_argument("--solutions", action="store_true", help="seulement l'archive des solutions")
    analyseur.add_argument("--verifier", action="store_true", help="controler sans rien produire")
    analyseur.add_argument("--racine", default=None,
                           help="racine du projet ; detectee automatiquement si omise")
    analyseur.add_argument("--depot", nargs="?", const="", default=None, metavar="CHEMIN",
                           help="deposer aussi dans le clone local du depot public ; "
                                "sans chemin, celui de \"depot_public\" dans livraisons.json")
    args = analyseur.parse_args()

    racine = Path(args.racine).resolve() if args.racine else trouver_racine()
    if racine is None or not (racine / "pom.xml").is_file():
        sys.exit(colore(
            "Racine du projet introuvable : aucun pom.xml au-dessus de "
            f"{Path(__file__).resolve().parent}", ROUGE))

    print(f"Projet : {racine}")

    manifeste = json.loads((racine / "_outils" / "livraisons.json").read_text(encoding="utf-8"))
    sans_tests = frozenset(manifeste.get("sans_tests", []))

    depot = None
    if args.depot is not None:
        chemin = args.depot or manifeste.get("depot_public")
        if not chemin:
            sys.exit(colore("--depot sans chemin, et pas de \"depot_public\" dans "
                            "livraisons.json.", ROUGE))
        depot = (racine / chemin).resolve()   # un chemin absolu reste absolu
        controler_depot(depot, racine)
    print()

    seance = args.seance if args.seance is not None else choisir_seance(manifeste)

    # --- seance 0 : le projet de depart ------------------------------------
    if seance == "0":
        entrees = collecter_depart(racine)
        if args.verifier:
            print(colore(f"Projet de depart : {len(entrees)} fichiers, controles passes.", VERT))
            return
        sortie = racine / "livraisons" / "Seance00_ExercicesJava.zip"
        ecrire_archive(entrees, sortie)
        print(f"{sortie.relative_to(racine)}  ({len(entrees)} fichiers)")
        for _, relatif in entrees:
            print(f"    {Path(RACINE_ARCHIVE) / relatif}")
        print()
        if depot:
            publier(entrees, depot, "Seance 00 - projet de depart")
        return

    if seance not in manifeste:
        sys.exit(colore(f"Seance {seance} absente de livraisons.json", ROUGE))

    entree = manifeste[seance]
    themes = entree["themes"]
    if not themes:
        print(f"Seance {seance} ({entree['nom']}) : aucun theme a livrer.")
        return

    print(f"Seance {seance} — themes : {', '.join(themes)}")
    print()

    for chemin in synchroniser_tests(themes, racine):
        print(f"  test recopie    {chemin}")

    erreurs, avertissements = controler(themes, racine, sans_tests)

    for message in avertissements:
        print(colore("  avertissement  ", JAUNE) + message)
    for message in erreurs:
        print(colore("  ERREUR         ", ROUGE) + message)

    if erreurs:
        print()
        sys.exit(colore(f"{len(erreurs)} erreur(s) : aucune archive produite.", ROUGE))

    if avertissements:
        print()
    print(colore("Controles passes.", VERT))
    print()

    if args.verifier:
        return

    faire_enonces = args.enonces or not args.solutions
    faire_solutions = args.solutions or not args.enonces

    for solutions, suffixe in ((False, "exercices"), (True, "solutions")):
        if solutions and not faire_solutions:
            continue
        if not solutions and not faire_enonces:
            continue

        sortie = racine / "livraisons" / f"{entree['nom']}_{suffixe}.zip"
        contenu = construire(themes, racine, sortie, solutions)

        print(f"{sortie.relative_to(racine)}  ({len(contenu)} fichiers)")
        for chemin in contenu:
            print(f"    {chemin}")
        print()

    if not depot:
        return

    # --- le depot public ----------------------------------------------------
    # Les corriges n'y partent QUE sur demande explicite : sans --solutions,
    # seuls les enonces sont deposes, meme si les deux archives ont ete faites.
    numero = f"{int(seance):02d}"
    if args.solutions:
        entrees = collecter(themes, racine, solutions=True)
        message = f"Seance {numero} - corriges ({', '.join(t.upper() for t in themes)})"
    else:
        entrees = collecter(themes, racine, solutions=False)
        docs, absents = fascicules(themes, racine)
        entrees += docs
        for theme in absents:
            print(colore("  avertissement  ", JAUNE) + f"pas de fascicule {theme}_enonces.docx")
        message = f"Seance {numero} - enonces ({', '.join(t.upper() for t in themes)})"
        print(colore("Depot public : enonces seulement (ajouter --solutions pour "
                     "les corriges).", JAUNE))
    publier(entrees, depot, message)


if __name__ == "__main__":
    main()
