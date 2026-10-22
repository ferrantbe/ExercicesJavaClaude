package be.ephec.java.fic.e02;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

import java.io.File;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * FIC.2 — Verification automatique.
 *
 * @TempDir demande a JUnit un dossier temporaire, cree avant le test et
 * supprime apres. Les tests n'ecrivent donc jamais dans votre projet.
 */
class EnregistrementTest {

    @TempDir
    Path dossier;

    private static List<Etudiant> deuxEtudiants() {
        Enseignant turing = new Enseignant("Turing", "Alan");
        Cours java = new Cours("Java", turing);
        Cours algebre = new Cours("Algebre", turing);

        Etudiant ada = new Etudiant("Lovelace", "Ada");
        ada.inscrire(java);
        ada.inscrire(algebre);

        Etudiant grace = new Etudiant("Hopper", "Grace");
        grace.inscrire(java);

        return Arrays.asList(ada, grace);
    }

    @Test
    @DisplayName("Le fichier est cree et n'est pas vide")
    void fichierCree() throws Exception {
        File fichier = dossier.resolve("etudiants.dat").toFile();

        Enregistrement.enregistrer(deuxEtudiants(), fichier);

        assertTrue(fichier.exists());
        assertTrue(fichier.length() > 0);
    }

    @Test
    @DisplayName("Les etudiants relus sont ceux qu'on avait ecrits")
    void allerRetour() throws Exception {
        File fichier = dossier.resolve("etudiants.dat").toFile();

        Enregistrement.enregistrer(deuxEtudiants(), fichier);
        List<Etudiant> relus = Enregistrement.relire(fichier);

        assertEquals(2, relus.size());
        assertEquals("Lovelace", relus.get(0).getNom());
        assertEquals("Ada", relus.get(0).getPrenom());
        assertEquals("Hopper", relus.get(1).getNom());
    }

    @Test
    @DisplayName("Les cours suivent les etudiants dans le fichier")
    void lesCoursAussi() throws Exception {
        File fichier = dossier.resolve("etudiants.dat").toFile();

        Enregistrement.enregistrer(deuxEtudiants(), fichier);
        List<Etudiant> relus = Enregistrement.relire(fichier);

        assertEquals(2, relus.get(0).nombreDeCours());
        assertEquals("Lovelace Ada : Java, Algebre", relus.get(0).toString());
    }

    @Test
    @DisplayName("Et les enseignants suivent les cours")
    void toutLeGrapheEstEcrit() throws Exception {
        File fichier = dossier.resolve("etudiants.dat").toFile();

        Enregistrement.enregistrer(deuxEtudiants(), fichier);
        List<Etudiant> relus = Enregistrement.relire(fichier);

        assertEquals("Alan Turing",
                relus.get(0).getCours().get(0).getChargeDeCours().toString(),
                "serialiser un Etudiant entraine ses Cours, donc leurs Enseignants");
    }

    @Test
    @DisplayName("Une liste vide s'enregistre et se relit")
    void listeVide() throws Exception {
        File fichier = dossier.resolve("vide.dat").toFile();

        Enregistrement.enregistrer(List.of(), fichier);

        assertEquals(0, Enregistrement.relire(fichier).size());
    }
}
