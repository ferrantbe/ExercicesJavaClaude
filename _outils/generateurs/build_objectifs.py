#!/usr/bin/env python3
"""Construit Objectifs_et_couverture.xlsx — organise par module, avec MoSCoW."""

from pathlib import Path
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter
from openpyxl.worksheet.datavalidation import DataValidation

POLICE = "Arial"
ACCENT = "1F4E79"
ENTETE = PatternFill("solid", fgColor="DEEAF6")
TITRE = PatternFill("solid", fgColor="1F4E79")
ALERTE = PatternFill("solid", fgColor="FCE4E4")
DOUX = PatternFill("solid", fgColor="F2F2F2")
JAUNE = PatternFill("solid", fgColor="FFF2CC")
VERT = PatternFill("solid", fgColor="D9E7D2")
ORANGE = PatternFill("solid", fgColor="FBE9D5")
BORDURE = Border(*[Side(style="thin", color="BFBFBF")] * 4)
MOSCOW = "Must,Should,Could,Won't"

wb = Workbook()


def teinte(valeur):
    return VERT if valeur == "Must" else (ORANGE if valeur in ("Could", "Won't") else JAUNE)


def titre_de_feuille(ws, texte, sous, largeur):
    ws.merge_cells(start_row=1, start_column=1, end_row=1, end_column=largeur)
    c = ws.cell(1, 1, texte)
    c.font = Font(name=POLICE, size=14, bold=True, color="FFFFFF")
    c.fill = TITRE
    c.alignment = Alignment(vertical="center", indent=1)
    ws.row_dimensions[1].height = 26
    ws.merge_cells(start_row=2, start_column=1, end_row=2, end_column=largeur)
    c = ws.cell(2, 1, sous)
    c.font = Font(name=POLICE, size=9, italic=True, color="595959")
    c.alignment = Alignment(vertical="center", indent=1)
    ws.row_dimensions[2].height = 18


def entetes(ws, ligne, valeurs, largeurs):
    for i, (v, l) in enumerate(zip(valeurs, largeurs), start=1):
        c = ws.cell(ligne, i, v)
        c.font = Font(name=POLICE, size=10, bold=True, color=ACCENT)
        c.fill = ENTETE
        c.border = BORDURE
        c.alignment = Alignment(vertical="center", wrap_text=True, horizontal="center")
        ws.column_dimensions[get_column_letter(i)].width = l
    ws.row_dimensions[ligne].height = 32


def note(ws, ligne, texte, gras=False):
    c = ws.cell(ligne, 1, texte)
    c.font = Font(name=POLICE, size=9, italic=not gras, bold=gras,
                  color=ACCENT if gras else "595959")


# =====================================================================
#  1. Objectifs de l'examen
# =====================================================================
OBJECTIFS = [
    ("A", "Concevoir, installer et utiliser des objets appropriés à la solution", ""),
    ("A.1", "", "Pouvoir définir et implémenter des classes et des objets Java simples"),
    ("A.2", "", "Pouvoir compléter des classes Java implémentées par un tiers"),
    ("A.3", "", "Pouvoir utiliser et interagir avec des classes et objets Java existants"),
    ("A.4", "", "Pouvoir dériver de nouvelles classes par héritage d'une classe Java existante"),
    ("A.5", "", "Pouvoir utiliser les classes du JDK pour accéder à des fichiers et pour réaliser "
               "une application disposant d'une interface graphique simple (JavaFX)"),
    ("A.6", "", "Pouvoir démontrer, au travers d'un exercice simple, sa compréhension du concept "
               "et du fonctionnement des expressions lambda introduites par Java 8"),
    ("B", "Concevoir et mettre en œuvre une procédure de test partiel et intégré", ""),
    ("B.1", "", "Pouvoir implémenter des classes de test simples (JUnit) sur base d'une classe "
               "implémentée par un tiers et/ou de spécifications techniques"),
    ("B.2", "", "Pouvoir implémenter des classes et objets Java simples et les classes de test "
               "correspondantes"),
    ("B.3", "", "Pouvoir, par l'exécution d'une batterie de tests (JUnit) implémentée par un tiers, "
               "repérer et débugger des problèmes simples dans des classes Java implémentées "
               "par un tiers"),
    ("C", "Justifier sa méthode de résolution ainsi que ses choix conceptuels et méthodologiques", ""),
    ("C.1", "", "Pouvoir justifier les choix de types d'attributs, d'appartenance des attributs et "
               "méthodes à l'une ou l'autre classe, et des interfaces de communication entre classes"),
    ("C.2", "", "Pouvoir justifier ses choix quant aux tests implémentés"),
]

MAITRISE = [
    ("D.1", "La rigueur et le respect des spécificités du langage de programmation utilisé"),
    ("D.2", "Le style de programmation"),
    ("D.3", "L'adéquation et la pertinence de la solution développée"),
    ("D.4", "Le respect du temps alloué"),
    ("D.5", "La clarté et la précision dans l'utilisation du vocabulaire technique"),
    ("D.6", "L'utilisation de commentaires dans les codes, facilitant sa lecture"),
    ("D.7", "L'utilisation de commentaires Javadoc appropriés"),
    ("D.8", "Le degré d'autonomie atteint"),
    ("D.9", "L'utilisation appropriée des mécanismes d'héritage, de l'encapsulation "
            "public/protected/private, de renvoi de résultat vs modification de l'état interne"),
    ("D.10", "La correspondance exacte de la solution à l'énoncé initial"),
    ("D.11", "La correction du code, absence de bugs"),
    ("D.12", "La capacité à utiliser la documentation (javadoc) pour comprendre les "
             "spécifications d'objets du JDK"),
]

QUESTION = {"A.1": "Q1, Q2, Q4", "A.2": "Q3, Q4", "A.3": "Q2", "A.4": "Q4",
            "A.5": "Q5", "A.6": "—", "B.1": "Q3", "B.2": "Q3", "B.3": "Q3",
            "C.1": "toutes", "C.2": "Q3"}

