package be.ephec.java.exc.e03;

/** EXC.3 — CORRIGE. Levee quand la longueur ne convient pas. */
public class IbanLongueurException extends IbanInvalideException {

    public IbanLongueurException(String message) {
        super(message);
    }
}
