package be.ephec.java.tmp.e05;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;

/**
 * TMP.5 — CORRIGE.
 *
 * Period et Duration mesurent toutes deux un ecart, mais pas dans la meme
 * unite de pensee.
 *
 *   Period   compte en annees, mois et jours — des unites du CALENDRIER,
 *            dont la longueur varie. Un mois n'a pas toujours 30 jours.
 *   Duration compte en heures, minutes, secondes — des unites de TEMPS,
 *            toujours identiques.
 *
 * D'ou la regle simple : Period pour des dates, Duration pour des heures.
 */
public class Statistiques {

    public static Period age(LocalDate naissance, LocalDate reference) {
        return Period.between(naissance, reference);
    }

    public static Duration dureeDePartie(LocalDateTime debut, LocalDateTime fin) {
        return Duration.between(debut, fin);
    }

    public static String dureeLisible(LocalDateTime debut, LocalDateTime fin) {
        Duration duree = dureeDePartie(debut, fin);

        // toHours retourne le nombre total d'heures ; toMinutesPart retourne seulement
        // les minutes restantes. Ecrire duree.toMinutes() ici donnerait 215.
        return duree.toHours() + "h" + String.format("%02d", duree.toMinutesPart());
    }
}
