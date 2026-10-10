package be.ephec.java.abs.e04;

/**
 * ABS.4 — A COMPLETER. L'une des quatre classes concretes.
 *
 * Aucun champ supplementaire.
 *
 * Consultez le tableau de l'enonce pour la formule de montant().
 */
public class Depannage extends Horaire {

    public Depannage(String client, double tauxHoraire, int heures) {
        super(client, tauxHoraire, heures);
        throw new UnsupportedOperationException("le constructeur n'est pas encore implemente");
    }

    @Override
    public double montant() {
        throw new UnsupportedOperationException("montant n'est pas encore implementee");
    }
}
