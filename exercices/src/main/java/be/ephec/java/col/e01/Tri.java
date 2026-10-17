package be.ephec.java.col.e01;

import java.util.List;
import java.util.Set;

/**
 * COL.1 — A COMPLETER.
 *
 * Deux facons d'obtenir une collection triee : trier une List apres coup, ou
 * utiliser une collection qui reste triee d'elle-meme.
 */
public class Tri {

    /**
     * Retourne une NOUVELLE liste contenant les memes nombres, tries par ordre
     * croissant. La liste recue n'est pas modifiee.
     *
     * Indice : la classe Collections et sa methode statique sort.
     */
    public static List<Integer> triee(List<Integer> nombres) {
        throw new UnsupportedOperationException("triee n'est pas encore implementee");
    }

    /**
     * Retourne un Set contenant les memes nombres, mais constamment trie.
     *
     * Indice : TreeSet. Notez ce qui arrive aux doublons.
     */
    public static Set<Integer> ensembleTrie(List<Integer> nombres) {
        throw new UnsupportedOperationException("ensembleTrie n'est pas encore implementee");
    }
}
