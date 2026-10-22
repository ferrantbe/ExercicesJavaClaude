package be.ephec.java.demo.lam.slides;

import java.util.function.Predicate;

/** Slide « Vous passez deja des comportements » (LAM, section 1). */
public class TitreLong implements Predicate<String> {

    private static final int LONGUEUR_MAX = 20;

    @Override
    public boolean test(String titre) {
        return titre.length() > LONGUEUR_MAX;    // la seule ligne utile
    }
}
