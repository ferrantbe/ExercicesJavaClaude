#!/usr/bin/env python3
"""
garde.py — la page de garde dans sa propre section (demande du 20/10/2026).

    python3 _outils/garde.py fichier.docx [...]

La ligne du haut (logo EPHEC, « Année académique ») passe dans l'en-tete de
la page de garde, et la ligne du bas (« EPHEC — Bachelier en informatique,
niveau 2 ») dans son pied de page. Le pied reste ainsi colle au bas de la
page, meme quand un sous-titre sur deux lignes allonge la page : avant, il
fallait retoucher a la main l'espace qui le precedait, sans quoi il passait
sur la page suivante.

La page de garde devient la section 1 ; le reste du document recoit un
en-tete et un pied vides, pour ne pas heriter de ceux de la garde.
ajouter_pagination.py appelle ce traitement lui-meme ; ce script sert aux
documents qui ne sont pas pagines (demos, memento, guide). Relance sans effet
sur un document deja traite.
"""
import html
import re
import shutil
import sys
import zipfile
from pathlib import Path

REL = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
CT = "application/vnd.openxmlformats-officedocument.wordprocessingml."


def texte(x):
    return "".join(re.findall(r"<w:t[^>]*>([^<]*)</w:t>", x))


def paragraphes(x):
    return list(re.finditer(r"<w:p\b[^>]*>(?:(?!<w:p\b).)*?</w:p>", x, re.S))


def id_libre(rels, deja):
    n = 1
    while f'Id="rId{n}"' in rels or f"rId{n}" in deja:
        n += 1
    deja.add(f"rId{n}")
    return f"rId{n}"


def isoler_garde(entrees, ordre):
    """Travaille sur le contenu du .docx (dictionnaire nom -> octets).
    Retourne False si le document est deja traite ou sans page de garde."""
    xml = entrees["word/document.xml"].decode("utf-8")
    saut = re.search(r'<w:p\b[^>]*>(?:(?!</w:p>).)*?<w:br w:type="page"/>.*?</w:p>', xml, re.S)
    corps = xml.index("<w:body>") + len("<w:body>")
    if saut is None:
        return False
    garde = xml[corps:saut.start()]
    if "<w:sectPr" in garde or "Bachelier en informatique" not in garde:
        return False
    ps = paragraphes(garde)
    haut = next((p for p in ps if "<w:drawing" in p.group(0) and "Année académique" in texte(p.group(0))), None)
    bas = next((p for p in ps if "Bachelier en informatique" in texte(p.group(0))), None)
    if haut is None or bas is None:
        return False
    p_haut, p_bas = haut.group(0), bas.group(0)
    # la mention de l'usage de l'IA, si la page de garde en porte une, va
    # dans le pied, au-dessus de la ligne EPHEC (22/10/2026)
    ia = next((p for p in ps if "élaboré avec l" in html.unescape(texte(p.group(0)))), None)
    # le pied n'a plus besoin de l'espace qui le poussait en bas de page
    p_bas = re.sub(r'<w:spacing\b[^>]*/>', "", p_bas)
    garde = garde.replace(haut.group(0), "", 1).replace(bas.group(0), "", 1)
    if ia is not None:
        garde = garde.replace(ia.group(0), "", 1)
        p_bas = ia.group(0) + p_bas

    rels = entrees["word/_rels/document.xml.rels"].decode("utf-8")
    types = entrees["[Content_Types].xml"].decode("utf-8")
    pris = set()
    racine = re.search(r"<w:document\b[^>]*>", xml).group(0)
    espaces = " ".join(re.findall(r'xmlns:\w+="[^"]*"', racine))

    def partie(nom, balise, contenu, liens=""):
        entrees[f"word/{nom}"] = (f'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
                                  f'<w:{balise} {espaces}>{contenu}</w:{balise}>').encode("utf-8")
        ordre.append(f"word/{nom}")
        if liens:
            entrees[f"word/_rels/{nom}.rels"] = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
                                                 '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
                                                 + liens + "</Relationships>").encode("utf-8")
            ordre.append(f"word/_rels/{nom}.rels")
        nonlocal types
        genre = "header+xml" if balise == "hdr" else "footer+xml"
        types = types.replace("</Types>", f'<Override PartName="/word/{nom}" ContentType="{CT}{genre}"/></Types>')

    # l'image du logo : sa relation est recopiee dans celle de l'en-tete
    liens = ""
    for rid in set(re.findall(r'r:embed="(rId\d+)"', p_haut)):
        cible = re.search(r'<Relationship [^>]*Id="%s"[^>]*/>' % rid, rels).group(0)
        liens += cible
    partie("header_garde.xml", "hdr", p_haut, liens)
    partie("footer_garde.xml", "ftr", p_bas)
    vide = '<w:p><w:pPr><w:spacing w:before="0" w:after="0"/></w:pPr></w:p>'
    partie("header_vide.xml", "hdr", vide)
    partie("footer_vide.xml", "ftr", vide)

    nouveaux = {}
    for nom, typ in (("header_garde.xml", "header"), ("footer_garde.xml", "footer"),
                     ("header_vide.xml", "header"), ("footer_vide.xml", "footer")):
        rid = id_libre(rels, pris)
        nouveaux[nom] = rid
        rels = rels.replace("</Relationships>", f'<Relationship Id="{rid}" Type="{REL}/{typ}" Target="{nom}"/></Relationships>')

    final = re.search(r"<w:sectPr\b.*?</w:sectPr>", xml[saut.end():], re.S).group(0)
    ouverture = re.match(r"<w:sectPr\b[^>]*>", final).group(0)
    nettoye = re.sub(r"<w:(?:header|footer)Reference\b[^>]*/>", "", final)
    s1 = nettoye.replace(ouverture, ouverture
                         + f'<w:headerReference w:type="default" r:id="{nouveaux["header_garde.xml"]}"/>'
                         + f'<w:footerReference w:type="default" r:id="{nouveaux["footer_garde.xml"]}"/>', 1)
    s1 = re.sub(r"<w:pgNumType\b[^>]*/>", "", s1)
    existants = re.findall(r'<w:footerReference\b[^>]*/>', final)
    s2 = nettoye.replace(ouverture, ouverture
                         + f'<w:headerReference w:type="default" r:id="{nouveaux["header_vide.xml"]}"/>'
                         + ("".join(existants) if existants else
                            f'<w:footerReference w:type="default" r:id="{nouveaux["footer_vide.xml"]}"/>'), 1)
    reste = xml[saut.end():].replace(final, s2, 1)
    xml = xml[:corps] + garde + f"<w:p><w:pPr>{s1}</w:pPr></w:p>" + reste
    entrees["word/document.xml"] = xml.encode("utf-8")
    entrees["word/_rels/document.xml.rels"] = rels.encode("utf-8")
    entrees["[Content_Types].xml"] = types.encode("utf-8")
    return True


def traiter(chemin):
    chemin = Path(chemin)
    with zipfile.ZipFile(chemin) as z:
        ordre = z.namelist()
        entrees = {n: z.read(n) for n in ordre}
    if not isoler_garde(entrees, ordre):
        print(f"{chemin.name} : rien a faire")
        return
    tmp = chemin.with_suffix(".tmp.docx")
    with zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as z:
        for n in ordre:
            z.writestr(n, entrees[n])
    shutil.move(str(tmp), str(chemin))
    print(f"{chemin.name} : page de garde isolee")


if __name__ == "__main__":
    for f in sys.argv[1:]:
        traiter(f)
