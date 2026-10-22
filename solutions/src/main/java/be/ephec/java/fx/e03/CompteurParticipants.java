package be.ephec.java.fx.e03;

import javafx.application.Application;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

/**
 * FX.3 — CORRIGE.
 *
 * La mise en page tient a l'imbrication des conteneurs, et a rien d'autre.
 * Aucune coordonnee, aucune position absolue : chaque conteneur place ses
 * enfants selon sa propre regle, et on compose.
 *
 * Une methode colonne() fabrique les deux colonnes. Elles sont identiques
 * a trois choses pres — le libelle, le champ, le geste — et les passer en
 * parametres evite de recopier huit lignes.
 *
 * Remarquez le type de retour : VBox, et non void. La methode FABRIQUE
 * quelque chose au lieu de modifier un etat. Voir CC-MET.7.
 */
public class CompteurParticipants extends Application {

    private final TextField affichageHommes = champ();
    private final TextField affichageFemmes = champ();

    private int hommes = 0;
    private int femmes = 0;

    // Le main est dans Lanceur, dans ce package. La raison y est
    // expliquee, et elle n'a rien d'evident : voir aussi TEC-FX.4.

    @Override
    public void start(Stage stage) {
        HBox colonnes = new HBox(20,
                colonne("hommes", affichageHommes, this::incrementerHommes),
                colonne("femmes", affichageFemmes, this::incrementerFemmes));

        Button reinitialiser = new Button("Reset");
        reinitialiser.setOnAction(evenement -> remettreAZero());

        VBox racine = new VBox(15, colonnes, reinitialiser);
        racine.setAlignment(Pos.CENTER);
        racine.setStyle("-fx-padding: 15;");

        rafraichir();

        stage.setScene(new Scene(racine));
        stage.setTitle("Compteur de participants");
        stage.show();
    }

    /** Un libelle, un champ, un bouton — empiles. */
    private VBox colonne(String libelle, TextField affichage, Runnable geste) {
        Button ajouter = new Button("+1");
        ajouter.setOnAction(evenement -> geste.run());

        VBox colonne = new VBox(6, new Label(libelle), affichage, ajouter);
        colonne.setAlignment(Pos.CENTER);
        return colonne;
    }

    private static TextField champ() {
        TextField champ = new TextField("0");
        champ.setEditable(false);
        champ.setPrefWidth(70);
        champ.setAlignment(Pos.CENTER);
        return champ;
    }

    private void incrementerHommes() {
        hommes++;
        rafraichir();
    }

    private void incrementerFemmes() {
        femmes++;
        rafraichir();
    }

    private void remettreAZero() {
        hommes = 0;
        femmes = 0;
        rafraichir();
    }

    private void rafraichir() {
        affichageHommes.setText(String.valueOf(hommes));
        affichageFemmes.setText(String.valueOf(femmes));
    }
}
