package be.ephec.java.fx.e03;

import javafx.application.Application;
import javafx.stage.Stage;

/**
 * FX.3 — A COMPLETER.
 *
 * On vous demande maintenant de compter separement les hommes et les
 * femmes. Deux champs, deux boutons « +1 », un seul bouton « Reset »
 * qui remet les deux a zero, et un libelle au-dessus de chaque compteur.
 *
 * La difficulte n'est plus l'evenement, c'est la MISE EN PAGE. Un HBox
 * range ses enfants cote a cote, un VBox les empile. On les imbrique.
 *
 *     VBox
 *      +- HBox        les deux colonnes
 *      |   +- VBox    libelle + champ + bouton, pour les hommes
 *      |   +- VBox    idem pour les femmes
 *      +- Button      Reset
 */
public class CompteurParticipants extends Application {

    // TODO : deux champs texte, deux compteurs

    // Le main est dans Lanceur, dans ce package. La raison y est
    // expliquee, et elle n'a rien d'evident : voir aussi TEC-FX.4.

    @Override
    public void start(Stage stage) {
        // TODO : construisez l'arborescence decrite ci-dessus.
        //
        //        Pour l'espacement : new VBox(10, enfant1, enfant2) donne
        //        dix pixels entre les enfants. setStyle("-fx-padding: 10;")
        //        donne une marge interieure au conteneur.
        throw new UnsupportedOperationException("start n'est pas encore implementee");
    }

    private void incrementerHommes() {
        throw new UnsupportedOperationException("incrementerHommes n'est pas encore implementee");
    }

    private void incrementerFemmes() {
        throw new UnsupportedOperationException("incrementerFemmes n'est pas encore implementee");
    }

    private void remettreAZero() {
        throw new UnsupportedOperationException("remettreAZero n'est pas encore implementee");
    }

    private void rafraichir() {
        throw new UnsupportedOperationException("rafraichir n'est pas encore implementee");
    }
}
