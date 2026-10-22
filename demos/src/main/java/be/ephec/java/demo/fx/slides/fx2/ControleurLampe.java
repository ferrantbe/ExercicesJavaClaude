package be.ephec.java.demo.fx.slides.fx2;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Label;

/**
 * Slide « La vue et son controleur » (FX2, section 4).
 *
 * Le champ etat est rempli par le chargeur FXML, grace a fx:id="etat" dans
 * lampe.fxml ; basculer est appelee par onAction="#basculer".
 */
public class ControleurLampe {

    private final Lampe lampe = new Lampe();

    @FXML private Label etat;

    @FXML
    private void basculer(ActionEvent evenement) {
        lampe.basculer();
        etat.setText(lampe.estAllumee() ? "Allumee" : "Eteinte");
    }
}
