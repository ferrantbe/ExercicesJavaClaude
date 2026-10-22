package be.ephec.java.pkg.e01;

/**
 * PKG.1 — A COMPLETER.
 *
 * Inspecteur vit dans LE MEME package que Coffre.
 * Determinez ce qu'il peut atteindre.
 */
public class Inspecteur {

    /**
     * Retourne la liste des membres de Coffre que CETTE classe peut atteindre,
     * separes par des virgules, dans l'ordre de declaration :
     *
     *   codeSecret, numero, proprietaire, ouvrirLeMecanisme, verifierLeNumero, decrire
     *
     * Ne retournez que ceux qui sont reellement accessibles.
     */
    public String membresAccessibles() {
        throw new UnsupportedOperationException("membresAccessibles n'est pas encore implementee");
    }

    /**
     * Decommentez les lignes une par une et notez celles que le compilateur
     * refuse. C'est ce constat, et lui seul, qui donne la reponse ci-dessus.
     */
    public void experimenter() {
        Coffre coffre = new Coffre();

        // System.out.println(coffre.codeSecret);
        // System.out.println(coffre.numero);
        // System.out.println(coffre.proprietaire);
        // System.out.println(coffre.ouvrirLeMecanisme());
        // System.out.println(coffre.verifierLeNumero());
        // System.out.println(coffre.decrire());
    }
}
