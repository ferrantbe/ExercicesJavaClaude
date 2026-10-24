package be.ephec.java.rec.e06;

import java.util.List;

/**
 * REC.6 — Corrige.
 *
 * Deux historiques, deux types : la meme classe, sans transtypage et sans
 * Object. C'est la demonstration attendue : le type est fixe a la
 * declaration, et le compilateur refuse de meler les deux.
 */
public class Programme {

    public static void main(String[] args) {
        Historique<String> commandes = new Historique<>();
        commandes.enregistrer("ouvrir");
        commandes.enregistrer("modifier");
        commandes.enregistrer("enregistrer");
        commandes.enregistrer("modifier");
        System.out.println("Derniere commande : " + commandes.dernier());
        System.out.println("Toutes            : " + commandes.tout());
        System.out.println("\"modifier\" tapee " + commandes.occurrences("modifier") + " fois");

        Historique<Integer> temperatures = new Historique<>();
        temperatures.enregistrer(18);
        temperatures.enregistrer(21);
        temperatures.enregistrer(19);
        int derniere = temperatures.dernier();      // pas de transtypage
        System.out.println("Derniere temperature : " + derniere + " degres");

        List<String> vue = commandes.tout();
        try {
            vue.add("tricher");
            System.out.println("Pas normal : l'ajout a ete accepte");
        } catch (UnsupportedOperationException e) {
            System.out.println("La liste rendue par tout() refuse l'ajout");
        }

        try {
            new Historique<String>().dernier();
        } catch (IllegalStateException e) {
            System.out.println("Historique vide : " + e.getMessage());
        }
    }
}
