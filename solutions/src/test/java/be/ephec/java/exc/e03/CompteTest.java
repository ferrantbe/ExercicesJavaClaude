package be.ephec.java.exc.e03;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/** EXC.3 — Verification automatique. */
class CompteTest {

    private static final String VALIDE = "BE68 5390 0754 7034";

    @Test
    @DisplayName("Les trois exceptions descendent d'une meme classe")
    void hierarchieDesExceptions() {
        assertTrue(IbanInvalideException.class.isAssignableFrom(IbanLongueurException.class));
        assertTrue(IbanInvalideException.class.isAssignableFrom(IbanPrefixeException.class));
        assertTrue(IbanInvalideException.class.isAssignableFrom(IbanModuloException.class));
        assertTrue(Exception.class.isAssignableFrom(IbanInvalideException.class));
    }

    @Test
    @DisplayName("Le controle modulo 97 retourne 1 pour un IBAN valide")
    void modulo() {
        assertEquals(1, Compte.resteModulo97(VALIDE));
        assertEquals(1, Compte.resteModulo97("BE71 0961 2345 6769"));
        assertEquals(28, Compte.resteModulo97("BE68539007547035"),
                "un seul chiffre change, et le reste n'est plus 1");
    }

    @Test
    @DisplayName("Un IBAN valide construit un compte")
    void ibanValide() throws IbanInvalideException {
        Compte compte = new Compte(VALIDE);

        assertEquals("BE68539007547034", compte.getNumero(),
                "le numero est memorise sans les espaces");
        assertEquals(0.0, compte.getSolde(), 0.001);
    }

    @Test
    @DisplayName("Un IBAN trop court est refuse, avec le compte des caracteres")
    void mauvaiseLongueur() {
        IbanLongueurException levee = assertThrows(IbanLongueurException.class,
                () -> new Compte("BE68 5390 0754"));

        assertEquals("L'IBAN doit contenir 16 caracteres, en contient 12",
                levee.getMessage());
    }

    @Test
    @DisplayName("Un IBAN etranger est refuse, avec son prefixe")
    void mauvaisPrefixe() {
        IbanPrefixeException levee = assertThrows(IbanPrefixeException.class,
                () -> new Compte("FR68 5390 0754 7034"));

        assertEquals("L'IBAN doit commencer par BE, commence par FR",
                levee.getMessage());
    }

    @Test
    @DisplayName("Un IBAN au controle incorrect est refuse, avec les deux restes")
    void mauvaisModulo() {
        IbanModuloException levee = assertThrows(IbanModuloException.class,
                () -> new Compte("BE68 5390 0754 7035"));

        assertEquals("Le controle modulo 97 est incorrect : 28 au lieu de 1",
                levee.getMessage());
    }

    @Test
    @DisplayName("Les controles s'appliquent dans l'ordre longueur, prefixe, modulo")
    void ordreDesControles() {
        assertThrows(IbanLongueurException.class, () -> new Compte("FR68 5390"),
                "trop court ET mauvais prefixe : c'est la longueur qui est signalee");
    }

    @Test
    @DisplayName("Un seul catch suffit a attraper les trois")
    void unSeulCatch() {
        for (String mauvais : new String[]{"BE68 5390", "FR68 5390 0754 7034",
                                           "BE68 5390 0754 7035"}) {
            assertThrows(IbanInvalideException.class, () -> new Compte(mauvais),
                    "la classe mere commune permet de tout attraper d'un coup "
                            + "quand la reaction est la meme — voir CC-ERR.5");
        }
    }

    @Test
    @DisplayName("Le compte fonctionne comme celui d'EXC.2")
    void soldeEtRetrait() throws IbanInvalideException {
        Compte compte = new Compte(VALIDE);

        compte.ajoute(100);

        assertEquals(100.0, compte.retire(120), 0.001);
        assertEquals(0.0, compte.getSolde(), 0.001);
    }
}
