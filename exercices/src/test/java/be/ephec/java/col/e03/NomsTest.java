package be.ephec.java.col.e03;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;
import java.util.Scanner;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;

/** COL.3 — Verification automatique. */
class NomsTest {

    @Test
    @DisplayName("Les noms sont lus dans l'ordre du texte")
    void lecture() {
        List<String> lus = Noms.lire(new Scanner("Turing\nLovelace\nHopper"));

        assertIterableEquals(Arrays.asList("Turing", "Lovelace", "Hopper"), lus);
    }

    @Test
    @DisplayName("Une source vide donne une liste vide")
    void sourceVide() {
        assertEquals(0, Noms.lire(new Scanner("")).size());
    }

    @Test
    @DisplayName("Le tri est alphabetique et ne modifie pas la liste recue")
    void tri() {
        List<String> lus = Noms.lire(new Scanner("Turing\nLovelace\nHopper"));

        assertIterableEquals(Arrays.asList("Hopper", "Lovelace", "Turing"), Noms.triee(lus));
        assertIterableEquals(Arrays.asList("Turing", "Lovelace", "Hopper"), lus,
                "triee retourne une nouvelle liste");
    }

    @Test
    @DisplayName("La source fournie contient dix noms")
    void sourceFournie() {
        assertEquals(10, Noms.lire(SourceDeTexte.ouvrir()).size());
        assertEquals("Babbage", Noms.triee(Noms.lire(SourceDeTexte.ouvrir())).get(0));
    }
}
