#!/usr/bin/env python3
"""Applique la regle Consolas aux mots de code d'un deck remanie.

    python3 _outils/appliquer_consolas.py deck.pptx [--sortie autre.pptx]
                                          [--aussi 3:java.time ...] [--essai]

La regle (validee le 12/10/2026) : un mot qu'on tape dans IntelliJ - mot-cle,
classe, methode, constante, annotation, abreviation (psvm, sout, for-each) -
s'ecrit en Consolas, couleur accent4, un cran plus petit que le texte qui
l'entoure sur l'echelle de PowerPoint (40 -> 36, 28 -> 24).

Le script applique d'office les cas sans ambiguite et LISTE sans y toucher :
- les mots qui sont aussi des mots francais (public, final, package, double...) ;
- les mots situes dans un intercalaire de section.
Pour appliquer un de ces cas apres decision : --aussi <slide>:<mot>.

Ne touche jamais : les zones de code, les cellules deja en Consolas, les
reperes de section, les numeros de slide, les notes. --essai : rapport seul.
"""
import argparse, copy, re, sys
from pathlib import Path
from pptx import Presentation
from pptx.oxml.ns import qn

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "_slides" / "generateurs"))
from mise_en_forme import cran_dessous  # noqa: E402  (la regle de taille vit la)

MOTS_CLES = set("""abstract assert boolean break byte catch class continue default do else extends
finally float for if implements import instanceof int new private protected return static super
switch synchronized this throw throws try void volatile while var null true false sealed permits
yield""".split())
# Mots-cles qui sont aussi des mots francais : decision au cas par cas.
AMBIGUS = set("public package interface final case long double char record enum short continue super".split())
# Classes dont le nom est aussi un mot francais courant (titre de module, par exemple).
AMBIGUS |= {"Collection", "Collections", "Exceptions", "Interfaces"}
CLASSES = set("""String Scanner Integer Object Math System Character Boolean Long Double Float Byte Short
LocalDate LocalTime LocalDateTime Duration Period Instant ZonedDateTime ZoneId DayOfWeek Month Year
ChronoUnit DateTimeFormatter DateTimeParseException ResolverStyle List ArrayList LinkedList Map HashMap
TreeMap Set HashSet TreeSet Iterator Iterable Collection Collections Arrays Optional Comparable
Comparator Exception RuntimeException IllegalArgumentException IllegalStateException
NullPointerException IOException Files Path Paths Thread Runnable Override FunctionalInterface
Predicate Function Consumer Supplier Stream""".split())
ABREVIATIONS = {"psvm", "sout", "souf", "fori", "for-each"}
PRODUITS = {"Java", "JAVA", "JDK", "JRE", "JVM", "IntelliJ", "JavaFX", "Maven", "JUnit", "GameHub",
            "ExercicesJava", "Moodle", "Git", "GitHub"}

JETON = re.compile(r"@?[A-Za-z_][\w$]*(?:-each)?(?:\.[A-Za-z_][\w$]*)*(?:\([^()\s]*\))?")


def categorie(mot):
    """'auto', 'ambigu' ou None."""
    base = mot.split("(")[0]
    if base in PRODUITS or re.fullmatch(r"[A-Z]{2,4}(\.\d+)?", base):
        return None                                   # TMP, POO, ABS... et IDE.14 restent tels quels
    if base in AMBIGUS:
        return "ambigu"
    if (base in MOTS_CLES or base in CLASSES or base in ABREVIATIONS or base.startswith("@")
            or mot.endswith(")") or re.search(r"[a-z][A-Z]", base)
            or re.fullmatch(r"[a-z]\w*(\.\w+)+", base)                 # java.time, System.out
            or re.fullmatch(r"[A-Z]\w*\.[A-Za-z_]\w*(\.\w+)*", base)   # Integer.MAX_VALUE
            or re.fullmatch(r"[A-Z][A-Z0-9]*_[A-Z0-9_]+", base)):      # MAX_VALUE
        return "auto"
    return None


def formes(shapes):
    for sh in shapes:
        if sh.shape_type == 6:
            yield from formes(sh.shapes)
        else:
            yield sh


def taille_effective(par, run, defaut):
    if run.font.size:
        return run.font.size.pt
    for r in par.runs:
        if r.font.size and (r.font.name or "") != "Consolas":
            return r.font.size.pt
    return defaut


def isoler(par, debut, fin):
    """Coupe les runs du paragraphe pour que [debut, fin[ forme des runs a part.
    Rend la liste de ces runs (objets lxml a:r)."""
    pos = 0
    resultat = []
    for r in list(par.runs):
        t = r.text
        a, b = pos, pos + len(t)
        pos = b
        if b <= debut or a >= fin:
            continue
        coupes = sorted({debut - a, fin - a} & set(range(1, len(t))))
        morceaux, prec = [], 0
        for c in coupes + [len(t)]:
            morceaux.append(t[prec:c]); prec = c
        el = r._r
        nouveaux = [el]
        el.find(qn("a:t")).text = morceaux[0]
        for m in morceaux[1:]:
            clone = copy.deepcopy(el)
            clone.find(qn("a:t")).text = m
            nouveaux[-1].addnext(clone)
            nouveaux.append(clone)
        off = a
        for el2, m in zip(nouveaux, morceaux):
            if off >= debut and off + len(m) <= fin:
                resultat.append(el2)
            off += len(m)
    return resultat


