package be.ephec.java.tab.e02;

import java.util.Scanner;

/** TAB.2 — CORRIGE. */
public class Programme {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Ce programme calcule un triangle de Pascal dont vous");
        System.out.println("specifiez la taille.");
        System.out.println();

        System.out.print("Nombre de lignes : ");
        int n = scanner.nextInt();

        // Deux for-each imbriquees. La premiere parcourt des int[], puisqu'un
        // int[][] est un tableau de tableaux ; la seconde parcourt des int.
        for (int[] ligne : Pascal.triangle(n)) {
            for (int nombre : ligne) {
                System.out.print(nombre + " ");
            }
            System.out.println();
        }

        scanner.close();
    }
}
