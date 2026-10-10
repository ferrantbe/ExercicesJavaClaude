package be.ephec.java.jun.e02;

/**
 * JUN.2 — Cette classe vous est FOURNIE. Elle ne respecte PAS le contrat.
 *
 * Ne cherchez pas ce qui cloche en la lisant — c'est votre verificateur qui
 * doit le trouver. Lire le code pour reperer un defaut ne prouve rien ; un
 * test qui echoue, si.
 */
public class TirelireSansGarde implements Tirelire {

    private double contenu = 0;

    @Override
    public void depot(double montant) {
        contenu += montant;
    }

    @Override
    public void retrait(double montant) {
        contenu -= montant;
    }

    @Override
    public double getContenu() {
        return contenu;
    }
}
