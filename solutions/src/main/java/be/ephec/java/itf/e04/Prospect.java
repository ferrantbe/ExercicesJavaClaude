package be.ephec.java.itf.e04;

/**
 * ITF.4 — CORRIGE.
 *
 * Tout l'interet du patron Observateur tient dans ce qui n'a PAS ete
 * modifie. Pour ajouter un troisieme acteur, il a suffi d'ecrire cette
 * classe : ni le Magasin, ni l'interface, ni le Client, ni l'Employe n'ont
 * bouge d'une ligne.
 *
 * La raison est que le Magasin ne connait aucun de ses observateurs. Il ne
 * connait que l'interface, et il previent tout ce qui la respecte.
 */
public class Prospect implements ObservateurDeProduits {

    private final String nom;
    private String dernierMessage = "";

    public Prospect(String nom) {
        this.nom = nom;
    }

    @Override
    public void nouveauProduit(String produit) {
        this.dernierMessage = "Publicite pour le nouveau " + produit + " envoyee a " + nom;
    }

    @Override
    public String dernierMessage() {
        return dernierMessage;
    }
}
