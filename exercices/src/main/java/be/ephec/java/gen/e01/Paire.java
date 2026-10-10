package be.ephec.java.gen.e01;

/**
 * GEN.1 — A COMPLETER.
 *
 * Une paire de deux objets de MEME type. Le type est decide au moment de
 * l'utilisation, pas au moment de l'ecriture : c'est tout l'interet.
 *
 *     Paire<Integer> notes = new Paire<>(12, 16);
 *     Paire<String> mots   = new Paire<>("bonjour", "au revoir");
 *
 * Le T entre chevrons est un PARAMETRE DE TYPE. Il se declare apres le nom de
 * la classe, et s'utilise ensuite comme n'importe quel type.
 */
public class Paire<T> {

    // TODO : declarez les deux champs, en private et en final

    /** Le constructeur est declare : completez son corps. */
    public Paire(T premier, T second) {
        throw new UnsupportedOperationException("le constructeur n'est pas encore implemente");
    }

    public T getPremier() {
        throw new UnsupportedOperationException("getPremier n'est pas encore implementee");
    }

    public T getSecond() {
        throw new UnsupportedOperationException("getSecond n'est pas encore implementee");
    }

    /**
     * Rend, au format exact :
     *     "premiere valeur : 12 - deuxieme valeur : 16"
     */
    @Override
    public String toString() {
        throw new UnsupportedOperationException("toString n'est pas encore implementee");
    }
}
