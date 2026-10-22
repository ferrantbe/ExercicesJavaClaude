package be.ephec.java.poo.e01;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;

/**
 * POO.1 — Verification automatique.
 *
 * Ces tests passent par la reflexion (java.lang.reflect) parce qu'ils doivent
 * pouvoir se compiler avant que vous n'ayez declare les champs. Vous n'avez
 * pas a comprendre ce mecanisme a ce stade du cours.
 */
class PersonneTest {

    private Field champ(String nom) {
        try {
            return Personne.class.getDeclaredField(nom);
        } catch (NoSuchFieldException e) {
            fail("Le champ '" + nom + "' n'existe pas dans la classe Personne.");
            return null;
        }
    }

    @Test
    @DisplayName("Les quatre champs existent et portent le bon type")
    void lesQuatreChampsExistent() {
        assertEquals(String.class, champ("nom").getType());
        assertEquals(String.class, champ("prenom").getType());
        assertEquals(int.class, champ("anneeDeNaissance").getType());
        assertEquals(int.class, champ("age").getType());
    }

    @Test
    @DisplayName("Les quatre champs sont public (mauvaise pratique assumee ici)")
    void lesQuatreChampsSontPublics() {
        for (String nom : new String[]{"nom", "prenom", "anneeDeNaissance", "age"}) {
            assertTrue(Modifier.isPublic(champ(nom).getModifiers()),
                    "Le champ '" + nom + "' devrait etre public dans cet exercice-ci.");
        }
    }

    @Test
    @DisplayName("Ne en 1990, on a 35 ans en 2025")
    void computeAgeApresLaNaissance() throws Exception {
        Personne personne = new Personne();
        champ("anneeDeNaissance").setInt(personne, 1990);

        assertEquals(35, personne.computeAge(2025));
    }

    @Test
    @DisplayName("Ne en 1990, on a 0 an en 1990")
    void computeAgeLAnneeDeLaNaissance() throws Exception {
        Personne personne = new Personne();
        champ("anneeDeNaissance").setInt(personne, 1990);

        assertEquals(0, personne.computeAge(1990));
    }

    @Test
    @DisplayName("computeAge retourne un nombre negatif avant la naissance")
    void computeAgeRendUnNombreNegatifAvantLaNaissance() throws Exception {
        Personne personne = new Personne();
        champ("anneeDeNaissance").setInt(personne, 1990);

        assertEquals(-5, personne.computeAge(1985));
    }
}
