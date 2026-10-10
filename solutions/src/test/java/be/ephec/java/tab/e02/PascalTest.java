package be.ephec.java.tab.e02;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;

/** TAB.2 — Verification automatique. */
class PascalTest {

    @Test
    @DisplayName("Le triangle a cinq lignes est celui du cours")
    void cinqLignes() {
        assertArrayEquals(new int[][]{
                {1},
                {1, 1},
                {1, 2, 1},
                {1, 3, 3, 1},
                {1, 4, 6, 4, 1}
        }, Pascal.triangle(5));
    }

    @Test
    @DisplayName("La ligne d'indice i contient i+1 nombres")
    void longueurDesLignes() {
        int[][] t = Pascal.triangle(6);

        assertEquals(6, t.length);
        for (int i = 0; i < t.length; i++) {
            assertEquals(i + 1, t[i].length,
                    "la ligne d'indice " + i + " doit contenir " + (i + 1) + " nombres");
        }
    }

    @Test
    @DisplayName("Les bords valent 1 et l'interieur est la somme des deux du dessus")
    void regleDeConstruction() {
        int[][] t = Pascal.triangle(6);

        for (int i = 0; i < t.length; i++) {
            assertEquals(1, t[i][0], "bord gauche");
            assertEquals(1, t[i][i], "bord droit");
            for (int j = 1; j < i; j++) {
                assertEquals(t[i - 1][j - 1] + t[i - 1][j], t[i][j],
                        "chaque nombre est la somme des deux qui le surplombent");
            }
        }
    }

    @Test
    @DisplayName("Un triangle de zero ligne est vide")
    void zeroLigne() {
        assertEquals(0, Pascal.triangle(0).length);
    }
}
