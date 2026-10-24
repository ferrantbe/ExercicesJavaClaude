package be.ephec.java.rec.e04;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

/**
 * REC.4 — Verification automatique.
 *
 * Le compteur d'Etudiant est commun a tous les tests, qui s'executent dans
 * un ordre que JUnit ne garantit pas. Les tests ne supposent donc jamais
 * que le prochain matricule sera ET-0001 : ils comparent AVANT et APRES.
 */
class RegistreTest {

    @Test
    @DisplayName("Le compteur d'etudiants est un champ static de la classe")
    void compteurStatic() {
        boolean trouve = false;
        for (Field champ : Etudiant.class.getDeclaredFields()) {
            if (Modifier.isStatic(champ.getModifiers()) && champ.getType() == int.class) {
                trouve = true;
            }
        }
        assertTrue(trouve, "Etudiant doit declarer un champ static de type int pour compter ses instances");
    }

    @Test
    @DisplayName("Chaque creation augmente le compteur de un")
    void compteur() {
        int avant = Etudiant.getNombreCrees();

        new Etudiant("Lovelace", "Ada");
        new Etudiant("Turing", "Alan");

        assertEquals(avant + 2, Etudiant.getNombreCrees());
    }

    @Test
    @DisplayName("Le matricule suit le compteur, sur quatre chiffres")
    void matricule() {
        Etudiant premier = new Etudiant("Lovelace", "Ada");
        Etudiant second = new Etudiant("Turing", "Alan");

        assertEquals(String.format("ET-%04d", Etudiant.getNombreCrees() - 1), premier.getMatricule());
        assertEquals(String.format("ET-%04d", Etudiant.getNombreCrees()), second.getMatricule());
        assertNotEquals(premier.getMatricule(), second.getMatricule());
    }

    @Test
    @DisplayName("toString : matricule, nom, prenom")
    void affichage() {
        Etudiant etudiant = new Etudiant("Lovelace", "Ada");

        assertEquals(etudiant.getMatricule() + " Lovelace Ada", etudiant.toString());
        assertEquals("Lovelace", etudiant.getNom());
        assertEquals("Ada", etudiant.getPrenom());
    }

    @Test
    @DisplayName("Un etudiant inscrit se retrouve par son matricule")
    void inscrireEtTrouver() throws EtudiantInconnuException {
        Registre registre = new Registre();
        Etudiant ada = new Etudiant("Lovelace", "Ada");
        registre.inscrire(ada);
        registre.inscrire(new Etudiant("Turing", "Alan"));

        assertEquals(2, registre.taille());
        assertSame(ada, registre.trouver(ada.getMatricule()));
    }

    @Test
    @DisplayName("Un matricule inconnu leve EtudiantInconnuException, qui le nomme")
    void inconnu() {
        Registre registre = new Registre();
        registre.inscrire(new Etudiant("Lovelace", "Ada"));

        EtudiantInconnuException levee =
                assertThrows(EtudiantInconnuException.class, () -> registre.trouver("ET-9999"));

        assertTrue(levee.getMessage().contains("ET-9999"), "le message doit citer le matricule");
        assertFalse(RuntimeException.class.isAssignableFrom(EtudiantInconnuException.class),
                "l'exception doit etre controlee");
    }

    @Test
    @DisplayName("Inscrire deux fois le meme etudiant est refuse")
    void doublon() {
        Registre registre = new Registre();
        Etudiant ada = new Etudiant("Lovelace", "Ada");
        registre.inscrire(ada);

        assertThrows(IllegalArgumentException.class, () -> registre.inscrire(ada));
        assertEquals(1, registre.taille());
    }

    @Test
    @DisplayName("ParNom ordonne par nom, puis par prenom")
    void comparateur() {
        ParNom parNom = new ParNom();
        Etudiant ada = new Etudiant("Lovelace", "Ada");
        Etudiant anne = new Etudiant("Lovelace", "Anne");
        Etudiant alan = new Etudiant("Turing", "Alan");

        assertTrue(parNom.compare(ada, alan) < 0);
        assertTrue(parNom.compare(alan, ada) > 0);
        assertTrue(parNom.compare(ada, anne) < 0, "a nom egal, le prenom departage");
        assertEquals(0, parNom.compare(ada, ada));
    }

    @Test
    @DisplayName("parNom rend les inscrits tries, sans toucher au registre")
    void parNom() {
        Registre registre = new Registre();
        registre.inscrire(new Etudiant("Turing", "Alan"));
        registre.inscrire(new Etudiant("Lovelace", "Anne"));
        registre.inscrire(new Etudiant("Hopper", "Grace"));
        registre.inscrire(new Etudiant("Lovelace", "Ada"));

        List<Etudiant> tries = registre.parNom();

        List<String> noms = new ArrayList<>();
        for (Etudiant etudiant : tries) {
            noms.add(etudiant.getNom());
        }
        assertEquals(List.of("Hopper", "Lovelace", "Lovelace", "Turing"), noms);
        assertEquals("Ada", tries.get(1).getPrenom());
        assertEquals("Anne", tries.get(2).getPrenom());
        assertEquals(4, registre.taille());
    }

    @Test
    @DisplayName("parInitiale compte les noms par premiere lettre, sans lettre absente")
    void parInitiale() {
        Registre registre = new Registre();
        registre.inscrire(new Etudiant("Lovelace", "Ada"));
        registre.inscrire(new Etudiant("Liskov", "Barbara"));
        registre.inscrire(new Etudiant("Turing", "Alan"));

        Map<Character, Integer> comptes = registre.parInitiale();

        assertEquals(Map.of('L', 2, 'T', 1), comptes);
    }

    @Test
    @DisplayName("Un registre vide a une taille nulle et rien a trier")
    void vide() {
        Registre registre = new Registre();

        assertEquals(0, registre.taille());
        assertTrue(registre.parNom().isEmpty());
        assertTrue(registre.parInitiale().isEmpty());
    }
}
