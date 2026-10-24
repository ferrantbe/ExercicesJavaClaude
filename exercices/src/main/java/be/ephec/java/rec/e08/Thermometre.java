package be.ephec.java.rec.e08;

/**
 * REC.8 — A COMPLETER, ET A TESTER VOUS-MEME.
 *
 * Un thermometre qui mesure de -100 a +100 degres Celsius, bornes
 * comprises. Il demarre a 0.
 *
 * Il n'y a pas de classe de test fournie pour cette classe : vous l'ecrivez
 * vous-meme, dans src/test/java, sous le nom ThermometreTest. La classe
 * RedactionTest controle seulement que la votre existe et a la forme
 * attendue. Le fascicule liste les cas a couvrir.
 */
public class Thermometre {

    public static final double MINIMUM = -100;
    public static final double MAXIMUM = 100;

    private double temperature;

    public double getTemperature() {
        throw new UnsupportedOperationException("getTemperature n'est pas encore implementee");
    }

    /**
     * @throws TemperatureInvalideException si la valeur n'est pas dans
     *                                      [MINIMUM, MAXIMUM] ; la
     *                                      temperature ne change alors pas
     */
    public void setTemperature(double temperature) throws TemperatureInvalideException {
        throw new UnsupportedOperationException("setTemperature n'est pas encore implementee");
    }

    /** La temperature en Fahrenheit : celsius * 9 / 5 + 32. */
    public double enFahrenheit() {
        throw new UnsupportedOperationException("enFahrenheit n'est pas encore implementee");
    }

    /** "21.5 C" : une decimale, un espace, la lettre C (pas de symbole degre : il
     * ne passe pas sur toutes les consoles). Locale.US pour le point. */
    @Override
    public String toString() {
        throw new UnsupportedOperationException("toString n'est pas encore implementee");
    }
}
