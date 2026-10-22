package be.ephec.java.abs.e04;

/** ABS.4 — CORRIGE. Les heures, majorees. */
public class Urgence extends Horaire {

    private final double majoration;

    public Urgence(String client, double tauxHoraire, int heures, double majoration) {
        super(client, tauxHoraire, heures);
        this.majoration = majoration;
    }

    @Override
    public double montant() {
        return getHeures() * getTauxHoraire() * (1 + majoration);
    }
}
