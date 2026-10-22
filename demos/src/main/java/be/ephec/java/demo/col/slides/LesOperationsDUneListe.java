package be.ephec.java.demo.col.slides;

import java.util.ArrayList;
import java.util.List;

/**
 * Slides « Ce qu'on ecrit entre chevrons », « Des objets, pas des types
 * primitifs », « Les operations d'une liste » et « Parcourir une collection »
 * (COL, sections 1 et 2).
 */
public class LesOperationsDUneListe {

    public static void main(String[] args) {
        List<String> titres = new ArrayList<>();
        titres.add("Germinal");
        // titres.add(42);                 // refuse a la compilation
        titres.add("Nana");
        titres.add(0, "Candide");          // insere en tete

        System.out.println(titres.size());              // 3
        System.out.println(titres.get(1));              // "Germinal"
        System.out.println(titres.contains("Nana"));    // true
        titres.remove("Nana");                          // retire l'element

        for (String titre : titres) {
            System.out.println(titre);
        }
        System.out.println(titres);      // [Candide, Germinal]

        List<Integer> annees = new ArrayList<>();   // List<int> : refuse
        annees.add(1885);                // int vers Integer
        int premiere = annees.get(0);    // Integer vers int
        System.out.println(premiere);
    }

    /* Sortie attendue :
    3
    Germinal
    true
    Candide
    Germinal
    [Candide, Germinal]
    1885
    */
}
