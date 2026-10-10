package be.ephec.java.fx.e06;

import javafx.application.Application;
import javafx.stage.Stage;

/**
 * FX.6 — A COMPLETER.
 *
 * Jusqu'ici vous reagissiez a un EVENEMENT : un clic, une touche. Vous
 * allez maintenant reagir a un CHANGEMENT DE VALEUR, ce qui n'est pas la
 * meme chose.
 *
 * LA DEMARCHE, et c'est elle le sujet de l'exercice :
 *
 *   1. ouvrez la Javadoc de TextField — Ctrl+Q sur le type, ou F1 ;
 *   2. cherchez ses PROPRIETES. Une propriete se reconnait a son
 *      accesseur : une methode qui finit par Property et qui rend un
 *      objet, non une valeur ;
 *   3. trouvez celle qui porte le texte saisi ;
 *   4. ajoutez-lui un Listener qui affiche chaque valeur successive.
 *
 * Ne cherchez pas la reponse ailleurs que dans l'editeur. C'est
 * exactement ce que la demonstration TMP vous a montre.
 */
public class EcouteDuChamp extends Application {

    // Le main est dans Lanceur, dans ce package. La raison y est
    // expliquee, et elle n'a rien d'evident : voir aussi TEC-FX.4.

    @Override
    public void start(Stage stage) {
        // TODO : un TextField, un Label pour afficher, et l'ecoute de la
        //        propriete.
        //
        //        Le Listener recoit TROIS arguments : la propriete
        //        observee, l'ancienne valeur et la nouvelle. Regardez la
        //        signature que propose la completion avant d'ecrire la
        //        lambda.
        throw new UnsupportedOperationException("start n'est pas encore implementee");
    }
}
