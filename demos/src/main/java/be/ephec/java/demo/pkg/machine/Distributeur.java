package be.ephec.java.demo.pkg.machine;

import be.ephec.java.demo.pkg.produit.Boisson;
import be.ephec.java.demo.pkg.produit.Stock;

/**
 * DEMO PKG — etat d'ARRIVEE.
 *
 * Dans un TROISIEME package. Elle ne peut plus rien atteindre de Boisson
 * ni de Stock sans passer par leur interface publique — et l'import, en
 * haut du fichier, dit exactement de quoi elle depend.
 *
 * C'est le benefice cache du decoupage : la liste des imports est la liste
 * des dependances. Dans un package unique, elle etait vide, et on ne
 * voyait rien.
 */
public class Distributeur {

    private final Stock stock = new Stock();
    private double caisse = 0;

    public void approvisionner(Boisson boisson) {
        stock.ajouter(boisson);
    }

    public void servir(String nom, double paye) {
        Boisson boisson = stock.trouver(nom);
        if (boisson == null) {
            System.out.println("Boisson inconnue : " + nom);
            return;
        }
        if (paye < boisson.getPrix()) {
            System.out.printf("Il manque %.2f EUR%n", boisson.getPrix() - paye);
            return;
        }
        caisse += boisson.getPrix();
        System.out.printf("Voici votre %s. Rendu : %.2f EUR%n",
                boisson.getNom(), paye - boisson.getPrix());
    }

    /** La caisse se lit, mais ne se modifie pas de l'exterieur. */
    public double getCaisse() {
        return caisse;
    }
}
