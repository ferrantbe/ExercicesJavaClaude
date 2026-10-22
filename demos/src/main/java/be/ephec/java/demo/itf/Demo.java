package be.ephec.java.demo.itf;

/**
 * DEMO ITF — etat final.
 *
 * Ce qu'il faut regarder : le magasin s'abonne exactement comme les
 * clients, et le fournisseur ne fait aucune difference entre eux.
 *
 * Aucun instanceof, aucun test de type. Ajouter un troisieme genre
 * d'abonne — un entrepot, un service de notification — demanderait une
 * classe de plus et rien d'autre.
 */
public class Demo {

    public static void main(String[] args) {
        Fournisseur fournisseur = new Fournisseur();
        Client jean = new Client("Jean");
        Client marc = new Client("Marc");
        Magasin quartier = new Magasin("Epicerie du quartier");

        System.out.println("*** Nouveau produit, personne n'est abonne");
        fournisseur.addProduct();

        System.out.println("\n*** Jean s'abonne");
        jean.jeMAbonne(fournisseur);
        fournisseur.addProduct();

        System.out.println("\n*** Marc et l'epicerie s'abonnent");
        marc.jeMAbonne(fournisseur);
        quartier.jeMAbonne(fournisseur);
        fournisseur.addProduct();

        System.out.println("\n*** Jean se desabonne");
        jean.jeMeDesabonne(fournisseur);
        fournisseur.addProduct();
    }
}
