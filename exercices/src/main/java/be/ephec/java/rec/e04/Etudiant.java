package be.ephec.java.rec.e04;

/**
 * REC.4 — A COMPLETER.
 *
 * Un etudiant recoit un matricule unique a sa creation : "ET-0001" pour le
 * premier cree, "ET-0002" pour le suivant, et ainsi de suite. Le compteur
 * qui le genere appartient a la classe, pas a l'etudiant : c'est un champ
 * static (voir STA).
 */
public class Etudiant {

    // TODO : le compteur des etudiants crees, commun a toute la classe.

    private String nom;
    private String prenom;
    private String matricule;

    /** Cree l'etudiant et lui attribue le matricule suivant. */
    public Etudiant(String nom, String prenom) {
        throw new UnsupportedOperationException("Etudiant n'est pas encore implementee");
    }

    public String getNom() {
        throw new UnsupportedOperationException("getNom n'est pas encore implementee");
    }

    public String getPrenom() {
        throw new UnsupportedOperationException("getPrenom n'est pas encore implementee");
    }

    /** "ET-" suivi du numero sur quatre chiffres : "ET-0042". */
    public String getMatricule() {
        throw new UnsupportedOperationException("getMatricule n'est pas encore implementee");
    }

    /** Le nombre d'etudiants crees depuis le lancement du programme. */
    public static int getNombreCrees() {
        throw new UnsupportedOperationException("getNombreCrees n'est pas encore implementee");
    }

    /** "ET-0042 Lovelace Ada" : le matricule, le nom, le prenom. */
    @Override
    public String toString() {
        throw new UnsupportedOperationException("toString n'est pas encore implementee");
    }
}
