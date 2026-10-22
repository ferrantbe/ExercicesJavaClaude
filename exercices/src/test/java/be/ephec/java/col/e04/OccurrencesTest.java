package be.ephec.java.col.e04;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Map;
import java.util.Scanner;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

/** COL.4 — Verification automatique. */
class OccurrencesTest {

    @Test
    @DisplayName("Chaque mot est compte")
    void comptage() {
        Map<String, Integer> compte = Occurrences.compter(
                new Scanner("le chat et le chien et le tapis"));

        assertEquals(3, compte.get("le"));
        assertEquals(2, compte.get("et"));
        assertEquals(1, compte.get("chat"));
        assertEquals(5, compte.size(), "cinq mots differents");
    }

    @Test
    @DisplayName("Un mot absent n'est pas dans la table")
    void motAbsent() {
        assertNull(Occurrences.compter(new Scanner("un deux")).get("trois"));
    }

    @Test
    @DisplayName("Un texte vide donne une table vide")
    void texteVide() {
        assertEquals(0, Occurrences.compter(new Scanner("")).size());
    }

    @Test
    @DisplayName("Le rapport est trie par ordre alphabetique")
    void rapport() {
        Map<String, Integer> compte = Occurrences.compter(new Scanner("zebre chat zebre abeille"));

        assertEquals("abeille : 1\nchat : 1\nzebre : 2", Occurrences.rapport(compte),
                "Pas de retour a la ligne a la fin.");
    }

    @Test
    @DisplayName("Le texte fourni contient trois fois le mot chat")
    void texteFourni() {
        assertEquals(3, Occurrences.compter(SourceDeTexte.ouvrir()).get("chat"));
    }
}
