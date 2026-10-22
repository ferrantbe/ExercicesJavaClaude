package be.ephec.java.demo.fic.slides;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

/**
 * Slide « Les flux s'emboitent » (FIC, section 1).
 *
 * Le fichier temperatures.bin est cree dans le dossier de lancement (dans
 * IntelliJ, la racine du projet). Il fait 12 octets : 4 pour l'int, 8 pour le
 * double. Ouvrez-le dans un editeur de texte : il est illisible, c'est du binaire.
 */
public class LesFluxSEmboitent {

    public static void main(String[] args) throws IOException {
        OutputStream fichier = new FileOutputStream("temperatures.bin");
        OutputStream tampon = new BufferedOutputStream(fichier);
        DataOutputStream sortie = new DataOutputStream(tampon);

        sortie.writeInt(12);        // quatre octets
        sortie.writeDouble(12.5);   // huit octets
        sortie.close();             // ferme les trois

        System.out.println("Taille : " + new File("temperatures.bin").length() + " octets");

        // relire, dans le meme ordre
        try (DataInputStream entree = new DataInputStream(
                new BufferedInputStream(new FileInputStream("temperatures.bin")))) {
            System.out.println(entree.readInt() + " puis " + entree.readDouble());
        }
    }

    /* Sortie attendue :
    Taille : 12 octets
    12 puis 12.5
    */
}
