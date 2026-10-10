package _02event;

import javafx.application.Application;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

import java.time.LocalTime;

public class EventApp extends Application {

    public static void main(String[] args) {
        launch(args);
    }

    Button btn;
    int clickCount, mouseCount, keyCount;
    Label lblClick, lblKey, lblMouse, lblClickRoot;

    @Override
    public void start(Stage primaryStage) {
        // on crée le bouton
        btn  = new Button("Cliquez-moi !");

        // on crée les labels
        lblClick = new Label("Vous n'avez pas cliqué sur le bouton.");
        lblKey = new Label("Vous n'avez pas enfoncé de touches.");
        lblMouse = new Label("Vous n'avez pas utilisé la souris.");
        lblClickRoot = new Label("---");

        // on crée le layout dans lesquels seront déposés le bouton et le label
        VBox root = new VBox();
        root.getChildren().addAll(btn, lblClick, lblKey, lblMouse, lblClickRoot);

        // ajout des EventHandlers
        btn.setOnAction(e -> clickBouton());
        root.setOnKeyPressed(e -> keyPressed());
        lblMouse.setOnMouseClicked(e -> mouseEvent(e));

        root.setOnMouseClicked(e -> clickRoot());

        root.setAlignment(Pos.CENTER);
        root.setSpacing(20);

        // on la scène sui sera affichée dans le primaryStage
        Scene scene = new Scene(root, 300, 200);

        // on prépare le primary stage et on l'affiche
        primaryStage.setScene(scene);
        primaryStage.setTitle("Compteur d'événements");
        primaryStage.show();

    }

    private void clickRoot() {
        LocalTime lt = LocalTime.now();
        lblClickRoot.setText("On a cliqué sur le Root à " + lt.toString());
    }

    public void clickBouton() {
        clickCount++;
        if (clickCount == 1)
            lblClick.setText("Vous avez cliqué sur le bouton.");
        else
            lblClick.setText("Vous avez cliqué " + clickCount + " fois sur le bouton.");
    }

    public void keyPressed() {
        keyCount++;
        lblKey.setText("Vous avez enfoncé " + keyCount + " touches.");
    }

    public void mouseEvent(MouseEvent e) {
        System.out.println(e.getEventType());
        mouseCount++;
        lblMouse.setText("Vous avez utilisé " + mouseCount + " fois la souris.");
    }
}
