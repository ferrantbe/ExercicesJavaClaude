package be.ephec.java.itf.e04;

/**
 * ITF.4 — Cette classe vous est FOURNIE. N'y touchez pas.
 *
 * Le magasin tient une liste d'observateurs et les previent tous quand un
 * produit arrive. Remarquez qu'il ne connait ni Client, ni Employe, ni
 * Prospect : il ne connait que l'interface.
 */
public class Magasin {

    private static final int MAX_OBSERVATEURS = 10;

    private final ObservateurDeProduits[] observateurs =
            new ObservateurDeProduits[MAX_OBSERVATEURS];
    private int nombre = 0;

    public void abonner(ObservateurDeProduits observateur) {
        if (nombre < MAX_OBSERVATEURS) {
            observateurs[nombre] = observateur;
            nombre++;
        }
    }

    public int nombreDAbonnes() {
        return nombre;
    }

    public void receptionne(String produit) {
        for (int i = 0; i < nombre; i++) {
            observateurs[i].nouveauProduit(produit);
        }
    }
}
