package be.ephec.java.rec.e02;

import java.util.List;

/**
 * REC.2 — A COMPLETER.
 *
 * Un parc de vehicules de toutes sortes. Il ne connait que le type
 * Vehicule : c'est a lui que chaque methode s'adresse, sans jamais
 * tester la sorte concrete.
 */
public class Parc {

    // TODO : la liste des vehicules, dans l'ordre d'ajout.

    public void ajouter(Vehicule vehicule) {
        throw new UnsupportedOperationException("ajouter n'est pas encore implementee");
    }

    public int taille() {
        throw new UnsupportedOperationException("taille n'est pas encore implementee");
    }

    /** La somme des taxes annuelles de tous les vehicules. */
    public double taxeTotale() {
        throw new UnsupportedOperationException("taxeTotale n'est pas encore implementee");
    }

    /** Les descriptions, une par vehicule, dans l'ordre d'ajout. */
    public List<String> descriptions() {
        throw new UnsupportedOperationException("descriptions n'est pas encore implementee");
    }

    /** Le nombre de vehicules qui roulent a cette energie. */
    public int compter(Energie energie) {
        throw new UnsupportedOperationException("compter n'est pas encore implementee");
    }

    /**
     * Le vehicule le plus ancien. Si deux ont la meme annee, le premier
     * ajoute.
     *
     * @throws IllegalStateException si le parc est vide — l'exception existe
     *                               deja dans le JDK, ne la creez pas
     */
    public Vehicule doyen() {
        throw new UnsupportedOperationException("doyen n'est pas encore implementee");
    }
}
