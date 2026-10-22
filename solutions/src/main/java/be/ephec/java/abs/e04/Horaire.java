package be.ephec.java.abs.e04;

/** ABS.4 — CORRIGE. L'autre branche de la hierarchie. */
public abstract class Horaire extends Prestation {

    private final double tauxHoraire;
    private final int heures;

    protected Horaire(String client, double tauxHoraire, int heures) {
        super(client);
        this.tauxHoraire = tauxHoraire;
        this.heures = heures;
    }

    protected double getTauxHoraire() {
        return tauxHoraire;
    }

    protected int getHeures() {
        return heures;
    }
}
