package be.ephec.java.demo.tmp.slides;

import java.time.LocalTime;
import java.time.temporal.ChronoUnit;

/**
 * Slides « L'heure seule » et « Quelques exemples avec LocalTime » (TMP,
 * section 1). Pour une sortie stable, « maintenant » est fige a 18 h 47.
 */
public class ExemplesAvecLocalTime {

    public static void main(String[] args) {
        LocalTime debut = LocalTime.of(18, 0);
        LocalTime fin   = LocalTime.parse("21:35");
        int heure       = debut.getHour();
        System.out.println(debut + " a " + fin + ", debut a " + heure + " h");

        LocalTime maintenant = LocalTime.of(18, 47);   // au lieu de LocalTime.now()
        LocalTime uneHeurePlusTot = maintenant.minus(1, ChronoUnit.HOURS);
        boolean estAvant = uneHeurePlusTot.isBefore(maintenant);
        System.out.println(uneHeurePlusTot + " avant " + maintenant + " : " + estAvant);

        System.out.println(LocalTime.MIN + " " + LocalTime.MIDNIGHT + " " + LocalTime.NOON + " " + LocalTime.MAX);
    }

    /* Sortie attendue :
    18:00 a 21:35, debut a 18 h
    17:47 avant 18:47 : true
    00:00 00:00 12:00 23:59:59.999999999
    */
}
