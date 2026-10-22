package be.ephec.java.itf.e03;

/**
 * ITF.3 — CORRIGE.
 *
 * La question posee par l'enonce : translate et rotate doivent-elles rester
 * abstraites dans Shape, ou peut-elle les definir ?
 *
 * Reponse : elle peut, et elle doit. Ces deux methodes ne font que modifier
 * le centre et la rotation — deux champs que Shape possede deja. Le seul
 * element qui varie d'une forme a l'autre est le nom affiche, et il est deja
 * fourni par la methode abstraite nom().
 *
 * Consequence directe : les trois sous-classes n'ont RIEN a changer. Elles
 * heritent des deux methodes sans un mot. Si vous avez du les modifier,
 * c'est que du code commun etait descendu trop bas.
 *
 * Une classe n'herite que d'une seule classe, mais elle implemente autant
 * d'interfaces qu'elle veut : c'est ce qui permet a Shape d'etre a la fois
 * translatable et rotatable.
 */
public abstract class Shape implements Translatable, Rotatable {

    private final Point centre;
    private double rotation;

    protected Shape(Point centre) {
        this.centre = centre;
    }

    public abstract String nom();

    public Point getCentre() {
        return centre;
    }

    public double getRotation() {
        return rotation;
    }

    @Override
    public void translate(double dx, double dy) {
        centre.x += dx;
        centre.y += dy;
        System.out.println("Je suis un " + nom()
                + " et je me deplace de " + dx + ", " + dy);
    }

    /**
     * Meme normalisation qu'en ABS.1 : le reste de la division garde le signe
     * du dividende en Java, d'ou le detour par + 360.
     */
    @Override
    public void rotate(double alpha) {
        this.rotation = (((rotation + alpha) % 360) + 360) % 360;
        System.out.println("Je suis un " + nom()
                + " et je tourne de " + alpha + " degres");
    }

    public void affiche() {
        System.out.println("Je suis un " + nom() + " et je m'affiche");
    }
}
