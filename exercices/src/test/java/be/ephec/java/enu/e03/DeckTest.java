package be.ephec.java.enu.e03;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.HashSet;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

/** ENU.3 — Verification automatique. */
class DeckTest {

    private static Color couleur(String nom) {
        try {
            return Color.valueOf(nom);
        } catch (IllegalArgumentException e) {
            return fail("La constante " + nom + " n'existe pas dans Color.");
        }
    }

    private static Value valeur(String nom) {
        try {
            return Value.valueOf(nom);
        } catch (IllegalArgumentException e) {
            return fail("La constante " + nom + " n'existe pas dans Value.");
        }
    }

    @Test
    @DisplayName("Quatre couleurs et treize valeurs")
    void tailleDesEnums() {
        assertEquals(4, Color.values().length);
        assertEquals(13, Value.values().length);
    }

    @Test
    @DisplayName("Chaque constante porte son libelle francais")
    void libelles() {
        assertEquals("Pique", couleur("PIQUE").getLibelle());
        assertEquals("Coeur", couleur("COEUR").getLibelle());
        assertEquals("As", valeur("AS").getLibelle());
        assertEquals("10", valeur("DIX").getLibelle());
        assertEquals("Roi", valeur("ROI").getLibelle());
    }

    @Test
    @DisplayName("Une carte s'ecrit en francais")
    void carteEnTexte() {
        assertEquals("As de Pique", new Card(valeur("AS"), couleur("PIQUE")).toString());
        assertEquals("3 de Coeur", new Card(valeur("TROIS"), couleur("COEUR")).toString());
        assertEquals("Roi de Trefle", new Card(valeur("ROI"), couleur("TREFLE")).toString());
    }

    @Test
    @DisplayName("Le jeu contient cinquante-deux cartes toutes differentes")
    void jeuComplet() {
        Deck jeu = new Deck();

        Set<String> vues = new HashSet<>();
        for (int i = 0; i < Deck.NOMBRE_DE_CARTES; i++) {
            vues.add(jeu.carteA(i).toString());
        }

        assertEquals(52, vues.size(), "chaque carte doit etre unique");
    }

    @Test
    @DisplayName("Le melange conserve les memes cartes")
    void melange() {
        Deck jeu = new Deck();

        Set<String> avant = new HashSet<>();
        for (int i = 0; i < Deck.NOMBRE_DE_CARTES; i++) {
            avant.add(jeu.carteA(i).toString());
        }

        jeu.shuffle();

        Set<String> apres = new HashSet<>();
        for (int i = 0; i < Deck.NOMBRE_DE_CARTES; i++) {
            apres.add(jeu.carteA(i).toString());
        }

        assertEquals(avant, apres,
                "melanger ne doit ni perdre ni dupliquer de carte");
    }

    @Test
    @DisplayName("Le melange change effectivement l'ordre")
    void melangeChangeLOrdre() {
        Deck jeu = new Deck();

        String premiereAvant = jeu.carteA(0).toString();
        String[] avant = new String[Deck.NOMBRE_DE_CARTES];
        for (int i = 0; i < avant.length; i++) {
            avant[i] = jeu.carteA(i).toString();
        }

        jeu.shuffle();

        int identiques = 0;
        for (int i = 0; i < avant.length; i++) {
            if (avant[i].equals(jeu.carteA(i).toString())) {
                identiques++;
            }
        }

        assertTrue(identiques < 40,
                "apres un melange, la plupart des cartes doivent avoir bouge "
                        + "(trouve " + identiques + " cartes restees en place, "
                        + "en partant de " + premiereAvant + ")");
    }
}
