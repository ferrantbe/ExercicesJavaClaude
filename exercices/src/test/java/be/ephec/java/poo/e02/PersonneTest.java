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
    @DisplayName("computeAge retourne l'ecart entre l'annee donnee et l'annee de naissance")
    void computeAgeRendLEcartDAnnees() {
        Personne personne = new Personne();
        personne.setAnneeDeNaissance(1990);

        assertEquals(35, personne.computeAge(2025));
        assertEquals(0, personne.computeAge(1990));
        assertEquals(-5, personne.computeAge(1985));
    }
}
