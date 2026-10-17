package be.ephec.java.itf.e03;

/**
 * ITF.3 — A COMPLETER.
 *
 * Reprise de ABS.1, a ceci pres que Shape implemente desormais DEUX
 * interfaces. Une classe ne peut heriter que d'une seule classe, mais elle
 * peut implementer autant d'interfaces qu'elle veut.
 *
 * La question a trancher : ces deux methodes doivent-elles rester abstraites
 * dans Shape, ou peut-elle les definir une fois pour toutes ?
 */
public abstract class Shape implements Translatable, Rotatable {

    private final Point centre;
    private double rotation;

    protected Shape(Point centre) {
        this.centre = centre;
    }

    /** Retourne "cercle", "carre" ou "triangle". */
    public abstract String nom();

    public Point getCentre() {
        return centre;
    }

    public double getRotation() {
        return rotation;
    }

    /**
     * TODO : deplace le centre de dx et dy, puis affiche
     *        "Je suis un carre et je me deplace de 3.0, 4.0".
     */
    @Override
    public void translate(double dx, double dy) {
        throw new UnsupportedOperationException("translate n'est pas encore implementee");
    }

    /**
     * TODO : ajoute alpha a la rotation, en la ramenant toujours entre 0
     *        inclus et 360 exclu, puis affiche
     *        "Je suis un triangle et je tourne de 90.0 degres".
     *
     *        Attention : en Java, -90 % 360 vaut -90 et non 270.
     */
    @Override
    public void rotate(double alpha) {
        throw new UnsupportedOperationException("rotate n'est pas encore implementee");
    }

    public void affiche() {
        System.out.println("Je suis un " + nom() + " et je m'affiche");
    }
}
