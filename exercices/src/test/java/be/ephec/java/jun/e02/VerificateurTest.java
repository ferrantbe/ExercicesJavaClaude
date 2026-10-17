package be.ephec.java.jun.e02;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * JUN.2 — Verification automatique.
 *
 * Ce test verifie VOTRE verificateur, en le confrontant a une implementation
 * correcte et a trois implementations defectueuses.
 */
class VerificateurTest {

    @Test
    @DisplayName("La tirelire correcte est reconnue comme telle")
    void laBonne() {
        assertTrue(Verificateur.estCorrecte(new TirelireCorrecte()),
                "Si ce test echoue, votre verificateur est trop severe : "
                        + "il refuse une implementation qui respecte le contrat.");
    }

    @Test
    @DisplayName("Une tirelire qui autorise le decouvert est demasquee")
    void sansGarde() {
        assertFalse(Verificateur.estCorrecte(new TirelireSansGarde()),
                "Celle-ci ne leve jamais ContenuInsuffisant. Votre verificateur "
                        + "tente-t-il un retrait superieur au contenu ?");
    }

    @Test
    @DisplayName("Une tirelire qui se vide entierement est demasquee")
    void videTout() {
        assertFalse(Verificateur.estCorrecte(new TirelireQuiVideTout()),
                "Celle-ci leve bien l'exception, mais un retrait partiel emporte "
                        + "tout. Verifiez-vous le contenu APRES un retrait valide ?");
    }

    @Test
    @DisplayName("Une tirelire qui perd le premier depot est demasquee")
    void perdLeDepot() {
        assertFalse(Verificateur.estCorrecte(new TirelireQuiPerdLeDepot()),
                "Celle-ci ignore le tout premier depot. Verifiez-vous le contenu "
                        + "juste apres le premier depot, sur une tirelire neuve ?");
    }

    @Test
    @DisplayName("Un verificateur qui dit toujours oui ne verifie rien")
    void pasDeComplaisance() {
        int demasquees = 0;
        Tirelire[] defectueuses = {
                new TirelireSansGarde(), new TirelireQuiVideTout(), new TirelireQuiPerdLeDepot()
        };
        for (Tirelire tirelire : defectueuses) {
            if (!Verificateur.estCorrecte(tirelire)) {
                demasquees++;
            }
        }

        assertTrue(demasquees == 3 && Verificateur.estCorrecte(new TirelireCorrecte()),
                "Les trois defectueuses doivent etre refusees ET la bonne acceptee. "
                        + "Un verificateur qui retourne toujours la meme reponse ne verifie rien — "
                        + "c'est exactement ce que fait une classe de test sans assertion.");
    }
}
