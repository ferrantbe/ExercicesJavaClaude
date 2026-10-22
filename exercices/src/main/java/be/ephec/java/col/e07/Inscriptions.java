package be.ephec.java.col.e07;

import java.util.List;
import java.util.Set;

/**
 * COL.7 — A COMPLETER.
 *
 * Une table associative dont les valeurs sont elles-memes des collections :
 * a chaque etudiant correspond un ENSEMBLE de cours.
 *
 * Un ensemble et non une liste, parce qu'un etudiant ne s'inscrit pas deux
 * fois au meme cours — et que la structure doit le garantir plutot que de
 * compter sur la vigilance de l'appelant.
 */
public class Inscriptions {

    // TODO : declarez la table, en private et en final.
    //        Map<String, Set<String>> : un nom d'etudiant, ses cours.

    /**
     * Inscrit un etudiant a un cours. Si l'etudiant est inconnu, il est cree.
     * Une seconde inscription au meme cours ne change rien.
     *
     * Indice : computeIfAbsent evite d'ecrire le test « si l'etudiant n'existe
     * pas encore, lui creer un ensemble vide ». Cherchez-le dans la Javadoc
     * de Map.
     */
    public void inscrire(String etudiant, String cours) {
        throw new UnsupportedOperationException("inscrire n'est pas encore implementee");
    }

    /** Retourne les cours de cet etudiant, ou un ensemble VIDE s'il est inconnu. */
    public Set<String> coursDe(String etudiant) {
        throw new UnsupportedOperationException("coursDe n'est pas encore implementee");
    }

    /** Retourne les noms des etudiants inscrits, par ordre alphabetique. */
    public List<String> etudiants() {
        throw new UnsupportedOperationException("etudiants n'est pas encore implementee");
    }

    /**
     * Retourne un rapport, un etudiant par ligne, par ordre alphabetique, avec
     * ses cours eux aussi tries et separes par ", " :
     *
     *     Lovelace : Algebre, Java
     *     Turing : Java
     *
     * Pas de retour a la ligne a la fin.
     */
    public String rapport() {
        throw new UnsupportedOperationException("rapport n'est pas encore implementee");
    }
}
