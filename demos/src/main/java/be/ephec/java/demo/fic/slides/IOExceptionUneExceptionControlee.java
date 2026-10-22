package be.ephec.java.demo.fic.slides;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Scanner;

/**
 * Slide « IOException, une exception controlee » (FIC, section 2).
 *
 * premiereLigne declare IOException : l'appelant doit choisir. Ici, il attrape
 * le cas d'un fichier qui n'existe pas.
 */
public class IOExceptionUneExceptionControlee {

    public static String premiereLigne(File fichier) throws IOException {
        try (Scanner entree = new Scanner(fichier)) {
            return entree.nextLine();
        }
    }

    public static void main(String[] args) {
        try {
            System.out.println(premiereLigne(new File("introuvable.txt")));
        } catch (FileNotFoundException e) {
            System.out.println("Fichier absent : introuvable.txt");
        } catch (IOException e) {
            System.out.println("Erreur de lecture : " + e.getMessage());
        }
    }

    /* Sortie attendue :
    Fichier absent : introuvable.txt
    */
}
