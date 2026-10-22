package be.ephec.java.gen.e06;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

/** GEN.6 — Verification automatique. */
class CoupleNommeTest {

    @Test
    @DisplayName("Un CoupleNomme est un Couple")
    void heritage() {
        assertTrue(new CoupleNomme<>("notes", 12, 16) instanceof Couple);
    }

    @Test
    @DisplayName("Il herite des accesseurs de la classe mere")
    void accesseursHerites() {
        CoupleNomme<Integer> notes = new CoupleNomme<>("notes", 12, 16);

        assertEquals(12, notes.getPremier());
        assertEquals(16, notes.getSecond());
        assertEquals("notes", notes.getNom());
    }

    @Test
    @DisplayName("La description inclut le nom")
    void descriptionRedefinie() {
        assertEquals("notes -> premier: 12, second: 16",
                new CoupleNomme<>("notes", 12, 16).description());
    }

    @Test
    @DisplayName("La description de la classe mere reste ce qu'elle etait")
    void descriptionDeLaMere() {
        assertEquals("premier: 12, second: 16",
                new Couple<>(12, 16).description());
    }

    @Test
    @DisplayName("Vue comme un Couple, l'instance retourne quand meme sa description a elle")
    void polymorphisme() {
        Couple<Integer> vueCommeCouple = new CoupleNomme<>("notes", 12, 16);

        assertEquals("notes -> premier: 12, second: 16", vueCommeCouple.description(),
                "le type de la variable ne decide pas de la methode appelee : "
                        + "c'est le type reel de l'objet");
    }
}
