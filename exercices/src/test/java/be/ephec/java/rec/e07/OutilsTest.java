package be.ephec.java.rec.e07;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/** REC.7 — Verification automatique. */
class OutilsTest {

    private static final List<String> ANIMAUX = List.of("Chat", "Hippopotame", "Chien", "Cheval", "Ours");

    @Test
    @DisplayName("Les quatre methodes sont static")
    void statiques() {
        for (Method methode : Outils.class.getDeclaredMethods()) {
            if (Modifier.isPublic(methode.getModifiers())) {
                assertTrue(Modifier.isStatic(methode.getModifiers()),
                        methode.getName() + " doit etre static : Outils ne tient aucun etat");
            }
        }
    }

    @Test
    @DisplayName("filtrer garde les elements qui satisfont la condition, dans l'ordre")
    void filtrer() {
        assertEquals(List.of("Hippopotame", "Cheval"), Outils.filtrer(ANIMAUX, nom -> nom.length() > 5));
        assertEquals(List.of(), Outils.filtrer(ANIMAUX, nom -> nom.isEmpty()));
        assertEquals(ANIMAUX, Outils.filtrer(ANIMAUX, nom -> true));
    }

    @Test
    @DisplayName("filtrer rend une nouvelle liste et laisse l'argument intact")
    void filtrerNeModifiePas() {
        List<Integer> nombres = new ArrayList<>(List.of(1, 2, 3, 4));

        List<Integer> pairs = Outils.filtrer(nombres, n -> n % 2 == 0);

        assertEquals(List.of(2, 4), pairs);
        assertEquals(List.of(1, 2, 3, 4), nombres);
        assertNotSame(nombres, pairs);
    }

    @Test
    @DisplayName("filtrer fonctionne avec n'importe quel type")
    void filtrerGenerique() {
        List<Integer> nombres = List.of(3, -1, 7, -5);

        assertEquals(List.of(3, 7), Outils.filtrer(nombres, n -> n > 0));
    }

    @Test
    @DisplayName("compter donne le nombre d'elements retenus")
    void compter() {
        assertEquals(3, Outils.compter(ANIMAUX, nom -> nom.startsWith("C")));
        assertEquals(0, Outils.compter(List.of(), nom -> true));
    }

    @Test
    @DisplayName("transformer applique la fonction a chaque element, vers un autre type")
    void transformer() {
        List<Integer> longueurs = Outils.transformer(ANIMAUX, String::length);

        assertEquals(List.of(4, 11, 5, 6, 4), longueurs);
        assertEquals(List.of("CHAT", "OURS"), Outils.transformer(List.of("Chat", "Ours"), String::toUpperCase));
    }

    @Test
    @DisplayName("echanger permute deux elements, dans la liste recue")
    void echanger() {
        List<String> mots = new ArrayList<>(List.of("un", "deux", "trois"));

        Outils.echanger(mots, 0, 2);

        assertEquals(List.of("trois", "deux", "un"), mots);
    }

    @Test
    @DisplayName("echanger un element avec lui-meme ne change rien")
    void echangerSurPlace() {
        List<String> mots = new ArrayList<>(List.of("un", "deux"));

        Outils.echanger(mots, 1, 1);

        assertEquals(List.of("un", "deux"), mots);
    }
}
