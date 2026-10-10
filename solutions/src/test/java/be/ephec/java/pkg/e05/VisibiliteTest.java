package be.ephec.java.pkg.e05;

import be.ephec.java.pkg.e05.base.Capteur;
import be.ephec.java.pkg.e05.derive.CapteurMoyenne;
import be.ephec.java.pkg.e05.derive.Tableau;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;

import static org.junit.jupiter.api.Assertions.*;

/**
 * PKG.5 — Verification automatique.
 *
 * Une classe de test ne peut pas verifier qu'une ligne NE compile PAS :
 * si elle l'ecrivait, rien ne compilerait. Les tests portent donc sur les
 * modificateurs, lus par reflexion, et sur le comportement.
 *
 * La partie « essayez, et lisez le refus » reste a faire a la main. C'est
 * le seul exercice du recueil dans ce cas.
 */
class VisibiliteTest {

    @Test
    @DisplayName("Les trois champs ont bien trois visibilites differentes")
    void troisVisibilites() throws Exception {
        Field serie = Capteur.class.getDeclaredField("numeroDeSerie");
        Field mesure = Capteur.class.getDeclaredField("derniereMesure");
        Field nom = Capteur.class.getDeclaredField("nom");

        assertTrue(Modifier.isPrivate(serie.getModifiers()));
        assertTrue(Modifier.isProtected(mesure.getModifiers()));
        assertTrue(Modifier.isPublic(nom.getModifiers()));
    }

    @Test
    @DisplayName("Le lissage fait la moyenne avec la mesure precedente")
    void lissage() {
        CapteurMoyenne capteur = new CapteurMoyenne("Hygrometre", "SN-2026-9b71");

        capteur.lisser(60);
        assertEquals(30, capteur.lire(), 0.001, "(0 + 60) / 2");

        capteur.lisser(70);
        assertEquals(50, capteur.lire(), 0.001, "(30 + 70) / 2");
    }

    @Test
    @DisplayName("La description passe par la methode publique, faute d'atteindre le numero")
    void description() {
        CapteurMoyenne capteur = new CapteurMoyenne("Hygrometre", "SN-2026-9b71");
        capteur.lisser(60);
        capteur.lisser(70);

        assertEquals("Hygrometre (9b71) : 50.00", capteur.decrire());
    }

    @Test
    @DisplayName("Le tableau additionne les mesures sans toucher aux champs")
    void somme() {
        Capteur brut = new Capteur("Thermometre", "SN-2026-4f2a");
        brut.mesurer(21.5);

        CapteurMoyenne lisse = new CapteurMoyenne("Hygrometre", "SN-2026-9b71");
        lisse.lisser(60);
        lisse.lisser(70);

        assertEquals(71.5, Tableau.sommeDesMesures(brut, lisse), 0.001);
        assertEquals("Hygrometre", Tableau.plusEleve(brut, lisse));
        assertEquals("aucun capteur", Tableau.plusEleve());
    }

    @Test
    @DisplayName("L'identifiant court est les quatre derniers caracteres")
    void identifiant() {
        assertEquals("4f2a", new Capteur("X", "SN-2026-4f2a").identifiantCourt());
    }
}
