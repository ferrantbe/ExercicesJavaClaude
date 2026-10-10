package be.ephec.java.col.e04;

import java.util.Map;
import java.util.Scanner;

/** COL.4 — A COMPLETER. */
public class Occurrences {

    /**
     * Compte le nombre d'apparitions de chaque mot du Scanner.
     *
     * Indice : scanner.hasNext() et scanner.next() decoupent le texte en mots.
     * Pour compter, regardez getOrDefault dans la Javadoc de Map.
     */
    public static Map<String, Integer> compter(Scanner scanner) {
        throw new UnsupportedOperationException("compter n'est pas encore implementee");
    }

    /**
     * Rend le decompte sous forme de texte, un mot par ligne, PAR ORDRE
     * ALPHABETIQUE, au format exact :
     *
     *     chat : 3
     *     chien : 2
     *
     * Pas de retour a la ligne a la fin.
     */
    public static String rapport(Map<String, Integer> occurrences) {
        throw new UnsupportedOperationException("rapport n'est pas encore implementee");
    }
}
