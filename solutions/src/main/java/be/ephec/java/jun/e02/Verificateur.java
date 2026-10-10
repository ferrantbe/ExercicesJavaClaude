package be.ephec.java.jun.e02;

/**
 * JUN.2 — CORRIGE.
 *
 * Les cinq verifications correspondent exactement aux cinq clauses du
 * contrat. C'est la premiere lecon de l'exercice : on ne teste pas « la
 * classe », on teste chaque promesse qu'elle fait, une par une.
 *
 * La seconde lecon est dans ce qu'on aurait pu oublier. Verifier qu'un
 * retrait excessif leve l'exception ne suffit pas : TirelireQuiVideTout la
 * leve correctement, et se trompe ailleurs. Il faut aussi verifier l'ETAT
 * apres chaque operation, y compris apres celle qui echoue.
 *
 * Chaque implementation defectueuse est demasquee par une verification
 * differente :
 *
 *   TirelireSansGarde        ne leve jamais l'exception   -> point 4
 *   TirelireQuiVideTout      vide tout au lieu du montant -> point 3
 *   TirelireQuiPerdLeDepot   ignore le premier depot      -> point 2
 *
 * Un verificateur auquel il manque une clause laisse passer une de ces
 * trois-la. C'est precisement ce qui arrive a une classe de test incomplete,
 * et c'est invisible tant qu'on ne la confronte pas a du code fautif.
 */
public class Verificateur {

    private static final double PRECISION = 0.001;

    public static boolean estCorrecte(Tirelire tirelire) {
        // 1. une tirelire neuve est vide
        if (Math.abs(tirelire.getContenu()) > PRECISION) {
            return false;
        }

        // 2. un depot augmente le contenu d'autant
        tirelire.depot(50);
        if (Math.abs(tirelire.getContenu() - 50) > PRECISION) {
            return false;
        }

        // 3. un retrait possible diminue le contenu d'autant
        try {
            tirelire.retrait(20);
        } catch (ContenuInsuffisant e) {
            return false;   // ce retrait-la etait possible : le refuser est un defaut
        }
        if (Math.abs(tirelire.getContenu() - 30) > PRECISION) {
            return false;
        }

        // 4. un retrait trop grand leve l'exception
        try {
            tirelire.retrait(1000);
            return false;   // aucune exception : la garde manque
        } catch (ContenuInsuffisant attendue) {
            // c'est le comportement voulu, on continue
        }

        // 5. et dans ce cas, le contenu n'a pas bouge
        return Math.abs(tirelire.getContenu() - 30) <= PRECISION;
    }
}
