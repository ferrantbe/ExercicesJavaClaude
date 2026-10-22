package be.ephec.java.exc.e01;

/** EXC.1 — CORRIGE. */
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
     * Le point important : on calcule les coordonnees d'arrivee dans des
     * variables locales, on verifie, et on n'ecrit dans les champs qu'apres.
     *
     * Ecrire d'abord et verifier ensuite laisserait l'objet dans un etat
     * invalide chaque fois que l'exception est levee. Une methode qui echoue
     * doit laisser l'objet tel qu'elle l'a trouve — le test le verifie.
     */
    public void deplace(int dx, int dy) throws MoveException {
        int nouveauX = x + dx;
        int nouveauY = y + dy;

        if (nouveauX < 0 || nouveauY < 0) {
            throw new MoveException("Deplacement refuse : ("
                    + nouveauX + ", " + nouveauY + ") sort du quadrant positif");
        }

        this.x = nouveauX;
        this.y = nouveauY;
    }
}
