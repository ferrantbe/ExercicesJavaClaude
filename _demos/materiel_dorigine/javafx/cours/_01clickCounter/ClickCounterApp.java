package _01clickCounter;

import javafx.application.Application;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.VBox;
import javafx.stage.Modality;
import javafx.stage.Stage;

public class ClickCounterApp extends Application {

    Button btn;
    int clickCount;
    Label lbl;

    public static void main(String[] args) {
        launch(args);
    }

    @Override
    public void start(Stage primaryStage) {
        // on crée le bouton
        btn = new Button("Cliquez-moi !");
        btn.setOnAction(e -> clickBouton());


        // on crée le label
        lbl = new Label("Vous n'avez pas cliqué sur le bouton.");

        // on crée le layout dans lesquels seront déposés le bouton et le label
        VBox root = new VBox();
        root.setAlignment(Pos.CENTER);
        root.setSpacing(20);
        root.getChildren().addAll(btn, lbl);

        // on la scène qui sera affichée dans le primaryStage
        Scene scene = new Scene(root, 300, 200);
        // on prépare le primary stage et on l'affiche
        primaryStage.setScene(scene);
        primaryStage.setTitle("Compteur de clicks");
        primaryStage.show();
    }

    public void clickBouton() {
        clickCount++;
        if (clickCount == 1)
            lbl.setText("Vous avez cliqué sur le bouton.");
        else
            lbl.setText("Vous avez cliqué " + clickCount + " fois sur le bouton.");
    }
}