def mettre_en_code(r_el, taille):
    rpr = r_el.find(qn("a:rPr"))
    if rpr is None:
        rpr = r_el.makeelement(qn("a:rPr"), {})
        r_el.insert(0, rpr)
    rpr.set("sz", str(int(round(taille * 100))))
    for tag in ("a:solidFill", "a:latin", "a:ea", "a:cs"):
        for e in rpr.findall(qn(tag)):
            rpr.remove(e)
    fill = rpr.makeelement(qn("a:solidFill"), {})
    sc = fill.makeelement(qn("a:schemeClr"), {"val": "accent4"})
    fill.append(sc)
    # ordre du schema : ln?, fill, effet..., highlight?, uLnTx..., latin, ea, cs, sym...
    ln = rpr.find(qn("a:ln"))
    (ln.addnext(fill) if ln is not None else rpr.insert(0, fill))
    latin = rpr.makeelement(qn("a:latin"), {"typeface": "Consolas"})
    apres = fill
    for tag in ("a:effectLst", "a:effectDag", "a:highlight", "a:uLnTx", "a:uLn", "a:uFillTx", "a:uFill"):
        e = rpr.find(qn(tag))
        if e is not None:
            apres = e
    apres.addnext(latin)


def est_intercalaire(slide):
    return slide.shapes.title is None and any(
        sh.has_text_frame and re.match(r"\d+\.\s", sh.text_frame.text) and not sh.name.startswith("Repere")
        for sh in slide.shapes)


def traiter(chemin, sortie, aussi, essai):
    prs = Presentation(chemin)
    appliques, a_trancher = [], []
    for i, slide in enumerate(prs.slides, 1):
        titre_id = slide.shapes.title.shape_id if slide.shapes.title is not None else None
        interc = est_intercalaire(slide)
        for sh in formes(slide.shapes):
            if sh.name == "Code" or sh.name.startswith(("Repere", "Espace réservé du num", "Slide Number")):
                continue
            cadres = []
            if sh.has_text_frame:
                cadres.append(sh.text_frame)
            elif getattr(sh, "has_table", False) and sh.has_table:
                # Une colonne de code (en majorite Consolas) : une cellule oubliee y passe
                # en Consolas telle quelle, sans changer taille ni couleurs.
                tab = sh.table
                for k in range(len(tab.columns)):
                    cellules = [tab.cell(r, k) for r in range(len(tab.rows))]
                    runs = [r for c in cellules for p in c.text_frame.paragraphs for r in p.runs if r.text.strip()]
                    code = runs and sum((r.font.name or "") == "Consolas" for r in runs) > len(runs) / 2
                    for c in cellules:
                        if code:
                            hors = [r for p in c.text_frame.paragraphs for r in p.runs
                                    if r.text.strip() and (r.font.name or "") != "Consolas"]
                            if hors and any(categorie(m.group(0)) for p in c.text_frame.paragraphs
                                            for m in JETON.finditer("".join(r.text for r in p.runs))):
                                if not essai:
                                    for r in hors:
                                        r.font.name = "Consolas"
                                appliques.append((i, "(cellule de code)", 0, c.text_frame.text.replace("\n", " ")))
                        else:
                            cadres.append(c.text_frame)
            defaut = 40 if sh.shape_id == titre_id else 28
            for tf in cadres:
                for par in tf.paragraphs:
                    texte = "".join(r.text for r in par.runs)
                    if not texte.strip() or all((r.font.name or "") == "Consolas" for r in par.runs if r.text.strip()):
                        continue
                    cibles = []
                    urls = [u.span() for u in re.finditer(
                        r"(?:https?://|www\.)\S+|\b[\w-]+(?:\.[\w-]+)*\.(?:com|org|net|fr|be|io|dev|edu|eu)\b\S*", texte)]
                    for m in JETON.finditer(texte):
                        if any(a <= m.start() < b for a, b in urls):
                            continue                          # une adresse web reste telle quelle
                        mot = m.group(0)
                        cat = categorie(mot)
                        if cat is None:
                            continue
                        pos, couvre = 0, []
                        for r in par.runs:
                            if pos < m.end() and pos + len(r.text) > m.start():
                                couvre.append(r)
                            pos += len(r.text)
                        if all((r.font.name or "") == "Consolas" for r in couvre):
                            continue
                        decide = f"{i}:{mot}" in aussi
                        if (cat == "ambigu" or interc) and not decide:
                            a_trancher.append((i, mot, texte))
                            continue
                        taille = cran_dessous(taille_effective(par, couvre[0], defaut))
                        cibles.append((m.start(), m.end(), mot, taille))
                    for debut, fin, mot, taille in reversed(cibles):
                        if not essai:
                            for el in isoler(par, debut, fin):
                                mettre_en_code(el, taille)
                        appliques.append((i, mot, taille, texte))
    if not essai:
        prs.save(sortie)
    return appliques, a_trancher


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("deck")
    ap.add_argument("--sortie")
    ap.add_argument("--aussi", nargs="*", default=[])
    ap.add_argument("--essai", action="store_true")
    a = ap.parse_args()
    appl, amb = traiter(a.deck, a.sortie or a.deck, set(a.aussi), a.essai)
    print(f"{len(appl)} mot(s) passe(s) en Consolas" + (" (essai, rien d'ecrit)" if a.essai else ""))
    for i, mot, t, texte in sorted(appl):
        print(f"  slide {i:2}  {mot:24} {(f'{t:g}'+' pt') if t else 'taille gardee':13} | {texte[:70]}")
    print(f"\n{len(amb)} cas a trancher (--aussi <slide>:<mot> pour les appliquer)")
    for i, mot, texte in amb:
        print(f"  slide {i:2}  {mot:24} | {texte[:80]}")


if __name__ == "__main__":
    main()
