package be.ephec.java.demo.fx;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.CheckBox;
import javafx.scene.control.Label;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.scene.shape.Circle;
import javafx.stage.Stage;

/**
 * DEMO FX — etat final, seconde partie.
 *
 * Un clic sur le cercle ne concerne pas que le cercle : l'evenement
 * DESCEND d'abord de la fenetre vers lui, puis REMONTE vers elle.
 *
 *   un FILTRE (addEventFilter) intervient a la descente ;
 *   un GESTIONNAIRE (addEventHandler) intervient a la remontee.
 *
 * La case a cocher active un consume() dans le filtre du conteneur :
 * l'evenement s'arrete alors avant meme d'atteindre le cercle, et les
 * deux gestionnaires ne sont jamais appeles.
 *
 * C'est la seule facon de faire comprendre qu'un evenement voyage. Sur
 * une slide, ce n'est qu'un schema.
 */
public class PropagationApp extends Application {

    private Label journal;
    private CheckBox interrompre;

    // Le main est dans Lanceur, dans ce package. Voir TEC-FX.4.

    @Override
    public void start(Stage stage) {
        journal = new Label("Cliquez sur le cercle");
        interrompre = new CheckBox("Interrompre au niveau du conteneur");

        Circle cercle = new Circle(50, Color.CORNFLOWERBLUE);

        // Deux gestionnaires sur le MEME evenement : les deux s'executent,
        // dans l'ordre ou ils ont ete poses.
        cercle.addEventHandler(MouseEvent.MOUSE_CLICKED, e -> note("cercle, gestionnaire 1"));
        cercle.addEventHandler(MouseEvent.MOUSE_CLICKED, e -> note("cercle, gestionnaire 2"));

        BorderPane racine = new BorderPane();
        racine.setCenter(cercle);
        racine.setBottom(new VBox(10, interrompre, journal));
        racine.setStyle("-fx-padding: 20;");

        // Le filtre voit l'evenement AVANT le cercle.
        racine.addEventFilter(MouseEvent.MOUSE_CLICKED, e -> {
            note("conteneur, filtre");
            if (interrompre.isSelected()) {
                e.consume();
                note("  -> consomme : le cercle ne verra rien");
            }
        });

        stage.setScene(new Scene(racine, 420, 320));
        stage.setTitle("Un evenement voyage");
        stage.show();
    }

    private void note(String texte) {
        System.out.println(texte);
        journal.setText(texte);
    }
}
