package be.ephec.java.demo.itf.slides;

/** Slide « Une classe s'engage » (ITF, section 1). */
public class Examen implements Mesurable {

    private final int points;

    public Examen(int points) {     // constructeur ajoute pour la demonstration
        this.points = points;
    }

    @Override
    public double mesure() {
        return points;
    }
}
