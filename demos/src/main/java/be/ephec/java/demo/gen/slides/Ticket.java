package be.ephec.java.demo.gen.slides;

/** Slide « Plusieurs parametres » (GEN, section 2). */
public class Ticket<K, V> {

    private final K numero;
    private final V objet;

    public Ticket(K numero, V objet) {
        this.numero = numero;
        this.objet = objet;
    }

    public V getObjet() {           // ajoute pour la demonstration
        return objet;
    }

    @Override
    public String toString() {      // ajoute pour la demonstration
        return "ticket " + numero + " : " + objet;
    }
}
