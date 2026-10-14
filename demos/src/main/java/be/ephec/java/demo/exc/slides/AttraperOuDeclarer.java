package be.ephec.java.demo.exc.slides;

/**
 * Slide « Attraper ou declarer » (EXC, section 2).
 *
 * depuisLeBouton peut agir : elle attrape et affiche un refus.
 * depuisLeBadge ne le peut pas : elle declare, et son appelant decide.
 */
public class AttraperOuDeclarer {

    private final Ascenseur ascenseur = new Ascenseur(5);

    void depuisLeBouton(int etage) {
        try {
            ascenseur.appeler(etage);
        } catch (EtageInaccessibleException e) {
            System.out.println("Refus : " + e.getMessage());
        }
    }

    void depuisLeBadge(int etage) throws EtageInaccessibleException {
        ascenseur.appeler(etage);
    }

    public static void main(String[] args) {
        AttraperOuDeclarer cabine = new AttraperOuDeclarer();
        cabine.depuisLeBouton(9);          // le refus est gere sur place
        try {
            cabine.depuisLeBadge(9);       // le refus remonte jusqu'ici
        } catch (EtageInaccessibleException e) {
            System.out.println("Badge refuse : " + e.getMessage());
        }
    }

    /* Sortie attendue :
    Refus : Etage 9 hors de l'intervalle 0 a 5
    Badge refuse : Etage 9 hors de l'intervalle 0 a 5
    */
}
