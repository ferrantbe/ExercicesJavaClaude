#!/usr/bin/env python3
"""
extraire_deroule.py — lit les decks de _slides/slides_de_cours et les demos, et ecrit le
deroule de chaque module dans _outils/generateurs/deroule.json, que
build_deroule.js met en page (demande du 18/10/2026).

    python3 _outils/extraire_deroule.py

Le deroule suit l'ordre reel des slides : sections (intercalaires), slides
de contenu regroupees par section, demonstrations et exercices a l'endroit
ou les slides les placent. Les durees des demonstrations viennent de leur
page de garde ; les autres durees ne sont ecrites nulle part et restent a
remplir.
"""
import glob
import json
import re
import zipfile
import html
from pathlib import Path

from pptx import Presentation

RACINE = Path(__file__).resolve().parent.parent
CODE = re.compile(r"\b(?:POO|PKG|TMP|TAB|ENU|ABS|ITF|STA|COL|EXC|JUN|GEN|LAM|FIC|FX|G)\.\d+\b")


def textes_slide(slide):
    """Le texte de chaque paragraphe, groupes et tableaux compris : un titre
    coupe en deux runs (« 4. » puis « static » en Consolas) reste entier."""
    x = slide._element.xml
    out = []
    for p in re.findall(r"<a:p>.*?</a:p>|<a:p .*?</a:p>", x, re.S):
        t = html.unescape("".join(re.findall(r"<a:t>([^<]*)</a:t>", p)))
        if t.strip():
            out.append(t.strip())
    return out


def infos_demo(nom):
    """Duree et moment, lus dans le tableau de la page de garde de la demo."""
    chemin = RACINE / "_demos" / f"{nom}.docx"
    if not chemin.exists():
        return None, None
    x = zipfile.ZipFile(chemin).read("word/document.xml").decode()
    tbl = re.search(r"<w:tbl>.*?</w:tbl>", x, re.S)
    if not tbl:
        return None, None
    lignes = [[html.unescape("".join(re.findall(r"<w:t[^>]*>([^<]*)</w:t>", c)))
               for c in re.findall(r"<w:tc>.*?</w:tc>", r, re.S)]
              for r in re.findall(r"<w:tr[ >].*?</w:tr>", tbl.group(0), re.S)]
    if len(lignes) < 2:
        return None, None
    entetes = [e.strip().lower() for e in lignes[0]]
    valeurs = lignes[1]
    def champ(mot):
        for e, v in zip(entetes, valeurs):
            if mot in e:
                return v.strip()
        return None
    return champ("durée"), champ("quand")


def module_de(chemin):
    return re.match(r"\d+\. (\w+)_slides", Path(chemin).name).group(1)


def extraire(chemin):
    prs = Presentation(chemin)
    etapes, section, contenu = [], None, []

    def vider():
        nonlocal contenu
        if contenu:
            etapes.append({"type": "slides", "section": section,
                           "de": contenu[0][0], "a": contenu[-1][0],
                           "titres": [t for _, t in contenu]})
            contenu = []

    for i, s in enumerate(prs.slides, 1):
        titre = s.shapes.title.text.strip() if s.shapes.title is not None else ""
        textes = [t for t in textes_slide(s) if t.strip()]
        if s.slide_layout.name == "Titre de section":
            vider()
            section = next((t for t in textes if re.match(r"\d+\.", t)), textes[0] if textes else "")
            etapes.append({"type": "section", "titre": section, "slide": i})
        elif titre == "Démonstration":
            vider()
            nom = next((re.sub(r".*Déroulé\s*:\s*", "", t) for t in textes if "Déroulé" in t), "")
            sujet = next((t for t in textes if t not in ("Démonstration",) and "Déroulé" not in t
                          and not t.isdigit() and "·" not in t), "")
            duree, quand = infos_demo(nom.strip())
            etapes.append({"type": "demo", "slide": i, "nom": nom.strip(), "sujet": sujet,
                           "duree": duree, "quand": quand})
        elif titre.startswith("Exercice"):
            vider()
            items, consignes, k = [], [], 0
            reste = [t for t in textes if t not in (titre,) and not t.isdigit() and "·" not in t
                     and not t.startswith(("fascicule", "fil rouge"))]
            while k < len(reste):
                t = reste[k]
                if CODE.fullmatch(t):
                    libelle = reste[k + 1] if k + 1 < len(reste) and not CODE.fullmatch(reste[k + 1]) else ""
                    items.append({"code": t, "libelle": libelle})
                    k += 2 if libelle else 1
                else:
                    consignes.append(t)
                    k += 1
            etapes.append({"type": "exercices", "slide": i, "items": items, "consignes": consignes})
        elif i == 1:
            continue
        else:
            contenu.append((i, titre))
    vider()
    return {"module": module_de(chemin), "fichier": Path(chemin).name,
            "slides": len(prs.slides), "etapes": etapes}


