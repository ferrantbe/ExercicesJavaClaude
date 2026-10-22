package be.ephec.java.demo.gen.slides;

/** Les bagages des slides GEN, section 4 : Valise et Sac en heritent. */
public abstract class Bagage {

    private final double poids;

    protected Bagage(double poids) {
        this.poids = poids;
    }

    public double getPoids() {
        return poids;
    }
}
