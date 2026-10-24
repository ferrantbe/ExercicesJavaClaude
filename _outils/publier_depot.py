#!/usr/bin/env python3
"""
publier_depot.py — construit l'historique du depot PUBLIC ExercicesJava a
partir des archives de _moodle/archives/, un commit par etape de publication.

    python3 _outils/publier_depot.py                 etat : etapes, commits, pousses
    python3 _outils/publier_depot.py --construire    rejoue les etapes non encore
                                                     poussees dans le clone local
    python3 _outils/publier_depot.py --construire --sans-fin
                                                     n'y met que les debuts (les
                                                     corriges restent sur Moodle)
    python3 _outils/publier_depot.py --construire --repartir-de-zero
                                                     historique neuf (branche
                                                     orpheline) ; a n'utiliser
                                                     que tant que personne n'a
                                                     clone : le push sera force

Le clone local du depot public est celui de "depot_public" dans
livraisons.json (ou --depot CHEMIN). Le script COMMITE dans ce clone, mais ne
POUSSE jamais : il affiche la commande de push pour chaque etape, et c'est le
professeur qui pousse, au moment ou il ouvre le module sur Moodle.

------------------------------------------------------------------------------
PRINCIPE
------------------------------------------------------------------------------
Les archives de _moodle/archives/ sont ce que les etudiants recoivent par
Moodle. Chaque commit du depot public contient EXACTEMENT une archive, dans
l'ordre de publication (ETAPES ci-dessous) : Git et Moodle donnent donc la
meme chose, au meme moment. L'archive Module00 fait le premier commit et
rafraichit le README et le pom a chaque reconstruction.

Un etudiant qui travaille par Git fait « commit puis pull » a chaque module :
une etape n'ajoute que de nouveaux packages (ou des fichiers hors de
exercices/), donc le pull ne touche pas a ce qu'il a ecrit.

L'historique est lineaire : on ne peut pousser l'etape N+1 sans avoir pousse
l'etape N. Si l'ordre reel differe (par exemple la fin de TMP publiee apres
le debut de TAB), on change ETAPES et on relance --construire : ce qui est
deja pousse est conserve tel quel, le reste est reconstruit.

Ce qui est pousse (origin/main) est immuable. --construire remet le clone
local a origin/main et rejoue les etapes suivantes. Les etapes sont reconnues
dans l'historique par leur code entre crochets en fin de message, [02d].

Comme livrer.py, le script refuse un clone dont l'origine est un depot
...Claude, et reverifie exercices/ du depot public apres chaque etape : un
corrige qui y traine fait echouer la construction.
------------------------------------------------------------------------------
"""

import argparse
import json
import re
import sys
import tempfile
import zipfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import livrer   # noqa: E402  (controler_depot, deposer, fuites_dans_depot, git, couleurs)

ARCHIVES = Path("_moodle") / "archives"

