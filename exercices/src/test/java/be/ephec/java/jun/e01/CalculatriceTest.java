package be.ephec.java.jun.e01;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

/**
 * JUN.1 — Cette classe de test EST l'enonce.
 *
 * Lisez-la avant d'ecrire une ligne de Calculatrice. Elle vous dit tout :
 * ce que chaque methode doit retourner, et ce qui doit se produire quand on
 * divise par zero.
 *
 * Remarquez sa structure : chaque test prepare des donnees, execute UNE
 * action, puis verifie UN comportement. C'est le modele a suivre quand vous
 * ecrirez les votres en JUN.3.
 */
class CalculatriceTest {

    private final Calculatrice calculatrice = new Calculatrice();

    @Test
    @DisplayName("L'addition additionne, y compris avec des negatifs")
    void addition() {
        assertEquals(7, calculatrice.addition(3, 4));
        assertEquals(0, calculatrice.addition(-5, 5));
        assertEquals(-9, calculatrice.addition(-4, -5));
    }

    @Test
    @DisplayName("La soustraction n'est pas commutative")
    void soustraction() {
        assertEquals(-1, calculatrice.soustraction(3, 4));
        assertEquals(1, calculatrice.soustraction(4, 3));
        assertEquals(0, calculatrice.soustraction(7, 7));
    }

    @Test
    @DisplayName("La multiplication par zero retourne zero")
    void multiplication() {
        assertEquals(12, calculatrice.multiplication(3, 4));
        assertEquals(0, calculatrice.multiplication(-5, 0));
        assertEquals(20, calculatrice.multiplication(-4, -5));
    }

    @Test
    @DisplayName("La division entiere tronque vers zero")
    void division() {
        assertEquals(3, calculatrice.division(12, 4));
        assertEquals(2, calculatrice.division(11, 4),
                "11 / 4 vaut 2.75 : la division entiere tronque, elle n'arrondit pas");
        assertEquals(-2, calculatrice.division(-7, 3));
    }

    @Test
    @DisplayName("Diviser par zero leve une ArithmeticException")
    void divisionParZero() {
        assertThrows(ArithmeticException.class, () -> calculatrice.division(10, 0),
                "Ne retournez pas 0 et n'attrapez rien : laissez l'exception passer.");
    }
}
