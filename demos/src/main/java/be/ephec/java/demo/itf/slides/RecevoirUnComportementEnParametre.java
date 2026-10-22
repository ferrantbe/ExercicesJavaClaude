package be.ephec.java.demo.itf.slides;

/**
 * Slide « Recevoir un comportement en parametre » (ITF, section 1).
 *
 * total ne connait ni Colis ni Examen : seulement ce qu'ils promettent.
 */
public class RecevoirUnComportementEnParametre {

    public static double total(Mesurable[] choses) {
        double somme = 0;
        for (Mesurable chose : choses) {
            somme += chose.mesure();
        }
        return somme;
    }

    public static void main(String[] args) {
        Mesurable[] colis = { new Colis(1250), new Colis(800), new Colis(450) };
        Mesurable[] examens = { new Examen(12), new Examen(17) };
        System.out.println("Poids total : " + total(colis));
        System.out.println("Points total : " + total(examens));
    }

    /* Sortie attendue :
    Poids total : 2500.0
    Points total : 29.0
    */
}
