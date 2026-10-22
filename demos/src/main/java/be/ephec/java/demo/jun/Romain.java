package be.ephec.java.demo.jun;

/**
 * DEMO JUN — etat final, apres six tours de rouge-vert.
 */
public class Romain {

    /** Retourne la valeur d'un chiffre romain isole. */
    private static int valeur(char symbole) {
        return switch (symbole) {
            case 'I' -> 1;
            case 'V' -> 5;
            case 'X' -> 10;
            case 'L' -> 50;
            case 'C' -> 100;
            case 'D' -> 500;
            case 'M' -> 1000;
            default -> throw new IllegalArgumentException("Symbole inconnu : " + symbole);
        };
    }

    /**
     * La regle soustractive : un symbole suivi d'un plus grand se
     * retranche au lieu de s'ajouter — IV vaut 4 et non 6.
     */
    public static int enChiffres(String romain) {
        int total = 0;

        for (int i = 0; i < romain.length(); i++) {
            int courant = valeur(romain.charAt(i));
            boolean suivantPlusGrand = i + 1 < romain.length()
                    && valeur(romain.charAt(i + 1)) > courant;

            total += suivantPlusGrand ? -courant : courant;
        }
        return total;
    }
}
