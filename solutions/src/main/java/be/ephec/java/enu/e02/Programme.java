package be.ephec.java.enu.e02;

/** ENU.2 — CORRIGE. */
public class Programme {

    public static void main(String[] args) {
        Temperature temperature = new Temperature(10, TemperatureUnit.CELSIUS);
        afficher(temperature);

        temperature.setValue(23, TemperatureUnit.FAHRENHEIT);
        afficher(temperature);
    }

    private static void afficher(Temperature temperature) {
        System.out.printf("%.1f C  =  %.1f F%n",
                temperature.getValue(TemperatureUnit.CELSIUS),
                temperature.getValue(TemperatureUnit.FAHRENHEIT));
    }
}
