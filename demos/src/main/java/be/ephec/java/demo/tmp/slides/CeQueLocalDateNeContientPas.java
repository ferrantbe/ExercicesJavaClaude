package be.ephec.java.demo.tmp.slides;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.time.temporal.UnsupportedTemporalTypeException;

/**
 * Slide « Ce que LocalDate ne contient pas » (TMP, section 5).
 *
 * Une LocalDate n'a pas d'heure : on peut compter ses jours, pas ses secondes.
 */
public class CeQueLocalDateNeContientPas {

    public static void main(String[] args) {
        LocalDate d1 = LocalDate.of(2027, 1, 19);
        LocalDate d2 = LocalDate.of(2027, 1, 26);
        System.out.println(ChronoUnit.DAYS.between(d1, d2));      // fonctionne
        try {
            System.out.println(ChronoUnit.SECONDS.between(d1, d2));
        } catch (UnsupportedTemporalTypeException e) {
            System.out.println("Refus : " + e.getMessage());
        }
    }

    /* Sortie attendue :
    7
    Refus : Unsupported unit: Seconds
    */
}
