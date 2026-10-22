package be.ephec.java.demo.itf.slides;

/**
 * Slides « Une classe s'engage » et « Le type peut etre l'interface » (ITF,
 * section 1).
 *
 * Par une variable de type Mesurable, on n'atteint que ce que Mesurable
 * promet. Retirez les barres de commentaire : deux refus du compilateur.
 */
public class LeTypePeutEtreLInterface {

    public static void main(String[] args) {
        Mesurable m = new Colis(1250);
        System.out.println(m.mesure());        // OK

        // Mesurable autre = new Mesurable();     // erreur de compilation
        // System.out.println(m.destinataire());  // erreur de compilation

        Mesurable e = new Examen(17);
        System.out.println(e.mesure());
    }

    /* Sortie attendue :
    1250.0
    17.0
    */
}
