package be.ephec.java.gen.e01;

/**
 * GEN.1 — CORRIGE.
 *
 * Ce que la genericite apporte tient en une phrase : le compilateur connait
 * le type contenu.
 *
 * Sans elle, il aurait fallu ecrire une Paire d'Object, et chaque lecture
 * aurait demande un transtypage :
 *
 *     Paire paire = new Paire(12, 16);
 *     int somme = (Integer) paire.getPremier() + (Integer) paire.getSecond();
 *
 * Avec elle, le transtypage disparait, et surtout l'erreur devient impossible :
 * new Paire<Integer>(12, "seize") ne compile pas. Sans genericite, cette meme
 * ligne aurait compile sans broncher et plante a l'execution, plus tard, dans
 * une autre methode.
 *
 * Une exception detectee a la compilation coute quelques secondes ; la meme
 * detectee en production coute une soiree.
 */
public class Paire<T> {

    private final T premier;
    private final T second;

    public Paire(T premier, T second) {
        this.premier = premier;
        this.second = second;
    }

    public T getPremier() {
        return premier;
    }

    public T getSecond() {
        return second;
    }

    @Override
    public String toString() {
        // La concatenation appelle toString() sur chaque valeur, quel que
        // soit son type reel. Rien de particulier a faire pour cela.
        return "premiere valeur : " + premier + " - deuxieme valeur : " + second;
    }
}
