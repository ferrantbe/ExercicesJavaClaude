package be.ephec.java.tmp.e03;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;

/** TMP.3 — Verification automatique. */
class CompteurTest {

    private static final LocalDate NAISSANCE = LocalDate.of(1990, 5, 17);
    private static final LocalDateTime INSTANT = LocalDateTime.of(2027, 1, 19, 18, 0);

    @Test
    @DisplayName("Une heure fait 3600 secondes")
    void uneHeure() {
        assertEquals(3600, Compteur.secondesEntre(
                LocalDateTime.of(2027, 1, 19, 18, 0),
                LocalDateTime.of(2027, 1, 19, 19, 0)));
    }

    @Test
    @DisplayName("Une journee entiere fait 86400 secondes")
    void uneJournee() {
        assertEquals(86_400, Compteur.secondesEntre(
                LocalDateTime.of(2027, 1, 19, 0, 0),
                LocalDateTime.of(2027, 1, 20, 0, 0)));
    }

    @Test
    @DisplayName("Une vie se compte en milliards de secondes")
    void secondesVecues() {
        assertEquals(1_157_479_200L, Compteur.secondesDepuis(NAISSANCE, INSTANT),
                "Si vous obtenez UnsupportedTemporalTypeException, relisez l'enonce : "
                        + "une LocalDate ne connait pas les secondes.");
    }

    @Test
    @DisplayName("La naissance compte a partir de minuit")
    void minuitEstLePointDeDepart() {
        assertEquals(86_400, Compteur.secondesDepuis(
                LocalDate.of(2027, 1, 19), LocalDateTime.of(2027, 1, 20, 0, 0)));
    }

    @Test
    @DisplayName("Le formatage groupe les chiffres par trois")
    void formatage() {
        assertEquals("1 157 479 200", Compteur.formater(1_157_479_200L));
        assertEquals("100", Compteur.formater(100));
        assertEquals("1 000", Compteur.formater(1000));
    }
}
