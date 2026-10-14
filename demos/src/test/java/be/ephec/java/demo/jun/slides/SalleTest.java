package be.ephec.java.demo.jun.slides;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

/**
 * Les tests des slides JUN, reunis : chaque methode reprend une slide,
 * indiquee en commentaire. Lancez la classe dans IntelliJ : tout est vert.
 */
class SalleTest {

    // Slide « @Test, puis une assertion »
    @Test
    void uneSalleNeuveEstEntierementLibre() {
        Salle salle = new Salle(100);

        int libres = salle.placesLibres();

        assertEquals(100, libres);
    }

    // Slide « Verifier qu'une exception est levee »
    @Test
    void reserverZeroPlaceEstRefuse() {
        Salle salle = new Salle(100);

        assertThrows(IllegalArgumentException.class,
                () -> salle.reserver(0));
    }

    // Slide « Le throws d'une methode de test »
    @Test
    void deuxPlacesReserveesNeSontPlusLibres()
            throws SalleCompleteException {
        Salle salle = new Salle(100);

        salle.reserver(2);

        assertEquals(98, salle.placesLibres());
    }

    // Slide « Apres l'echec, l'etat »
    @Test
    void unePlaceDeTropNeReserveRien()
            throws SalleCompleteException {
        Salle salle = new Salle(10);
        salle.reserver(8);

        assertThrows(SalleCompleteException.class,
                () -> salle.reserver(3));

        assertEquals(2, salle.placesLibres());
    }

    // Slide « Un cas, un test, un nom »
    @Test
    @DisplayName("Reserver toutes les places libres remplit la salle")
    void reserverToutesLesPlacesLibres()
            throws SalleCompleteException {
        Salle salle = new Salle(10);

        salle.reserver(10);

        assertEquals(0, salle.placesLibres());
    }
}
