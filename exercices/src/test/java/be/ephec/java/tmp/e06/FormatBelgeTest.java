package be.ephec.java.tmp.e06;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

/** TMP.6 — Verification automatique. */
class FormatBelgeTest {

    @Test
    @DisplayName("Une date devient du texte")
    void dateVersTexte() {
        assertEquals("19/01/2027", FormatBelge.enTexte(LocalDate.of(2027, 1, 19)));
        assertEquals("01/09/2026", FormatBelge.enTexte(LocalDate.of(2026, 9, 1)),
                "Le jour et le mois s'ecrivent sur deux chiffres.");
    }

    @Test
    @DisplayName("Un texte redevient une date")
    void texteVersDate() {
        assertEquals(LocalDate.of(2027, 1, 19), FormatBelge.depuisTexte("19/01/2027"));
    }

    @Test
    @DisplayName("Un texte mal forme est refuse")
    void texteMalForme() {
        assertThrows(DateTimeParseException.class, () -> FormatBelge.depuisTexte("2027-01-19"));
        assertThrows(DateTimeParseException.class, () -> FormatBelge.depuisTexte("pas une date"));
    }

    @Test
    @DisplayName("Par defaut, le 31 fevrier est accepte et rabote au 28")
    void leTrenteEtUnFevrierPasseInapercu() {
        assertEquals(LocalDate.of(2027, 2, 28), FormatBelge.depuisTexte("31/02/2027"),
                "C'est le comportement par defaut, et c'est un piege : "
                        + "une saisie absurde devient une date plausible.");
    }

    @Test
    @DisplayName("En mode strict, le 31 fevrier est refuse")
    void leModeStrictRefuse() {
        assertThrows(DateTimeParseException.class,
                () -> FormatBelge.depuisTexteStrict("31/02/2027"));

        assertEquals(LocalDate.of(2027, 1, 19), FormatBelge.depuisTexteStrict("19/01/2027"));
    }
}
