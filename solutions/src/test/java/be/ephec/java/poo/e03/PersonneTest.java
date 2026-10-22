package be.ephec.java.poo.e03;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Field;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

/**
 * POO.3 — Verification automatique.
 */
class PersonneTest {

    @Test
    @DisplayName("Le champ age a bien disparu")
    void leChampAgeADisparu() {
        for (Field champ : Personne.class.getDeclaredFields()) {
            assertNotEquals("age", champ.getName(),
                    "L'age ne doit plus etre stocke dans un champ : il se calcule.");
        }
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

    @Test
    @DisplayName("getAge s'appuie sur l'annee courante, sans qu'on l'ait renseigne")
    void getAgeUtiliseLAnneeCourante() {
        int anneeCourante = LocalDate.now().getYear();

        Personne personne = new Personne();
        personne.setAnneeDeNaissance(anneeCourante - 30);

        assertEquals(30, personne.getAge());
    }

    @Test
    @DisplayName("getAge delegue a computeAge plutot que de refaire le calcul")
    void getAgeDelegueAComputeAge() {
        Personne personne = new Personne();
        personne.setAnneeDeNaissance(1990);

        assertEquals(personne.computeAge(LocalDate.now().getYear()), personne.getAge());
    }
}
