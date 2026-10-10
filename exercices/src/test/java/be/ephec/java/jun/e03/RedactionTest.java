package be.ephec.java.jun.e03;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Method;

import static org.junit.jupiter.api.Assertions.*;

/**
 * JUN.3 — Verification automatique, mais partielle.
 *
 * Ce test controle que votre classe MoyenneTest existe et qu'elle a la forme
 * attendue. Il ne peut PAS verifier que vos tests sont pertinents : aucun
 * outil ne le peut. Le vert que vous obtiendrez ici ne dit rien de la qualite
 * de ce que vous avez ecrit.
 */
class RedactionTest {

    private static Class<?> votreClasse() {
        try {
            return Class.forName(AVous.classeAEcrire());
        } catch (ClassNotFoundException e) {
            return fail("La classe " + AVous.classeAEcrire() + " n'existe pas encore. "
                    + "Creez-la dans src/test/java, a cote de celle-ci.");
        }
    }

    private static long methodesDeTest(Class<?> classe) {
        long compte = 0;
        for (Method methode : classe.getDeclaredMethods()) {
            if (methode.isAnnotationPresent(Test.class)) {
                compte++;
            }
        }
        return compte;
    }

    @Test
    @DisplayName("Votre classe de test existe")
    void classePresente() {
        assertNotNull(votreClasse());
    }

    @Test
    @DisplayName("Elle contient au moins cinq methodes annotees @Test")
    void assezDeTests() {
        long compte = methodesDeTest(votreClasse());

        assertTrue(compte >= 5,
                "Trouve " + compte + " methode(s) @Test, il en faut au moins cinq. "
                        + "Le fascicule liste les cas a couvrir.");
    }

    @Test
    @DisplayName("Chaque test porte un @DisplayName qui enonce le comportement")
    void chaqueTestEstNomme() {
        for (Method methode : votreClasse().getDeclaredMethods()) {
            if (methode.isAnnotationPresent(Test.class)) {
                assertTrue(methode.isAnnotationPresent(DisplayName.class),
                        "La methode " + methode.getName() + " n'a pas de @DisplayName. "
                                + "C'est la phrase que vous lirez en premier quand elle "
                                + "passera au rouge.");
            }
        }
    }

    @Test
    @DisplayName("Les noms de methodes decrivent un comportement, pas un numero")
    void nomsParlants() {
        for (Method methode : votreClasse().getDeclaredMethods()) {
            if (methode.isAnnotationPresent(Test.class)) {
                assertFalse(methode.getName().matches("test\\d*"),
                        "La methode " + methode.getName() + " ne dit rien de ce "
                                + "qu'elle verifie. Voir CC-NOM.1 du memento Clean Code.");
            }
        }
    }

    @Test
    @DisplayName("La classe testee fonctionne — c'est la reference de vos tests")
    void laClasseTesteeEstCorrecte() {
        assertEquals(14.0, Moyenne.calculer(java.util.List.of(12, 16)), 0.001);
        assertTrue(Moyenne.reussite(java.util.List.of(10, 10)));
        assertFalse(Moyenne.reussite(java.util.List.of(9, 10)));
        assertThrows(IllegalArgumentException.class, () -> Moyenne.calculer(java.util.List.of()));
        assertThrows(IllegalArgumentException.class,
                () -> Moyenne.calculer(java.util.List.of(21)));
    }
}
