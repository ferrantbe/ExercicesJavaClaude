package be.ephec.java.demo.exc;

/**
 * DEMO EXC — etat final de la demonstration du cours.
 *
 * Au depart, Panier.moyenne divisait par zero sur un panier vide, et le
 * programme s'arretait sur une ArithmeticException dont le message —
 * « / by zero » — ne disait rien du panier.
 *
 * Ce qu'il faut regarder en relisant :
 *   la garde est DANS moyenne(), pas chez l'appelant ;
 *   le message dit ce qui est refuse et pourquoi ;
 *   le catch du main fait quelque chose — il n'avale pas l'exception.
 */
public class Demo {

    public static void main(String[] args) {
        Panier garni = new Panier();
        garni.ajouter(12.50);
        garni.ajouter(7.30);
        garni.ajouter(3.20);

        System.out.printf("Panier garni : %.2f en moyenne%n", garni.moyenne());

        Panier vide = new Panier();

        // On attrape la ou l'on peut faire quelque chose — ici, le dire.
        try {
            System.out.printf("Panier vide : %.2f%n", vide.moyenne());
        } catch (PanierVideException e) {
            System.out.println("Impossible : " + e.getMessage());
        }
    }
}
