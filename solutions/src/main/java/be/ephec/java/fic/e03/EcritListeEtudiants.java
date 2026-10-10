package be.ephec.java.fic.e03;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

/**
 * FIC.3 — CORRIGE.
 *
 * La comparaison avec FIC.2 est tout l'interet de l'exercice.
 *
 *   Le format .dat conserve TOUT : les cours, leurs enseignants, la structure
 *   entiere. Mais il ne se lit que par un programme Java, et seulement tant
 *   que les classes n'ont pas change. Renommez un champ, et les anciens
 *   fichiers deviennent illisibles.
 *
 *   Le format .txt ne conserve que ce qu'on a decide d'ecrire — ici, pas les
 *   enseignants. En echange, il s'ouvre dans n'importe quel editeur, se lit
 *   par un tableur, se traite par un autre langage, et survit a toutes les
 *   evolutions de vos classes.
 *
 * Aucun des deux n'est meilleur : ils repondent a des besoins differents. La
 * question a se poser est « qui lira ce fichier, et quand ? ».
 */
public class EcritListeEtudiants {

    private static final String SEPARATEUR = ";";
    private static final String SEPARATEUR_COURS = ",";

    public static void ecrire(List<Etudiant> etudiants, File fichier) throws IOException {
        try (PrintWriter sortie = new PrintWriter(new FileWriter(fichier))) {
            for (Etudiant etudiant : etudiants) {
                List<String> intitules = new ArrayList<>();
                for (Cours cours : etudiant.getCours()) {
                    intitules.add(cours.getIntitule());
                }
                sortie.println(etudiant.getNom() + SEPARATEUR
                        + etudiant.getPrenom() + SEPARATEUR
                        + String.join(SEPARATEUR_COURS, intitules));
            }
        }
    }

    public static List<String> lireLignes(File fichier) throws IOException {
        List<String> lignes = new ArrayList<>();
        try (Scanner scanner = new Scanner(fichier)) {
            while (scanner.hasNextLine()) {
                lignes.add(scanner.nextLine());
            }
        }
        return lignes;
    }

    public static List<Etudiant> relire(File fichier) throws IOException {
        Enseignant inconnu = new Enseignant("Inconnu", "Inconnu");
        List<Etudiant> etudiants = new ArrayList<>();

        for (String ligne : lireLignes(fichier)) {
            // Le -1 est indispensable : sans lui, split supprime les champs
            // vides de fin, et un etudiant sans cours donnerait un tableau de
            // deux elements au lieu de trois.
            String[] champs = ligne.split(SEPARATEUR, -1);

            Etudiant etudiant = new Etudiant(champs[0], champs[1]);
            if (!champs[2].isEmpty()) {
                for (String intitule : champs[2].split(SEPARATEUR_COURS)) {
                    etudiant.inscrire(new Cours(intitule, inconnu));
                }
            }
            etudiants.add(etudiant);
        }
        return etudiants;
    }
}
