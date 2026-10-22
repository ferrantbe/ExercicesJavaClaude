package be.ephec.java.tmp.e04;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

/** TMP.4 — Verification automatique. */
class EcheancierTest {

    @Test
    @DisplayName("Un mois apres le 31 janvier tombe le 28 fevrier")
    void finDeMoisRabotee() {
        assertEquals(LocalDate.of(2027, 2, 28),
                Echeancier.echeance(LocalDate.of(2027, 1, 31), 1));
    }

    @Test
    @DisplayName("La meme date en annee bissextile tombe le 29")
    void anneeBissextile() {
        assertEquals(LocalDate.of(2028, 2, 29),
                Echeancier.echeance(LocalDate.of(2028, 1, 31), 1));
    }

    @Test
    @DisplayName("Deux mois d'un coup retrouvent le 31")
    void deuxMoisDUnCoup() {
        assertEquals(LocalDate.of(2027, 3, 31),
                Echeancier.echeance(LocalDate.of(2027, 1, 31), 2));
    }

    @Test
    @DisplayName("Mois par mois ne donne pas toujours le meme resultat")
    void moisParMoisDiffere() {
        assertFalse(Echeancier.memeResultatMoisParMois(LocalDate.of(2027, 1, 31), 2),
                "Le 31 janvier est rabote a 28 des le premier mois, "
                        + "et le 31 est perdu pour de bon.");

        assertTrue(Echeancier.memeResultatMoisParMois(LocalDate.of(2027, 1, 15), 2),
                "Un jour qui existe dans tous les mois ne pose aucun probleme.");
    }
}
