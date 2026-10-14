package be.ephec.java.demo.tmp.slides;

import java.time.LocalDate;

/**
 * Slide « Decaler une date » (TMP, section 3).
 *
 * plusWeeks ne modifie pas rendezVous : une LocalDate ne change jamais, et la
 * methode retourne une nouvelle date, qu'il faut recuperer.
 */
public class DecalerUneDate {

    public static void main(String[] args) {
        LocalDate rendezVous = LocalDate.of(2027, 1, 19);

        rendezVous.plusWeeks(1);
        System.out.println(rendezVous);   // ?

        LocalDate reporte = rendezVous.plusWeeks(1);
        System.out.println(reporte);
    }

    /* Sortie attendue :
    2027-01-19
    2027-01-26
    */
}
