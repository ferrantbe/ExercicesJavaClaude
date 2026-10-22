package be.ephec.java.lam.e02;

/**
 * LAM.2 — A COMPLETER.
 *
 * Votre propre interface fonctionnelle : une seule methode abstraite, qui
 * repond oui ou non a propos d'un entier.
 */
@FunctionalInterface
public interface Filtrage {

    // TODO : declarez la methode  boolean test(int valeur)
    //        Une seule signature, un point-virgule, rien d'autre.
    boolean test(int valeur);
}
