package be.ephec.java.gen.e04;

/** GEN.4 — Cette classe vous est FOURNIE. */
public class Personne {

    private final String nom;

    public Personne(String nom) {
        this.nom = nom;
    }

    public String getNom() {
        return nom;
    }

    @Override
    public String toString() {
        return nom;
    }
}
