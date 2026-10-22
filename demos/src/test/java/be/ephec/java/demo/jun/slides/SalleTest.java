package be.ephec.java.demo.jun.slides;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

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

        assertEquals(100, libres,
                "Une salle neuve de 100 places doit etre entierement libre");
    }

    // Slide « Verifier qu'une exception est levee »
    @Test
    void reserverZeroPlaceEstRefuse() {
        Salle salle = new Salle(100);

        assertThrows(IllegalArgumentException.class,
                () -> salle.reserver(0),
                "Reserver zero place doit etre refuse");
    }

    // Slide « Le throws d'une methode de test »
    @Test
    void deuxPlacesReserveesNeSontPlusLibres()
            throws SalleCompleteException {
        Salle salle = new Salle(100);

        salle.reserver(2);

        assertEquals(98, salle.placesLibres(),
                "Deux places reservees sur 100 doivent en laisser 98");
    }

    // Slide « Apres l'echec, l'etat »
    @Test
    void unePlaceDeTropNeReserveRien()
            throws SalleCompleteException {
        Salle salle = new Salle(10);
        salle.reserver(8);

        assertThrows(SalleCompleteException.class,
                () -> salle.reserver(3),
                "Une demande trop grande doit etre refusee");

        assertEquals(2, salle.placesLibres(),
                "Le refus ne doit rien reserver");
    }

    // Slide « Un cas, un test, un nom »
    @Test
    @DisplayName("Reserver toutes les places libres remplit la salle")
    void reserverToutesLesPlacesLibres()
            throws SalleCompleteException {
        Salle salle = new Salle(10);

        salle.reserver(10);

        assertEquals(0, salle.placesLibres(),
                "Reserver les 10 places doit remplir la salle");
    }

    // Slide « Une valeur, un test »
    @Test
    void reserverUnePlaceEnLaisseNeuf()
            throws SalleCompleteException {
        Salle salle = new Salle(10);

        salle.reserver(1);

        assertEquals(9, salle.placesLibres(),
                "Une place reservee sur 10 doit en laisser 9");
    }

    // Slide « Pour aller plus loin : @ParameterizedTest »
    @ParameterizedTest
    @CsvSource({"1, 9", "5, 5", "10, 0"})
    void reserverDiminueLesPlacesLibres(int places, int attendu)
            throws SalleCompleteException {
        Salle salle = new Salle(10);

        salle.reserver(places);

        assertEquals(attendu, salle.placesLibres(),
                "Le nombre de places libres doit diminuer d'autant");
    }
}
