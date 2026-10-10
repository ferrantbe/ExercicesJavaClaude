package be.ephec.java.exc.e01;

/**
 * EXC.1 — CORRIGE.
 *
 * Une exception personnalisee tient en trois lignes. Tout le travail est deja
 * fait par Exception : retenir le message, capturer la pile d'appels, se
 * laisser attraper par un catch.
 *
 * Le choix de la classe mere n'est pas anodin :
 *
 *   extends Exception          -> exception CONTROLEE. Le compilateur oblige
 *                                 l'appelant a l'attraper ou a la declarer.
 *                                 A retenir pour les erreurs previsibles dont
 *                                 l'appelant doit se preoccuper.
 *
 *   extends RuntimeException   -> exception non controlee. Personne n'est
 *                                 oblige de rien. A retenir pour les erreurs
 *                                 de programmation, comme un argument absurde.
 *
 * Ici, un deplacement refuse est un evenement normal du programme : l'appelant
 * doit y faire face, d'ou Exception.
 */
public class MoveException extends Exception {

    public MoveException(String message) {
        super(message);
    }
}
