package be.ephec.java.exc.e04;

/**
 * EXC.4 — CORRIGE.
 *
 * Deux exceptions non controlees, levees par la JVM elle-meme. Personne ne
 * vous oblige a les attraper — le code compile sans try — et c'est bien la le
 * piege : le programme plante a l'execution, pas a la compilation.
 *
 * Le bloc try n'entoure que ce qui peut echouer. On resiste a la tentation
 * d'y mettre toute la methode : plus le bloc est large, plus il devient
 * difficile de savoir quelle ligne a leve quoi.
 */
public class Tableau {

    public static String placerDouze(int taille, int position) {
        try {
            int[] tableau = new int[taille];
            tableau[position] = 12;

            return "12 place en position " + position
                    + " d'un tableau de " + taille + " cases";

        } catch (NegativeArraySizeException e) {
            // Levee par  new int[taille]  quand taille est negative.
            return "Taille impossible : " + taille;

        } catch (ArrayIndexOutOfBoundsException e) {
            // Levee par  tableau[position]  pour un indice hors limites,
            // aussi bien trop grand que negatif.
            return "Position " + position + " hors du tableau de " + taille + " cases";
        }
    }
}
