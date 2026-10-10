package be.ephec.java.col.e01;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.Scanner;

/**
 * COL.1 — CORRIGE.
 *
 * DEUX CONSTANTES PLUTOT QUE DEUX NOMBRES DANS LE CODE.
 *
 * La version naive ecrivait hasard.nextInt(1001), et le lecteur devait
 * deviner d'ou sortait ce 1001 — et pourquoi pas 1000. Les bornes sont
 * maintenant nommees, et le 1001 se calcule : nextInt attend un nombre
 * de valeurs possibles, pas une borne haute.
 *
 * Le benefice n'est pas seulement la lisibilite. Les memes constantes
 * servent a annoncer l'intervalle a l'utilisateur : le message ne peut
 * plus mentir sur ce que le programme fait. Voir CC-NOM.7.
 */
public class Programme {

    private static final int MINIMUM = 0;
    private static final int MAXIMUM = 1000;

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Random hasard = new Random();

        System.out.printf("Ce programme va generer des nombres entre %d et %d.%n",
                MINIMUM, MAXIMUM);

        System.out.print("Combien de nombres ? ");
        int n = scanner.nextInt();

        List<Integer> nombres = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            // nextInt(bound) rend un entier de 0 inclus a bound EXCLU.
            // Pour couvrir MINIMUM..MAXIMUM inclus, il faut donc autant de
            // valeurs que l'intervalle en compte, puis decaler.
            nombres.add(MINIMUM + hasard.nextInt(MAXIMUM - MINIMUM + 1));
        }

        System.out.println("Liste triee   : " + Tri.triee(nombres));
        System.out.println("Ensemble trie : " + Tri.ensembleTrie(nombres));

        scanner.close();
    }
}
