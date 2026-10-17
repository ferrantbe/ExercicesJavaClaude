package be.ephec.java.fx.e04;

import javafx.application.Application;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.input.KeyEvent;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

/**
 * FX.4 — CORRIGE.
 *
 * Une seule chose s'ajoute a FX.3 : le gestionnaire clavier, pose sur la
 * RACINE et non sur un composant.
 *
 * Pourquoi la racine. Un evenement clavier va au composant qui a le focus.
 * Ici, rien n'a le focus de facon fiable : le champ est en lecture seule,
 * et le focus saute d'un bouton a l'autre au gre des clics. En posant le
 * gestionnaire sur la racine, on le place sur le chemin de remontee de
 * l'evenement — il le verra quel que soit le composant vise.
 *
 * C'est exactement la propagation de FX.5, utilisee sans le savoir.
 *
 * Le switch ne traite que ce qu'il connait, et son cas par defaut ne fait
 * RIEN. Une touche inconnue n'est pas une erreur : l'utilisateur a le
 * droit de frapper ce qu'il veut.
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

        racine.addEventHandler(KeyEvent.KEY_TYPED, this::toucheFrappee);

        rafraichir();

        stage.setScene(new Scene(racine));
        stage.setTitle("Compteur de participants");
        stage.show();
    }

    /**
     * KEY_TYPED retourne le caractere produit par la frappe, sous forme de
     * String. On aurait pu utiliser KEY_PRESSED et getCode(), qui retourne un
     * KeyCode : la difference compte des qu'on veut distinguer la touche
     * physique du caractere qu'elle produit.
     */
    private void toucheFrappee(KeyEvent evenement) {
        switch (evenement.getCharacter()) {
            case "1" -> incrementerHommes();
            case "2" -> incrementerFemmes();
            case "0" -> remettreAZero();
            default -> { }   // toute autre touche : rien, et c'est voulu
        }
    }

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
