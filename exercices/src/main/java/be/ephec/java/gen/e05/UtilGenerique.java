package be.ephec.java.gen.e05;

/**
 * GEN.5 — A COMPLETER.
 *
 * Jusqu'ici le parametre de type appartenait a la CLASSE. Il peut aussi
 * appartenir a une seule METHODE : il se declare alors juste avant le type de
 * retour.
 *
 *     public static <T> void afficher(T objet) { ... }
 *
 * Cette classe n'est pas generique ; sa methode l'est.
 */
public class UtilGenerique {

    /**
     * Rend le toString de l'objet, a l'envers — d'ou le nom incongru.
     *
     *     otGnirts("Java")   ->  "avaJ"
     *     otGnirts(1234)     ->  "4321"
     *
     * Indice : StringBuilder possede une methode reverse().
     */
    public static <T> String otGnirts(T objet) {
        throw new UnsupportedOperationException("otGnirts n'est pas encore implementee");
    }
}
