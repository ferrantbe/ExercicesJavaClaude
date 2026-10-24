package be.ephec.java.rec.e10;

/**
 * REC.10 — Corrige.
 *
 * Decision de conception : la penalite est calculee ICI, une fois, a
 * partir de deux methodes abstraites — le taux par jour et le plafond. Les
 * quatre sortes ne donnent que leurs nombres. Autre decision possible :
 * laisser penalite() abstraite et l'ecrire quatre fois ; c'est juste aussi,
 * mais la regle "pas de retard, pas de penalite" serait alors ecrite
 * quatre fois elle aussi (CC-CLS.3).
 */
public abstract class Document implements Empruntable {

    private final String titre;
    private final int annee;
    private final Etat etat;

    public Document(String titre, int annee, Etat etat) {
        this.titre = titre;
        this.annee = annee;
        this.etat = etat;
    }

    public String getTitre() {
        return titre;
    }

    public int getAnnee() {
        return annee;
    }

    public Etat getEtat() {
        return etat;
    }

    /** "livre", "revue", "DVD", "jeu video". */
    public abstract String categorie();

    /** La penalite par jour de retard, en euros. */
    protected abstract double tauxParJour();

    /** Le maximum d'une penalite ; par defaut, aucun plafond. */
    protected double plafond() {
        return Double.MAX_VALUE;
    }

    @Override
    public double penalite(int joursDeRetard) {
        if (joursDeRetard <= 0) {
            return 0;
        }
        return Math.min(joursDeRetard * tauxParJour(), plafond());
    }

    public String description() {
        return titre + " (" + annee + "), " + categorie() + ", " + etat.getLibelle();
    }
}
