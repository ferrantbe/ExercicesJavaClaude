package be.ephec.java.abs.e03;

/**
 * ABS.3 — A COMPLETER.
 *
 * Ecrivez ici l'equivalent de VisualiseurFricEnVrac pour la seconde banque.
 * Vous ne devez definir que les trois methodes abstraites : si vous vous
 * surprenez a recopier du code de la classe mere, c'est qu'il ne fallait pas.
 *
 * Attention a l'ordre des colonnes, qui n'est pas le meme.
 */
public class VisualiseurBanquierPepere extends VisualiseurDeDonneesBancaires {

    @Override
    protected String[][] donneesBrutes() {
        throw new UnsupportedOperationException("donneesBrutes n'est pas encore implementee");
    }

    @Override
    protected String nomDeLaBanque() {
        throw new UnsupportedOperationException("nomDeLaBanque n'est pas encore implementee");
    }

    @Override
    protected Mouvement versMouvement(String[] ligne) {
        throw new UnsupportedOperationException("versMouvement n'est pas encore implementee");
    }
}
