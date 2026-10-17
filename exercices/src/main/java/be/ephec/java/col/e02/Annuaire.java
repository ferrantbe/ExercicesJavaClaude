package be.ephec.java.col.e02;

import java.util.List;

/**
 * COL.2 — A COMPLETER.
 *
 * Un annuaire associe un nom a une fiche. C'est exactement ce que fait une
 * table associative : Map<String, Fiche>.
 */
public class Annuaire {

    // TODO : declarez la table associative, en private et en final.
    //        Commencez par une HashMap.

    /** Ajoute une fiche, indexee par son nom. Une fiche de meme nom la remplace. */
    public void ajouter(Fiche fiche) {
        throw new UnsupportedOperationException("ajouter n'est pas encore implementee");
    }

    /** Retourne la fiche portant ce nom, ou null si l'annuaire n'en a pas. */
    public Fiche chercher(String nom) {
        throw new UnsupportedOperationException("chercher n'est pas encore implementee");
    }

    public int taille() {
        throw new UnsupportedOperationException("taille n'est pas encore implementee");
    }

    /**
     * Retourne les noms de l'annuaire, par ordre alphabetique.
     *
     * Avec une HashMap, l'ordre des cles n'est pas garanti : il faudra donc
     * trier. Lisez la derniere question de l'enonce avant de vous lancer.
     */
    public List<String> nomsDansLOrdre() {
        throw new UnsupportedOperationException("nomsDansLOrdre n'est pas encore implementee");
    }
}
