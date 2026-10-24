package be.ephec.java.rec.e02;

/**
 * REC.2 — Corrige.
 *
 * Les constantes nommees remplacent les nombres magiques (CC-NOM.7) :
 * la formule se lit sans l'enonce sous les yeux.
 */
public class Camionnette extends Automobile {

    private static final double BASE = 120.0;
    private static final double KG_PAR_EURO = 10.0;

    private final int chargeUtileKg;

    public Camionnette(String marque, int annee, Energie energie, int chargeUtileKg) {
        super(marque, annee, energie);
        this.chargeUtileKg = chargeUtileKg;
    }

    public int getChargeUtileKg() {
        return chargeUtileKg;
    }

    @Override
    public double taxeAnnuelle() {
        return (BASE + chargeUtileKg / KG_PAR_EURO) * getEnergie().getCoefficient();
    }
}
