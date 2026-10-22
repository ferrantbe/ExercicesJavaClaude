package be.ephec.java.fx.e02;

import javafx.application.Application;

/**
 * FOURNIE — ne rien y ecrire, mais c'est elle qu'il faut lancer.
 *
 * C'EST CETTE CLASSE QU'IL FAUT LANCER, pas CompteurParticipants.
 *
 * Sans elle, le programme refuse de demarrer :
 *
 *     Erreur : des composants d'execution JavaFX obligatoires pour
 *     executer cette application sont manquants.
 *
 * Le lanceur du JDK examine la classe qu'on lui demande d'executer. Si
 * elle herite d'Application, il exige que JavaFX soit charge comme
 * MODULE. Maven le place sur le classpath ordinaire : les deux ne
 * s'entendent pas, et rien ne demarre.
 *
 * Cette classe n'herite de rien. Le controle ne se declenche pas, et
 * Application.launch demarre JavaFX depuis le classpath.
 *
 * L'explication complete est dans le memento technique, TEC-FX.4.
 */
public class Lanceur {

    public static void main(String[] args) {
        Application.launch(CompteurParticipants.class, args);
    }
}
