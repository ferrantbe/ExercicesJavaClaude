package be.ephec.java.col.e06;

import java.util.List;
import java.util.Set;

/**
 * COL.6 — A COMPLETER.
 *
 * Un Set ne retient qu'un exemplaire de chaque valeur, et repond tres vite a
 * la question « est-ce que je contiens ceci ? ». C'est ce qui le distingue
 * d'une List, ou la meme question exige de parcourir tous les elements.
 */
public class Tirage {

    /**
     * Retourne un Set contenant les valeurs de la liste, sans doublon.
     *
     * Indice : HashSet a un constructeur qui accepte une Collection.
     */
    public static Set<Integer> sansDoublons(List<Integer> nombres) {
        throw new UnsupportedOperationException("sansDoublons n'est pas encore implementee");
    }

    /** Retourne true si le nombre figure dans l'ensemble. */
    public static boolean aEteTire(Set<Integer> tirage, int nombre) {
        throw new UnsupportedOperationException("aEteTire n'est pas encore implementee");
    }

    /** Retourne le nombre de doublons perdus au passage de la liste a l'ensemble. */
    public static int doublons(List<Integer> nombres) {
        throw new UnsupportedOperationException("doublons n'est pas encore implementee");
    }
}
