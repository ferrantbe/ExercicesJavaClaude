package be.ephec.java.demo.tmp.slides;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

/** Slide « ChronoUnit, l'unite de mesure » (TMP, section 2). Aujourd'hui est fige au 19/01/2027. */
public class ChronoUnitLUniteDeMesure {

    public static void main(String[] args) {
        LocalDate naissance = LocalDate.of(1990, 5, 17);
        LocalDate aujourdhui = LocalDate.of(2027, 1, 19);
        long jours = ChronoUnit.DAYS.between(naissance, aujourdhui);
        long mois  = ChronoUnit.MONTHS.between(naissance, aujourdhui);
        System.out.println(jours + " jours, ou " + mois + " mois entiers");
    }

    /* Sortie attendue :
    13396 jours, ou 440 mois entiers
    */
}
