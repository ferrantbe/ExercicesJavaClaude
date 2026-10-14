package be.ephec.java.demo.enu.slides;

/**
 * Slide « Trois couleurs, pas une de plus » (ENU, section 1).
 *
 * Avec des constantes int, rien n'empeche une couleur 7. Comparez avec
 * DeclarerUneEnumeration, ou le compilateur refuse.
 */
public class TroisCouleursPasUneDePlus {

    static final int VERT   = 0;
    static final int ORANGE = 1;
    static final int ROUGE  = 2;

    static class Feu {
        private int couleur;

        void setCouleur(int couleur) {
            this.couleur = couleur;
        }

        int getCouleur() {
            return couleur;
        }
    }

    public static void main(String[] args) {
        Feu feu = new Feu();
        feu.setCouleur(ROUGE);
        feu.setCouleur(7);   // compile sans broncher
        System.out.println("Couleur du feu : " + feu.getCouleur());
    }

    /* Sortie attendue :
    Couleur du feu : 7
    */
}
