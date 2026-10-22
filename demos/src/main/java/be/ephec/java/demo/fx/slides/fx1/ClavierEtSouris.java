package be.ephec.java.demo.fx.slides.fx1;

import javafx.application.Application;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.CheckBox;
import javafx.scene.control.Label;
import javafx.scene.input.KeyEvent;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.StackPane;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.scene.shape.Circle;
import javafx.stage.Stage;

/**
 * Slides « Une touche, deux evenements », « La souris » et « consume() »
 * (FX1, sections 4 et 5). Lancez LanceurClavierEtSouris.
 *
 * A essayer : fleches haut et bas pour l'intensite ; double-clic sur l'ampoule
 * pour l'allumer ou l'eteindre ; cochez « Verrouiller », et le double-clic
 * n'arrive plus jusqu'a l'ampoule : le filtre du panneau consomme l'evenement
 * avant elle.
 */
public class ClavierEtSouris extends Application {

    private final Circle ampoule = new Circle(40, Color.GRAY);
    private final Label info = new Label();
    private boolean allumee;
    private int intensite = 50;
    private boolean verrouille;

    @Override
    public void start(Stage fenetre) {
        StackPane panneau = new StackPane(ampoule);
        panneau.setPrefSize(300, 160);

        CheckBox verrou = new CheckBox("Verrouiller");
        verrou.setOnAction(evenement -> verrouille = verrou.isSelected());
        verrou.setFocusTraversable(false);   // les fleches restent pour la fenetre

        VBox racine = new VBox(10, panneau, info, verrou);
        racine.setPadding(new Insets(15));
        racine.setFocusTraversable(true);    // pour recevoir les touches

        // Slide « Une touche, deux evenements »
        racine.addEventHandler(KeyEvent.KEY_PRESSED, this::toucheEnfoncee);

        // Slide « La souris »
        ampoule.addEventHandler(MouseEvent.MOUSE_CLICKED, evenement -> {
            if (evenement.getClickCount() == 2) {
                basculer();
            }
        });

        // Slide « consume() » : le filtre du panneau passe AVANT le gestionnaire de l'ampoule
        panneau.addEventFilter(MouseEvent.MOUSE_CLICKED, evenement -> {
            if (verrouille) {
                evenement.consume();
            }
        });

        afficher();
        Scene scene = new Scene(racine);
        fenetre.setScene(scene);
        fenetre.setTitle("Lampe : clavier et souris");
        fenetre.show();
        racine.requestFocus();
    }

    private void toucheEnfoncee(KeyEvent evenement) {
        switch (evenement.getCode()) {
            case UP -> augmenterIntensite();
            case DOWN -> diminuerIntensite();
            default -> { }
        }
    }

    private void augmenterIntensite() {
        intensite = Math.min(100, intensite + 10);
        afficher();
    }

    private void diminuerIntensite() {
        intensite = Math.max(0, intensite - 10);
        afficher();
    }

    private void basculer() {
        allumee = !allumee;
        afficher();
    }

    private void afficher() {
        // plus l'intensite est haute, plus le jaune est lumineux
        ampoule.setFill(allumee ? Color.hsb(50, 0.9, 0.4 + intensite / 170.0) : Color.GRAY);
        info.setText((allumee ? "Allumee" : "Eteinte") + ", intensite " + intensite);
    }
}
