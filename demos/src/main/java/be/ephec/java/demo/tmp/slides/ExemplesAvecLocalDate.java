package be.ephec.java.demo.tmp.slides;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

/**
 * Slide « Quelques exemples avec LocalDate » (TMP, section 1).
 *
 * Les lignes qui dependent du jour ou vous lancez le programme sont signalees :
 * leur resultat change d'un jour a l'autre.
 */
public class ExemplesAvecLocalDate {

    public static void main(String[] args) {
        LocalDate aujourdhui = LocalDate.now();                         // varie
        LocalDate demain = LocalDate.now().plusDays(1);                 // varie
        LocalDate memeJourMoisPrecedent = LocalDate.now().minus(1, ChronoUnit.MONTHS);   // varie
        System.out.println("Demain : " + demain);
        System.out.println("Il y a un mois : " + memeJourMoisPrecedent);

        System.out.println(LocalDate.parse("2008-06-15"));
        System.out.println(LocalDate.of(2008, 6, 15));

        DayOfWeek jeudi = LocalDate.parse("2010-07-15").getDayOfWeek();
        int deux = LocalDate.parse("2012-09-02").getDayOfMonth();
        System.out.println(jeudi + ", " + deux);

        boolean estBissextile = LocalDate.of(2028, 3, 1).isLeapYear();
        System.out.println("2028 bissextile : " + estBissextile);

        LocalDate fevrier = LocalDate.of(2028, 2, 10);
        int joursDansMois = fevrier.lengthOfMonth();
        int joursDansAnnee = fevrier.lengthOfYear();
        System.out.println(joursDansMois + " jours en fevrier 2028, " + joursDansAnnee + " dans l'annee");

        LocalDate naissance = LocalDate.of(1990, 5, 17);
        long ageEnJours = ChronoUnit.DAYS.between(naissance, LocalDate.of(2027, 1, 19));
        System.out.println("Age en jours le 19 janvier 2027 : " + ageEnJours);
    }

    /* Sortie attendue :
    ~Demain : \d{4}-\d{2}-\d{2}
    ~Il y a un mois : \d{4}-\d{2}-\d{2}
    2008-06-15
    2008-06-15
    THURSDAY, 2
    2028 bissextile : true
    29 jours en fevrier 2028, 366 dans l'annee
    Age en jours le 19 janvier 2027 : 13396
    */
}
