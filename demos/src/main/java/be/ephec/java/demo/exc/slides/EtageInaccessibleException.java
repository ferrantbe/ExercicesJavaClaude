package be.ephec.java.demo.exc.slides;

/**
 * Slide « Ecrire sa classe d'exception » (EXC, section 2).
 *
 * Une exception controlee : elle herite d'Exception, et le compilateur
 * oblige l'appelant a l'attraper ou a la declarer.
 */
public class EtageInaccessibleException extends Exception {

    public EtageInaccessibleException(String message) {
        super(message);
    }
}
