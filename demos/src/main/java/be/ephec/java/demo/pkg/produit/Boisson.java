package be.ephec.java.demo.pkg.produit;

/**
 * DEMO PKG — etat d'ARRIVEE.
 *
 * Deplacee dans son propre package par Refactor > Move. Le deplacement a
 * casse la compilation, et c'est ce qu'on voulait montrer : la visibilite
 * de package ne survit pas au demenagement.
 *
 * Ce qui a change ici :
 *   - la classe et le constructeur sont devenus publics ;
 *   - les champs sont restes PRIVES, et deux accesseurs les remplacent.
 *
 * Le second point n'etait pas force : on aurait pu rendre les champs
 * publics et en finir. Mais un champ public est un engagement definitif,
 * alors qu'un accesseur peut changer d'implementation.
 */
public class Boisson {

    private final String nom;
    private final double prix;

    public Boisson(String nom, double prix) {
        this.nom = nom;
        this.prix = prix;
    }

    public String getNom() {
        return nom;
    }

    public double getPrix() {
        return prix;
    }
}
