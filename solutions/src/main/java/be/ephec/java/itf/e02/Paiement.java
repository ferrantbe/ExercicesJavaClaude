package be.ephec.java.itf.e02;

/**
 * ITF.2 — CORRIGE. Fournie, inchangee.
 *
 * Le paiement RETOURNE le compte-rendu de ses etapes au lieu de les afficher
 * lui-meme. C'est l'appelant qui decidera quoi en faire — les afficher, les
 * enregistrer, les envoyer par courriel. Voir la regle CC-MET.7 du memento
 * Clean Code.
 */
public interface Paiement {

    String effectuerPaiement(double montant);
}
