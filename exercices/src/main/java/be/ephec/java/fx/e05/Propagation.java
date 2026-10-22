package be.ephec.java.fx.e05;

import javafx.application.Application;
import javafx.stage.Stage;

/**
 * FX.5 — A COMPLETER.
 *
 * Construisez l'empilement suivant, de l'exterieur vers l'interieur :
 *
 *     Stage
 *      +- Scene
 *          +- BorderPane
 *              +- StackPane
 *                  +- Rectangle
 *                  +- Circle
 *
 * Posez ensuite :
 *
 *   un EventFilter sur le BorderPane, pour MouseEvent.MOUSE_CLICKED ;
 *   deux EventHandler sur le Circle, pour le meme type d'evenement.
 *
 * Chacun affiche une ligne sur la console, de facon a ce qu'on voie
 * l'ordre dans lequel ils sont appeles.
 *
 * PREMIERE PARTIE — cliquez sur le cercle. Les trois s'affichent. Dans
 * quel ordre ? Notez-le, il n'est pas anodin.
 *
 * SECONDE PARTIE — modifiez votre code pour que les deux gestionnaires du
 * cercle ne reagissent PLUS, sans les supprimer et sans toucher au
 * cercle. Une seule ligne suffit, dans le filtre.
 */
public class Propagation extends Application {

    // Le main est dans Lanceur, dans ce package. La raison y est
    // expliquee, et elle n'a rien d'evident : voir aussi TEC-FX.4.

    @Override
    public void start(Stage stage) {
        // TODO : construisez l'empilement, posez le filtre et les deux
        //        gestionnaires.
        throw new UnsupportedOperationException("start n'est pas encore implementee");
    }
}
