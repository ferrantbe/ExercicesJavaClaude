package be.ephec.java.travail;

/** DEPART ITF — deux clients s'abonnent, se desabonnent. Tout marche. */
public class Demo {

    public static void main(String[] args) {
        Fournisseur fournisseur = new Fournisseur();
        Client jean = new Client("Jean");
        Client marc = new Client("Marc");

        System.out.println("*** Nouveau produit, personne n'est abonne");
        fournisseur.addProduct();

        System.out.println("\n*** Jean s'abonne");
        jean.jeMAbonne(fournisseur);
        fournisseur.addProduct();

        System.out.println("\n*** Marc s'abonne");
        marc.jeMAbonne(fournisseur);
        fournisseur.addProduct();

        System.out.println("\n*** Jean se desabonne");
        jean.jeMeDesabonne(fournisseur);
        fournisseur.addProduct();

        // TODO en direct : et si un MAGASIN voulait s'abonner aussi ?
    }
}
