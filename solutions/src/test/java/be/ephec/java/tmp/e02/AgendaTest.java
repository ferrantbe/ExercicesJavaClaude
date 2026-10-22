package be.ephec.java.tmp.e02;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;

/** TMP.2 — Verification automatique. */
class AgendaTest {

    @Test
    @DisplayName("Une semaine plus tard, c'est sept jours plus tard")
    void uneSemainePlusTard() {
        assertEquals(LocalDate.of(2027, 1, 26),
                Agenda.dansUneSemaine(LocalDate.of(2027, 1, 19)));
    }

    @Test
    @DisplayName("La date recue n'est jamais modifiee")
    void laDateRecueEstIntacte() {
        LocalDate origine = LocalDate.of(2027, 1, 19);

        Agenda.dansUneSemaine(origine);
        Agenda.reporterDe(origine, 100);

        assertEquals(LocalDate.of(2027, 1, 19), origine,
                "Un LocalDate est immuable : aucune methode ne peut le changer.");
    }

    @Test
    @DisplayName("Treize jours apres le 19 janvier 2027, on est le 1er fevrier")
    void reportAuMoisSuivant() {
        assertEquals(LocalDate.of(2027, 2, 1),
                Agenda.reporterDe(LocalDate.of(2027, 1, 19), 13));
    }

    @Test
    @DisplayName("365 jours apres le 19 janvier 2027, on est le 19 janvier 2028")
    void reportALAnneeSuivante() {
        assertEquals(LocalDate.of(2028, 1, 19),
                Agenda.reporterDe(LocalDate.of(2027, 1, 19), 365));
    }

    @Test
    @DisplayName("Un report negatif recule dans le temps")
    void reportNegatif() {
        assertEquals(LocalDate.of(2027, 1, 12),
                Agenda.reporterDe(LocalDate.of(2027, 1, 19), -7));
    }
}
