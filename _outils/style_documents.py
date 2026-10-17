#!/usr/bin/env python3
"""
style_documents.py — applique le style des documents du cours a un .docx.

    python3 _outils/style_documents.py enonces/*.docx _demos/*.docx documents/*.docx
    python3 _outils/style_documents.py --essai enonces/POO_enonces.docx

Le style (demande du 16/10/2026) :

1. LE TEXTE en Cormorant Garamond 11. La police est posee dans les valeurs
   par defaut du document (styles.xml) et dans les styles qui en nommaient
   une autre : les titres la recoivent donc aussi, a leur taille et leur
   couleur actuelles.

2. LE CODE en Consolas 9, couleur Accent 2 du theme : les blocs de code, les
   mots deja en Consolas, et les mots Java cites dans le texte que le
   generateur avait laisses en police normale. Ces derniers sont reperes
   avec la regle des slides (appliquer_consolas.py, validee le 12/10/2026),
   importee telle quelle pour qu'elle ne vive qu'a un endroit :
     - les cas sans ambiguite sont appliques d'office ;
     - les mots qui sont aussi des mots francais (public, final, package,
       double...) sont seulement LISTES, pour decision ;
     - les titres ne sont pas touches : leurs mots Java sont listes.

   La couleur est ecrite deux fois : themeColor="accent2", que Word suit
   si le theme change, et la valeur E97132 (Accent 2 du theme Office actuel,
   lu dans un document enregistre par Word) pour les lecteurs qui ignorent
   le theme. Les liens (bleus) gardent leur couleur.

COMME TYPOGRAPHIE.PY, CE SCRIPT TRAVAILLE SUR LE TEXTE DU XML et ne reecrit
que ce qu'il change : un analyseur XML renomme les espaces de noms et Word
refuse ensuite le fichier (voir typographie.py). Les elements d'un <w:rPr>
sont remis dans l'ordre du schema, que Word exige.

ORDRE : apres la generation, AVANT ajouter_pagination.py (le changement de
police modifie le nombre de pages) et typographie.py (qui reste le dernier).

IDEMPOTENT : un mot passe en Consolas n'est plus du texte a analyser, et un
run deja en Consolas 9 Accent 2 ressort identique.
"""

import html
import re
import shutil
import sys
import zipfile
from collections import Counter
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from appliquer_consolas import JETON, categorie  # noqa: E402  (la regle vit la)

POLICE_TEXTE = "Cormorant Garamond"
TAILLE_TEXTE = 22          # demi-points : 11 pt
TAILLE_CODE = 18           # 9 pt
COULEUR_CODE = '<w:color w:val="E97132" w:themeColor="accent2"/>'
COULEURS_LIENS = {"0563C1", "2B6CB0"}

# Noms propres que la regle des slides prendrait pour du code (majuscule au
# milieu) : des produits, pas des mots qu'on tape dans IntelliJ.
NOMS_PROPRES = {"macOS", "PowerShell", "PayPal", "PlantUML", "OpenJFX", "GitLab"}

RFONTS_TEXTE = (f'<w:rFonts w:ascii="{POLICE_TEXTE}" w:hAnsi="{POLICE_TEXTE}" '
                f'w:eastAsia="{POLICE_TEXTE}" w:cs="{POLICE_TEXTE}"/>')
RFONTS_CODE = '<w:rFonts w:ascii="Consolas" w:hAnsi="Consolas" w:cs="Consolas"/>'

# Ordre des proprietes d'un run dans le schema (CT_RPr).
ORDRE = ["rStyle", "rFonts", "b", "bCs", "i", "iCs", "caps", "smallCaps", "strike",
         "dstrike", "outline", "shadow", "emboss", "imprint", "noProof", "snapToGrid",
         "vanish", "webHidden", "color", "spacing", "w", "kern", "position", "sz", "szCs",
         "highlight", "u", "effect", "bdr", "shd", "fitText", "vertAlign", "rtl", "cs",
         "em", "lang", "eastAsianLayout", "specVanish", "oMath"]

# Les references au memento Clean Code (CC-OBJ.2, CC-NOM, CC-XXX.n) ont
# partout la meme forme : Consolas, couleur Accent 2, sans soulignement, y
# compris quand elles sont des liens ou dans un titre (demande du 17/10/2026).
REF = re.compile(r"CC-[A-Z]{3}(?:\.(?:\d+|n))?")

