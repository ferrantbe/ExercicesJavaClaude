package be.ephec.java.poo.e02;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

/**
 * POO.2 — Verification automatique.
 */
class PersonneTest {

    // Aucun test ne porte sur le champ age : les trois options laissees
    // ouvertes par l'enonce doivent toutes passer au vert.

    @Test
    @DisplayName("Aucun champ n'est reste public")
    void aucunChampNEstPublic() {
        for (Field champ : Personne.class.getDeclaredFields()) {
            assertFalse(Modifier.isPublic(champ.getModifiers()),
                    "Le champ '" + champ.getName() + "' est encore public : "
                            + "l'encapsulation n'est pas complete.");
        }
    }

    @Test
    @DisplayName("Les accesseurs retournent ce que les mutateurs ont range")
    void lesAccesseursRendentCeQuiAEteRange() {
        Personne personne = new Personne();
        personne.setNom("Lovelace");
        personne.setPrenom("Ada");
        personne.setAnneeDeNaissance(1815);

        assertEquals("Lovelace", personne.getNom());
        assertEquals("Ada", personne.getPrenom());
        assertEquals(1815, personne.getAnneeDeNaissance());
    }

    @Test
    @DisplayName("Ne en 1990, on a 35 ans en 2025")
    void computeAgeApresLaNaissance() {
        Personne personne = new Personne();
        personne.setAnneeDeNaissance(1990);

        assertEquals(35, personne.computeAge(2025));
    }

    @Test
    @DisplayName("Ne en 1990, on a 0 an en 1990")
    void computeAgeLAnneeDeLaNaissance() {
        Personne personne = new Personne();
        personne.setAnneeDeNaissance(1990);

        assertEquals(0, personne.computeAge(1990));
    }

    @Test
    @DisplayName("Ne en 1990, on a -5 ans en 1985 : le calcul ne verifie rien")
    void computeAgeAvantLaNaissance() {
        Personne personne = new Personne();
        personne.setAnneeDeNaissance(1990);

        assertEquals(-5, personne.computeAge(1985));
    }
}
