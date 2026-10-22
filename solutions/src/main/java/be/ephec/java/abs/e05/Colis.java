package be.ephec.java.abs.e05;

/** ABS.5 — CORRIGE. Un forfait, plus le poids. */
public class Colis extends Envoi {

    private static final double FORFAIT = 4.00;
    private static final double PAR_GRAMME = 0.005;

    public Colis(String destinataire, int poidsGrammes) {
        super(destinataire, poidsGrammes);
    }

    @Override
    public double cout() {
        return FORFAIT + PAR_GRAMME * getPoidsGrammes();
    }
}
