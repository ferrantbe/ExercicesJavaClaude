package be.ephec.java.demo.lam.slides;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.function.Predicate;

/**
 * Slides « Son type vient d'ou elle va » et « Les formes d'une lambda » (LAM,
 * section 2).
 */
public class LesFormesDUneLambda {

    private static final int LONGUEUR_MAX = 20;

    public static void main(String[] args) {
        Runnable saluer = () -> System.out.println("Bonjour");
        saluer.run();

        Comparator<String> parLongueur = (a, b) -> a.length() - b.length();
        List<String> titres = new ArrayList<>(List.of("Germinal", "Nana", "La Bete humaine"));
        titres.sort(parLongueur);
        System.out.println(titres);

        Predicate<String> estLong = titre -> {
            String sansEspaces = titre.strip();
            return sansEspaces.length() > LONGUEUR_MAX;
        };
        System.out.println(estLong.test("   Nana   "));
        System.out.println(estLong.test("Son Excellence Eugene Rougon"));
    }

    /* Sortie attendue :
    Bonjour
    [Nana, Germinal, La Bete humaine]
    false
    true
    */
}
