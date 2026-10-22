package be.ephec.java.abs.e05;

import java.util.Locale;

/**
 * ABS.5 — CORRIGE.
 *
 * Le tableau est du type le plus general : Envoi. La boucle ne teste
 * aucun type, et pourtant chaque envoi se facture a son tarif.
 *
 * Ajouter une quatrieme sorte — un pli urgent, une palette — demanderait
 * une classe de plus et une ligne de plus dans ce tableau. Rien d'autre,
 * et surtout pas une condition supplementaire ici.
 */
public class Programme {

    public static void main(String[] args) {
        Envoi[] envois = {
                new Lettre("Ada Lovelace", 20),
                new Colis("Alan Turing", 120),
                new Recommande("Grace Hopper", 500)
        };

        double total = 0;
        for (Envoi envoi : envois) {
            System.out.println(envoi.etiquette());
            total += envoi.cout();
        }
        System.out.printf(Locale.US, "%nTotal : %.2f EUR%n", total);
    }
}
