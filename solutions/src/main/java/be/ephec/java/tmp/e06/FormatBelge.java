package be.ephec.java.tmp.e06;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.ResolverStyle;

/**
 * TMP.6 — CORRIGE.
 *
 * Le point important de cet exercice n'est pas le formatage, c'est le piege
 * de l'analyse. Par defaut, DateTimeFormatter travaille en mode SMART : il
 * accepte "31/02/2027" et le rabote silencieusement au 28 fevrier.
 *
 * Une saisie absurde devient donc une date plausible, sans le moindre
 * avertissement. Si vous validez une entree utilisateur, exigez le mode
 * STRICT — qui reclame au passage le motif uuuu (annee) au lieu de yyyy
 * (annee de l'ere), sans quoi il refuse de fonctionner.
 */
public class FormatBelge {

    private static final DateTimeFormatter TOLERANT =
            DateTimeFormatter.ofPattern("dd/MM/yyyy");

    private static final DateTimeFormatter STRICT =
            DateTimeFormatter.ofPattern("dd/MM/uuuu").withResolverStyle(ResolverStyle.STRICT);

    public static String enTexte(LocalDate date) {
        return date.format(TOLERANT);
    }

    public static LocalDate depuisTexte(String texte) {
        return LocalDate.parse(texte, TOLERANT);
    }

    public static LocalDate depuisTexteStrict(String texte) {
        return LocalDate.parse(texte, STRICT);
    }
}
