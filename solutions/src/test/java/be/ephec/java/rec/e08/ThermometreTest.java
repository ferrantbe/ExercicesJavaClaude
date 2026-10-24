package be.ephec.java.rec.e08;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * REC.8 — Corrige : la classe de test attendue.
 *
 * A remarquer : les deux bornes sont testees du bon cote (acceptees) et
 * du mauvais (refusees, juste au-dela), et apres un refus le test relit la
 * temperature. Un test qui verifie seulement que l'exception part ne dit
 * pas si l'objet est reste coherent (CC-TST.2).
 */
class ThermometreTest {

    private static final double PRECISION = 0.001;

    @Test
    @DisplayName("Un thermometre neuf est a zero")
    void neuf() {
        assertEquals(0.0, new Thermometre().getTemperature(), PRECISION);
    }

    @Test
    @DisplayName("Une temperature ordinaire est retenue")
    void temperatureOrdinaire() throws TemperatureInvalideException {
        Thermometre thermometre = new Thermometre();

        thermometre.setTemperature(21.5);

        assertEquals(21.5, thermometre.getTemperature(), PRECISION);
    }

    @Test
    @DisplayName("Les bornes -100 et 100 sont acceptees")
    void bornesAcceptees() throws TemperatureInvalideException {
        Thermometre thermometre = new Thermometre();

        thermometre.setTemperature(Thermometre.MINIMUM);
        assertEquals(Thermometre.MINIMUM, thermometre.getTemperature(), PRECISION);

        thermometre.setTemperature(Thermometre.MAXIMUM);
        assertEquals(Thermometre.MAXIMUM, thermometre.getTemperature(), PRECISION);
    }

    @Test
    @DisplayName("Au-dela des bornes, l'exception est levee et la temperature ne change pas")
    void horsBornes() throws TemperatureInvalideException {
        Thermometre thermometre = new Thermometre();
        thermometre.setTemperature(20);

        assertThrows(TemperatureInvalideException.class,
                () -> thermometre.setTemperature(Thermometre.MAXIMUM + 0.1));
        assertThrows(TemperatureInvalideException.class,
                () -> thermometre.setTemperature(Thermometre.MINIMUM - 0.1));

        assertEquals(20.0, thermometre.getTemperature(), PRECISION);
    }

    @Test
    @DisplayName("L'exception est controlee et cite la valeur refusee")
    void exception() {
        Thermometre thermometre = new Thermometre();

        TemperatureInvalideException levee = assertThrows(TemperatureInvalideException.class,
                () -> thermometre.setTemperature(150));

        assertTrue(levee.getMessage().contains("150"));
        assertFalse(RuntimeException.class.isAssignableFrom(TemperatureInvalideException.class));
    }

    @Test
    @DisplayName("La conversion en Fahrenheit")
    void fahrenheit() throws TemperatureInvalideException {
        Thermometre thermometre = new Thermometre();

        assertEquals(32.0, thermometre.enFahrenheit(), PRECISION);
        thermometre.setTemperature(100);
        assertEquals(212.0, thermometre.enFahrenheit(), PRECISION);
        thermometre.setTemperature(-40);
        assertEquals(-40.0, thermometre.enFahrenheit(), PRECISION, "-40 est le point commun des deux echelles");
    }

    @Test
    @DisplayName("toString : une decimale, un espace, le symbole")
    void affichage() throws TemperatureInvalideException {
        Thermometre thermometre = new Thermometre();
        thermometre.setTemperature(21.5);

        assertEquals("21.5 C", thermometre.toString());
        assertEquals("0.0 C", new Thermometre().toString());
    }
}
