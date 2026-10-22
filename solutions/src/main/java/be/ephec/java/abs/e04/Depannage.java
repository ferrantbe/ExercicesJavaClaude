package be.ephec.java.abs.e04;

/** ABS.4 — CORRIGE. Les heures au taux normal. */
public class Depannage extends Horaire {

    public Depannage(String client, double tauxHoraire, int heures) {
        super(client, tauxHoraire, heures);
    }

    @Override
    public double montant() {
        return getHeures() * getTauxHoraire();
    }
}
