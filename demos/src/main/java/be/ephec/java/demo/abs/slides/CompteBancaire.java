package be.ephec.java.demo.abs.slides;

/**
 * La classe mere des slides de la section 1 d'ABS.
 *
 * Slide « Ce que la fille voit de la mere » : solde est prive, invisible dans
 * CompteEpargne ; numero est protected, visible dans CompteEpargne.
 */
public class CompteBancaire {

    private double solde;        // invisible dans CompteEpargne
    protected long numero;       // visible dans CompteEpargne

    public CompteBancaire(long numero) {
        this.numero = numero;
    }

    public void deposer(double montant) {
        solde += montant;
    }

    public double getSolde() {
        return solde;
    }
}
