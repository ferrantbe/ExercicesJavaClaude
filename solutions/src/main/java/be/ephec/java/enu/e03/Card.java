package be.ephec.java.enu.e03;

/**
 * ENU.3 — CORRIGE.
 *
 * Une carte ne change jamais : ses deux champs sont final, et la classe
 * n'expose aucun setter.
 */
public class Card {

    private final Value valeur;
    private final Color couleur;

    public Card(Value valeur, Color couleur) {
        this.valeur = valeur;
        this.couleur = couleur;
    }

    public Value getValue() {
        return valeur;
    }

    public Color getColor() {
        return couleur;
    }

    /**
     * La carte ne sait pas comment s'ecrit une couleur en francais : elle le
     * demande a l'enum, qui porte cette information. Chacun sa responsabilite.
     */
    @Override
    public String toString() {
        return valeur.getLibelle() + " de " + couleur.getLibelle();
    }
}
