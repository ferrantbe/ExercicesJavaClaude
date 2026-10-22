#!/usr/bin/env python3
"""
verifier_squelettes.py — controle que les classes de test compileront.

    python3 __outils/verifier_squelettes.py
    python3 __outils/verifier_squelettes.py enu/e03      # un package en particulier
    python3 __outils/verifier_squelettes.py --detail     # ce que chaque classe declare

Le script retrouve la racine du projet en remontant jusqu'au pom.xml depuis sa
propre position, et affiche le chemin qu'il analyse. Le dossier courant n'a
donc aucune importance, et une copie du projet posee ailleurs ne peut pas etre
analysee par erreur.

Le probleme qu'il previent
--------------------------
Une classe de test qui appelle une methode ou un constructeur que le squelette
ne declare PAS ne compile pas. Et comme tout le source root de test se compile
d'un bloc, une seule classe fautive empeche l'etudiant de lancer le moindre
test — y compris ceux d'un exercice sans rapport, fait trois semaines plus tot.

La regle qui en decoule : le squelette declare TOUT, avec un corps qui leve
UnsupportedOperationException. Seuls les corps sont laisses a l'etudiant.

Ce que le script sait faire
---------------------------
Il resout le TYPE du receveur de chaque appel, et verifie la methode sur cette
classe-la — pas seulement quelque part dans le package. Une methode declaree
dans Value ne satisfait donc pas un appel sur Color.

Il resout un receveur qui est :
  - une variable locale du test          Color c = ...;  c.getLibelle()
  - un new                               new Card(v, c).getValue()
  - un appel a une methode du test       couleur("PIQUE").getLibelle()
  - un appel statique                    Color.values()
  - un chainage d'un niveau              jeu.carteA(0).getValue()

Il tient compte de l'heritage et des interfaces a l'interieur du package, des
composants de record dont les accesseurs sont generes, et il ignore les
commentaires — un « TODO : ecrivez getLibelle() » ne compte pas comme une
declaration.

Quand un type ne peut pas etre resolu, le script le dit au lieu de faire
semblant : mieux vaut un avertissement qu'un faux vert.

L'option --detail affiche, package par package, ce que chaque classe declare
reellement. C'est le moyen le plus rapide de comprendre un signalement qui
semble faux.
"""

import re
import sys
from pathlib import Path

def racine_du_projet():
    """
    Remonte depuis l'emplacement de ce script jusqu'au dossier qui contient
    pom.xml. Le script fonctionne donc depuis n'importe ou, et surtout il ne
    risque pas d'analyser une AUTRE copie du projet parce qu'on l'a lance
    depuis le mauvais dossier — ce qui donne des signalements incomprehensibles.
    """
    for dossier in [Path(__file__).resolve().parent, *Path(__file__).resolve().parents]:
        if (dossier / "pom.xml").is_file():
            return dossier
    return None


RACINE = racine_du_projet()
EXERCICES = (RACINE / "exercices/src/main/java") if RACINE else None
TESTS = (RACINE / "exercices/src/test/java") if RACINE else None

CONNUS = {
    "values", "valueOf", "ordinal", "name", "equals", "hashCode", "toString",
    "length", "size", "add", "get", "put", "contains", "split", "startsWith",
    "endsWith", "substring", "format", "isEmpty", "clone", "asList", "of",
    "getClass", "getDeclaredFields", "getDeclaredField", "getDeclaredMethod",
    "getModifiers", "getName", "getType", "getRecordComponents",
    "getDeclaredConstructor", "newInstance", "forName",
    "isPublic", "isPrivate", "isAbstract",
    "assertEquals", "assertTrue", "assertFalse", "assertSame", "assertNotNull",
    "assertNotEquals", "assertArrayEquals", "assertThrows", "assertDoesNotThrow",
    "fail", "deepEquals",
    "now", "getYear", "between", "parse", "atStartOfDay", "plusDays",
    "plusMonths", "plusWeeks", "getDays", "getMonths", "getYears",
    "toHours", "toMinutes", "toMinutesPart",
    "nextInt", "nextBoolean", "shuffle", "append", "replace", "trim",
    "printf", "println", "setInt",
    # heritees de Throwable, ou fournies par Class
    "getMessage", "getCause", "getStackTrace", "printStackTrace", "getLocalizedMessage",
    "isAssignableFrom", "isInstance", "getSimpleName", "getSuperclass", "isEnum",
    "getDeclaredMethods", "getDeclaredConstructors", "isAnnotationPresent",
    "getAnnotation", "matches", "toUpperCase", "toLowerCase", "join",
}

