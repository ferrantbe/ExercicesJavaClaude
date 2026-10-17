package be.ephec.java.abs.e02;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Modifier;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

/** ABS.2 — Verification automatique. */
class AnimalTest {

    @Test
    @DisplayName("Animal est abstraite")
    void animalEstAbstraite() {
        assertTrue(Modifier.isAbstract(Animal.class.getModifiers()));
    }

    @Test
    @DisplayName("Chaque animal a son cri")
    void cris() {
        assertEquals("J'aboie", new Dog().cri());
        assertEquals("Je miaule", new Cat().cri());
    }

    @Test
    @DisplayName("Un tableau d'Animal retourne les cris de ses vrais elements")
    void polymorphisme() {
        Animal[] animaux = {new Dog(), new Cat(), new Dog()};

        assertEquals("J'aboie", animaux[0].cri());
        assertEquals("Je miaule", animaux[1].cri());
        assertEquals("J'aboie", animaux[2].cri());
    }
}
