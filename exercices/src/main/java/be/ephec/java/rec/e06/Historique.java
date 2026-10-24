package be.ephec.java.rec.e06;

import java.util.List;

/**
 * REC.6 — A COMPLETER.
 *
 * Un historique chronologique d'elements de n'importe quel type : des
 * actions d'un utilisateur, des temperatures, des etats. C'est le type
 * parametre T qui dit lequel, et il n'y en a qu'un par historique.
 */
public class Historique<T> {

    // TODO : la liste des enregistrements, dans l'ordre d'arrivee.

    /** Ajoute un enregistrement a la fin. */
    public void enregistrer(T element) {
        throw new UnsupportedOperationException("enregistrer n'est pas encore implementee");
    }

    /**
     * Le dernier element enregistre.
     *
     * @throws IllegalStateException si l'historique est vide — l'exception
     *                               existe dans le JDK
     */
    public T dernier() {
        throw new UnsupportedOperationException("dernier n'est pas encore implementee");
    }

    /**
     * Tout l'historique, du plus ancien au plus recent, NON MODIFIABLE :
     * celui qui le recoit ne peut ni ajouter ni retirer. Voir
     * Collections.unmodifiableList, et FIC.1 qui faisait la meme chose.
     */
    public List<T> tout() {
        throw new UnsupportedOperationException("tout n'est pas encore implementee");
    }

    public int taille() {
        throw new UnsupportedOperationException("taille n'est pas encore implementee");
    }

    public boolean estVide() {
        throw new UnsupportedOperationException("estVide n'est pas encore implementee");
    }

    /** Le nombre de fois que cet element a ete enregistre. */
    public int occurrences(T element) {
        throw new UnsupportedOperationException("occurrences n'est pas encore implementee");
    }
}
