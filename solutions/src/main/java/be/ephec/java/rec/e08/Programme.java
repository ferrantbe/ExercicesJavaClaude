package be.ephec.java.rec.e08;

/** REC.8 — Corrige. */
public class Programme {

    public static void main(String[] args) {
        Thermometre thermometre = new Thermometre();
        try {
            thermometre.setTemperature(21.5);
            System.out.println(thermometre + " = " + thermometre.enFahrenheit() + " F");
            thermometre.setTemperature(150);
        } catch (TemperatureInvalideException e) {
            System.out.println("Refuse : " + e.getMessage());
        }
        System.out.println("Toujours " + thermometre);
    }
}
