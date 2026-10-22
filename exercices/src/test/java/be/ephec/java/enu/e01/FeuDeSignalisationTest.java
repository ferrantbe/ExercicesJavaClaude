package be.ephec.java.enu.e01;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * ENU.1 — Verification automatique.
 *
 * Les couleurs sont obtenues par CouleurDeFeu.valueOf("...") et non par
 * CouleurDeFeu.VERT : ainsi ce test compile meme avant que vous n'ayez
 * declare les constantes, et il vous dit lesquelles manquent.
 */
class FeuDeSignalisationTest {

    private static CouleurDeFeu couleur(String nom) {
        try {
            return CouleurDeFeu.valueOf(nom);
        } catch (IllegalArgumentException e) {
            return fail("La constante " + nom + " n'existe pas dans CouleurDeFeu.");
        }
    }

    @Test
    @DisplayName("L'enum declare exactement trois couleurs, dans l'ordre")
    void troisCouleurs() {
        assertEquals(3, CouleurDeFeu.values().length);
        assertEquals(0, couleur("VERT").ordinal(), "VERT doit etre declare en premier");
        assertEquals(1, couleur("ORANGE").ordinal());
        assertEquals(2, couleur("ROUGE").ordinal());
    }

    @Test
    @DisplayName("Un feu neuf est inactif et orange")
    void feuNeuf() {
        FeuDeSignalisation feu = new FeuDeSignalisation();

        assertFalse(feu.estActif());
        assertEquals(couleur("ORANGE"), feu.getCouleur());
    }

    @Test
    @DisplayName("Un feu inactif ne change pas de couleur")
    void feuInactifImmobile() {
        FeuDeSignalisation feu = new FeuDeSignalisation();

        feu.changeDeCouleur();
        feu.changeDeCouleur();

        assertEquals(couleur("ORANGE"), feu.getCouleur());
    }

    @Test
    @DisplayName("Activer le feu le met au rouge")
    void activation() {
        FeuDeSignalisation feu = new FeuDeSignalisation();

        feu.active();

        assertTrue(feu.estActif());
        assertEquals(couleur("ROUGE"), feu.getCouleur());
    }

    @Test
    @DisplayName("Le cycle est vert, orange, rouge, puis on recommence")
    void cycleDesCouleurs() {
        FeuDeSignalisation feu = new FeuDeSignalisation();
        feu.active();

        assertEquals(couleur("ROUGE"), feu.getCouleur());
        feu.changeDeCouleur();
        assertEquals(couleur("VERT"), feu.getCouleur());
        feu.changeDeCouleur();
        assertEquals(couleur("ORANGE"), feu.getCouleur());
        feu.changeDeCouleur();
        assertEquals(couleur("ROUGE"), feu.getCouleur());
    }

    @Test
    @DisplayName("Desactiver ramene le feu a l'orange")
    void desactivation() {
        FeuDeSignalisation feu = new FeuDeSignalisation();
        feu.active();
        feu.changeDeCouleur();

        feu.desactive();

        assertFalse(feu.estActif());
        assertEquals(couleur("ORANGE"), feu.getCouleur());
    }

    @Test
    @DisplayName("Un feu inactif s'ecrit ORANGE (inactif)")
    void feuInactifEnTexte() {
        FeuDeSignalisation feu = new FeuDeSignalisation();

        assertEquals("ORANGE (inactif)", feu.enTexte());
    }

    @Test
    @DisplayName("Un feu active s'ecrit ROUGE (actif)")
    void feuActifEnTexte() {
        FeuDeSignalisation feu = new FeuDeSignalisation();

        feu.active();

        assertEquals("ROUGE (actif)", feu.enTexte());
    }
}
