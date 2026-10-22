package be.ephec.java.itf.e01;

/**
 * ITF.1 — CORRIGE.
 *
 * @Override n'est pas obligatoire, mais il vaut la peine : si vous vous
 * trompez dans la signature, le compilateur vous le dit au lieu de creer
 * silencieusement une methode qui n'implemente rien.
 */
public class Addition implements Calculateur {

    @Override
    public int calcule(int a, int b) {
        return a + b;
    }
}