# L'ordre de publication. Code, archive, message. Le code est la cle : il
# sert a reconnaitre l'etape dans l'historique et a designer un push.
#   NNd  debut du module NN (enonces, fascicule, code des slides, depart des demos)
#   NNf  fin du module NN (corriges, demos completes)
# REC serie 1 se fait chez soi apres la seance 9 (JUN, module 11) et sa
# serie 2 apres la seance 12 (FX, module 14) : les deux series sont inserees
# a ces endroits. Changer l'ordre ici suffit, puis relancer --construire.
ETAPES = [
    ("00",  "Module00_ExercicesJava.zip",   "Module00 - projet de depart"),
    ("02d", "Module02_POO_debut.zip",       "Module02 POO - debut"),
    ("02f", "Module02_POO_fin.zip",         "Module02 POO - fin"),
    ("03d", "Module03_TMP_debut.zip",       "Module03 TMP - debut"),
    ("03f", "Module03_TMP_fin.zip",         "Module03 TMP - fin"),
    ("04d", "Module04_TAB_debut.zip",       "Module04 TAB - debut"),
    ("04f", "Module04_TAB_fin.zip",         "Module04 TAB - fin"),
    ("05d", "Module05_ENU_debut.zip",       "Module05 ENU - debut"),
    ("05f", "Module05_ENU_fin.zip",         "Module05 ENU - fin"),
    ("06d", "Module06_ABS_debut.zip",       "Module06 ABS - debut"),
    ("06f", "Module06_ABS_fin.zip",         "Module06 ABS - fin"),
    ("07d", "Module07_ITF_debut.zip",       "Module07 ITF - debut"),
    ("07f", "Module07_ITF_fin.zip",         "Module07 ITF - fin"),
    ("08d", "Module08_PKG_debut.zip",       "Module08 PKG - debut"),
    ("08f", "Module08_PKG_fin.zip",         "Module08 PKG - fin"),
    ("09d", "Module09_COL_debut.zip",       "Module09 COL - debut"),
    ("09f", "Module09_COL_fin.zip",         "Module09 COL - fin"),
    ("10d", "Module10_EXC_debut.zip",       "Module10 EXC - debut"),
    ("10f", "Module10_EXC_fin.zip",         "Module10 EXC - fin"),
    ("11d", "Module11_JUN_debut.zip",       "Module11 JUN - debut"),
    ("11f", "Module11_JUN_fin.zip",         "Module11 JUN - fin"),
    ("16.1d", "Module16_REC_serie1_debut.zip", "Module16 REC serie 1 - debut"),
    ("16.1f", "Module16_REC_serie1_fin.zip",   "Module16 REC serie 1 - fin"),
    ("12d", "Module12_GEN_debut.zip",       "Module12 GEN - debut"),
    ("12f", "Module12_GEN_fin.zip",         "Module12 GEN - fin"),
    ("13d", "Module13_LAM_debut.zip",       "Module13 LAM - debut"),
    ("13f", "Module13_LAM_fin.zip",         "Module13 LAM - fin"),
    ("14d", "Module14_FX_debut.zip",        "Module14 FX - debut"),
    ("14f", "Module14_FX_fin.zip",          "Module14 FX - fin"),
    ("16.2d", "Module16_REC_serie2_debut.zip", "Module16 REC serie 2 - debut"),
    ("16.2f", "Module16_REC_serie2_fin.zip",   "Module16 REC serie 2 - fin"),
    ("15d", "Module15_FIC_debut.zip",       "Module15 FIC - debut"),
    ("15f", "Module15_FIC_fin.zip",         "Module15 FIC - fin"),
]

MARQUE = re.compile(r"\[([0-9.]+[df]?)\]$")


def colore(texte, couleur):
    return livrer.colore(texte, couleur)


def etapes_retenues(sans_fin):
    return [e for e in ETAPES if not (sans_fin and e[0].endswith("f"))]


def message_commit(code, message):
    return f"{message} [{code}]"


def codes_dans(depot, reference):
    """Les codes d'etape presents dans l'historique de la reference, du plus
    ancien au plus recent. None si la reference n'existe pas."""
    code, sortie = livrer.git(depot, "log", "--reverse", "--format=%H %s", reference)
    if code != 0:
        return None
    commits = []
    for ligne in sortie.splitlines():
        sha, _, sujet = ligne.partition(" ")
        trouve = MARQUE.search(sujet)
        commits.append((sha, trouve.group(1) if trouve else None, sujet))
    return commits


def extraire(archive, depot):
    """Depose le contenu de l'archive (sans son dossier racine ExercicesJava/)
    dans le depot, par livrer.deposer : rien n'est jamais supprime, et un
    dossier prive (prefixe _) est refuse."""
    with tempfile.TemporaryDirectory() as tmp:
        with zipfile.ZipFile(archive) as zf:
            zf.extractall(tmp)
        racine = Path(tmp) / livrer.RACINE_ARCHIVE
        if not racine.is_dir():
            sys.exit(colore(f"{archive.name} ne contient pas de dossier "
                            f"{livrer.RACINE_ARCHIVE}/.", livrer.ROUGE))
        entrees = [(f, f.relative_to(racine)) for f in sorted(racine.rglob("*")) if f.is_file()]
        return livrer.deposer(entrees, depot)


