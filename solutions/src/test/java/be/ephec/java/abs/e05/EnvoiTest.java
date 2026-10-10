package be.ephec.java.abs.e05;

/*
 * ABS.5 — Verification automatique.
 *
 * ================================================================
 *  TOUT EST EN COMMENTAIRE, ET C'EST VOULU.
 *
 *  Les classes testees ici n'existent pas encore : c'est vous qui
 *  allez les ecrire. Un fichier de test qui les appelle ne
 *  compilerait pas, et un seul fichier fautif empeche la
 *  compilation de TOUT le module — y compris les exercices que
 *  vous avez deja reussis.
 *
 *  QUAND VOS CLASSES SERONT ECRITES : selectionnez tout le contenu
 *  de ce fichier et faites Ctrl+/ (ou Cmd+/) pour retirer les
 *  commentaires d'un coup. Puis lancez les tests.
 *
 *  Si le fichier ne compile toujours pas apres avoir decommente,
 *  c'est que vos noms ne sont pas ceux attendus. Les voici :
 *
 *      Envoi          la classe mere, abstraite
 *      Lettre, Colis, Recommande      les trois sortes
 *
 *      new Lettre(String destinataire, int poidsGrammes)
 *      new Colis(String destinataire, int poidsGrammes)
 *      new Recommande(String destinataire, int poidsGrammes)
 *
 *      double cout()          ce que l'envoi coute
 *      String etiquette()     "Ada Lovelace - 120 g - 4.60 EUR"
 *      String getDestinataire()
 *      int getPoidsGrammes()
 * ================================================================
 *

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Modifier;

import static org.junit.jupiter.api.Assertions.*;

class EnvoiTest {

    @Test
    @DisplayName("Envoi est abstraite : un envoi sans sorte ne veut rien dire")
    void envoiEstAbstraite() {
        assertTrue(Modifier.isAbstract(Envoi.class.getModifiers()));
    }

    @Test
    @DisplayName("Les trois sortes heritent d'Envoi")
    void hierarchie() {
        assertEquals(Envoi.class, Lettre.class.getSuperclass());
        assertEquals(Envoi.class, Colis.class.getSuperclass());
        assertEquals(Envoi.class, Recommande.class.getSuperclass());
    }

    @Test
    @DisplayName("Une lettre legere coute le tarif de base")
    void lettreLegere() {
        assertEquals(1.10, new Lettre("Ada", 20).cout(), 0.001);
    }

    @Test
    @DisplayName("Cinquante grammes sont encore au tarif de base")
    void lettreALaBorne() {
        assertEquals(1.10, new Lettre("Ada", 50).cout(), 0.001,
                "la borne est incluse : jusqu'a 50 g, et non en dessous de 50 g");
    }

    @Test
    @DisplayName("Au-dela de cinquante grammes, la lettre double")
    void lettreLourde() {
        assertEquals(2.20, new Lettre("Ada", 51).cout(), 0.001);
    }

    @Test
    @DisplayName("Un colis se paie au forfait plus le poids")
    void colis() {
        assertEquals(4.60, new Colis("Alan", 120).cout(), 0.001);
        assertEquals(9.00, new Colis("Alan", 1000).cout(), 0.001);
    }

    @Test
    @DisplayName("Un recommande coute le meme prix quel que soit le poids")
    void recommande() {
        assertEquals(7.00, new Recommande("Grace", 20).cout(), 0.001);
        assertEquals(7.00, new Recommande("Grace", 2000).cout(), 0.001);
    }

    @Test
    @DisplayName("L'etiquette est ecrite une seule fois, dans la classe mere")
    void etiquette() {
        assertEquals("Ada Lovelace - 120 g - 4.60 EUR",
                new Colis("Ada Lovelace", 120).etiquette());
        assertEquals("Alan Turing - 20 g - 1.10 EUR",
                new Lettre("Alan Turing", 20).etiquette());

        assertThrows(NoSuchMethodException.class,
                () -> Lettre.class.getDeclaredMethod("etiquette"),
                "etiquette() ne doit pas etre redefinie : elle est la meme pour tous");
    }

    @Test
    @DisplayName("Les trois sortes tiennent dans un meme tableau")
    void polymorphisme() {
        Envoi[] envois = {
                new Lettre("Ada", 20),
                new Colis("Alan", 120),
                new Recommande("Grace", 500)
        };

        double total = 0;
        for (Envoi envoi : envois) {
            total += envoi.cout();
        }

        assertEquals(12.70, total, 0.001);
    }
}

*/
