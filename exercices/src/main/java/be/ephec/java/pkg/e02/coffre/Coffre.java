package be.ephec.java.pkg.e02.coffre;

/**
 * PKG.2 — A COMPLETER.
 *
 * Exactement la meme classe qu'en PKG.1, mais elle vit maintenant seule dans
 * son package. Le controle exterieur a besoin de lire le numero — sans que le
 * champ devienne public pour autant.
 */
public class Coffre {

    private String codeSecret = "1234";
    String numero = "C-07";
    public String proprietaire = "Ada";

    // TODO : ajoutez ici ce qu'il faut pour que ControleExterne puisse lire
    //        le numero. Le champ numero doit rester tel quel : ne le passez
    //        surtout pas en public.

    public String decrire() {
        return "Coffre " + numero + " de " + proprietaire;
    }
}
