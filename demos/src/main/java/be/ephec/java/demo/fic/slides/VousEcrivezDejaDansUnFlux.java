package be.ephec.java.demo.fic.slides;

import java.io.PrintStream;
import java.util.Scanner;

/**
 * Slide « Vous ecrivez deja dans un flux » (FIC, section 1).
 * Tapez une ligne quand le programme la demande.
 */
public class VousEcrivezDejaDansUnFlux {

    public static void main(String[] args) {
        // System.out est un flux de sortie, ouvert pour vous
        PrintStream console = System.out;
        console.println("Uccle : 12 degres");

        // System.in est un flux d'entree, lu par le Scanner
        Scanner clavier = new Scanner(System.in);
        console.print("Votre station : ");
        String saisie = clavier.nextLine();
        console.println();
        console.println("Lu : " + saisie);
    }

    /* Entree :
    Ostende
    */

    /* Sortie attendue :
    Uccle : 12 degres
    Votre station :
    Lu : Ostende
    */
}
