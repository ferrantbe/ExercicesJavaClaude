package be.ephec.java.itf.e02;

/**
 * ITF.2 — A COMPLETER.
 *
 * Le paiement PayPal se deroule en trois etapes, dans cet ordre exact.
 * Pour un montant de 42.50 :
 *
 *     Connexion a PayPal
 *     Selection du moyen de paiement
 *     Validation de la transaction de 42.50 euros
 *
 * Les etapes sont separees par un retour a la ligne, sans retour final.
 * Le montant s'ecrit avec deux decimales et un POINT decimal : precisez
 * Locale.US dans votre formatage, sinon une machine configuree en francais
 * ecrirait une virgule.
 */
public class PayPal implements Paiement {

    @Override
    public String effectuerPaiement(double montant) {
        throw new UnsupportedOperationException("effectuerPaiement n'est pas encore implementee");
    }
}
