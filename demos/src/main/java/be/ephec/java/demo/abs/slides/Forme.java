package be.ephec.java.demo.abs.slides;

/** Slide « La regle de partage » (ABS, section 4). */
public abstract class Forme {

    // ce qui VARIE : chaque sous-classe le definit
    public abstract String nom();

    // ce qui est COMMUN : ecrit une seule fois
    public void affiche() {
        System.out.println("Je suis un " + nom());
    }
}
