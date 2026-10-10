package be.ephec.java.itf.e03;

/** ITF.3 — CORRIGE. Fournie, inchangee. Elle rend "triangle". */
public class Triangle extends Shape {

    public Triangle(Point centre) {
        super(centre);
    }

    @Override
    public String nom() {
        return "triangle";
    }
}
