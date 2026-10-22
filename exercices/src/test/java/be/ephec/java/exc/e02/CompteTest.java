package be.ephec.java.exc.e02;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

/** EXC.2 — Verification automatique. */
class CompteTest {

    private static final double PRECISION = 0.001;

    @Test
    @DisplayName("Un compte neuf est a zero")
    void compteNeuf() {
        assertEquals(0.0, new Compte().getSolde(), PRECISION);
    }

    @Test
    @DisplayName("Un depot augmente le solde")
    void depot() {
        Compte compte = new Compte();

        compte.ajoute(100);
        compte.ajoute(50);

        assertEquals(150.0, compte.getSolde(), PRECISION);
    }

    @Test
    @DisplayName("Un retrait possible retourne le montant demande")
    void retraitPossible() {
        Compte compte = new Compte();
        compte.ajoute(100);

        assertEquals(30.0, compte.retire(30), PRECISION);
        assertEquals(70.0, compte.getSolde(), PRECISION);
    }

    @Test
    @DisplayName("Un retrait trop grand retourne ce qui restait")
    void retraitPlafonne() {
        Compte compte = new Compte();
        compte.ajoute(100);

        assertEquals(100.0, compte.retire(120), PRECISION,
                "sur un compte a 100, retirer 120 retourne 100");
        assertEquals(0.0, compte.getSolde(), PRECISION,
                "et le solde tombe a zero, jamais en dessous");
    }

    @Test
    @DisplayName("Retirer sur un compte vide retourne zero")
    void retraitSurCompteVide() {
        assertEquals(0.0, new Compte().retire(50), PRECISION);
    }
}
