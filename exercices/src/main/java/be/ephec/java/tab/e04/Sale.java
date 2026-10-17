package be.ephec.java.tab.e04;

/**
 * TAB.4 — A COMPLETER.
 *
 * Une vente porte sur une voiture, a un prix catalogue, avec une reduction.
 * Le prix reel se CALCULE : ce n'est pas une donnee a stocker.
 */
public class Sale {

    // TODO : declarez les champs necessaires (voiture, prix catalogue, reduction)

    /** Le constructeur est declare : completez son corps. */
    public Sale(Car voiture, double prixCatalogue, double reduction) {
        throw new UnsupportedOperationException("le constructeur n'est pas encore implemente");
    }

    /**
     * Retourne le prix effectivement paye : le prix catalogue diminue du
     * pourcentage de reduction.
     *
     * Une reduction de 0.10 sur un prix de 20000 donne 18000.
     */
    public double prixReel() {
        throw new UnsupportedOperationException("prixReel n'est pas encore implementee");
    }

    public Car getVoiture() {
        throw new UnsupportedOperationException("getVoiture n'est pas encore implementee");
    }

    public double getPrixCatalogue() {
        throw new UnsupportedOperationException("getPrixCatalogue n'est pas encore implementee");
    }

    /**
     * Retourne la vente sous forme de texte, dans ce format exact :
     *     "Renault Clio [VF123] : 20000.0 -> 18000.0"
     * soit la marque, le modele, le numero de serie entre crochets,
     * puis le prix catalogue et le prix reel.
     */
    public String enTexte() {
        throw new UnsupportedOperationException("enTexte n'est pas encore implementee");
    }
}
