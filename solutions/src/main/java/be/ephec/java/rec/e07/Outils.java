package be.ephec.java.rec.e07;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;
import java.util.function.Predicate;

/**
 * REC.7 — Corrige.
 *
 * A remarquer : trois des quatre methodes rendent une NOUVELLE liste et
 * laissent l'argument intact ; echanger modifie l'argument et ne rend
 * rien. C'est la separation commande / requete (CC-MET.8), et la Javadoc
 * le dit pour chacune : le lecteur sait a quoi s'attendre avant d'appeler.
 */
public class Outils {

    public static <T> List<T> filtrer(List<T> liste, Predicate<T> condition) {
        List<T> retenus = new ArrayList<>();
        for (T element : liste) {
            if (condition.test(element)) {
                retenus.add(element);
            }
        }
        return retenus;
    }

    /** Pas de boucle a reecrire : filtrer sait deja retenir les bons elements. */
    public static <T> int compter(List<T> liste, Predicate<T> condition) {
        return filtrer(liste, condition).size();
    }

    public static <T, R> List<R> transformer(List<T> liste, Function<T, R> fonction) {
        List<R> resultats = new ArrayList<>();
        for (T element : liste) {
            resultats.add(fonction.apply(element));
        }
        return resultats;
    }

    public static <T> void echanger(List<T> liste, int i, int j) {
        T temporaire = liste.get(i);
        liste.set(i, liste.get(j));
        liste.set(j, temporaire);
    }
}
