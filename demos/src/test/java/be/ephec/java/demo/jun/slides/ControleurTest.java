package be.ephec.java.demo.jun.slides;

import be.ephec.java.demo.itf.slides.Afficheur;
import be.ephec.java.demo.itf.slides.Controleur;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Slide « Tester sans ouvrir la fenetre » (JUN, section 5).
 *
 * Le controleur du module ITF ne depend que d'Afficheur : le test lui donne
 * une doublure qui retient le message, et verifie ce qui a ete signale.
 */
class ControleurTest {

    static class AfficheurQuiRetient implements Afficheur {

        String dernier;

        @Override
        public void affiche(String message) {
            dernier = message;
        }
    }

    @Test
    void leControleurSignaleLEvenement() {
        Controleur controleur = new Controleur();
        AfficheurQuiRetient afficheur = new AfficheurQuiRetient();
        controleur.setAfficheur(afficheur);

        controleur.annoncer("bouton presse");

        assertEquals("Evenement : bouton presse", afficheur.dernier);
    }
}
