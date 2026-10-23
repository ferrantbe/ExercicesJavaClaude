package be.ephec.java.col.e08;

import java.util.List;
import java.util.Set;

/**
 * COL.8 — A COMPLETER.
 *
 * Trois ordres pour la meme bibliotheque. Aucune methode ne doit modifier la
 * liste recue : travaillez sur une copie (voir COL.1).
 */
public class Tris {

    /**
     * Retourne une nouvelle liste des livres dans leur ordre naturel.
     *
     * Indice : Collections.sort, sans comparateur, utilise compareTo.
     */
    public static List<Livre> parTitre(List<Livre> livres) {
        throw new UnsupportedOperationException("parTitre n'est pas encore implementee");
    }

    /**
     * Retourne une nouvelle liste des livres par annee de parution.
     *
     * Indice : la methode sort d'une List recoit un Comparator.
     */
    public static List<Livre> parAnnee(List<Livre> livres) {
        throw new UnsupportedOperationException("parAnnee n'est pas encore implementee");
    }

    /**
     * Retourne un ensemble trie par auteur, puis par titre.
     *
     * Indice : le constructeur de TreeSet accepte un Comparator.
     */
    public static Set<Livre> rangesParAuteur(List<Livre> livres) {
        throw new UnsupportedOperationException("rangesParAuteur n'est pas encore implementee");
    }
}
