package be.ephec.java.col.e03;

import java.util.Scanner;

/**
 * COL.3 — Cette classe vous est FOURNIE.
 *
 * Elle rend un Scanner ouvert sur une liste de noms. Dans un vrai programme,
 * ce Scanner viendrait d'un fichier :
 *
 *     File fichier = new File("etudiants.txt");
 *     Scanner scanner = new Scanner(fichier);
 *
 * Le reste de votre code serait identique : un Scanner se lit de la meme
 * facon, quelle que soit sa source. La lecture de fichiers proprement dite
 * est le sujet du theme FIC.
 */
public class SourceDeTexte {

    private static final String NOMS = String.join("\n",
            "Lovelace", "Turing", "Hopper", "Babbage", "Dijkstra",
            "Liskov", "Knuth", "Wirth", "Backus", "Ritchie");

    public static Scanner ouvrir() {
        return new Scanner(NOMS);
    }
}
