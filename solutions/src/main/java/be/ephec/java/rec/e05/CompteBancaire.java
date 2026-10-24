package be.ephec.java.rec.e05;

import java.util.Locale;

/**
 * REC.5 — Corrige.
 *
 * A remarquer : retirer() verifie le montant AVANT le solde. Un retrait
 * negatif est d'abord un montant invalide, quel que soit le solde. Et
 * les deux verifications precedent la modification : si l'une echoue,
 * le solde n'a pas bouge.
 *
 * Le controle du montant est partage par deposer et retirer : il n'est
 * ecrit qu'une fois, dans une methode privee (CC-CLS.3).
 */
public class CompteBancaire {

    private final String numero;
    private final String titulaire;
    private double solde;

    public CompteBancaire(String numero, String titulaire) {
        this.numero = numero;
        this.titulaire = titulaire;
        this.solde = 0;
    }

    public String getNumero() {
        return numero;
    }

    public String getTitulaire() {
        return titulaire;
    }

    public double getSolde() {
        return solde;
    }

    public void deposer(double montant) throws MontantInvalideException {
        verifierMontant(montant);
        solde += montant;
    }

    public void retirer(double montant)
            throws MontantInvalideException, SoldeInsuffisantException {
        verifierMontant(montant);
        if (montant > solde) {
            throw new SoldeInsuffisantException(solde, montant);
        }
        solde -= montant;
    }

    private static void verifierMontant(double montant) throws MontantInvalideException {
        if (montant <= 0) {
            throw new MontantInvalideException(montant);
        }
    }

    @Override
    public String toString() {
        return String.format(Locale.US, "%s - %s : %.2f EUR", numero, titulaire, solde);
    }
}
