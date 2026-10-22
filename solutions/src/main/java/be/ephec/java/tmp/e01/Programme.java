package be.ephec.java.tmp.e01;

import java.time.LocalDate;
import java.util.Scanner;

/** TMP.1 — CORRIGE. */
public class Programme {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Ce programme calcule votre age et le nombre de jours");
        System.out.println("qui vous separent de votre prochain anniversaire.");
        System.out.println();

        System.out.print("Annee de naissance : ");
        int annee = scanner.nextInt();
        System.out.print("Mois (1 a 12) : ");
        int mois = scanner.nextInt();
        System.out.print("Jour : ");
        int jour = scanner.nextInt();

        LocalDate naissance = LocalDate.of(annee, mois, jour);
        LocalDate aujourdhui = LocalDate.now();

        // Le main dialogue ; tout le calcul est dans UtilitaireDates.
        System.out.printf("%d jours, soit %d semaines, %d mois ou %d ans.%n",
                UtilitaireDates.ecartEnJours(naissance, aujourdhui),
                UtilitaireDates.ecartEnSemaines(naissance, aujourdhui),
                UtilitaireDates.ecartEnMois(naissance, aujourdhui),
                UtilitaireDates.ecartEnAnnees(naissance, aujourdhui));

        scanner.close();
    }
}
