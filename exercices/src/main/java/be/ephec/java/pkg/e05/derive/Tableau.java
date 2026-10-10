package be.ephec.java.pkg.e05.derive;

import be.ephec.java.pkg.e05.base.Capteur;

/**
 * PKG.5 — A COMPLETER.
 *
 * Cette classe est dans le MEME package que CapteurMoyenne, mais elle
 * n'herite de rien : elle se contente d'utiliser des capteurs.
 *
 * Elle est la pour repondre a la question que PKG.2 laissait ouverte :
 * protected suffit-il a rendre un champ accessible depuis un autre
 * package ? Essayez d'ecrire capteur.derniereMesure ici, et comparez avec
 * ce qui se passe dans CapteurMoyenne.
 *
 * La reponse tient en une phrase, et l'enonce vous demande de l'ecrire.
 */
public class Tableau {

    /**
     * Rend la somme des mesures de tous les capteurs.
     *
     * Vous n'avez pas le droit d'atteindre derniereMesure ici. Une
     * methode publique fait l'affaire.
     */
    public static double sommeDesMesures(Capteur... capteurs) {
        throw new UnsupportedOperationException("sommeDesMesures n'est pas encore implementee");
    }

    /** Rend le nom du capteur qui affiche la plus grande mesure. */
    public static String plusEleve(Capteur... capteurs) {
        throw new UnsupportedOperationException("plusEleve n'est pas encore implementee");
    }
}
