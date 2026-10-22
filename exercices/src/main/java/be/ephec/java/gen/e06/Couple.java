package be.ephec.java.gen.e06;

/**
 * GEN.6 — Cette classe vous est FOURNIE.
 *
 * Notez que description() et affiche() sont separees : l'une fabrique le
 * texte, l'autre l'envoie a l'ecran. C'est ce qui permet de tester la
 * premiere — et c'est la regle CC-MET.7 du memento Clean Code.
 */
public class Couple<T> {

    private final T premier;
    private final T second;

    public Couple(T premier, T second) {
        this.premier = premier;
        this.second = second;
    }

    /** Retourne "premier: 12, second: 16". */
    public String description() {
        return String.format("premier: %s, second: %s", premier, second);
    }

    public void affiche() {
        System.out.println(description());
    }

    public T getPremier() {
        return premier;
    }

    public T getSecond() {
        return second;
    }
}
