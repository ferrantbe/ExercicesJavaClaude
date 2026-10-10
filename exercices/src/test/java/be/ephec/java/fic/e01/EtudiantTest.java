package be.ephec.java.fic.e01;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/** FIC.1 — Verification automatique. */
class EtudiantTest {

    private static Enseignant turing() {
        return new Enseignant("Turing", "Alan");
    }

    @Test
    @DisplayName("Un enseignant s'ecrit prenom puis nom")
    void enseignant() {
        assertEquals("Alan Turing", turing().toString());
        assertEquals("Turing", turing().getNom());
    }

    @Test
    @DisplayName("Un cours porte son charge de cours entre parentheses")
    void cours() {
        Cours java = new Cours("Java", turing());

        assertEquals("Java", java.getIntitule());
        assertEquals("Java (Alan Turing)", java.toString());
    }

    @Test
    @DisplayName("Le charge de cours peut changer")
    void changementDeCharge() {
        Cours java = new Cours("Java", turing());

        java.setChargeDeCours(new Enseignant("Hopper", "Grace"));

        assertEquals("Java (Grace Hopper)", java.toString());
    }

    @Test
    @DisplayName("Un etudiant neuf n'a aucun cours")
    void etudiantNeuf() {
        Etudiant ada = new Etudiant("Lovelace", "Ada");

        assertEquals(0, ada.nombreDeCours());
        assertEquals("Lovelace Ada", ada.toString());
    }

    @Test
    @DisplayName("L'inscription ajoute le cours, dans l'ordre")
    void inscription() {
        Etudiant ada = new Etudiant("Lovelace", "Ada");

        ada.inscrire(new Cours("Java", turing()));
        ada.inscrire(new Cours("Algebre", turing()));

        assertEquals(2, ada.nombreDeCours());
        assertEquals("Lovelace Ada : Java, Algebre", ada.toString());
    }

    @Test
    @DisplayName("Une seconde inscription au meme cours ne change rien")
    void inscriptionEnDouble() {
        Etudiant ada = new Etudiant("Lovelace", "Ada");
        Cours java = new Cours("Java", turing());

        ada.inscrire(java);
        ada.inscrire(java);

        assertEquals(1, ada.nombreDeCours());
    }

    @Test
    @DisplayName("La desinscription retire le cours")
    void desinscription() {
        Etudiant ada = new Etudiant("Lovelace", "Ada");
        Cours java = new Cours("Java", turing());
        ada.inscrire(java);

        ada.desinscrire(java);

        assertEquals(0, ada.nombreDeCours());
    }

    @Test
    @DisplayName("Desinscrire un cours absent ne provoque rien")
    void desinscriptionInutile() {
        Etudiant ada = new Etudiant("Lovelace", "Ada");

        assertDoesNotThrow(() -> ada.desinscrire(new Cours("Java", turing())));
        assertEquals(0, ada.nombreDeCours());
    }

    @Test
    @DisplayName("La liste rendue ne permet pas de vider l'etudiant")
    void listeProtegee() {
        Etudiant ada = new Etudiant("Lovelace", "Ada");
        ada.inscrire(new Cours("Java", turing()));

        try {
            ada.getCours().clear();
        } catch (UnsupportedOperationException protegee) {
            // c'est le comportement souhaite
        }

        assertEquals(1, ada.nombreDeCours(),
                "Rendre la liste elle-meme laisse n'importe qui la vider. "
                        + "Voir CC-OBJ.2 du memento Clean Code.");
    }
}
