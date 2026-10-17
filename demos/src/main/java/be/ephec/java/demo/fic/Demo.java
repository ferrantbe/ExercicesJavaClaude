package be.ephec.java.demo.fic;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

/**
 * DEMO FIC — etat d'ARRIVEE.
 *
 * Les MEMES donnees ecrites de deux facons, pour pouvoir ouvrir les deux
 * fichiers cote a cote dans l'editeur. C'est le coeur de la demonstration,
 * et aucune explication ne remplace ce coup d'oeil.
 *
 *   carnet.txt   lisible, modifiable au bloc-notes, fragile
 *   carnet.dat   illisible, robuste, lie a la classe Java
 *
 * A NOTER SUR try-with-resources. Les parentheses apres try declarent une
 * ressource ; elle est fermee automatiquement, meme si une exception
 * survient. Sans cela, il faudrait un finally, et il faudrait penser a
 * l'ecrire — ce que personne ne fait tout le temps.
 */
public class Demo {

    private static final File DOSSIER = new File("sortie");
    private static final File TEXTE = new File(DOSSIER, "carnet.txt");
    private static final File BINAIRE = new File(DOSSIER, "carnet.dat");

    public static void main(String[] args) throws IOException, ClassNotFoundException {
        DOSSIER.mkdirs();

        List<Contact> carnet = List.of(
                new Contact("Ada Lovelace", "0470 11 22 33", 1000),
                new Contact("Alan Turing", "0475 44 55 66", 1200),
                new Contact("Grace Hopper", "0479 77 88 99", 1030));

        ecrireEnTexte(carnet);
        ecrireEnBinaire(carnet);

        System.out.println("--- relu du texte ---");
        lireLeTexte().forEach(System.out::println);

        System.out.println("--- relu du binaire ---");
        lireLeBinaire().forEach(System.out::println);

        System.out.printf("%ncarnet.txt : %d octets%n", TEXTE.length());
        System.out.printf("carnet.dat : %d octets%n", BINAIRE.length());
        System.out.println("\nOuvrez les deux dans l'editeur, cote a cote.");
    }

    private static void ecrireEnTexte(List<Contact> carnet) throws IOException {
        try (PrintWriter sortie = new PrintWriter(TEXTE)) {
            for (Contact contact : carnet) {
                sortie.println(contact.enLigne());
            }
        }
    }

    private static List<Contact> lireLeTexte() throws IOException {
        List<Contact> carnet = new ArrayList<>();
        try (Scanner entree = new Scanner(TEXTE)) {
            while (entree.hasNextLine()) {
                carnet.add(Contact.depuisLigne(entree.nextLine()));
            }
        }
        return carnet;
    }

    /**
     * Une SEULE instruction ecrit la liste entiere. L'ecriture texte en
     * demandait une par contact, et une methode pour mettre en ligne.
     */
    private static void ecrireEnBinaire(List<Contact> carnet) throws IOException {
        try (ObjectOutputStream sortie =
                     new ObjectOutputStream(new FileOutputStream(BINAIRE))) {
            sortie.writeObject(new ArrayList<>(carnet));
        }
    }

    /**
     * Le transtypage est inevitable : writeObject a ecrit un Object, et le
     * fichier ne contient pas le type. C'est le prix de la souplesse, et la
     * raison pour laquelle GEN.1 parlait d'effacement de type.
     */
    @SuppressWarnings("unchecked")
    private static List<Contact> lireLeBinaire() throws IOException, ClassNotFoundException {
        try (ObjectInputStream entree =
                     new ObjectInputStream(new FileInputStream(BINAIRE))) {
            return (List<Contact>) entree.readObject();
        }
    }
}
