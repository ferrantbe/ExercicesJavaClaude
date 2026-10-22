package be.ephec.java.exc.e01;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/** EXC.1 — Verification automatique. */
class PointTest {

    @Test
    @DisplayName("MoveException est une exception controlee")
    void exceptionControlee() {
        assertTrue(Exception.class.isAssignableFrom(MoveException.class));
        assertFalse(RuntimeException.class.isAssignableFrom(MoveException.class),
                "heriter d'Exception, pas de RuntimeException : le compilateur "
                        + "doit obliger l'appelant a la traiter");
    }

    @Test
    @DisplayName("Un deplacement valide bouge le point")
    void deplacementValide() throws MoveException {
        Point point = new Point(10, 10);

        point.deplace(3, -4);

        assertEquals(13, point.getX());
        assertEquals(6, point.getY());
    }

    @Test
    @DisplayName("Un deplacement vers une abscisse negative est refuse")
    void abscisseNegative() {
        Point point = new Point(2, 5);

        assertThrows(MoveException.class, () -> point.deplace(-5, 0));
    }

    @Test
    @DisplayName("Le point ne bouge pas quand le deplacement est refuse")
    void pointIntact() {
        Point point = new Point(2, 5);

        assertThrows(MoveException.class, () -> point.deplace(-5, 0));

        assertEquals(2, point.getX(), "la coordonnee ne doit pas avoir change");
        assertEquals(5, point.getY());
    }

    @Test
    @DisplayName("Le message nomme les coordonnees refusees")
    void message() {
        Point point = new Point(0, 5);

        MoveException levee = assertThrows(MoveException.class, () -> point.deplace(-3, 0));

        assertEquals("Deplacement refuse : (-3, 5) sort du quadrant positif",
                levee.getMessage());
    }

    @Test
    @DisplayName("Zero est accepte : c'est le negatif qui est refuse")
    void zeroAccepte() throws MoveException {
        Point point = new Point(3, 3);

        point.deplace(-3, -3);

        assertEquals(0, point.getX());
        assertEquals(0, point.getY());
    }
}
