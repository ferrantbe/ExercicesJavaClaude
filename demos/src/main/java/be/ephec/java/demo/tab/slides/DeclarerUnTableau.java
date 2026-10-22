package be.ephec.java.demo.tab.slides;

/**
 * Slides « Declarer un tableau », « Un tableau de tableaux », « La boucle
 * indexee » et « La boucle for-each » (TAB, sections 1 et 2).
 */
public class DeclarerUnTableau {

    public static void main(String[] args) {
        int[]    nombres = new int[5];            // 5 cases, toutes a 0
        String[] mots    = { "Hello", "world" };  // 2 cases, deja remplies
        System.out.println(nombres.length + " cases, la premiere vaut " + nombres[0]);
        System.out.println(mots[0] + " " + mots[1]);

        int[][] matrice = new int[3][3];   // un tableau DE TABLEAUX
        matrice[1][2] = 7;
        System.out.println("Une ligne de " + matrice[1].length + " cases ; matrice[1][2] = " + matrice[1][2]);

        int[] tab = { 1, 2, 3 };
        for (int i = 0; i < tab.length; i++) {
            tab[i] = tab[i] * 2;
        }
        for (int v : tab) {
            System.out.println(v);
        }
    }

    /* Sortie attendue :
    5 cases, la premiere vaut 0
    Hello world
    Une ligne de 3 cases ; matrice[1][2] = 7
    2
    4
    6
    */
}
