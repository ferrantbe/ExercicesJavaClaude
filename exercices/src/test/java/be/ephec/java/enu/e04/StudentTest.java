package be.ephec.java.enu.e04;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.lang.reflect.RecordComponent;

import static org.junit.jupiter.api.Assertions.*;

/**
 * ENU.4 — Verification automatique.
 *
 * Les trois premiers tests verifient ce que le COMPILATEUR a genere a partir
 * de la seule ligne de declaration. Le dernier verifie votre travail.
 */
/**
 * QUATRE DE CES CINQ TESTS SONT VERTS AVANT QUE VOUS N'ECRIVIEZ UNE
 * LIGNE. Ce n'est pas une panne : c'est la demonstration de l'exercice.
 *
 * Les trois premiers verifient les accesseurs, le toString et le equals.
 * Vous ne les avez pas ecrits — le COMPILATEUR les a ecrits, parce que
 * vous avez declare un record. Les voir passer, c'est constater de ses
 * yeux ce qu'une seule ligne de declaration vous a evite.
 *
 * Le quatrieme mesure la forme du record : deux composants, dans cet
 * ordre.
 *
 * Seul le cinquieme est rouge, et il porte sur la seule methode que le
 * compilateur ne pouvait pas deviner : la regle de reussite.
 */
class StudentTest {

    @Test
    @DisplayName("Le compilateur a retenu deux composants, nom puis cote")
    void composants() {
        RecordComponent[] composants = Student.class.getRecordComponents();

        assertNotNull(composants, "Student doit etre un record");
        assertEquals(2, composants.length);
        assertEquals("nom", composants[0].getName());
        assertEquals(String.class, composants[0].getType());
        assertEquals("cote", composants[1].getName());
        assertEquals(int.class, composants[1].getType());
    }

    @Test
    @DisplayName("Le compilateur a ecrit les accesseurs, sans prefixe get")
    void accesseurs() {
        Student ada = new Student("Lovelace", 18);

        assertEquals("Lovelace", ada.nom());
        assertEquals(18, ada.cote());
    }

    @Test
    @DisplayName("Le compilateur a aussi ecrit toString et equals")
    void methodesGenerees() {
        Student ada = new Student("Lovelace", 18);

        assertEquals("Student[nom=Lovelace, cote=18]", ada.toString());
        assertEquals(new Student("Lovelace", 18), ada,
                "Deux records de memes composants sont egaux : "
                        + "le compilateur a ecrit equals pour vous.");
    }

    @Test
    @DisplayName("Avec 18, l'etudiant reussit")
    void dixHuitReussit() {
        assertTrue(new Student("Lovelace", 18).passe());
    }

    @Test
    @DisplayName("Avec 10, l'etudiant reussit : dix suffit")
    void dixSuffitPourReussir() {
        assertTrue(new Student("Turing", 10).passe(), "dix suffit pour reussir");
    }

    @Test
    @DisplayName("Avec 9, l'etudiant echoue")
    void neufEchoue() {
        assertFalse(new Student("Hopper", 9).passe());
    }

    @Test
    @DisplayName("Avec 0, l'etudiant echoue")
    void zeroEchoue() {
        assertFalse(new Student("Babbage", 0).passe());
    }
}
