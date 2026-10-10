package be.ephec.java.travail;

import java.time.LocalTime;

/**
 * DEPART TMP — un seul besoin, et aucune documentation ouverte.
 *
 * Le cours commence a 18h00 et se termine a 21h35. Combien de temps
 * dure-t-il ?
 *
 * On ne cherche pas la reponse sur Internet : on la trouve dans l'editeur,
 * avec la completion et Ctrl+Q. C'est le sujet de la demonstration.
 */
public class Demo {

    public static void main(String[] args) {
        LocalTime debut = LocalTime.of(18, 0);
        LocalTime fin = LocalTime.of(21, 35);

        System.out.println("Debut : " + debut);
        System.out.println("Fin   : " + fin);

        // TODO en direct : trouver comment mesurer l'ecart entre les deux.
    }
}
