package be.ephec.java.col.e05;

import java.util.function.Predicate;

/**
 * COL.5 — CORRIGE.
 *
 * Une classe entiere pour une seule expression. C'est verbeux, et c'est
 * precisement ce que les deux ecritures suivantes vont raccourcir :
 *
 *     new Predicate<Integer>() {              // classe anonyme
 *         public boolean test(Integer n) { return n % 2 == 0; }
 *     }
 *
 *     n -> n % 2 == 0                          // lambda
 *
 * Les trois font exactement la meme chose. La classe nommee a un avantage
 * qu'on oublie : elle porte un nom, elle est reutilisable, et elle se teste
 * separement — ce que fait justement la classe de test.
 */
public class EstPair implements Predicate<Integer> {

    @Override
    public boolean test(Integer nombre) {
        // Le reste garde le signe du dividende en Java, mais la comparaison
        // a zero fonctionne pour les negatifs comme pour les positifs.
        return nombre % 2 == 0;
    }
}
