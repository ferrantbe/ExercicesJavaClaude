package be.ephec.java.pkg.e04;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

/** PKG.4 — Verification automatique. */
class DecoupageTest {

    private static void doitExister(String nomComplet) {
        assertDoesNotThrow(() -> Class.forName(nomComplet),
                nomComplet + " est introuvable : la classe n'a pas encore demenage.");
    }

    @Test
    @DisplayName("Les classes de donnees sont dans le package modele")
    void packageModele() {
        doitExister("be.ephec.java.pkg.e04.modele.Joueur");
        doitExister("be.ephec.java.pkg.e04.modele.Partie");
    }

    @Test
    @DisplayName("Le service est dans le package service")
    void packageService() {
        doitExister("be.ephec.java.pkg.e04.service.Inscription");
    }

    @Test
    @DisplayName("Le point d'entree est dans le package application")
    void packageApplication() {
        doitExister("be.ephec.java.pkg.e04.application.Application");
    }

    @Test
    @DisplayName("Plus rien ne subsiste a l'ancien emplacement")
    void ancienEmplacementVide() {
        for (String ancien : new String[]{"Joueur", "Partie", "Inscription", "Application"}) {
            assertThrows(ClassNotFoundException.class,
                    () -> Class.forName("be.ephec.java.pkg.e04." + ancien),
                    ancien + " est encore a son ancienne place : deplacez-la, "
                            + "ne la recopiez pas.");
        }
    }
}
