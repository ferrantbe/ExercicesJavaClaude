package be.ephec.java.itf.e02;

/**
 * ITF.2 — A COMPLETER.
 *
 * Le client ne connait aucun moyen de paiement en particulier. Il sait
 * seulement qu'on lui en fournit un.
 */
public class Client {

    /** Rend le compte-rendu du paiement, tel que le moyen de paiement le fournit. */
    public String executePaiement(Paiement moyenDePaiement, double montant) {
        throw new UnsupportedOperationException("executePaiement n'est pas encore implementee");
    }
}
