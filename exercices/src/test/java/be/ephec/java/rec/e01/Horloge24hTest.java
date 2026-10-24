package be.ephec.java.rec.e01;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/** REC.1 — Verification automatique. */
class Horloge24hTest {

    @Test
    @DisplayName("HeureInvalideException est une exception controlee")
    void exceptionControlee() {
        assertTrue(Exception.class.isAssignableFrom(HeureInvalideException.class));
        assertFalse(RuntimeException.class.isAssignableFrom(HeureInvalideException.class),
                "heriter d'Exception, pas de RuntimeException");
    }

    @Test
    @DisplayName("Une heure valide est retenue telle quelle")
    void construction() throws HeureInvalideException {
        Horloge24h horloge = new Horloge24h(9, 3);

        assertEquals(9, horloge.getHeures());
        assertEquals(3, horloge.getMinutes());
    }

    @Test
    @DisplayName("Les bornes 0:00 et 23:59 sont acceptees")
    void bornesAcceptees() throws HeureInvalideException {
        assertEquals("00:00", new Horloge24h(0, 0).toString());
        assertEquals("23:59", new Horloge24h(23, 59).toString());
    }

    @Test
    @DisplayName("24 heures ou 60 minutes sont refusees a la construction")
    void bornesRefusees() {
        assertThrows(HeureInvalideException.class, () -> new Horloge24h(24, 0));
        assertThrows(HeureInvalideException.class, () -> new Horloge24h(0, 60));
        assertThrows(HeureInvalideException.class, () -> new Horloge24h(-1, 0));
        assertThrows(HeureInvalideException.class, () -> new Horloge24h(0, -1));
    }

    @Test
    @DisplayName("Un modificateur refuse la valeur hors bornes et laisse l'horloge intacte")
    void modificateursRefusent() throws HeureInvalideException {
        Horloge24h horloge = new Horloge24h(10, 30);

        assertThrows(HeureInvalideException.class, () -> horloge.setHeures(24));
        assertThrows(HeureInvalideException.class, () -> horloge.setMinutes(-5));

        assertEquals(10, horloge.getHeures(), "l'horloge ne doit pas avoir change");
        assertEquals(30, horloge.getMinutes());
    }

    @Test
    @DisplayName("Un modificateur accepte la valeur dans les bornes")
    void modificateursAcceptent() throws HeureInvalideException {
        Horloge24h horloge = new Horloge24h(10, 30);

        horloge.setHeures(23);
        horloge.setMinutes(0);

        assertEquals("23:00", horloge.toString());
    }

    @Test
    @DisplayName("toString donne toujours deux chiffres par composant")
    void format() throws HeureInvalideException {
        assertEquals("09:03", new Horloge24h(9, 3).toString());
        assertEquals("22:45", new Horloge24h(22, 45).toString());
    }

    @Test
    @DisplayName("Ajouter sans retenue")
    void ajoutSimple() throws HeureInvalideException {
        Horloge24h horloge = new Horloge24h(10, 20);

        horloge.ajouter(2, 15);

        assertEquals("12:35", horloge.toString());
    }

    @Test
    @DisplayName("Les minutes qui depassent 59 deviennent une heure")
    void retenueDesMinutes() throws HeureInvalideException {
        Horloge24h horloge = new Horloge24h(10, 50);

        horloge.ajouter(0, 20);

        assertEquals("11:10", horloge.toString());
    }

    @Test
    @DisplayName("Les heures qui depassent 23 repartent de zero")
    void tourDuCadran() throws HeureInvalideException {
        Horloge24h horloge = new Horloge24h(23, 50);

        horloge.ajouter(0, 20);

        assertEquals("00:10", horloge.toString());
    }

    @Test
    @DisplayName("Ajouter plus d'un jour fait plusieurs tours")
    void plusieursTours() throws HeureInvalideException {
        Horloge24h horloge = new Horloge24h(6, 0);

        horloge.ajouter(49, 90);

        assertEquals("08:30", horloge.toString());
    }

    @Test
    @DisplayName("Ajouter une horloge, c'est ajouter sa duree")
    void ajoutDuneHorloge() throws HeureInvalideException {
        Horloge24h horloge = new Horloge24h(22, 30);
        Horloge24h duree = new Horloge24h(3, 45);

        horloge.ajouter(duree);

        assertEquals("02:15", horloge.toString());
        assertEquals("03:45", duree.toString(), "la duree ne doit pas avoir change");
    }
}
