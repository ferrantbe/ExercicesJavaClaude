package be.ephec.java.itf.e04;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

/** ITF.4 — Verification automatique. */
class MagasinTest {

    @Test
    @DisplayName("Prospect implemente l'interface attendue")
    void prospectEstObservateur() {
        assertTrue(new Prospect("Dupont") instanceof ObservateurDeProduits);
    }

    @Test
    @DisplayName("Le prospect recoit une publicite")
    void messageDuProspect() {
        Prospect dupont = new Prospect("Dupont");

        dupont.nouveauProduit("grille-pain");

        assertEquals("Publicite pour le nouveau grille-pain envoyee a Dupont",
                dupont.dernierMessage());
    }

    @Test
    @DisplayName("Avant toute annonce, le message est vide")
    void messageInitial() {
        assertEquals("", new Prospect("Dupont").dernierMessage());
    }

    @Test
    @DisplayName("Le magasin previent les trois acteurs sans les distinguer")
    void diffusion() {
        Magasin magasin = new Magasin();
        Client client = new Client("Martin");
        Employe employe = new Employe("Sophie");
        Prospect prospect = new Prospect("Dupont");

        magasin.abonner(client);
        magasin.abonner(employe);
        magasin.abonner(prospect);

        assertEquals(3, magasin.nombreDAbonnes());

        magasin.receptionne("grille-pain");

        assertEquals("Martin ira voir le nouveau grille-pain en rayon", client.dernierMessage());
        assertEquals("Sophie met le nouveau grille-pain en rayon", employe.dernierMessage());
        assertEquals("Publicite pour le nouveau grille-pain envoyee a Dupont",
                prospect.dernierMessage());
    }

    @Test
    @DisplayName("Le dernier message remplace le precedent")
    void dernierMessage() {
        Magasin magasin = new Magasin();
        Prospect prospect = new Prospect("Dupont");
        magasin.abonner(prospect);

        magasin.receptionne("grille-pain");
        magasin.receptionne("cafetiere");

        assertEquals("Publicite pour le nouveau cafetiere envoyee a Dupont",
                prospect.dernierMessage());
    }
}
