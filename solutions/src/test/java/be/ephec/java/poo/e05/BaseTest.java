package be.ephec.java.poo.e05;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * POO.5 — Verification automatique de la methode enBase10.
 */
class BaseTest {

    @Test
    @DisplayName("255 en base 10 reste 255")
    void base10RetourneLeNombre() {
        assertEquals(255, Base.enBase10("255", 10));
    }

    @Test
    @DisplayName("0 en base 10 reste 0")
    void base10DeZero() {
        assertEquals(0, Base.enBase10("0", 10));
    }

    @Test
    @DisplayName("1010 en binaire vaut 10")
    void binaire1010() {
        assertEquals(10, Base.enBase10("1010", 2));
    }

    @Test
    @DisplayName("1 en binaire vaut 1")
    void binaire1() {
        assertEquals(1, Base.enBase10("1", 2));
    }

    @Test
    @DisplayName("11111111 en binaire vaut 255")
    void binaireHuitUns() {
        assertEquals(255, Base.enBase10("11111111", 2));
    }

    @Test
    @DisplayName("FF en hexadecimal vaut 255")
    void hexadecimalEnMajuscules() {
        assertEquals(255, Base.enBase10("FF", 16));
    }

    @Test
    @DisplayName("ff en hexadecimal vaut aussi 255")
    void hexadecimalEnMinuscules() {
        assertEquals(255, Base.enBase10("ff", 16));
    }

    @Test
    @DisplayName("ABC en hexadecimal vaut 2748")
    void hexadecimalABC() {
        assertEquals(2748, Base.enBase10("ABC", 16));
    }

    @Test
    @DisplayName("10 en octal vaut 8")
    void octal10() {
        assertEquals(8, Base.enBase10("10", 8));
    }

    @Test
    @DisplayName("777 en octal vaut 511")
    void octal777() {
        assertEquals(511, Base.enBase10("777", 8));
    }

    @Test
    @DisplayName("Le signe moins est accepte")
    void nombreNegatif() {
        assertEquals(-255, Base.enBase10("-FF", 16));
    }
}
