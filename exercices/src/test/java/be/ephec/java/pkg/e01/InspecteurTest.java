package be.ephec.java.pkg.e01;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

/** PKG.1 — Verification automatique. */
class InspecteurTest {

    @Test
    @DisplayName("Depuis le meme package, tout est accessible sauf le prive")
    void membresAccessiblesDepuisLeMemePackage() {
        String attendu = "numero, proprietaire, verifierLeNumero, decrire";

        assertEquals(attendu, new Inspecteur().membresAccessibles(),
                "Depuis le meme package : private est refuse, "
                        + "la visibilite par defaut et public sont accordees.");
    }
}
