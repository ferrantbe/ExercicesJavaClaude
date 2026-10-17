package be.ephec.java.lam.e02;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

/** LAM.2 — Verification automatique. */
class AffichageTest {

    private static final int[] TABLEAU = {1, 4, -9, 5, -7, -3, 2};

    @Test
    @DisplayName("Le filtre des positifs")
    void positifs() {
        assertEquals("1 4 5 2", Affichage.selectionner(TABLEAU, e -> e > 0));
    }

    @Test
    @DisplayName("Le filtre des negatifs")
    void negatifs() {
        assertEquals("-9 -7 -3", Affichage.selectionner(TABLEAU, e -> e < 0));
    }

    @Test
    @DisplayName("Un filtre qui ne retient rien retourne une chaine vide")
    void aucunResultat() {
        assertEquals("", Affichage.selectionner(TABLEAU, e -> e > 1000));
    }

    @Test
    @DisplayName("Un filtre qui retient tout retourne tout")
    void toutRetenu() {
        assertEquals("1 4 -9 5 -7 -3 2", Affichage.selectionner(TABLEAU, e -> true));
    }

    @Test
    @DisplayName("Un tableau vide retourne une chaine vide")
    void tableauVide() {
        assertEquals("", Affichage.selectionner(new int[0], e -> true));
    }
}
