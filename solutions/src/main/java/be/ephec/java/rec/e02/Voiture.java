package be.ephec.java.rec.e02;

/**
 * REC.2 — Corrige.
 *
 * A remarquer : le coefficient vient de l'enumeration, pas d'un switch
 * sur l'energie. Ajouter une energie ne demande de toucher qu'a Energie.
 */
public class Voiture extends Automobile {

    private static final double EUROS_PAR_KW = 2.0;

    private final int puissanceKw;

    public Voiture(String marque, int annee, Energie energie, int puissanceKw) {
        super(marque, annee, energie);
        this.puissanceKw = puissanceKw;
    }

    public int getPuissanceKw() {
        return puissanceKw;
    }

    @Override
    public double taxeAnnuelle() {
        return puissanceKw * EUROS_PAR_KW * getEnergie().getCoefficient();
    }
}
