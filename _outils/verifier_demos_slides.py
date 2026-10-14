#!/usr/bin/env python3
"""Compile et execute le code des slides, et compare la sortie a celle annoncee.

    python3 _outils/verifier_demos_slides.py [theme ...]     (defaut : tous)

Le code des slides vit dans demos/src/main/java/be/ephec/java/demo/<theme>/slides/.
Chaque classe executable porte, a la fin, un commentaire « Sortie attendue : ».
Le script assemble chaque classe avec les classes de support de son theme en un
seul fichier, le lance avec le lanceur de fichier source de Java (java Fichier.java,
pas besoin de javac ni de Maven), puis compare :
  - la sortie standard, ligne par ligne ;
  - pour un programme qui s'arrete sur une exception, la premiere ligne de la trace.

Il sert a garantir que le code montre aux etudiants compile, et fait ce que la
slide et ses commentaires annoncent. Code de retour 1 si une seule classe echoue.
"""
import re
import subprocess
import sys
import tempfile
from pathlib import Path

RACINE = Path(__file__).resolve().parent.parent
BASE = RACINE / "demos" / "src" / "main" / "java" / "be" / "ephec" / "java" / "demo"


def attendu(source):
    m = re.search(r"/\*\s*Sortie attendue :\s*\n(.*?)\*/", source, re.S)
    return None if m is None else [l.strip() for l in m.group(1).strip().splitlines()]


def a_plat(source):
    """Retire package et imports, et le public des classes, pour un fichier unique."""
    imports = re.findall(r"^import .*?;$", source, re.M)
    corps = re.sub(r"^(package|import) .*?;\s*$", "", source, flags=re.M)
    corps = re.sub(r"^public (final |abstract )?(class|interface|record|enum) ", r"\1\2 ", corps, flags=re.M)
    return imports, corps


def verifier_theme(theme):
    dossier = BASE / theme / "slides"
    if not dossier.is_dir():
        print(f"{theme} : pas de dossier slides")
        return True
    fichiers = sorted(dossier.glob("*.java"))
    sources = {f.stem: f.read_text(encoding="utf-8") for f in fichiers}
    executables = [n for n, s in sources.items() if "static void main" in s]
    ok = True
    for nom in executables:
        imports, corps = set(), []
        principal = None
        for n, s in sources.items():
            i, c = a_plat(s)
            imports.update(i)
            if n == nom:
                principal = c
            elif "static void main" not in s:
                corps.append(c)
        texte = "\n".join(sorted(imports)) + "\n" + principal + "\n" + "\n".join(corps)
        texte = re.sub(rf"^class {nom} ", f"public class {nom} ", texte, flags=re.M)
        with tempfile.TemporaryDirectory() as tmp:
            f = Path(tmp) / f"{nom}.java"
            f.write_text(texte, encoding="utf-8")
            r = subprocess.run(["java", str(f)], capture_output=True, text=True, timeout=60)
        if "error:" in r.stderr and "Exception in thread" not in r.stderr:
            print(f"  ECHEC {theme}.slides.{nom} : ne compile pas\n{r.stderr[:800]}")
            ok = False
            continue
        obtenu = [l.strip() for l in r.stdout.strip().splitlines()]
        trace = [l for l in r.stderr.splitlines() if l.startswith("Exception in thread")]
        obtenu += [t.strip() for t in trace[:1]]
        voulu = attendu(sources[nom])
        if voulu is None:
            print(f"  ?     {theme}.slides.{nom} : pas de « Sortie attendue »")
        elif obtenu == voulu:
            print(f"  ok    {theme}.slides.{nom}")
        else:
            ok = False
            print(f"  ECHEC {theme}.slides.{nom}\n    attendu : {voulu}\n    obtenu  : {obtenu}")
    return ok


def main():
    themes = sys.argv[1:] or sorted(p.name for p in BASE.iterdir() if (p / "slides").is_dir())
    resultats = [verifier_theme(t) for t in themes]
    sys.exit(0 if all(resultats) else 1)


if __name__ == "__main__":
    main()
