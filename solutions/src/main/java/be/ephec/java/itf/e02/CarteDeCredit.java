package be.ephec.java.itf.e02;

import java.util.Locale;

/** ITF.2 — CORRIGE. */
public class CarteDeCredit implements Paiement {

    @Override
    public String effectuerPaiement(double montant) {
        return "Authentification de la transaction\n"
                + String.format(Locale.US, "Paiement de %.2f euros execute", montant);
    }
}