MOTS_CLES = {
    "return", "new", "if", "else", "for", "while", "switch", "case", "throw",
    "throws", "catch", "try", "do", "assert", "break", "continue", "instanceof",
    "public", "private", "protected", "static", "final", "abstract", "class",
    "interface", "enum", "record", "extends", "implements", "package", "import",
    "synchronized", "native", "default", "this", "super",
}

# Un CHAMP : un type, un nom, puis un point-virgule ou une affectation.
# Le script ne s'en occupait pas — il ne cherchait que les appels de
# methode. Un test qui lit une constante passait donc inapercu, et le
# squelette ne compilait pas. C'est arrive sur STA.1.
CHAMP = re.compile(
    r"(?:^|[;{}])\s*"
    r"(?:@\w+(?:\([^)]*\))?\s+)*"
    r"(?:(?:public|protected|private|static|final|transient|volatile)\s+)*"
    r"[\w.$]+(?:\s*<[^>]*>)?(?:\s*\[\s*\])*"
    r"\s+([a-zA-Z_]\w*)\s*(?:=[^;]*)?;",
    re.M)

DECLARATION = re.compile(
    r"(?:^|[;{}\s])"
    r"(?:@\w+(?:\([^)]*\))?\s+)*"
    r"(?:(?:public|protected|private|static|final|abstract|synchronized|native|default)\s+)*"
    r"([\w.$]+(?:\s*<[^>]*>)?(?:\s*\[\s*\])*)"
    r"\s+([a-zA-Z_]\w*)\s*\("
)


def sans_commentaires(source):
    source = re.sub(r"/\*.*?\*/", "", source, flags=re.S)
    return re.sub(r"//[^\n]*", "", source)


class Classe:
    def __init__(self, nom):
        self.nom = nom
        self.methodes = {}
        self.champs = set()
        self.parents = []
        self.constructeur_a_arguments = False

    def _remonter(self, index):
        vus, pile = set(), [self]
        while pile:
            courante = pile.pop()
            if courante.nom in vus:
                continue
            vus.add(courante.nom)
            yield courante
            pile += [index[p] for p in courante.parents if p in index]

    def herite_hors_index(self, index):
        """Vrai si la classe herite d'un type que le script ne connait pas."""
        return any(parent not in index
                   for c in self._remonter(index) for parent in c.parents)

    def declare_champ(self, champ, index):
        return any(champ in c.champs for c in self._remonter(index))

    def declare(self, methode, index):
        if any(methode in c.methodes for c in self._remonter(index)):
            return True
        # Si la classe descend d'un type du JDK — Exception, Thread... — le
        # script ne peut pas savoir ce que ce parent apporte. Il se tait
        # plutot que de signaler a tort.
        return self.herite_hors_index(index)

    def retour(self, methode, index):
        for c in self._remonter(index):
            if methode in c.methodes:
                return c.methodes[methode]
        return None


def base_de(typ):
    return typ.strip().split("<")[0].replace("[]", "").replace("[ ]", "").split(".")[-1].strip()


