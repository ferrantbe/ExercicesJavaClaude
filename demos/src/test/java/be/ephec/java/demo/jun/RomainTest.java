package be.ephec.java.demo.jun;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

/**
 * DEMO JUN — etat final de la classe de test construite en direct.
 *
 * Chaque methode a ete ajoutee dans cet ordre, et chacune etait ROUGE
 * avant que la ligne correspondante de Romain ne soit ecrite. C'est tout
 * l'interet de la relire : l'ordre des tests raconte la construction du
 * code.
 *
 * Ce qu'il faut regarder :
 *   les quatre premiers tests ont fait naitre, l'un apres l'autre, le
 *   return 1, la table de correspondance, la boucle, puis la regle
 *   soustractive ;
 *   les deux derniers ont ete ajoutes a la fin, une fois le code stable,
 *   pour couvrir des cas qu'on n'avait pas encore regardes.
 */
class RomainTest {

    @Test
    @DisplayName("Un seul I vaut 1")
    void unVaut1() {
        assertEquals(1, Romain.enChiffres("I"));
    }

    @Test
    @DisplayName("Un autre symbole que I a sa propre valeur")
    void cinqVaut5() {
        assertEquals(5, Romain.enChiffres("V"));
        assertEquals(10, Romain.enChiffres("X"));
        assertEquals(1000, Romain.enChiffres("M"));
    }

    @Test
    @DisplayName("Les symboles s'additionnent")
    void lesSymbolesSAdditionnent() {
        assertEquals(2, Romain.enChiffres("II"));
        assertEquals(3, Romain.enChiffres("III"));
        assertEquals(6, Romain.enChiffres("VI"));
    }

    @Test
    @DisplayName("Un symbole suivi d'un plus grand se retranche")
    void laRegleSoustractive() {
        assertEquals(4, Romain.enChiffres("IV"),
                "la somme naive donnerait 6");
        assertEquals(9, Romain.enChiffres("IX"));
        assertEquals(40, Romain.enChiffres("XL"));
    }

    @Test
    @DisplayName("Une annee complete se lit correctement")
    void uneAnnee() {
        assertEquals(1994, Romain.enChiffres("MCMXCIV"));
        assertEquals(2026, Romain.enChiffres("MMXXVI"));
    }

    @Test
    @DisplayName("Un symbole inconnu est refuse")
    void symboleInconnu() {
        assertThrows(IllegalArgumentException.class, () -> Romain.enChiffres("ABC"));
    }
}
