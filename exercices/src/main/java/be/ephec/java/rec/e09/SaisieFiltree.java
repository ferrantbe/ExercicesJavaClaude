package be.ephec.java.rec.e09;

import javafx.application.Application;
import javafx.stage.Stage;

/**
 * REC.9 — A COMPLETER.
 *
 * Une fenetre avec un champ de texte et deux etiquettes :
 *
 *   le champ refuse les voyelles : tapez "bonjour", il affiche "bnjr" ;
 *   une etiquette compte les caracteres du champ : "4 caractere(s)" ;
 *   une etiquette signale la derniere voyelle refusee : "Refuse : o".
 *
 * Le refus se fait par un EventFilter sur le champ, pour
 * KeyEvent.KEY_TYPED : si Filtre.estRefuse(event.getCharacter()), on
 * consomme l'evenement, et le caractere n'arrive jamais dans le champ.
 * Le compteur se met a jour sur KEY_RELEASED, par un EventHandler :
 * a ce moment, le champ contient deja le caractere accepte, et un
 * caractere refuse n'y est jamais entre.
 *
 * Aucune classe de test pour cette fenetre : le fascicule dit ce que vous
 * devez observer. La classe Filtre, elle, a la sienne.
 */
public class SaisieFiltree extends Application {

    // TODO : declarez le champ et les deux etiquettes.

    // Le main est dans Lanceur, dans ce package : voir TEC-FX.4.

    @Override
    public void start(Stage stage) {
        // TODO : creez le TextField et les deux Label, rangez-les dans un
        //        VBox, posez le filtre et le gestionnaire sur le champ,
        //        construisez la Scene, donnez un titre et montrez le Stage.
        throw new UnsupportedOperationException("start n'est pas encore implementee");
    }
}
