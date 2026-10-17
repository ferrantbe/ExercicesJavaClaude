package be.ephec.java.tab.e04;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/** TAB.4 — Verification automatique. */
class VenteTest {

    private static Car clio() {
        return new Car("Renault", "Clio", "VF123");
    }

    @Test
    @DisplayName("Une voiture retourne ce qu'on lui a donne")
    void laVoiture() {
        Car voiture = clio();

        assertEquals("Renault", voiture.getMarque());
        assertEquals("Clio", voiture.getModele());
        assertEquals("VF123", voiture.getNumeroDeSerie());
    }

    @Test
    @DisplayName("Le prix reel applique la reduction au prix catalogue")
    void prixReel() {
        assertEquals(18000.0, new Sale(clio(), 20000, 0.10).prixReel(), 0.001);
        assertEquals(20000.0, new Sale(clio(), 20000, 0).prixReel(), 0.001,
                "sans reduction, le prix reel est le prix catalogue");
    }

    @Test
    @DisplayName("La vente s'ecrit dans le format demande")
    void miseEnTexte() {
        assertEquals("Renault Clio [VF123] : 20000.0 -> 18000.0",
                new Sale(clio(), 20000, 0.10).enTexte());
    }

    @Test
    @DisplayName("Le vendeur accumule ses ventes et son chiffre d'affaires")
    void ventesDuVendeur() {
        Vendor vendeur = new Vendor(new Person("Desmet", "Jules"));

        assertEquals(0, vendeur.nombreDeVentes());
        assertEquals(0.0, vendeur.chiffreDAffaires(), 0.001);

        assertTrue(vendeur.enregistrer(new Sale(clio(), 20000, 0.10)));
        assertTrue(vendeur.enregistrer(new Sale(clio(), 10000, 0)));

        assertEquals(2, vendeur.nombreDeVentes());
        assertEquals(28000.0, vendeur.chiffreDAffaires(), 0.001);
    }

    @Test
    @DisplayName("Le tableau est plein au-dela de dix ventes")
    void tableauPlein() {
        Vendor vendeur = new Vendor(new Person("Desmet", "Jules"));

        for (int i = 0; i < Vendor.MAX_VENTES; i++) {
            assertTrue(vendeur.enregistrer(new Sale(clio(), 1000, 0)),
                    "la vente numero " + (i + 1) + " doit passer");
        }

        assertFalse(vendeur.enregistrer(new Sale(clio(), 1000, 0)),
                "la onzieme vente ne rentre plus : le tableau a une taille fixe");
        assertEquals(Vendor.MAX_VENTES, vendeur.nombreDeVentes());
    }
}
