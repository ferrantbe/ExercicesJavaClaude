package be.ephec.java.itf.e01;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

/** ITF.1 — Verification automatique. */
class CalculateurTest {

    @Test
    @DisplayName("Les deux classes implementent bien l'interface")
    void implementations() {
        assertTrue(new Addition() instanceof Calculateur);
        assertTrue(new Multiplication() instanceof Calculateur);
    }

    @Test
    @DisplayName("Addition additionne")
    void addition() {
        assertEquals(7, new Addition().calcule(3, 4));
        assertEquals(0, new Addition().calcule(-5, 5));
    }

    @Test
    @DisplayName("Multiplication multiplie")
    void multiplication() {
        assertEquals(12, new Multiplication().calcule(3, 4));
        assertEquals(0, new Multiplication().calcule(-5, 0));
    }

    @Test
    @DisplayName("effectueCalcul delegue au calculateur recu")
    void delegation() {
        assertEquals(7, Programme.effectueCalcul(3, 4, new Addition()));
        assertEquals(12, Programme.effectueCalcul(3, 4, new Multiplication()));
    }

    @Test
    @DisplayName("effectueCalcul accepte n'importe quel Calculateur, meme inconnu d'elle")
    void calculateurInvente() {
        Calculateur soustraction = new Calculateur() {
            @Override
            public int calcule(int a, int b) {
                return a - b;
            }
        };

        assertEquals(-1, Programme.effectueCalcul(3, 4, soustraction),
                "effectueCalcul ne connait que l'interface : elle marche avec "
                        + "des calculateurs qui n'existaient pas quand elle a ete ecrite.");
    }
}
