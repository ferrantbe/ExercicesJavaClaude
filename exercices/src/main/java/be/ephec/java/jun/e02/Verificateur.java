package be.ephec.java.jun.e02;

/**
 * JUN.2 — A COMPLETER.
 *
 * Ce n'est pas encore une classe de test JUnit : c'est le RAISONNEMENT qu'une
 * classe de test met en pratique, ecrit a la main pour qu'on puisse le verifier.
 */
public class Verificateur {

    /**
     * Retourne true si la tirelire respecte son contrat, false sinon.
     *
     * Pour le savoir, il faut la faire travailler et observer :
     *   - une tirelire neuve est vide ;
     *   - un depot augmente le contenu d'autant ;
     *   - un retrait possible diminue le contenu d'autant ;
     *   - un retrait trop grand leve ContenuInsuffisant ;
     *   - et dans ce cas, le contenu n'a pas bouge.
     *
     * Trois des quatre implementations du package ont un defaut. Votre
     * verificateur doit les demasquer TOUTES, et laisser passer la bonne.
     *
     * Un verificateur qui retournerait toujours true est evidemment inutile — et
     * c'est exactement ce que fait une classe de test sans assertion.
     */
    public static boolean estCorrecte(Tirelire tirelire) {
        throw new UnsupportedOperationException("estCorrecte n'est pas encore implementee");
    }
}
