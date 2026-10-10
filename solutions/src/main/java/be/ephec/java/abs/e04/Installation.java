package be.ephec.java.abs.e04;

/** ABS.4 — CORRIGE. Le forfait, plus le deplacement. */
public class Installation extends Forfait {

    private final double deplacement;

    public Installation(String client, double prixForfait, double deplacement) {
        super(client, prixForfait);
        this.deplacement = deplacement;
    }

    @Override
    public double montant() {
        return getPrixForfait() + deplacement;
    }
}
