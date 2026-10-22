package be.ephec.java.demo.fx.slides.fx2;

import javafx.beans.property.IntegerProperty;
import javafx.beans.property.SimpleIntegerProperty;
import javafx.beans.property.SimpleStringProperty;
import javafx.beans.property.StringProperty;

/**
 * Slides « Une propriete est un objet », « S'abonner a un changement » et
 * « Une dependance declaree » (FX2, sections 1 et 2).
 *
 * Les proprietes ne demandent aucune fenetre : ce programme tourne en
 * console. Lancez-le directement, sans Lanceur.
 */
public class ProprietesEnConsole {

    private final IntegerProperty intensite = new SimpleIntegerProperty(50);

    public int getIntensite() { return intensite.get(); }

    public void setIntensite(int valeur) { intensite.set(valeur); }

    public IntegerProperty intensiteProperty() { return intensite; }

    public static void main(String[] args) {
        ProprietesEnConsole lampe = new ProprietesEnConsole();

        lampe.intensiteProperty().addListener((propriete, ancienne, nouvelle) ->
                System.out.println(ancienne + " -> " + nouvelle));

        lampe.setIntensite(80);   // affiche 50 -> 80
        lampe.setIntensite(80);   // n'affiche rien : la valeur n'a pas change

        // un texte lie a l'intensite, comme le serait celui d'un Label
        StringProperty affichage = new SimpleStringProperty();
        affichage.bind(lampe.intensiteProperty().asString());
        lampe.setIntensite(30);
        System.out.println("Affichage : " + affichage.get());   // 30, sans autre ligne
    }

    /* Sortie attendue (non verifiee ici, faute de JavaFX) :
    50 -> 80
    80 -> 30
    Affichage : 30
    */
}