def construire(depot, racine, etapes, repartir_de_zero):
    code, sale = livrer.git(depot, "status", "--porcelain")
    if sale:
        sys.exit(colore("Le clone public a des modifications non commitees : "
                        "rangez-les (ou git reset --hard) avant de construire.",
                        livrer.ROUGE))

    _, branche = livrer.git(depot, "branch", "--show-current")
    branche = branche or "main"
    pousses = codes_dans(depot, f"origin/{branche}")

    if repartir_de_zero:
        livrer.git(depot, "checkout", "--orphan", "_reconstruction")
        livrer.git(depot, "rm", "-rfq", "--cached", ".")
        # on vide l'arbre de travail : seules les archives doivent y rester
        for chemin in sorted(depot.rglob("*"), reverse=True):
            if ".git" in chemin.parts:
                continue
            if chemin.is_file():
                chemin.unlink()
            elif chemin.is_dir() and not any(chemin.iterdir()):
                chemin.rmdir()
        deja = []
        print(colore("Historique neuf : toutes les etapes sont rejouees ; le "
                     "push devra etre force.", livrer.JAUNE))
    else:
        if pousses is None:
            # depot vide sur GitHub : on part de zero sans forcer
            deja = []
            livrer.git(depot, "checkout", "-B", branche)
        else:
            etrangers = [s for s, c, _ in pousses if c is None]
            if etrangers:
                sys.exit(colore(f"origin/{branche} contient {len(etrangers)} commit(s) qui ne "
                                "viennent pas de ce script. Si personne n'a encore "
                                "clone le depot, relancez avec --repartir-de-zero ; "
                                "sinon ces commits restent et les etapes viennent "
                                "a la suite (retirez ce controle).", livrer.ROUGE))
            deja = [c for _, c, _ in pousses]
            livrer.git(depot, "checkout", "-B", branche, f"origin/{branche}")
            print(f"Remise a origin/{branche} : {len(deja)} etape(s) deja poussee(s), conservee(s).")

    attendus = [e[0] for e in etapes]
    if deja and deja != attendus[:len(deja)]:
        sys.exit(colore("L'ordre deja pousse ne correspond pas a ETAPES : "
                        f"pousse {deja}, attendu {attendus[:len(deja)]}. "
                        "Alignez ETAPES sur ce qui est public.", livrer.ROUGE))

    restantes = etapes[len(deja):]
    if not restantes:
        print("Tout est deja pousse : rien a construire.")
        return

    for code, nom, message in restantes:
        archive = racine / ARCHIVES / nom
        if not archive.is_file():
            sys.exit(colore(f"Archive absente : {archive.relative_to(racine)} "
                            f"(python3 _outils/livrer.py ... puis copie dans "
                            f"{ARCHIVES}).", livrer.ROUGE))
        ajoutes, modifies = extraire(archive, depot)
        fautifs = livrer.fuites_dans_depot(depot)
        if fautifs:
            for chemin in fautifs:
                print(colore("  ERREUR         ", livrer.ROUGE) + f"{chemin} ressemble a un corrige.")
            sys.exit(colore(f"Fuite possible a l'etape {code} : rien n'est commite, "
                            "le clone reste a corriger.", livrer.ROUGE))
        if not ajoutes and not modifies:
            print(colore(f"  {code:6} rien de neuf dans {nom} : etape sans commit", livrer.JAUNE))
            continue
        livrer.git(depot, "add", "-A")
        rc, sortie = livrer.git(depot, "commit", "-q", "-m", message_commit(code, message))
        if rc != 0:
            sys.exit(colore(f"git commit a echoue a l'etape {code} :\n{sortie}", livrer.ROUGE))
        _, sha = livrer.git(depot, "rev-parse", "--short", "HEAD")
        detail = f"{len(ajoutes)} ajoute(s)" + (f", {len(modifies)} remplace(s)" if modifies else "")
        print(f"  {code:6} {sha}  {message:32} {detail}")

    if repartir_de_zero:
        livrer.git(depot, "branch", "-D", branche)
        livrer.git(depot, "branch", "-m", branche)
    print()


