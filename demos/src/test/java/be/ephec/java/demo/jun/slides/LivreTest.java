package be.ephec.java.demo.jun.slides;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Slide « Ni le jour, ni le hasard » (JUN, section 5).
 *
 * Le test fixe l'annee : il donne le meme resultat aujourd'hui, et dans dix ans.
 */
class LivreTest {

    @Test
    void duneA61AnsEn2026() {
        Livre dune = new Livre("Dune", 1965);

        assertEquals(61, dune.getAge(2026),
                "Dune, paru en 1965, a 61 ans en 2026");
    }

    @Test
    void unLivreParuCetteAnneeAZeroAn() {
        Livre neuf = new Livre("Nouveaute", 2026);

        assertEquals(0, neuf.getAge(2026),
                "Un livre paru en 2026 a 0 an en 2026");
    }
}
