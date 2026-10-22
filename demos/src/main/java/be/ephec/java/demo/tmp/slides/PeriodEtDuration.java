package be.ephec.java.demo.tmp.slides;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.Period;

/**
 * Slides « Period, les unites du calendrier » et « Duration, les unites de
 * l'horloge » (TMP, section 7). Aujourd'hui est fige au 19/01/2027, la date
 * qui donne les valeurs de la slide.
 */
public class PeriodEtDuration {

    public static void main(String[] args) {
        LocalDate naissance = LocalDate.of(1990, 5, 17);
        LocalDate aujourdhui = LocalDate.of(2027, 1, 19);
        Period p = Period.between(naissance, aujourdhui);
        System.out.println(p.getYears() + " ans, " + p.getMonths() + " mois, " + p.getDays() + " jours");

        LocalTime debut = LocalTime.of(18, 0);
        LocalTime fin = LocalTime.parse("21:35");
        Duration d = Duration.between(debut, fin);
        System.out.println(d.toHours() + " heures, ou " + d.toMinutes() + " minutes");
    }

    /* Sortie attendue :
    36 ans, 8 mois, 2 jours
    3 heures, ou 215 minutes
    */
}
