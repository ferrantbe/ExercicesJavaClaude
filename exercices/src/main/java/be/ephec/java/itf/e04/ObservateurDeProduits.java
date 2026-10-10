package be.ephec.java.itf.e04;

/**
 * ITF.4 — Cette interface vous est FOURNIE.
 *
 * Elle definit ce que le magasin attend de quiconque veut etre prevenu.
 * Le magasin ne connaitra jamais rien d'autre de ses observateurs.
 */
public interface ObservateurDeProduits {

    /** Appelee par le magasin des qu'un produit arrive. */
    void nouveauProduit(String produit);

    /** Rend ce que l'observateur a retenu, pour verification. */
    String dernierMessage();
}
