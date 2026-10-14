package be.ephec.java.demo.lam.slides;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

/**
 * Slides « Les methodes de COL, sans classe » et « Un stream, en passant »
 * (LAM, section 3). Les classes TitreLong et NouvelleListe du module COL
 * deviennent des lambdas d'une ligne.
 */
public class LesMethodesDeCOLSansClasse {

    private static final int LONGUEUR_MAX = 20;

    public static void main(String[] args) {
        List<String> titres = new ArrayList<>(List.of("Nana", "La Fortune des Rougon et suite", "Germinal"));

        titres.forEach(titre -> System.out.println(titre));

        String longs = titres.stream()
                .filter(titre -> titre.length() > LONGUEUR_MAX)
                .map(titre -> titre.toUpperCase())
                .collect(Collectors.joining(", "));
        System.out.println("Longs : " + longs);

        titres.removeIf(titre -> titre.length() > LONGUEUR_MAX);
        System.out.println(titres);

        Map<String, List<String>> titresParAuteur = new TreeMap<>();
        titresParAuteur.computeIfAbsent("Zola", auteur -> new ArrayList<>())
                       .add("Germinal");
        System.out.println(titresParAuteur);
    }

    /* Sortie attendue :
    Nana
    La Fortune des Rougon et suite
    Germinal
    Longs : LA FORTUNE DES ROUGON ET SUITE
    [Nana, Germinal]
    {Zola=[Germinal]}
    */
}
