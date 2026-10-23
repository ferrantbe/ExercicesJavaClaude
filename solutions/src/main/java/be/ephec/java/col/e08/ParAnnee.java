package be.ephec.java.col.e08;

import java.util.Comparator;

/**
 * COL.8 — Un ordre fourni de l'exterieur : par annee de parution, puis par
 * titre pour departager deux livres de la meme annee.
 */
public class ParAnnee implements Comparator<Livre> {

    @Override
    public int compare(Livre premier, Livre second) {
        int parAnnee = Integer.compare(premier.annee(), second.annee());
        if (parAnnee != 0) {
            return parAnnee;
        }
        return premier.titre().compareTo(second.titre());
    }
}
