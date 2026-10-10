package _06sceneSwitcher;

import javafx.application.Application;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

public class SceneSwitcherApp extends Application {
    Scene scene1, scene2;
    Stage primaryStage;


    Button btn;
    int clickCount;
    Label lbl;

    public static void main(String[] args) {
        launch(args);
    }

    @Override
    public void start(Stage primaryStage) {
        this.primaryStage = primaryStage;
        // --- scene 1

        // on crée le bouton
        btn  = new Button("Cliquez-moi !");
        btn.setOnAction(e -> clickBoutonCount());

        // on crée le label
        lbl = new Label("Vous n'avez pas cliqué sur le bouton.");

        // on crée le deuxième bouton
        Button btnSwitch = new Button("Switch!");
        btnSwitch.setOnAction(e -> switchScene());


        // on crée le layout dans lesquels seront déposés le bouton et le label
        VBox root = new VBox();
        root.setAlignment(Pos.CENTER);
        root.setSpacing(20);
        root.getChildren().addAll(btn, lbl, btnSwitch);
        scene1 = new Scene(root, 400, 400);
        root.setStyle("-fx-background-color: lightblue");


        // --- scene 2
        VBox vb = new VBox();
        vb.setAlignment(Pos.CENTER);
        vb.setSpacing(20);
        scene2 = new Scene(vb, 400, 400);


        Button btnSwitch2 = new Button("Switch2!");
        btnSwitch2.setOnAction(e -> switchScene());
        Button btnClose = new Button();
        btnClose.setText("Quitter");
        btnClose.setOnAction( e -> primaryStage.close() );

        vb.getChildren().addAll(btnSwitch2, btnClose);
        vb.setStyle("-fx-background-color: lightgreen");


        primaryStage.setScene(scene1);
        primaryStage.setTitle("Scene1");
        primaryStage.show();
    }

    private void switchScene() {
        if (primaryStage.getScene().equals(scene1)){
            primaryStage.setScene(scene2);
            primaryStage.setTitle("Scene2");
    }
        else{
            primaryStage.setScene(scene1);
            primaryStage.setTitle("Scene1");
        }
    }


    public void clickBoutonCount() {
        clickCount++;
        if (clickCount == 1)
            lbl.setText("Vous avez cliqué sur le bouton.");
        else
            lbl.setText("Vous avez cliqué " + clickCount + " fois sur le bouton.");
    }

}
