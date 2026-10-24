package be.ephec.java.rec.e03;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Method;

import static org.junit.jupiter.api.Assertions.*;

/**
 * REC.3 — Verification automatique, mais partielle.
 *
 * Ce test controle que votre classe VerificateurDeMotDePasseTest existe et
 * qu'elle a la forme attendue. Il ne peut PAS verifier que vos tests sont
 * pertinents, ni que vous avez corrige la classe : aucun outil ne le peut.
 * Ce sont vos propres tests qui en jugent.
 */
class RedactionTest {

    private static final int TESTS_ATTENDUS = 7;

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
    @DisplayName("Elle contient au moins sept methodes annotees @Test")
    void assezDeTests() {
        long compte = methodesDeTest(votreClasse());

        assertTrue(compte >= TESTS_ATTENDUS,
                "Trouve " + compte + " methode(s) @Test, il en faut au moins " + TESTS_ATTENDUS
                        + ". Le fascicule liste les cas a couvrir.");
    }

    @Test
    @DisplayName("Chaque test porte un @DisplayName qui enonce la regle")
    void chaqueTestEstNomme() {
        for (Method methode : votreClasse().getDeclaredMethods()) {
            if (methode.isAnnotationPresent(Test.class)) {
                assertTrue(methode.isAnnotationPresent(DisplayName.class),
                        "La methode " + methode.getName() + " n'a pas de @DisplayName.");
            }
        }
    }
}
