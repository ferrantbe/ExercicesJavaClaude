package be.ephec.java.demo.col.slides;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

/**
 * Slide « Collection et Collections » (COL, section 2).
 *
 * shuffle recoit ici un Random avec graine, pour que le melange soit le meme a
 * chaque lancement ; Collections.shuffle(titres) seul melange au hasard.
 */
public class CollectionEtCollections {

    public static void main(String[] args) {
        List<String> titres = new ArrayList<>(List.of("Nana", "Germinal", "Candide", "Nana"));

        Collections.sort(titres);             // trie la liste elle-meme
        System.out.println(titres);
        Collections.shuffle(titres, new Random(1));   // la melange
        System.out.println(titres);
        String premier = Collections.min(titres);
        int fois = Collections.frequency(titres, "Nana");
        System.out.println(premier + ", Nana " + fois + " fois");
    }

    /* Sortie attendue :
    [Candide, Germinal, Nana, Nana]
    [Nana, Candide, Germinal, Nana]
    Candide, Nana 2 fois
    */
}
