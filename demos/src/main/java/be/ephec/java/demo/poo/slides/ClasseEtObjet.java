package be.ephec.java.demo.poo.slides;

/** Slide « Classe et objet » (POO, section 2) : new cree l'objet, la variable le designe. */
public class ClasseEtObjet {

    public static void main(String[] args) {
        LivreAChampsPublics dune = new LivreAChampsPublics();
        dune.titre = "Dune";
        dune.auteur = "Frank Herbert";
        dune.anneeDeParution = 1965;

        LivreAChampsPublics fondation = new LivreAChampsPublics();   // un second objet
        fondation.titre = "Fondation";

        System.out.println(dune.titre + ", " + dune.auteur + ", " + dune.anneeDeParution);
        System.out.println(fondation.titre + ", " + fondation.auteur + ", " + fondation.anneeDeParution);
    }

    /* Sortie attendue :
    Dune, Frank Herbert, 1965
    Fondation, null, 0
    */
}
