package be.ephec.java.col.e04;

import java.util.Map;
import java.util.TreeMap;

/** COL.4 — CORRIGE. */
public class Programme {

    public static void main(String[] args) {
        Map<String, Integer> occurrences = Occurrences.compter(SourceDeTexte.ouvrir());

        System.out.println("--- rapport trie ---");
        System.out.println(Occurrences.rapport(occurrences));

        // La meme table affichee directement : l'ordre depend du hachage.
        System.out.println("\n--- la HashMap telle quelle ---");
        System.out.println(occurrences);

        // La meme, rangee dans une TreeMap : ordre alphabetique garanti.
        System.out.println("\n--- la meme dans une TreeMap ---");
        System.out.println(new TreeMap<>(occurrences));
    }
}
