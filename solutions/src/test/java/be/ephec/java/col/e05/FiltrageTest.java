package be.ephec.java.col.e05;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/** COL.5 — Verification automatique. */
class FiltrageTest {

    private static List<Integer> nombres() {
        return new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));
    }

    @Test
    @DisplayName("Le predicat repond sur la parite")
    void predicat() {
        EstPair estPair = new EstPair();

        assertTrue(estPair.test(4));
        assertTrue(estPair.test(0), "zero est pair");
        assertFalse(estPair.test(7));
        assertTrue(estPair.test(-2), "les negatifs aussi");
    }

    @Test
    @DisplayName("Les pairs sont comptes sans etre supprimes")
    void comptage() {
        List<Integer> liste = nombres();

        assertEquals(5, Filtrage.compterLesPairs(liste));
        assertEquals(10, liste.size(), "compter ne supprime rien");
    }

    @Test
    @DisplayName("Les pairs sont supprimes de la liste recue")
    void suppression() {
        List<Integer> liste = nombres();

        Filtrage.supprimerLesPairs(liste);

        assertIterableEquals(Arrays.asList(1, 3, 5, 7, 9), liste);
    }

    @Test
    @DisplayName("Cela fonctionne aussi sur une LinkedList")
    void surUneLinkedList() {
        List<Integer> liste = new LinkedList<>(Arrays.asList(2, 3, 4));

        Filtrage.supprimerLesPairs(liste);

        assertIterableEquals(Arrays.asList(3), liste,
                "removeIf appartient a Collection : toutes les listes en heritent");
    }
}
