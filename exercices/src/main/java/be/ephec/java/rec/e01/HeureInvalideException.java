package be.ephec.java.rec.e01;

/**
 * REC.1 — A COMPLETER.
 *
 * Exception CONTROLEE, levee quand une heure ou un nombre de minutes sort
 * de ses bornes. Elle herite d'Exception, comme MoveException en EXC.1.
 *
 * Le message est libre, mais il doit nommer la valeur refusee : un message
 * qui ne dit pas ce qui a ete refuse n'aide personne (CC-ERR.3).
 */
public class HeureInvalideException extends Exception {

    // TODO : le constructeur qui recoit un message et le transmet a Exception.
}
