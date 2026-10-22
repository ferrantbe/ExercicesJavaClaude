package be.ephec.java.exc.e03;

/** EXC.3 — CORRIGE. Levee quand le pays n'est pas la Belgique. */
public class IbanPrefixeException extends IbanInvalideException {

    public IbanPrefixeException(String message) {
        super(message);
    }
}
