package be.ephec.java.enu.e02;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;

/** ENU.2 — Verification automatique. */
class TemperatureTest {

    private static TemperatureUnit unite(String nom) {
        try {
            return TemperatureUnit.valueOf(nom);
        } catch (IllegalArgumentException e) {
            return fail("La constante " + nom + " n'existe pas dans TemperatureUnit.");
        }
    }

    private static final double PRECISION = 0.001;

    @Test
    @DisplayName("L'enum declare deux unites")
    void deuxUnites() {
        assertEquals(2, TemperatureUnit.values().length);
        unite("CELSIUS");
        unite("FAHRENHEIT");
    }

    @Test
    @DisplayName("Dix degres Celsius font cinquante Fahrenheit")
    void celsiusVersFahrenheit() {
        Temperature t = new Temperature(10, unite("CELSIUS"));

        assertEquals(10.0, t.getValue(unite("CELSIUS")), PRECISION);
        assertEquals(50.0, t.getValue(unite("FAHRENHEIT")), PRECISION);
    }

    @Test
    @DisplayName("Vingt-trois degres Fahrenheit font moins cinq Celsius")
    void fahrenheitVersCelsius() {
        Temperature t = new Temperature(23, unite("FAHRENHEIT"));

        assertEquals(23.0, t.getValue(unite("FAHRENHEIT")), PRECISION);
        assertEquals(-5.0, t.getValue(unite("CELSIUS")), PRECISION,
                "Si vous obtenez 0, c'est une division entiere : 5 / 9 vaut 0.");
    }

    @Test
    @DisplayName("Les reperes classiques tombent juste")
    void reperesClassiques() {
        assertEquals(32.0, new Temperature(0, unite("CELSIUS"))
                .getValue(unite("FAHRENHEIT")), PRECISION);
        assertEquals(100.0, new Temperature(212, unite("FAHRENHEIT"))
                .getValue(unite("CELSIUS")), PRECISION);
        assertEquals(-40.0, new Temperature(-40, unite("CELSIUS"))
                .getValue(unite("FAHRENHEIT")), PRECISION,
                "moins quarante est la seule temperature identique dans les deux unites");
    }

    @Test
    @DisplayName("setValue remplace la temperature, quelle que soit l'unite")
    void modification() {
        Temperature t = new Temperature(10, unite("CELSIUS"));

        t.setValue(50, unite("FAHRENHEIT"));

        assertEquals(10.0, t.getValue(unite("CELSIUS")), PRECISION);
    }
}
