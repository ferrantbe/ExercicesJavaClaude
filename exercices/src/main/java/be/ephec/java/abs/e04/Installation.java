package be.ephec.java.abs.e04;

/**
 * ABS.4 — A COMPLETER. L'une des quatre classes concretes.
 *
 * Un champ supplementaire : le forfait de deplacement.
 *
 * Consultez le tableau de l'enonce pour la formule de montant().
 */
public class Installation extends Forfait {

    // TODO : le champ supplementaire

    public Installation(String client, double prixForfait, double deplacement) {
        super(client, prixForfait);
        throw new UnsupportedOperationException("le constructeur n'est pas encore implemente");
    }

    @Override
    public double montant() {
        throw new UnsupportedOperationException("montant n'est pas encore implementee");
    }
}
