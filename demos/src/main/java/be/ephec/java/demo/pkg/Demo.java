package be.ephec.java.demo.pkg;

import be.ephec.java.demo.pkg.machine.Distributeur;
import be.ephec.java.demo.pkg.produit.Boisson;

/**
 * DEMO PKG — etat d'ARRIVEE.
 *
 * Le programme ne touche plus au stock : il approvisionne le distributeur,
 * qui s'occupe du reste. La ligne distributeur.stock.ajouter(...) du depart
 * n'est plus possible, et c'est une amelioration deguisee en contrainte.
 */
public class Demo {

    public static void main(String[] args) {
        Distributeur distributeur = new Distributeur();

        distributeur.approvisionner(new Boisson("Eau", 1.20));
        distributeur.approvisionner(new Boisson("Cafe", 0.80));

        distributeur.servir("Cafe", 1.00);
        distributeur.servir("The", 1.00);
        distributeur.servir("Eau", 1.00);

        System.out.printf("Caisse : %.2f EUR%n", distributeur.getCaisse());

        // distributeur.caisse = 1000;   // ne compile plus : prive.
    }
}
