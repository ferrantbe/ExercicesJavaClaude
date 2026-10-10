package be.ephec.java.tmp.e01;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

/**
 * TMP.1 — CORRIGE.
 *
 * ChronoUnit.X.between(debut, fin) fait tout le travail. Elle rend un nombre
 * d'unites ENTIERES : entre le 1er et le 30 janvier il y a 0 mois, pas 0,97.
 * Et si fin precede debut, le resultat est negatif.
 */
public class UtilitaireDates {

    public static long ecartEnJours(LocalDate debut, LocalDate fin) {
        return ChronoUnit.DAYS.between(debut, fin);
    }

    public static long ecartEnSemaines(LocalDate debut, LocalDate fin) {
        return ChronoUnit.WEEKS.between(debut, fin);
    }

    public static long ecartEnMois(LocalDate debut, LocalDate fin) {
        return ChronoUnit.MONTHS.between(debut, fin);
    }

    public static long ecartEnAnnees(LocalDate debut, LocalDate fin) {
        return ChronoUnit.YEARS.between(debut, fin);
    }
}
