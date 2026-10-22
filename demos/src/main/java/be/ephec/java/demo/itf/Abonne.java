package be.ephec.java.demo.itf;

/**
 * DEMO ITF — etat final.
 *
 * Cette interface n'existait pas au depart. Elle a ete extraite du besoin,
 * pas devinee : c'est en essayant d'abonner un Magasin qu'elle est devenue
 * necessaire.
 *
 * Elle ne declare qu'une methode, et c'est tout ce que le fournisseur a
 * besoin de savoir de ses abonnes. Le reste — leur nom, ce qu'ils font du
 * produit — ne le regarde pas.
 */
public interface Abonne {

    void update();
}
