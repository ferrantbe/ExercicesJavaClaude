package be.ephec.java.itf.e04;

/**
 * ITF.4 — CORRIGE. Fournie, elle sert de modele.
 */
public class Client implements ObservateurDeProduits {

    private final String nom;
    private String dernierMessage = "";

    public Client(String nom) {
        this.nom = nom;
    }

    @Override
    public void nouveauProduit(String produit) {
        this.dernierMessage = nom + " ira voir le nouveau " + produit + " en rayon";
    }

    @Override
    public String dernierMessage() {
        return dernierMessage;
    }
}
