package be.ephec.java.demo.exc.slides;

/**
 * L'ascenseur qui sert d'exemple a toutes les slides du deck EXC.
 *
 * Chaque methode reprend le code d'une slide, indiquee en commentaire.
 */
public class Ascenseur {

    private final int dernierEtage;
    private int etageCourant;

    // Slide « Lever une exception du JDK » (section 4)
    public Ascenseur(int dernierEtage) {
        if (dernierEtage < 0) {
            throw new IllegalArgumentException(
                    "Le dernier etage doit etre positif ou nul, pas " + dernierEtage);
        }
        this.dernierEtage = dernierEtage;
    }

    // Slide « Lever avec throw, declarer avec throws » (section 2)
    public void appeler(int etage) throws EtageInaccessibleException {
        if (etage < 0 || etage > dernierEtage) {
            throw new EtageInaccessibleException("Etage " + etage
                    + " hors de l'intervalle 0 a " + dernierEtage);
        }
        etageCourant = etage;
    }

    // Slide « Elle remonte la pile » (section 1)
    public void monter(int etage) {
        verifier(etage);       // l'exception traverse monter
        deplacer(etage);       // jamais execute si verifier echoue
    }

    private void verifier(int etage) {
        if (etage > dernierEtage) {
            throw new IllegalArgumentException("Etage " + etage
                    + " au-dela du dernier, " + dernierEtage);
        }
    }

    private void deplacer(int etage) {
        etageCourant = etage;
        System.out.println("Ascenseur arrive a l'etage " + etage);
    }

    public int etageCourant() {
        return etageCourant;
    }

    public int dernierEtage() {
        return dernierEtage;
    }
}
