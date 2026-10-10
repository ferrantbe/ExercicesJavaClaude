package be.ephec.java.col.e06;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * COL.6 — CORRIGE.
 *
 * Un HashSet apporte deux choses.
 *
 *   L'unicite : il ne retient qu'un exemplaire de chaque valeur, sans qu'on
 *   ait a verifier quoi que ce soit avant d'ajouter.
 *
 *   La rapidite de la recherche : contains repond en temps constant, alors
 *   qu'une List doit parcourir ses elements un a un. Sur cent nombres la
 *   difference ne se voit pas ; sur un million, si.
 *
 * Le prix a payer : un Set ne conserve aucun ordre.
 */
public class Tirage {

    public static Set<Integer> sansDoublons(List<Integer> nombres) {
        return new HashSet<>(nombres);
    }

    public static boolean aEteTire(Set<Integer> tirage, int nombre) {
        return tirage.contains(nombre);
    }

    /**
     * La difference des tailles suffit : chaque valeur perdue au passage etait
     * un doublon. Inutile de compter les repetitions une par une.
     */
    public static int doublons(List<Integer> nombres) {
        return nombres.size() - sansDoublons(nombres).size();
    }
}