ws = wb.active
ws.title = "Objectifs examen"
titre_de_feuille(ws, "Objectifs de l'unité d'enseignement",
                 "Recopiés des deux premières pages de l'examen de juin 2025. "
                 "Ce sont eux qui font foi.", 3)
entetes(ws, 4, ["Code", "Compétence / objectif", "Question d'examen"], [10, 95, 20])

ligne = 5
for code, competence, objectif in OBJECTIFS:
    est_titre = not objectif
    for col, val in ((1, code), (2, competence or objectif), (3, QUESTION.get(code, ""))):
        c = ws.cell(ligne, col, val)
        c.font = Font(name=POLICE, size=10, bold=est_titre,
                      color=ACCENT if est_titre else "000000")
        c.border = BORDURE
        c.alignment = Alignment(wrap_text=(col == 2), vertical="top",
                                horizontal="center" if col == 3 else "left",
                                indent=2 if (col == 2 and not est_titre) else 0)
        if est_titre:
            c.fill = DOUX
    ws.row_dimensions[ligne].height = 20 if est_titre else 30
    ligne += 1

ligne += 1
note(ws, ligne, "Critères du degré de maîtrise — transversaux", gras=True)
ligne += 2
for code, texte in MAITRISE:
    for col, val in ((1, code), (2, texte), (3, "toutes")):
        c = ws.cell(ligne, col, val)
        c.font = Font(name=POLICE, size=10)
        c.border = BORDURE
        c.alignment = Alignment(wrap_text=(col == 2), vertical="top",
                                horizontal="center" if col == 3 else "left")
    ws.row_dimensions[ligne].height = 26
    ligne += 1
ws.freeze_panes = "A5"

# =====================================================================
#  2. Modules
# =====================================================================
def compter_sur_le_disque():
    """Les trois colonnes qui derivaient : exercices, tests, renvois.

    Elles etaient ecrites a la main dans MODULES, et huit themes sur
    quinze avaient fini par mentir — un exercice ajoute ici, un renvoi
    la, et personne pour tenir le compte.

    On les compte donc a la generation : les packages sur le disque, les
    classes de test, et les codes de memento presents dans le fascicule
    deja produit. Les valeurs de MODULES servent de secours quand un
    fascicule n'existe pas encore.
    """
    import re
    import zipfile

    racine = Path(__file__).resolve().parent.parent.parent
    exercices = racine / "exercices/src/main/java/be/ephec/java"
    tests = racine / "exercices/src/test/java/be/ephec/java"

    mesure = {}
    if not exercices.is_dir():
        return mesure

    for theme in sorted(exercices.iterdir()):
        if not theme.is_dir():
            continue
        code = theme.name.upper()
        nb_ex = sum(1 for d in theme.iterdir()
                    if d.is_dir() and re.fullmatch(r"e\d+", d.name))
        dossier_test = tests / theme.name
        nb_test = (len(list(dossier_test.rglob("*Test.java")))
                   if dossier_test.is_dir() else 0)

        fascicule = racine / "enonces" / f"{code}_enonces.docx"
        nb_renvois = None
        if fascicule.is_file():
            xml = zipfile.ZipFile(fascicule).read("word/document.xml").decode("utf-8")
            nb_renvois = len(set(re.findall(r"(?:CC|TEC)-[A-Z]{2,4}\.\d+", xml)))

        mesure[code] = (nb_ex, nb_test, nb_renvois)
    return mesure


MESURE = compter_sur_le_disque()

MODULES = [
    # code, titre, moscow, decks, exercices, tests, fascicule, démo, renvois, état
    ("POO", "Classes, objets et encapsulation", "Must", "01", 5, 4, "oui", "écrite", 7, "livré"),
    ("STA", "static : constantes, champs et méthodes de classe", "Should", "04", 2, 2,
     "oui", "écrite", 5, "livré"),
    ("TMP", "Dates et heures", "Should", "02", 6, 6, "oui", "écrite", 3, "livré"),
    ("PKG", "Packages et visibilité", "Must", "02", 4, 4, "oui", "écrite", 3, "livré"),
    ("TAB", "Tableaux, boucles, ternaire", "Should", "02", 4, 4, "oui", "écrite", 3, "livré"),
    ("ENU", "Énumérations et records", "Should", "02", 4, 4, "oui", "écrite", 0, "livré"),
    ("ABS", "Classes abstraites", "Must", "03", 5, 5, "oui", "écrite", 2, "livré"),
    ("ITF", "Interfaces", "Must", "03", 4, 4, "oui", "écrite", 2, "livré"),
    ("COL", "Collections", "Must", "05", 7, 7, "oui", "écrite", 2, "livré"),
    ("EXC", "Exceptions", "Must", "06", 5, 5, "oui", "écrite", 2, "livré"),
    ("JUN", "Tests unitaires JUnit", "Must", "07", 3, 3, "oui", "écrite", 2, "livré"),
    ("GEN", "Types génériques", "Should", "08a", 6, 6, "oui", "écrite", 2, "livré"),
    ("LAM", "Lambdas et références de méthodes", "Must", "08b", 3, 3, "oui", "écrite", 1, "livré"),
    ("FX", "JavaFX et gestion d'événements", "Must", "09, 10, 11", 9, 0, "oui", "écrite", 3,
     "livré — sans classes de test, par nature"),
    ("FIC", "Fichiers", "Must", "12", 3, 3, "oui", "écrite", 1, "livré — passé Must le 11/10 : vaut un sixième de l'examen"),
    ("REC", "Exercices récapitulatifs", "Could", "13", 0, 0, "non", "—", 0,
     "examen d'une année précédente + récapitulatifs à écrire"),
    ("THR", "Threads", "Won't", "99", 0, 0, "non", "—", 0, "en suspens"),
    ("GAM", "Fil rouge GameHub", "Could", "01, 02, 03, 04, 06", 30, 3, "oui", "—", 2,
     "G.1 à G.30 — tout est corrigé sauf G.10, remplacé"),
]

