package be.ephec.java.demo.gen;

/**
 * DEMO GEN — etat final.
 *
 * Un parametre de type, et l'erreur a change de camp.
 *
 * Au depart, cette classe manipulait des Object. On pouvait y empiler un
 * String au milieu d'entiers : le compilateur ne disait rien, et le
 * programme plantait a l'execution, sur une ligne qui n'avait rien fait
 * de mal.
 *
 * Avec <T>, la meme faute est refusee avant que le programme ne demarre.
 */
public class Pile<T> {

    private final Object[] elements = new Object[10];
    private int sommet = 0;

    public void empiler(T element) {
        elements[sommet] = element;
        sommet++;
    }

    /**
     * Le transtypage a disparu chez l'appelant, il n'a pas disparu tout
     * court : il est ici, une fois pour toutes, dans une classe qui sait
     * ce qu'elle contient. C'est le seul endroit ou il soit sur.
     */
    @SuppressWarnings("unchecked")
    public T depiler() {
        sommet--;
        return (T) elements[sommet];
    }

    public int taille() {
        return sommet;
    }
}
