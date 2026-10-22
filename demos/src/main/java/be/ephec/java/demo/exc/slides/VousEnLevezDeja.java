package be.ephec.java.demo.exc.slides;

/**
 * Slide « Vous en levez deja » (EXC, section 1).
 *
 * Les squelettes des exercices levent une exception tant que la methode
 * n'est pas ecrite. Ce programme appelle une telle methode : il s'arrete
 * et affiche la trace.
 */
public class VousEnLevezDeja {

    public int etageCourant() {
        throw new UnsupportedOperationException(
                "etageCourant n'est pas encore implementee");
    }

    public static void main(String[] args) {
        System.out.println("Appel d'une methode pas encore ecrite...");
        new VousEnLevezDeja().etageCourant();
        System.out.println("Cette ligne n'est jamais affichee");
    }

    /* Sortie attendue :
    Appel d'une methode pas encore ecrite...
    Exception in thread "main" java.lang.UnsupportedOperationException: etageCourant n'est pas encore implementee
    */
}
