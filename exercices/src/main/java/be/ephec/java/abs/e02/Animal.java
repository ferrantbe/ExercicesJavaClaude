package be.ephec.java.abs.e02;

/**
 * ABS.2 — A COMPLETER.
 *
 * Meme principe qu'en ABS.1 : ce qui varie d'un animal a l'autre est le cri,
 * ce qui est commun est la facon de le faire entendre.
 */
public abstract class Animal {

    /** Retourne le cri de l'animal : "J'aboie", "Je miaule". */
    public abstract String cri();

    /** Affiche le cri sur la console. */
    public void makeNoise() {
        throw new UnsupportedOperationException("makeNoise n'est pas encore implementee");
    }
}
