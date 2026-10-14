package be.ephec.java.demo.fic.slides;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

/**
 * Slides « Les flux d'objets » et « Une etiquette, pas un contrat » (FIC,
 * section 4). On ecrit un int puis un Releve, et on les relit dans le meme ordre.
 */
public class LesFluxDObjets {

    public static void main(String[] args) throws IOException, ClassNotFoundException {
        Releve releve = new Releve("Uccle", 12);

        try (ObjectOutputStream sortie = new ObjectOutputStream(new FileOutputStream("releve.ser"))) {
            sortie.writeInt(2026);
            sortie.writeObject(releve);
        }

        try (ObjectInputStream entree = new ObjectInputStream(new FileInputStream("releve.ser"))) {
            int annee = entree.readInt();
            Releve lu = (Releve) entree.readObject();
            System.out.println(annee + " : " + lu);
            System.out.println("Meme objet ? " + (lu == releve) + ", une copie fidele");
        }
    }

    /* Sortie attendue :
    2026 : Uccle : 12 degres
    Meme objet ? false, une copie fidele
    */
}
