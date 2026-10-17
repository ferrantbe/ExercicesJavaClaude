package be.ephec.java.fx.e04;

import javafx.application.Application;
import javafx.scene.input.KeyEvent;
import javafx.stage.Stage;

/**
 * FX.4 — A COMPLETER.
 *
 * Cliquer sur les boutons n'est pas pratique quand on compte des gens qui
 * defilent. Faites en sorte que le clavier fasse le travail :
 *
 *     1   incremente le premier compteur
 *     2   incremente le second
 *     0   remet les deux a zero
 *
 * Les boutons continuent de fonctionner : on ajoute une facon de faire,
 * on n'en retire pas.
 *
 * LE POINT DELICAT. Un evenement clavier ne se pose pas sur un bouton :
 * il n'appartient a aucun composant en particulier. Posez-le sur la
 * racine ou sur la scene.
 *
 *     racine.addEventHandler(KeyEvent.KEY_TYPED, evenement -> ...);
 *
 * KEY_TYPED retourne le CARACTERE frappe, par getCharacter(). C'est une
 * String, pas un char.
 */
public class CompteurParticipants extends Application {

    // TODO : les memes champs qu'en FX.3

    // Le main est dans Lanceur, dans ce package. La raison y est
    // expliquee, et elle n'a rien d'evident : voir aussi TEC-FX.4.

    @Override
    public void start(Stage stage) {
        // TODO : reprenez FX.3, et ajoutez le gestionnaire clavier.
        throw new UnsupportedOperationException("start n'est pas encore implementee");
    }

    /**
     * Recoit chaque frappe et decide quoi en faire.
     *
     * Une touche qui ne correspond a rien ne doit RIEN provoquer — pas
     * une exception, pas un message. L'utilisateur a le droit de se
     * tromper de touche.
     */
    private void toucheFrappee(KeyEvent evenement) {
        throw new UnsupportedOperationException("toucheFrappee n'est pas encore implementee");
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
