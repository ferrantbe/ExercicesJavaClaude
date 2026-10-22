package be.ephec.java.demo.poo.slides;

/** Slide « Les constantes » (POO, section 4). */
public class LesConstantes {

    static class Facture {
        public static final double TVA = 0.21;
        public static final int JOURS_DE_PAIEMENT = 30;
    }

    public static void main(String[] args) {
        double prix = 100 * (1 + Facture.TVA);
        System.out.println("Prix TVA comprise : " + prix);
        System.out.println("A payer sous " + Facture.JOURS_DE_PAIEMENT + " jours");
        // Facture.TVA = 0.06;    // refuse : une constante ne change pas
    }

    /* Sortie attendue :
    Prix TVA comprise : 121.0
    A payer sous 30 jours
    */
}
