package be.ephec.java.abs.e04;

/**
 * ABS.4 — A COMPLETER.
 *
 * La racine de la hierarchie. Elle est abstraite, et elle implemente
 * Facturable SANS ecrire montant() : elle ne sait pas encore calculer.
 *
 * C'est parfaitement legal — et c'est meme le point de l'exercice. Une
 * classe abstraite peut promettre d'implementer une interface et laisser
 * ses sous-classes tenir la promesse.
 */
public abstract class Prestation implements Facturable {

    // TODO : le champ client, en private et en final

    protected Prestation(String client) {
        throw new UnsupportedOperationException("le constructeur n'est pas encore implemente");
    }

    public String getClient() {
        throw new UnsupportedOperationException("getClient n'est pas encore implementee");
    }

    /**
     * Retourne "Ada Lovelace : 125.00 EUR", au format US pour que le point
     * decimal soit previsible.
     *
     * Elle est ecrite ICI, une seule fois, et appelle montant() — que
     * seules les sous-classes savent calculer. C'est le meme mecanisme
     * qu'en ABS.1 : la classe mere appelle du code ecrit apres elle.
     */
    public String facture() {
        throw new UnsupportedOperationException("facture n'est pas encore implementee");
    }
}