# ---------------------------------------------------------------------------
#  Le classeur
# ---------------------------------------------------------------------------

def minutes(texte):
    """« 12 à 15 minutes » -> 15 : la borne haute, par prudence."""
    if not texte:
        return None
    nombres = [int(n) for n in re.findall(r"\d+", texte)]
    return max(nombres) if nombres else None


def libelle(e):
    if e["type"] == "section":
        return f"Section {e['titre']}"
    if e["type"] == "slides":
        return " ; ".join(t for t in e["titres"] if t)
    if e["type"] == "demo":
        quand = f" ({e['quand']})" if e.get("quand") else ""
        return f"Démonstration {e['nom']} : {e['sujet']}{quand}"
    morceaux = [f"{i['code']} {i['libelle']}".strip() for i in e["items"]]
    texte = "Exercices : " + " ; ".join(morceaux)
    if e["consignes"]:
        texte += " — " + " ; ".join(e["consignes"])
    return texte


TYPES = {"section": "Section", "slides": "Slides", "demo": "Démonstration", "exercices": "Exercices"}


def anciennes_saisies(chemin):
    """Les durees et remarques deja saisies, pour les garder a la regeneration.
    Une etape est reconnue par son module, son type et sa premiere slide."""
    from openpyxl import load_workbook
    if not chemin.exists():
        return {}, None
    wb = load_workbook(chemin)
    ws = wb["Déroulé"]
    entetes = [c.value for c in ws[1]]
    col = {n: entetes.index(n) for n in entetes if n}
    garde = {}
    for r in ws.iter_rows(min_row=2, values_only=True):
        if not r[col["Module"]]:
            continue
        cle = (r[col["Module"]], r[col["Type"]], r[col["De"]])
        garde[cle] = (r[col["Durée (min)"]], r[col["Remarques"]])
    rythme = wb["Synthèse"]["C3"].value if "Synthèse" in wb.sheetnames else None
    return garde, rythme


