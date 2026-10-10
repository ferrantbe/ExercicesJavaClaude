package be.ephec.java.pkg.e02.coffre;

/**
 * PKG.2 — CORRIGE.
 *
 * Le champ numero n'a pas bouge : il reste en visibilite par defaut, donc
 * invisible depuis un autre package. Ce qui a ete ajoute, c'est un accesseur
 * public en LECTURE SEULE.
 *
 * La difference avec un champ public est essentielle. Un champ public donne
 * a la fois le droit de lire et celui d'ecrire, a tout le monde et pour
 * toujours. Un getter ne donne que la lecture, et la classe garde la main sur
 * ce qu'elle rend.
 */
public class Coffre {

    private String codeSecret = "1234";
    String numero = "C-07";
    public String proprietaire = "Ada";

    public String getNumero() {
        return numero;
    }

    public String decrire() {
        return "Coffre " + numero + " de " + proprietaire;
    }
}
