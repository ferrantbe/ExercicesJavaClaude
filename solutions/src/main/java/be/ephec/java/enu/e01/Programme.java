package be.ephec.java.enu.e01;

/** ENU.1 — CORRIGE. */
public class Programme {

    public static void main(String[] args) {
        FeuDeSignalisation feu = new FeuDeSignalisation();
        System.out.println("Feu neuf          : " + feu.enTexte());

        feu.changeDeCouleur();
        System.out.println("Apres changement  : " + feu.enTexte() + "   (rien n'a bouge)");

        feu.active();
        System.out.println("Apres activation  : " + feu.enTexte());

        for (int i = 0; i < 4; i++) {
            feu.changeDeCouleur();
            System.out.println("Changement " + (i + 1) + "      : " + feu.enTexte());
        }

        feu.desactive();
        System.out.println("Apres extinction  : " + feu.enTexte());
    }
}
