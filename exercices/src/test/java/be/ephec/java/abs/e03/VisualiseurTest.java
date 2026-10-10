package be.ephec.java.abs.e03;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/** ABS.3 — Verification automatique. */
class VisualiseurTest {

    @Test
    @DisplayName("Le visualiseur fourni sert de reference")
    void referenceFricEnVrac() {
        VisualiseurDeDonneesBancaires visualiseur = new VisualiseurFricEnVrac();

        assertEquals(3, visualiseur.mouvements().length);
        assertEquals(1307.50, visualiseur.total(), 0.001);
    }

    @Test
    @DisplayName("Le second visualiseur lit les deux mouvements de sa banque")
    void nombreDeMouvements() {
        assertEquals(2, new VisualiseurBanquierPepere().mouvements().length);
    }

    @Test
    @DisplayName("Les colonnes sont lues dans le bon ordre")
    void ordreDesColonnes() {
        Mouvement premier = new VisualiseurBanquierPepere().mouvements()[0];

        assertEquals("BE44 1111 2222 3333", premier.numeroDeCompte(),
                "Le compte n'est pas dans la premiere colonne pour cette banque.");
        assertEquals(-89.90, premier.montant(), 0.001);
        assertEquals("Assurance", premier.communication());
    }

    @Test
    @DisplayName("Le total est calcule par la classe mere, sans rien reecrire")
    void total() {
        assertEquals(-64.90, new VisualiseurBanquierPepere().total(), 0.001);
    }

    @Test
    @DisplayName("Le rapport commence par le nom de la banque")
    void rapport() {
        String rapport = new VisualiseurBanquierPepere().rapport();

        assertTrue(rapport.startsWith("Banquier Pepere"),
                "La premiere ligne du rapport est le nom de la banque.");
        assertEquals(3, rapport.split("\n").length,
                "un titre, puis une ligne par mouvement");
    }

    @Test
    @DisplayName("Le programme peut traiter les deux banques sans les distinguer")
    void polymorphisme() {
        VisualiseurDeDonneesBancaires[] banques = {
                new VisualiseurFricEnVrac(), new VisualiseurBanquierPepere()
        };

        assertEquals(1242.60, banques[0].total() + banques[1].total(), 0.001);
    }
}
