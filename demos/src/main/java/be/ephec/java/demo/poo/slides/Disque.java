package be.ephec.java.demo.poo.slides;

import java.util.Scanner;

/**
 * Slide « Separer le calcul du dialogue » (POO, section 7).
 *
 * aire ne lit rien et n'affiche rien : on peut la tester. main fait le
 * dialogue, et seulement lui.
 */
public class Disque {

    public static double aire(double rayon) {
        return Math.PI * rayon * rayon;
    }

    public static void main(String[] args) {
        Scanner clavier = new Scanner(System.in);
        System.out.print("Rayon : ");
        double rayon = clavier.nextDouble();
        System.out.println("Aire : " + aire(rayon));
    }

    /* Entree :
    2
    */

    /* Sortie attendue :
    Rayon : Aire : 12.566370614359172
    */
}
