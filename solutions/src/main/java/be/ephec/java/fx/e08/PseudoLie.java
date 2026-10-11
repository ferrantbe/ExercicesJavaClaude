package be.ephec.java.fx.e08;

import javafx.application.Application;
import javafx.beans.binding.Bindings;
import javafx.beans.binding.BooleanBinding;
import javafx.beans.property.StringProperty;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

/**
 * FX.8 — CORRIGE.
 *
 * Trois points a retenir.
 *
 * UN BINDING DECLARE UNE DEPENDANCE, une fois pour toutes. Le Label ne
 * sait pas qu'il y a un champ de saisie ; on lui a dit que son texte EST
 * une expression calculee a partir de ce champ. JavaFX la recalcule a
 * chaque changement, quelle qu'en soit l'origine : frappe, collage, ou
 * modification par le programme.
 *
 * PAS DE VALEUR INITIALE A AFFICHER. Contrairement au Listener de FX.7,
 * un binding s'applique des qu'il est pose : le compteur affiche
 * "0 / 12 caracteres" a l'ouverture, sans ligne supplementaire.
 *
 * UNE PROPRIETE LIEE NE S'ECRIT PLUS. Appeler compteur.setText(...) apres
 * le bind leve une RuntimeException : la valeur appartient desormais a
 * l'expression. C'est la question de fin de l'enonce.
 */
public class PseudoLie extends Application {

    /** La longueur maximale d'un pseudo. Le message l'affiche aussi. */
    private static final int LONGUEUR_MAX = 12;

    private TextField saisie;

    // Le main est dans Lanceur, dans ce package. La raison y est
    // expliquee, et elle n'a rien d'evident : voir aussi TEC-FX.4.

    @Override
    public void start(Stage stage) {
        saisie = new TextField();
        saisie.setPromptText("Votre pseudo");
        Label compteur = new Label();
        Label salut = new Label();
        Button valider = new Button("Valider");

        StringProperty pseudo = saisie.textProperty();

        compteur.textProperty().bind(
                pseudo.length().asString("%d / " + LONGUEUR_MAX + " caracteres"));

        salut.textProperty().bind(Bindings.concat("Bonjour, ", pseudo, " !"));

        BooleanBinding invalide = pseudo.isEmpty()
                .or(pseudo.length().greaterThan(LONGUEUR_MAX));
        valider.disableProperty().bind(invalide);

        valider.setOnAction(evenement -> retenir());

        VBox racine = new VBox(10, saisie, compteur, salut, valider);
        racine.setAlignment(Pos.CENTER);
        racine.setStyle("-fx-padding: 20;");

        stage.setScene(new Scene(racine, 320, 180));
        stage.setTitle("Un pseudo lie");
        stage.show();
    }

    private void retenir() {
        System.out.println("Pseudo retenu : " + saisie.getText());
    }
}
