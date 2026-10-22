package be.ephec.java.col.e07;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

/** COL.7 — Verification automatique. */
class InscriptionsTest {

    private static Inscriptions garnies() {
        Inscriptions inscriptions = new Inscriptions();
        inscriptions.inscrire("Turing", "Java");
        inscriptions.inscrire("Lovelace", "Java");
        inscriptions.inscrire("Lovelace", "Algebre");
        return inscriptions;
    }

    @Test
    @DisplayName("Un etudiant peut suivre plusieurs cours")
    void plusieursCours() {
        assertEquals(2, garnies().coursDe("Lovelace").size());
        assertTrue(garnies().coursDe("Lovelace").contains("Algebre"));
    }

    @Test
    @DisplayName("Un etudiant inconnu retourne un ensemble vide, pas null")
    void etudiantInconnu() {
        assertNotNull(garnies().coursDe("Babbage"),
                "retourner null obligerait chaque appelant a le tester — voir CC-ERR.2");
        assertEquals(0, garnies().coursDe("Babbage").size());
    }

    @Test
    @DisplayName("Deux inscriptions au meme cours n'en font qu'une")
    void inscriptionEnDouble() {
        Inscriptions inscriptions = garnies();

        inscriptions.inscrire("Turing", "Java");

        assertEquals(1, inscriptions.coursDe("Turing").size(),
                "un Set garantit l'unicite, sans que l'appelant ait a y penser");
    }

    @Test
    @DisplayName("Les etudiants sortent par ordre alphabetique")
    void ordreDesEtudiants() {
        assertIterableEquals(Arrays.asList("Lovelace", "Turing"), garnies().etudiants());
    }

    @Test
    @DisplayName("Le rapport trie les etudiants et leurs cours")
    void rapport() {
        assertEquals("Lovelace : Algebre, Java\nTuring : Java", garnies().rapport());
    }
}
