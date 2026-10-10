package be.ephec.java.itf.e02;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

/** ITF.2 — Verification automatique. */
class PaiementTest {

    @Test
    @DisplayName("PayPal enchaine ses trois etapes")
    void paypal() {
        assertEquals("Connexion a PayPal\n"
                        + "Selection du moyen de paiement\n"
                        + "Validation de la transaction de 42.50 euros",
                new PayPal().effectuerPaiement(42.5));
    }

    @Test
    @DisplayName("La carte de credit en a deux")
    void carte() {
        assertEquals("Authentification de la transaction\n"
                        + "Paiement de 42.50 euros execute",
                new CarteDeCredit().effectuerPaiement(42.5));
    }

    @Test
    @DisplayName("Le montant s'ecrit avec deux decimales")
    void formatDuMontant() {
        assertEquals("Authentification de la transaction\n"
                        + "Paiement de 7.00 euros execute",
                new CarteDeCredit().effectuerPaiement(7));
    }

    @Test
    @DisplayName("Le client rend ce que le moyen de paiement a produit")
    void clientDelegue() {
        Client client = new Client();

        assertEquals(new PayPal().effectuerPaiement(10),
                client.executePaiement(new PayPal(), 10));
        assertEquals(new CarteDeCredit().effectuerPaiement(10),
                client.executePaiement(new CarteDeCredit(), 10));
    }
}
