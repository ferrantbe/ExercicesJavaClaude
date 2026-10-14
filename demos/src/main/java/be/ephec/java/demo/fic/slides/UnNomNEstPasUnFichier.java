package be.ephec.java.demo.fic.slides;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

/**
 * Slides « Un nom n'est pas un fichier » et « Path et Files » (FIC, section 3).
 *
 * Un File ou un Path ne designe qu'un nom : le fichier n'existe qu'une fois
 * ecrit. Le dossier releves est cree dans le dossier de lancement.
 */
public class UnNomNEstPasUnFichier {

    public static void main(String[] args) throws IOException {
        File dossier = new File("releves");
        File fichier = new File(dossier, "uccle.txt");
        fichier.delete();                        // pour repartir de zero a chaque lancement

        dossier.mkdirs();                        // cree le dossier s'il manque
        System.out.println(fichier.exists());    // pas encore
        System.out.println(fichier.length());    // 0 : rien a mesurer

        Path chemin = Path.of("releves", "uccle.txt");
        Files.writeString(chemin, "Uccle;12\n");
        List<String> lignes = Files.readAllLines(chemin);

        System.out.println(fichier.exists());    // maintenant oui
        System.out.println(fichier.length());    // en octets
        System.out.println(lignes);
    }

    /* Sortie attendue :
    false
    0
    true
    9
    [Uccle;12]
    */
}
