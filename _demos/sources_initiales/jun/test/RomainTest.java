package be.ephec.java.travail;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * DEPART JUN — etat de l'etape 3.
 *
 * A placer dans src/test/java, pas dans src/main/java.
 *
 * Un seul test, qui passe. Les etapes 4 et 5 consistent a en ajouter
 * d'autres, un par un, et a regarder le code grandir a chaque fois.
 */
class RomainTest {

    @Test
    void unVaut1() {
        assertEquals(1, Romain.enChiffres("I"));
    }
}
