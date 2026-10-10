package be.ephec.java.abs.e04;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Modifier;

import static org.junit.jupiter.api.Assertions.*;

/**
 * ABS.4 — Verification automatique.
 *
 * Les premiers tests verifient la FORME de la hierarchie, pas seulement
 * les resultats. C'est inhabituel, et c'est voulu : l'exercice porte sur
 * la structure autant que sur le calcul.
 */
class PrestationTest {

    @Test
    @DisplayName("Les trois classes du haut sont abstraites")
    void hierarchieAbstraite() {
        assertTrue(Modifier.isAbstract(Prestation.class.getModifiers()),
                "une prestation « en general » ne se facture pas");
        assertTrue(Modifier.isAbstract(Forfait.class.getModifiers()));
        assertTrue(Modifier.isAbstract(Horaire.class.getModifiers()));
    }

    @Test
    @DisplayName("Prestation implemente Facturable sans savoir calculer")
    void prestationEstFacturable() {
        assertTrue(Facturable.class.isAssignableFrom(Prestation.class));

        assertThrows(NoSuchMethodException.class,
                () -> Prestation.class.getDeclaredMethod("montant"),
                "montant() ne doit pas etre ecrite dans Prestation : "
                        + "elle ne sait pas encore calculer");
    }

    @Test
    @DisplayName("La hierarchie a bien deux niveaux")
    void deuxNiveaux() {
        assertEquals(Forfait.class, Abonnement.class.getSuperclass());
        assertEquals(Prestation.class, Forfait.class.getSuperclass());
        assertEquals(Horaire.class, Urgence.class.getSuperclass());
        assertEquals(Prestation.class, Horaire.class.getSuperclass());
    }

    @Test
    @DisplayName("Un abonnement vaut son forfait")
    void abonnement() {
        assertEquals(125, new Abonnement("Ada", 125).montant(), 0.001);
    }

    @Test
    @DisplayName("Une installation ajoute le deplacement")
    void installation() {
        assertEquals(245.50, new Installation("Alan", 200, 45.50).montant(), 0.001);
    }

    @Test
    @DisplayName("Un depannage se facture aux heures")
    void depannage() {
        assertEquals(195, new Depannage("Grace", 65, 3).montant(), 0.001);
    }

    @Test
    @DisplayName("Une urgence majore le taux")
    void urgence() {
        assertEquals(195, new Urgence("Charles", 65, 2, 0.5).montant(), 0.001,
                "deux heures a 65, majorees de moitie");
        assertEquals(130, new Urgence("Charles", 65, 2, 0).montant(), 0.001,
                "sans majoration, c'est un depannage");
    }

    @Test
    @DisplayName("La facture est ecrite une seule fois, dans Prestation")
    void facture() {
        assertEquals("Ada : 125.00 EUR", new Abonnement("Ada", 125).facture());
        assertEquals("Charles : 195.00 EUR", new Urgence("Charles", 65, 2, 0.5).facture());
    }

    @Test
    @DisplayName("Les quatre sortes tiennent dans un meme tableau")
    void polymorphisme() {
        Prestation[] prestations = {
                new Abonnement("Ada", 125),
                new Installation("Alan", 200, 45.50),
                new Depannage("Grace", 65, 3),
                new Urgence("Charles", 65, 2, 0.5)
        };

        double total = 0;
        for (Prestation prestation : prestations) {
            total += prestation.montant();
        }

        assertEquals(760.50, total, 0.001);
    }
}
