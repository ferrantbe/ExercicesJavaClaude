package be.ephec.java.travail;

/**
 * DEPART COL — deux problemes que la structure choisie ne voit pas.
 *
 * Turing est invite deux fois, et l'ordre d'affichage est celui des
 * insertions. Les deux se corrigeront en changeant UNE ligne, pas dix.
 */
public class Demo {

    public static void main(String[] args) {
        ListeDInvites liste = new ListeDInvites();

        liste.inviter("Turing");
        liste.inviter("Lovelace");
        liste.inviter("Hopper");
        liste.inviter("Turing");

        System.out.println(liste.nombre() + " invites");
        System.out.println(liste.tous());
    }
}
