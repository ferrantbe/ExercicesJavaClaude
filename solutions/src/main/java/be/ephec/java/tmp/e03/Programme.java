package be.ephec.java.tmp.e03;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Scanner;

/** TMP.3 — CORRIGE. */
public class Programme {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Ce programme compte le nombre de secondes ecoulees");
        System.out.println("depuis votre naissance.");
        System.out.println();

        System.out.print("Annee de naissance : ");
        int annee = scanner.nextInt();
        System.out.print("Mois (1 a 12) : ");
        int mois = scanner.nextInt();
        System.out.print("Jour : ");
        int jour = scanner.nextInt();

        LocalDate naissance = LocalDate.of(annee, mois, jour);
        long secondes = Compteur.secondesDepuis(naissance, LocalDateTime.now());

        System.out.printf("Vous avez vecu %s secondes.%n", Compteur.formater(secondes));

        // La ligne a decommenter dans l'enonce levait :
        //     UnsupportedTemporalTypeException: Unsupported unit: Seconds
        // Une LocalDate n'a pas d'heure : elle ne peut pas compter de secondes.

        scanner.close();
    }
}
