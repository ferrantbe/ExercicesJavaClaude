package be.ephec.java.rec.e06;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/** REC.6 — Verification automatique. */
class HistoriqueTest {

    @Test
    @DisplayName("Historique est une classe generique a un parametre")
    void generique() {
        assertEquals(1, Historique.class.getTypeParameters().length);
    }

    @Test
    @DisplayName("Un historique neuf est vide")
    void vide() {
        Historique<String> historique = new Historique<>();

        assertTrue(historique.estVide());
        assertEquals(0, historique.taille());
        assertTrue(historique.tout().isEmpty());
    }

    @Test
    @DisplayName("dernier() sur un historique vide leve IllegalStateException")
    void dernierSurVide() {
        Historique<String> historique = new Historique<>();

        assertThrows(IllegalStateException.class, historique::dernier);
    }

    @Test
    @DisplayName("Enregistrer remplit l'historique dans l'ordre")
    void enregistrer() {
        Historique<String> historique = new Historique<>();

        historique.enregistrer("ouvrir");
        historique.enregistrer("modifier");

        assertFalse(historique.estVide());
        assertEquals(2, historique.taille());
        assertEquals(List.of("ouvrir", "modifier"), historique.tout());
    }

    @Test
    @DisplayName("dernier() rend le plus recent")
    void dernier() {
        Historique<Integer> historique = new Historique<>();
        historique.enregistrer(18);
        historique.enregistrer(21);

        assertEquals(21, historique.dernier());

        historique.enregistrer(19);
        assertEquals(19, historique.dernier());
    }

    @Test
    @DisplayName("La liste rendue par tout() ne peut pas etre modifiee")
    void toutNonModifiable() {
        Historique<String> historique = new Historique<>();
        historique.enregistrer("ouvrir");
        List<String> vue = historique.tout();

        assertThrows(UnsupportedOperationException.class, () -> vue.add("tricher"));
        assertThrows(UnsupportedOperationException.class, () -> vue.remove(0));
        assertEquals(1, historique.taille(), "l'historique n'a pas change");
    }

    @Test
    @DisplayName("tout() reflete les ajouts faits apres l'avoir demande")
    void toutSuitLHistorique() {
        Historique<String> historique = new Historique<>();
        historique.enregistrer("ouvrir");
        List<String> vue = historique.tout();

        historique.enregistrer("fermer");

        assertEquals(2, vue.size(), "une vue, pas une copie figee");
    }

    @Test
    @DisplayName("occurrences compte par egalite de valeur")
    void occurrences() {
        Historique<Integer> historique = new Historique<>();
        historique.enregistrer(1000);
        historique.enregistrer(2000);
        historique.enregistrer(1000);

        assertEquals(2, historique.occurrences(1000), "deux Integer de meme valeur : equals, pas ==");
        assertEquals(0, historique.occurrences(3000));
    }

    @Test
    @DisplayName("Le meme code sert a plusieurs types")
    void plusieursTypes() {
        Historique<String> mots = new Historique<>();
        Historique<Double> mesures = new Historique<>();
        mots.enregistrer("a");
        mesures.enregistrer(1.5);

        String mot = mots.dernier();
        double mesure = mesures.dernier();

        assertEquals("a", mot);
        assertEquals(1.5, mesure, 0.0001);
    }
}
