package be.ephec.javafx_exercices.ex49;

import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

public class CompteurParticipants extends Application {

    TextField textFieldH;
    TextField textFieldF;
    int valueH = 0;
    int valueF = 0;
    Button incrementH;
    Button incrementF;

    public static void main(String[] args) {
        Application.launch(args);
    }

    @Override
    public void start(Stage stage) {

        VBox hommes = new VBox();
        createHommesVBox(hommes);

        VBox femmes = new VBox();
        createFemmesVBox(femmes);

        HBox haut = new HBox();
        haut.getChildren().addAll(hommes, femmes);

        Button reset = new Button("Reset");
        reset.setStyle("-fx-font-size:32");
        reset.addEventHandler(ActionEvent.ACTION, e -> resetValues());

        VBox root = new VBox();
        root.setMinHeight(100);
        root.setMinWidth(320);
        root.setSpacing(20);
        root.setAlignment(Pos.CENTER);

        root.getChildren().addAll(haut, reset);

        root.setStyle("-fx-padding: 10;" +
                "-fx-border-style: solid inside;" +
                "-fx-border-width: 2;" +
                "-fx-border-insets: 5;" +
                "-fx-border-radius: 5;" +
                "-fx-border-color: blue;");

        Scene scene = new Scene(root);
        stage.setScene(scene);
        stage.setTitle("Compteur de participants");
        stage.show();
    }

    private void createHommesVBox(VBox vbox) {
        Label labelH = new Label("hommes");
        labelH.setStyle("-fx-font-size:32");

        textFieldH = new TextField();
        textFieldH.setStyle("-fx-font-size:32");
        textFieldH.setAlignment(Pos.CENTER);
        textFieldH.setPrefColumnCount(5);
        textFieldH.setText("0");

        incrementH = new Button("+ 1");
        incrementH.setStyle("-fx-font-size:32");
        incrementH.addEventHandler(ActionEvent.ACTION, e -> incrementValueH());

        vbox.setAlignment(Pos.CENTER);
        vbox.getChildren().addAll(labelH, textFieldH, incrementH);
    }

    private void createFemmesVBox(VBox vbox) {
        Label labelF = new Label("femmes");
        labelF.setStyle("-fx-font-size:32");

        textFieldF = new TextField();
        textFieldF.setStyle("-fx-font-size:32");
        textFieldF.setAlignment(Pos.CENTER);
        textFieldF.setPrefColumnCount(5);
        textFieldF.setText("0");

        incrementF = new Button("+ 1");
        incrementF.setStyle("-fx-font-size:32");
        incrementF.addEventHandler(ActionEvent.ACTION, e -> incrementValueF());

        vbox.setAlignment(Pos.CENTER);
        vbox.getChildren().addAll(labelF, textFieldF, incrementF);
    }

    private void resetValues() {
        valueH = 0;
        textFieldH.setText("0");

        valueF = 0;
        textFieldF.setText("0");
    }

    private void incrementValueH() {
        valueH += 1;
        textFieldH.setText("" + valueH);
    }
    private void incrementValueF() {
        valueF += 1;
        textFieldF.setText("" + valueF);
    }
}