ENFANT = re.compile(r"<((?:w|w14|w15):[A-Za-z]+)\b[^>]*?(?:/>|>.*?</\1>)", re.S)
RUN = re.compile(r"<w:r(?: [^>]*)?>.*?</w:r>", re.S)
PARA = re.compile(r"<w:p(?: [^>]*)?>.*?</w:p>", re.S)


def enfants(rpr_int):
    return [(m.group(1), m.group(0)) for m in ENFANT.finditer(rpr_int)]


def recomposer(liste):
    def rang(e):
        nom = e[0].split(":")[1]
        return ORDRE.index(nom) if e[0].startswith("w:") and nom in ORDRE else len(ORDRE)
    return "<w:rPr>" + "".join(x for _, x in sorted(liste, key=rang)) + "</w:rPr>"


def rpr_code(rpr_int):
    """Les proprietes d'un run passees en Consolas 9 Accent 2."""
    garde = [e for e in enfants(rpr_int)
             if e[0] not in ("w:rFonts", "w:color", "w:sz", "w:szCs")]
    garde += [("w:rFonts", RFONTS_CODE), ("w:color", COULEUR_CODE),
              ("w:sz", f'<w:sz w:val="{TAILLE_CODE}"/>'),
              ("w:szCs", f'<w:szCs w:val="{TAILLE_CODE}"/>')]
    return recomposer(garde)


def rpr_ref(rpr_int, titre):
    """Les proprietes d'une reference CC : celles du code, sans soulignement.
    Dans un titre, la taille du titre est gardee."""
    exclus = ("w:rFonts", "w:color", "w:u", "w:rStyle") + (() if titre else ("w:sz", "w:szCs"))
    garde = [e for e in enfants(rpr_int) if e[0] not in exclus]
    garde += [("w:rFonts", RFONTS_CODE), ("w:color", COULEUR_CODE), ("w:u", '<w:u w:val="none"/>')]
    if not titre:
        garde += [("w:sz", f'<w:sz w:val="{TAILLE_CODE}"/>'), ("w:szCs", f'<w:szCs w:val="{TAILLE_CODE}"/>')]
    return recomposer(garde)


def est_consolas(rpr_int):
    return 'w:ascii="Consolas"' in rpr_int


def couleur(rpr_int):
    m = re.search(r'<w:color w:val="([0-9A-Fa-f]{6})"', rpr_int)
    return m.group(1).upper() if m else None


# Une expression de code : des termes relies par des operateurs.
#   setNom(String nom)    nom = nom    this.nom = nom    new Personne()
#   personne.anneeDeNaissance = -3000    a.plus(b)    depuisTexte("19-01-2027")
IDENT = r"[A-Za-z_][\w$]*(?:-each\b)?"
ARGS = r"\((?:[^()]|\([^()]*\))*\)"
_G = r"[\w?.]+(?:\s+(?:extends|super)\s+[\w.]+)?"
_G2 = rf"{_G}(?:<{_G}(?:,\s*{_G})*>)?"
GENERIQUE = rf"<{_G2}(?:,\s*{_G2})*>"                  # <T>, <String, Fiche>, <? extends T>
CHAINE = (rf"(?:new\s+(?=[A-Z]))?{IDENT}(?:{GENERIQUE})?(?:\.{IDENT})*(?:{ARGS})?(?:\[[^\]]*\])?"
          rf"(?:\.{IDENT}(?:{ARGS})?)*")
LITTERAL = r'-?\d+(?:\.\d+)?[LlFfDd]?|"[^"]*"'
TERME = rf"(?:{CHAINE}|{LITTERAL})"
OP_FORT = r"==|!=|<=|>=|\+=|-=|\*=|/=|&&|\|\||->|::|="
OP_CALCUL = r"\+|-|\*|/|%|<|>"
EXPRESSION = re.compile(
    rf"(?<![\w.]){TERME}(?:\s*(?:{OP_FORT}|{OP_CALCUL})\s*{TERME})*(?![\w(])")


def exclu(mot):
    """Les jetons que la regle des slides prendrait a tort pour du code."""
    return (re.fullmatch(r"\w+\(s\)", mot)                     # exercice(s)
            or mot in NOMS_PROPRES
            or re.search(r"\.(com|be|org|net)$", mot)            # un site
            or re.fullmatch(r"[A-Z](\.[A-Z])+\.?", mot))         # F.I.R.S.T


