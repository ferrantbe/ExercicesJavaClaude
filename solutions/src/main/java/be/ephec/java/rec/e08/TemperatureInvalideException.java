package be.ephec.java.rec.e08;

/** REC.8 — Corrige. */
public class TemperatureInvalideException extends Exception {

    public TemperatureInvalideException(double temperature) {
        super("Temperature hors mesure : " + temperature + " (attendu : de -100 a 100)");
    }
}
