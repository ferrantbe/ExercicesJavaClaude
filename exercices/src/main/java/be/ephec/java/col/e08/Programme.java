package be.ephec.java.col.e08;

import java.util.List;

/**
 * COL.8 — Cette classe vous est FOURNIE, complete : elle affiche la meme
 * bibliotheque dans les trois ordres.
 */
public class Programme {

    public static void main(String[] args) {
        List<Livre> bibliotheque = List.of(
                new Livre("Germinal", "Zola", 1885),
                new Livre("Candide", "Voltaire", 1759),
                new Livre("Le Horla", "Maupassant", 1887),
                new Livre("Nana", "Zola", 1880),
                new Livre("Zadig", "Voltaire", 1747),
                new Livre("Bel-Ami", "Maupassant", 1885));

        System.out.println("Par titre :");
        Tris.parTitre(bibliotheque).forEach(System.out::println);

        System.out.println("\nPar annee :");
        Tris.parAnnee(bibliotheque).forEach(System.out::println);

        System.out.println("\nPar auteur :");
        Tris.rangesParAuteur(bibliotheque).forEach(System.out::println);
    }
}
