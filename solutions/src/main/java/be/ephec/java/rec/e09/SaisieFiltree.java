package be.ephec.java.rec.e09;

import javafx.application.Application;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.input.KeyEvent;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

/**
 * REC.9 — Corrige.
 *
 * A remarquer : le filtre CONSOMME et ne fait rien d'autre ; le
 * gestionnaire MET A JOUR et ne filtre rien. Deux lambdas, deux roles.
 * Le compteur ecoute KEY_RELEASED et non KEY_TYPED : quand la touche est
 * relachee, le champ a deja insere le caractere, et le compte est juste.
 * Sur KEY_TYPED, il aurait une frappe de retard.
 */
public class SaisieFiltree extends Application {

    private final TextField champ = new TextField();
    private final Label compteur = new Label(Filtre.libelleCompteur(""));
    private final Label refus = new Label("Refuse : -");

    @Override
    public void start(Stage stage) {
        champ.addEventFilter(KeyEvent.KEY_TYPED, event -> {
            if (Filtre.estRefuse(event.getCharacter())) {
                refus.setText("Refuse : " + event.getCharacter());
                event.consume();
            }
        });
        champ.setOnKeyReleased(event -> compteur.setText(Filtre.libelleCompteur(champ.getText())));

        VBox racine = new VBox(10, champ, compteur, refus);
        racine.setPadding(new Insets(15));

        stage.setScene(new Scene(racine, 320, 140));
        stage.setTitle("REC.9 - Saisie filtree");
        stage.show();
    }
}
