package be.ephec.java.exc.e04;

/**
 * EXC.4 — A COMPLETER.
 *
 * Jusqu'ici vous avez cree vos propres exceptions. Celles-ci existent deja :
 * c'est la JVM qui les leve, et vous n'avez qu'a les attraper.
 */
public class Tableau {

    /**
     * Cree un tableau de la taille demandee et y place la valeur 12 a la
     * position demandee, puis rend un compte-rendu.
     *
     * Trois issues possibles, aux messages imposes :
     *
     *   tout se passe bien
     *       "12 place en position 2 d'un tableau de 5 cases"
     *
     *   la taille est negative — la JVM leve NegativeArraySizeException
     *       "Taille impossible : -3"
     *
     *   la position n'existe pas — la JVM leve ArrayIndexOutOfBoundsException
     *       "Position 7 hors du tableau de 5 cases"
     *
     * La methode ne doit JAMAIS propager d'exception : elle les traite toutes
     * et rend un texte.
     */
    public static String placerDouze(int taille, int position) {
        throw new UnsupportedOperationException("placerDouze n'est pas encore implementee");
    }
}
