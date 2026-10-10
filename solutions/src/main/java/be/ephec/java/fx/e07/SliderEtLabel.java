package be.ephec.java.fx.e07;

import javafx.application.Application;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.control.Slider;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

/**
 * FX.7 — CORRIGE.
 *
 * Trois points a retenir.
 *
 * LE LISTENER RECOIT UN Number, pas un double. La raison est que
 * valueProperty() est une DoubleProperty, mais que l'interface
 * ChangeListener est generique et travaille sur des objets — un double
 * primitif n'en est pas un. D'ou le doubleValue().
 *
 * LE FORMATAGE. Un double brut s'affiche avec toutes ses decimales.
 * String.format("%1$,.2f", valeur) en garde deux.
 *
 * Contrairement a tous les exercices precedents, on ne force PAS
 * Locale.US ici. Ailleurs, le format devait etre previsible pour qu'un
 * test le verifie ; ici, c'est un humain qui lit, et il lit dans sa
 * langue. Le meme reflexe donnerait la mauvaise reponse.
 *
 * LE LISTENER NE SE DECLENCHE PAS A LA CREATION. Il ne reagit qu'aux
 * CHANGEMENTS. Sans l'appel a afficher() avant l'ouverture, le Label
 * resterait vide tant que l'utilisateur n'aurait pas touche au curseur.
 */
public class SliderEtLabel extends Application {

    private Label valeur;

    // Le main est dans Lanceur, dans ce package. La raison y est
    // expliquee, et elle n'a rien d'evident : voir aussi TEC-FX.4.

    @Override
    public void start(Stage stage) {
        Slider curseur = new Slider(0, 100, 25);
        curseur.setShowTickMarks(true);
        curseur.setShowTickLabels(true);
        curseur.setMajorTickUnit(25);

        valeur = new Label();

        curseur.valueProperty().addListener(
                (propriete, ancienne, nouvelle) -> afficher(nouvelle.doubleValue()));

        afficher(curseur.getValue());   // sans cette ligne, le Label est vide

        VBox racine = new VBox(12, curseur, valeur);
        racine.setAlignment(Pos.CENTER);
        racine.setStyle("-fx-padding: 20;");

        stage.setScene(new Scene(racine, 340, 140));
        stage.setTitle("Un Slider et un Label");
        stage.show();
    }

    private void afficher(double nombre) {
        valeur.setText(String.format("%1$,.2f", nombre));
    }
}
