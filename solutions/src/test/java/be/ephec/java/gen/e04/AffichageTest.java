package be.ephec.java.gen.e04;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

/** GEN.4 — Verification automatique. */
class AffichageTest {

    @Test
    @DisplayName("La methode accepte un triplet de Personne")
    void tripletDePersonnes() {
        Triplet<Personne> personnes = new Triplet<>(
                new Personne("Ada"), new Personne("Alan"), new Personne("Grace"));

        assertEquals("Ada, Alan, Grace", Affichage.noms(personnes));
    }

    @Test
    @DisplayName("Et la meme methode accepte un triplet d'Etudiant")
    void tripletDEtudiants() {
        Triplet<Etudiant> etudiants = new Triplet<>(
                new Etudiant("Ada"), new Etudiant("Alan"), new Etudiant("Grace"));

        assertEquals("Ada, Alan, Grace", Affichage.noms(etudiants),
                "C'est le joker ? extends Personne qui rend cet appel possible. "
                        + "Avec Triplet<Personne> en parametre, il ne compilerait pas.");
    }

    @Test
    @DisplayName("Un melange est possible dans un triplet de Personne")
    void melange() {
        Triplet<Personne> melange = new Triplet<>(
                new Personne("Ada"), new Etudiant("Alan"), new Personne("Grace"));

        assertEquals("Ada, Alan, Grace", Affichage.noms(melange),
                "un Etudiant est une Personne : il a sa place dans un Triplet<Personne>");
    }
}
