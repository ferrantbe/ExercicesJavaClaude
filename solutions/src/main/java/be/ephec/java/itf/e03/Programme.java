package be.ephec.java.itf.e03;

/** ITF.3 — CORRIGE. */
public class Programme {

    public static void main(String[] args) {
        Shape[] formes = {
                new Circle(new Point(0, 0)),
                new Square(new Point(10, 10)),
                new Triangle(new Point(-5, 3))
        };

        for (Shape forme : formes) {
            forme.affiche();
            forme.translate(3, 4);
            forme.rotate(90);
        }

        System.out.println();

        // Vu a travers l'interface, un objet ne montre que ce qu'elle declare.
        // On peut le deplacer, mais ni le faire tourner ni lui demander son
        // nom : le compilateur refuserait. C'est voulu — l'interface decrit un
        // contrat, pas un objet.
        Translatable[] deplacables = formes;
        for (Translatable deplacable : deplacables) {
            deplacable.translate(1, 1);
            // deplacable.rotate(45);   // ne compile pas
            // deplacable.nom();        // ne compile pas
        }
    }
}
