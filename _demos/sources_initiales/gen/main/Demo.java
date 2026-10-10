package be.ephec.java.travail;

/**
 * DEPART GEN — le transtypage, et ce qu'il cache.
 *
 * Ce programme compile sans le moindre avertissement. Il plante a
 * l'execution, plusieurs lignes apres l'erreur reelle.
 */
public class Demo {

    public static void main(String[] args) {
        Pile pile = new Pile();

        pile.empiler(10);
        pile.empiler(20);
        pile.empiler("trente");        // l'erreur est ICI

        int total = 0;
        while (pile.taille() > 0) {
            total += (Integer) pile.depiler();   // mais le plantage est LA
        }
        System.out.println("Total : " + total);
    }
}
