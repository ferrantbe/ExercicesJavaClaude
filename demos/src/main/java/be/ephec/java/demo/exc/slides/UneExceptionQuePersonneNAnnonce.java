package be.ephec.java.demo.exc.slides;

/**
 * Slide « Une exception que personne n'annonce » (EXC, section 4).
 *
 * Integer.parseInt peut lever NumberFormatException, une exception non
 * controlee : le compilateur ne demande rien, et le programme s'arrete.
 */
public class UneExceptionQuePersonneNAnnonce {

    public static void main(String[] args) {
        String saisie = "douze";
        int etage = Integer.parseInt(saisie);   // compile sans rien dire
        System.out.println("Jamais affiche : " + etage);
    }

    /* Sortie attendue :
    Exception in thread "main" java.lang.NumberFormatException: For input string: "douze"
    */
}
