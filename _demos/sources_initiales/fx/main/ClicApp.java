package be.ephec.java.travail;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.layout.StackPane;
import javafx.stage.Stage;

/**
 * DEPART FX — une fenetre, un bouton, et rien.
 *
 * Tout est correct : la fenetre s'ouvre, le bouton s'enfonce quand on
 * clique. Mais il ne se passe rien, parce que personne ne lui a dit quoi
 * faire.
 *
 * C'est le seul geste de l'annee qu'un etudiant ne peut pas deviner.
 */
public class ClicApp extends Application {

    private Button bouton;

    public static void main(String[] args) {
        launch(args);
    }

    @Override
    public void start(Stage stage) {
        bouton = new Button("Cliquez-moi !");

        // TODO en direct : c'est ICI que manque le lien entre le bouton
        //                  et ce qu'il doit declencher.

        StackPane racine = new StackPane();
        racine.getChildren().add(bouton);

        stage.setScene(new Scene(racine, 300, 200));
        stage.setTitle("Cliquez-moi !");
        stage.show();
    }

    private void clicBouton() {
        bouton.setText("Vous avez clique !");
    }
}
