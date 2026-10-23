package be.ephec.java.col.e08;

/**
 * COL.8 — Un livre, et son ordre naturel : l'ordre alphabetique des titres.
 *
 * Un record peut implementer une interface : celle-ci lui donne son ordre
 * naturel, celui qu'utilisent Collections.sort et TreeSet quand on ne leur
 * fournit aucun Comparator.
 */
public record Livre(String titre, String auteur, int annee) implements Comparable<Livre> {

    @Override
    public int compareTo(Livre autre) {
        return titre.compareTo(autre.titre);
    }
}
