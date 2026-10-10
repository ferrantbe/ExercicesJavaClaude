package be.ephec.java.travail;

/**
 * DEPART EXC — etat de l'etape 1.
 *
 * Aucun try : le programme s'arrete sur le panier vide, et affiche la
 * trace qu'on va lire ensemble.
 */
public class Demo {

    public static void main(String[] args) {
        Panier garni = new Panier();
        garni.ajouter(12.50);
        garni.ajouter(7.30);
        garni.ajouter(3.20);

        System.out.printf("Panier garni : %.2f en moyenne%n", garni.moyenne());

        Panier vide = new Panier();
        System.out.printf("Panier vide : %.2f%n", vide.moyenne());
    }
}
