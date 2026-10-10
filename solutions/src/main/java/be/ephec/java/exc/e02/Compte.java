package be.ephec.java.exc.e02;

/**
 * EXC.2 — CORRIGE.
 *
 * Aucune exception ici : le retrait excessif n'est pas une erreur, c'est un
 * cas prevu. La methode rend ce qu'elle a pu retirer.
 *
 * Cette version a pourtant un defaut, et c'est le sujet de la question posee
 * dans GestionDeCompte : un retrait de 120 sur un compte a 100 rend 100, tout
 * comme un retrait de 100 sur ce meme compte. L'appelant ne peut pas
 * distinguer un retrait complet d'un retrait partiel sans comparer lui-meme
 * avec ce qu'il avait demande.
 */
public class Compte {

    private double solde = 0;

    public double getSolde() {
        return solde;
    }

    public void ajoute(double montant) {
        solde += montant;
    }

    public double retire(double montant) {
        // Math.min dit exactement ce qu'on veut : le plus petit des deux.
        double retire = Math.min(montant, solde);
        solde -= retire;
        return retire;
    }
}