ws2 = wb.create_sheet("Modules")
titre_de_feuille(ws2, "Les modules, leur priorité et leurs supports",
                 "Organisés par module et non par séance : la répartition dans le calendrier se "
                 "décide ailleurs, dans outils/livraisons.json, sans renommer un seul package.", 11)
entetes(ws2, 4, ["Module", "Titre", "MoSCoW", "Deck(s)", "Exercices", "Tests",
                 "Fascicule", "Démo de code", "Renvois mémento", "État", "Trous"],
        [9, 40, 10, 12, 11, 8, 11, 14, 16, 32, 9])

val_moscow_mod = DataValidation(type="list", formula1=f'"{MOSCOW}"', allow_blank=True,
                                showDropDown=False)
ws2.add_data_validation(val_moscow_mod)

ligne = 5
premier_module = ligne
for code, titre, moscow, decks, exos, tests, fasc, demo, renvois, etat in MODULES:
    # Le disque a toujours raison sur ces trois colonnes.
    if code in MESURE:
        vus_exos, vus_tests, vus_renvois = MESURE[code]
        exos, tests = vus_exos, vus_tests
        if vus_renvois is not None:
            renvois = vus_renvois
    for i, v in enumerate([code, titre, moscow, decks, exos, tests, fasc, demo, renvois, etat],
                          start=1):
        c = ws2.cell(ligne, i, v)
        rouge = isinstance(v, str) and v in ("à écrire", "non", "à faire")
        c.font = Font(name=POLICE, size=10, bold=(i == 1),
                      color="9C2B2B" if (rouge and i in (4, 7, 8, 9)) else "000000")
        c.border = BORDURE
        c.alignment = Alignment(horizontal="left" if i in (2, 10) else "center",
                                vertical="center", wrap_text=(i in (2, 10)))
    ws2.cell(ligne, 3).fill = teinte(moscow)
    val_moscow_mod.add(ws2.cell(ligne, 3))
    c = ws2.cell(ligne, 11,
                 f'=COUNTIF(G{ligne}:H{ligne},"non")+COUNTIF(G{ligne}:H{ligne},"à écrire")'
                 f'+IF(I{ligne}=0,1,0)')
    c.font = Font(name=POLICE, size=10, bold=True)
    c.border = BORDURE
    c.alignment = Alignment(horizontal="center")
    ws2.row_dimensions[ligne].height = 24
    ligne += 1

dernier_module = ligne - 1
for i in range(1, 12):
    ws2.cell(ligne, i).fill = ENTETE
    ws2.cell(ligne, i).border = BORDURE
ws2.cell(ligne, 1, "TOTAL").font = Font(name=POLICE, size=10, bold=True, color=ACCENT)
for col in (5, 6, 11):
    c = ws2.cell(ligne, col,
                 f"=SUM({get_column_letter(col)}{premier_module}:"
                 f"{get_column_letter(col)}{dernier_module})")
    c.font = Font(name=POLICE, size=10, bold=True, color=ACCENT)
    c.alignment = Alignment(horizontal="center")

ws2.freeze_panes = "B5"
ws2.auto_filter.ref = f"A4:K{dernier_module}"

ligne += 2
note(ws2, ligne, "Comment lire", gras=True)
for texte in [
    "MoSCoW du module : ce qu'on garde si l'année dérape, ce qu'on ajoute s'il reste du temps.",
    "« Démo de code » : un exemple construit en direct dans IntelliJ pendant le cours. Elles vivent "
    "dans le module demos/, et leur scénario dans _demos/. Douze sur seize existent.",
    "« Renvois mémento » : nombre de règles du mémento Clean Code citées dans le fascicule. Dix-sept des trente-quatre règles sont citées au moins une fois.",
    "La colonne Trous compte les supports absents : fascicule, démo de code, et un zéro de renvois.",
]:
    ligne += 1
    note(ws2, ligne, texte)

