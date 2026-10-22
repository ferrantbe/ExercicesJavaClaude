package be.ephec.java.col.e06;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

/** COL.6 — Verification automatique. */
class TirageTest {

    private static final List<Integer> TIRAGE = Arrays.asList(5, 12, 5, 99, 12, 5, 300);

    @Test
    @DisplayName("L'ensemble ne retient qu'un exemplaire de chaque valeur")
    void sansDoublons() {
        Set<Integer> ensemble = Tirage.sansDoublons(TIRAGE);

        assertEquals(4, ensemble.size());
        assertTrue(ensemble.contains(5));
        assertTrue(ensemble.contains(300));
    }

    @Test
    @DisplayName("On sait dire si un nombre a ete tire")
    void appartenance() {
        Set<Integer> ensemble = Tirage.sansDoublons(TIRAGE);

        assertTrue(Tirage.aEteTire(ensemble, 99));
        assertFalse(Tirage.aEteTire(ensemble, 7));
    }

    @Test
    @DisplayName("Le nombre de doublons perdus est calcule")
    void doublons() {
        assertEquals(3, Tirage.doublons(TIRAGE), "sept tirages, quatre valeurs");
        assertEquals(0, Tirage.doublons(Arrays.asList(1, 2, 3)));
    }

    @Test
    @DisplayName("Une liste vide ne pose pas de probleme")
    void listeVide() {
        assertEquals(0, Tirage.sansDoublons(List.of()).size());
        assertEquals(0, Tirage.doublons(List.of()));
    }
}
