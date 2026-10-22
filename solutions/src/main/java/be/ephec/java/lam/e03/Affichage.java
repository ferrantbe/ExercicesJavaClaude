package be.ephec.java.lam.e03;

import java.util.function.IntPredicate;

/**
 * LAM.3 — CORRIGE.
 *
 * Deux enseignements.
 *
 * 1. Filtrage etait un doublon d'IntPredicate. Avant d'ecrire une interface
 *    fonctionnelle, regardez ce que contient java.util.function : Predicate,
 *    Function, Supplier, Consumer et leurs variantes primitives couvrent la
 *    plupart des besoins. En ecrire une reste utile quand le nom porte du
 *    sens metier — mais alors c'est pour le nom, pas pour la signature.
 *
 * 2. Une reference de methode et une lambda produisent le meme objet. La
 *    reference donne un nom au critere, ce qui le rend reutilisable et
 *    testable separement — le test verifie d'ailleurs les trois criteres
 *    isolement avant de verifier le rapport.
 *
 *        e -> e > 0                 anonyme, ecrit sur place
 *        Affichage::estPositif      nomme, teste, reutilisable
 */
public class Affichage {

    public static String selectionner(int[] tableau, IntPredicate filtre) {
        StringBuilder retenus = new StringBuilder();

        for (int valeur : tableau) {
            if (filtre.test(valeur)) {
                if (retenus.length() > 0) {
                    retenus.append(' ');
                }
                retenus.append(valeur);
            }
        }
        return retenus.toString();
    }

    public static boolean estPositif(int valeur) {
        return valeur > 0;
    }

    public static boolean estNegatif(int valeur) {
        return valeur < 0;
    }

    public static boolean estPair(int valeur) {
        return valeur % 2 == 0;
    }

    public static String rapport(int[] tableau) {
        return "Les positifs: " + selectionner(tableau, Affichage::estPositif) + "\n"
                + "Les negatifs: " + selectionner(tableau, Affichage::estNegatif) + "\n"
                + "Les pairs: " + selectionner(tableau, Affichage::estPair);
    }
}
