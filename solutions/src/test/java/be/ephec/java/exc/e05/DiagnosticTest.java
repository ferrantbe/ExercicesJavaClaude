package be.ephec.java.exc.e05;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

/** EXC.5 — Verification automatique. */
class DiagnosticTest {

    @Test
    @DisplayName("La trace nomme l'exception et son message")
    void lExceptionLevee() {
        assertEquals("ArithmeticException", Diagnostic.typeDException());
        assertEquals("/ by zero", Diagnostic.messageDeLException(),
                "le message est ce qui suit les deux points, sur la premiere ligne");
    }

    @Test
    @DisplayName("La premiere ligne at designe la classe fautive")
    void ouLErreurSEstProduite() {
        assertEquals("Sort", Diagnostic.classeFautive());
    }

    @Test
    @DisplayName("Un constructeur apparait sous un nom particulier")
    void nomDuConstructeurDansLaTrace() {
        assertEquals("<init>", Diagnostic.methodeFautive(),
                "dans une trace, un constructeur ne porte pas le nom de sa classe : "
                        + "la JVM l'appelle <init>");
    }

    @Test
    @DisplayName("La ligne suivante designe l'appelant")
    void quiAvaitAppele() {
        assertEquals("lanceUnSort", Diagnostic.methodeAppelante());
    }

    @Test
    @DisplayName("La correction evite la division par zero")
    void correction() {
        assertEquals(10, Diagnostic.degatsParCibleSansPlanter(30, 3));
        assertEquals(0, Diagnostic.degatsParCibleSansPlanter(30, 0),
                "sans cible, aucun degat — et surtout pas de plantage");
        assertEquals(7, Diagnostic.degatsParCibleSansPlanter(30, 4),
                "la division entiere tronque");
    }
}
