package be.ephec.java.fic.e03;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

import java.io.File;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;

/** FIC.3 — Verification automatique. */
class EcritListeEtudiantsTest {

    @TempDir
    Path dossier;

    private static List<Etudiant> deuxEtudiants() {
        Enseignant turing = new Enseignant("Turing", "Alan");

        Etudiant ada = new Etudiant("Lovelace", "Ada");
        ada.inscrire(new Cours("Java", turing));
        ada.inscrire(new Cours("Algebre", turing));

        Etudiant alan = new Etudiant("Turing", "Alan");

        return Arrays.asList(ada, alan);
    }

    @Test
    @DisplayName("Le format d'ecriture est celui de l'enonce")
    void format() throws Exception {
        File fichier = dossier.resolve("etudiants.txt").toFile();

        EcritListeEtudiants.ecrire(deuxEtudiants(), fichier);

        assertIterableEquals(
                Arrays.asList("Lovelace;Ada;Java,Algebre", "Turing;Alan;"),
                EcritListeEtudiants.lireLignes(fichier));
    }

    @Test
    @DisplayName("Une liste vide donne un fichier sans ligne")
    void listeVide() throws Exception {
        File fichier = dossier.resolve("vide.txt").toFile();

        EcritListeEtudiants.ecrire(List.of(), fichier);

        assertEquals(0, EcritListeEtudiants.lireLignes(fichier).size());
    }

    @Test
    @DisplayName("Les etudiants se reconstruisent depuis le texte")
    void relecture() throws Exception {
        File fichier = dossier.resolve("etudiants.txt").toFile();
        EcritListeEtudiants.ecrire(deuxEtudiants(), fichier);

        List<Etudiant> relus = EcritListeEtudiants.relire(fichier);

        assertEquals(2, relus.size());
        assertEquals("Lovelace", relus.get(0).getNom());
        assertEquals(2, relus.get(0).nombreDeCours());
        assertEquals(0, relus.get(1).nombreDeCours());
    }

    @Test
    @DisplayName("Le format texte a perdu le charge de cours")
    void informationPerdue() throws Exception {
        File fichier = dossier.resolve("etudiants.txt").toFile();
        EcritListeEtudiants.ecrire(deuxEtudiants(), fichier);

        List<Etudiant> relus = EcritListeEtudiants.relire(fichier);

        assertEquals("Inconnu Inconnu",
                relus.get(0).getCours().get(0).getChargeDeCours().toString(),
                "Le fichier texte ne contient que les intitules : l'enseignant "
                        + "n'a pas ete ecrit, il ne peut donc pas etre relu. "
                        + "C'est le prix d'un format lisible.");
    }
}
