package be.ephec.java.rec.e02;

/**
 * REC.2 — A COMPLETER.
 *
 * Taxe annuelle : 2 euros par kW de puissance, multiplies par le
 * coefficient de l'energie.
 */
public class Voiture extends Automobile {

    private int puissanceKw;

    public Voiture(String marque, int annee, Energie energie, int puissanceKw) {
        super(marque, annee, energie);
        throw new UnsupportedOperationException("Voiture n'est pas encore implementee");
    }

    public int getPuissanceKw() {
        throw new UnsupportedOperationException("getPuissanceKw n'est pas encore implementee");
    }

    @Override
    public double taxeAnnuelle() {
        throw new UnsupportedOperationException("taxeAnnuelle n'est pas encore implementee");
    }
}
