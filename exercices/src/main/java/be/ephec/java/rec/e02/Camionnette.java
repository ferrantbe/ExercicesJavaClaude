package be.ephec.java.rec.e02;

/**
 * REC.2 — A COMPLETER.
 *
 * Taxe annuelle : 120 euros, plus un euro par tranche de 10 kg de charge
 * utile (chargeUtileKg / 10.0), le tout multiplie par le coefficient de
 * l'energie.
 */
public class Camionnette extends Automobile {

    private int chargeUtileKg;

    public Camionnette(String marque, int annee, Energie energie, int chargeUtileKg) {
        super(marque, annee, energie);
        throw new UnsupportedOperationException("Camionnette n'est pas encore implementee");
    }

    public int getChargeUtileKg() {
        throw new UnsupportedOperationException("getChargeUtileKg n'est pas encore implementee");
    }

    @Override
    public double taxeAnnuelle() {
        throw new UnsupportedOperationException("taxeAnnuelle n'est pas encore implementee");
    }
}
