package be.ephec.javafx_exercices.ex52;

import javafx.application.Application;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.control.Slider;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

public class SliderProgram extends Application {

    Label valeur;

    public static void main(String[] args) {
        Application.launch(args);
    }

    @Override
    public void start(Stage stage) {

        valeur = new Label("-");
        HBox labelEtTexte = new HBox();
        labelEtTexte.setSpacing(10);
        labelEtTexte.setAlignment(Pos.BASELINE_LEFT);
        labelEtTexte.getChildren()
                .addAll(new Label("Valeur du Slider: "), valeur);

        Slider slider = new Slider(-100, 100, 0);
        slider.setMinWidth(400);
        slider.setShowTickMarks(true);
        slider.setShowTickLabels(true);
        slider.setMajorTickUnit(25);
        slider.valueProperty().addListener((observable, oldValue, newValue) ->
                updateLabel(newValue)
        );

        VBox root = new VBox();
        root.getChildren().addAll(labelEtTexte, slider);
        root.setSpacing(10);

        root.setStyle("-fx-padding: 10;" +
                "-fx-border-style: solid inside;" +
                "-fx-border-width: 2;" +
                "-fx-border-insets: 5;" +
                "-fx-border-radius: 5;" +
                "-fx-border-color: blue;");

        Scene scene = new Scene(root);
        stage.setScene(scene);
        stage.setTitle("Slider Listener");
        stage.show();
    }

    private void updateLabel(Number newValue) {
        valeur.textProperty().setValue(
                String.format("%1$,.2f", newValue.doubleValue()) );
    }
}

