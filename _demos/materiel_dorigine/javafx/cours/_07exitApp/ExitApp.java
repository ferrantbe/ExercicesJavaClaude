package _07exitApp;

import javafx.application.Application;
import javafx.event.Event;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;
import javafx.stage.WindowEvent;

public class ExitApp extends Application {
    private Stage primaryStage;

    public static void main(String[] args) {
        launch(args);
    }

    @Override
    public void start(Stage primaryStage) {
        this.primaryStage = primaryStage;

        Button btn = new Button("Quitter");
        btn.setOnAction(e -> quitter(e));
        this.primaryStage.addEventHandler(WindowEvent.WINDOW_CLOSE_REQUEST, e -> quitter(e));
        this.primaryStage.setOnCloseRequest(e -> quitter(e));

        VBox root = new VBox();
        root.setAlignment(Pos.CENTER);
        root.setSpacing(20);
        root.getChildren().addAll(btn);
        Scene scene = new Scene(root, 400, 400);
        primaryStage.setScene(scene);
        primaryStage.show();

    }

    private void quitter(Event e) {
        boolean ilFautQuitter = false;
        ilFautQuitter = ConfirmationBox.show(
                "Voulez-vous quiter l'application?", "Confirmation",
                "Oui", "Non");
        if (ilFautQuitter) {
            // fermer les fichiers, enregistrer,...
            System.out.println("L'application se ferme proprement...");
            primaryStage.close();
        } else
            e.consume();
    }
}
