package be.ephec.java.itf.e04;

/**
 * ITF.4 — A COMPLETER.
 *
 * Un prospect n'est pas encore client : il se contente de recevoir une
 * publicite. Son message doit valoir exactement :
 *
 *     "Publicite pour le nouveau grille-pain envoyee a Dupont"
 *
 * Vous ne touchez ni au Magasin, ni a l'interface : c'est tout l'interet
 * du montage.
 */
public class Prospect implements ObservateurDeProduits {

    // TODO : declarez ce dont la classe a besoin

    /** Le constructeur est declare : completez son corps. */
    public Prospect(String nom) {
        throw new UnsupportedOperationException("le constructeur n'est pas encore implemente");
    }

    @Override
    public void nouveauProduit(String produit) {
        throw new UnsupportedOperationException("nouveauProduit n'est pas encore implementee");
    }

    @Override
    public String dernierMessage() {
        throw new UnsupportedOperationException("dernierMessage n'est pas encore implementee");
    }
}
