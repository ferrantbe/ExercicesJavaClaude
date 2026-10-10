package be.ephec.java.col.e01;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;

/** COL.1 — Verification automatique. */
class TriTest {

    private static List<Integer> desordre() {
        return new ArrayList<>(Arrays.asList(42, 7, 999, 7, 0, 500));
    }

    @Test
    @DisplayName("La liste rendue est triee")
    void listeTriee() {
        assertIterableEquals(Arrays.asList(0, 7, 7, 42, 500, 999), Tri.triee(desordre()));
    }

    @Test
    @DisplayName("La liste recue n'est pas modifiee")
    void listeOrigineIntacte() {
        List<Integer> origine = desordre();

        Tri.triee(origine);

        assertIterableEquals(desordre(), origine,
                "triee doit rendre une NOUVELLE liste, pas trier celle qu'on lui donne");
    }

    @Test
    @DisplayName("Une liste vide se trie sans broncher")
    void listeVide() {
        assertEquals(0, Tri.triee(new ArrayList<>()).size());
    }

    @Test
    @DisplayName("L'ensemble est trie et perd les doublons")
    void ensembleTrie() {
        Set<Integer> ensemble = Tri.ensembleTrie(desordre());

        assertEquals(5, ensemble.size(), "le 7 en double ne compte qu'une fois");
        assertIterableEquals(Arrays.asList(0, 7, 42, 500, 999), ensemble,
                "un TreeSet se parcourt dans l'ordre croissant");
    }
}
