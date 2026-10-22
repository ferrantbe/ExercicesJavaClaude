package be.ephec.java.demo.tmp.slides;

import java.time.LocalDateTime;

/** Slide « Les deux a la fois » (TMP, section 1). */
public class LesDeuxALaFois {

    public static void main(String[] args) {
        LocalDateTime rdv = LocalDateTime.of(2027, 1, 19, 18, 0);
        System.out.println(rdv);
        System.out.println(rdv.toLocalDate());   // 2027-01-19
        System.out.println(rdv.toLocalTime());   // 18:00
    }

    /* Sortie attendue :
    2027-01-19T18:00
    2027-01-19
    18:00
    */
}
