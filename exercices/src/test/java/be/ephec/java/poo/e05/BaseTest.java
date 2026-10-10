package be.ephec.java.poo.e05;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * POO.5 — Verification automatique de la methode enBase10.
 */
class BaseTest {

    @Test
    @DisplayName("La base 10 rend le nombre lui-meme")
    void base10() {
        assertEquals(255, Base.enBase10("255", 10));
        assertEquals(0, Base.enBase10("0", 10));
    }

    @Test
    @DisplayName("Le binaire est converti correctement")
    void base2() {
        assertEquals(10, Base.enBase10("1010", 2));
        assertEquals(1, Base.enBase10("1", 2));
        assertEquals(255, Base.enBase10("11111111", 2));
    }

    @Test
    @DisplayName("L'hexadecimal est converti correctement, en majuscules comme en minuscules")
    void base16() {
        assertEquals(255, Base.enBase10("FF", 16));
        assertEquals(255, Base.enBase10("ff", 16));
        assertEquals(2748, Base.enBase10("ABC", 16));
    }

    @Test
    @DisplayName("L'octal est converti correctement")
    void base8() {
        assertEquals(8, Base.enBase10("10", 8));
        assertEquals(511, Base.enBase10("777", 8));
    }

    @Test
    @DisplayName("Le signe moins est accepte")
    void nombreNegatif() {
        assertEquals(-255, Base.enBase10("-FF", 16));
    }
}
