package be.ephec.java.abs.e01;

/**
 * ABS.1 — CORRIGE.
 *
 * Toute la classe tient en une methode : c'est le signe que la
 * factorisation dans Shape a bien ete faite.
 */
public class Circle extends Shape {

    public Circle(Point centre) {
        super(centre);
    }

    @Override
    public String nom() {
        return "cercle";
    }
}
