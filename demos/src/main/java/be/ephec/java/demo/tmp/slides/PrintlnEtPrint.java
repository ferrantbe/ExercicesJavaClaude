package be.ephec.java.demo.tmp.slides;

import java.util.Locale;

/**
 * Slides « println et print », « printf : un gabarit et des valeurs » et « La
 * locale decide du separateur » (TMP, section 4).
 *
 * Essayez aussi System.out.printf("%,d%n", 1157479200) sans Locale.US : le
 * separateur depend alors de la langue de votre machine (une espace en
 * francais, une virgule en anglais).
 */
public class PrintlnEtPrint {

    public static void main(String[] args) {
        System.out.println("Bonjour");   // affiche et passe a la ligne
        System.out.print("Bonjour");     // affiche, sans passer a la ligne
        System.out.println();

        System.out.print("A");
        System.out.print("B");           // => AB
        System.out.println();

        System.out.printf("%s a %d ans%n", "Max", 21);

        System.out.printf(Locale.US, "%,d%n", 1157479200);   // partout : 1,157,479,200
        String s = String.format(Locale.US, "%,d", 1157479200);
        System.out.println("Retourne : " + s);
    }

    /* Sortie attendue :
    Bonjour
    Bonjour
    AB
    Max a 21 ans
    1,157,479,200
    Retourne : 1,157,479,200
    */
}
