package be.ephec.java.demo.exc.slides;

/**
 * La porte de la cabine, pour les slides « Plusieurs catch, ou un seul »
 * et « Ce que finally garantit ».
 *
 * Elle peut etre bloquee ou privee de courant : ouvrir() leve alors
 * l'exception correspondante.
 */
public class Porte {

    private boolean bloquee;
    private boolean sansCourant;
    private boolean verrouillee;

    public void bloquer() {
        bloquee = true;
    }

    public void couperLeCourant() {
        sansCourant = true;
    }

    public void ouvrir() throws PorteBloqueeException, CoupureException {
        if (sansCourant) {
            throw new CoupureException("Plus de courant pour ouvrir la porte");
        }
        if (bloquee) {
            throw new PorteBloqueeException("La porte est bloquee");
        }
        System.out.println("Porte ouverte");
    }

    public void verrouiller() {
        verrouillee = true;
        System.out.println("Porte verrouillee");
    }

    public void deverrouiller() {
        verrouillee = false;
        System.out.println("Porte deverrouillee");
    }

    public boolean estVerrouillee() {
        return verrouillee;
    }
}