def cat_terme(terme):
    """'auto', 'ambigu' ou None pour un terme isole."""
    if exclu(terme):
        return None
    if re.fullmatch(LITTERAL, terme):
        return "litteral"
    if terme.startswith("new "):
        return "auto"
    if re.search(GENERIQUE, terme):             # List<Integer>
        return "auto"
    m = re.fullmatch(rf"({IDENT})({ARGS})", terme)
    if m and not re.fullmatch(r"\(s\)", m.group(2)):
        # Un appel avec ses arguments : setNom(String nom), deHeures(2).
        # Un nom colle a sa parenthese est un appel : « (facultatif) »,
        # precede d'un espace, n'en est pas un.
        return "auto"
    cat = categorie(terme)
    # super(...) ou super.description() : la parenthese ou le point
    # levent l'ambiguite du mot francais.
    if cat == "ambigu" and (terme.endswith(")") or "." in terme):
        cat = "auto"
    return cat


def mots_java(texte):
    """(debut, fin, fragment, categorie) des fragments de code d'un texte.

    Un fragment est un terme seul (computeAge, String) ou une expression :
    des termes relies par un operateur. Un operateur fort (=, ==, ->...)
    fait toujours du code de ce qu'il relie ; un operateur de calcul (+, -,
    /...) seulement si ses deux voisins sont deja du code ou des nombres,
    pour ne pas prendre « sous-package » ou « 2/3 » pour une soustraction.
    """
    refs = [(m.start(), m.end()) for m in REF.finditer(texte)]
    for a, b in refs:
        yield a, b, texte[a:b], "auto"
    terme_re = re.compile(TERME)
    op_re = re.compile(rf"\s*({OP_FORT}|{OP_CALCUL})\s*")
    for m in EXPRESSION.finditer(texte):
        if any(a < m.end() and m.start() < b for a, b in refs):
            continue                       # deja pris comme reference
        # Relire l'expression terme par terme : un decoupage sur les
        # operateurs couperait le signe de « = -3000 ».
        pos, fin = m.start(), m.end()
        termes, ops = [], []
        t = terme_re.match(texte, pos)
        termes.append((t.start(), t.end()))
        pos = t.end()
        while pos < fin:
            o = op_re.match(texte, pos)
            t = terme_re.match(texte, o.end()) if o else None
            if not t or t.end() > fin:
                break
            ops.append(o.group(1))
            termes.append((t.start(), t.end()))
            pos = t.end()
        cats = [cat_terme(texte[a:b]) for a, b in termes]
        code = [c == "auto" for c in cats]
        # Un « = » n'affecte qu'a un nom : dans « 12 + 5 = affiche 17 »,
        # c'est la touche d'une calculatrice, pas une affectation.
        lie = [re.fullmatch(OP_FORT, op) is not None
               and not (op == "=" and cats[i] == "litteral")
               for i, op in enumerate(ops)]
        for i in range(len(ops)):
            if lie[i]:
                code[i] = code[i + 1] = True
        # Un operateur de calcul relie deux voisins dont l'un au moins est
        # deja du code, l'autre etant du code ou un nombre.
        change = True
        while change:
            change = False
            for i, op in enumerate(ops):
                if lie[i]:
                    continue
                # Hors « - », qui sert aussi de tiret en francais, un nom
                # simple compte comme voisin : prixForfait + deplacement.
                def voisin(j):
                    return (code[j] or cats[j] == "litteral"
                            or (op != "-" and re.fullmatch(IDENT, texte[termes[j][0]:termes[j][1]])))
                if voisin(i) and voisin(i + 1) and (code[i] or code[i + 1]):
                    lie[i] = code[i] = code[i + 1] = change = True
        groupes, courant = [], [0]
        for i, l in enumerate(lie):
            if l:
                courant.append(i + 1)
            else:
                groupes.append(courant)
                courant = [i + 1]
        groupes.append(courant)
        for g in groupes:
            a, b = termes[g[0]][0], termes[g[-1]][1]
            if len(g) > 1:
                cat = "auto"
            else:
                cat = cats[g[0]]
                if cat == "litteral":
                    cat = None
            if cat:
                yield a, b, texte[a:b], cat