def ecrire_classeur(modules, chemin):
    from openpyxl import Workbook
    from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
    from openpyxl.comments import Comment

    garde, rythme = anciennes_saisies(chemin)
    POLICE = "Arial"
    f = lambda **k: Font(name=POLICE, **{"size": 10, **k})
    remplir = lambda c: PatternFill("solid", fgColor=c)
    SAISIE = "FFF2CC"
    COULEURS = {"Section": "DDEBF7", "Démonstration": "FFF4D6", "Exercices": "E8F3EA"}
    trait = Side(style="thin", color="D9D9D9")

    wb = Workbook()
    syn = wb.active
    syn.title = "Synthèse"
    der = wb.create_sheet("Déroulé")
    aide = wb.create_sheet("Mode d'emploi")

    # --- Deroule : une ligne par etape
    entetes = ["Module", "N°", "Type", "De", "À", "Nb slides", "Étape",
               "Durée (min)", "Durée prévue (démo)", "Durée retenue (min)", "Cumul module (min)", "Remarques"]
    der.append(entetes)
    for c in der[1]:
        c.font = f(bold=True, color="FFFFFF")
        c.fill = remplir("1F4E79")
        c.alignment = Alignment(vertical="center", wrap_text=True)
    r = 2
    for m in modules:
        for k, e in enumerate(m["etapes"], 1):
            typ = TYPES[e["type"]]
            de = e.get("de", e.get("slide"))
            a = e.get("a", e.get("slide"))
            ancienne = garde.get((m["module"], typ, de))
            duree, remarque = (ancienne if ancienne else (None, None))
            prevue = e.get("duree") if e["type"] == "demo" else None
            if duree is None and e["type"] == "demo":
                duree = minutes(prevue)
                # Une demo jouee en plusieurs temps (FX : « 18 minutes, en
                # trois temps ») a une slide par temps : sa duree est repartie.
                n = sum(1 for x in m["etapes"] if x["type"] == "demo" and x["nom"] == e["nom"])
                if duree and n > 1:
                    duree = round(duree / n)
                    if not remarque:
                        remarque = f"Durée de la démo répartie à parts égales entre ses {n} temps (hypothèse)"
            der.cell(r, 1, m["module"])
            der.cell(r, 2, k)
            der.cell(r, 3, typ)
            der.cell(r, 4, de)
            der.cell(r, 5, a)
            der.cell(r, 6, f"=E{r}-D{r}+1" if typ == "Slides" else None)
            der.cell(r, 7, libelle(e))
            der.cell(r, 8, duree)
            der.cell(r, 9, prevue)
            # duree retenue : la saisie, sinon (slides) nb de slides x rythme
            der.cell(r, 10, f'=IF(H{r}<>"",H{r},IF(C{r}="Slides",F{r}*Synthèse!$C$3,0))')
            der.cell(r, 11, f'=SUMIFS($J$2:J{r},$A$2:A{r},A{r})')
            der.cell(r, 12, remarque)
            for col in range(1, 13):
                cel = der.cell(r, col)
                cel.font = f(bold=(typ == "Section"))
                cel.alignment = Alignment(vertical="top", wrap_text=(col in (7, 9, 12)))
                cel.border = Border(bottom=trait)
                if typ in COULEURS:
                    cel.fill = remplir(COULEURS[typ])
            der.cell(r, 8).fill = remplir(SAISIE)
            der.cell(r, 12).fill = remplir(SAISIE)
            r += 1
    derniere = r - 1
    for col, w in zip("ABCDEFGHIJKL", [8, 5, 14, 5, 5, 8, 70, 11, 18, 12, 12, 30]):
        der.column_dimensions[col].width = w
    der.freeze_panes = "H2"
    der.auto_filter.ref = f"A1:L{derniere}"
    der["H1"].comment = Comment("À saisir, en minutes. Pour une démonstration, prérempli avec la "
                                "borne haute de sa page de garde.", "Claude")

    # --- Synthese : totaux par module, en formules
    syn["A1"] = "Synthèse du déroulé"
    syn["A1"].font = f(bold=True, size=14)
    syn["A3"] = "Rythme des slides, en minutes par slide (hypothèse à saisir)"
    syn["A3"].font = f()
    syn["C3"] = rythme
    syn["C3"].fill = remplir(SAISIE)
    syn["C3"].font = Font(name=POLICE, size=10, color="0000FF")
    syn["C3"].comment = Comment("Utilisé pour les lignes « Slides » dont la durée est vide. "
                                "Laissé vide : ces lignes comptent 0.", "Claude")
    t = ["Module", "Slides", "Démonstrations (min)", "Exercices (min)", "Slides (min)",
         "Total (min)", "Total (h:mm)", "Étapes sans durée"]
    for j, v in enumerate(t, 1):
        cel = syn.cell(5, j, v)
        cel.font = f(bold=True, color="FFFFFF")
        cel.fill = remplir("1F4E79")
        cel.alignment = Alignment(wrap_text=True, vertical="center")
    plage = lambda col: f"Déroulé!${col}$2:${col}${derniere}"
    for i, m in enumerate(modules):
        r = 6 + i
        syn.cell(r, 1, m["module"])
        syn.cell(r, 2, m["slides"])
        syn.cell(r, 3, f'=SUMIFS({plage("J")},{plage("A")},A{r},{plage("C")},"Démonstration")')
        syn.cell(r, 4, f'=SUMIFS({plage("J")},{plage("A")},A{r},{plage("C")},"Exercices")')
        syn.cell(r, 5, f'=SUMIFS({plage("J")},{plage("A")},A{r},{plage("C")},"Slides")')
        syn.cell(r, 6, f"=C{r}+D{r}+E{r}")
        syn.cell(r, 7, f"=F{r}/1440")
        syn.cell(r, 7).number_format = "[h]:mm"
        syn.cell(r, 8, f'=COUNTIFS({plage("A")},A{r},{plage("H")},"",{plage("C")},"<>Section")')
        for j in range(1, 9):
            syn.cell(r, j).font = f()
    tot = 6 + len(modules)
    syn.cell(tot, 1, "Total").font = f(bold=True)
    for j, col in zip(range(2, 9), "BCDEFGH"):
        syn.cell(tot, j, f"=SUM({col}6:{col}{tot - 1})").font = f(bold=True)
    syn.cell(tot, 7).number_format = "[h]:mm"
    for col, w in zip("ABCDEFGH", [10, 8, 16, 14, 12, 11, 12, 14]):
        syn.column_dimensions[col].width = w
    syn.column_dimensions["A"].width = 12

    # --- Mode d'emploi
    lignes = [
        ("Déroulé des modules", True),
        ("Une ligne par étape, dans l'ordre réel des slides de chaque deck. La colonne « Type » dit ce qu'est chaque ligne, et la couleur le répète : voir la légende en bas de cette page.", False),
        ("", False),
        ("Ce qui se saisit (cellules jaunes)", True),
        ("Déroulé, colonne « Durée (min) » : la durée de l'étape, en minutes. Les démonstrations sont préremplies avec la borne haute de leur page de garde (« 12 à 15 minutes » donne 15) ; la page de garde reste visible dans « Durée prévue (démo) ».", False),
        ("Déroulé, colonne « Remarques » : libre.", False),
        ("Synthèse, cellule C3 : un rythme en minutes par slide. Il sert d'estimation pour les lignes « Slides » sans durée saisie ; vide, ces lignes comptent 0.", False),
        ("", False),
        ("Ce qui se calcule", True),
        ("« Nb slides », « Durée retenue », « Cumul module » et toute la Synthèse sont des formules : modifiez une durée, les totaux suivent.", False),
        ("« Étapes sans durée » compte, par module, les étapes encore vides (sections exclues).", False),
        ("", False),
        ("Régénération", True),
        ("python3 _outils/extraire_deroule.py relit les decks et réécrit ce classeur. Les durées, les remarques et le rythme déjà saisis sont conservés : une étape est reconnue par son module, son type et sa première slide. Si une slide est insérée avant une étape, sa première slide change, et sa saisie est à refaire.", False),
    ]
    for i, (texte, gras) in enumerate(lignes, 1):
        cel = aide.cell(i, 1, texte)
        cel.font = f(bold=gras)
        cel.alignment = Alignment(wrap_text=True, vertical="top")
    # Legende : le mot de la colonne « Type » et sa couleur, cote a cote
    # (demande du 18/10/2026 : un mot pour fixer chaque couleur).
    r = len(lignes) + 2
    aide.cell(r, 1, "Les types de ligne (colonne « Type » du Déroulé)").font = f(bold=True)
    sens = {"Section": "ouvre une section du deck (son intercalaire)",
            "Slides": "regroupe les slides de contenu de la section",
            "Démonstration": "une démonstration, avec sa durée prévue",
            "Exercices": "une slide d'exercices, avec les codes à faire"}
    for k, (typ, texte) in enumerate(sens.items(), 1):
        cel = aide.cell(r + k, 1, f"{typ} : {texte}")
        cel.font = f(bold=(typ == "Section"))
        if typ in COULEURS:
            cel.fill = remplir(COULEURS[typ])
    aide.column_dimensions["A"].width = 110
    wb.move_sheet("Mode d'emploi", -2)
    wb.active = 0
    wb.save(chemin)


def main():
    modules = [extraire(f) for f in sorted(glob.glob(str(RACINE / "_slides/slides_de_cours/*.pptx")))]
    sortie = RACINE / "_demos/Deroule_des_modules.xlsx"
    ecrire_classeur(modules, sortie)
    print(f"{len(modules)} decks -> {sortie.relative_to(RACINE)}")


if __name__ == "__main__":
    main()
