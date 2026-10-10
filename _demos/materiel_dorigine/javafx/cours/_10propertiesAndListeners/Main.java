package _10propertiesAndListeners;

import javafx.beans.property.DoubleProperty;
import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;

import java.sql.SQLOutput;

public class Main {

    public static void main(String[] args) {

        Facture electricBill = new Facture();

        electricBill.sommeDueProperty().addListener(new ChangeListener() {
            @Override
            public void changed(ObservableValue o, Object oldVal,
                                Object newVal) {
                System.out.println("La facture a changé!");
            }
        });
        electricBill.sommeDueProperty().addListener(
                (o, oldV, newV) -> System.out.printf("Old: %4.2f New: %4.2f\n", oldV, newV)
        );

        electricBill.setSommeDue(100.00);
        electricBill.setSommeDue(120.00);



    }
}