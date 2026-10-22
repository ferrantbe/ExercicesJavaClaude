package be.ephec.java.demo.fx.slides.fx2;

import javafx.application.Application;
import javafx.beans.property.IntegerProperty;
import javafx.beans.property.SimpleIntegerProperty;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.CheckBox;
import javafx.scene.control.Label;
import javafx.scene.control.Slider;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

/**
 * Slides « Les controles en ont aussi », « Une dependance declaree » et « Dans
 * les deux sens » (FX2, sections 1 et 2). Lancez LanceurVariateur.
 *
 * A essayer : deplacez le curseur, le libelle suit sans une ligne de code ;
 * cliquez « 75 % », le curseur se place tout seul ; cochez « Veilleuse ».
 */
public class Variateur extends Application {

    private final IntegerProperty reglage = new SimpleIntegerProperty(50);
    private final Label etat = new Label("Normale");

    @Override
    public void start(Stage fenetre) {
        // Slide « Une dependance declaree »
        Label affichage = new Label();
        affichage.textProperty().bind(reglage.asString("Intensite : %d"));

        // Slide « Dans les deux sens »
        Slider curseur = new Slider(0, 100, 50);
        curseur.valueProperty().bindBidirectional(reglage);

        Button preReglage = new Button("75 %");
        preReglage.setOnAction(evenement -> reglage.set(75));   // le curseur se place sur 75

        // Slide « Les controles en ont aussi »
        CheckBox veilleuse = new CheckBox("Veilleuse");
        veilleuse.selectedProperty().addListener(
                (propriete, avant, apres) -> passerEnVeilleuse(apres));

        VBox racine = new VBox(12, affichage, curseur, preReglage, veilleuse, etat);
        racine.setPadding(new Insets(15));
        fenetre.setScene(new Scene(racine, 320, 220));
        fenetre.setTitle("Variateur");
        fenetre.show();
    }

    private void passerEnVeilleuse(boolean active) {
        etat.setText(active ? "En veilleuse" : "Normale");
        if (active) {
            reglage.set(10);
        }
    }
}
