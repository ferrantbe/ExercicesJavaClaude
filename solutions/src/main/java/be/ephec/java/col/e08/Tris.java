package be.ephec.java.col.e08;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

/**
 * COL.8 — Trois ordres pour la meme bibliotheque. Aucune methode ne modifie
 * la liste recue : chacune travaille sur une copie.
 */
public class Tris {

    /** Les livres dans leur ordre naturel : par titre. */
    public static List<Livre> parTitre(List<Livre> livres) {
        List<Livre> copie = new ArrayList<>(livres);
        Collections.sort(copie);
        return copie;
    }

    /** Les livres par annee de parution, a l'aide de ParAnnee. */
    public static List<Livre> parAnnee(List<Livre> livres) {
        List<Livre> copie = new ArrayList<>(livres);
        copie.sort(new ParAnnee());
        return copie;
    }

    /** Les livres ranges par auteur, dans un ensemble qui reste trie. */
    public static Set<Livre> rangesParAuteur(List<Livre> livres) {
        Set<Livre> ranges = new TreeSet<>(new ParAuteur());
        ranges.addAll(livres);
        return ranges;
    }
}
