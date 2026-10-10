package be.ephec.java.demo.tab;

import java.util.Arrays;

/**
 * DEMO TAB — etat d'ARRIVEE.
 *
 * Le nombre de velos loues, par station et par jour. Cinq stations, sept
 * jours.
 *
 * CE QUE LA DEMONSTRATION MONTRE, dans l'ordre :
 *
 *   1. un tableau de int naît rempli de zeros, pas de null ;
 *   2. println(tableau) n'affiche pas ce qu'on croit ;
 *   3. length est un CHAMP pour un tableau, une METHODE pour une String ;
 *   4. passer un tableau a une methode ne le copie pas ;
 *   5. un tableau a deux dimensions est un tableau DE tableaux, et ses
 *      lignes peuvent avoir des longueurs differentes.
 */
public class Demo {

    private static final String[] JOURS =
            {"lun", "mar", "mer", "jeu", "ven", "sam", "dim"};

    public static void main(String[] args) {

        // --- 1. Les valeurs par defaut -------------------------------
        int[] lundi = new int[5];
        System.out.println("Une case jamais remplie : " + lundi[0]);

        // --- 2. Ce que println fait d'un tableau ---------------------
        System.out.println("Sans Arrays : " + lundi);
        System.out.println("Avec Arrays : " + Arrays.toString(lundi));

        // --- 3. length : champ ici, methode la ------------------------
        String nom = "Gare Centrale";
        System.out.println("Cases du tableau : " + lundi.length);   // sans ()
        System.out.println("Lettres du nom   : " + nom.length());   // avec ()

        // --- 4. Un tableau se passe PAR REFERENCE ---------------------
        int[] releve = {12, 8, 21, 5, 17};
        System.out.println("Avant  : " + Arrays.toString(releve));
        remettreAZero(releve);
        System.out.println("Apres  : " + Arrays.toString(releve));

        int[] copie = Arrays.copyOf(releve, releve.length);
        copie[0] = 999;
        System.out.println("Copie modifiee, original : " + Arrays.toString(releve));

        // --- 5. Deux dimensions ---------------------------------------
        int[][] semaine = new int[5][7];
        semaine[0][0] = 12;
        semaine[4][6] = 3;

        System.out.println("Lignes   : " + semaine.length);
        System.out.println("Colonnes : " + semaine[0].length);

        afficher(semaine);
        System.out.println("Total de la semaine : " + total(semaine));

        // --- 6. Des lignes de longueurs differentes -------------------
        int[][] irregulier = new int[3][];
        irregulier[0] = new int[]{1, 2};
        irregulier[1] = new int[]{1, 2, 3, 4};
        irregulier[2] = new int[]{7};

        System.out.println("Irregulier : " + Arrays.deepToString(irregulier));
    }

    /** Elle ne rend rien, et pourtant elle change le tableau de l'appelant. */
    private static void remettreAZero(int[] tableau) {
        for (int i = 0; i < tableau.length; i++) {
            tableau[i] = 0;
        }
    }

    private static void afficher(int[][] semaine) {
        System.out.println("        " + String.join("  ", JOURS));
        for (int station = 0; station < semaine.length; station++) {
            StringBuilder ligne = new StringBuilder("Stat." + station + " ");
            for (int valeur : semaine[station]) {
                ligne.append(String.format("%4d ", valeur));
            }
            System.out.println(ligne);
        }
    }

    /** Un for-each sur un int[][] parcourt des int[], pas des int. */
    private static int total(int[][] semaine) {
        int somme = 0;
        for (int[] station : semaine) {
            for (int valeur : station) {
                somme += valeur;
            }
        }
        return somme;
    }
}
