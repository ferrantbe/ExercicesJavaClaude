package be.ephec.java.sta.e01;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.MethodOrderer;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;

import static org.junit.jupiter.api.Assertions.*;

/**
 * STA.1 — Verification automatique.
 *
 * PARTICULARITE DE CETTE CLASSE. Un compteur statique garde sa valeur
 * d'un test a l'autre : c'est justement ce qu'on veut demontrer, mais
 * cela rend les tests dependants de leur ordre.
 *
 * On l'assume ici, avec @Order, plutot que de le cacher. Retenez la
 * lecon : un etat partage rend les tests plus difficiles a ecrire. C'est
 * une raison de ne pas en abuser.
 */
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class ReservationTest {

    @Test
    @Order(1)
    @DisplayName("La constante est publique, statique et finale")
    void laConstante() throws Exception {
        Field champ = Reservation.class.getDeclaredField("PLACES_MAX");
        int modificateurs = champ.getModifiers();

        assertTrue(Modifier.isPublic(modificateurs), "une constante se lit de partout");
        assertTrue(Modifier.isStatic(modificateurs), "elle est la meme pour tous");
        assertTrue(Modifier.isFinal(modificateurs), "elle ne change pas");
        assertEquals(50, Reservation.PLACES_MAX);
    }

    @Test
    @Order(2)
    @DisplayName("Le compteur repond avant qu'aucune reservation n'existe")
    void compteurInitial() {
        assertEquals(0, Reservation.nombreEmises(),
                "la methode s'appelle sur la classe, pas sur un objet");
        assertTrue(Reservation.resteDeLaPlace());
    }

    @Test
    @Order(3)
    @DisplayName("Les numeros se suivent, en commencant a 1")
    void numerotation() {
        Reservation premiere = new Reservation("Ada Lovelace");
        Reservation deuxieme = new Reservation("Alan Turing");
        Reservation troisieme = new Reservation("Grace Hopper");

        assertEquals(1, premiere.getNumero(), "la premiere porte le numero 1, pas 0");
        assertEquals(2, deuxieme.getNumero());
        assertEquals(3, troisieme.getNumero());
    }

    @Test
    @Order(4)
    @DisplayName("Le compteur a suivi les trois creations")
    void compteurApres() {
        assertEquals(3, Reservation.nombreEmises(),
                "une seule case en memoire, partagee par les trois objets");
    }

    @Test
    @Order(5)
    @DisplayName("Le format du toString")
    void miseEnTexte() {
        Reservation quatrieme = new Reservation("Charles Babbage");

        assertEquals("Reservation n4 : Charles Babbage", quatrieme.toString());
    }

    @Test
    @Order(6)
    @DisplayName("Le compteur est prive : personne ne le remet a zero de l'exterieur")
    void compteurProtege() throws Exception {
        Field champ = Reservation.class.getDeclaredField("emises");

        assertTrue(Modifier.isPrivate(champ.getModifiers()));
        assertTrue(Modifier.isStatic(champ.getModifiers()));
    }
}
