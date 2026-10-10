package be.ephec.java.lam.e01;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

/** LAM.1 — Verification automatique. */
class CalculsTest {

    @Test
    @DisplayName("traite applique le calculateur recu")
    void traiteDelegue() {
        assertEquals(9, Calculs.traite(3, n -> n * n));
        assertEquals(6, Calculs.traite(3, n -> 2 * n));
        assertEquals(0, Calculs.traite(0, n -> n * n));
    }

    @Test
    @DisplayName("Le tableau contient quatre calculateurs, dans l'ordre")
    void tableauDeCalculateurs() {
        Calculateur[] calculateurs = Calculs.calculateurs();

        assertEquals(4, calculateurs.length);
        assertEquals(25, calculateurs[0].calcul(5), "le carre");
        assertEquals(10, calculateurs[1].calcul(5), "le double");
        assertEquals(-5, calculateurs[2].calcul(5), "l'oppose");
        assertEquals(5, calculateurs[3].calcul(5), "inchange");
    }

    @Test
    @DisplayName("Tous les calculs s'appliquent au meme nombre")
    void tousLesCalculs() {
        assertEquals("9 6 -3 3", Calculs.tousLesCalculs(3));
        assertEquals("0 0 0 0", Calculs.tousLesCalculs(0));
        assertEquals("4 -4 2 -2", Calculs.tousLesCalculs(-2));
    }

    @Test
    @DisplayName("Une lambda ecrite ici fonctionne aussi bien")
    void lambdaDuTest() {
        Calculateur cube = n -> n * n * n;

        assertEquals(27, Calculs.traite(3, cube),
                "traite ne connait que l'interface : elle accepte un calcul "
                        + "qui n'existait pas quand elle a ete ecrite");
    }
}