# =====================================================================
#  3. Exercices
# =====================================================================
EXERCICES = [
    ("POO", "POO.1", "Classe Personne, champs publics", "Must", "A.1", "livré"),
    ("POO", "POO.2", "Encapsulation, la question du champ age", "Must", "A.1", "livré"),
    ("POO", "POO.3", "Supprimer la donnée redondante", "Should", "C.1", "livré"),
    ("POO", "POO.4", "Passage de paramètres, valeur et référence", "Must", "C.1", "livré"),
    ("POO", "POO.5", "Séparer le calcul du dialogue", "Should", "C.1", "livré"),
    ("STA", "STA.1", "Constantes et compteur d'instances", "Should", "A.1", "livré"),
    ("STA", "STA.2", "Méthode statique et fabrique", "Could", "C.1", "livré"),
    ("TMP", "TMP.1", "Mesurer un écart entre deux dates", "Should", "A.3", "livré"),
    ("TMP", "TMP.2", "Les dates sont immuables", "Must", "A.3", "livré"),
    ("TMP", "TMP.3", "Compter des secondes : date ou instant", "Could", "A.3", "livré"),
    ("TMP", "TMP.4", "L'arithmétique des mois", "Could", "A.3", "livré"),
    ("TMP", "TMP.5", "Period ou Duration", "Should", "A.3", "livré"),
    ("TMP", "TMP.6", "Formater et analyser une date", "Could", "A.3", "livré"),
    ("PKG", "PKG.1", "Ce que voit une classe du même package", "Must", "A.1", "livré"),
    ("PKG", "PKG.2", "Ce que voit une classe d'un autre package", "Must", "C.1", "livré"),
    ("PKG", "PKG.3", "Réduire la surface publique", "Should", "C.1", "livré"),
    ("PKG", "PKG.4", "Découper un programme en packages", "Could", "C.1", "livré"),
    ("PKG", "PKG.5", "protected, après l'héritage", "Could", "A.4", "livré"),
    ("TAB", "TAB.1", "Une matrice carrée", "Should", "A.1", "livré"),
    ("TAB", "TAB.2", "Le triangle de Pascal", "Could", "A.1", "livré"),
    ("TAB", "TAB.3", "L'opérateur ternaire", "Could", "D.2", "livré"),
    ("TAB", "TAB.4", "Des objets qui se connaissent", "Must", "C.1", "livré"),
    ("ENU", "ENU.1", "Un feu de signalisation", "Must", "A.1", "livré"),
    ("ENU", "ENU.2", "Une température, deux unités", "Should", "A.1", "livré"),
    ("ENU", "ENU.3", "Un jeu de cartes", "Should", "A.1", "livré"),
    ("ENU", "ENU.4", "Un record d'étudiant", "Should", "A.1", "livré"),
    ("ABS", "ABS.1", "Des formes géométriques", "Must", "A.4", "livré"),
    ("ABS", "ABS.2", "Des animaux qui font du bruit", "Should", "A.4", "livré"),
    ("ABS", "ABS.3", "Deux banques, un seul traitement", "Must", "A.2", "livré"),
    ("ABS", "ABS.4", "Hiérarchie Personnel (ancien exercice 21)", "Should", "A.4", "livré"),
    ("ABS", "ABS.5", "Tout écrire, à partir de rien — sans squelette", "Should", "A.4", "livré"),
    ("ITF", "ITF.1", "Une interface et deux implémentations", "Must", "A.1", "livré"),
    ("ITF", "ITF.2", "Payer en ligne", "Should", "C.1", "livré"),
    ("ITF", "ITF.3", "Des formes qui se déplacent et tournent", "Should", "A.4", "livré"),
    ("ITF", "ITF.4", "Prévenir sans connaître (Observateur)", "Could", "C.1", "livré"),
    ("COL", "COL.1", "Deux façons d'être trié", "Must", "A.3", "livré"),
    ("COL", "COL.2", "Un annuaire", "Must", "A.3", "livré"),
    ("COL", "COL.3", "Lire des noms et les trier", "Should", "A.3", "livré"),
    ("COL", "COL.4", "Compter les mots d'un texte", "Must", "A.3", "livré"),
    ("COL", "COL.5", "Filtrer avec un prédicat", "Should", "A.6", "livré"),
    ("COL", "COL.6", "Un ensemble sans doublons", "Should", "A.3", "livré"),
    ("COL", "COL.7", "Une table de collections", "Could", "C.1", "livré"),
    ("EXC", "EXC.1", "Lever sa propre exception", "Must", "A.1", "livré"),
    ("EXC", "EXC.2", "Un compte, sans exception", "Should", "A.1", "livré"),
    ("EXC", "EXC.3", "Un numéro de compte vérifié", "Must", "C.1", "livré"),
    ("EXC", "EXC.4", "Provoquer, puis traiter", "Must", "A.3", "livré"),
    ("EXC", "EXC.5", "Lire une trace", "Should", "B.3", "livré"),
    ("JUN", "JUN.1", "Le test comme spécification", "Must", "B.3", "livré"),
    ("JUN", "JUN.2", "Détecter un défaut", "Must", "B.1", "livré"),
    ("JUN", "JUN.3", "Écrire une classe de test", "Must", "B.2", "livré"),
    ("GEN", "GEN.1", "Une paire, un seul type", "Must", "A.1", "livré"),
    ("GEN", "GEN.2", "Un couple, deux types", "Should", "A.1", "livré"),
    ("GEN", "GEN.3", "Deux sortes de triplets", "Could", "A.1", "livré"),
    ("GEN", "GEN.4", "Le joker", "Could", "A.4", "livré"),
    ("GEN", "GEN.5", "Une méthode générique", "Should", "A.1", "livré"),
    ("GEN", "GEN.6", "Hériter d'une classe générique", "Could", "A.4", "livré"),
    ("LAM", "LAM.1", "Un tableau de comportements", "Must", "A.6", "livré"),
    ("LAM", "LAM.2", "Écrire son interface fonctionnelle", "Must", "A.6", "livré"),
    ("LAM", "LAM.3", "Celle du JDK, et les références de méthodes", "Must", "A.6", "livré"),
    ("FX", "FX.1", "Un compteur de participants (ex. 47)", "Must", "A.5", "livré"),
    ("FX", "FX.2", "Un bouton Reset (ex. 48)", "Must", "A.5", "livré"),
    ("FX", "FX.3", "Deux compteurs et une mise en page (ex. 49)", "Should", "A.5", "livré"),
    ("FX", "FX.4", "Compter au clavier, touches 1, 2 et 0 (ex. 50)", "Must", "A.5", "livré"),
    ("FX", "FX.5", "Filtre, gestionnaires et consume (ex. 46)", "Should", "A.5", "livré"),
    ("FX", "FX.6", "Écouter la propriété d'un TextField (ex. 51)", "Should", "A.5", "livré"),
    ("FX", "FX.7", "Un Slider et un Label qui suit (ex. 52)", "Could", "A.5", "livré"),
    ("FX", "FX.8", "Lier plutôt qu'écouter : bindings", "Could", "A.5", "livré"),
    ("FX", "FX.9", "Une calculatrice, en MVC et FXML", "Should", "A.5", "livré"),

    ("FX", "FX.10", "Le guichet : threads et Platform.runLater", "Won't", "A.5", "hors examen"),

    ("FIC", "FIC.1", "Trois classes qui se connaissent", "Must", "A.1", "livré"),
    ("FIC", "FIC.2", "Enregistrer des objets", "Must", "A.5", "livré"),
    ("FIC", "FIC.3", "Enregistrer du texte", "Must", "A.5", "livré"),
    ("REC", "REC.*", "Récapitulatifs — format et place à décider", "Could", "A.1", "en attente"),
    ("GAM", "G.1–G.9", "Le modèle : joueur, partie, énumérations, record", "Should", "A.1", "corrigé"),
    ("GAM", "G.10–G.13", "Classe abstraite et patron Observateur", "Should", "A.4", "corrigé"),
    ("GAM", "G.14–G.20", "Interface Jeu, fabrique, Nim, stratégies", "Must", "C.1", "corrigé"),
    ("GAM", "G.21–G.27", "Le jeu de bataille", "Could", "A.3", "corrigé"),

    ("GAM", "G.21", "Un jeu qui se joue seul", "Should", "C.1", "corrigé"),
    ("GAM", "G.22", "Un jeu qui ouvre une fenêtre", "Could", "A.5", "corrigé"),
]

