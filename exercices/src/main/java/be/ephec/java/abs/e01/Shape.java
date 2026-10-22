package be.ephec.java.abs.e01;

/**
 * ABS.1 — A COMPLETER.
 *
 * Une classe abstraite ne s'instancie pas : elle sert de socle commun. Elle
 * porte ce que toutes les formes ont en commun, et laisse aux sous-classes
 * ce qui les distingue.
 */
public abstract class Shape {

    // TODO : declarez le centre (Point) et la rotation (double), en private

    protected Shape(Point centre) {
        throw new UnsupportedOperationException("le constructeur n'est pas encore implemente");
    }

    /**
     * Retourne le nom de la forme, en minuscules et au singulier :
     * "cercle", "carre", "triangle".
     *
     * C'est la SEULE chose qui distingue les trois formes. Elle est donc
     * abstraite : chaque sous-classe doit la definir.
     */
    public abstract String nom();

    /** Affiche "Je suis un cercle et je m'affiche". */
    public void affiche() {
        throw new UnsupportedOperationException("affiche n'est pas encore implementee");
    }

    /** Affiche "Je suis un carre et je m'efface". */
    public void efface() {
        throw new UnsupportedOperationException("efface n'est pas encore implementee");
    }

    public Point getCentre() {
        throw new UnsupportedOperationException("getCentre n'est pas encore implementee");
    }

    public double getRotation() {
        throw new UnsupportedOperationException("getRotation n'est pas encore implementee");
    }

    /**
     * Fixe la rotation, TOUJOURS ramenee entre 0 inclus et 360 exclu.
     * 370 devient 10, -90 devient 270, 720 devient 0.
     *
     * Attention : en Java, -90 % 360 vaut -90 et non 270.
     */
    public void setRotation(double degres) {
        throw new UnsupportedOperationException("setRotation n'est pas encore implementee");
    }
}
