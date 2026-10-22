package be.ephec.java.demo.poo.slides;

/**
 * Slide « La methode toString » (POO, section 2).
 *
 * println et la concatenation appellent toString d'eux-memes. Pour voir ce
 * que Java affiche sans elle, retirez toString de Livre : vous obtiendrez
 * quelque chose comme Livre@1b6d3586.
 */
public class LaMethodeToString {

    public static void main(String[] args) {
        Livre dune = new Livre("Dune", 1965);
        System.out.println(dune);         // Dune (1965)
        String texte = "Lu : " + dune;    // Lu : Dune (1965)
        System.out.println(texte);
    }

    /* Sortie attendue :
    Dune (1965)
    Lu : Dune (1965)
    */
}