def indexer(dossier):
    """Indexe les classes d'un exercice, SOUS-PACKAGES COMPRIS.

    PKG.5 repartit ses classes entre pkg.e05.base et pkg.e05.derive :
    c'est le sujet de l'exercice. Un parcours a plat ne les verrait pas,
    et tous les appels seraient rapportes comme non verifiables.
    """
    index = {}
    for fichier in sorted(dossier.rglob("*.java")):
        source = sans_commentaires(fichier.read_text(encoding="utf-8"))
        nom = fichier.stem
        classe = Classe(nom)

        entete = re.search(
            r"\b(class|interface|enum|record)\s+" + nom + r"\s*(\([^)]*\))?([^{]*)\{",
            source)
        if entete:
            if entete.group(1) == "record":
                composants = (entete.group(2) or "()")[1:-1]
                for composant in composants.split(","):
                    morceaux = composant.split()
                    if len(morceaux) >= 2:
                        classe.methodes[morceaux[-1]] = morceaux[-2]
                classe.constructeur_a_arguments = bool(composants.strip())
            for parent in re.findall(r"[\w.]+", entete.group(3) or ""):
                if parent not in ("extends", "implements"):
                    classe.parents.append(parent.split(".")[-1])

        for retour, methode in DECLARATION.findall(source):
            retour = retour.strip()
            if methode in MOTS_CLES or retour in MOTS_CLES:
                continue
            if methode == nom:
                continue
            classe.methodes.setdefault(methode, retour)

        for champ in CHAMP.findall(source):
            if champ not in MOTS_CLES:
                classe.champs.add(champ)

        # Les constantes d'une enumeration sont des champs implicites.
        if entete and entete.group(1) == "enum":
            corps = source[entete.end():]
            fin = corps.find(";")
            for valeur in re.findall(r"\b([A-Z][A-Z0-9_]*)\s*(?:\(|,|;|$)",
                                     corps[:fin if fin != -1 else len(corps)]):
                classe.champs.add(valeur)

        if re.search(r"(?:^|[;{}\s])" + nom + r"\s*\(\s*[^)\s]", source):
            classe.constructeur_a_arguments = True

        index[nom] = classe
    return index


def contexte_du_test(source, index):
    variables = {}
    for typ, ident in re.findall(
            r"\b([A-Z][\w.$]*(?:<[^>]*>)?(?:\s*\[\s*\])?)\s+([a-z]\w*)\s*[=;),]", source):
        if base_de(typ) in index:
            variables[ident] = base_de(typ)

    aides = {}
    for retour, methode in DECLARATION.findall(source):
        if base_de(retour) in index and methode not in MOTS_CLES:
            aides[methode] = base_de(retour)
    return variables, aides


def resoudre(receveur, variables, aides, index):
    receveur = receveur.strip()

    m = re.search(r"new\s+([A-Z]\w*)\s*\([^()]*\)\s*$", receveur)
    if m and m.group(1) in index:
        return m.group(1), None

    m = re.search(r"([A-Za-z_]\w*)\s*\([^()]*\)\s*$", receveur)
    if m:
        appel = m.group(1)
        if appel in aides:
            return aides[appel], None
        avant = receveur[:m.start()].rstrip().rstrip(".")
        if avant:
            typ, _ = resoudre(avant, variables, aides, index)
            if typ and typ in index:
                retour = index[typ].retour(appel, index)
                if retour:
                    if base_de(retour) in index:
                        return base_de(retour), None
                    # La methode rend un type du JDK — List, String, Optional...
                    # Le script ne connait pas ses membres et se tait.
                    return None, None
        return None, f"type rendu par {appel}() inconnu"

    m = re.search(r"([A-Za-z_]\w*)\s*(?:\[[^\]]*\])?\s*$", receveur)
    if m:
        ident = m.group(1)
        if ident in index:
            return ident, None
        if ident in variables:
            return variables[ident], None
        return None, f"type de « {ident} » inconnu"

    return None, "receveur non reconnu"


