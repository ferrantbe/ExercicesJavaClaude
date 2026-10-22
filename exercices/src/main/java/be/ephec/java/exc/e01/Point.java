package be.ephec.java.exc.e01;

/** EXC.1 — A COMPLETER. */
public class Point {

    private int x;
    private int y;

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    /**
     * Deplace le point de dx et dy.
     *
     * Un point ne peut pas sortir du quadrant positif : si l'une des
     * coordonnees devenait negative, le deplacement n'a PAS lieu et la
     * methode leve une MoveException.
     *
     * Le message doit valoir exactement, pour un deplacement qui menerait
     * en (-3, 5) :
     *     "Deplacement refuse : (-3, 5) sort du quadrant positif"
     *
     * @throws MoveException si une coordonnee deviendrait negative
     */
    public void deplace(int dx, int dy) throws MoveException {
        throw new UnsupportedOperationException("deplace n'est pas encore implementee");
    }
}
