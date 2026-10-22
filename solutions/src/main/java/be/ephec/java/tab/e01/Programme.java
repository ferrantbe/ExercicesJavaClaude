package be.ephec.java.tab.e01;

import java.util.Scanner;

/** TAB.1 — CORRIGE. */
public class Programme {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Ce programme genere une matrice carree contenant");
        System.out.println("les chiffres de 1 a n au carre.");
        System.out.println();

        System.out.print("Taille de la matrice : ");
        int n = scanner.nextInt();

        // Le main dialogue, Matrice calcule. Une seule ligne pour l'affichage.
        System.out.println(Matrice.enTexte(Matrice.carree(n)));

        scanner.close();
    }
}
