package be.ephec.java.poo.e05;

import java.util.Scanner;

/**
 * POO.5 — CORRIGE.
 *
 * Noter la separation : enBase10 contient toute la logique et ne parle ni au
 * clavier ni a l'ecran ; le main ne fait que dialoguer. C'est pour cela que
 * enBase10 est testable et que le main ne l'est pas.
 */
public class Base {

    public static int enBase10(String nombre, int base) {
        // Integer.parseInt accepte une base en second parametre. Il n'y a
        // donc aucun calcul a ecrire soi-meme, et c'est le bon reflexe :
        // avant d'implementer, verifier ce que la bibliotheque offre deja.
        return Integer.parseInt(nombre, base);
    }

    private static final String ARRET = "-1";

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Ce programme convertit en base 10 un nombre ecrit");
        System.out.println("dans une autre base. Vous indiquez le nombre, puis");
        System.out.println("la base dans laquelle il est ecrit.");
        System.out.println();
        System.out.println("Exemples :  FF en base 16 vaut 255");
        System.out.println("            1010 en base 2 vaut 10");
        System.out.println();
        System.out.println("Entrez " + ARRET + " comme nombre pour quitter.");
        System.out.println();

        while (true) {
            System.out.print("Nombre a convertir : ");
            String nombre = scanner.nextLine();

            if (nombre.equals(ARRET)) {
                break;
            }

            System.out.print("Base d'ecriture (2 a 36) : ");
            // On lit une LIGNE, puis on la convertit — plutot que nextInt.
            //
            // Melanger nextInt et nextLine dans une boucle est un piege
            // classique : nextInt laisse la fin de ligne dans le tampon, et
            // le nextLine du tour suivant la ramasse et retourne une chaine
            // vide. Le programme semble alors sauter une question.
            //
            // Tout lire par nextLine evite le probleme au lieu de le
            // rattraper.
            int base = Integer.parseInt(scanner.nextLine());

            System.out.println("   " + nombre + " en base " + base
                    + " vaut " + enBase10(nombre, base) + " en base 10");
            System.out.println();
        }

        System.out.println("Au revoir.");
        scanner.close();
    }

    /*
     * POUR ALLER PLUS LOIN
     *
     * Que se passe-t-il si l'utilisateur tape "FF" en base 10, ou une base
     * de 1 ? Integer.parseInt leve une NumberFormatException, et le programme
     * s'arrete brutalement — la boucle comprise, alors qu'il aurait suffi de
     * redemander.
     *
     * C'est le comportement attendu a ce stade : on ne sait pas encore
     * attraper une exception. Mais la boucle rend le defaut visible, et c'est
     * exactement ce qui motive le module EXC — ou cet exercice revient sous la
     * forme EXC.4.
     */
}
