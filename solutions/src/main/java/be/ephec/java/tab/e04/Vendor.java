package be.ephec.java.tab.e04;

/**
 * TAB.4 — CORRIGE.
 *
 * Le vendeur POSSEDE une personne, il n'en est pas une. La difference entre
 * "a un" et "est un" sera le sujet du module ABS ; ici, un simple champ suffit.
 *
 * Les ventes tiennent dans un tableau de taille fixe. Un tableau ne grandit
 * pas : il faut donc decider sa taille a la construction, et savoir combien de
 * cases sont reellement occupees — d'ou le champ nombreDeVentes, qui sert a la
 * fois de compteur et de position de la prochaine insertion.
 */
public class Vendor {

    public static final int MAX_VENTES = 10;

    private final Person personne;
    private final Sale[] ventes = new Sale[MAX_VENTES];
    private int nombreDeVentes = 0;

    public Vendor(Person personne) {
        this.personne = personne;
    }

    public boolean enregistrer(Sale vente) {
        if (nombreDeVentes == MAX_VENTES) {
            return false;
        }
        ventes[nombreDeVentes] = vente;
        nombreDeVentes++;
        return true;
    }

    public int nombreDeVentes() {
        return nombreDeVentes;
    }

    /**
     * La boucle s'arrete a nombreDeVentes et non a ventes.length : au-dela,
     * les cases valent null et provoqueraient une NullPointerException.
     * C'est la difficulte propre aux tableaux de taille fixe.
     */
    public double chiffreDAffaires() {
        double total = 0;
        for (int i = 0; i < nombreDeVentes; i++) {
            total += ventes[i].prixReel();
        }
        return total;
    }

    public Person getPersonne() {
        return personne;
    }
}
