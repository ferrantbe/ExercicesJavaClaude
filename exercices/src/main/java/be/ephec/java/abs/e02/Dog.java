package be.ephec.java.abs.e02;

/** ABS.2 — A COMPLETER. Le cri attendu est "J'aboie". */
public class Dog extends Animal {

    @Override
    public String cri() {
        throw new UnsupportedOperationException("cri n'est pas encore implementee");
    }
}
