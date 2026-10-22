package be.ephec.java.demo.fx;

import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.input.KeyEvent;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

/**
 * DEMO FX — etat final.
 *
 * Au depart, le bouton existait et ne faisait rien. Tout ce qui a ete
 * ajoute tient dans le lien entre un composant et un gestionnaire.
 *
 * Les trois ecritures ci-dessous produisent le MEME objet. Elles sont
 * montrees ensemble une fois, puis on garde la lambda.
 */
public class ClicApp extends Application {

    private Button bouton;
    private Label journal;
    private int clics = 0;

    // Le main est dans Lanceur, dans ce package. Voir TEC-FX.4.

    @Override
    public void start(Stage stage) {
        bouton = new Button("Cliquez-moi !");
        journal = new Label("Aucune touche");

        // 1. La classe anonyme : verbeuse, mais elle montre ce qu'est
        //    reellement un gestionnaire — un objet avec une methode.
        //
        // bouton.setOnAction(new EventHandler<ActionEvent>() {
        //     @Override
        //     public void handle(ActionEvent evenement) {
        //         clicBouton();
        //     }
        // });
        //
        // 2. La lambda : EventHandler est une interface fonctionnelle.
        bouton.setOnAction(e -> clicBouton());
        //
        // 3. La forme longue, qui dit explicitement quel type d'evenement
        //    on ecoute. setOnAction en est le raccourci.
        //
        // bouton.addEventHandler(ActionEvent.ACTION, e -> clicBouton());

        VBox racine = new VBox(15, bouton, journal);
        racine.setStyle("-fx-padding: 20; -fx-alignment: center;");

        Scene scene = new Scene(racine, 360, 200);

        // Un evenement clavier ne se pose pas sur le bouton mais sur la
        // scene : il n'appartient a aucun composant en particulier.
        scene.addEventHandler(KeyEvent.KEY_TYPED, e -> toucheFrappee(e));

        stage.setScene(scene);
        stage.setTitle("Le lien entre le composant et le code");
        stage.show();
    }

    private void clicBouton() {
        clics++;
        bouton.setText("Clique " + clics + " fois");
    }

    /**
     * Le gestionnaire recoit l'EVENEMENT, pas seulement le signal qu'il a
     * eu lieu. C'est ce qui permet de savoir quelle touche a ete frappee.
     */
    private void toucheFrappee(KeyEvent evenement) {
        journal.setText("Touche : " + evenement.getCharacter());
    }
}
