package be.ephec.java.demo.tmp.slides;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

/**
 * Slides « De la date vers le texte » et « Du texte vers la date » (TMP,
 * section 8). Le meme formateur sert dans les deux sens.
 */
public class UneDateEtSonTexte {

    public static void main(String[] args) {
        DateTimeFormatter fr = DateTimeFormatter.ofPattern("dd/MM/yyyy");

        LocalDate date = LocalDate.of(2027, 1, 19);
        String texte = date.format(fr);    // "19/01/2027"
        System.out.println(texte);

        LocalDate d = LocalDate.parse("19/01/2027", fr);
        System.out.println(d);
        try {
            LocalDate e = LocalDate.parse("19-01-2027", fr);   // exception
        } catch (DateTimeParseException ex) {
            System.out.println("Refus : " + ex.getMessage());
        }
    }

    /* Sortie attendue :
    19/01/2027
    2027-01-19
    Refus : Text '19-01-2027' could not be parsed at index 2
    */
}
