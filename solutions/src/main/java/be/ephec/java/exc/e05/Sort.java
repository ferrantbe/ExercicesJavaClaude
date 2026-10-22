package be.ephec.java.exc.e05;

/**
 * EXC.5 — CORRIGE. Fournie, inchangee : le defaut est volontaire.
 *
 * Un sort inflige des degats repartis sur un nombre de cibles.
 */
public class Sort {

    private final int degatsParCible;

    public Sort(int degatsTotaux, int nombreDeCibles) {
        this.degatsParCible = degatsTotaux / nombreDeCibles;
    }

    public int getDegatsParCible() {
        return degatsParCible;
    }
}
