package be.ephec.java.lam.e03;

import java.util.function.IntPredicate;

/**
 * LAM.3 — A COMPLETER.
 *
 * Meme exercice qu'en LAM.2, avec deux differences.
 *
 * 1. On n'ecrit plus sa propre interface : le JDK en fournit une famille dans
 *    java.util.function. IntPredicate declare exactement  boolean test(int).
 *    Votre Filtrage etait un doublon — sauf qu'a l'ecrire, vous avez compris
 *    ce qu'est une interface fonctionnelle.
 *
 * 2. Les criteres deviennent des METHODES nommees, passees par reference.
 */
public class Affichage {

    /** Comme en LAM.2, mais avec l'interface du JDK. */
    public static String selectionner(int[] tableau, IntPredicate filtre) {
        throw new UnsupportedOperationException("selectionner n'est pas encore implementee");
    }

    // TODO : ecrivez trois methodes statiques, chacune sur une ligne :
    //          estPositif(int)  estNegatif(int)  estPair(int)
    //        Elles ont la signature qu'attend IntPredicate.

    public static boolean estPositif(int valeur) {
        throw new UnsupportedOperationException("estPositif n'est pas encore implementee");
    }

    public static boolean estNegatif(int valeur) {
        throw new UnsupportedOperationException("estNegatif n'est pas encore implementee");
    }

    public static boolean estPair(int valeur) {
        throw new UnsupportedOperationException("estPair n'est pas encore implementee");
    }

    /**
     * Retourne le rapport complet, dans ce format exact — trois lignes, sans
     * retour a la ligne final :
     *
     *     Les positifs: 1 4 5 2
     *     Les negatifs: -9 -7 -3
     *     Les pairs: 4 2
     *
     * Passez les trois criteres par REFERENCE DE METHODE, pas par lambda :
     *
     *     Affichage::estPositif      au lieu de   e -> e > 0
     *
     * Les deux ecritures sont equivalentes ; la seconde donne un nom au
     * critere, ce qui le rend reutilisable et testable separement.
     */
    public static String rapport(int[] tableau) {
        throw new UnsupportedOperationException("rapport n'est pas encore implementee");
    }
}
