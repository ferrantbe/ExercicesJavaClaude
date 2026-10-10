package be.ephec.java.tab.e03;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertSame;

/** TAB.3 — Verification automatique. */
class GameTest {

    private static Player joueur(String prenom, int points) {
        Player joueur = new Player(prenom);
        for (int i = 0; i < points; i++) {
            joueur.ajouterUnPoint();
        }
        return joueur;
    }

    @Test
    @DisplayName("meilleur rend celui qui a le plus de points")
    void meilleurDesDeux() {
        Player max = joueur("Max", 3);
        Player paul = joueur("Paul", 5);

        assertSame(paul, Game.meilleur(max, paul));
        assertSame(paul, Game.meilleur(paul, max));
    }

    @Test
    @DisplayName("En cas d'egalite, meilleur rend le premier")
    void meilleurEnCasDEgalite() {
        Player max = joueur("Max", 4);
        Player paul = joueur("Paul", 4);

        assertSame(max, Game.meilleur(max, paul));
    }

    @Test
    @DisplayName("gagnantDuTour rend celui qui a fait le plus grand nombre")
    void gagnantDuTour() {
        Player max = joueur("Max", 0);
        Player paul = joueur("Paul", 0);

        assertSame(max, Game.gagnantDuTour(max, 6, paul, 2));
        assertSame(paul, Game.gagnantDuTour(max, 1, paul, 4));
    }

    @Test
    @DisplayName("En cas d'egalite, gagnantDuTour rend le premier")
    void gagnantDuTourEnCasDEgalite() {
        Player max = joueur("Max", 0);
        Player paul = joueur("Paul", 0);

        assertSame(max, Game.gagnantDuTour(max, 3, paul, 3));
    }
}
