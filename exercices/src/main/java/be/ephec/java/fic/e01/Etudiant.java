package be.ephec.java.fic.e01;

import java.util.List;

/**
 * FIC.1 — A COMPLETER.
 *
 * Un etudiant a un nom, un prenom, et la liste des cours auxquels il est
 * inscrit. Cette liste commence vide et evolue par inscrire et desinscrire.
 */
public class Etudiant {

    // TODO : declarez les champs. La liste des cours est creee ici, pas
    //        recue au constructeur.

    /** Le constructeur est declare : completez son corps. */
    public Etudiant(String nom, String prenom) {
        throw new UnsupportedOperationException("le constructeur n'est pas encore implemente");
    }

    public String getNom() {
        throw new UnsupportedOperationException("getNom n'est pas encore implementee");
    }

    public String getPrenom() {
        throw new UnsupportedOperationException("getPrenom n'est pas encore implementee");
    }

    /** Inscrit l'etudiant au cours. Une seconde inscription au meme cours ne change rien. */
    public void inscrire(Cours cours) {
        throw new UnsupportedOperationException("inscrire n'est pas encore implementee");
    }

    /** Desinscrit l'etudiant. Sans effet s'il n'y etait pas inscrit. */
    public void desinscrire(Cours cours) {
        throw new UnsupportedOperationException("desinscrire n'est pas encore implementee");
    }

    /**
     * Retourne la liste des cours.
     *
     * Reflechissez a ce que vous retournez : si vous retournez la liste elle-meme,
     * l'appelant peut la vider. Voir CC-OBJ.2 du memento Clean Code.
     */
    public List<Cours> getCours() {
        throw new UnsupportedOperationException("getCours n'est pas encore implementee");
    }

    public int nombreDeCours() {
        throw new UnsupportedOperationException("nombreDeCours n'est pas encore implementee");
    }

    /** Retourne "Lovelace Ada : Java, Algebre" — les cours dans l'ordre d'inscription. */
    @Override
    public String toString() {
        throw new UnsupportedOperationException("toString n'est pas encore implementee");
    }
}
