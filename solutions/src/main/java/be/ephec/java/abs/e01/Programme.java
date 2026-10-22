package be.ephec.java.abs.e01;

/** ABS.1 — CORRIGE. */
public class Programme {

    public static void main(String[] args) {
        // Le tableau est declare Shape[], mais aucun Shape n'y est stocke :
        // on ne peut pas en construire. Il contient des Circle, des Square et
        // des Triangle, vus a travers leur type commun.
        Shape[] formes = {
                new Circle(new Point(0, 0)),
                new Square(new Point(10, 10)),
                new Triangle(new Point(-5, 3))
        };

        for (Shape forme : formes) {
            forme.affiche();
        }

        formes[1].setRotation(370);
        System.out.println("Rotation du carre : " + formes[1].getRotation());

        for (Shape forme : formes) {
            forme.efface();
        }

        // Le programme n'a teste le type d'aucune forme. C'est le
        // polymorphisme qui choisit la bonne implementation de nom().
    }
}
