package be.ephec.java.travail;

/**
 * DEPART GEN — une pile d'Object.
 *
 * Elle accepte n'importe quoi, et retourne n'importe quoi. C'est a l'appelant
 * de se souvenir de ce qu'il y a mis, et de transtyper en consequence.
 */
public class Pile {

    private final Object[] elements = new Object[10];
    private int sommet = 0;

    public void empiler(Object element) {
        elements[sommet] = element;
        sommet++;
    }

    public Object depiler() {
        sommet--;
        return elements[sommet];
    }

    public int taille() {
        return sommet;
    }
}
