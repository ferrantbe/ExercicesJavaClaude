package be.ephec.java.rec.e02;

/**
 * REC.2 — FOURNIE. Rien a completer.
 *
 * L'energie d'un vehicule, avec le coefficient qui module sa taxe. Une
 * enumeration porte des donnees comme une classe : un champ, un
 * constructeur, un accesseur. Voir ENU.
 */
public enum Energie {
    ESSENCE("essence", 1.0),
    DIESEL("diesel", 1.25),
    ELECTRIQUE("electrique", 0.2);

    private final String libelle;
    private final double coefficient;

    Energie(String libelle, double coefficient) {
        this.libelle = libelle;
        this.coefficient = coefficient;
    }

    public String getLibelle() {
        return libelle;
    }

    /** Le facteur par lequel la taxe de base est multipliee. */
    public double getCoefficient() {
        return coefficient;
    }
}
