package be.ephec.java.enu.e02;

/**
 * ENU.2 — A COMPLETER.
 *
 * Une temperature est une grandeur unique, que l'on peut exprimer dans deux
 * unites. L'objet ne stocke donc qu'UNE valeur : l'autre se calcule.
 *
 * Formules :
 *     Celsius vers Fahrenheit :  f = c * 9 / 5 + 32     (10 C  ->   50 F)
 *     Fahrenheit vers Celsius :  c = (f - 32) * 5 / 9   (23 F  ->   -5 C)
 *
 * Attention au type des operations : 9 / 5 vaut 1 en arithmetique entiere.
 */
public class Temperature {

    // TODO : declarez de quoi retenir la temperature

    /**
     * @param valeur la temperature
     * @param unite  l'unite dans laquelle cette valeur est exprimee
     */
    public Temperature(double valeur, TemperatureUnit unite) {
        throw new UnsupportedOperationException("le constructeur n'est pas encore implemente");
    }

    /** Rend la temperature exprimee dans l'unite demandee. */
    public double getValue(TemperatureUnit unite) {
        throw new UnsupportedOperationException("getValue n'est pas encore implementee");
    }

    /** Modifie la temperature, la valeur etant donnee dans l'unite indiquee. */
    public void setValue(double valeur, TemperatureUnit unite) {
        throw new UnsupportedOperationException("setValue n'est pas encore implementee");
    }
}