def etat(depot, etapes):
    _, branche = livrer.git(depot, "branch", "--show-current")
    branche = branche or "main"
    locaux = codes_dans(depot, branche) or []
    pousses = codes_dans(depot, f"origin/{branche}") or []
    par_code = {c: s for s, c, _ in locaux if c}
    codes_pousses = {c for _, c, _ in pousses if c}
    etrangers = [s for s, c, _ in pousses if c is None]
    if etrangers:
        print(colore(f"  {len(etrangers)} commit(s) sur origin/{branche} hors etapes "
                     f"(ex. {etrangers[0][:7]})", livrer.JAUNE))
    print(f"  {'etape':6} {'commit':8} {'etat':10} archive")
    prochain = None
    for code, nom, _ in etapes:
        sha = par_code.get(code)
        if code in codes_pousses:
            situation, couleur = "pousse", livrer.VERT
        elif sha:
            situation, couleur = "a pousser", livrer.JAUNE
            prochain = prochain or (code, sha)
        else:
            situation, couleur = "-", livrer.NEUTRE
        print(f"  {code:6} {(sha or '')[:7]:8} " + colore(f"{situation:10}", couleur) + f" {nom}")
    print()
    if prochain:
        code, sha = prochain
        chemin = str(depot)
        print(colore(f"Prochaine etape a publier : {code}", livrer.VERT))
        force = " --force" if etrangers or (pousses and [c for _, c, _ in pousses] != [c for _, c, _ in locaux][:len(pousses)]) else ""
        print(f"    git -C '{chemin}' push{force} origin {sha[:7]}:refs/heads/{branche}")
        print("(une etape plus loin : meme commande avec son commit ; "
              "tout ce qui reste d'un coup : git push" + (" --force" if force else "") + ")")


def main():
    analyseur = argparse.ArgumentParser(description="Historique du depot public a partir des archives.")
    analyseur.add_argument("--construire", action="store_true",
                           help="rejouer les etapes non poussees dans le clone local")
    analyseur.add_argument("--sans-fin", action="store_true",
                           help="ne publier que les debuts de module (pas les corriges)")
    analyseur.add_argument("--repartir-de-zero", action="store_true",
                           help="historique neuf ; push force ensuite")
    analyseur.add_argument("--depot", default=None, metavar="CHEMIN",
                           help="clone local du depot public (sinon livraisons.json)")
    analyseur.add_argument("--racine", default=None)
    args = analyseur.parse_args()

    racine = Path(args.racine).resolve() if args.racine else livrer.trouver_racine()
    if racine is None:
        sys.exit(colore("Racine du projet introuvable.", livrer.ROUGE))
    manifeste = json.loads((racine / "_outils" / "livraisons.json").read_text(encoding="utf-8"))
    chemin = args.depot or manifeste.get("depot_public")
    if not chemin:
        sys.exit(colore("Pas de depot_public dans livraisons.json et pas de --depot.", livrer.ROUGE))
    depot = (racine / chemin).resolve()
    livrer.controler_depot(depot, racine)
    livrer.git(depot, "fetch", "-q", "origin")
    print()

    etapes = etapes_retenues(args.sans_fin)
    if args.construire:
        construire(depot, racine, etapes, args.repartir_de_zero)
    etat(depot, etapes)


if __name__ == "__main__":
    main()
