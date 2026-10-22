package be.ephec.java.fic.e03;

import java.io.File;
import java.util.List;

/** FIC.3 — CORRIGE. */
public class Programme {

    public static void main(String[] args) throws Exception {
        Enseignant turing = new Enseignant("Turing", "Alan");

        Etudiant ada = new Etudiant("Lovelace", "Ada");
        ada.inscrire(new Cours("Java", turing));
        ada.inscrire(new Cours("Algebre", turing));

        Etudiant alan = new Etudiant("Turing", "Alan");

        File fichier = new File("etudiants.txt");
        EcritListeEtudiants.ecrire(List.of(ada, alan), fichier);

        System.out.println("Contenu de " + fichier.getName() + " :");
        for (String ligne : EcritListeEtudiants.lireLignes(fichier)) {
            System.out.println("  " + ligne);
        }

        System.out.println("\nEtudiants reconstruits :");
        for (Etudiant relu : EcritListeEtudiants.relire(fichier)) {
            System.out.println("  " + relu);
            for (Cours cours : relu.getCours()) {
                System.out.println("    " + cours);
            }
        }

        // Le charge de cours vaut « Inconnu Inconnu » : le fichier texte ne
        // l'avait pas ecrit. Comparez avec FIC.2, ou il revenait intact.
    }
}
