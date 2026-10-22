package be.ephec.java.itf.e03;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/** ITF.3 — Verification automatique. */
class ShapeTest {

    @Test
    @DisplayName("Shape implemente les deux interfaces")
    void deuxInterfaces() {
        Shape forme = new Circle(new Point(0, 0));

        assertTrue(forme instanceof Translatable);
        assertTrue(forme instanceof Rotatable,
                "Une classe n'herite que d'une classe, mais implemente "
                        + "autant d'interfaces qu'elle veut.");
    }

    @Test
    @DisplayName("translate deplace le centre")
    void translation() {
        Shape forme = new Square(new Point(10, 20));

        forme.translate(3, -4);

        assertEquals(13.0, forme.getCentre().x, 0.001);
        assertEquals(16.0, forme.getCentre().y, 0.001);
    }

    @Test
    @DisplayName("Les translations s'accumulent")
    void translationsSuccessives() {
        Shape forme = new Square(new Point(0, 0));

        forme.translate(1, 1);
        forme.translate(2, 3);

        assertEquals(3.0, forme.getCentre().x, 0.001);
        assertEquals(4.0, forme.getCentre().y, 0.001);
    }

    @Test
    @DisplayName("rotate ajoute a la rotation et la ramene entre 0 et 360")
    void rotation() {
        Shape forme = new Triangle(new Point(0, 0));

        forme.rotate(90);
        assertEquals(90.0, forme.getRotation(), 0.001);

        forme.rotate(300);
        assertEquals(30.0, forme.getRotation(), 0.001, "90 + 300 = 390, soit 30");

        forme.rotate(-60);
        assertEquals(330.0, forme.getRotation(), 0.001, "30 - 60 = -30, soit 330");
    }

    @Test
    @DisplayName("Les trois formes partagent le meme code de transformation")
    void memeComportement() {
        Shape[] formes = {
                new Circle(new Point(0, 0)),
                new Square(new Point(0, 0)),
                new Triangle(new Point(0, 0))
        };

        for (Shape forme : formes) {
            forme.translate(5, 5);
            forme.rotate(45);

            assertEquals(5.0, forme.getCentre().x, 0.001);
            assertEquals(45.0, forme.getRotation(), 0.001);
        }
    }

    @Test
    @DisplayName("Un tableau de Translatable ne voit que la translation")
    void vueParLInterface() {
        Translatable[] objets = {new Circle(new Point(0, 0)), new Square(new Point(0, 0))};

        for (Translatable objet : objets) {
            objet.translate(2, 2);
        }

        assertEquals(2.0, ((Shape) objets[0]).getCentre().x, 0.001);
    }
}
