package be.ephec.java.abs.e04;

/**
 * ABS.4 — CORRIGE.
 *
 * Toujours abstraite : un forfait « en general » ne se facture pas. Elle
 * n'ajoute qu'un champ, et ne dit rien du calcul.
 *
 * L'accesseur est protected : le prix du forfait est un detail de calcul
 * dont les sous-classes ont besoin et que le monde exterieur n'a pas a
 * connaitre. C'est la visibilite de PKG.5, employee pour de vrai.
 */
public abstract class Forfait extends Prestation {

    private final double prixForfait;

    protected Forfait(String client, double prixForfait) {
        super(client);
        this.prixForfait = prixForfait;
    }

    protected double getPrixForfait() {
        return prixForfait;
    }
}
