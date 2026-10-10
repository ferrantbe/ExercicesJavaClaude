package be.ephec.java.itf.e03;

/** ITF.3 — CORRIGE. Fournie, inchangee. Elle rend "carre". */
public class Square extends Shape {

    public Square(Point centre) {
        super(centre);
    }

    @Override
    public String nom() {
        return "carre";
    }
}
