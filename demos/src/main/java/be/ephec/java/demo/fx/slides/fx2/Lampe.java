package be.ephec.java.demo.fx.slides.fx2;

/**
 * Slide « Qui connait qui » (FX2, section 3) : le modele, sans JavaFX.
 * Il ne sait rien de l'ecran ; c'est le controleur qui le consulte.
 */
public class Lampe {

    private boolean allumee;

    public void basculer() { allumee = !allumee; }

    public boolean estAllumee() { return allumee; }
}
