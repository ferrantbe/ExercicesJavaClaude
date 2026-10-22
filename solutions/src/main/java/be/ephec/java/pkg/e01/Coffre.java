package be.ephec.java.pkg.e01;

/** PKG.1 — CORRIGE. Classe fournie, identique a l'enonce. */
public class Coffre {

    private String codeSecret = "1234";
    String numero = "C-07";
    public String proprietaire = "Ada";

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
