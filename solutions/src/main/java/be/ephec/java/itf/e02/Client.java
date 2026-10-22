package be.ephec.java.itf.e02;

/**
 * ITF.2 — CORRIGE.
 *
 * Le client ne connait ni PayPal ni CarteDeCredit. Il recoit un Paiement et
 * lui delegue le travail. Ajouter le virement bancaire demain ne demandera
 * pas de toucher a cette classe.
 */
public class Client {

    public String executePaiement(Paiement moyenDePaiement, double montant) {
        return moyenDePaiement.effectuerPaiement(montant);
    }
}
