package be.ephec.java.fx.e09;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.text.Text;

/**
 * FX.9 — CORRIGE.
 *
 * Le controleur ne calcule rien : il lit la vue, appelle le modele, et
 * reecrit la vue. C'est tout ce qu'on lui demande.
 *
 * LA LOGIQUE D'UNE CALCULATRICE, une fois posee, tient en trois lignes.
 * Quand on presse un operateur :
 *
 *   1. s'il y avait deja un operateur en attente, on calcule ;
 *   2. on affiche le resultat ;
 *   3. on retient le nouvel operateur et on prepare la saisie suivante.
 *
 * Le "=" suit le meme chemin, a une difference pres : il ne met rien en
 * attente pour la suite.
 *
 * UN SEUL GESTIONNAIRE POUR DIX BOUTONS. Le FXML branche les dix chiffres
 * sur chiffrePresse. C'est l'evenement qui dit lequel a ete presse, par
 * getSource(). Ecrire dix methodes aurait fonctionne, et aurait ete dix
 * fois la meme chose. Voir CC-CLS.3.
 */
public class Controleur {

    @FXML
    private Text affichage;

    private final Modele modele = new Modele();

    private long premierNombre = 0;
    private String operateurEnAttente = "";
    private boolean nouvelleSaisie = true;

    @FXML
    private void chiffrePresse(ActionEvent evenement) {
        String chiffre = ((Button) evenement.getSource()).getText();

        // Apres un operateur, le chiffre suivant REMPLACE l'affichage au
        // lieu de s'y accoler. Sans ce drapeau, presser 5 + 6 afficherait
        // "56" au lieu de "6".
        if (nouvelleSaisie || affichage.getText().equals("0")) {
            affichage.setText(chiffre);
            nouvelleSaisie = false;
        } else {
            affichage.setText(affichage.getText() + chiffre);
        }
    }

    @FXML
    private void operateurPresse(ActionEvent evenement) {
        String operateur = ((Button) evenement.getSource()).getText();
        long affiche = Long.parseLong(affichage.getText());

        try {
            long resultat = operateurEnAttente.isEmpty()
                    ? affiche
                    : modele.calculer(premierNombre, affiche, operateurEnAttente);

            affichage.setText(String.valueOf(resultat));
            premierNombre = resultat;

        } catch (ArithmeticException division) {
            // Le modele a refuse. On le dit, et on repart a zero.
            affichage.setText("Erreur");
            reinitialiser();
            return;
        }

        // "=" cloture le calcul : rien ne reste en attente.
        operateurEnAttente = operateur.equals("=") ? "" : operateur;
        nouvelleSaisie = true;
    }

    @FXML
    private void effacer(ActionEvent evenement) {
        affichage.setText("0");
        reinitialiser();
    }

    private void reinitialiser() {
        premierNombre = 0;
        operateurEnAttente = "";
        nouvelleSaisie = true;
    }
}
