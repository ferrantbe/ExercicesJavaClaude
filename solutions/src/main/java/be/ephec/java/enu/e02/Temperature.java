package be.ephec.java.enu.e02;

/**
 * ENU.2 — CORRIGE.
 *
 * Choix de conception : l'objet retient la temperature dans UNE unite de
 * reference, le Celsius, et convertit a la demande. Stocker les deux valeurs
 * serait une redondance, avec le risque de les voir diverger.
 *
 * Le piege annonce par l'enonce : ecrire 9 / 5 donne 1, parce que ce sont deux
 * entiers. Il faut au moins un double dans l'operation — 9.0 / 5 — ou, comme
 * ici, multiplier d'abord par une valeur deja de type double.
 */
public class Temperature {

    private double celsius;

    public Temperature(double valeur, TemperatureUnit unite) {
        setValue(valeur, unite);
    }

    public double getValue(TemperatureUnit unite) {
        return unite == TemperatureUnit.CELSIUS ? celsius : celsius * 9 / 5 + 32;
    }

    public void setValue(double valeur, TemperatureUnit unite) {
        this.celsius = unite == TemperatureUnit.CELSIUS ? valeur : (valeur - 32) * 5 / 9;
    }
}
