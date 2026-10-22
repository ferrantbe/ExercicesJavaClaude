package be.ephec.java.fx.e06;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

/**
 * FX.6 — CORRIGE.
 *
 * La propriete cherchee est textProperty(). On la reconnait a deux
 * signes : son nom finit par Property, et elle retourne un OBJET — ici une
 * StringProperty — et non la valeur elle-meme.
 *
 * La difference avec tout ce qui precede :
 *
 *   un EVENEMENT dit qu'il s'est passe quelque chose. Un clic, une
 *   frappe. Il n'a pas de valeur « avant » ni « apres ».
 *
 *   un CHANGEMENT DE PROPRIETE dit qu'une valeur est passee de ceci a
 *   cela. Le Listener recoit les deux.
 *
 * C'est pourquoi le ChangeListener prend trois arguments : la propriete
 * observee, l'ancienne valeur, la nouvelle. On ignore souvent le premier,
 * et parfois le deuxieme — mais il faut les declarer.
 *
 * Notez enfin que personne n'a branche quoi que ce soit sur le clavier.
 * La propriete change quelle que soit la cause : frappe, coller, ou
 * modification par le programme. C'est plus robuste qu'un gestionnaire de
 * touches, qui aurait rate le coller.
 */
public class EcouteDuChamp extends Application {

    // Le main est dans Lanceur, dans ce package. La raison y est
    // expliquee, et elle n'a rien d'evident : voir aussi TEC-FX.4.

    @Override
    public void start(Stage stage) {
        TextField saisie = new TextField();
        saisie.setPromptText("Tapez quelque chose");

        Label echo = new Label("(rien pour l'instant)");

        saisie.textProperty().addListener((propriete, ancienne, nouvelle) -> {
            System.out.println("« " + ancienne + " »  ->  « " + nouvelle + " »");
            echo.setText(nouvelle.isEmpty() ? "(vide)" : nouvelle);
        });

        VBox racine = new VBox(12, saisie, echo);
        racine.setStyle("-fx-padding: 15;");

        stage.setScene(new Scene(racine, 320, 130));
        stage.setTitle("Ecouter une propriete");
        stage.show();
    }
}
