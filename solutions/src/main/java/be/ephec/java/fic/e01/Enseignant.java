package be.ephec.java.fic.e01;

/** FIC.1 — CORRIGE. */
public class Enseignant {

    private final String nom;
    private final String prenom;

    public Enseignant(String nom, String prenom) {
        this.nom = nom;
        this.prenom = prenom;
    }

    public String getNom() {
        return nom;
    }

    public String getPrenom() {
        return prenom;
    }

    @Override
    public String toString() {
        return prenom + " " + nom;
    }
}
