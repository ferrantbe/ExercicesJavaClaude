package be.ephec.java.demo.poo.slides;

/**
 * Slide « Les fabriques » (POO, section 4).
 *
 * Le constructeur est prive : on obtient un Point par une methode de classe,
 * dont le nom dit ce que signifient les deux nombres.
 */
public class LesFabriques {

    static class Point {
        private final double x;
        private final double y;

        private Point(double x, double y) {
            this.x = x;
            this.y = y;
        }

        public static Point cartesien(double x, double y) {
            return new Point(x, y);
        }

        public static Point polaire(double rayon, double angle) {
            double x = rayon * Math.cos(angle);
            double y = rayon * Math.sin(angle);
            return new Point(x, y);
        }

        @Override
        public String toString() {      // ajoute pour la demonstration
            return "(" + Math.round(x * 100) / 100.0 + " ; " + Math.round(y * 100) / 100.0 + ")";
        }
    }

    public static void main(String[] args) {
        Point a = Point.cartesien(3, 4);
        Point b = Point.polaire(5, 0.93);
        System.out.println("a = " + a);
        System.out.println("b = " + b + ", presque le meme point");
    }

    /* Sortie attendue :
    a = (3.0 ; 4.0)
    b = (2.99 ; 4.01), presque le meme point
    */
}
