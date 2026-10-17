package be.ephec.java.exc.e01;

/**
 * EXC.1 — A COMPLETER.
 *
 * Une exception est une classe comme une autre. Pour en creer une, il suffit
 * d'heriter d'Exception — ce qui en fait une exception CONTROLEE : le
 * compilateur obligera l'appelant a la traiter ou a la declarer.
 *
 * Modele a suivre :
 *
 *     public class MonException extends Exception {
 *         public MonException(String message) {
 *             super(message);
 *         }
 *     }
 *
 * Le constructeur ne fait que transmettre le message a la classe mere, qui
 * sait deja le retenir et le retourner par getMessage().
 */
public class MoveException extends Exception {

    // TODO : ecrivez le constructeur qui recoit un message.
    //        Sans lui, la classe ne compilera pas quand vous ferez
    //        new MoveException("...").
}
