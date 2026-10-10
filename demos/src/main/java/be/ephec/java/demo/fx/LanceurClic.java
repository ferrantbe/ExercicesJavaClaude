package be.ephec.java.demo.fx;

import javafx.application.Application;

/**
 * DEMO FX — le point d'entree de ClicApp.
 *
 * Une classe de lancement qui n'herite de rien : sans elle, le programme
 * refuse de demarrer faute de trouver JavaFX en tant que module. Voir
 * TEC-FX.4 du memento technique.
 *
 * A montrer en demonstration : retirez-la, mettez un main dans ClicApp,
 * et lancez. Le message est deroutant, et il vaut d'etre vu une fois.
 */
public class LanceurClic {

    public static void main(String[] args) {
        Application.launch(ClicApp.class, args);
    }
}
