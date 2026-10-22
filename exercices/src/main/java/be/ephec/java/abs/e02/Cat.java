package be.ephec.java.abs.e02;

/** ABS.2 — A COMPLETER. Le cri attendu est "Je miaule". */
public class Cat extends Animal {

    @Override
    public String cri() {
        throw new UnsupportedOperationException("cri n'est pas encore implementee");
    }
}
