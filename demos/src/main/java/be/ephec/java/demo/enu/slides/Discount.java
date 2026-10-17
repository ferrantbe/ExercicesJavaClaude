package be.ephec.java.demo.enu.slides;

/** Slide « Une enum peut contenir des donnees » (ENU, section 5). */
public enum Discount {

    BASIC(0.05), FIDELITY(0.075), SPECIAL(0.10);

    private final double taux;

    Discount(double taux) {
        this.taux = taux;
    }

    public double appliquer(double prix) {
        return prix * (1 - taux);
    }
}
