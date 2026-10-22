package be.ephec.java.fx.e01;

import javafx.application.Application;
import javafx.stage.Stage;

/**
 * FX.1 — A COMPLETER.
 *
 * Une application JavaFX se declare en heritant d'Application et en
 * redefinissant start(Stage). Le main ne fait qu'appeler launch().
 *
 * Le vocabulaire, du plus grand au plus petit :
 *
 *   Stage   la fenetre, fournie par JavaFX
 *   Scene   ce que la fenetre affiche
 *   racine  le composant unique que la scene contient, en general un
 *           conteneur qui en contient d'autres
 *
 * Aucune classe de test ici : on ne teste pas une fenetre. Vous verifiez
 * en lancant, et l'enonce decrit precisement ce que vous devez observer.
 */
public class CompteurParticipants extends Application {

    // TODO : declarez les composants dont vous aurez besoin ailleurs que
    //        dans start — le champ texte, et le compteur lui-meme.

    // Le main est dans Lanceur, dans ce package. La raison y est
    // expliquee, et elle n'a rien d'evident : voir aussi TEC-FX.4.

    @Override
    public void start(Stage stage) {
        // TODO : creez un TextField initialise a "0" et un Button "+1".
        //
        //        Branchez le bouton sur une methode qui incremente le
        //        compteur et met le champ a jour.
        //
        //        Rangez les deux dans un conteneur — un HBox convient —
        //        puis construisez la Scene et montrez le Stage.
        //
        //        N'oubliez pas stage.setTitle(...) : une fenetre sans
        //        titre est une fenetre qu'on ne retrouve pas dans la
        //        barre des taches.
        throw new UnsupportedOperationException("start n'est pas encore implementee");
    }

    /**
     * Ajoute un participant et met l'affichage a jour.
     *
     * Ecrivez le comptage ICI plutot que dans la lambda du bouton : la
     * lambda dit QUAND, la methode dit QUOI. Voir CC-MET.2.
     */
    private void incrementer() {
        throw new UnsupportedOperationException("incrementer n'est pas encore implementee");
    }
}
