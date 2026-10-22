package be.ephec.java.demo.exc;

import java.util.ArrayList;
import java.util.List;

/** DEMO EXC — etat final du panier construit en direct. */
public class Panier {

    private final List<Double> prix = new ArrayList<>();

    public void ajouter(double montant) {
        prix.add(montant);
    }

    public int taille() {
        return prix.size();
    }

    public double total() {
        double total = 0;
        for (double montant : prix) {
            total += montant;
        }
        return total;
    }

    /**
     * La garde est ici, et pas chez l'appelant : la methode dit une fois
     * pour toutes ce qu'elle refuse, au lieu de compter sur la vigilance
     * de chacun de ceux qui l'appellent.
     *
     * Sans elle, la division par zero levait une ArithmeticException dont
     * le message — « / by zero » — ne disait rien du panier.
     */
    public double moyenne() {
        if (prix.isEmpty()) {
            throw new PanierVideException("Un panier vide n'a pas de moyenne");
        }
        return total() / prix.size();
    }
}
