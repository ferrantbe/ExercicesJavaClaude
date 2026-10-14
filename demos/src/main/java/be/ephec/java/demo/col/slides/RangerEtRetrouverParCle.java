package be.ephec.java.demo.col.slides;

import java.util.Map;
import java.util.TreeMap;

/**
 * Slides « Ranger et retrouver par cle », « Une cle absente » et « Trois
 * facons de parcourir une table » (COL, section 4).
 *
 * Le programme utilise une TreeMap pour un affichage trie, donc stable ; une
 * HashMap se comporte de meme, mais dans un ordre imprevisible.
 */
public class RangerEtRetrouverParCle {

    public static void main(String[] args) {
        Map<String, Integer> pages = new TreeMap<>();
        pages.put("Germinal", 591);
        pages.put("Candide", 160);

        System.out.println(pages.get("Candide"));          // 160
        System.out.println(pages.containsKey("Nana"));     // false
        System.out.println(pages.size());                  // 2

        Integer inconnu = pages.get("Nana");           // null
        int nombre = pages.getOrDefault("Nana", 0);    // 0
        System.out.println(inconnu + " et " + nombre);
        try {
            int plantage = pages.get("Nana");          // NullPointerException
        } catch (NullPointerException e) {
            System.out.println("NullPointerException : null ne devient pas un int");
        }

        for (String titre : pages.keySet()) {
            System.out.println("cle : " + titre);
        }
        for (int n : pages.values()) {
            System.out.println("valeur : " + n);
        }
        for (Map.Entry<String, Integer> entree : pages.entrySet()) {
            System.out.println(entree.getKey() + " : " + entree.getValue());
        }
    }

    /* Sortie attendue :
    160
    false
    2
    null et 0
    NullPointerException : null ne devient pas un int
    cle : Candide
    cle : Germinal
    valeur : 160
    valeur : 591
    Candide : 160
    Germinal : 591
    */
}
