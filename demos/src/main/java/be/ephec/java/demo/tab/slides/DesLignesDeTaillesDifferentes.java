package be.ephec.java.demo.tab.slides;

/**
 * Slide « Declarer les lignes une par une » (TAB, section 3).
 *
 * Seule la premiere dimension est donnee ; chaque ligne recoit ensuite sa
 * propre longueur. Ce programme n'en montre que la forme : remplir le
 * triangle est l'objet de l'exercice TAB.2.
 */
public class DesLignesDeTaillesDifferentes {

    public static void main(String[] args) {
        int n = 4;
        int[][] triangle = new int[n][];

        for (int i = 0; i < n; i++) {
            triangle[i] = new int[i + 1];
        }

        for (int[] ligne : triangle) {
            System.out.println("Une ligne de " + ligne.length + " case(s)");
        }
    }

    /* Sortie attendue :
    Une ligne de 1 case(s)
    Une ligne de 2 case(s)
    Une ligne de 3 case(s)
    Une ligne de 4 case(s)
    */
}
