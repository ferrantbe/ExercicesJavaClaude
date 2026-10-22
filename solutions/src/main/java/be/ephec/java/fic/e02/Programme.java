package be.ephec.java.fic.e02;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

/** FIC.2 — CORRIGE. */
public class Programme {

    public static void main(String[] args) throws Exception {
        Enseignant turing = new Enseignant("Turing", "Alan");
        Cours java = new Cours("Java", turing);

        Etudiant ada = new Etudiant("Lovelace", "Ada");
        ada.inscrire(java);

        List<Etudiant> etudiants = new ArrayList<>(List.of(ada));

        File fichier = new File("etudiants.dat");
        Enregistrement.enregistrer(etudiants, fichier);
        System.out.println("Ecrit dans " + fichier.getAbsolutePath());

        for (Etudiant relu : Enregistrement.relire(fichier)) {
            System.out.println("Relu : " + relu);
            System.out.println("  charge de cours : "
                    + relu.getCours().get(0).getChargeDeCours());
        }

        // Ouvrez etudiants.dat dans un editeur de texte : vous y verrez
        // quelques noms de classes noyes dans des octets illisibles. Le
        // format est fait pour la JVM, pas pour vous. FIC.3 prend l'autre
        // parti.
    }
}
