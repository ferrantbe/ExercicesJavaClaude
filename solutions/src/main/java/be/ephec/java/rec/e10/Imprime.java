package be.ephec.java.rec.e10;

/** REC.10 — Corrige. Ce qui est imprime a des pages ; le reste est a ses filles. */
public abstract class Imprime extends Document {

    private final int pages;

    public Imprime(String titre, int annee, Etat etat, int pages) {
        super(titre, annee, etat);
        this.pages = pages;
    }

    public int getPages() {
        return pages;
    }
}
