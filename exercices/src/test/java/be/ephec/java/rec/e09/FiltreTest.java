package be.ephec.java.rec.e09;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/** REC.9 — Verification automatique de la regle, pas de la fenetre. */
class FiltreTest {

    @Test
    @DisplayName("Les voyelles sont refusees, en minuscule comme en majuscule")
    void voyellesRefusees() {
        for (String voyelle : new String[] {"a", "e", "i", "o", "u", "y", "A", "E", "U"}) {
            assertTrue(Filtre.estRefuse(voyelle), voyelle + " est une voyelle");
        }
    }

    @Test
    @DisplayName("Les consonnes, chiffres et espaces passent")
    void consonnesAcceptees() {
        for (String caractere : new String[] {"b", "Z", "7", " ", "-"}) {
            assertFalse(Filtre.estRefuse(caractere), caractere + " n'est pas une voyelle");
        }
    }

    @Test
    @DisplayName("Le libelle du compteur")
    void libelle() {
        assertEquals("0 caractere(s)", Filtre.libelleCompteur(""));
        assertEquals("4 caractere(s)", Filtre.libelleCompteur("bnjr"));
    }
}
