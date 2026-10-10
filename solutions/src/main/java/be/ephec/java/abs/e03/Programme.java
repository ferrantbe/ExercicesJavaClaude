package be.ephec.java.abs.e03;

/** ABS.3 — CORRIGE. */
public class Programme {

    public static void main(String[] args) {
        VisualiseurDeDonneesBancaires[] banques = {
                new VisualiseurFricEnVrac(),
                new VisualiseurBanquierPepere()
        };

        // Le programme ne sait pas a quelle banque il a affaire, et n'a pas
        // besoin de le savoir. Ajouter une troisieme banque ne changerait
        // rien ici : une classe de plus, et un element de plus dans ce tableau.
        for (VisualiseurDeDonneesBancaires banque : banques) {
            System.out.println(banque.rapport());
            System.out.printf(java.util.Locale.US, "  Total : %.2f%n%n", banque.total());
        }
    }
}
