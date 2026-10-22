package be.ephec.java.fx.e02;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;
import javafx.scene.layout.HBox;
import javafx.stage.Stage;

/**
 * FX.2 — CORRIGE.
 *
 * Deux boutons, deux gestionnaires, et une methode rafraichir() partagee.
 *
 * Ce partage n'est pas une coquetterie. Sans elle, la ligne qui ecrit
 * dans le champ serait ecrite deux fois — et au prochain exercice, quatre
 * fois. Le jour ou l'affichage doit changer, on n'aurait pas un endroit a
 * modifier mais quatre, dont un qu'on oublierait. Voir CC-CLS.3.
 */
public class CompteurParticipants extends Application {

    private TextField affichage;
    private int participants = 0;

    // Le main est dans Lanceur, dans ce package. La raison y est
    // expliquee, et elle n'a rien d'evident : voir aussi TEC-FX.4.

    @Override
    public void start(Stage stage) {
        affichage = new TextField("0");
        affichage.setEditable(false);
        affichage.setPrefWidth(80);

        Button ajouter = new Button("+1");
        ajouter.setOnAction(evenement -> incrementer());

        Button reinitialiser = new Button("Reset");
        reinitialiser.setOnAction(evenement -> remettreAZero());

        HBox racine = new HBox(10, affichage, ajouter, reinitialiser);
        racine.setStyle("-fx-padding: 15;");

        stage.setScene(new Scene(racine));
        stage.setTitle("Compteur de participants");
        stage.show();
    }

    private void incrementer() {
        participants++;
        rafraichir();
    }

    private void remettreAZero() {
        participants = 0;
        rafraichir();
    }

    private void rafraichir() {
        affichage.setText(String.valueOf(participants));
    }
}
