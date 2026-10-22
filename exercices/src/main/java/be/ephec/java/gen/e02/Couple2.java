package be.ephec.java.gen.e02;

/**
 * GEN.2 — A COMPLETER.
 *
 * Un couple de deux objets de types POSSIBLEMENT DIFFERENTS. Il faut donc
 * deux parametres de type, separes par une virgule.
 *
 *     Couple2<String, Integer> age = new Couple2<>("Ada", 36);
 *
 * Rien n'interdit qu'ils soient identiques : Couple2<Integer, Integer>
 * fonctionne aussi.
 */
public class Couple2<U, V> {

    // TODO : declarez les deux champs

    /** Le constructeur est declare : completez son corps. */
    public Couple2(U premier, V second) {
        throw new UnsupportedOperationException("le constructeur n'est pas encore implemente");
    }

    public U getPremier() {
        throw new UnsupportedOperationException("getPremier n'est pas encore implementee");
    }

    public V getSecond() {
        throw new UnsupportedOperationException("getSecond n'est pas encore implementee");
    }

    /** Meme format qu'en GEN.1. */
    @Override
    public String toString() {
        throw new UnsupportedOperationException("toString n'est pas encore implementee");
    }
}
