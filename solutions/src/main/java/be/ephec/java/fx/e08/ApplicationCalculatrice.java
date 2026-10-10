package be.ephec.java.fx.e08;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.stage.Stage;

/**
 * FX.8 — CORRIGE. Fournie, inchangee.
 *
 * Le point d'entree d'une application FXML tient en quatre lignes : on
 * charge le fichier de vue, on en fait une Scene, on la montre.
 *
 * Remarquez ce qu'elle NE fait PAS : elle ne cree aucun composant, ne
 * branche aucun gestionnaire. Tout cela est decrit dans le fichier FXML
 * et realise par le controleur.
 */
public class ApplicationCalculatrice extends Application {

    // Le main est dans Lanceur, dans ce package. La raison y est
    // expliquee, et elle n'a rien d'evident : voir aussi TEC-FX.4.

    @Override
    public void start(Stage stage) throws Exception {
        FXMLLoader chargeur = new FXMLLoader(
                ApplicationCalculatrice.class.getResource("calculatrice.fxml"));

        stage.setScene(new Scene(chargeur.load()));
        stage.setTitle("Calculatrice");
        stage.setResizable(false);
        stage.show();
    }
}
