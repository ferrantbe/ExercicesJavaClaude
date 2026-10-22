package be.ephec.java.col.e05;

import java.util.List;

/** COL.5 — CORRIGE. */
public class Filtrage {

    /**
     * removeIf appartient a l'interface Collection : elle fonctionne donc sur
     * une ArrayList comme sur une LinkedList, et sur un Set aussi.
     *
     * Notez ce qu'on ne fait PAS : parcourir la liste avec une boucle et
     * supprimer au passage. Supprimer un element pendant qu'on parcourt une
     * collection leve une ConcurrentModificationException. removeIf existe
     * pour cette raison.
     */
    public static void supprimerLesPairs(List<Integer> nombres) {
        nombres.removeIf(new EstPair());
    }

    public static int compterLesPairs(List<Integer> nombres) {
        EstPair estPair = new EstPair();

        int compte = 0;
        for (Integer nombre : nombres) {
            if (estPair.test(nombre)) {
                compte++;
            }
        }
        return compte;
    }
}