ws3 = wb.create_sheet("Exercices")
titre_de_feuille(ws3, "Les exercices, un par ligne",
                 "Colonne MoSCoW modifiable : elle dit quoi retirer si le temps manque, "
                 "et quoi ajouter s'il en reste.", 6)
entetes(ws3, 4, ["Module", "Code", "Intitulé", "MoSCoW", "Objectif examen", "État"],
        [9, 11, 54, 11, 16, 24])

val_moscow_ex = DataValidation(type="list", formula1=f'"{MOSCOW}"', allow_blank=True,
                               showDropDown=False)
ws3.add_data_validation(val_moscow_ex)

ligne = 5
premiere_ex = ligne
for module, code, titre, moscow, objectif, etat in EXERCICES:
    for i, v in enumerate([module, code, titre, moscow, objectif, etat], start=1):
        c = ws3.cell(ligne, i, v)
        c.font = Font(name=POLICE, size=10, bold=(i == 2),
                      color="9C2B2B" if (i == 6 and v != "livré") else "000000")
        c.border = BORDURE
        c.alignment = Alignment(horizontal="left" if i == 3 else "center", vertical="center")
    ws3.cell(ligne, 4).fill = teinte(moscow)
    val_moscow_ex.add(ws3.cell(ligne, 4))
    if etat != "livré":
        ws3.cell(ligne, 6).fill = ALERTE
    ligne += 1

derniere_ex = ligne - 1
ws3.freeze_panes = "C5"
ws3.auto_filter.ref = f"A4:F{derniere_ex}"

ligne += 1
note(ws3, ligne, "Combien d'exercices selon le scénario", gras=True)
ligne += 2
for etiquette, formule in [
    ("Must seuls", f'=COUNTIF($D${premiere_ex}:$D${derniere_ex},"Must")'),
    ("Must + Should", f'=COUNTIF($D${premiere_ex}:$D${derniere_ex},"Must")'
                      f'+COUNTIF($D${premiere_ex}:$D${derniere_ex},"Should")'),
    ("Tout sauf les Won't", f'=COUNTA($D${premiere_ex}:$D${derniere_ex})'
                            f"""-COUNTIF($D${premiere_ex}:$D${derniere_ex},"Won't")"""),
    ("Déjà livrés", f'=COUNTIF($F${premiere_ex}:$F${derniere_ex},"livré")'),
    ("Restant à écrire", f'=COUNTIF($F${premiere_ex}:$F${derniere_ex},"à écrire")'),
]:
    c = ws3.cell(ligne, 1, etiquette)
    c.font = Font(name=POLICE, size=10)
    c.border = BORDURE
    ws3.cell(ligne, 2).border = BORDURE
    c = ws3.cell(ligne, 2, formule)
    c.font = Font(name=POLICE, size=10, bold=True)
    c.alignment = Alignment(horizontal="center")
    ligne += 1

ligne += 1
note(ws3, ligne, "REC compte pour une seule ligne : son format n'est pas arrêté.")

