package be.ephec.java.demo.tmp.slides;

import java.time.LocalDate;

/**
 * Slide « Ajouter des mois » (TMP, section 6).
 *
 * Le 31 janvier plus un mois tombe le 28 fevrier, faute de 31 fevrier. Ajouter
 * encore un mois part de ce 28 : deux pas d'un mois ne valent pas un pas de deux.
 */
public class AjouterDesMois {

    public static void main(String[] args) {
        LocalDate d = LocalDate.of(2027, 1, 31);

        System.out.println(d.plusDays(30));
        System.out.println(d.plusMonths(1));
        System.out.println(d.plusMonths(1).plusMonths(1));   // ?
        System.out.println(d.plusMonths(2));                 // ?
    }

    /* Sortie attendue :
    2027-03-02
    2027-02-28
    2027-03-28
    2027-03-31
    */
}
