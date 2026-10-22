package be.ephec.java.demo.enu.slides;

/**
 * Slides « Aiguiller : la forme classique », « la forme a fleches », « Un
 * switch qui retourne une valeur » et « Tous les cas, sans oubli » (ENU,
 * section 4).
 *
 * Retirez un cas du dernier switch : le compilateur refuse, faute de default.
 */
public class Aiguiller {

    static void classique(Jour jour) {
        switch (jour) {
            case SAMEDI:
            case DIMANCHE:
                System.out.println("Repos");
                break;
            default:
                System.out.println("Travail");
        }
    }

    static void aFleches(Jour jour) {
        switch (jour) {
            case SAMEDI, DIMANCHE -> System.out.println("Repos");
            default               -> System.out.println("Travail");
        }
    }

    static String message(Jour jour) {
        return switch (jour) {
            case SAMEDI, DIMANCHE -> "Repos";
            case VENDREDI         -> "Presque";
            default               -> "Travail";
        };
    }

    static String consigne(CouleurDeFeu couleur) {
        return switch (couleur) {
            case VERT   -> "Passez";
            case ORANGE -> "Ralentissez";
            case ROUGE  -> "Arretez";
        };
    }

    public static void main(String[] args) {
        classique(Jour.DIMANCHE);
        aFleches(Jour.MARDI);
        System.out.println(message(Jour.VENDREDI));
        for (CouleurDeFeu c : CouleurDeFeu.values()) {
            System.out.println(c + " : " + consigne(c));
        }
    }

    /* Sortie attendue :
    Repos
    Travail
    Presque
    VERT : Passez
    ORANGE : Ralentissez
    ROUGE : Arretez
    */
}
