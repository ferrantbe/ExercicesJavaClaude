package be.ephec.java.gen.e03;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

/** GEN.3 — Verification automatique. */
class TripletTest {

    @Test
    @DisplayName("Un triplet de String")
    void tripletDeChaines() {
        TripletI<String> mots = new TripletI<>("un", "deux", "trois");

        assertEquals("un", mots.getPremier());
        assertEquals("deux", mots.getSecond());
        assertEquals("trois", mots.getTroisieme());
    }

    @Test
    @DisplayName("La meme classe pour des Integer")
    void tripletDEntiers() {
        TripletI<Integer> nombres = new TripletI<>(1, 2, 3);

        assertEquals(6, nombres.getPremier() + nombres.getSecond() + nombres.getTroisieme());
    }

    @Test
    @DisplayName("Trois types differents")
    void tripletHeterogene() {
        TripletD<String, Integer, Double> melange = new TripletD<>("Ada", 36, 1.75);

        assertEquals("Ada", melange.getPremier());
        assertEquals(36, melange.getSecond());
        assertEquals(1.75, melange.getTroisieme(), 0.001);
    }

    @Test
    @DisplayName("Rien n'oblige les trois types a differer")
    void tripletHeterogeneMaisIdentique() {
        TripletD<Integer, Integer, Integer> nombres = new TripletD<>(1, 2, 3);

        assertEquals(1, nombres.getPremier());
        assertEquals(3, nombres.getTroisieme());
    }
}
