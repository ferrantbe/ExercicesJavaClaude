package be.ephec.java.tmp.e04;

import java.time.LocalDate;

/**
 * TMP.4 — CORRIGE.
 *
 * plusMonths garde le jour du mois quand c'est possible, et le rabote au
 * dernier jour disponible sinon. Le 31 janvier plus un mois donne donc le
 * 28 fevrier — ou le 29 en annee bissextile.
 *
 * Consequence : l'addition des mois n'est pas associative.
 *
 *     31/01 + 2 mois          -> 31/03   (le 31 est conserve)
 *     31/01 + 1 mois + 1 mois -> 28/03   (le 31 a ete perdu des la 1re etape)
 *
 * Ce n'est pas un defaut du JDK : aucune autre reponse ne serait meilleure.
 * Retenez seulement qu'ajouter des mois n'est pas une addition ordinaire, et
 * verifiez toujours vos echeances sur une fin de mois.
 */
public class Echeancier {

    public static LocalDate echeance(LocalDate depart, int mois) {
        return depart.plusMonths(mois);
    }

    public static boolean memeResultatMoisParMois(LocalDate depart, int mois) {
        LocalDate unParUn = depart;
        for (int i = 0; i < mois; i++) {
            unParUn = unParUn.plusMonths(1);
        }
        return unParUn.equals(echeance(depart, mois));
    }
}
