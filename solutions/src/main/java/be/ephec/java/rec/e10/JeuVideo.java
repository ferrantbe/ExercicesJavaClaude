package be.ephec.java.rec.e10;

/** REC.10 — Corrige. */
public class JeuVideo extends Support {

    private static final int DUREE_JOURS = 14;
    private static final double TAUX_PAR_JOUR = 0.50;
    private static final double PLAFOND = 10.00;

    public JeuVideo(String titre, int annee, Etat etat, int minutes) {
        super(titre, annee, etat, minutes);
    }

    @Override
    public String categorie() {
        return "jeu video";
    }

    @Override
    public int dureeMaxJours() {
        return DUREE_JOURS;
    }

    @Override
    protected double tauxParJour() {
        return TAUX_PAR_JOUR;
    }

    @Override
    protected double plafond() {
        return PLAFOND;
    }
}
