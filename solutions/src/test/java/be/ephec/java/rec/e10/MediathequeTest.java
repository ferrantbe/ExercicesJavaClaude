package be.ephec.java.rec.e10;

/*
 * REC.10 — Verification automatique.
 *
 * ================================================================
 *  TOUT EST EN COMMENTAIRE, ET C'EST VOULU.
 *
 *  Les classes testees ici n'existent pas encore : c'est vous qui
 *  allez les ecrire. Un fichier de test qui les appelle ne
 *  compilerait pas, et un seul fichier fautif empeche la
 *  compilation de TOUT le module.
 *
 *  QUAND VOS CLASSES SERONT ECRITES : selectionnez tout le contenu
 *  de ce fichier et faites Ctrl+/ (ou Cmd+/) pour retirer les
 *  commentaires d'un coup. Puis lancez les tests.
 *
 *  Les noms attendus sont ceux de l'en-tete de Programme. Les tests
 *  ne regardent pas comment la penalite est calculee a l'interieur :
 *  seulement ce que penalite(int) rend.
 * ================================================================
 *

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Modifier;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class MediathequeTest {

    private static final double PRECISION = 0.001;

    @Test
    @DisplayName("Empruntable est une interface, Document, Imprime et Support sont abstraites")
    void structure() {
        assertTrue(Modifier.isInterface(Empruntable.class.getModifiers()));
        assertTrue(Modifier.isAbstract(Document.class.getModifiers()));
        assertTrue(Modifier.isAbstract(Imprime.class.getModifiers()));
        assertTrue(Modifier.isAbstract(Support.class.getModifiers()));
        assertTrue(Empruntable.class.isAssignableFrom(Document.class));
    }

    @Test
    @DisplayName("La hierarchie a deux niveaux")
    void hierarchie() {
        assertEquals(Imprime.class, Livre.class.getSuperclass());
        assertEquals(Imprime.class, Revue.class.getSuperclass());
        assertEquals(Support.class, Dvd.class.getSuperclass());
        assertEquals(Support.class, JeuVideo.class.getSuperclass());
        assertEquals(Document.class, Imprime.class.getSuperclass());
        assertEquals(Document.class, Support.class.getSuperclass());
    }

    @Test
    @DisplayName("Etat est une enumeration de trois valeurs, avec un libelle")
    void etat() {
        assertTrue(Etat.class.isEnum());
        assertEquals(3, Etat.values().length);
        assertEquals("bon etat", Etat.BON.getLibelle());
    }

    @Test
    @DisplayName("Les accesseurs et la description")
    void description() {
        Livre dune = new Livre("Dune", 1965, Etat.BON, 688);

        assertEquals("Dune", dune.getTitre());
        assertEquals(1965, dune.getAnnee());
        assertEquals(Etat.BON, dune.getEtat());
        assertEquals(688, dune.getPages());
        assertEquals("Dune (1965), livre, bon etat", dune.description());
        assertEquals("Alien (1979), DVD, abime", new Dvd("Alien", 1979, Etat.ABIME, 117).description());
        assertEquals("Tetris (1984), jeu video, neuf", new JeuVideo("Tetris", 1984, Etat.NEUF, 30).description());
    }

    @Test
    @DisplayName("Les durees d'emprunt")
    void durees() {
        assertEquals(21, new Livre("Dune", 1965, Etat.BON, 688).dureeMaxJours());
        assertEquals(7, new Revue("S&V", 2026, Etat.NEUF, 120).dureeMaxJours());
        assertEquals(7, new Dvd("Alien", 1979, Etat.ABIME, 117).dureeMaxJours());
        assertEquals(14, new JeuVideo("Tetris", 1984, Etat.NEUF, 30).dureeMaxJours());
    }

    @Test
    @DisplayName("Les penalites par jour")
    void penalites() {
        assertEquals(0.30, new Livre("Dune", 1965, Etat.BON, 688).penalite(3), PRECISION);
        assertEquals(0.60, new Revue("S&V", 2026, Etat.NEUF, 120).penalite(3), PRECISION);
        assertEquals(3.00, new Dvd("Alien", 1979, Etat.ABIME, 117).penalite(3), PRECISION);
        assertEquals(1.50, new JeuVideo("Tetris", 1984, Etat.NEUF, 30).penalite(3), PRECISION);
    }

    @Test
    @DisplayName("Pas de retard, pas de penalite")
    void sansRetard() {
        assertEquals(0.0, new Dvd("Alien", 1979, Etat.ABIME, 117).penalite(0), PRECISION);
        assertEquals(0.0, new Dvd("Alien", 1979, Etat.ABIME, 117).penalite(-2), PRECISION);
    }

    @Test
    @DisplayName("La penalite d'un jeu video est plafonnee a 10 euros")
    void plafond() {
        JeuVideo tetris = new JeuVideo("Tetris", 1984, Etat.NEUF, 30);

        assertEquals(10.00, tetris.penalite(20), PRECISION);
        assertEquals(10.00, tetris.penalite(100), PRECISION);
        assertEquals(9.50, tetris.penalite(19), PRECISION, "juste sous le plafond");
    }

    @Test
    @DisplayName("La mediatheque additionne, decrit et compte sans tester les types")
    void mediatheque() {
        Mediatheque mediatheque = new Mediatheque();
        mediatheque.ajouter(new Livre("Dune", 1965, Etat.BON, 688));
        mediatheque.ajouter(new Revue("S&V", 2026, Etat.NEUF, 120));
        mediatheque.ajouter(new Dvd("Alien", 1979, Etat.ABIME, 117));
        mediatheque.ajouter(new JeuVideo("Tetris", 1984, Etat.ABIME, 30));

        assertEquals(4, mediatheque.taille());
        assertEquals(0.30 + 0.60 + 3.00 + 1.50, mediatheque.penalitesTotales(3), PRECISION);
        assertEquals(0.0, mediatheque.penalitesTotales(0), PRECISION);
        assertEquals(2, mediatheque.compter(Etat.ABIME));
        assertEquals(1, mediatheque.compter(Etat.NEUF));
        assertEquals(List.of(
                "Dune (1965), livre, bon etat",
                "S&V (2026), revue, neuf",
                "Alien (1979), DVD, abime",
                "Tetris (1984), jeu video, abime"), mediatheque.descriptions());
    }

    @Test
    @DisplayName("Une mediatheque vide")
    void vide() {
        Mediatheque mediatheque = new Mediatheque();

        assertEquals(0, mediatheque.taille());
        assertEquals(0.0, mediatheque.penalitesTotales(5), PRECISION);
        assertTrue(mediatheque.descriptions().isEmpty());
    }
}

*/
