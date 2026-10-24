package be.ephec.java.rec.e08;

import java.util.Locale;

/**
 * REC.8 — Corrige.
 *
 * Les bornes sont publiques et static final : la classe de test les
 * emploie, au lieu de recopier -100 et 100 (CC-NOM.7). Si le thermometre
 * change de gamme, les tests suivent.
 */
public class Thermometre {

    public static final double MINIMUM = -100;
    public static final double MAXIMUM = 100;

    private double temperature = 0;

    public double getTemperature() {
        return temperature;
    }

    public void setTemperature(double temperature) throws TemperatureInvalideException {
        if (temperature < MINIMUM || temperature > MAXIMUM) {
            throw new TemperatureInvalideException(temperature);
        }
        this.temperature = temperature;
    }

    public double enFahrenheit() {
        return temperature * 9 / 5 + 32;
    }

    @Override
    public String toString() {
        return String.format(Locale.US, "%.1f C", temperature);
    }
}
