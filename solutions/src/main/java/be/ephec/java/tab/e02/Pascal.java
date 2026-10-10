package be.ephec.java.tab.e02;

/**
 * TAB.2 — CORRIGE.
 *
 * Le point interessant de cet exercice : le tableau n'est pas rectangulaire.
 * On declare int[n][] — le nombre de lignes seulement — puis on cree chaque
 * ligne a sa propre taille.
 */
public class Pascal {

    public static int[][] triangle(int n) {
        int[][] triangle = new int[n][];

        for (int ligne = 0; ligne < n; ligne++) {
            triangle[ligne] = new int[ligne + 1];

            // Les deux bords valent 1. Pour la premiere ligne, les deux
            // instructions ecrivent dans la meme case, ce qui est sans effet.
            triangle[ligne][0] = 1;
            triangle[ligne][ligne] = 1;

            // L'interieur : la somme des deux nombres de la ligne precedente.
            // La boucle ne demarre qu'a 1 et s'arrete avant 'ligne', donc elle
            // ne tourne pas du tout pour les deux premieres lignes.
            for (int colonne = 1; colonne < ligne; colonne++) {
                triangle[ligne][colonne] =
                        triangle[ligne - 1][colonne - 1] + triangle[ligne - 1][colonne];
            }
        }
        return triangle;
    }
}
