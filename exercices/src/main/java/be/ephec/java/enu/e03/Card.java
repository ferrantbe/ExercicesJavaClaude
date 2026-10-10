package be.ephec.java.enu.e03;

/** ENU.3 — A COMPLETER. */
public class Card {

    // TODO : declarez les deux champs, en private et en final

    /** Le constructeur est declare : completez son corps. */
    public Card(Value valeur, Color couleur) {
        throw new UnsupportedOperationException("le constructeur n'est pas encore implemente");
    }

    public Value getValue() {
        throw new UnsupportedOperationException("getValue n'est pas encore implementee");
    }

    public Color getColor() {
        throw new UnsupportedOperationException("getColor n'est pas encore implementee");
    }

    /**
     * Rend la carte en francais, dans ce format exact :
     *     "As de Pique", "3 de Coeur", "Roi de Trefle"
     */
    @Override
    public String toString() {
        throw new UnsupportedOperationException("toString n'est pas encore implementee");
    }
}
