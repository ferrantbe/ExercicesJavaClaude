package be.ephec.java.abs.e03;

/**
 * ABS.3 — Cette classe vous est FOURNIE. Elle vous sert de modele.
 *
 * Elle ne definit que les trois methodes abstraites, et rien d'autre : tout
 * le traitement est deja dans la classe mere.
 */
public class VisualiseurFricEnVrac extends VisualiseurDeDonneesBancaires {

    private final FricEnVracDataProvider provider = new FricEnVracDataProvider();

    @Override
    protected String[][] donneesBrutes() {
        return provider.provideBankData();
    }

    @Override
    protected String nomDeLaBanque() {
        return "Fric en Vrac";
    }

    @Override
    protected Mouvement versMouvement(String[] ligne) {
        // Ordre de cette banque : compte, montant, communication
        return new Mouvement(ligne[0], Double.parseDouble(ligne[1]), ligne[2]);
    }
}
