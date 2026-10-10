package _00clickMe;

import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.layout.StackPane;
import javafx.stage.Stage;

public class ClickMeApp extends Application {

    Button btn;

    public static void main(String[] args) {
        launch(args);
    }

    @Override
    public void start(Stage primaryStage) {
        // on crée le bouton
        btn = new Button("Cliquez-moi !");
        btn.setOnAction(e -> clickBouton());

        /*
        btn.setOnAction(new EventHandler<ActionEvent>() {
            @Override
            public void handle(ActionEvent actionEvent) {
                clickBouton();
            }
        });
        */

        // on crée le layout dans lequel sera déposé le bouton
        StackPane root = new StackPane();
        root.getChildren().add(btn);

        // on crée la scène qui sera affichée dans le primaryStage
        Scene scene = new Scene(root, 300, 200);

        // on prépare le primary stage et on l'affiche
        primaryStage.setScene(scene);
        primaryStage.setTitle("Cliquez-moi !");
        primaryStage.show();
    }

    public void clickBouton() {
        btn.setText("Vous avez cliqué !");
    }
}
