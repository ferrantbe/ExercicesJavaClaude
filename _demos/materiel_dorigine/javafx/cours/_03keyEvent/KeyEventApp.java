package _03keyEvent;

import javafx.application.Application;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextArea;
import javafx.scene.input.KeyEvent;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.HBox;
import javafx.stage.Stage;

public class KeyEventApp extends Application {

    public static void main(String[] args) {
        launch(args);
    }

    TextArea textArea;

    @Override
    public void start(Stage primaryStage) {
        // on crée le bouton
        Button btnReset = new Button("Remise à Zéro");
        btnReset.setOnAction(e -> textArea.setText(""));

        // btnReset.addEventHandler(ActionEvent.ACTION, (e -> System.out.println("Button!")));

        Label lbl  = new Label("Appuyez sur des touches pour déclencher des événements...");

        // le label et le bouton sont dans une HBox
        HBox hbox = new HBox();
        hbox.setAlignment(Pos.CENTER);
        hbox.getChildren().addAll(lbl, btnReset);

        // on crée le textArea
        textArea = new TextArea();
        textArea.focusTraversableProperty().setValue(false);
        textArea.setEditable(false);
        //textArea.setDisable(true);
        textArea.setStyle("-fx-text-fill : blue;");

        // on crée le layout dans lesquels seront déposés le hbox et la zone de texte
        BorderPane root = new BorderPane();
        root.setTop(hbox);
        root.setCenter(textArea);

        textArea.setOnKeyPressed(e -> keyAction(e));
        textArea.setOnKeyTyped(e -> keyAction(e));
        textArea.setOnKeyReleased(e -> keyAction(e));

        // on la scène qui sera affichée dans le primaryStage
        Scene scene = new Scene(root, 800, 600);

        // on prépare le primary stage et on l'affiche
        primaryStage.setScene(scene);
        primaryStage.setTitle("Evenements Clavier");
        primaryStage.setFullScreen(true);
        primaryStage.show();

        root.requestFocus();
    }

    public void keyAction(KeyEvent ke) {
        String oldText = textArea.getText();

        String eventType = ke.getEventType().toString();
        String text = ke.getText();
        String chr = ke.getCharacter();
        String code = ke.getCode().toString();
        String altControlMetaShift = (ke.isAltDown() ? "A" : " ") +
                                     (ke.isControlDown() ? "C" : " ") +
                                     (ke.isMetaDown() ? "M" : " ") +
                                     (ke.isShiftDown() ? "S" : " ");

        StringBuilder newText = new StringBuilder();
        newText.append("Event type:  ");  newText.append(eventType);
        newText.append("\tText: <"); newText.append(text); newText.append(">");
        newText.append("\tChar: <"); newText.append(chr); newText.append(">");
        newText.append("\tCode: <"); newText.append(code); newText.append(">");
        newText.append("\tSpecial: "); newText.append(altControlMetaShift);
        newText.append(
                ke.getEventType().equals(KeyEvent.KEY_RELEASED)
                        && altControlMetaShift.equals("    ")
                        ? "\n------------------\n" : "\n");

        this.textArea.appendText(newText.toString());
    }


}
