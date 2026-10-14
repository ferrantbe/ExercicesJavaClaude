package be.ephec.java.demo.col.slides;

import java.util.function.Predicate;

/** Slide « Ecrire le critere dans une classe » (COL, section 5). */
public class TitreLong implements Predicate<String> {

    private static final int LONGUEUR_MAX = 20;

    @Override
    public boolean test(String titre) {
        return titre.length() > LONGUEUR_MAX;
    }
}
