package be.ephec.java.demo.col.slides;

import java.util.ArrayDeque;
import java.util.Deque;

/** Slides « Une file a deux bouts » et « Prendre et remettre » (COL, section 7). */
public class UneFileADeuxBouts {

    public static void main(String[] args) {
        Deque<String> attente = new ArrayDeque<>();

        attente.addLast("Zola");
        attente.addLast("Hugo");
        attente.addFirst("Sand");        // passe devant
        System.out.println(attente);     // [Sand, Zola, Hugo]

        String suivant = attente.pollFirst();   // "Sand", retire
        String ensuite = attente.peekFirst();   // "Zola", reste
        System.out.println(suivant + " puis " + ensuite);

        while (!attente.isEmpty()) {
            System.out.println(attente.pollFirst());
        }
    }

    /* Sortie attendue :
    [Sand, Zola, Hugo]
    Sand puis Zola
    Zola
    Hugo
    */
}
