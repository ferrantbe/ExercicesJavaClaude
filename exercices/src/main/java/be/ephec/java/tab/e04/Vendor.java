package be.ephec.java.tab.e04;

/**
 * TAB.4 — A COMPLETER.
 *
 * Un vendeur est rattache a une personne et conserve ses ventes dans un
 * TABLEAU de taille fixe. C'est volontaire : vous verrez les collections,
 * qui grandissent toutes seules, au module COL.
 */
public class Vendor {

    /** Nombre maximum de ventes qu'un vendeur peut enregistrer. */
    public static final int MAX_VENTES = 10;

    // TODO : declarez la personne et le tableau de ventes,
    //        ainsi que de quoi savoir combien de ventes sont enregistrees

    /** Le constructeur est declare : completez son corps. */
    public Vendor(Person personne) {
        throw new UnsupportedOperationException("le constructeur n'est pas encore implemente");
    }

    /**
     * Enregistre une vente.
     *
     * @return true si la vente a ete enregistree,
     *         false si le tableau est deja plein
     */
    public boolean enregistrer(Sale vente) {
        throw new UnsupportedOperationException("enregistrer n'est pas encore implementee");
    }

    /** Retourne le nombre de ventes enregistrees. */
    public int nombreDeVentes() {
        throw new UnsupportedOperationException("nombreDeVentes n'est pas encore implementee");
    }

    /** Retourne la somme des prix reels de toutes les ventes enregistrees. */
    public double chiffreDAffaires() {
        throw new UnsupportedOperationException("chiffreDAffaires n'est pas encore implementee");
    }

    public Person getPersonne() {
        throw new UnsupportedOperationException("getPersonne n'est pas encore implementee");
    }
}
