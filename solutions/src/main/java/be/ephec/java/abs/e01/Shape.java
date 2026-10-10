package be.ephec.java.abs.e01;

/**
 * ABS.1 — CORRIGE.
 *
 * Le partage des roles entre la classe abstraite et ses sous-classes est le
 * coeur de l'exercice.
 *
 *   Shape porte tout ce qui est COMMUN : le centre, la rotation, et la facon
 *   de s'afficher — car la phrase "Je suis un X et je m'affiche" a la meme
 *   forme pour les trois.
 *
 *   Les sous-classes ne portent que ce qui VARIE : le nom de la forme.
 *
 * Si les trois sous-classes avaient chacune leur propre affiche(), la phrase
 * serait recopiee trois fois et une correction en oublierait deux. C'est
 * exactement ce que la regle CC-CLS.3 du memento Clean Code appelle une
 * duplication.
 */
public abstract class Shape {

    private final Point centre;
    private double rotation;

    /**
     * protected et non public : un constructeur de classe abstraite n'a de
     * sens que pour ses sous-classes, puisqu'on ne peut pas faire de new sur
     * une classe abstraite.
     */
    protected Shape(Point centre) {
        this.centre = centre;
    }

    public abstract String nom();

    public void affiche() {
        System.out.println("Je suis un " + nom() + " et je m'affiche");
    }

    public void efface() {
        System.out.println("Je suis un " + nom() + " et je m'efface");
    }

    public Point getCentre() {
        return centre;
    }

    public double getRotation() {
        return rotation;
    }

    /**
     * Le piege : en Java, le reste de la division garde le signe du dividende.
     * -90 % 360 vaut -90, pas 270. On ajoute donc 360 avant de reprendre le
     * reste, ce qui ramene tout dans l'intervalle voulu.
     */
    public void setRotation(double degres) {
        this.rotation = ((degres % 360) + 360) % 360;
    }
}
