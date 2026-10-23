package be.ephec.java.col.e08;

import java.util.Comparator;

/**
 * COL.8 — A COMPLETER.
 *
 * Un ordre fourni de l'exterieur : par annee de parution, puis par titre
 * pour departager deux livres de la meme annee.
 */
public class ParAnnee implements Comparator<Livre> {

    /**
     * Indice : Integer.compare, plutot qu'une soustraction (voir COL §6).
     */
    @Override
    public int compare(Livre premier, Livre second) {
        throw new UnsupportedOperationException("compare n'est pas encore implementee");
    }
}
