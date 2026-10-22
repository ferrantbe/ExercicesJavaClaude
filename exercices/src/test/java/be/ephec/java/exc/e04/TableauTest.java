package be.ephec.java.exc.e04;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;

/** EXC.4 — Verification automatique. */
class TableauTest {

    @Test
    @DisplayName("Le cas normal retourne un compte-rendu")
    void casNormal() {
        assertEquals("12 place en position 2 d'un tableau de 5 cases",
                Tableau.placerDouze(5, 2));
    }

    @Test
    @DisplayName("La premiere case est valide")
    void premiereCaseValide() {
        assertEquals("12 place en position 0 d'un tableau de 5 cases",
                Tableau.placerDouze(5, 0));
    }

    @Test
    @DisplayName("La derniere case est valide")
    void derniereCaseValide() {
        assertEquals("12 place en position 4 d'un tableau de 5 cases",
                Tableau.placerDouze(5, 4));
    }

    @Test
    @DisplayName("Une taille negative est signalee, pas propagee")
    void tailleNegative() {
        assertEquals("Taille impossible : -3", Tableau.placerDouze(-3, 0));
    }

    @Test
    @DisplayName("Une position hors limites est signalee")
    void positionHorsLimites() {
        assertEquals("Position 7 hors du tableau de 5 cases",
                Tableau.placerDouze(5, 7));
        assertEquals("Position -1 hors du tableau de 5 cases",
                Tableau.placerDouze(5, -1),
                "un indice negatif leve la meme exception qu'un indice trop grand");
    }

    @Test
    @DisplayName("Aucune exception ne sort de la methode")
    void aucuneFuite() {
        assertDoesNotThrow(() -> Tableau.placerDouze(-1, -1));
        assertDoesNotThrow(() -> Tableau.placerDouze(0, 0));
    }
}
