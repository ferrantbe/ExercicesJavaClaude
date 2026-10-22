package be.ephec.java.gen.e01;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

/** GEN.1 — Verification automatique. */
class PaireTest {

    @Test
    @DisplayName("Une paire d'Integer retourne ses deux valeurs")
    void paireDEntiers() {
        Paire<Integer> notes = new Paire<>(12, 16);

        assertEquals(12, notes.getPremier());
        assertEquals(16, notes.getSecond());
    }

    @Test
    @DisplayName("La meme classe fonctionne pour des String")
    void paireDeChaines() {
        Paire<String> mots = new Paire<>("bonjour", "au revoir");

        assertEquals("bonjour", mots.getPremier());
        assertEquals("au revoir", mots.getSecond());
    }

    @Test
    @DisplayName("Une paire d'entiers suit le format impose")
    void paireDEntiersEnTexte() {
        assertEquals("premiere valeur : 12 - deuxieme valeur : 16",
                new Paire<>(12, 16).toString());
    }

    @Test
    @DisplayName("Une paire de decimaux suit le format impose")
    void paireDeDecimauxEnTexte() {
        assertEquals("premiere valeur : 1.5 - deuxieme valeur : 2.5",
                new Paire<>(1.5, 2.5).toString());
    }

    @Test
    @DisplayName("Le compilateur connait le type sans qu'on ait a le lui dire")
    void pasDeTranstypage() {
        Paire<Integer> notes = new Paire<>(12, 16);

        // Aucun cast : getPremier() retourne deja un Integer. C'est ce que la
        // genericite apporte par rapport a une paire d'Object.
        int somme = notes.getPremier() + notes.getSecond();

        assertEquals(28, somme);
    }
}
