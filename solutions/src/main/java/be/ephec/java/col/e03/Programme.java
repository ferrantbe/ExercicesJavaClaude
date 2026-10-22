package be.ephec.java.col.e03;

import java.util.Scanner;

/** COL.3 — CORRIGE. */
public class Programme {

    public static void main(String[] args) {
        Scanner source = SourceDeTexte.ouvrir();

        for (String nom : Noms.triee(Noms.lire(source))) {
            System.out.println(nom);
        }

        source.close();
    }
}
