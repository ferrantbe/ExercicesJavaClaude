package be.ephec.java.fx.e09;

/**
 * FX.9 — A COMPLETER.
 *
 * Le MODELE de l'architecture MVC : il porte la logique metier, et rien
 * d'autre.
 *
 * Regardez ce qu'il ignore. Il ne sait pas qu'il existe une fenetre, ni
 * des boutons, ni un affichage. Il recoit deux nombres et un operateur,
 * il rend un resultat.
 *
 * C'est ce qui le rend TESTABLE : vous pourriez ecrire une classe de test
 * JUnit pour cette classe-ci, alors que c'est impossible pour la vue.
 * Voir CC-MET.7, et la demonstration JUN.
 */
public class Modele {

    /**
     * Applique l'operateur aux deux nombres.
     *
     * Les operateurs sont les CARACTERES affiches sur les boutons :
     * "+", "-", "x" et "/". Attention, ce ne sont pas forcement ceux
     * que Java utilise.
     *
     * Deux cas particuliers a traiter :
     *   la division par zero ;
     *   un operateur inconnu.
     *
     * L'enonce precise ce que la calculatrice doit afficher dans ces
     * deux cas. Ne rendez pas 0 en silence.
     */
    public long calculer(long premier, long second, String operateur) {
        throw new UnsupportedOperationException("calculer n'est pas encore implementee");
    }
}
