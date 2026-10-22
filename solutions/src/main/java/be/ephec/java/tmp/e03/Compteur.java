package be.ephec.java.tmp.e03;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Locale;

/**
 * TMP.3 — CORRIGE.
 *
 * Le point central : une LocalDate ne represente PAS un instant. Elle
 * represente une case du calendrier, sans heure, sans minute, sans seconde.
 * Lui demander un nombre de secondes n'a donc pas de sens, et le JDK ne se
 * gene pas pour le dire :
 *
 *     UnsupportedTemporalTypeException: Unsupported unit: Seconds
 *
 * Pour compter des secondes il faut un LocalDateTime, c'est-a-dire une date
 * ET une heure. atStartOfDay() fabrique ce LocalDateTime en fixant l'heure a
 * minuit — ce qui est exactement la convention demandee par l'enonce.
 */
public class Compteur {

    public static long secondesEntre(LocalDateTime debut, LocalDateTime fin) {
        return ChronoUnit.SECONDS.between(debut, fin);
    }

    public static long secondesDepuis(LocalDate naissance, LocalDateTime instant) {
        // atStartOfDay() : la date, plus l'heure 00:00.
        return secondesEntre(naissance.atStartOfDay(), instant);
    }

    /**
     * Locale.US impose la virgule comme separateur de milliers ; il ne reste
     * qu'a la remplacer par une espace.
     *
     * Pourquoi ne pas ecrire simplement String.format("%,d", nombre) ? Parce
     * que le separateur depend alors de la langue de la machine. En francais,
     * le JDK utilise une espace insecable etroite (U+202F) qui ressemble a une
     * espace ordinaire mais n'en est pas une : le test echouerait, et vous
     * chercheriez longtemps pourquoi.
     */
    public static String formater(long nombre) {
        return String.format(Locale.US, "%,d", nombre).replace(',', ' ');
    }
}
