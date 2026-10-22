package be.ephec.java.demo.col;

/**
 * DEMO COL — etat final.
 *
 * Le programme n'a pas change d'une ligne depuis le depart. Turing est
 * toujours invite deux fois, et pourtant il n'apparait qu'une seule fois :
 * c'est la structure qui s'en occupe, pas le code qui l'utilise.
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
