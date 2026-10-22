package be.ephec.java.abs.e03;

/**
 * ABS.3 — CORRIGE.
 *
 * Quinze lignes, dont trois methodes de deux lignes chacune. Tout le reste —
 * la conversion de l'ensemble des lignes, le total, la mise en forme du
 * rapport — est deja dans la classe mere et n'a pas ete recopie.
 *
 * C'est la mesure de la reussite de l'exercice : si votre classe fait plus
 * de vingt lignes, vous avez duplique quelque chose.
 */
public class VisualiseurBanquierPepere extends VisualiseurDeDonneesBancaires {

    private final BanquierPepereDataProvider provider = new BanquierPepereDataProvider();

    @Override
    protected String[][] donneesBrutes() {
        return provider.provideBankData();
    }

    @Override
    protected String nomDeLaBanque() {
        return "Banquier Pepere";
    }

    /**
     * Le seul vrai piege : cette banque range ses colonnes autrement.
     *     Fric en Vrac    : compte, montant, communication
     *     Banquier Pepere : communication, compte, montant
     *
     * C'est precisement pour cela que la conversion d'une ligne est laissee
     * abstraite : c'est la seule chose qui differe reellement entre les deux
     * banques.
     */
    @Override
    protected Mouvement versMouvement(String[] ligne) {
        return new Mouvement(ligne[1], Double.parseDouble(ligne[2]), ligne[0]);
    }
}
