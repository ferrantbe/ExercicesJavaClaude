package be.ephec.java.col.e08;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

/** COL.8 — Verification automatique. */
class TrisTest {

    private static final Livre GERMINAL = new Livre("Germinal", "Zola", 1885);
    private static final Livre CANDIDE = new Livre("Candide", "Voltaire", 1759);
    private static final Livre HORLA = new Livre("Le Horla", "Maupassant", 1887);
    private static final Livre NANA = new Livre("Nana", "Zola", 1880);
    private static final Livre ZADIG = new Livre("Zadig", "Voltaire", 1747);
    private static final Livre BEL_AMI = new Livre("Bel-Ami", "Maupassant", 1885);

    private static List<Livre> bibliotheque() {
        return new ArrayList<>(List.of(GERMINAL, CANDIDE, HORLA, NANA, ZADIG, BEL_AMI));
    }

    @Test
    @DisplayName("compareTo range les livres par titre")
    void ordreNaturel() {
        assertTrue(CANDIDE.compareTo(GERMINAL) < 0, "Candide vient avant Germinal");
        assertTrue(ZADIG.compareTo(NANA) > 0, "Zadig vient apres Nana");
        assertEquals(0, NANA.compareTo(new Livre("Nana", "Zola", 1880)),
                "Deux livres de meme titre sont a egalite");
    }

    @Test
    @DisplayName("parTitre suit l'ordre naturel")
    void parTitre() {
        assertIterableEquals(List.of(BEL_AMI, CANDIDE, GERMINAL, HORLA, NANA, ZADIG),
                Tris.parTitre(bibliotheque()),
                "Les livres doivent etre ranges par ordre alphabetique des titres");
    }

    @Test
    @DisplayName("parAnnee range par annee, puis par titre a egalite")
    void parAnnee() {
        assertIterableEquals(List.of(ZADIG, CANDIDE, NANA, BEL_AMI, GERMINAL, HORLA),
                Tris.parAnnee(bibliotheque()),
                "Par annee ; Bel-Ami et Germinal (1885) se departagent par le titre");
    }

    @Test
    @DisplayName("rangesParAuteur garde tous les livres, par auteur puis par titre")
    void parAuteur() {
        Set<Livre> ranges = Tris.rangesParAuteur(bibliotheque());

        assertIterableEquals(List.of(BEL_AMI, HORLA, CANDIDE, ZADIG, GERMINAL, NANA), ranges,
                "Par auteur, puis par titre ; aucun livre ne doit disparaitre");
    }

    @Test
    @DisplayName("Aucune methode ne modifie la liste recue")
    void listeIntacte() {
        List<Livre> origine = bibliotheque();

        Tris.parTitre(origine);
        Tris.parAnnee(origine);
        Tris.rangesParAuteur(origine);

        assertIterableEquals(bibliotheque(), origine,
                "Les methodes doivent travailler sur une copie");
    }
}
