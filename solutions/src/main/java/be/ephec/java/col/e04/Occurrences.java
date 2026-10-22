package be.ephec.java.col.e04;

import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import java.util.TreeMap;

/**
 * COL.4 — CORRIGE.
 *
 * Reponse a la question de l'enonce sur HashMap et SortedMap : la difference
 * ne porte QUE sur l'ordre de parcours.
 *
 *   Une HashMap ne garantit aucun ordre. Celui que vous observez depend du
 *   code de hachage des cles ; il parait souvent aleatoire, et surtout il
 *   n'est pas stable d'une version de Java a l'autre.
 *
 *   Une TreeMap parcourt ses cles dans l'ordre naturel, ici alphabetique.
 *
 * Le comptage lui-meme est identique. C'est pourquoi rapport() trie les cles
 * plutot que de supposer un ordre : le resultat devient previsible, donc
 * testable, quelle que soit la Map recue.
 */
public class Occurrences {

    public static Map<String, Integer> compter(Scanner scanner) {
        Map<String, Integer> occurrences = new HashMap<>();

        while (scanner.hasNext()) {
            String mot = scanner.next();
            // getOrDefault evite d'ecrire « si le mot est absent, mettre 1,
            // sinon incrementer ». Une ligne au lieu de quatre.
            occurrences.put(mot, occurrences.getOrDefault(mot, 0) + 1);
        }
        return occurrences;
    }

    public static String rapport(Map<String, Integer> occurrences) {
        StringBuilder texte = new StringBuilder();

        // TreeMap trie les cles ; on aurait aussi pu extraire les cles dans
        // une liste et la trier. Le resultat est le meme.
        for (Map.Entry<String, Integer> entree : new TreeMap<>(occurrences).entrySet()) {
            if (texte.length() > 0) {
                texte.append('\n');
            }
            texte.append(entree.getKey()).append(" : ").append(entree.getValue());
        }
        return texte.toString();
    }
}
