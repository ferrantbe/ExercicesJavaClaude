package be.ephec.java.demo.itf;

/**
 * DEMO ITF — etat final.
 *
 * Seule la ligne de declaration a change : « implements Abonne ». Le corps
 * de la classe est celui du depart, sans une modification.
 */
public class Client implements Abonne {

    private final String nom;

    public Client(String nom) {
        this.nom = nom;
    }

    @Override
    public void update() {
        System.out.printf("Client (%s) - Enfin, je vais acheter le produit%n", nom);
    }

    public void jeMAbonne(Fournisseur fournisseur) {
        fournisseur.addSubscriber(this);
    }

    public void jeMeDesabonne(Fournisseur fournisseur) {
        fournisseur.removeSubscriber(this);
    }
}