def verifier(test, index):
    source = sans_commentaires(test.read_text(encoding="utf-8"))
    variables, aides = contexte_du_test(source, index)
    erreurs, doutes, champs_absents = [], [], []

    # Les types importes depuis le JDK sont hors perimetre : leurs membres
    # ne sont pas a declarer dans un squelette. Sans cette liste, un appel
    # a Modifier.isStatic() serait rapporte comme non verifiable.
    du_jdk = set(re.findall(r"^import\s+(?:static\s+)?(?:java|javafx)\.[\w.]*?(\w+);",
                            source, re.M))

    for m in re.finditer(r"([^\s;{}()\"]*(?:\([^()]*\))?)\s*\.\s*([a-z]\w*)\s*\(", source):
        receveur, methode = m.group(1), m.group(2)
        if methode in CONNUS or not receveur:
            continue
        if base_de(receveur) in du_jdk:
            continue
        typ, souci = resoudre(receveur, variables, aides, index)
        if typ is None:
            if souci is None:
                continue          # receveur d'un type du JDK : hors perimetre
            if any(c.declare(methode, index) for c in index.values()):
                continue
            doutes.append((methode, souci))
        elif not index[typ].declare(methode, index):
            erreurs.append((typ, methode))

    # Les acces a un CHAMP : Reservation.PLACES_MAX, capteur.nom.
    # Sans ce controle, un squelette qui declare toutes ses methodes mais
    # oublie une constante passe l'inspection et ne compile pas.
    # Une ligne « package be.ephec.java.fic.e01; » ressemble a une suite
    # d'acces a des champs. On les ecarte avant de chercher.
    sans_entete = re.sub(r"^\s*(?:package|import)[^;]*;", "", source, flags=re.M)

    for m in re.finditer(r"\b([A-Za-z_]\w*)\s*\.\s*([A-Za-z_]\w*)\b(?![\s]*[(.])",
                         sans_entete):
        receveur, champ = m.group(1), m.group(2)
        if champ in CONNUS or receveur in du_jdk or champ == "class":
            continue
        typ = receveur if receveur in index else variables.get(receveur)
        if typ is None or typ not in index:
            continue
        if index[typ].herite_hors_index(index):
            continue
        if not index[typ].declare_champ(champ, index) and not index[typ].declare(champ, index):
            champs_absents.append((typ, champ))

    for classe, arguments in re.findall(r"new\s+([A-Z]\w*)\s*\(([^)]*)\)", source):
        if classe in index and arguments.strip() and not index[classe].constructeur_a_arguments:
            erreurs.append((classe, None))

    return erreurs, doutes, champs_absents


def main():
    if RACINE is None:
        sys.exit("Racine du projet introuvable : aucun pom.xml au-dessus de "
                 f"{Path(__file__).resolve().parent}")
    if not TESTS.is_dir():
        sys.exit(f"{TESTS} n'existe pas : structure de projet inattendue")

    print(f"Projet : {RACINE}")
    detail = "--detail" in sys.argv
    filtres = [a for a in sys.argv[1:] if not a.startswith("--")]
    problemes = 0

    for test in sorted(TESTS.rglob("*.java")):
        relatif = test.parent.relative_to(TESTS)
        if filtres and not any(f in str(relatif) for f in filtres):
            continue

        dossier = EXERCICES / relatif
        if not dossier.is_dir():
            print(f"{relatif}/{test.name} : aucun package d'exercice correspondant")
            problemes += 1
            continue

        index = indexer(dossier)

        if detail:
            print(f"\n{relatif}")
            for nom, classe in sorted(index.items()):
                liste = ", ".join(sorted(classe.methodes)) or "(aucune methode)"
                print(f"   {nom:<16}{liste}")

        erreurs, doutes, champs_absents = verifier(test, index)

        for typ, methode in sorted(set(erreurs), key=lambda x: (x[0], x[1] or "")):
            problemes += 1
            print(f"\n{relatif}/{test.name}")
            if methode is None:
                print(f"   la classe {typ} n'a pas de constructeur a arguments")
            else:
                print(f"   la classe {typ} n'a pas de methode {methode}()")
                print(f"   {typ} declare : "
                      + (", ".join(sorted(index[typ].methodes)) or "(rien)"))

        for typ, champ in sorted(set(champs_absents)):
            problemes += 1
            print(f"\n{relatif}/{test.name}")
            print(f"   la classe {typ} n'a pas de champ {champ}")
            print(f"   {typ} declare : "
                  + (", ".join(sorted(index[typ].champs)) or "(aucun champ)"))

        for methode, souci in sorted(set(doutes)):
            problemes += 1
            print(f"\n{relatif}/{test.name}")
            print(f"   appel a {methode}() non verifie — {souci}")

    print()
    if problemes:
        print(f"{problemes} probleme(s). Declarez ces membres dans les squelettes.")
        print("Une methode recoit un corps qui leve UnsupportedOperationException ;")
        print("un champ, lui, doit etre declare avec une valeur — il ne peut rien lever.")
        sys.exit(1)
    print("Tous les appels des classes de test sont declares dans les squelettes.")


if __name__ == "__main__":
    main()
