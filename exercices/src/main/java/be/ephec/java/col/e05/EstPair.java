package be.ephec.java.col.e05;

import java.util.function.Predicate;

/**
 * COL.5 — A COMPLETER.
 *
 * Predicate est une interface du JDK : elle declare une seule methode,
 * boolean test(T valeur), qui repond oui ou non a propos d'une valeur.
 *
 * L'implementer dans une classe nommee est la facon la plus explicite de
 * faire. Vous en verrez deux ecritures plus courtes au theme LAM.
 */
public class EstPair implements Predicate<Integer> {

    @Override
    public boolean test(Integer nombre) {
        throw new UnsupportedOperationException("test n'est pas encore implementee");
    }
}
