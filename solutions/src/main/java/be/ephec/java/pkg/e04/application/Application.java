package be.ephec.java.pkg.e04.application;

import be.ephec.java.pkg.e04.modele.Partie;
import be.ephec.java.pkg.e04.service.Inscription;

/**
 * PKG.4 — CORRIGE.
 *
 * L'application connait le service et le modele ; personne ne la connait.
 * Les fleches de dependance vont toutes dans le meme sens :
 *
 *     application  ->  service  ->  modele
 */
public class Application {

    public static void main(String[] args) {
        Partie partie = new Inscription().inscrire("Ada", "Alan", "Grace");
        System.out.println(partie.nombreDeJoueurs() + " joueurs inscrits");
    }
}
