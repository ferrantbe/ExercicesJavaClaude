package be.ephec.java.cours08.compte;

public class Compte {
    private double solde = 0;

    public double getSolde() {
        return solde;
    }

    public void ajoute(double montant) throws MontantInvalideException {
        if (montant < 0)
            throw new MontantInvalideException();
        solde += montant;
    }
}
