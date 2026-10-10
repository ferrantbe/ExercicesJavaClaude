package be.ephec.java.pkg.e02.controle;

import be.ephec.java.pkg.e02.coffre.Coffre;

/**
 * PKG.2 — A COMPLETER.
 *
 * Cette classe vit dans un AUTRE package que Coffre. Elle ne voit donc plus
 * les memes choses qu'Inspecteur en PKG.1.
 */
public class ControleExterne {

    /**
     * Rend le numero du coffre, lu depuis l'exterieur du package.
     */
    public String numeroDu(Coffre coffre) {
        throw new UnsupportedOperationException("numeroDu n'est pas encore implementee");
    }

    /**
     * Decommentez, comparez avec PKG.1, et notez ce qui a change.
     */
    public void experimenter() {
        Coffre coffre = new Coffre();

        // System.out.println(coffre.codeSecret);
        // System.out.println(coffre.numero);
        // System.out.println(coffre.proprietaire);
        // System.out.println(coffre.decrire());
    }
}
