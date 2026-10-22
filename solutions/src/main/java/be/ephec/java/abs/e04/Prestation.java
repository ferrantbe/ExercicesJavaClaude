package be.ephec.java.abs.e04;

import java.util.Locale;

/**
 * ABS.4 — CORRIGE.
 *
 * Elle implemente Facturable SANS ecrire montant(). C'est legal, et c'est
 * le point de l'exercice : une classe abstraite peut promettre ce qu'elle
 * ne sait pas tenir, a condition de laisser ses sous-classes le tenir.
 *
 * facture() est ecrite ICI, une seule fois, et appelle montant() — que
 * seules les feuilles de la hierarchie savent calculer. La classe mere
 * appelle donc du code ecrit apres elle, exactement comme en ABS.1.
 *
 * OU IMPLEMENTER montant() : c'est la vraie question de l'exercice, et
 * elle se pose a l'examen. La reponse est « au plus haut niveau ou le
 * calcul soit connu » — ici les quatre classes concretes, parce que ni
 * Forfait ni Horaire ne suffisent a determiner le montant.
 */
public abstract class Prestation implements Facturable {

    private final String client;

    protected Prestation(String client) {
        this.client = client;
    }

    public String getClient() {
        return client;
    }

    public String facture() {
        return String.format(Locale.US, "%s : %.2f EUR", client, montant());
    }
}
