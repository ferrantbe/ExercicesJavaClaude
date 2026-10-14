package be.ephec.java.demo.fx.slides.fx1;

import javafx.application.Application;

/**
 * Slide « La classe a lancer s'appelle Lanceur » (FX1, section 1).
 *
 * C'est elle qu'on lance. Une classe de lancement qui n'herite de rien evite
 * le refus de demarrer faute de trouver JavaFX : voir TEC-FX.4.
 */
public class LanceurLampe {

    public static void main(String[] args) {
        Application.launch(Lampe.class, args);
    }
}
