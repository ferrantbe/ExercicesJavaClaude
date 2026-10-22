package be.ephec.java.col.e06;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.Scanner;
import java.util.Set;

/**
 * COL.6 — CORRIGE.
 *
 * TROIS CONSTANTES, ET AUCUN NOMBRE MAGIQUE.
 *
 * Le nombre de tirages et les deux bornes etaient ecrits en clair dans
 * le code. Les nommer les rend modifiables d'un seul endroit — et
 * surtout, cela permet de les afficher : la question posee a
 * l'utilisateur annonce desormais l'intervalle, au lieu de le laisser
 * deviner. Voir CC-NOM.7.
 */
public class Programme {

    private static final int TIRAGES = 100;
    private static final int MINIMUM = 1;
    private static final int MAXIMUM = 1000;

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Random hasard = new Random();

        List<Integer> tires = new ArrayList<>();
        for (int i = 0; i < TIRAGES; i++) {
            // nextInt(bound) va de 0 inclus a bound EXCLU : on compte les
            // valeurs de l'intervalle, puis on decale sur le minimum.
            tires.add(MINIMUM + hasard.nextInt(MAXIMUM - MINIMUM + 1));
        }

        Set<Integer> distincts = Tirage.sansDoublons(tires);
        System.out.printf("%d tirages entre %d et %d : %d valeurs distinctes, %d doublons.%n",
                TIRAGES, MINIMUM, MAXIMUM, distincts.size(), Tirage.doublons(tires));

        System.out.printf("Quel nombre entre %d et %d voulez-vous chercher ? ",
                MINIMUM, MAXIMUM);
        int cherche = scanner.nextInt();

        System.out.println(Tirage.aEteTire(distincts, cherche)
                ? "Ce nombre a ete tire."
                : "Ce nombre n'est pas sorti.");

        scanner.close();
    }
}
