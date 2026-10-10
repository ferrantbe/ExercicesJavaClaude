package be.ephec.java.pkg.e01;

/**
 * PKG.1 — CORRIGE.
 *
 * Inspecteur est dans le meme package que Coffre. Il voit donc tout,
 * SAUF ce qui est declare private.
 *
 * Retenez la regle : private ne protege pas de "l'exterieur de l'objet",
 * il protege de "l'exterieur de la classe". Un autre objet Coffre y aurait
 * acces ; Inspecteur, non.
 */
public class Inspecteur {

    public String membresAccessibles() {
        // codeSecret et ouvrirLeMecanisme sont private : hors de portee.
        return "numero, proprietaire, verifierLeNumero, decrire";
    }

    public void experimenter() {
        Coffre coffre = new Coffre();

        // Refuse : "codeSecret has private access in Coffre"
        // System.out.println(coffre.codeSecret);

        System.out.println(coffre.numero);          // visibilite par defaut : OK
        System.out.println(coffre.proprietaire);    // public : OK

        // Refuse : "ouvrirLeMecanisme() has private access in Coffre"
        // System.out.println(coffre.ouvrirLeMecanisme());

        System.out.println(coffre.verifierLeNumero());
        System.out.println(coffre.decrire());
    }
}
