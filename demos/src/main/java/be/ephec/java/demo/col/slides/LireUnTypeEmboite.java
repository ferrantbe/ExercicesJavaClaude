package be.ephec.java.demo.col.slides;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;

/**
 * Slides « Lire un type emboite » et « Creer au premier usage » (COL,
 * section 6). computeIfAbsent cree la liste d'un auteur la premiere fois
 * seulement, puis retourne celle qui existe.
 */
public class LireUnTypeEmboite {

    public static void main(String[] args) {
        Map<String, List<String>> titresParAuteur = new TreeMap<>();

        List<String> deZola = titresParAuteur.get("Zola");    // null
        System.out.println(deZola);

        titresParAuteur.computeIfAbsent("Zola", new NouvelleListe()).add("Germinal");
        titresParAuteur.computeIfAbsent("Zola", new NouvelleListe()).add("Nana");
        titresParAuteur.computeIfAbsent("Hugo", new NouvelleListe()).add("Les Miserables");
        System.out.println(titresParAuteur);
    }

    /* Sortie attendue :
    null
    {Hugo=[Les Miserables], Zola=[Germinal, Nana]}
    */
}
