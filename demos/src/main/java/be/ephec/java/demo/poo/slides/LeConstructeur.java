package be.ephec.java.demo.poo.slides;

/**
 * Slide « Le constructeur » (POO, section 2).
 *
 * Retirez les barres de commentaire devant la derniere ligne : le programme ne
 * compile plus, car Livre n'a plus de constructeur sans parametre.
 */
public class LeConstructeur {

    public static void main(String[] args) {
        Livre dune = new Livre("Dune", 1965);
        System.out.println(dune.getTitre() + " paru en " + dune.getAnneeDeParution());
        // Livre vide = new Livre();     // refuse : ce constructeur n'existe plus
    }

    /* Sortie attendue :
    Dune paru en 1965
    */
}
