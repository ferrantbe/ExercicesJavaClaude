package be.ephec.java.col.e05;

import java.util.LinkedList;
import java.util.List;
import java.util.Random;

/** COL.5 — CORRIGE. */
public class Programme {

    public static void main(String[] args) {
        Random hasard = new Random();
        List<Integer> nombres = new LinkedList<>();

        for (int i = 0; i < 100; i++) {
            nombres.add(hasard.nextInt(1000) + 1);
        }

        int pairs = Filtrage.compterLesPairs(nombres);
        System.out.println("100 nombres, dont " + pairs + " pairs");

        Filtrage.supprimerLesPairs(nombres);

        System.out.println("Il en reste " + nombres.size()
                + " apres suppression : " + (100 - pairs == nombres.size() ? "coherent" : "?!"));
        System.out.println(nombres);
    }
}
