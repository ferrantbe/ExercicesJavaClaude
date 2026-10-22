package be.ephec.java.travail;

/** DEMO PKG — etat de DEPART. */
public class Distributeur {

    Stock stock = new Stock();
    double caisse = 0;

    void servir(String nom, double paye) {
        Boisson boisson = stock.trouver(nom);
        if (boisson == null) {
            System.out.println("Boisson inconnue : " + nom);
            return;
        }
        if (paye < boisson.prix) {
            System.out.printf("Il manque %.2f EUR%n", boisson.prix - paye);
            return;
        }
        caisse += boisson.prix;
        System.out.printf("Voici votre %s. Rendu : %.2f EUR%n",
                boisson.nom, paye - boisson.prix);
    }
}
