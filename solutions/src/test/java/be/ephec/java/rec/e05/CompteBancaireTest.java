package be.ephec.java.rec.e05;

/*
 * REC.5 — Verification automatique.
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
 *  Si le fichier ne compile toujours pas apres avoir decommente,
 *  c'est que vos noms ne sont pas ceux attendus. Les voici :
 *
 *      new CompteBancaire(String numero, String titulaire)
 *      String getNumero(), String getTitulaire(), double getSolde()
 *      void deposer(double) throws MontantInvalideException
 *      void retirer(double) throws MontantInvalideException,
 *                                  SoldeInsuffisantException
 *      String toString()     "BE01 - Ada Lovelace : 150.00 EUR"
 *
 *  Les tests ne verifient pas comment vos exceptions se construisent :
 *  c'est votre choix. Ils verifient qu'elles sont levees au bon moment,
 *  qu'elles sont controlees, et que le message de SoldeInsuffisantException
 *  cite les deux montants.
 * ================================================================
 *

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CompteBancaireTest {

    private static final double PRECISION = 0.001;

    @Test
    @DisplayName("Un compte neuf a un solde nul et retient son numero et son titulaire")
    void compteNeuf() {
        CompteBancaire compte = new CompteBancaire("BE01", "Ada Lovelace");

        assertEquals("BE01", compte.getNumero());
        assertEquals("Ada Lovelace", compte.getTitulaire());
        assertEquals(0.0, compte.getSolde(), PRECISION);
    }

    @Test
    @DisplayName("Les deux exceptions sont controlees")
    void exceptionsControlees() {
        assertTrue(Exception.class.isAssignableFrom(MontantInvalideException.class));
        assertFalse(RuntimeException.class.isAssignableFrom(MontantInvalideException.class));
        assertTrue(Exception.class.isAssignableFrom(SoldeInsuffisantException.class));
        assertFalse(RuntimeException.class.isAssignableFrom(SoldeInsuffisantException.class));
    }

    @Test
    @DisplayName("Deposer augmente le solde")
    void deposer() throws MontantInvalideException {
        CompteBancaire compte = new CompteBancaire("BE01", "Ada Lovelace");

        compte.deposer(100);
        compte.deposer(50.5);

        assertEquals(150.5, compte.getSolde(), PRECISION);
    }

    @Test
    @DisplayName("Deposer un montant negatif ou nul est refuse, et le solde ne bouge pas")
    void deposerMontantInvalide() throws MontantInvalideException {
        CompteBancaire compte = new CompteBancaire("BE01", "Ada Lovelace");
        compte.deposer(100);

        assertThrows(MontantInvalideException.class, () -> compte.deposer(-10));
        assertThrows(MontantInvalideException.class, () -> compte.deposer(0));

        assertEquals(100.0, compte.getSolde(), PRECISION);
    }

    @Test
    @DisplayName("Retirer diminue le solde, jusqu'a zero compris")
    void retirer() throws MontantInvalideException, SoldeInsuffisantException {
        CompteBancaire compte = new CompteBancaire("BE01", "Ada Lovelace");
        compte.deposer(100);

        compte.retirer(30);
        assertEquals(70.0, compte.getSolde(), PRECISION);

        compte.retirer(70);
        assertEquals(0.0, compte.getSolde(), PRECISION, "retirer tout le solde est permis");
    }

    @Test
    @DisplayName("Retirer plus que le solde est refuse, et le solde ne bouge pas")
    void retirerSoldeInsuffisant() throws MontantInvalideException {
        CompteBancaire compte = new CompteBancaire("BE01", "Ada Lovelace");
        compte.deposer(100);

        SoldeInsuffisantException levee =
                assertThrows(SoldeInsuffisantException.class, () -> compte.retirer(100.01));

        assertEquals(100.0, compte.getSolde(), PRECISION);
        assertTrue(levee.getMessage().contains("100"), "le message doit citer le solde");
        assertTrue(levee.getMessage().contains("100.01"), "le message doit citer le montant demande");
    }

    @Test
    @DisplayName("Retirer un montant negatif est un montant invalide, pas un solde insuffisant")
    void retirerMontantInvalide() throws MontantInvalideException {
        CompteBancaire compte = new CompteBancaire("BE01", "Ada Lovelace");
        compte.deposer(100);

        assertThrows(MontantInvalideException.class, () -> compte.retirer(-5));
        assertThrows(MontantInvalideException.class, () -> compte.retirer(0));

        assertEquals(100.0, compte.getSolde(), PRECISION);
    }

    @Test
    @DisplayName("toString donne le numero, le titulaire et le solde a deux decimales")
    void affichage() throws MontantInvalideException {
        CompteBancaire compte = new CompteBancaire("BE01", "Ada Lovelace");
        compte.deposer(150);

        assertEquals("BE01 - Ada Lovelace : 150.00 EUR", compte.toString());
    }
}

*/
