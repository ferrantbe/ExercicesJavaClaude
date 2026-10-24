package be.ephec.java.rec.e02;

/**
 * REC.2 — Corrige.
 *
 * A remarquer : description() appelle nombreDeRoues(), qui est abstraite
 * ici. C'est le polymorphisme a l'oeuvre : la classe mere ecrit le texte,
 * chaque fille fournit le nombre (CC-CLS.4). Et taxeAnnuelle() n'est pas
 * redeclaree : implementer Taxable sans l'ecrire est permis a une classe
 * abstraite, qui transmet l'obligation a ses filles.
 */
public abstract class Vehicule implements Taxable {

    private final String marque;
    private final int annee;
    private final Energie energie;

    public Vehicule(String marque, int annee, Energie energie) {
        this.marque = marque;
        this.annee = annee;
        this.energie = energie;
    }

    public String getMarque() {
        return marque;
    }

    public int getAnnee() {
        return annee;
    }

    public Energie getEnergie() {
        return energie;
    }

    public abstract int nombreDeRoues();

    public String description() {
        return marque + " (" + annee + "), " + nombreDeRoues() + " roues, "
                + energie.getLibelle();
    }
}
