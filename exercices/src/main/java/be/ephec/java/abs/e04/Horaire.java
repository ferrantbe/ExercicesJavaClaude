package be.ephec.java.abs.e04;

/**
 * ABS.4 — A COMPLETER.
 *
 * L'autre branche : une prestation facturee a l'heure.
 */
public abstract class Horaire extends Prestation {

    // TODO : les champs tauxHoraire et heures

    protected Horaire(String client, double tauxHoraire, int heures) {
        super(client);
        throw new UnsupportedOperationException("le constructeur n'est pas encore implemente");
    }

    protected double getTauxHoraire() {
        throw new UnsupportedOperationException("getTauxHoraire n'est pas encore implementee");
    }

    protected int getHeures() {
        throw new UnsupportedOperationException("getHeures n'est pas encore implementee");
    }
}
