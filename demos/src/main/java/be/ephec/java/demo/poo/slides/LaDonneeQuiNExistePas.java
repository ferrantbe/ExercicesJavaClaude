package be.ephec.java.demo.poo.slides;

/**
 * Slide « La donnee qui n'existe pas » (POO, section 3).
 *
 * L'age n'est pas stocke : il est calcule a chaque appel, et reste donc juste
 * d'une annee a l'autre.
 */
public class LaDonneeQuiNExistePas {

    public static void main(String[] args) {
        Livre dune = new Livre("Dune", 1965);
        System.out.println("Dune a " + dune.getAge() + " ans");
    }

    /* Sortie attendue :
    ~Dune a \d+ ans
    */
}
