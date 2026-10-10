package _20proprietes;

import javafx.beans.property.IntegerProperty;
import javafx.beans.property.SimpleIntegerProperty;
import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;

public class Main {
    public static void main(String[] args) {
        IntegerProperty valeur = new SimpleIntegerProperty(10);

        // Ajout d'un observateur, instance de la classe concrète
        valeur.addListener(new ListenerConcret<>());

        // Ajout d'un observateur, instance de classe anonyme qui implémente ChangeListener
        valeur.addListener(new ChangeListener<Number>() {
            @Override
            public void changed(ObservableValue<? extends Number> observable, Number oldValue, Number newValue) {
                System.out.println("La valeur a changé : " + newValue);
            }
        });

        // Ajout d'un observateur, sopus la forme d'une expression Lambda qui implémente Change Listener
        // (possible parce que ChangeListener est un e interface fonctionnelle, 1 méthode)
        valeur.addListener((e, o, n) -> System.out.println("Changé (Expression Lambda)"));

        // Modification de la valeur
        valeur.set(20); // Ceci déclenchera l'exécution du code de l'observateur
    }
}
