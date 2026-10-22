package be.ephec.java.demo.poo.slides;

/** Slide « Ce qu'offrent les wrappers » (POO, section 7). */
public class CeQuOffrentLesWrappers {

    public static void main(String[] args) {
        int n = Integer.parseInt("42");
        int plusGrand = Integer.MAX_VALUE;
        boolean chiffre = Character.isDigit('7');

        Integer boite = 5;     // autoboxing
        int valeur = boite;    // unboxing

        System.out.println(n + 1);
        System.out.println(plusGrand);
        System.out.println(plusGrand + 1);   // depasse : repart au plus petit int
        System.out.println(chiffre);
        System.out.println(valeur);
    }

    /* Sortie attendue :
    43
    2147483647
    -2147483648
    true
    5
    */
}
