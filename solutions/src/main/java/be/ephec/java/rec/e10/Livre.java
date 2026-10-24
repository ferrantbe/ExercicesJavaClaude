package be.ephec.java.rec.e10;

/** REC.10 — Corrige. */
public class Livre extends Imprime {

    private static final int DUREE_JOURS = 21;
    private static final double TAUX_PAR_JOUR = 0.10;

    public Livre(String titre, int annee, Etat etat, int pages) {
        super(titre, annee, etat, pages);
    }

    @Override
    public String categorie() {
        return "livre";
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
