package be.ephec.java.tmp.e03;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * TMP.3 — A COMPLETER.
 *
 * En TMP.1 vous avez compte des jours. Comptez maintenant des secondes, et
 * vous allez vous heurter a une limite de LocalDate.
 */
public class Compteur {

    /**
     * Rend le nombre de secondes ecoulees entre deux instants.
     */
    public static long secondesEntre(LocalDateTime debut, LocalDateTime fin) {
        throw new UnsupportedOperationException("secondesEntre n'est pas encore implementee");
    }

    /**
     * Rend le nombre de secondes vecues par une personne, de sa naissance
     * jusqu'a l'instant donne.
     *
     * On ne connait pas son heure de naissance : comptez a partir de minuit.
     *
     * @param naissance la date de naissance, sans heure
     * @param instant   l'instant de reference, avec l'heure
     */
    public static long secondesDepuis(LocalDate naissance, LocalDateTime instant) {
        throw new UnsupportedOperationException("secondesDepuis n'est pas encore implementee");
    }

    /**
     * Rend le nombre recu avec un espace tous les trois chiffres :
     * 1157479200 devient "1 157 479 200".
     *
     * Attention : le separateur doit etre une espace ordinaire, celle de la
     * barre d'espacement. Precisez Locale.US dans votre formatage, sinon le
     * resultat dependra de la langue de la machine.
     */
    public static String formater(long nombre) {
        throw new UnsupportedOperationException("formater n'est pas encore implementee");
    }
}
