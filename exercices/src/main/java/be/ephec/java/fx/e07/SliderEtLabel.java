package be.ephec.java.fx.e07;

import javafx.application.Application;
import javafx.stage.Stage;

/**
 * FX.7 — A COMPLETER.
 *
 * Un Slider et un Label qui affiche sa valeur, mis a jour pendant qu'on
 * fait glisser le curseur.
 *
 * Le Slider expose une valueProperty. Ajoutez-lui un ChangeListener.
 *
 * DEUX PIEGES ANNONCES.
 *
 *   Le Listener recoit un Number, pas un double. Convertissez par
 *   nouvelleValeur.doubleValue().
 *
 *   Un double brut s'affiche avec quinze decimales. Formatez :
 *   String.format("%1$,.2f", valeur).
 *
 * Le second piege revient a chaque exercice depuis TAB.1 : le format
 *  depend de la locale de la machine. Sur une machine belge, %,.2f met
 * une virgule decimale ; sur une machine anglaise, un point. Ici c'est
 * voulu — l'utilisateur lit dans sa langue.
 */
public class SliderEtLabel extends Application {

    // Le main est dans Lanceur, dans ce package. La raison y est
    // expliquee, et elle n'a rien d'evident : voir aussi TEC-FX.4.

    @Override
    public void start(Stage stage) {
        // TODO : un Slider de 0 a 100, un Label, et l'ecoute de la valeur.
        //
        //        Donnez au Slider une valeur initiale, et faites afficher
        //        cette valeur au Label DES L'OUVERTURE — un Listener ne
        //        se declenche qu'au premier changement, pas a la creation.
        throw new UnsupportedOperationException("start n'est pas encore implementee");
    }
}
