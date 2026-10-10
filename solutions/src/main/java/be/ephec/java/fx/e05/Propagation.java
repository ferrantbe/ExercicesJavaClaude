package be.ephec.java.fx.e05;

import javafx.application.Application;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.CheckBox;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.StackPane;
import javafx.scene.paint.Color;
import javafx.scene.shape.Circle;
import javafx.scene.shape.Rectangle;
import javafx.stage.Stage;

/**
 * FX.5 — CORRIGE.
 *
 * L'ordre observe au clic sur le cercle :
 *
 *     BorderPane  - filtre
 *     Circle      - gestionnaire 1
 *     Circle      - gestionnaire 2
 *
 * Il s'explique par le trajet de l'evenement, qui se fait en deux temps.
 *
 *   LA DESCENTE, de la fenetre vers le composant vise. Les FILTRES sont
 *   appeles a ce moment-la, du plus exterieur au plus interieur.
 *
 *   LA REMONTEE, du composant vise vers la fenetre. Les GESTIONNAIRES
 *   sont appeles a ce moment-la, du plus interieur au plus exterieur.
 *
 * Voila pourquoi le filtre du conteneur passe AVANT les gestionnaires du
 * cercle, alors qu'il est plus loin de l'endroit clique.
 *
 * Deux gestionnaires sur le meme evenement s'executent tous les deux,
 * dans l'ordre ou ils ont ete poses. Ce n'est pas « le dernier gagne ».
 *
 * LA SECONDE PARTIE tient a une ligne : consume() dans le filtre. Elle
 * declare l'evenement traite, et arrete son voyage. Le cercle ne le voit
 * jamais, ses deux gestionnaires ne sont pas appeles.
 *
 * A quoi cela sert-il en vrai : empecher une saisie, rendre une zone
 * inerte, ou faire qu'un panneau modal bloque tout clic derriere lui.
 */
public class Propagation extends Application {

    private CheckBox interrompre;

    // Le main est dans Lanceur, dans ce package. La raison y est
    // expliquee, et elle n'a rien d'evident : voir aussi TEC-FX.4.

    @Override
    public void start(Stage stage) {
        interrompre = new CheckBox("Interrompre dans le filtre");

        Rectangle rectangle = new Rectangle(220, 160, Color.LIGHTGOLDENRODYELLOW);
        Circle cercle = new Circle(50, Color.CORNFLOWERBLUE);

        cercle.addEventHandler(MouseEvent.MOUSE_CLICKED,
                evenement -> System.out.println("Circle     - gestionnaire 1"));
        cercle.addEventHandler(MouseEvent.MOUSE_CLICKED,
                evenement -> System.out.println("Circle     - gestionnaire 2"));

        StackPane pile = new StackPane(rectangle, cercle);

        BorderPane racine = new BorderPane();
        racine.setCenter(pile);
        racine.setBottom(interrompre);
        BorderPane.setAlignment(interrompre, Pos.CENTER);
        racine.setStyle("-fx-padding: 15;");

        racine.addEventFilter(MouseEvent.MOUSE_CLICKED, evenement -> {
            System.out.println("BorderPane - filtre");
            if (interrompre.isSelected()) {
                evenement.consume();
                System.out.println("             consomme : le cercle ne verra rien");
            }
        });

        stage.setScene(new Scene(racine));
        stage.setTitle("Propagation d'un evenement");
        stage.show();
    }
}
