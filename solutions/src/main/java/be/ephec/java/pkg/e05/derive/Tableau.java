package be.ephec.java.pkg.e05.derive;

import be.ephec.java.pkg.e05.base.Capteur;

/**
 * PKG.5 — CORRIGE.
 *
 * LA REPONSE A LA QUESTION DE L'ENONCE. Cette classe est dans le meme
 * package que CapteurMoyenne, et pourtant elle ne peut PAS ecrire
 * capteur.derniereMesure :
 *
 *     derniereMesure has protected access in Capteur
 *
 * protected ne donne donc rien au package d'ARRIVEE : il donne aux
 * sous-classes, et a personne d'autre. Ce qui compte n'est pas l'endroit
 * ou l'on se trouve, c'est le lien d'heritage qu'on entretient.
 *
 * En une phrase : protected ouvre a ceux qui HERITENT, pas a ceux qui
 * VOISINENT.
 *
 * Une precision pour les curieux : une sous-classe ne peut atteindre le
 * champ protected que sur elle-meme, pas sur un autre Capteur quelconque.
 * Meme CapteurMoyenne ne pourrait pas ecrire autreCapteur.derniereMesure.
 */
public class Tableau {

    public static double sommeDesMesures(Capteur... capteurs) {
        double somme = 0;
        for (Capteur capteur : capteurs) {
            somme += capteur.lire();   // la methode publique, faute de mieux
        }
        return somme;
    }

    public static String plusEleve(Capteur... capteurs) {
        if (capteurs.length == 0) {
            return "aucun capteur";
        }
        Capteur meilleur = capteurs[0];
        for (Capteur capteur : capteurs) {
            if (capteur.lire() > meilleur.lire()) {
                meilleur = capteur;
            }
        }
        return meilleur.nom;
    }
}
