package be.ephec.java.col.e03;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;

/**
 * COL.3 — CORRIGE.
 *
 * Le point a retenir : lire ne sait pas d'ou vient le Scanner. Il pourrait
 * venir d'un fichier, du clavier ou d'une chaine — le code est le meme.
 * C'est ce qui permet a la classe de test de lui passer un Scanner sur une
 * chaine et de verifier le resultat sans depender d'aucun fichier.
 */
public class Noms {

    public static List<String> lire(Scanner scanner) {
        List<String> noms = new ArrayList<>();
        while (scanner.hasNextLine()) {
            noms.add(scanner.nextLine());
        }
        return noms;
    }

    public static List<String> triee(List<String> noms) {
        List<String> copie = new ArrayList<>(noms);
        Collections.sort(copie);
        return copie;
    }
}
