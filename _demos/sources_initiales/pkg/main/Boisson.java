package be.ephec.java.travail;

/**
 * DEMO PKG — etat de DEPART.
 *
 * Tout le distributeur tient dans un seul package. Remarquez les champs :
 * ils n'ont AUCUN modificateur. C'est la visibilite « de package », celle
 * qu'on obtient sans rien demander — et c'est elle qui va nous occuper.
 */
public class Boisson {

    String nom;
    double prix;

    Boisson(String nom, double prix) {
        this.nom = nom;
        this.prix = prix;
    }
}
