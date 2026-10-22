package be.ephec.java.fx.e01;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;
import javafx.scene.layout.HBox;
import javafx.stage.Stage;

/**
 * FX.1 — CORRIGE.
 *
 * Trois choses meritent l'attention.
 *
 * Le compteur est un champ de la CLASSE, pas une variable locale de
 * start. Une variable locale disparaitrait a la fin de la methode, alors
 * que la fenetre, elle, reste ouverte. C'est le premier reflexe a prendre
 * en JavaFX : ce qui doit survivre a start est un champ.
 *
 * Le comptage est dans une methode, pas dans la lambda. La lambda dit
 * QUAND, la methode dit QUOI — et la methode, elle, porte un nom.
 *
 * Le champ texte est en lecture seule. Rien dans l'enonce ne l'exige,
 * mais laisser l'utilisateur ecrire dans un compteur n'aurait pas de
 * sens : l'interface ne doit pas proposer ce qu'elle ne sait pas traiter.
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

        HBox racine = new HBox(10, affichage, ajouter);
        racine.setStyle("-fx-padding: 15;");

        stage.setScene(new Scene(racine));
        stage.setTitle("Compteur de participants");
        stage.show();
    }

    private void incrementer() {
        participants++;
        affichage.setText(String.valueOf(participants));
    }
}
