package be.ephec.java.demo.enu;

/**
 * DEMO ENU — etat final.
 *
 * La boucle tourne deux fois le cycle complet, quelle que soit sa
 * longueur. Ajoutez un mode dans l'enum et relancez : tout suit.
 */
public class Demo {

    public static void main(String[] args) {
        Lecteur lecteur = new Lecteur();

        for (int appui = 0; appui < Mode.values().length * 2; appui++) {
            System.out.println(lecteur.getMode());
            lecteur.modeSuivant();
        }
    }
}
