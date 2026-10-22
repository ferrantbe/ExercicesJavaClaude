package be.ephec.java.tmp.e06;

import java.time.LocalDate;

/**
 * TMP.6 — A COMPLETER.
 *
 * Passer d'une date a du texte, et du texte a une date.
 * Indice : java.time.format.DateTimeFormatter
 */
public class FormatBelge {

    /** Retourne la date au format jour/mois/annee, par exemple "19/01/2027". */
    public static String enTexte(LocalDate date) {
        throw new UnsupportedOperationException("enTexte n'est pas encore implementee");
    }

    /** Analyse un texte au format jour/mois/annee et retourne la date correspondante. */
    public static LocalDate depuisTexte(String texte) {
        throw new UnsupportedOperationException("depuisTexte n'est pas encore implementee");
    }

    /**
     * Meme chose, mais en refusant les dates qui n'existent pas.
     * Indice : ResolverStyle.STRICT, et le motif uuuu au lieu de yyyy.
     */
    public static LocalDate depuisTexteStrict(String texte) {
        throw new UnsupportedOperationException("depuisTexteStrict n'est pas encore implementee");
    }
}
