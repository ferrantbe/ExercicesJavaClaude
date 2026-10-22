package be.ephec.java.travail;

/**
 * DEPART ENU — le bouton « mode » enchaine les modes, avec trois tests.
 *
 * Ajouter un quatrieme mode demandera d'ajouter une quatrieme condition,
 * et le jour ou quelqu'un l'oubliera le lecteur restera bloque.
 */
public class Lecteur {

    private Mode mode = Mode.NORMAL;

    public Mode getMode() {
        return mode;
    }

    public void modeSuivant() {
        if (mode == Mode.NORMAL) {
            mode = Mode.ALEATOIRE;
        } else if (mode == Mode.ALEATOIRE) {
            mode = Mode.REPETITION;
        } else if (mode == Mode.REPETITION) {
            mode = Mode.NORMAL;
        }
    }
}
