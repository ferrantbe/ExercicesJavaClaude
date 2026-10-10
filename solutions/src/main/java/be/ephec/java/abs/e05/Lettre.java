package be.ephec.java.abs.e05;

/**
 * ABS.5 — CORRIGE.
 *
 * Le seul point delicat est la BORNE. « Jusqu'a 50 grammes » inclut les
 * 50 grammes : c'est <= et non <. Une erreur d'un gramme, et un envoi
 * sur mille est mal facture — le genre de defaut qu'on ne trouve pas en
 * essayant au hasard, et qu'un test a la borne attrape tout de suite.
 */
public class Lettre extends Envoi {

    private static final int POIDS_LEGER = 50;
    private static final double TARIF_LEGER = 1.10;
    private static final double TARIF_LOURD = 2.20;

    public Lettre(String destinataire, int poidsGrammes) {
        super(destinataire, poidsGrammes);
    }

    @Override
    public double cout() {
        return getPoidsGrammes() <= POIDS_LEGER ? TARIF_LEGER : TARIF_LOURD;
    }
}
