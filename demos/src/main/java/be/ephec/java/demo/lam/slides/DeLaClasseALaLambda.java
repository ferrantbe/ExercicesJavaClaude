package be.ephec.java.demo.lam.slides;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

/**
 * Slides « Vous passez deja des comportements », « La classe anonyme », « La
 * lambda : ce qui reste » et « La reference de methode » (LAM).
 *
 * Quatre ecritures du meme critere, et chaque fois le meme resultat.
 */
public class DeLaClasseALaLambda {

    private static final int LONGUEUR_MAX = 20;

    static List<String> titres() {
        return new ArrayList<>(List.of("Nana", "La Fortune des Rougon et suite", "Germinal",
                "Son Excellence Eugene Rougon"));
    }

    public static void main(String[] args) {
        List<String> titres = titres();
        titres.removeIf(new TitreLong());                    // une classe
        System.out.println(titres);

        titres = titres();
        titres.removeIf(new Predicate<String>() {            // une classe anonyme
            @Override
            public boolean test(String titre) {
                return titre.length() > LONGUEUR_MAX;
            }
        });
        System.out.println(titres);

        titres = titres();
        titres.removeIf(titre -> titre.length() > LONGUEUR_MAX);   // une lambda
        System.out.println(titres);

        titres = titres();
        titres.removeIf(Titres::estLong);                    // une reference de methode
        System.out.println(titres);
    }

    /* Sortie attendue :
    [Nana, Germinal]
    [Nana, Germinal]
    [Nana, Germinal]
    [Nana, Germinal]
    */
}
