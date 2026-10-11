package be.ephec.java.fx.e09;

/**
 * FX.9 — CORRIGE.
 *
 * Le modele est la seule des trois classes qui ne connaisse rien a
 * JavaFX. Aucun import, aucune reference a un composant.
 *
 * C'est ce qui le rend testable : une classe de test JUnit sur calculer()
 * s'ecrit en dix minutes, alors qu'aucun test ne peut verifier une
 * fenetre. Quand vous separez un modele d'une vue, c'est aussi cela que
 * vous gagnez.
 *
 * Notez les operateurs : "x" et "/" sont les caracteres affiches sur les
 * boutons, pas les operateurs Java. Le modele traduit.
 */
public class Modele {

    public long calculer(long premier, long second, String operateur) {
        return switch (operateur) {
            case "+" -> premier + second;
            case "-" -> premier - second;
            case "x" -> premier * second;
            case "/" -> diviser(premier, second);
            default -> throw new IllegalArgumentException(
                    "Operateur inconnu : " + operateur);
        };
    }

    /**
     * La division par zero est le seul cas ou l'enonce impose un
     * comportement particulier : la calculatrice affiche « Erreur » et se
     * remet a zero.
     *
     * On leve donc plutot que de rendre 0 : rendre 0 ferait passer une
     * erreur pour un resultat, et le controleur continuerait a calculer
     * avec une valeur fausse. Voir CC-ERR.1.
     */
    private long diviser(long premier, long second) {
        if (second == 0) {
            throw new ArithmeticException("Division par zero");
        }
        return premier / second;
    }
}
