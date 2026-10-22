package be.ephec.java.demo.fic.slides;

import java.io.Serializable;

/**
 * Slide « Une etiquette, pas un contrat » (FIC, section 4) : implements
 * Serializable suffit, il n'y a rien a ecrire.
 */
public class Releve implements Serializable {

    private final String station;
    private final int temperature;

    public Releve(String station, int temperature) {
        this.station = station;
        this.temperature = temperature;
    }

    public String getStation() {
        return station;
    }

    public int getTemperature() {
        return temperature;
    }

    @Override
    public String toString() {      // ajoute pour la demonstration
        return station + " : " + temperature + " degres";
    }
}
