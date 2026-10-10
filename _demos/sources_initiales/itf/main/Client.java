package be.ephec.java.travail;

/** DEPART ITF — le client, seul type que le fournisseur sache prevenir. */
public class Client {

    private final String nom;

    public Client(String nom) {
        this.nom = nom;
    }

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
