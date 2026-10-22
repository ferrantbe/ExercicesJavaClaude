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

Deux complements, facultatifs, dans la meme classe :
  - un commentaire « Entree : » donne ce que le programme lit au clavier ;
  - une ligne attendue qui commence par ~ est une expression reguliere, pour une
    sortie qui change d'un jour a l'autre (une annee, un age).

Il sert a garantir que le code montre aux etudiants compile, et fait ce que la
slide et ses commentaires annoncent. Code de retour 1 si une seule classe echoue.
Les classes de test (demos/src/test/.../<theme>/slides) sont aussi lancees, sans
JUnit : une doublure minimale de JUnit (@Test, @BeforeEach, @DisplayName,
assertEquals, assertThrows, assertTrue, assertFalse) est collee au fichier, et
chaque methode @Test doit passer. C'est une verification de logique, pas de
configuration : elle ne remplace pas un lancement dans IntelliJ.
"""
import re
import subprocess
import sys
import tempfile
from pathlib import Path

RACINE = Path(__file__).resolve().parent.parent
BASE = RACINE / "demos" / "src" / "main" / "java" / "be" / "ephec" / "java" / "demo"
BASE_TEST = RACINE / "demos" / "src" / "test" / "java" / "be" / "ephec" / "java" / "demo"

DOUBLURE_JUNIT = """
@java.lang.annotation.Retention(java.lang.annotation.RetentionPolicy.RUNTIME) @interface Test {}
@java.lang.annotation.Retention(java.lang.annotation.RetentionPolicy.RUNTIME) @interface BeforeEach {}
@java.lang.annotation.Retention(java.lang.annotation.RetentionPolicy.RUNTIME) @interface DisplayName { String value(); }
class DoublureJUnit {
    static void assertEquals(Object attendu, Object obtenu) {
        if (!java.util.Objects.equals(attendu, obtenu))
            throw new AssertionError("expected: <" + attendu + "> but was: <" + obtenu + ">");
    }
    static void assertEquals(double attendu, double obtenu, double delta) {
        if (Math.abs(attendu - obtenu) > delta)
            throw new AssertionError("expected: <" + attendu + "> but was: <" + obtenu + ">");
    }
    static void assertTrue(boolean b) { if (!b) throw new AssertionError("expected true"); }
    static void assertFalse(boolean b) { if (b) throw new AssertionError("expected false"); }
    interface Executable { void execute() throws Throwable; }
    static <T extends Throwable> T assertThrows(Class<T> type, Executable e) {
        try { e.execute(); } catch (Throwable t) {
            if (type.isInstance(t)) return type.cast(t);
            throw new AssertionError("expected " + type.getSimpleName() + " but was " + t);
        }
        throw new AssertionError("expected " + type.getSimpleName() + " to be thrown");
    }
}
"""

LANCEUR = """
public class LanceurDeTests {
    public static void main(String[] args) throws Exception {
        int echecs = 0;
        for (String nom : args) {
            Class<?> c = Class.forName(nom);
            for (java.lang.reflect.Method m : c.getDeclaredMethods()) {
                if (!m.isAnnotationPresent(Test.class)) continue;
                Object o = c.getDeclaredConstructor().newInstance();
                try {
                    for (java.lang.reflect.Method b : c.getDeclaredMethods())
                        if (b.isAnnotationPresent(BeforeEach.class)) { b.setAccessible(true); b.invoke(o); }
                    m.setAccessible(true);
                    m.invoke(o);
                    System.out.println("vert  " + nom + "." + m.getName());
                } catch (java.lang.reflect.InvocationTargetException e) {
                    echecs++;
                    System.out.println("ROUGE " + nom + "." + m.getName() + " : " + e.getCause());
                }
            }
        }
        System.exit(echecs == 0 ? 0 : 1);
    }
}
"""


def attendu(source):
    m = re.search(r"/\*\s*Sortie attendue :\s*\n(.*?)\*/", source, re.S)
    return None if m is None else [l.strip() for l in m.group(1).strip().splitlines()]


def entree(source):
    m = re.search(r"/\*\s*Entree :\s*\n(.*?)\*/", source, re.S)
    return None if m is None else "\n".join(l.strip() for l in m.group(1).strip().splitlines()) + "\n"


def conforme(obtenu, voulu):
    if len(obtenu) != len(voulu):
        return False
    for o, v in zip(obtenu, voulu):
        if v.startswith("~"):
            if not re.fullmatch(v[1:], o):
                return False
        elif o != v:
            return False
    return True


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
    if any("import javafx" in f.read_text(encoding="utf-8") for f in dossier.rglob("*.java")):
        # JavaFX n'est pas disponible ici : ce code se verifie en le lancant dans IntelliJ
        print(f"  --    {theme}.slides : JavaFX, non verifie ici (a lancer dans IntelliJ)")
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
            # lance dans un dossier temporaire : un programme qui ecrit des fichiers
            # (theme FIC) ne laisse rien dans le depot
            r = subprocess.run(["java", str(f)], capture_output=True, text=True, timeout=60,
                               input=entree(sources[nom]), cwd=tmp)
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
        elif conforme(obtenu, voulu):
            print(f"  ok    {theme}.slides.{nom}")
        else:
            ok = False
            print(f"  ECHEC {theme}.slides.{nom}\n    attendu : {voulu}\n    obtenu  : {obtenu}")
    return ok


def verifier_tests(theme):
    dossier = BASE_TEST / theme / "slides"
    if not dossier.is_dir():
        return True
    imports, corps, classes = set(), [], []
    # le code teste : le main/slides du theme, plus celui des themes que les tests importent
    themes = {theme}
    for f in dossier.glob("*.java"):
        themes |= set(re.findall(r"import be\.ephec\.java\.demo\.(\w+)\.slides\.", f.read_text(encoding="utf-8")))
    for f in sorted(p for t in sorted(themes) for p in (BASE / t / "slides").glob("*.java")):
        src = f.read_text(encoding="utf-8")
        if "static void main" in src:
            continue
        i, c = a_plat(src)
        imports.update(x for x in i if "be.ephec" not in x)
        corps.append(c)
    for f in sorted(dossier.glob("*.java")):
        src = f.read_text(encoding="utf-8")
        i, c = a_plat(src)
        imports.update(x for x in i if "org.junit" not in x and "be.ephec" not in x)
        nom = f.stem
        c = re.sub(rf"^(\s*)class {nom}\b", rf"\1class {nom} extends DoublureJUnit", c, count=1, flags=re.M)
        corps.append(c)
        classes.append(nom)
    texte = "\n".join(sorted(imports)) + "\n" + LANCEUR + DOUBLURE_JUNIT + "\n".join(corps)
    with tempfile.TemporaryDirectory() as tmp:
        f = Path(tmp) / "LanceurDeTests.java"
        f.write_text(texte, encoding="utf-8")
        r = subprocess.run(["java", str(f)] + classes, capture_output=True, text=True, timeout=120)
    if r.returncode != 0 and not r.stdout:
        print(f"  ECHEC tests {theme} : ne compilent pas\n{r.stderr[:1500]}")
        return False
    for l in r.stdout.splitlines():
        print(f"  test  {theme}.slides.{l[6:]}" if l.startswith("vert") else f"  ECHEC {l}")
    return r.returncode == 0


def main():
    themes = sys.argv[1:] or sorted(p.name for p in BASE.iterdir() if (p / "slides").is_dir())
    resultats = [verifier_theme(t) and verifier_tests(t) for t in themes]
    sys.exit(0 if all(resultats) else 1)


if __name__ == "__main__":
    main()
