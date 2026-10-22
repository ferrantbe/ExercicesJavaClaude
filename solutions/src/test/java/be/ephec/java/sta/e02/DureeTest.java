package be.ephec.java.sta.e02;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Constructor;
import java.lang.reflect.Modifier;

import static org.junit.jupiter.api.Assertions.*;

/** STA.2 — Verification automatique. */
class DureeTest {

    @Test
    @DisplayName("Le constructeur est prive : on passe par les fabriques")
    void constructeurPrive() {
        for (Constructor<?> constructeur : Duree.class.getDeclaredConstructors()) {
            assertTrue(Modifier.isPrivate(constructeur.getModifiers()),
                    "un constructeur public permettrait new Duree(2), "
                            + "qui ne dit pas dans quelle unite");
        }
    }

    @Test
    @DisplayName("Les deux fabriques construisent la meme chose autrement")
    void fabriques() {
        assertEquals(90, Duree.deMinutes(90).enMinutes());
        assertEquals(120, Duree.deHeures(2).enMinutes());
        assertEquals(Duree.deHeures(1).enMinutes(), Duree.deMinutes(60).enMinutes());
    }

    @Test
    @DisplayName("L'addition retourne une nouvelle duree et ne touche a rien")
    void addition() {
        Duree trois = Duree.deHeures(3);
        Duree cinq = Duree.deMinutes(5);

        Duree somme = trois.plus(cinq);

        assertEquals(185, somme.enMinutes());
        assertEquals(180, trois.enMinutes(), "trois heures n'ont pas change");
        assertEquals(5, cinq.enMinutes());
    }

    @Test
    @DisplayName("Le total accepte un nombre quelconque de durees")
    void total() {
        assertEquals(215, Duree.total(Duree.deHeures(3), Duree.deMinutes(35)).enMinutes());
        assertEquals(0, Duree.total().enMinutes(), "aucune duree : zero minute");
        assertEquals(60, Duree.total(Duree.deMinutes(60)).enMinutes());
    }

    @Test
    @DisplayName("215 minutes s'ecrivent 3h35")
    void heuresEtMinutesEnTexte() {
        assertEquals("3h35", Duree.deMinutes(215).toString());
    }

    @Test
    @DisplayName("15 minutes s'ecrivent 15min")
    void minutesSeulesEnTexte() {
        assertEquals("15min", Duree.deMinutes(15).toString());
    }

    @Test
    @DisplayName("2 heures s'ecrivent 2h00 : deux chiffres pour les minutes")
    void heuresRondesEnTexte() {
        assertEquals("2h00", Duree.deHeures(2).toString(), "deux chiffres pour les minutes");
    }

    @Test
    @DisplayName("445 minutes s'ecrivent 7h25")
    void plusieursHeuresEnTexte() {
        assertEquals("7h25", Duree.deMinutes(445).toString());
    }

    @Test
    @DisplayName("0 minute s'ecrit 0min")
    void zeroMinuteEnTexte() {
        assertEquals("0min", Duree.deMinutes(0).toString());
    }
}
