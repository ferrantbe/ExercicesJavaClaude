package be.ephec.java.demo.abs.slides;

/**
 * Slides « L'obligation faite aux sous-classes » et « @Override, aussi pour
 * une methode abstraite » (ABS, section 4).
 *
 * Essayez : renommez nom en Nom. Avec @Override, l'erreur tombe sur cette
 * methode ; retirez aussi @Override, et l'erreur tombe sur la ligne de la classe.
 */
public class Cercle extends Forme {

    @Override
    public String nom() {
        return "cercle";
    }
}
