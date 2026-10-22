package be.ephec.java.pkg.e02.controle;

import be.ephec.java.pkg.e02.coffre.Coffre;

/** PKG.2 — CORRIGE. */
public class ControleExterne {

    public String numeroDu(Coffre coffre) {
        // Le champ lui-meme est hors de portee : on passe par l'accesseur.
        return coffre.getNumero();
    }

    public void experimenter() {
        Coffre coffre = new Coffre();

        // Refuse : private, comme en PKG.1.
        // System.out.println(coffre.codeSecret);

        // Refuse ICI, alors que PKG.1 l'acceptait : la visibilite par defaut
        // s'arrete a la frontiere du package. C'est le seul changement entre
        // les deux exercices, et il suffit a tout modifier.
        // System.out.println(coffre.numero);

        System.out.println(coffre.proprietaire);   // public : OK partout
        System.out.println(coffre.decrire());      // public : OK partout
    }
}
