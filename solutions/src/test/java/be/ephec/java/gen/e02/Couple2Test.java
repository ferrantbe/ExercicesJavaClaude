package be.ephec.java.gen.e02;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

/** GEN.2 — Verification automatique. */
class Couple2Test {

    @Test
    @DisplayName("Deux types differents cohabitent")
    void typesDifferents() {
        Couple2<String, Integer> age = new Couple2<>("Ada", 36);

        assertEquals("Ada", age.getPremier());
        assertEquals(36, age.getSecond());
    }

    @Test
    @DisplayName("Rien n'interdit deux types identiques")
    void typesIdentiques() {
        Couple2<Integer, Integer> paire = new Couple2<>(3, 4);

        assertEquals(3, paire.getPremier());
        assertEquals(4, paire.getSecond());
    }

    @Test
    @DisplayName("Un Integer et un Double")
    void entierEtDecimal() {
        Couple2<Integer, Double> mesure = new Couple2<>(3, 4.5);

        assertEquals(3, mesure.getPremier());
        assertEquals(4.5, mesure.getSecond(), 0.001);
    }

    @Test
    @DisplayName("Le format du toString est le meme qu'en GEN.1")
    void miseEnTexte() {
        assertEquals("premiere valeur : Ada - deuxieme valeur : 36",
                new Couple2<>("Ada", 36).toString());
    }
}
