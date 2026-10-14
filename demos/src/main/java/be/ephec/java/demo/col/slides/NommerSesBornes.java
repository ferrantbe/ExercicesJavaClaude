package be.ephec.java.demo.col.slides;

import java.util.Random;

/**
 * Slide « Nommer ses bornes » (COL, section 2).
 *
 * Les memes constantes servent au message et au calcul : changer MAXIMUM
 * change les deux. Le Random a une graine pour une sortie stable.
 */
public class NommerSesBornes {

    private static final int MINIMUM = 0;
    private static final int MAXIMUM = 1000;

    public static void main(String[] args) {
        Random hasard = new Random(3);
        System.out.printf("Nombres entre %d et %d%n", MINIMUM, MAXIMUM);
        int tire = MINIMUM + hasard.nextInt(MAXIMUM - MINIMUM + 1);
        System.out.println("Tire : " + tire + (tire >= MINIMUM && tire <= MAXIMUM ? ", dans les bornes" : ""));
    }

    /* Sortie attendue :
    Nombres entre 0 et 1000
    Tire : 369, dans les bornes
    */
}
