package be.ephec.java.rec.e10;

/** REC.10 — Corrige. */
public enum Etat {
    NEUF("neuf"),
    BON("bon etat"),
    ABIME("abime");

    private final String libelle;

    Etat(String libelle) {
        this.libelle = libelle;
    }

    public String getLibelle() {
        return libelle;
    }
}
