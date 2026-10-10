package _20proprietes;

import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;

public class ListenerConcret<Number> implements ChangeListener<Number> {
    @Override
    public void changed(ObservableValue<? extends Number> observableValue,
                        Number oldValue, Number newValue) {
        System.out.println("La valeur a changé... (classe concrète)");
        
    }
}
