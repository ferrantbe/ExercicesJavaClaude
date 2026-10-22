package be.ephec.java.gen.e03;

/** GEN.3 — CORRIGE. Trois elements de meme type. */
public class TripletI<T> {

    private final T premier;
    private final T second;
    private final T troisieme;

    public TripletI(T premier, T second, T troisieme) {
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
