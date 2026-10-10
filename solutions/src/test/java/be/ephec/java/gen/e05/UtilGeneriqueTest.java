package be.ephec.java.gen.e05;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

/** GEN.5 — Verification automatique. */
class UtilGeneriqueTest {

    @Test
    @DisplayName("Une chaine est renversee")
    void surUneChaine() {
        assertEquals("avaJ", UtilGenerique.otGnirts("Java"));
        assertEquals("", UtilGenerique.otGnirts(""));
        assertEquals("a", UtilGenerique.otGnirts("a"));
    }

    @Test
    @DisplayName("La meme methode fonctionne sur un Integer")
    void surUnEntier() {
        assertEquals("4321", UtilGenerique.otGnirts(1234));
        assertEquals("21-", UtilGenerique.otGnirts(-12),
                "le toString d'un entier negatif commence par le signe");
    }

    @Test
    @DisplayName("Et sur un Double")
    void surUnDecimal() {
        assertEquals("5.3", UtilGenerique.otGnirts(3.5));
    }

    @Test
    @DisplayName("Elle s'appuie sur le toString de l'objet, quel qu'il soit")
    void surNImporteQuoi() {
        Object objetAvecToString = new Object() {
            @Override
            public String toString() {
                return "bonjour";
            }
        };

        assertEquals("ruojnob", UtilGenerique.otGnirts(objetAvecToString));
    }
}
