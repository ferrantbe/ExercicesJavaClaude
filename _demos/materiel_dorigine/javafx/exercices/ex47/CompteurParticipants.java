package be.ephec.javafx_exercices.ex47;

import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

public class CompteurParticipants extends Application {

    TextField textField;
    int value = 0;
    Button button;

    public static void main(String[] args) {
        Application.launch(args);
    }

    @Override
    public void start(Stage stage) {

        textField = new TextField("0");
        textField.setStyle("-fx-font-size:32");
        textField.setAlignment(Pos.CENTER);
        textField.setPrefColumnCount(5);

        button = new Button("+ 1");
        button.setStyle("-fx-font-size:32");
        button.addEventHandler(ActionEvent.ACTION, e -> incrementValue());

        VBox root = new VBox();
        root.setMinHeight(100);
        root.setMinWidth(320);
        root.setSpacing(20);
        root.setAlignment(Pos.CENTER);

        root.getChildren().addAll(textField, button);

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

    private void incrementValue() {
        value += 1;
        textField.setText("" + value);
    }
}
