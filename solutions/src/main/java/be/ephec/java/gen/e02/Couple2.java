package be.ephec.java.gen.e02;

/**
 * GEN.2 — CORRIGE.
 *
 * Deux parametres de type au lieu d'un. Les lettres n'ont aucune importance
 * pour le compilateur — U, V, A, B feraient l'affaire — mais la convention
 * aide a la lecture : T pour un type quelconque, K et V pour une cle et une
 * valeur, E pour l'element d'une collection.
 *
 * Rien n'oblige U et V a differer : Couple2<Integer, Integer> est parfaitement
 * valide. Deux parametres de type autorisent la difference, ils ne l'imposent
 * pas.
 */
public class Couple2<U, V> {

    private final U premier;
    private final V second;

    public Couple2(U premier, V second) {
        this.premier = premier;
        this.second = second;
    }

    public U getPremier() {
        return premier;
    }

    public V getSecond() {
        return second;
    }

    @Override
    public String toString() {
        return "premiere valeur : " + premier + " - deuxieme valeur : " + second;
    }
}
