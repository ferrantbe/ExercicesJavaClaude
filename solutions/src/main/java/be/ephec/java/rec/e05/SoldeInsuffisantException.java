package be.ephec.java.rec.e05;

import java.util.Locale;

/** REC.5 — Corrige. Le message cite les deux nombres : celui qu'on a, celui qu'on voulait. */
public class SoldeInsuffisantException extends Exception {

    public SoldeInsuffisantException(double solde, double montant) {
        super(String.format(Locale.US,
                "Solde insuffisant : %.2f EUR disponibles, %.2f EUR demandes", solde, montant));
    }
}
