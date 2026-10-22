package be.ephec.java.demo.itf;

/**
 * DEMO ITF — etat final.
 *
 * Cette classe a ete ecrite APRES le fournisseur, et le fournisseur n'a
 * pas ete touche pour autant. C'est le resultat qu'on cherchait.
 *
 * Un magasin n'est pas un client : il commande au lieu d'acheter, il n'a
 * rien en commun avec lui. Il partage seulement une chose — savoir qu'on
 * le previenne — et c'est exactement ce que l'interface exprime.
 */
public class Magasin implements Abonne {

    private final String nom;

    public Magasin(String nom) {
        this.nom = nom;
    }

    @Override
    public void update() {
        System.out.printf("Magasin (%s) - Enfin, je vais commander le produit%n", nom);
    }

    public void jeMAbonne(Fournisseur fournisseur) {
        fournisseur.addSubscriber(this);
    }
}
