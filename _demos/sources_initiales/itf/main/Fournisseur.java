package be.ephec.java.travail;

import java.util.HashSet;
import java.util.Set;

/**
 * DEPART ITF — le fournisseur connait la classe Client.
 *
 * Regardez le type de la collection et les trois signatures : partout
 * Client. C'est ce couplage qui sera le sujet de la demonstration.
 */
public class Fournisseur {

    private final Set<Client> abonnes = new HashSet<>();

    public void addSubscriber(Client client) {
        abonnes.add(client);
    }

    public void removeSubscriber(Client client) {
        abonnes.remove(client);
    }

    private void informSubscribers() {
        System.out.println("Fournisseur - J'informe mes abonnes");
        for (Client client : abonnes) {
            client.update();
        }
    }

    public void addProduct() {
        System.out.println("Fournisseur - Nouveau produit arrive...");
        informSubscribers();
    }
}