def traiter_run(run, titre, rapport):
    m = re.match(r"(<w:r(?: [^>]*)?>)(.*)</w:r>", run, re.S)
    ouverture, corps = m.group(1), m.group(2)
    mr = re.match(r"\s*<w:rPr>(.*?)</w:rPr>", corps, re.S)
    rpr_int = mr.group(1) if mr else ""
    reste = corps[mr.end():] if mr else corps
    if "<w:rPrChange" in rpr_int:
        return run

    texte_run = html.unescape("".join(re.findall(r"<w:t(?: [^>]*)?>(.*?)</w:t>", reste, re.S)))
    if est_consolas(rpr_int) and REF.fullmatch(texte_run.strip()):
        return ouverture + rpr_ref(rpr_int, titre) + reste + "</w:r>"
    if est_consolas(rpr_int):
        if couleur(rpr_int) in COULEURS_LIENS:
            return run
        if titre:
            # Du code dans un titre garde sa taille, plus grande que 9 pt :
            # seule la couleur suit la regle (ENU.4, 17/10/2026).
            garde = [e for e in enfants(rpr_int) if e[0] != "w:color"] + [("w:color", COULEUR_CODE)]
            return ouverture + recomposer(garde) + reste + "</w:r>"
        return ouverture + rpr_code(rpr_int) + reste + "</w:r>"

    # Texte ordinaire : un seul <w:t>, rien d'autre (tabulation, champ...).
    mt = re.fullmatch(r"\s*<w:t(?: [^>]*)?>(.*?)</w:t>\s*", reste, re.S)
    if not mt:
        return run
    texte = html.unescape(mt.group(1))
    trouves = list(mots_java(texte))
    if not trouves:
        return run
    if titre:
        refs = [(a, b) for a, b, _, _ in trouves if REF.fullmatch(texte[a:b])]
        for a, b, mot, _ in trouves:
            if (a, b) not in refs:
                rapport["titres"][mot] += 1
        if not refs:
            return run
        rpr_normal = f"<w:rPr>{rpr_int}</w:rPr>" if mr else ""
        morceaux, pos = [], 0
        for a, b in refs:
            morceaux += [(texte[pos:a], rpr_normal), (texte[a:b], rpr_ref(rpr_int, True))]
            pos = b
        morceaux.append((texte[pos:], rpr_normal))
        return "".join(f'{ouverture}{rpr}<w:t xml:space="preserve">{html.escape(t, quote=False)}</w:t></w:r>'
                       for t, rpr in morceaux if t)

    rpr_normal = f"<w:rPr>{rpr_int}</w:rPr>" if mr else ""
    rpr_c = rpr_code(rpr_int)
    morceaux, pos = [], 0
    for debut, fin, mot, cat in trouves:
        if cat == "ambigu":
            rapport["ambigus"][mot] += 1
            continue
        rapport["appliques"][mot] += 1
        morceaux.append((texte[pos:debut], rpr_normal))
        morceaux.append((texte[debut:fin], rpr_c))
        pos = fin
    if pos == 0:
        return run
    morceaux.append((texte[pos:], rpr_normal))
    return "".join(f'{ouverture}{rpr}<w:t xml:space="preserve">{html.escape(t, quote=False)}</w:t></w:r>'
                   for t, rpr in morceaux if t)


def traiter_para(para, rapport):
    if "<w:txbxContent" in para:
        return para
    titre = bool(re.search(r'<w:pStyle w:val="(Heading\d|Titre\d?|Title)"', para))
    liens = [(m.start(), m.end()) for m in
             re.finditer(r"<w:hyperlink\b.*?</w:hyperlink>", para, re.S)]

    def remplacer(m):
        if any(a <= m.start() < b for a, b in liens):
            t = html.unescape("".join(re.findall(r"<w:t(?: [^>]*)?>(.*?)</w:t>", m.group(0), re.S)))
            if REF.fullmatch(t.strip()):
                return traiter_run(m.group(0), titre, rapport)
            return m.group(0)
        return traiter_run(m.group(0), titre, rapport)
    return RUN.sub(remplacer, para)


