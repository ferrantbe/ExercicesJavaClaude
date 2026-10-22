package be.ephec.java.pkg.e03;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Field;
import java.lang.reflect.Member;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

/** PKG.3 — Verification automatique. */
class DeckTest {

    private static boolean estPublic(Member membre) {
        return Modifier.isPublic(membre.getModifiers());
    }

    @Test
    @DisplayName("Aucun champ n'est reste public")
    void aucunChampPublic() {
        for (Field champ : Deck.class.getDeclaredFields()) {
            assertFalse(estPublic(champ),
                    "Le champ " + champ.getName() + " ne devrait plus etre public : "
                            + "le Programme ne s'en sert pas.");
        }
    }

    @Test
    @DisplayName("Seules les trois operations utilisees restent publiques")
    void surfacePubliqueMinimale() throws NoSuchMethodException {
        assertTrue(estPublic(Deck.class.getDeclaredMethod("preparer")));
        assertTrue(estPublic(Deck.class.getDeclaredMethod("piocher")));
        assertTrue(estPublic(Deck.class.getDeclaredMethod("cartesRestantes")));

        for (String interne : new String[]{"remplir", "melanger", "verifierIntegrite"}) {
            assertFalse(estPublic(Deck.class.getDeclaredMethod(interne)),
                    interne + " est un detail interne : le Programme ne l'appelle jamais.");
        }
    }

    @Test
    @DisplayName("Le paquet fonctionne toujours")
    void lePaquetFonctionneToujours() {
        Deck deck = new Deck();
        deck.preparer();

        assertEquals(52, deck.cartesRestantes());
        deck.piocher();
        assertEquals(51, deck.cartesRestantes());
    }
}
