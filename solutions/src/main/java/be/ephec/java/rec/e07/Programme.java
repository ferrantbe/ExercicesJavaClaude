package be.ephec.java.rec.e07;

import java.util.ArrayList;
import java.util.List;

/**
 * REC.7 — Corrige.
 *
 * Les quatre appels, avec une lambda ou une reference de methode. La
 * liste de depart est une ArrayList parce que echanger la modifie :
 * List.of(...) rend une liste figee, qui refuserait set.
 */
public class Programme {

    public static void main(String[] args) {
        List<String> animaux = new ArrayList<>(List.of("Chat", "Hippopotame", "Chien", "Cheval", "Ours"));

        List<String> longs = Outils.filtrer(animaux, nom -> nom.length() > 5);
        System.out.println("Plus de cinq lettres : " + longs);

        int enC = Outils.compter(animaux, nom -> nom.startsWith("C"));
        System.out.println("Commencent par C     : " + enC);

        List<Integer> longueurs = Outils.transformer(animaux, String::length);
        System.out.println("Longueurs            : " + longueurs);

        Outils.echanger(animaux, 0, animaux.size() - 1);
        System.out.println("Premier et dernier   : " + animaux);
    }
}
