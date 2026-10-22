package be.ephec.java.exc.e05;

/** EXC.5 — Cette classe vous est FOURNIE. */
public class Partie {

    private final Joueur joueur = new Joueur();

    public void demarre() {
        joueUnTour();
    }

    private void joueUnTour() {
        // Aucun ennemi en vue ce tour-ci : zero cible.
        joueur.lanceUnSort(30, 0);
    }
}
