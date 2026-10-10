package be.ephec.java.exc.e02;

/**
 * EXC.2 — A COMPLETER.
 *
 * Un compte bancaire, sans exception pour l'instant. Le retrait est plafonne
 * par le solde disponible.
 */
public class Compte {

    // TODO : declarez le solde, en private. Un compte neuf est a zero.

    /** Rend le solde courant. */
    public double getSolde() {
        throw new UnsupportedOperationException("getSolde n'est pas encore implementee");
    }

    /** Ajoute un montant au solde. */
    public void ajoute(double montant) {
        throw new UnsupportedOperationException("ajoute n'est pas encore implementee");
    }

    /**
     * Retire un montant et rend CE QUI A REELLEMENT ETE RETIRE.
     *
     * On ne peut pas retirer plus que le solde : sur un compte a 100, un
     * retrait de 120 rend 100 et laisse le solde a zero.
     */
    public double retire(double montant) {
        throw new UnsupportedOperationException("retire n'est pas encore implementee");
    }
}
