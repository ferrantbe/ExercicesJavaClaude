package be.ephec.java.tab.e01;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;

/** TAB.1 — Verification automatique. */
class MatriceTest {

    @Test
    @DisplayName("Une matrice 3x3 contient 1 a 9, ligne par ligne")
    void matriceTroisParTrois() {
        assertArrayEquals(new int[][]{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}},
                Matrice.carree(3));
    }

    @Test
    @DisplayName("Une matrice 1x1 contient le seul nombre 1")
    void matriceUnParUn() {
        assertArrayEquals(new int[][]{{1}}, Matrice.carree(1));
    }

    @Test
    @DisplayName("Une matrice 4x4 se termine par 16")
    void matriceQuatreParQuatre() {
        int[][] m = Matrice.carree(4);

        assertEquals(4, m.length, "quatre lignes");
        assertEquals(4, m[0].length, "quatre colonnes");
        assertEquals(16, m[3][3], "le dernier nombre vaut n au carre");
    }

    @Test
    @DisplayName("Une taille nulle retourne un tableau vide")
    void tailleNulle() {
        assertEquals(0, Matrice.carree(0).length);
    }

    @Test
    @DisplayName("Une matrice 3 x 3 separe les valeurs par une espace et les lignes par un saut")
    void matriceTroisSurTroisEnTexte() {
        assertEquals("1 2 3\n4 5 6\n7 8 9", Matrice.enTexte(Matrice.carree(3)),
                "Pas de retour a la ligne a la fin.");
    }

    @Test
    @DisplayName("Une matrice 1 x 1 s'ecrit 1")
    void matriceUnSurUnEnTexte() {
        assertEquals("1", Matrice.enTexte(Matrice.carree(1)));
    }
}
