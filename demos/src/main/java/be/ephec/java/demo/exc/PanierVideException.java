package be.ephec.java.demo.exc;

/**
 * DEMO EXC — une exception NON controlee.
 *
 * Elle herite de RuntimeException et non d'Exception : demander la
 * moyenne d'un panier vide est une erreur de programmation, pas un
 * evenement normal dont l'appelant devrait se preoccuper a chaque appel.
 *
 * Comparez avec EXC.1, ou MoveException herite d'Exception parce qu'un
 * deplacement refuse, lui, fait partie du deroulement normal.
 */
public class PanierVideException extends RuntimeException {

    public PanierVideException(String message) {
        super(message);
    }
}
