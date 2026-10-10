package be.ephec.java.tab.e03;

import java.util.Random;

/**
 * TAB.3 — A COMPLETER.
 *
 * Deux joueurs lancent un de a tour de role. Celui qui fait le plus grand
 * nombre marque un point, jusqu'a ce que l'un atteigne le maximum.
 *
 * Les deux methodes a ecrire tiennent chacune en UNE instruction, avec
 * l'operateur ternaire. Elles ne tirent aucun de : elles recoivent les
 * resultats en parametres, ce qui les rend previsibles — et testables.
 */
public class Game {

    private final Player joueur1;
    private final Player joueur2;
    private final int pointsPourGagner;
    private final Random de = new Random();

    public Game(Player joueur1, Player joueur2, int pointsPourGagner) {
        this.joueur1 = joueur1;
        this.joueur2 = joueur2;
        this.pointsPourGagner = pointsPourGagner;
    }

    /**
     * Rend celui des deux joueurs qui a le plus de points.
     * En cas d'egalite, rend le premier.
     *
     * UNE instruction, avec un operateur ternaire.
     */
    public static Player meilleur(Player a, Player b) {
        throw new UnsupportedOperationException("meilleur n'est pas encore implementee");
    }

    /**
     * Rend celui des deux joueurs qui a fait le plus grand nombre.
     * En cas d'egalite, rend le premier.
     *
     * UNE instruction, avec un operateur ternaire.
     */
    public static Player gagnantDuTour(Player a, int deA, Player b, int deB) {
        throw new UnsupportedOperationException("gagnantDuTour n'est pas encore implementee");
    }

    /** FOURNIE : deroule la partie jusqu'a ce qu'un joueur atteigne le maximum. */
    public Player jouerEtRendreLeVainqueur() {
        while (joueur1.getPoints() < pointsPourGagner
                && joueur2.getPoints() < pointsPourGagner) {
            jouerUnTour();
        }
        return meilleur(joueur1, joueur2);
    }

    /** FOURNIE. */
    private void jouerUnTour() {
        int de1;
        int de2;
        do {
            de1 = lancerLeDe();
            de2 = lancerLeDe();
        } while (de1 == de2);

        gagnantDuTour(joueur1, de1, joueur2, de2).ajouterUnPoint();
    }

    /** FOURNIE : rend un nombre entre 1 et 6. */
    private int lancerLeDe() {
        return de.nextInt(6) + 1;
    }
}
