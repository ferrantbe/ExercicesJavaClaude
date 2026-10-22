package be.ephec.java.demo.exc.slides;

/**
 * Slide « Lever avec throw, declarer avec throws » (EXC, section 2).
 *
 * La methode appeler est dans Ascenseur. Parce qu'elle declare
 * EtageInaccessibleException, le main doit l'attraper : retirez le try,
 * et le programme ne compile plus.
 */
public class LeverEtDeclarer {

    public static void main(String[] args) {
        Ascenseur ascenseur = new Ascenseur(5);
        try {
            ascenseur.appeler(4);
            System.out.println("Etage courant : " + ascenseur.etageCourant());
            ascenseur.appeler(-1);
        } catch (EtageInaccessibleException e) {
            System.out.println("Refus : " + e.getMessage());
        }
    }

    /* Sortie attendue :
    Etage courant : 4
    Refus : Etage -1 hors de l'intervalle 0 a 5
    */
}
