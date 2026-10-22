package be.ephec.java.demo.fx.slides.fx1;

import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.CheckBox;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

/**
 * Slides « Le graphe de scene », « Les controles », « Un gestionnaire est un
 * objet », « setOnAction n'est qu'un raccourci » et « Ce que transporte un
 * evenement » (FX1, sections 2 et 3). Lancez LanceurInterrupteur.
 *
 * A essayer : cochez « Verrouiller » ; l'interrupteur ne repond plus, car son
 * gestionnaire a ete retire. Decochez : il repond de nouveau.
 */
public class Interrupteur extends Application {

    private final Label etat = new Label("Eteinte");
    private final Button interrupteur = new Button("Interrupteur");
    private final Label journal = new Label("Aucun bouton presse");
    private boolean allumee;

    // Slide « setOnAction n'est qu'un raccourci » : le gestionnaire, garde dans un champ
    private final EventHandler<ActionEvent> basculement =
            evenement -> basculer();

    @Override
    public void start(Stage fenetre) {
        // Slide « Les controles »
        Label consigne = new Label("Piece :");
        TextField saisie = new TextField("Bureau");
        saisie.setPromptText("ex. Cuisine");
        Button valider = new Button("Valider");
        valider.setOnAction(evenement -> {
            String piece = saisie.getText();
            fenetre.setTitle("Lampe du " + piece);
            saisie.setEditable(false);
        });

        // Slides « Un gestionnaire est un objet » et « setOnAction n'est qu'un raccourci »
        interrupteur.addEventHandler(ActionEvent.ACTION, basculement);
        CheckBox verrou = new CheckBox("Verrouiller");
        verrou.setOnAction(evenement -> {
            if (verrou.isSelected()) {
                verrouiller();
            } else {
                deverrouiller();
            }
        });

        // Slide « Ce que transporte un evenement » : un seul gestionnaire, deux boutons
        Button allumer = new Button("Allumer");
        Button eteindre = new Button("Eteindre");
        allumer.setOnAction(this::noterBouton);
        eteindre.setOnAction(this::noterBouton);

        // Slide « Le graphe de scene »
        VBox racine = new VBox(10,
                new HBox(10, consigne, saisie, valider),
                etat, interrupteur, verrou,
                new HBox(10, allumer, eteindre), journal);
        racine.setPadding(new Insets(15));
        // Un enfant peut s'ajouter apres coup
        racine.getChildren().add(new Label("Bureau"));

        fenetre.setScene(new Scene(racine, 420, 300));
        fenetre.setTitle("Lampe");
        fenetre.show();
    }

    private void basculer() {
        allumee = !allumee;
        etat.setText(allumee ? "Allumee" : "Eteinte");
    }

    private void verrouiller() {
        interrupteur.removeEventHandler(ActionEvent.ACTION, basculement);
    }

    private void deverrouiller() {
        interrupteur.addEventHandler(ActionEvent.ACTION, basculement);
    }

    private void noterBouton(ActionEvent evenement) {
        Button presse = (Button) evenement.getSource();
        journal.setText("Dernier bouton : " + presse.getText());
    }
}
