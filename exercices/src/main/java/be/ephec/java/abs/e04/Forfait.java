package be.ephec.java.abs.e04;

/**
 * ABS.4 — A COMPLETER.
 *
 * Deuxieme niveau : une prestation facturee au forfait. Toujours
 * abstraite — un forfait « en general » ne se facture pas.
 */
public abstract class Forfait extends Prestation {

    // TODO : le champ prixForfait

    protected Forfait(String client, double prixForfait) {
        super(client);
        throw new UnsupportedOperationException("le constructeur n'est pas encore implemente");
    }

    /**
     * Accessible aux sous-classes, et a elles seules.
     *
     * protected, et non public : le prix du forfait est un detail de
     * calcul, pas une information que le monde exterieur doit connaitre.
     */
    protected double getPrixForfait() {
        throw new UnsupportedOperationException("getPrixForfait n'est pas encore implementee");
    }
}
