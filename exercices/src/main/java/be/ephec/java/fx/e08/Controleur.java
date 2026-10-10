package be.ephec.java.fx.e08;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.text.Text;

/**
 * FX.8 — A COMPLETER.
 *
 * Le CONTROLEUR : il ecoute la vue, interroge le modele, et met la vue a
 * jour. Il ne calcule rien lui-meme.
 *
 * DEUX MECANISMES A COMPRENDRE.
 *
 * L'annotation @FXML sur un champ demande a JavaFX d'y injecter le
 * composant portant le meme fx:id dans le fichier de vue. Le champ est
 * null jusqu'au chargement, puis rempli tout seul.
 *
 * L'attribut onAction="#nomDeMethode" du FXML branche un bouton sur une
 * methode de cette classe. La methode doit etre annotee @FXML et
 * accepter un ActionEvent.
 *
 * Ces deux mecanismes remplacent tout ce que vous ecriviez a la main
 * dans les exercices precedents.
 */
public class Controleur {

    /** Injecte depuis le FXML : le Text portant fx:id="affichage". */
    @FXML
    private Text affichage;

    private final Modele modele = new Modele();

    // TODO : le controleur doit retenir, entre deux clics, le premier
    //        nombre saisi et l'operateur choisi. Declarez-les.

    /**
     * Appelee par TOUS les boutons de chiffres. Un seul gestionnaire pour
     * dix boutons : c'est l'evenement qui dit lequel a ete presse.
     *
     * evenement.getSource() rend le composant, qu'il faut transtyper en
     * Button pour lire son texte.
     *
     * La regle d'affichage : si l'ecran montre "0", le chiffre le
     * remplace ; sinon il s'y accole. Sans cela, taper 5 puis 6 afficherait
     * "056".
     */
    @FXML
    private void chiffrePresse(ActionEvent evenement) {
        throw new UnsupportedOperationException("chiffrePresse n'est pas encore implementee");
    }

    /**
     * Appelee par les boutons d'operateurs, y compris "=".
     *
     * La logique d'une calculatrice se resume a ceci : quand on presse un
     * operateur, on calcule d'abord ce qui etait en attente, on affiche le
     * resultat, puis on retient le nouvel operateur.
     *
     * Reflechissez au cas du PREMIER operateur presse : il n'y a rien en
     * attente. Et au cas du "=", qui ne met rien en attente.
     */
    @FXML
    private void operateurPresse(ActionEvent evenement) {
        throw new UnsupportedOperationException("operateurPresse n'est pas encore implementee");
    }

    /** Remet la calculatrice dans son etat initial. */
    @FXML
    private void effacer(ActionEvent evenement) {
        throw new UnsupportedOperationException("effacer n'est pas encore implementee");
    }
}
