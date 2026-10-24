package be.ephec.java.rec.e05;

/**
 * REC.5 — Corrige.
 *
 * retirer() declare deux exceptions : le catch doit traiter les deux.
 * Deux clauses catch, parce que les deux cas ne se racontent pas pareil ;
 * un seul try, parce que la suite n'a plus de sens apres un echec.
 */
public class Programme {

    public static void main(String[] args) {
        CompteBancaire compte = new CompteBancaire("BE01", "Ada Lovelace");
        System.out.println(compte);
        try {
            compte.deposer(200);
            System.out.println(compte);
            compte.retirer(50);
            System.out.println(compte);
            compte.retirer(500);
            System.out.println("Pas normal : le retrait a ete accepte");
        } catch (SoldeInsuffisantException e) {
            System.out.println("Refuse : " + e.getMessage());
        } catch (MontantInvalideException e) {
            System.out.println("Refuse : " + e.getMessage());
        }

        try {
            compte.deposer(-10);
        } catch (MontantInvalideException e) {
            System.out.println("Refuse : " + e.getMessage());
        }
        System.out.println(compte);
    }
}
