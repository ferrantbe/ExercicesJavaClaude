package _10propertiesAndListeners;

import javafx.beans.property.DoubleProperty;
import javafx.beans.property.SimpleDoubleProperty;

class Facture {

    // Definir une variable qui stocke la propriété
    DoubleProperty sommeDue = new SimpleDoubleProperty();

    // Le getter pour la valeur de la propriété
    public final double getSommeDue() { return sommeDue.get(); }

    // Le setter pour la valeur de la propriété
    public final void setSommeDue(double value) { sommeDue.set(value); }

    // Le getter pour la propriété elle-même
    public DoubleProperty sommeDueProperty() {return sommeDue;}
}
