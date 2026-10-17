package be.ephec.java.demo.tmp;

import java.time.Duration;
import java.time.LocalTime;

/**
 * DEMO TMP — etat final.
 *
 * Rien de ce qui suit n'a ete cherche ailleurs que dans l'editeur. Le
 * chemin parcouru en direct :
 *
 *   1. taper  debut.  et lire ce que propose la completion ;
 *   2. Ctrl+Q sur until() : elle demande une unite, donc ChronoUnit ;
 *   3. Ctrl+Q sur Duration.between() : elle retourne un objet, pas un nombre ;
 *   4. taper  duree.  et decouvrir toHours, toMinutes, toMinutesPart.
 *
 * Le piege trouve en chemin : toMinutes() retourne 215, le total. C'est
 * toMinutesPart() qui retourne les 35 minutes restantes. La completion seule
 * ne le dit pas — c'est la Javadoc qui le dit.
 */
public class Demo {

    public static void main(String[] args) {
        LocalTime debut = LocalTime.of(18, 0);
        LocalTime fin = LocalTime.of(21, 35);

        Duration duree = Duration.between(debut, fin);

        System.out.println("En minutes : " + duree.toMinutes());
        System.out.println("En heures  : " + duree.toHours());

        // Le piege : toMinutes() aurait retourne 215, pas 35.
        System.out.printf("Lisible    : %dh%02d%n", duree.toHours(), duree.toMinutesPart());

        // Et la question qu'on se pose toujours trop tard : est-ce que
        // Duration.between accepte deux dates ? Ctrl+Q le dit.
        System.out.println("Fin + 20 min : " + fin.plusMinutes(20));
    }
}
