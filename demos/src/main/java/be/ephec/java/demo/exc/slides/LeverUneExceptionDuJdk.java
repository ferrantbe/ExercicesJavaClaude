package be.ephec.java.demo.exc.slides;

/**
 * Slide « Lever une exception du JDK » (EXC, section 4).
 *
 * Le constructeur d'Ascenseur refuse un dernier etage negatif avec
 * IllegalArgumentException, une exception du JDK : inutile d'en creer une.
 */
public class LeverUneExceptionDuJdk {

    public static void main(String[] args) {
        Ascenseur valide = new Ascenseur(5);
        System.out.println("Dernier etage : " + valide.dernierEtage());
        try {
            new Ascenseur(-1);
        } catch (IllegalArgumentException e) {
            System.out.println("Refus : " + e.getMessage());
        }
    }

    /* Sortie attendue :
    Dernier etage : 5
    Refus : Le dernier etage doit etre positif ou nul, pas -1
    */
}