# =====================================================================
#  4. Objectifs par module
# =====================================================================
APPRENTISSAGE = [
    ("POO", "POO.a", "Déclarer une classe, ses champs et ses méthodes", "A.1", "POO.1"),
    ("POO", "POO.b", "Encapsuler : private, accesseurs, invariants", "A.1", "POO.2, POO.3"),
    ("POO", "POO.c", "Éliminer une donnée redondante en la calculant", "C.1", "POO.3"),
    ("POO", "POO.d", "Distinguer passage d'un primitif et d'une référence", "C.1", "POO.4"),
    ("POO", "POO.e", "Séparer le noyau calculatoire du dialogue utilisateur", "C.1", "POO.5"),
    ("STA", "STA.a", "Distinguer ce qui appartient à la classe de ce qui appartient à l'objet", "A.1", "STA.1"),
    ("STA", "STA.b", "Déclarer une constante et savoir où la placer", "C.1", "STA.1"),
    ("STA", "STA.c", "Écrire une méthode statique et une fabrique", "C.1", "STA.2"),
    ("TMP", "TMP.a", "Construire une date et mesurer un écart", "A.3", "TMP.1"),
    ("TMP", "TMP.b", "Comprendre l'immuabilité des objets du JDK", "A.3", "TMP.2"),
    ("TMP", "TMP.c", "Distinguer une date d'un instant", "A.3", "TMP.3"),
    ("TMP", "TMP.d", "Maîtriser l'arithmétique du calendrier", "A.3", "TMP.4"),
    ("TMP", "TMP.e", "Choisir entre Period et Duration", "A.3", "TMP.5"),
    ("TMP", "TMP.f", "Formater et analyser une date, et connaître les pièges", "A.3", "TMP.6"),
    ("PKG", "PKG.a", "Connaître les niveaux de visibilité et leur portée", "A.1", "PKG.1, PKG.2"),
    ("PKG", "PKG.b", "Justifier un accesseur plutôt qu'un champ public", "C.1", "PKG.2"),
    ("PKG", "PKG.c", "Réduire la surface publique d'une classe", "C.1", "PKG.3"),
    ("PKG", "PKG.d", "Organiser un programme en packages et lire ses dépendances", "C.1", "PKG.4"),
    ("PKG", "PKG.e", "Compléter une hiérarchie autour d'une classe fournie, "
     "en composant avec ses visibilités", "A.2", "PKG.5"),
    ("TAB", "TAB.a", "Parcourir un tableau à deux dimensions", "A.1", "TAB.1"),
    ("TAB", "TAB.b", "Construire un tableau non rectangulaire", "A.1", "TAB.2"),
    ("TAB", "TAB.c", "Employer l'opérateur ternaire à bon escient", "D.2", "TAB.3"),
    ("TAB", "TAB.d", "Faire collaborer plusieurs classes, gérer un tableau fixe", "C.1", "TAB.4"),
    ("ENU", "ENU.a", "Déclarer une énumération et exploiter l'ordre des constantes", "A.1", "ENU.1"),
    ("ENU", "ENU.b", "Passer une énumération en paramètre", "A.1", "ENU.2"),
    ("ENU", "ENU.c", "Donner un constructeur et des méthodes à une énumération", "A.1", "ENU.3"),
    ("ENU", "ENU.d", "Écrire un record et savoir quand il convient", "A.1", "ENU.4"),
    ("ABS", "ABS.a", "Écrire une classe abstraite et une méthode abstraite", "A.4", "ABS.1"),
    ("ABS", "ABS.b", "Faire remonter le code commun, laisser descendre ce qui varie", "C.1", "ABS.1, ABS.2"),
    ("ABS", "ABS.c", "Exploiter le polymorphisme sans tester le type", "A.4", "ABS.2"),
    ("ABS", "ABS.d", "Compléter un dispositif écrit par un tiers", "A.2", "ABS.3"),
    ("ABS", "ABS.e", "Factoriser une hiérarchie métier complète", "A.4", "ABS.4"),
    ("ABS", "ABS.f", "Concevoir une hiérarchie entière à partir d'un énoncé, "
     "sans squelette", "A.4", "ABS.5"),
    ("ITF", "ITF.a", "Écrire et implémenter une interface", "A.1", "ITF.1"),
    ("ITF", "ITF.b", "Dépendre d'une interface plutôt que d'une classe concrète", "C.1", "ITF.1, ITF.2"),
    ("ITF", "ITF.c", "Implémenter plusieurs interfaces, choisir entre interface et abstraite", "A.4", "ITF.3"),
    ("ITF", "ITF.d", "Étendre un programme sans le modifier (Observateur)", "A.2", "ITF.4"),
    ("COL", "COL.a", "Choisir entre List, Set et Map selon la garantie voulue", "A.3", "COL.1, COL.6"),
    ("COL", "COL.b", "Employer une table associative", "A.3", "COL.2, COL.4"),
    ("COL", "COL.c", "Remplir une collection à partir d'un flux de texte", "A.3", "COL.3"),
    ("COL", "COL.d", "Passer un prédicat à une méthode de collection", "A.6", "COL.5"),
    ("COL", "COL.e", "Emboîter des collections, confier une règle à la structure", "C.1", "COL.7"),
    ("EXC", "EXC.a", "Écrire et lever une exception personnalisée", "A.1", "EXC.1, EXC.3"),
    ("EXC", "EXC.b", "Laisser l'objet cohérent quand une méthode échoue", "C.1", "EXC.1"),
    ("EXC", "EXC.c", "Valider dans le constructeur", "C.1", "EXC.3"),
    ("EXC", "EXC.d", "Structurer une famille d'exceptions selon ce que l'appelant distingue", "C.1", "EXC.3"),
    ("EXC", "EXC.e", "Traiter les exceptions non contrôlées du JDK", "A.3", "EXC.4"),
    ("EXC", "EXC.f", "Lire une trace d'exception et remonter à la cause", "B.3", "EXC.5"),
    ("JUN", "JUN.a", "Lire une classe de test comme une spécification", "B.3", "JUN.1"),
    ("JUN", "JUN.b", "Écrire une vérification qui démasque un défaut", "B.1", "JUN.2"),
    ("JUN", "JUN.c", "Écrire une classe de test JUnit structurée", "B.2", "JUN.3"),
    ("JUN", "JUN.d", "Justifier le choix des cas testés, y compris les bords", "C.2", "JUN.2, JUN.3"),
    ("GEN", "GEN.a", "Écrire une classe générique à un ou plusieurs paramètres", "A.1", "GEN.1, GEN.2, GEN.3"),
    ("GEN", "GEN.b", "Comprendre ce que la généricité évite", "C.1", "GEN.1"),
    ("GEN", "GEN.c", "Employer le joker pour accepter une famille de types", "A.4", "GEN.4"),
    ("GEN", "GEN.d", "Écrire une méthode générique", "A.1", "GEN.5"),
    ("GEN", "GEN.e", "Hériter d'une classe générique, distinguer super() et this()", "A.4", "GEN.6"),
    ("LAM", "LAM.a", "Reconnaître une interface fonctionnelle", "A.6", "LAM.1, LAM.2"),
    ("LAM", "LAM.b", "Écrire une expression lambda sous ses trois formes", "A.6", "LAM.1"),
    ("LAM", "LAM.c", "Passer un comportement en paramètre", "A.6", "LAM.2"),
    ("LAM", "LAM.d", "Employer les interfaces de java.util.function", "A.6", "LAM.3"),
    ("LAM", "LAM.e", "Employer une référence de méthode", "A.6", "LAM.3"),
    ("FX", "FX.a", "Construire une fenêtre et disposer des composants", "A.5", "FX.1, FX.3"),
    ("FX", "FX.b", "Relier un composant à un gestionnaire d'ActionEvent", "A.5", "FX.1, FX.2"),
    ("FX", "FX.c", "Traiter un KeyEvent et un MouseEvent", "A.5", "FX.4, FX.5"),
    ("FX", "FX.d", "Distinguer filtre et gestionnaire, comprendre la propagation", "A.5", "FX.5"),
    ("FX", "FX.e", "Construire une application graphique complète", "A.5", "FX.9"),
    ("FX", "FX.f", "Séparer la vue du contrôleur avec FXML", "C.1", "FX.9"),
    ("FX", "FX.g", "Observer une propriété par un ChangeListener (facultatif)", "A.5", "FX.6, FX.7"),
    ("FX", "FX.h", "Lier des valeurs par un binding (facultatif)", "A.5", "FX.8"),
    ("FIC", "FIC.a", "Modéliser un petit domaine à trois classes liées", "A.1", "FIC.1"),
    ("FIC", "FIC.b", "Protéger une collection interne rendue par un accesseur", "C.1", "FIC.1"),
    ("FIC", "FIC.c", "Sérialiser des objets et les relire", "A.5", "FIC.2"),
    ("FIC", "FIC.d", "Lire et écrire un fichier texte", "A.5", "FIC.3"),
    ("FIC", "FIC.e", "Choisir un format en fonction de qui lira le fichier", "C.1", "FIC.3"),
    ("REC", "REC.a", "Mobiliser plusieurs modules sur un même énoncé", "A.1", "à décider"),
    ("REC", "REC.b", "Se préparer au format de l'examen", "D.10", "à décider"),
]

