package be.ephec.java.rec.e10;

/** REC.10 — Corrige. Un support a une duree ; le reste est a ses filles. */
public abstract class Support extends Document {

    private final int minutes;

    public Support(String titre, int annee, Etat etat, int minutes) {
        super(titre, annee, etat);
        this.minutes = minutes;
    }

    public int getMinutes() {
        return minutes;
    }
}
