package be.ephec.java.jun.e03;

import java.util.List;

/**
 * JUN.3 — Cette classe vous est FOURNIE, complete et fonctionnelle.
 *
 * Vous n'avez rien a y changer. Votre travail est d'ecrire SA classe de test.
 */
public class Moyenne {

    /**
     * Rend la moyenne arithmetique des notes.
     *
     * @param notes les notes, entre 0 et 20
     * @return la moyenne
     * @throws IllegalArgumentException si la liste est vide ou nulle,
     *                                  ou si une note sort de [0, 20]
     */
    public static double calculer(List<Integer> notes) {
        if (notes == null || notes.isEmpty()) {
            throw new IllegalArgumentException("Aucune note a moyenner");
        }
        int total = 0;
        for (Integer note : notes) {
            if (note < 0 || note > 20) {
                throw new IllegalArgumentException("Note hors bornes : " + note);
            }
            total += note;
        }
        return (double) total / notes.size();
    }

    /** Rend true si la moyenne des notes atteint 10. */
    public static boolean reussite(List<Integer> notes) {
        return calculer(notes) >= 10;
    }
}
