package be.ephec.java.tmp.e05;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;

import static org.junit.jupiter.api.Assertions.assertEquals;

/** TMP.5 — Verification automatique. */
class StatistiquesTest {

    @Test
    @DisplayName("Period decompose l'age en annees, mois et jours")
    void ageEnAnneesMoisJours() {
        Period age = Statistiques.age(LocalDate.of(1990, 5, 17), LocalDate.of(2027, 1, 19));

        assertEquals(36, age.getYears());
        assertEquals(8, age.getMonths());
        assertEquals(2, age.getDays());
    }

    @Test
    @DisplayName("Duration compte en heures et minutes")
    void dureeEnHeuresEtMinutes() {
        Duration duree = Statistiques.dureeDePartie(
                LocalDateTime.of(2027, 1, 19, 18, 0),
                LocalDateTime.of(2027, 1, 19, 21, 35));

        assertEquals(215, duree.toMinutes());
        assertEquals(3, duree.toHours());
    }

    @Test
    @DisplayName("La duree lisible s'ecrit 3h35")
    void dureeLisible() {
        assertEquals("3h35", Statistiques.dureeLisible(
                LocalDateTime.of(2027, 1, 19, 18, 0),
                LocalDateTime.of(2027, 1, 19, 21, 35)));
    }
}
