package be.ephec.java.col.e08;

/**
 * COL.8 — A COMPLETER.
 *
 * Un livre, et son ordre naturel : l'ordre alphabetique des titres.
 */
public record Livre(String titre, String auteur, int annee) implements Comparable<Livre> {

    /**
     * Compare ce livre a un autre selon leur titre, par ordre alphabetique.
     *
     * Indice : String sait deja se comparer.
     */
    @Override
    public int compareTo(Livre autre) {
        throw new UnsupportedOperationException("compareTo n'est pas encore implementee");
    }
}
