package be.ephec.java.itf.e02;

/**
 * ITF.2 — A COMPLETER.
 *
 * Le paiement par carte se deroule en deux etapes. Pour 42.50 :
 *
 *     Authentification de la transaction
 *     Paiement de 42.50 euros execute
 *
 * Le montant s'ecrit avec deux decimales et un POINT decimal : precisez
 * Locale.US dans votre formatage.
 */
public class CarteDeCredit implements Paiement {

    @Override
    public String effectuerPaiement(double montant) {
        throw new UnsupportedOperationException("effectuerPaiement n'est pas encore implementee");
    }
}
