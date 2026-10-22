package be.ephec.java.demo.lam.slides;

/** Slide « La reference de methode » (LAM, section 3). */
public class Titres {

    private static final int LONGUEUR_MAX = 20;

    public static boolean estLong(String titre) {
        return titre.length() > LONGUEUR_MAX;
    }
}
