package be.ephec.java.rec.e02;

/**
 * REC.2 — Corrige.
 *
 * Pas de champ propre : tout ce dont le scooter a besoin vient de sa
 * classe mere.
 */
public class Scooter extends DeuxRoues {

    private static final double FORFAIT = 25.0;

    public Scooter(String marque, int annee, Energie energie) {
        super(marque, annee, energie);
    }

    @Override
    public double taxeAnnuelle() {
        return FORFAIT * getEnergie().getCoefficient();
    }
}
