package be.ephec.java.abs.e03;

/**
 * ABS.3 — CORRIGE. Fournie, inchangee.
 *
 * La banque Banquier Pepere livre les MEMES informations, mais pas dans le
 * meme ordre :
 *     communication, compte, montant
 *
 * C'est tout le probleme : deux fournisseurs, un seul traitement.
 */
public class BanquierPepereDataProvider {

    public String[][] provideBankData() {
        return new String[][]{
                {"Assurance", "BE44 1111 2222 3333", "-89.90"},
                {"Remboursement", "BE44 1111 2222 3333", "25.00"}
        };
    }
}
