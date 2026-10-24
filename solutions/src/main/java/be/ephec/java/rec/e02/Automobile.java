package be.ephec.java.rec.e02;

/**
 * REC.2 — Corrige.
 *
 * Une classe intermediaire qui ne fait qu'une chose : fixer le nombre de
 * roues pour toute sa descendance. Elle reste abstraite parce que
 * taxeAnnuelle() n'est toujours pas ecrite.
 */
public abstract class Automobile extends Vehicule {

    private static final int ROUES = 4;

    public Automobile(String marque, int annee, Energie energie) {
        super(marque, annee, energie);
    }

    @Override
    public int nombreDeRoues() {
        return ROUES;
    }
}
