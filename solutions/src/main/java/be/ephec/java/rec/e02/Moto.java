package be.ephec.java.rec.e02;

/**
 * REC.2 — Corrige.
 *
 * Une division par un double, pour ne pas perdre la partie decimale :
 * 125 / 4 vaut 31, mais 125 / 4.0 vaut 31.25.
 */
public class Moto extends DeuxRoues {

    private static final double CC_PAR_EURO = 4.0;

    private final int cylindreeCc;

    public Moto(String marque, int annee, Energie energie, int cylindreeCc) {
        super(marque, annee, energie);
        this.cylindreeCc = cylindreeCc;
    }

    public int getCylindreeCc() {
        return cylindreeCc;
    }

    @Override
    public double taxeAnnuelle() {
        return cylindreeCc / CC_PAR_EURO * getEnergie().getCoefficient();
    }
}
