package be.ephec.java.exc.e04;

import java.util.Scanner;

/**
 * EXC.4 — CORRIGE.
 *
 * POURQUOI CE PROGRAMME BOUCLE. L'interet de l'exercice est de VOIR les
 * deux exceptions se declencher, et de comparer ce qui se passe selon les
 * valeurs saisies. Redemarrer le programme entre chaque essai decourage
 * l'experimentation — or c'est l'experimentation qui enseigne ici.
 *
 * La taille, elle, est demandee une seule fois : on veut pouvoir essayer
 * plusieurs positions dans le MEME tableau, ce qui est justement ce qui
 * fait comprendre ou sont les limites.
 */
public class Programme {

    private static final int QUITTER = -6;

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Ce programme cree un tableau d'entiers et tente d'y");
        System.out.println("placer la valeur 12 a la position que vous indiquez.");
        System.out.println();
        System.out.println("Deux choses peuvent mal tourner, et c'est le sujet :");
        System.out.println("  - une taille negative refuse de creer le tableau ;");
        System.out.println("  - une position hors des limites refuse l'ecriture.");
        System.out.println();
        System.out.println("Essayez les deux. Le programme ne plantera pas.");
        System.out.println();

        System.out.print("Taille du tableau : ");
        int taille = scanner.nextInt();

        System.out.println();
        if (taille > 0) {
            System.out.printf("Positions valides pour cette taille : 0 a %d.%n", taille - 1);
        } else {
            // « Positions valides : 0 a -4 » n'aurait aucun sens. Un message
            // calcule doit tenir compte des valeurs qui le rendent absurde.
            System.out.println("Cette taille ne permet de creer aucun tableau :");
            System.out.println("toutes les positions echoueront, et c'est instructif.");
        }
        System.out.printf("Entrez %d pour quitter.%n%n", QUITTER);

        int position;
        do {
            System.out.print("Position ou placer 12 : ");
            position = scanner.nextInt();

            if (position != QUITTER) {
                System.out.println("   " + Tableau.placerDouze(taille, position));
            }
        } while (position != QUITTER);

        System.out.println("Au revoir.");

        // Sans les try de placerDouze, une taille de -3 aurait affiche :
        //   Exception in thread "main" java.lang.NegativeArraySizeException: -3
        // et le programme se serait arrete la, sans jamais atteindre cette
        // ligne ni fermer le Scanner. C'est tout l'interet de les attraper :
        // la boucle survit a l'erreur, et l'utilisateur peut reessayer.

        scanner.close();
    }
}
