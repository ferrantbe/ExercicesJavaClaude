package be.ephec.java.demo.itf.slides;

/** Slide « Une classe s'engage » (ITF, section 1). */
public class Colis implements Mesurable {

    private final double grammes;

    public Colis(double grammes) {   // constructeur ajoute pour la demonstration
        this.grammes = grammes;
    }

    @Override
    public double mesure() {
        return grammes;
    }

    public String destinataire() {   // propre a Colis : Mesurable ne la connait pas
        return "Ada";
    }
}
