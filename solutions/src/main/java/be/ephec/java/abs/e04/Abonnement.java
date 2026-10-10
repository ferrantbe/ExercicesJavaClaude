package be.ephec.java.abs.e04;

/** ABS.4 — CORRIGE. Le cas le plus simple : le forfait, tel quel. */
public class Abonnement extends Forfait {

    public Abonnement(String client, double prixForfait) {
        super(client, prixForfait);
    }

    @Override
    public double montant() {
        return getPrixForfait();
    }
}
