package be.ephec.java.tmp.e05;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;

/**
 * TMP.5 — A COMPLETER.
 *
 * Deux classes portent le mot "duree" en francais, et elles ne mesurent pas
 * la meme chose. Period compte en annees, mois et jours ; Duration compte en
 * heures, minutes et secondes.
 */
public class Statistiques {

    /**
     * Retourne l'age sous forme d'annees, mois et jours.
     */
    public static Period age(LocalDate naissance, LocalDate reference) {
        throw new UnsupportedOperationException("age n'est pas encore implementee");
    }

    /**
     * Retourne la duree d'une partie, en heures, minutes et secondes.
     */
    public static Duration dureeDePartie(LocalDateTime debut, LocalDateTime fin) {
        throw new UnsupportedOperationException("dureeDePartie n'est pas encore implementee");
    }

    /**
     * Retourne la duree d'une partie sous la forme "3h35".
     */
    public static String dureeLisible(LocalDateTime debut, LocalDateTime fin) {
        throw new UnsupportedOperationException("dureeLisible n'est pas encore implementee");
    }
}
