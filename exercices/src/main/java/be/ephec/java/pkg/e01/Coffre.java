package be.ephec.java.pkg.e01;

/**
 * PKG.1 — Cette classe vous est FOURNIE. N'y touchez pas.
 *
 * Elle expose trois champs et trois methodes, chacun avec une visibilite
 * differente. Tout le travail se passe dans Inspecteur.
 */
public class Coffre {

    private String codeSecret = "1234";     // visible de la classe seule
    String numero = "C-07";                 // visible du package (pas de mot-cle)
    public String proprietaire = "Ada";     // visible de partout

    private String ouvrirLeMecanisme() {
        return "mecanisme ouvert";
    }

    String verifierLeNumero() {
        return "numero " + numero + " verifie";
    }

    public String decrire() {
        return "Coffre " + numero + " de " + proprietaire;
    }
}
