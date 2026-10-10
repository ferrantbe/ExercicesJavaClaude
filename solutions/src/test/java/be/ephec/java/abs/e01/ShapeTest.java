package be.ephec.java.abs.e01;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Modifier;

import static org.junit.jupiter.api.Assertions.*;

/** ABS.1 — Verification automatique. */
class ShapeTest {

    @Test
    /**
     * CE TEST EST VERT DES LE DEPART, et c'est voulu.
     *
     * Le squelette declare deja Shape abstraite — il le doit, puisqu'il
     * contient une methode abstraite, et qu'une methode abstraite exige
     * une classe abstraite.
     *
     * Il ne mesure donc pas votre progression : il GARDE une contrainte.
     * Le jour ou, bloque par « Shape is abstract; cannot be instantiated »,
     * on est tente de retirer le mot qui gene, ce test passe au rouge.
     */
    @DisplayName("Shape est abstraite et ne peut pas etre instanciee")
    void shapeEstAbstraite() {
        assertTrue(Modifier.isAbstract(Shape.class.getModifiers()),
                "Ce test est vert des le depart : il garde abstract en place, il ne mesure pas votre progression.");
    }

    @Test
    @DisplayName("Chaque forme rend son nom")
    void nomDesFormes() {
        Point origine = new Point(0, 0);

        assertEquals("cercle", new Circle(origine).nom());
        assertEquals("carre", new Square(origine).nom());
        assertEquals("triangle", new Triangle(origine).nom());
    }

    @Test
    @DisplayName("Le centre est celui passe au constructeur")
    void centre() {
        Point centre = new Point(3, 4);
        Shape forme = new Circle(centre);

        assertSame(centre, forme.getCentre());
        assertEquals(3.0, forme.getCentre().x, 0.001);
        assertEquals(4.0, forme.getCentre().y, 0.001);
    }

    @Test
    @DisplayName("La rotation d'une forme neuve vaut zero")
    void rotationInitiale() {
        assertEquals(0.0, new Square(new Point(0, 0)).getRotation(), 0.001);
    }

    @Test
    @DisplayName("La rotation reste toujours entre 0 et 360")
    void rotationNormalisee() {
        Shape forme = new Triangle(new Point(0, 0));

        forme.setRotation(90);
        assertEquals(90.0, forme.getRotation(), 0.001);

        forme.setRotation(370);
        assertEquals(10.0, forme.getRotation(), 0.001);

        forme.setRotation(360);
        assertEquals(0.0, forme.getRotation(), 0.001);

        forme.setRotation(-90);
        assertEquals(270.0, forme.getRotation(), 0.001,
                "En Java, -90 % 360 vaut -90. Il faut ramener le resultat.");

        forme.setRotation(-450);
        assertEquals(270.0, forme.getRotation(), 0.001);
    }

    @Test
    @DisplayName("Le polymorphisme fonctionne dans un tableau de Shape")
    void tableauDeFormes() {
        Point origine = new Point(0, 0);
        Shape[] formes = {new Circle(origine), new Square(origine), new Triangle(origine)};

        String[] attendus = {"cercle", "carre", "triangle"};
        for (int i = 0; i < formes.length; i++) {
            assertEquals(attendus[i], formes[i].nom(),
                    "chaque element rend le nom de son vrai type");
        }
    }
}
