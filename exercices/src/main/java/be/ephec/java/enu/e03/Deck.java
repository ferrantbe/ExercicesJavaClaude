package be.ephec.java.enu.e03;

import java.util.Random;

/**
 * ENU.3 — A COMPLETER.
 *
 * Un jeu complet, sans jokers. Les cartes sont rangees dans un TABLEAU :
 * on connait leur nombre a l'avance.
 */
public class Deck {

    public static final int NOMBRE_DE_CARTES = 52;

    private final Random hasard = new Random();

    // TODO : declarez le tableau de cartes

    /**
     * Construit les 52 cartes, dans l'ordre : toutes les valeurs de la
     * premiere couleur, puis toutes celles de la deuxieme, et ainsi de suite.
     *
     * Indice : Color.values() et Value.values() rendent un tableau contenant
     * toutes les valeurs de l'enum. Deux boucles for-each imbriquees suffisent.
     */
    public Deck() {
        throw new UnsupportedOperationException("le constructeur n'est pas encore implemente");
    }

    /** Rend la carte a la position demandee. */
    public Card carteA(int position) {
        throw new UnsupportedOperationException("carteA n'est pas encore implementee");
    }

    /**
     * Melange les cartes.
     *
     * Une facon de faire : parcourir le tableau de la fin vers le debut et,
     * a chaque etape, echanger la carte courante avec une carte tiree au
     * hasard parmi celles qui la precedent — hasard.nextInt(i + 1).
     */
    public void shuffle() {
        throw new UnsupportedOperationException("shuffle n'est pas encore implementee");
    }
}
