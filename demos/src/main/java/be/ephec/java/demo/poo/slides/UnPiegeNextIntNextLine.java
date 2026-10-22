package be.ephec.java.demo.poo.slides;

import java.util.Scanner;

/**
 * Slide « Un piege : nextInt suivi de nextLine » (POO, section 5).
 *
 * Tapez une annee, puis Entree : le titre est lu aussitot, et il est vide.
 * nextInt a laisse la fin de ligne, que nextLine prend pour une ligne vide.
 */
public class UnPiegeNextIntNextLine {

    public static void main(String[] args) {
        Scanner clavier = new Scanner(System.in);
        System.out.print("Annee : ");
        int annee = clavier.nextInt();       // lit 1965, laisse la fin de ligne
        System.out.print("Titre : ");
        String titre = clavier.nextLine();   // retourne "" sans attendre
        System.out.println();
        System.out.println("Annee = " + annee + ", titre = [" + titre + "]");
    }

    /* Entree :
    1965
    Dune
    */

    /* Sortie attendue :
    Annee : Titre :
    Annee = 1965, titre = []
    */
}
