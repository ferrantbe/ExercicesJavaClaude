package be.ephec.java.col.e04;

import java.util.Scanner;

/**
 * COL.4 — Cette classe vous est FOURNIE.
 *
 * Elle rend un Scanner ouvert sur un texte. Comme en COL.3, ce Scanner
 * viendrait d'un fichier dans un vrai programme.
 */
public class SourceDeTexte {

    private static final String TEXTE = String.join(" ",
            "le chat dort sur le tapis",
            "le chien dort aussi",
            "le tapis est vieux mais le chat l aime",
            "un chat et un chien sur un tapis");

    public static Scanner ouvrir() {
        return new Scanner(TEXTE);
    }
}
