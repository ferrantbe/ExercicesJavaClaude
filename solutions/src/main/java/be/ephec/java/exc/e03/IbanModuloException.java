package be.ephec.java.exc.e03;

/** EXC.3 — CORRIGE. Levee quand le controle de coherence echoue. */
public class IbanModuloException extends IbanInvalideException {

    public IbanModuloException(String message) {
        super(message);
    }
}
