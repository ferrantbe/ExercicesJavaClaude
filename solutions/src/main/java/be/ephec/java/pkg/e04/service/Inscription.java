package be.ephec.java.pkg.e04.service;

import be.ephec.java.pkg.e04.modele.Joueur;
import be.ephec.java.pkg.e04.modele.Partie;

/**
 * PKG.4 — CORRIGE.
 *
 * Le service depend du modele. L'inverse n'est pas vrai, et c'est ce qui
 * rend le decoupage utile : le modele peut servir a autre chose.
 */
public class Inscription {

    public Partie inscrire(String... pseudos) {
        Partie partie = new Partie();
        for (String pseudo : pseudos) {
            partie.ajouter(new Joueur(pseudo));
        }
        return partie;
    }
}
