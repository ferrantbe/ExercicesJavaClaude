package be.ephec.java.rec.e01;

/**
 * REC.1 — Corrige.
 *
 * Une exception controlee : elle herite d'Exception, et le compilateur
 * oblige donc l'appelant a la traiter ou a la declarer. Le constructeur ne
 * fait que transmettre le message, qu'Exception sait deja retenir.
 */
public class HeureInvalideException extends Exception {

    public HeureInvalideException(String message) {
        super(message);
    }
}
