package be.ephec.java.tab.e03;

import java.util.Random;

/**
 * TAB.3 — CORRIGE.
 *
 * L'operateur ternaire s'ecrit  condition ? valeurSiVrai : valeurSiFaux
 * et il RETOURNE une valeur. C'est ce qui le distingue du if : on peut le
 * placer a droite d'un return ou d'une affectation, ce qu'un if ne permet pas.
 *
 * Il ne remplace pas le if partout. Des qu'une branche fait plus que produire
 * une valeur, ou que les conditions s'imbriquent, le if reste plus lisible.
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
     * Notez le sens de la comparaison : b.getPoints() > a.getPoints() retourne b,
     * et l'egalite tombe donc du cote de a — ce que l'enonce demande.
     */
    public static Player meilleur(Player a, Player b) {
        return b.getPoints() > a.getPoints() ? b : a;
    }

    public static Player gagnantDuTour(Player a, int deA, Player b, int deB) {
        return deB > deA ? b : a;
    }

    public Player jouerEtRendreLeVainqueur() {
        while (joueur1.getPoints() < pointsPourGagner
                && joueur2.getPoints() < pointsPourGagner) {
            jouerUnTour();
        }
        return meilleur(joueur1, joueur2);
    }

    private void jouerUnTour() {
        int de1;
        int de2;
        do {
            de1 = lancerLeDe();
            de2 = lancerLeDe();
        } while (de1 == de2);

        gagnantDuTour(joueur1, de1, joueur2, de2).ajouterUnPoint();
    }

    private int lancerLeDe() {
        return de.nextInt(6) + 1;
    }
}
