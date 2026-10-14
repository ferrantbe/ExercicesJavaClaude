package be.ephec.java.demo.gen.slides;

/** La valise des slides GEN. */
public class Valise extends Bagage {

    private final String couleur;

    public Valise(String couleur) {
        super(18);
        this.couleur = couleur;
    }

    @Override
    public String toString() {
        return "valise " + couleur;
    }
}
