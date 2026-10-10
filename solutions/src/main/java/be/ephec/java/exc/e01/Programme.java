package be.ephec.java.exc.e01;

/** EXC.1 — CORRIGE. */
public class Programme {

    public static void main(String[] args) {
        Point point = new Point(5, 5);

        // Le compilateur refuse d'appeler deplace sans traiter MoveException.
        try {
            point.deplace(3, 2);
            System.out.println("Point en (" + point.getX() + ", " + point.getY() + ")");

            point.deplace(-100, 0);
            System.out.println("Cette ligne ne s'affiche jamais.");

        } catch (MoveException e) {
            System.out.println("Refus : " + e.getMessage());
        }

        System.out.println("Le point est reste en ("
                + point.getX() + ", " + point.getY() + ")");
    }
}
