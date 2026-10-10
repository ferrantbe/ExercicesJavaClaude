package be.ephec.java.itf.e04;

/** ITF.4 — Cette classe vous est FOURNIE. */
public class Employe implements ObservateurDeProduits {

    private final String nom;
    private String dernierMessage = "";

    public Employe(String nom) {
        this.nom = nom;
    }

    @Override
    public void nouveauProduit(String produit) {
        this.dernierMessage = nom + " met le nouveau " + produit + " en rayon";
    }

    @Override
    public String dernierMessage() {
        return dernierMessage;
    }
}
