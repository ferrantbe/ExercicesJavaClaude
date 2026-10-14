package be.ephec.java.demo.col.slides;

import java.util.HashSet;
import java.util.Set;

/**
 * Slides « Ce qu'un ensemble refuse » et « Qui decide que deux elements sont
 * egaux » (COL, section 3).
 *
 * Un record compare ses champs : deux exemplaires identiques n'en font qu'un.
 * Une classe ordinaire, sans equals ni hashCode, en garderait deux.
 */
public class CeQuUnEnsembleRefuse {

    record Exemplaire(String titre, int numero) { }

    static class ExemplaireSansEquals {
        final String titre;

        ExemplaireSansEquals(String titre) {
            this.titre = titre;
        }
    }

    public static void main(String[] args) {
        Set<String> auteurs = new HashSet<>();
        System.out.println(auteurs.add("Zola"));        // true
        System.out.println(auteurs.add("Zola"));        // false : deja present
        System.out.println(auteurs.size());             // 1
        System.out.println(auteurs.contains("Zola"));   // true

        Set<Exemplaire> rayon = new HashSet<>();
        rayon.add(new Exemplaire("Nana", 1));
        rayon.add(new Exemplaire("Nana", 1));
        System.out.println(rayon.size());               // 1

        Set<ExemplaireSansEquals> autreRayon = new HashSet<>();
        autreRayon.add(new ExemplaireSansEquals("Nana"));
        autreRayon.add(new ExemplaireSansEquals("Nana"));
        System.out.println(autreRayon.size());          // 2
    }

    /* Sortie attendue :
    true
    false
    1
    true
    1
    2
    */
}
