package be.ephec.java.fx.e02;

import javafx.application.Application;
import javafx.stage.Stage;

/**
 * FX.2 — A COMPLETER.
 *
 * Reprenez FX.1 et ajoutez un bouton « Reset » qui remet le compteur a
 * zero.
 *
 * Vous aurez donc DEUX gestionnaires, sur deux boutons differents. C'est
 * tout l'objet de l'exercice : chaque composant a le sien, et ils ne se
 * connaissent pas.
 */
public class CompteurParticipants extends Application {

    // TODO : les memes champs qu'en FX.1

    // Le main est dans Lanceur, dans ce package. La raison y est
    // expliquee, et elle n'a rien d'evident : voir aussi TEC-FX.4.

    @Override
    public void start(Stage stage) {
        // TODO : le champ, le bouton "+1", et un bouton "Reset".
        //        Chacun branche sur sa propre methode.
        throw new UnsupportedOperationException("start n'est pas encore implementee");
    }

    private void incrementer() {
        throw new UnsupportedOperationException("incrementer n'est pas encore implementee");
    }

    private void remettreAZero() {
        throw new UnsupportedOperationException("remettreAZero n'est pas encore implementee");
    }

    /**
     * Les deux methodes precedentes finissent par la meme chose : ecrire
     * le compteur dans le champ. Ecrivez-la une fois, ici.
     */
    private void rafraichir() {
        throw new UnsupportedOperationException("rafraichir n'est pas encore implementee");
    }
}
