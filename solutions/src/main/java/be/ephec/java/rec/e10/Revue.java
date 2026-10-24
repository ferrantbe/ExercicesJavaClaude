package be.ephec.java.rec.e10;

/** REC.10 — Corrige. */
public class Revue extends Imprime {

    private static final int DUREE_JOURS = 7;
    private static final double TAUX_PAR_JOUR = 0.20;

    public Revue(String titre, int annee, Etat etat, int pages) {
        super(titre, annee, etat, pages);
    }

    @Override
    public String categorie() {
        return "revue";
    }

    @Override
    public int dureeMaxJours() {
        return DUREE_JOURS;
    }

    @Override
    protected double tauxParJour() {
        return TAUX_PAR_JOUR;
    }
}