def traiter_styles(xml):
    """Cormorant Garamond par defaut, et dans les styles qui nommaient une autre police."""
    rpr_defaut = f"<w:rPr>{RFONTS_TEXTE}<w:sz w:val=\"{TAILLE_TEXTE}\"/><w:szCs w:val=\"{TAILLE_TEXTE}\"/></w:rPr>"
    m = re.search(r"<w:rPrDefault/>|<w:rPrDefault>.*?</w:rPrDefault>", xml, re.S)
    if m:
        ancien = m.group(0)
        mi = re.search(r"<w:rPr>(.*?)</w:rPr>", ancien, re.S)
        if mi:
            garde = [e for e in enfants(mi.group(1)) if e[0] not in ("w:rFonts", "w:sz", "w:szCs")]
            garde += [("w:rFonts", RFONTS_TEXTE), ("w:sz", f'<w:sz w:val="{TAILLE_TEXTE}"/>'),
                      ("w:szCs", f'<w:szCs w:val="{TAILLE_TEXTE}"/>')]
            neuf = f"<w:rPrDefault>{recomposer(garde)}</w:rPrDefault>"
        else:
            neuf = f"<w:rPrDefault>{rpr_defaut}</w:rPrDefault>"
        xml = xml[:m.start()] + neuf + xml[m.end():]
    elif "<w:docDefaults>" in xml:
        xml = xml.replace("<w:docDefaults>", f"<w:docDefaults><w:rPrDefault>{rpr_defaut}</w:rPrDefault>", 1)

    def police(mf):
        return mf.group(0) if "Consolas" in mf.group(0) or mf.group(0) == RFONTS_TEXTE else RFONTS_TEXTE
    debut = xml.find("</w:docDefaults>")
    xml = xml[:debut] + re.sub(r"<w:rFonts\b[^>]*/>", police, xml[debut:])

    # Les titres heritent deja de la police par defaut dans Word, mais
    # LibreOffice leur impose sa propre police sans empattement : on la
    # nomme donc aussi dans leurs styles.
    def titre(ms):
        st = ms.group(0)
        if "<w:rFonts" in st:
            return st
        if "<w:rPr>" in st:
            return st.replace("<w:rPr>", "<w:rPr>" + RFONTS_TEXTE, 1)
        return st.replace("</w:style>", f"<w:rPr>{RFONTS_TEXTE}</w:rPr></w:style>", 1)
    return re.sub(r'<w:style w:type="paragraph"[^>]*w:styleId="(?:Heading\d|Title|Titre\d*)".*?</w:style>',
                  titre, xml, flags=re.S)


def traiter(chemin, essai):
    rapport = {"appliques": Counter(), "ambigus": Counter(), "titres": Counter()}
    with zipfile.ZipFile(chemin) as z:
        parties = {n: z.read(n) for n in z.namelist()}
    nouveau = dict(parties)
    for nom in parties:
        if re.fullmatch(r"word/(document|footnotes|endnotes)\.xml", nom):
            xml = parties[nom].decode("utf-8")
            nouveau[nom] = PARA.sub(lambda m: traiter_para(m.group(0), rapport), xml).encode("utf-8")
        elif nom == "word/styles.xml":
            nouveau[nom] = traiter_styles(parties[nom].decode("utf-8")).encode("utf-8")
    if not essai and nouveau != parties:
        tmp = chemin.with_suffix(".tmp")
        with zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as zo:
            for n, d in nouveau.items():
                zo.writestr(n, d)
        shutil.move(tmp, chemin)
    return rapport


def main():
    essai = "--essai" in sys.argv
    total = {"appliques": Counter(), "ambigus": Counter(), "titres": Counter()}
    for a in sys.argv[1:]:
        if a.startswith("--"):
            continue
        r = traiter(Path(a), essai)
        for k in total:
            total[k] += r[k]
        print(f"{a}: {sum(r['appliques'].values())} mot(s) passe(s) en Consolas, "
              f"{sum(r['ambigus'].values())} ambigu(s)")
    print("\nAmbigus, laisses en police normale :",
          ", ".join(f"{m} ({n})" for m, n in total["ambigus"].most_common()) or "aucun")
    print("Mots Java dans des titres, non touches :",
          ", ".join(f"{m} ({n})" for m, n in total["titres"].most_common()) or "aucun")
    if essai:
        print("\nMots appliques :", ", ".join(f"{m} ({n})" for m, n in total["appliques"].most_common()))


if __name__ == "__main__":
    main()
