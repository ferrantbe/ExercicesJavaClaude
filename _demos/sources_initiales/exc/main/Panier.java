package be.ephec.java.travail;

import java.util.ArrayList;
import java.util.List;

/**
 * DEPART EXC — etat de l'etape 1.
 *
 * Aucune garde dans moyenne() : sur un panier vide, la division par zero
 * leve une ArithmeticException dont le message ne dit rien du panier.
 * C'est ce plantage qu'on montre en premier.
 */
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

    public double moyenne() {
        return total() / prix.size();
    }
}
