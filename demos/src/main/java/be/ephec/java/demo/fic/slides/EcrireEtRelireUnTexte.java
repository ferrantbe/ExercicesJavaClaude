package be.ephec.java.demo.fic.slides;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Scanner;

/**
 * Slides « Ecrire comme sur la console », « Relire ligne par ligne » et « Une
 * ligne, plusieurs champs » (FIC, section 3).
 *
 * Le fichier uccle.txt est cree dans le dossier de lancement : ouvrez-le, il
 * se lit comme un texte ordinaire.
 */
public class EcrireEtRelireUnTexte {

    public static void main(String[] args) throws IOException {
        File fichier = new File("uccle.txt");
        try (PrintWriter sortie = new PrintWriter(new FileWriter(fichier))) {
            sortie.println("Uccle;12");
            sortie.printf("%s;%d%n", "Ostende", 9);
        }

        try (Scanner entree = new Scanner(fichier)) {
            while (entree.hasNextLine()) {
                String ligne = entree.nextLine();
                String[] champs = ligne.split(";");

                String station = champs[0];
                int temperature = Integer.parseInt(champs[1]);
                System.out.println(station + " : " + temperature + " degres");
            }
        }
    }

    /* Sortie attendue :
    Uccle : 12 degres
    Ostende : 9 degres
    */
}
