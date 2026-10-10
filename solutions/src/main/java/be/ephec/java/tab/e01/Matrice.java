package be.ephec.java.tab.e01;

/**
 * TAB.1 — CORRIGE.
 *
 * Un tableau a deux dimensions n'est rien d'autre qu'un tableau dont chaque
 * case contient un tableau. matrice[i] designe la ligne i, matrice[i][j] la
 * case j de cette ligne.
 */
public class Matrice {

    public static int[][] carree(int n) {
        int[][] matrice = new int[n][n];

        // Un seul compteur pour tout le remplissage : il avance case par case,
        // ligne apres ligne. Inutile de calculer i * n + j + 1.
        int valeur = 1;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                matrice[i][j] = valeur;
                valeur++;
            }
        }
        return matrice;
    }

    /**
     * Le separateur se place AVANT chaque element sauf le premier, ce qui evite
     * d'avoir a supprimer un separateur en trop a la fin.
     *
     * StringBuilder plutot que des concatenations de String : chaque "+" sur
     * une String fabrique une nouvelle chaine, ce qui devient couteux dans une
     * boucle.
     */
    public static String enTexte(int[][] matrice) {
        StringBuilder texte = new StringBuilder();

        for (int i = 0; i < matrice.length; i++) {
            if (i > 0) {
                texte.append('\n');
            }
            for (int j = 0; j < matrice[i].length; j++) {
                if (j > 0) {
                    texte.append(' ');
                }
                texte.append(matrice[i][j]);
            }
        }
        return texte.toString();
    }
}
