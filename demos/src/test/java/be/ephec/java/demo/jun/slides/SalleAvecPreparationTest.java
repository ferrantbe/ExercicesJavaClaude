package be.ephec.java.demo.jun.slides;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Slide « Chaque test repart de zero » (JUN, section 4).
 *
 * preparer s'execute avant CHAQUE test : le second test trouve une salle
 * neuve, quoi que le premier ait reserve.
 */
class SalleAvecPreparationTest {

    private Salle salle;

    @BeforeEach
    void preparer() {
        salle = new Salle(10);
    }

    @Test
    void uneSalleNeuveEstEntierementLibre() {
        assertEquals(10, salle.placesLibres(),
                "Une salle neuve doit etre libre");
    }

    @Test
    void reserverNeDebordePasSurLeTestSuivant() throws SalleCompleteException {
        salle.reserver(4);
        assertEquals(6, salle.placesLibres(),
                "Quatre places reservees sur 10 doivent en laisser 6");
    }
}
