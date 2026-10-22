package be.ephec.java.tmp.e01;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;

/** TMP.1 — Verification automatique. */
class UtilitaireDatesTest {

    private static final LocalDate NAISSANCE = LocalDate.of(1990, 5, 17);
    private static final LocalDate REFERENCE = LocalDate.of(2027, 1, 19);

    @Test
    @DisplayName("Les quatre ecarts entre le 17/05/1990 et le 19/01/2027")
    void lesQuatreEcarts() {
        assertEquals(13396, UtilitaireDates.ecartEnJours(NAISSANCE, REFERENCE));
        assertEquals(1913, UtilitaireDates.ecartEnSemaines(NAISSANCE, REFERENCE));
        assertEquals(440, UtilitaireDates.ecartEnMois(NAISSANCE, REFERENCE));
        assertEquals(36, UtilitaireDates.ecartEnAnnees(NAISSANCE, REFERENCE));
    }

    @Test
    @DisplayName("Un ecart nul vaut zero partout")
    void ecartNul() {
        assertEquals(0, UtilitaireDates.ecartEnJours(REFERENCE, REFERENCE));
        assertEquals(0, UtilitaireDates.ecartEnAnnees(REFERENCE, REFERENCE));
    }

    @Test
    @DisplayName("Un ecart a rebours est negatif")
    void ecartNegatif() {
        assertEquals(-13396, UtilitaireDates.ecartEnJours(REFERENCE, NAISSANCE));
    }
}
