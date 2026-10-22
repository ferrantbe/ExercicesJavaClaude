package be.ephec.java.travail;

/** DEPART ENU — six appuis sur le bouton. */
public class Demo {

    public static void main(String[] args) {
        Lecteur lecteur = new Lecteur();

        for (int appui = 0; appui < 6; appui++) {
            System.out.println(lecteur.getMode());
            lecteur.modeSuivant();
        }
    }
}
