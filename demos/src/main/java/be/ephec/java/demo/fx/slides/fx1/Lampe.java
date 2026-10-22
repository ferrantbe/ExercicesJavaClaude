package be.ephec.java.demo.fx.slides.fx1;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.layout.StackPane;
import javafx.stage.Stage;

/**
 * Slide « Qui appelle start ? » (FX1, section 1).
 *
 * Personne dans votre code : JavaFX cree la fenetre, puis appelle start en lui
 * passant la fenetre. Lancez LanceurLampe, pas cette classe.
 */
public class Lampe extends Application {

    @Override
    public void start(Stage fenetre) {
        Label etat = new Label("Eteinte");
        fenetre.setScene(new Scene(new StackPane(etat), 300, 150));
        fenetre.setTitle("Lampe");
        fenetre.show();
    }
}
