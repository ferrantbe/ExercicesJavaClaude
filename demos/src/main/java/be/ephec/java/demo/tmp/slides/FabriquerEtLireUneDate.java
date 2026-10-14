package be.ephec.java.demo.tmp.slides;

import java.time.DayOfWeek;
import java.time.LocalDate;

/**
 * Slides « Fabriquer une date », « Lire un morceau de date » et « Comparer
 * deux dates » (TMP, section 1).
 *
 * Pour que la sortie soit la meme a chaque lancement, « aujourd'hui » est fige
 * au 19 janvier 2027, premier jour du cours. Remplacez-le par LocalDate.now()
 * pour travailler avec la vraie date.
 */
public class FabriquerEtLireUneDate {

    public static void main(String[] args) {
        LocalDate aujourdhui = LocalDate.of(2027, 1, 19);   // au lieu de LocalDate.now()
        LocalDate naissance  = LocalDate.of(1990, 5, 17);
        LocalDate lue        = LocalDate.parse("1990-05-17");
        System.out.println(naissance + " et " + lue + " : " + naissance.equals(lue));

        int annee          = naissance.getYear();
        int jourDuMois     = naissance.getDayOfMonth();
        DayOfWeek jour     = naissance.getDayOfWeek();
        boolean bissextile = naissance.isLeapYear();
        int joursDuMois    = naissance.lengthOfMonth();
        System.out.println(annee + ", le " + jourDuMois + ", un " + jour
                + ", bissextile : " + bissextile + ", mois de " + joursDuMois + " jours");

        System.out.println(naissance.isBefore(aujourdhui));   // true
        System.out.println(naissance.isAfter(aujourdhui));    // false
        System.out.println(naissance.isEqual(aujourdhui));    // false
    }

    /* Sortie attendue :
    1990-05-17 et 1990-05-17 : true
    1990, le 17, un THURSDAY, bissextile : false, mois de 31 jours
    true
    false
    false
    */
}