ws4 = wb.create_sheet("Objectifs par module")
titre_de_feuille(ws4, "Objectifs d'apprentissage, module par module",
                 "Déduits des slides et des exercices, puis rattachés à un objectif de l'examen. "
                 "Colonne D modifiable : elle alimente la feuille Couverture.", 5)
entetes(ws4, 4, ["Module", "Code", "Objectif d'apprentissage", "Objectif examen", "Exercices"],
        [9, 10, 68, 16, 28])

codes_examen = [c for c, _, o in OBJECTIFS if o] + [c for c, _ in MAITRISE]
val_obj = DataValidation(type="list", formula1='"' + ",".join(codes_examen) + '"',
                         allow_blank=True, showDropDown=False)
ws4.add_data_validation(val_obj)

ligne = 5
premiere_obj = ligne
for module, code, libelle, examen, exos in APPRENTISSAGE:
    for i, v in enumerate([module, code, libelle, examen, exos], start=1):
        c = ws4.cell(ligne, i, v)
        c.font = Font(name=POLICE, size=10, bold=(i == 1))
        c.border = BORDURE
        c.alignment = Alignment(wrap_text=(i == 3), vertical="top",
                                horizontal="center" if i in (1, 2, 4) else "left")
    # Le rose disait « pas encore ecrit ». Il etait code en dur, et il
    # est reste sur FX et STA longtemps apres leur ecriture. On le
    # deduit maintenant du disque : un module sans aucun package
    # d'exercice n'existe pas encore.
    if MESURE.get(module, (0, 0, 0))[0] == 0:
        for i in (1, 2, 3, 5):
            ws4.cell(ligne, i).fill = ALERTE
    ws4.cell(ligne, 4).fill = JAUNE
    val_obj.add(ws4.cell(ligne, 4))
    ws4.row_dimensions[ligne].height = 22
    ligne += 1

derniere_obj = ligne - 1
ws4.freeze_panes = "C5"
ws4.auto_filter.ref = f"A4:E{derniere_obj}"
ligne += 1
note(ws4, ligne, "Fond rose : aucun exercice n'existe encore pour ce module. La couleur se déduit du disque, elle ne se décrète pas.")

# =====================================================================
#  5. Couverture
# =====================================================================
COLONNES = ["POO", "STA", "TMP", "PKG", "TAB", "ENU", "ABS", "ITF",
            "COL", "EXC", "JUN", "GEN", "LAM", "FX", "FIC", "REC"]

ws5 = wb.create_sheet("Couverture")
titre_de_feuille(ws5, "Couverture des objectifs de l'examen par les modules",
                 "Chaque cellule compte les objectifs d'apprentissage rattachés. "
                 "Tout se recalcule depuis la feuille précédente.", 2 + len(COLONNES) + 2)
entetes(ws5, 4, ["Code", "Objectif de l'examen"] + COLONNES + ["Total", "État"],
        [10, 50] + [6] * len(COLONNES) + [8, 17])

ligne = 5
for code, _, libelle in [(c, x, o) for c, x, o in OBJECTIFS if o]:
    ws5.cell(ligne, 1, code).font = Font(name=POLICE, size=10, bold=True)
    ws5.cell(ligne, 1).border = BORDURE
    c = ws5.cell(ligne, 2, libelle)
    c.font = Font(name=POLICE, size=9)
    c.border = BORDURE
    c.alignment = Alignment(wrap_text=True, vertical="top")
    for i in range(len(COLONNES)):
        col = 3 + i
        cel = ws5.cell(ligne, col,
                       f"=COUNTIFS('Objectifs par module'!$A${premiere_obj}:$A${derniere_obj},"
                       f"{get_column_letter(col)}$4,"
                       f"'Objectifs par module'!$D${premiere_obj}:$D${derniere_obj},$A{ligne})")
        cel.font = Font(name=POLICE, size=10)
        cel.border = BORDURE
        cel.alignment = Alignment(horizontal="center")
    ct = 3 + len(COLONNES)
    cel = ws5.cell(ligne, ct, f"=SUM(C{ligne}:{get_column_letter(ct - 1)}{ligne})")
    cel.font = Font(name=POLICE, size=10, bold=True)
    cel.border = BORDURE
    cel.alignment = Alignment(horizontal="center")
    cel = ws5.cell(ligne, ct + 1,
                   f'=IF({get_column_letter(ct)}{ligne}=0,"NON COUVERT",'
                   f'IF({get_column_letter(ct)}{ligne}=1,"un seul module","couvert"))')
    cel.font = Font(name=POLICE, size=10)
    cel.border = BORDURE
    cel.alignment = Alignment(horizontal="center")
    ws5.row_dimensions[ligne].height = 28
    ligne += 1

