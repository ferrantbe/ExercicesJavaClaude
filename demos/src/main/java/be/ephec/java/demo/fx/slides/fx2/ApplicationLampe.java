package be.ephec.java.demo.fx.slides.fx2;

import java.io.IOException;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.stage.Stage;

/**
 * Slide « Charger une vue » (FX2, section 4). Lancez LanceurApplicationLampe.
 *
 * La vue vit dans lampe.fxml, dans src/main/resources, au meme chemin de
 * package que cette classe : c'est la que getResource la cherche.
 */
public class ApplicationLampe extends Application {

    @Override
    public void start(Stage fenetre) throws IOException {
        FXMLLoader chargeur = new FXMLLoader(
                ApplicationLampe.class.getResource("lampe.fxml"));

        fenetre.setScene(new Scene(chargeur.load(), 300, 150));
        fenetre.setTitle("Lampe");
        fenetre.show();
    }
}
