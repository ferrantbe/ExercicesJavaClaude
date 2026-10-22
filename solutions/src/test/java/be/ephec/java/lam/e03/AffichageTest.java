package be.ephec.java.lam.e03;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

/** LAM.3 — Verification automatique. */
class AffichageTest {

    private static final int[] TABLEAU = {1, 4, -9, 5, -7, -3, 2};

    @Test
    @DisplayName("Les trois criteres, testes separement")
    void criteres() {
        assertTrue(Affichage.estPositif(1));
        assertFalse(Affichage.estPositif(0), "zero n'est ni positif ni negatif ici");
        assertTrue(Affichage.estNegatif(-3));
        assertFalse(Affichage.estNegatif(0));
        assertTrue(Affichage.estPair(4));
        assertTrue(Affichage.estPair(0), "zero est pair");
        assertFalse(Affichage.estPair(-3));
    }

    @Test
    @DisplayName("selectionner accepte une reference de methode")
    void referenceDeMethode() {
        assertEquals("1 4 5 2", Affichage.selectionner(TABLEAU, Affichage::estPositif));
    }

    @Test
    @DisplayName("Et une lambda, indifferemment")
    void lambda() {
        assertEquals("1 4 5 2", Affichage.selectionner(TABLEAU, e -> e > 0),
                "les deux ecritures produisent le meme IntPredicate");
    }

    @Test
    @DisplayName("Le rapport tient en trois lignes")
    void rapport() {
        assertEquals("Les positifs: 1 4 5 2\n"
                        + "Les negatifs: -9 -7 -3\n"
                        + "Les pairs: 4 2",
                Affichage.rapport(TABLEAU));
    }
}
