package be.ephec.java.demo.fic.slides;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.nio.file.Files;
import java.nio.file.Path;

/**
 * Slides « Un flux ouvert se ferme » et « Le try avec ressources » (FIC,
 * section 2). Les deux ecritures font la meme chose ; la seconde ferme le
 * flux sans qu'on l'ecrive.
 */
public class UnFluxOuvertSeFerme {

    public static void main(String[] args) throws IOException {
        Writer sortie = new FileWriter("journal.txt");
        try {
            sortie.write("Uccle;12");
        } finally {
            sortie.close();     // meme si write echoue
        }
        System.out.println(Files.readString(Path.of("journal.txt")));

        try (Writer autre = new FileWriter("journal.txt")) {
            autre.write("Ostende;9");
        }   // autre.close() est appele ici, exception ou non
        System.out.println(Files.readString(Path.of("journal.txt")));
    }

    /* Sortie attendue :
    Uccle;12
    Ostende;9
    */
}
