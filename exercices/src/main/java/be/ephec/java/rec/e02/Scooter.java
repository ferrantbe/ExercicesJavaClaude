package be.ephec.java.rec.e02;

/**
 * REC.2 — A COMPLETER.
 *
 * Taxe annuelle : un forfait de 25 euros, multiplie par le coefficient de
 * l'energie.
 */
public class Scooter extends DeuxRoues {

    public Scooter(String marque, int annee, Energie energie) {
        super(marque, annee, energie);
    }

    @Override
    public double taxeAnnuelle() {
        throw new UnsupportedOperationException("taxeAnnuelle n'est pas encore implementee");
    }
}
