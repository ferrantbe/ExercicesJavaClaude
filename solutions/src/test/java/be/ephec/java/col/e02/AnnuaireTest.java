package be.ephec.java.col.e02;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

/** COL.2 — Verification automatique. */
class AnnuaireTest {

    private static Annuaire annuaireGarni() {
        Annuaire annuaire = new Annuaire();
        annuaire.ajouter(new Fiche("Turing", "0475 11 22 33", "Londres"));
        annuaire.ajouter(new Fiche("Lovelace", "0496 44 55 66", "Londres"));
        annuaire.ajouter(new Fiche("Hopper", "0470 77 88 99", "New York"));
        return annuaire;
    }

    @Test
    @DisplayName("Une fiche se retrouve par son nom")
    void recherche() {
        Fiche trouvee = annuaireGarni().chercher("Lovelace");

        assertNotNull(trouvee);
        assertEquals("0496 44 55 66", trouvee.numero());
        assertEquals("Londres", trouvee.adresse());
    }

    @Test
    @DisplayName("Un nom absent retourne null")
    void nomAbsent() {
        assertNull(annuaireGarni().chercher("Babbage"));
    }

    @Test
    @DisplayName("Une fiche de meme nom remplace la precedente")
    void remplacement() {
        Annuaire annuaire = annuaireGarni();

        annuaire.ajouter(new Fiche("Turing", "0000 00 00 00", "Cambridge"));

        assertEquals(3, annuaire.taille(), "la table associative n'a pas grandi");
        assertEquals("Cambridge", annuaire.chercher("Turing").adresse());
    }

    @Test
    @DisplayName("Les noms sortent par ordre alphabetique")
    void ordreDesNoms() {
        assertIterableEquals(Arrays.asList("Hopper", "Lovelace", "Turing"),
                annuaireGarni().nomsDansLOrdre());
    }

    @Test
    @DisplayName("Un annuaire neuf est vide")
    void annuaireNeuf() {
        Annuaire annuaire = new Annuaire();

        assertEquals(0, annuaire.taille());
        assertEquals(0, annuaire.nomsDansLOrdre().size());
    }
}
