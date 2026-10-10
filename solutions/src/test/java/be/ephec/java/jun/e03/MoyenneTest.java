package be.ephec.java.jun.e03;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * JUN.3 — CORRIGE. C'est la classe que l'etudiant doit ecrire.
 *
 * L'exercice inverse les roles : ailleurs, la classe de test est fournie
 * et le code est a ecrire. Ici, le code est fourni, complet et correct,
 * et c'est le test qu'on redige.
 *
 * CE QU'IL FAUT COUVRIR, et l'ordre dans lequel y penser :
 *
 *   le cas ordinaire        une moyenne de deux notes
 *   les bornes              0 et 20, les valeurs extremes acceptees
 *   ce qui doit echouer     liste vide, liste nulle, note hors bornes
 *   la seconde methode      reussite(), et sa borne a 10
 *
 * UNE MOYENNE N'EST PAS UN ENTIER. calculer() rend un double, et deux
 * doubles ne se comparent pas avec assertEquals a deux arguments : le
 * calcul flottant produit des ecarts infimes. On donne donc une
 * tolerance — le troisieme argument. Voir CC-TST.1.
 *
 * CHAQUE TEST VERIFIE UNE SEULE CHOSE. Regrouper les cinq controles dans
 * une methode unique fonctionnerait, et le premier echec masquerait les
 * quatre autres. Voir CC-TST.2.
 */
class MoyenneTest {

    @Test
    @DisplayName("La moyenne de deux notes est leur milieu")
    void moyenneOrdinaire() {
        assertEquals(14.0, Moyenne.calculer(List.of(12, 16)), 0.001);
    }

    @Test
    @DisplayName("Une note seule est sa propre moyenne")
    void uneSeuleNote() {
        assertEquals(15.0, Moyenne.calculer(List.of(15)), 0.001);
    }

    @Test
    @DisplayName("Les bornes zero et vingt sont acceptees")
    void lesBornesSontAcceptees() {
        assertEquals(10.0, Moyenne.calculer(List.of(0, 20)), 0.001,
                "0 et 20 sont des notes valides, pas des erreurs");
    }

    @Test
    @DisplayName("Une liste vide n'a pas de moyenne")
    void listeVide() {
        assertThrows(IllegalArgumentException.class,
                () -> Moyenne.calculer(List.of()));
    }

    @Test
    @DisplayName("Une liste nulle n'a pas de moyenne non plus")
    void listeNulle() {
        assertThrows(IllegalArgumentException.class,
                () -> Moyenne.calculer(null));
    }

    @Test
    @DisplayName("Une note au-dessus de vingt est refusee")
    void noteTropHaute() {
        assertThrows(IllegalArgumentException.class,
                () -> Moyenne.calculer(List.of(12, 21)));
    }

    @Test
    @DisplayName("Une note negative est refusee")
    void noteNegative() {
        assertThrows(IllegalArgumentException.class,
                () -> Moyenne.calculer(List.of(-1, 12)));
    }

    @Test
    @DisplayName("La reussite se joue a dix, inclus")
    void reussiteALaBorne() {
        assertTrue(Moyenne.reussite(List.of(10, 10)),
                "dix est la borne INCLUSE : on reussit avec dix");
        assertFalse(Moyenne.reussite(List.of(9, 10)),
                "9.5 de moyenne, c'est un echec");
    }
}
