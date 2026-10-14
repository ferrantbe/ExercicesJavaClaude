package be.ephec.java.demo.exc.slides;

/** L'ecran de la cabine, pour la slide « Un catch fait quelque chose ». */
public class Ecran {

    private final Ascenseur ascenseur;

    public Ecran(Ascenseur ascenseur) {
        this.ascenseur = ascenseur;
    }

    public void proposerEtagesValides() {
        System.out.println("Etages possibles : de 0 a " + ascenseur.dernierEtage());
    }
}
