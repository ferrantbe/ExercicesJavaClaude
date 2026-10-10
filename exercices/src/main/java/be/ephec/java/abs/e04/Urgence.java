package be.ephec.java.abs.e04;

/**
 * ABS.4 — A COMPLETER. L'une des quatre classes concretes.
 *
 * Un champ supplementaire : la majoration, exprimee en fraction — 0.5 pour cinquante pour cent.
 *
 * Consultez le tableau de l'enonce pour la formule de montant().
 */
public class Urgence extends Horaire {

    // TODO : le champ supplementaire

    public Urgence(String client, double tauxHoraire, int heures, double majoration) {
        super(client, tauxHoraire, heures);
        throw new UnsupportedOperationException("le constructeur n'est pas encore implemente");
    }

    @Override
    public double montant() {
        throw new UnsupportedOperationException("montant n'est pas encore implementee");
    }
}
