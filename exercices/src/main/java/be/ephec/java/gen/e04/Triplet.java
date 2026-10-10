package be.ephec.java.gen.e04;

/** GEN.4 — Cette classe vous est FOURNIE. */
public class Triplet<T> {

    private final T premier;
    private final T second;
    private final T troisieme;

    public Triplet(T premier, T second, T troisieme) {
        this.premier = premier;
        this.second = second;
        this.troisieme = troisieme;
    }

    public T getPremier() {
        return premier;
    }

    public T getSecond() {
        return second;
    }

    public T getTroisieme() {
        return troisieme;
    }
}
