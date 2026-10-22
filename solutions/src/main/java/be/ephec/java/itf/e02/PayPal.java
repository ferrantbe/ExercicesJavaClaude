package be.ephec.java.itf.e02;

import java.util.Locale;

/**
 * ITF.2 — CORRIGE.
 *
 * Locale.US est indispensable : sans lui, %.2f suit la langue de la machine
 * et une configuration francaise ecrirait "42,50" avec une virgule. Le test
 * echouerait sur une difference d'un seul caractere.
 */
public class PayPal implements Paiement {

    @Override
    public String effectuerPaiement(double montant) {
        return "Connexion a PayPal\n"
                + "Selection du moyen de paiement\n"
                + String.format(Locale.US, "Validation de la transaction de %.2f euros", montant);
    }
}
