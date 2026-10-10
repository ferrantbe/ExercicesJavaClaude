package be.ephec.javafx_exercices.ex51;

import javafx.application.Application;
import javafx.beans.value.ObservableValue;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.layout.GridPane;
import javafx.stage.Stage;

public class TextFieldProgram  extends Application {

    TextArea textArea;
    public static void main(String[] args) {
        Application.launch(args);
    }

    @Override
    public void start(Stage stage) {

        TextField text = new TextField();
        text.setPrefColumnCount(15);

        text.textProperty().addListener(this::changed);

        textArea = new TextArea();
        textArea.setMinHeight(100);
        textArea.setMinWidth(400);

        GridPane root = new GridPane();
        root.setHgap(10);
        root.setVgap(5);
        root.addRow(0, new Label("First Name:"), text);
        root.addRow(1, textArea);
        GridPane.setColumnSpan(textArea, 2);

        root.setStyle("-fx-padding: 10;" +
                "-fx-border-style: solid inside;" +
                "-fx-border-width: 2;" +
                "-fx-border-insets: 5;" +
                "-fx-border-radius: 5;" +
                "-fx-border-color: blue;");

        Scene scene = new Scene(root);
        stage.setScene(scene);
        stage.setTitle("TextField Listener");
        stage.show();
    }

    public void changed(ObservableValue<? extends String> prop,
                        String oldValue,
                        String newValue) {
        textArea.appendText("\nOld = " + oldValue + ", new = " + newValue);
    }
}
