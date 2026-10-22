package be.ephec.java.abs.e01;

/** ABS.1 — A COMPLETER. */
public class Circle extends Shape {

    public Circle(Point centre) {
        super(centre);
    }

    /**
     * TODO : cette methode est heritee de Shape, ou elle est abstraite.
     *        Une sous-classe concrete DOIT la definir — sans quoi la classe
     *        ne compile pas. Elle doit retourner "cercle".
     */
    @Override
    public String nom() {
        throw new UnsupportedOperationException("nom n'est pas encore implementee");
    }
}
