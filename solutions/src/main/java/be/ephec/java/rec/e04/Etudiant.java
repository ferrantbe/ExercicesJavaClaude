package be.ephec.java.rec.e04;

/**
 * REC.4 — Corrige.
 *
 * A remarquer : le compteur est static, parce qu'il compte des objets et
 * ne peut donc appartenir a aucun d'eux. Il est incremente AVANT de former
 * le matricule, pour que le premier etudiant soit le 0001 et non le 0000.
 * Le getter qui le lit est static lui aussi : on peut le demander sans
 * avoir d'etudiant sous la main.
 */
public class Etudiant {

    private static int nombreCrees = 0;

    private final String nom;
    private final String prenom;
    private final String matricule;

    public Etudiant(String nom, String prenom) {
        this.nom = nom;
        this.prenom = prenom;
        nombreCrees++;
        this.matricule = String.format("ET-%04d", nombreCrees);
    }

    public String getNom() {
        return nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public String getMatricule() {
        return matricule;
    }

    public static int getNombreCrees() {
        return nombreCrees;
    }

    @Override
    public String toString() {
        return matricule + " " + nom + " " + prenom;
    }
}
