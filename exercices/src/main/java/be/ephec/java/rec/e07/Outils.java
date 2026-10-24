package be.ephec.java.rec.e07;

import java.util.List;
import java.util.function.Function;
import java.util.function.Predicate;

/**
 * REC.7 — A COMPLETER.
 *
 * Quatre methodes generiques, toutes static : elles ne tiennent aucun
 * etat, elles travaillent sur la liste qu'on leur donne. Le type T est
 * declare par chaque methode, avant son type de retour : <T>. Les
 * comportements — quoi garder, quoi calculer — arrivent en parametre,
 * sous forme de lambda.
 */
public class Outils {

    /** Une nouvelle liste, avec les seuls elements qui satisfont la condition. */
    public static <T> List<T> filtrer(List<T> liste, Predicate<T> condition) {
        throw new UnsupportedOperationException("filtrer n'est pas encore implementee");
    }

    /** Le nombre d'elements qui satisfont la condition. */
    public static <T> int compter(List<T> liste, Predicate<T> condition) {
        throw new UnsupportedOperationException("compter n'est pas encore implementee");
    }

    /**
     * Une nouvelle liste, ou chaque element a ete remplace par le resultat
     * de la fonction. Le type de sortie R peut etre different de T :
     * transformer une liste de String en liste d'Integer, par exemple.
     */
    public static <T, R> List<R> transformer(List<T> liste, Function<T, R> fonction) {
        throw new UnsupportedOperationException("transformer n'est pas encore implementee");
    }

    /**
     * Echange les elements d'indices i et j, DANS la liste recue : c'est la
     * seule des quatre qui modifie son argument.
     */
    public static <T> void echanger(List<T> liste, int i, int j) {
        throw new UnsupportedOperationException("echanger n'est pas encore implementee");
    }
}
