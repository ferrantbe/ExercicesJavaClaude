package be.ephec.java.demo.abs.slides;

/**
 * La classe fille des slides de la section 1 d'ABS. Chaque partie reprend une
 * slide, indiquee en commentaire.
 */
public class CompteEpargne extends CompteBancaire {

    // Slide « Une classe qui reprend une autre »
    private final double taux;

    // Slide « Appeler le constructeur de la classe mere »
    public CompteEpargne(long numero, double taux) {
        super(numero);
        this.taux = taux;
    }

    public void crediterInterets() {
        deposer(getSolde() * taux);
    }

    // Slide « Redefinir une methode »
    @Override
    public void deposer(double montant) {
        super.deposer(montant);
        journaliser(montant);
    }

    private void journaliser(double montant) {
        // numero est protected dans la mere : la fille peut le lire
        System.out.println("Compte " + numero + " : depot de " + montant);
    }
}
