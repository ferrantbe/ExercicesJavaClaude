package be.ephec.java.itf.e03;

/** ITF.3 — CORRIGE. Fournie, inchangee. Elle retourne "cercle". */
public class Circle extends Shape {

    public Circle(Point centre) {
        super(centre);
    }

    @Override
    public String nom() {
        return "cercle";
    }
}
