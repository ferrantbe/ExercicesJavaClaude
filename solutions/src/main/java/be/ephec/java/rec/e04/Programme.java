package be.ephec.java.rec.e04;

import java.util.Map;

/**
 * REC.4 — Corrige.
 *
 * Le parcours d'une Map passe par entrySet() : chaque entree donne sa
 * cle et sa valeur. Le matricule inconnu est demande dans son propre try,
 * pour que la recherche reussie qui precede s'affiche quoi qu'il arrive.
 */
public class Programme {

    public static void main(String[] args) {
        Registre registre = new Registre();
        registre.inscrire(new Etudiant("Lovelace", "Ada"));
        registre.inscrire(new Etudiant("Turing", "Alan"));
        registre.inscrire(new Etudiant("Liskov", "Barbara"));
        registre.inscrire(new Etudiant("Hopper", "Grace"));
        registre.inscrire(new Etudiant("Lovelace", "Anne"));

        System.out.println("Par nom :");
        for (Etudiant etudiant : registre.parNom()) {
            System.out.println("  " + etudiant);
        }

        System.out.println("Par initiale :");
        for (Map.Entry<Character, Integer> entree : registre.parInitiale().entrySet()) {
            System.out.println("  " + entree.getKey() + " : " + entree.getValue());
        }

        System.out.println(Etudiant.getNombreCrees() + " etudiants crees, "
                + registre.taille() + " inscrits");

        try {
            System.out.println("Trouve : " + registre.trouver("ET-0002"));
            System.out.println("Trouve : " + registre.trouver("ET-9999"));
        } catch (EtudiantInconnuException e) {
            System.out.println(e.getMessage());
        }
    }
}
