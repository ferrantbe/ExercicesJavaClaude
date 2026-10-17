package be.ephec.java.exc.e02;

/** EXC.2 — CORRIGE. */
public class GestionDeCompte {

    public static void main(String[] args) {
        Compte compte = new Compte();

        compte.ajoute(100);
        System.out.println("Solde apres depot : " + compte.getSolde());

        System.out.println("Retrait de 30  -> retourne " + compte.retire(30)
                + ", solde " + compte.getSolde());

        System.out.println("Retrait de 120 -> retourne " + compte.retire(120)
                + ", solde " + compte.getSolde());

        // Les deux appels ont « reussi » du point de vue du programme, et
        // pourtant le second n'a pas donne ce qu'on demandait. C'est ce que
        // les exceptions d'EXC.3 permettront de dire clairement.
    }
}
