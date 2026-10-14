package be.ephec.java.demo.poo.slides;

/**
 * Slide « Ce que vous avez observe » (POO, section 6).
 *
 * Java passe toujours une copie. Pour un int, la copie de la valeur ; pour un
 * objet, la copie de la reference : la methode peut modifier l'objet partage,
 * mais pas faire designer un autre objet a la variable de l'appelant.
 */
public class CeQueVousAvezObserve {

    static void modifier(int n, Livre livre) {
        n = 99;                           // change la copie
        livre.setAnneeDeParution(2000);   // change l'objet partage
        livre = new Livre("Autre", 1);    // la copie designe un autre objet
    }

    public static void main(String[] args) {
        int n = 5;
        Livre dune = new Livre("Dune", 1965);
        modifier(n, dune);
        System.out.println("n = " + n);
        System.out.println("dune = " + dune);
    }

    /* Sortie attendue :
    n = 5
    dune = Dune (2000)
    */
}
