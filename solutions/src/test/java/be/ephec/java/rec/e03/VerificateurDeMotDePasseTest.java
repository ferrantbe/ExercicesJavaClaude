package be.ephec.java.rec.e03;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * REC.3 — Corrige : la classe de test attendue.
 *
 * A remarquer : chaque regle de l'enonce a son test, et les bornes sont
 * testees DES DEUX COTES (3 et 4 caracteres). C'est le test "quatre
 * caracteres acceptes" qui revele le premier defaut, et "trop court meme
 * avec un chiffre" qui revele le second. Sans ces deux cas, la classe
 * fournie aurait l'air juste (CC-TST.2).
 */
class VerificateurDeMotDePasseTest {

    @Test
    @DisplayName("Niveau 1 : quatre caracteres suffisent")
    void niveau1AccepteQuatreCaracteres() {
        VerificateurDeMotDePasse verificateur = new VerificateurDeMotDePasse(1);

        assertTrue(verificateur.valide("abcd"));
        assertTrue(verificateur.valide("abcdefgh"));
    }

    @Test
    @DisplayName("Niveau 1 : trois caracteres ne suffisent pas")
    void niveau1RefuseTroisCaracteres() {
        VerificateurDeMotDePasse verificateur = new VerificateurDeMotDePasse(1);

        assertFalse(verificateur.valide("abc"));
        assertFalse(verificateur.valide(""));
    }

    @Test
    @DisplayName("Niveau 2 : un chiffre et quatre caracteres, c'est valide")
    void niveau2AccepteAvecChiffre() {
        VerificateurDeMotDePasse verificateur = new VerificateurDeMotDePasse(2);

        assertTrue(verificateur.valide("abc1"));
        assertTrue(verificateur.valide("Abcdef12"));
    }

    @Test
    @DisplayName("Niveau 2 : sans chiffre, c'est refuse")
    void niveau2RefuseSansChiffre() {
        VerificateurDeMotDePasse verificateur = new VerificateurDeMotDePasse(2);

        assertFalse(verificateur.valide("abcdefgh"));
    }

    @Test
    @DisplayName("Niveau 2 : trop court, meme avec un chiffre, c'est refuse")
    void niveau2RefuseTropCourt() {
        VerificateurDeMotDePasse verificateur = new VerificateurDeMotDePasse(2);

        assertFalse(verificateur.valide("a1"));
    }

    @Test
    @DisplayName("Un mot de passe null n'est jamais valide")
    void nullRefuse() {
        assertFalse(new VerificateurDeMotDePasse(1).valide(null));
        assertFalse(new VerificateurDeMotDePasse(2).valide(null));
    }

    @Test
    @DisplayName("Un niveau autre que 1 ou 2 est refuse a la construction")
    void niveauInconnu() {
        assertThrows(IllegalArgumentException.class, () -> new VerificateurDeMotDePasse(0));
        assertThrows(IllegalArgumentException.class, () -> new VerificateurDeMotDePasse(3));
    }

    @Test
    @DisplayName("Le niveau est retenu")
    void niveauRetenu() {
        assertEquals(2, new VerificateurDeMotDePasse(2).getNiveau());
    }
}
