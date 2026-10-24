package be.ephec.java.rec.e05;

/**
 * REC.5 — Corrige.
 *
 * Le constructeur recoit le montant fautif et redige lui-meme le message :
 * l'appelant n'a qu'a dire ce qui s'est passe, pas comment le raconter.
 */
public class MontantInvalideException extends Exception {

    public MontantInvalideException(double montant) {
        super("Montant invalide : " + montant + " (il doit etre strictement positif)");
    }
}