ws5.freeze_panes = "C5"
ligne += 1
note(ws5, ligne, "Comment lire ce tableau", gras=True)
for texte in [
    "Un zéro signale un objectif de l'examen qu'aucun module ne porte.",
    "Un 1 signale un objectif tenu par un seul module : si ce module saute, l'objectif saute avec lui.",
    "Pour rattacher autrement un objectif, changez la colonne D de la feuille précédente.",
]:
    ligne += 1
    note(ws5, ligne, texte)

for feuille in wb.worksheets:
    feuille.sheet_view.showGridLines = False


# =====================================================================
#  Ce qui a ete verifie, et ce qui reste
#
#  Cette feuille existe parce que « livre » ne dit pas « teste ». Un
#  exercice peut etre ecrit, relu, documente, et ne jamais avoir ete
#  lance — c'etait le cas de tout le recueil jusqu'au 14/09.
# =====================================================================

VERIFICATIONS = [
    # Remise a zero le 11/10/2026 : le professeur reprend l'ensemble.
    # Les verifications de septembre portaient sur un etat anterieur aux
    # seize decks, aux cinq nouveaux increments GameHub et a l'enonce du
    # demineur. Une ligne « fait » datee d'avant aurait menti.

    ("Slides — relecture et adaptation",
     "a faire", "",
     "Les seize decks sont produits et n'ont jamais ete relus. C'est le "
     "gros du travail qui reste : contenu, enchainement, duree reelle de "
     "chaque seance."),

    ("Exercices — compilation et tests",
     "a faire", "",
     "70 squelettes. Verifie en septembre, a refaire : STA.1 et ABS.5 ont "
     "change depuis."),

    ("Solutions — compilation et execution",
     "a faire", "",
     "Verifie en septembre. Depuis, JUN.3 a recu son corrige, et sept "
     "programmes ont ete repris."),

    ("Enonces — relecture detaillee",
     "a faire", "",
     "Les quinze fascicules et les cinq documents de reference. Entamee en "
     "septembre, jamais achevee."),

    ("GameHub — les 35 increments",
     "a faire", "",
     "Trente compilaient en septembre. Cinq se sont ajoutes depuis, dont "
     "deux qui ouvrent une fenetre JavaFX."),

    ("Demineur — tests, jeu et enonce",
     "a faire", "",
     "Jamais verifie. Ni les dix tests de GrilleTest, ni le jeu, ni "
     "l'enonce en sept etapes ecrit depuis."),

    ("JavaFX — les exercices, les demos, FX.8",
     "a faire", "",
     "Les huit exercices et les deux demos tournaient en septembre. FX.8 "
     "— bindings et pom.xml — n'a jamais ete eprouve."),

    ("Captures d'ecran sous Windows",
     "a faire", "",
     "Les 23 captures du guide et du document Git viennent d'un macOS."),

    ("REC — l'examen blanc et les recapitulatifs",
     "a faire", "",
     "Formule arretee le 11/10 : un examen d'une annee precedente, plus des "
     "exercices recapitulatifs. Aucun recapitulatif n'est ecrit."),

    ("La distribution aux etudiants",
     "a faire", "",
     "Depot GitHub public, archives par seance de livrer.py, dossiers par "
     "module de dossier_module.py : trois voies qui ne disent pas la meme "
     "chose. Point important, pas encore creuse."),
]

ws6 = wb.create_sheet("Verifications")
titre_de_feuille(ws6, "Ce qui a ete verifie, et ce qui reste",
                 "« Livre » ne dit pas « teste ». Cette feuille distingue les deux.", 4)
entetes(ws6, 4, ["Ce qui est verifie", "Etat", "Quand", "Ce qui en est ressorti"],
        [34, 11, 11, 80])

TEINTES_ETAT = {
    "fait": PatternFill("solid", fgColor="D9EAD3"),
    "en cours": PatternFill("solid", fgColor="FFF2CC"),
    "a faire": PatternFill("solid", fgColor="F4CCCC"),
}

ligne = 5
for quoi, etat, quand, detail in VERIFICATIONS:
    for i, v in enumerate([quoi, etat, quand, detail], start=1):
        c = ws6.cell(ligne, i, v)
        c.font = Font(name=POLICE, size=10, bold=(i == 1))
        c.border = BORDURE
        c.alignment = Alignment(horizontal="center" if i in (2, 3) else "left",
                                vertical="top", wrap_text=(i in (1, 4)))
    ws6.cell(ligne, 2).fill = TEINTES_ETAT.get(etat, PatternFill())
    ws6.row_dimensions[ligne].height = 46
    ligne += 1

ligne += 1
c = ws6.cell(ligne, 1, "Tout est repasse a « a faire » le 11/10/2026 : le professeur reprend "
                       "l'ensemble. Une ligne « fait » datee de septembre aurait menti, "
                       "puisque les seize decks, cinq increments GameHub et l'enonce du "
                       "demineur sont arrives depuis.")
ws6.merge_cells(start_row=ligne, start_column=1, end_row=ligne, end_column=4)
c.font = Font(name=POLICE, size=10, italic=True, color=ACCENT)
c.alignment = Alignment(vertical="center", wrap_text=True, indent=1)
ws6.row_dimensions[ligne].height = 30


wb.save(str(Path(__file__).resolve().parent.parent.parent / "_objectifs" / "Objectifs_et_couverture.xlsx"))
print("écrit")
