package be.ephec.java.fx.e08;

import javafx.application.Application;
import javafx.stage.Stage;

/**
 * FX.8 — A COMPLETER.
 *
 * Un champ de saisie pour un pseudo, et trois composants qui en dependent :
 *
 *   un Label qui compte les caracteres     "5 / 12 caracteres"
 *   un Label qui salue                      "Bonjour, Alice !"
 *   un Button "Valider"                     desactive si le pseudo est
 *                                           vide ou trop long
 *
 * LA CONTRAINTE : aucun Listener, aucun gestionnaire de clavier. Chaque
 * dependance s'ecrit en UNE instruction, par bind().
 *
 * Les outils, tous sur saisie.textProperty() :
 *
 *   length()                 la longueur, qui se recalcule seule
 *   isEmpty()                vrai tant que le champ est vide
 *   asString("%d ...")       un nombre observable, formate en texte
 *   greaterThan(n), or(...)  des conditions observables
 *   Bindings.concat(...)     des morceaux de texte, observables ou non
 */
public class PseudoLie extends Application {

    /** La longueur maximale d'un pseudo. Le message l'affiche aussi. */
    private static final int LONGUEUR_MAX = 12;

    // Le main est dans Lanceur, dans ce package. La raison y est
    // expliquee, et elle n'a rien d'evident : voir aussi TEC-FX.4.

    @Override
    public void start(Stage stage) {
        // TODO : un TextField, deux Label, un Button, dans une VBox.
        //
        //        Puis trois bind(), un par composant dependant. Le
        //        Button affiche aussi le pseudo retenu sur la console
        //        quand on le presse : la, un setOnAction convient.
        throw new UnsupportedOperationException("start n'est pas encore implementee");
    }
}
