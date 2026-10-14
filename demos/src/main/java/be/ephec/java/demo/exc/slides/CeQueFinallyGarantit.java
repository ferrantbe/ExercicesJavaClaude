package be.ephec.java.demo.exc.slides;

/**
 * Slide « Ce que finally garantit » (EXC, section 3).
 *
 * La porte est deverrouillee dans tous les cas : apres un appel reussi
 * comme apres une exception, qui continue ensuite sa remontee.
 */
public class CeQueFinallyGarantit {

    private final Ascenseur ascenseur = new Ascenseur(5);
    private final Porte porte = new Porte();

    void deplacer(int etage) throws EtageInaccessibleException {
        porte.verrouiller();
        try {
            ascenseur.appeler(etage);
        } finally {
            porte.deverrouiller();         // dans tous les cas
        }
    }

    public static void main(String[] args) {
        CeQueFinallyGarantit cabine = new CeQueFinallyGarantit();
        try {
            cabine.deplacer(3);
            System.out.println("Deplacement reussi");
            cabine.deplacer(9);
            System.out.println("Jamais affiche");
        } catch (EtageInaccessibleException e) {
            System.out.println("Refus : " + e.getMessage());
        }
    }

    /* Sortie attendue :
    Porte verrouillee
    Porte deverrouillee
    Deplacement reussi
    Porte verrouillee
    Porte deverrouillee
    Refus : Etage 9 hors de l'intervalle 0 a 5
    */
}
