package be.ephec.java.rec.e02;

/**
 * REC.2 — A COMPLETER.
 *
 * Taxe annuelle : un quart d'euro par cm3 de cylindree (cylindreeCc / 4.0),
 * multiplie par le coefficient de l'energie.
 */
public class Moto extends DeuxRoues {

    private int cylindreeCc;

    public Moto(String marque, int annee, Energie energie, int cylindreeCc) {
        super(marque, annee, energie);
        throw new UnsupportedOperationException("Moto n'est pas encore implementee");
    }

    public int getCylindreeCc() {
        throw new UnsupportedOperationException("getCylindreeCc n'est pas encore implementee");
    }

    @Override
    public double taxeAnnuelle() {
        throw new UnsupportedOperationException("taxeAnnuelle n'est pas encore implementee");
    }
}
