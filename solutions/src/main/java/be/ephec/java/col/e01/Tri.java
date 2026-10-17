package be.ephec.java.col.e01;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

/**
 * COL.1 — CORRIGE.
 *
 * Deux approches, et la difference n'est pas seulement technique.
 *
 *   Collections.sort trie une liste EXISTANTE, sur place. C'est une action
 *   qu'on declenche, a un moment choisi.
 *
 *   Un TreeSet est trie EN PERMANENCE : il n'y a aucun moment ou il ne l'est
 *   pas, parce que chaque insertion place l'element au bon endroit.
 *
 * La seconde est preferable quand l'ordre est une propriete de la structure
 * plutot qu'une operation ponctuelle. Elle a un prix, en revanche : le
 * TreeSet refuse les doublons.
 */
public class Tri {

    public static List<Integer> triee(List<Integer> nombres) {
        // On copie AVANT de trier : l'enonce demande de ne pas toucher a la
        // liste recue. Collections.sort trie sur place, sans rien retourner.
        List<Integer> copie = new ArrayList<>(nombres);
        Collections.sort(copie);
        return copie;
    }

    public static Set<Integer> ensembleTrie(List<Integer> nombres) {
        // Le constructeur de TreeSet accepte n'importe quelle Collection.
        // Les doublons disparaissent au passage : c'est le propre d'un Set.
        return new TreeSet<>(nombres);
    }
}
