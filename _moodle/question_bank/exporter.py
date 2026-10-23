#!/usr/bin/env python3
"""
exporter.py — les questions des modules TMP a FIC, au format Moodle XML
(un fichier par module), et un document de relecture (23/10/2026).

    python3 _moodle/question_bank/exporter.py

Les questions vivent dans questions_modules.py ; celles de POO dans
questions_POO.py. Chaque question renvoie, en cas d'erreur, a la section du
support qui la traite ; le titre de la section est lu dans la source du
support (_support/generateurs/Support_XXX.md).
"""
import html
import json
import re
import subprocess
from pathlib import Path

ICI = Path(__file__).resolve().parent
RACINE = ICI.parent.parent
from questions_modules import MODULES  # noqa: E402


def proteger(texte):
    """Le HTML des questions : seules les balises <code> sont des balises ;
    tout autre < ou > (List<String>, a < b) est du texte, a echapper, sans
    quoi Moodle le prend pour une balise et le fait disparaitre."""
    morceaux = re.split(r"(</?code>)", texte)
    return "".join(m if m in ("<code>", "</code>") else html.escape(m, quote=False) for m in morceaux)


def sections(code):
    md = (RACINE / f"_support/generateurs/Support_{code}.md").read_text(encoding="utf-8")
    return {int(m[1]): re.sub(r"`", "", m[2]).strip() for m in re.finditer(r"^## (\d+)\. (.+)$", md, re.M)}


def xml(code, titre, questions):
    cd = lambda s: "<![CDATA[" + s + "]]>"
    noms = sections(code)
    x = ['<?xml version="1.0" encoding="UTF-8"?>', "<quiz>",
         f'<question type="category"><category><text>$course$/top/{code} - {titre}</text></category></question>']
    for nom, enonce, reponses, explication, sec in questions:
        enonce, explication = proteger(enonce), proteger(explication)
        reponses = [proteger(r) for r in reponses]
        renvoi = f"Revoyez {code} §{sec}, « {noms[sec]} », dans le support du module {code}."
        x.append('<question type="multichoice">')
        x.append(f"<name><text>{code} - {nom.replace('&', '&amp;').replace('<', '&lt;')}</text></name>")
        x.append(f'<questiontext format="html"><text>{cd("<p>" + enonce + "</p>")}</text></questiontext>')
        x.append(f'<generalfeedback format="html"><text>{cd("<p>" + explication + "</p>")}</text></generalfeedback>')
        x.append("<defaultgrade>1</defaultgrade><penalty>0</penalty><hidden>0</hidden><single>true</single>"
                 "<shuffleanswers>true</shuffleanswers><answernumbering>abc</answernumbering>")
        x.append(f'<correctfeedback format="html"><text>{cd("<p>Exact.</p>")}</text></correctfeedback>')
        x.append(f'<incorrectfeedback format="html"><text>{cd("<p>Pas tout à fait. " + renvoi + "</p>")}</text></incorrectfeedback>')
        for i, r in enumerate(reponses):
            x.append(f'<answer fraction="{100 if i == 0 else 0}" format="html"><text>{cd(r)}</text>'
                     '<feedback format="html"><text></text></feedback></answer>')
        x.append("</question>")
    x.append("</quiz>")
    (ICI / f"questions_{code}.xml").write_text("\n".join(x), encoding="utf-8")


def main():
    relecture = []
    for code, (titre, questions) in MODULES.items():
        xml(code, titre, questions)
        noms = sections(code)
        relecture.append({"code": code, "titre": titre, "questions": [
            {"nom": n, "enonce": proteger(e), "reponses": [proteger(y) for y in r], "explication": proteger(x),
             "renvoi": f"{code} §{s}, « {noms[s]} »"}
            for n, e, r, x, s in questions]})
    (ICI / "relecture.json").write_text(json.dumps(relecture, ensure_ascii=False), encoding="utf-8")
    print(sum(len(q) for _, q in MODULES.values()), "questions,", len(MODULES), "modules")


if __name__ == "__main__":
    main()
