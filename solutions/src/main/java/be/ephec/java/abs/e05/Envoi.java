package be.ephec.java.abs.e05;

import java.util.Locale;

/**
 * ABS.5 — CORRIGE.
 *
 * CE QUI SE DECIDE ICI, et que l'enonce laissait ouvert.
 *
 * Deux champs montent dans la classe mere, parce que les trois sortes
 * d'envoi les ont toutes : un destinataire et un poids. Les descendre
 * dans chaque sous-classe reviendrait a les ecrire trois fois.
 *
 * etiquette() monte aussi, et c'est la vraie decision de l'exercice.
 * Elle est identique pour les trois sortes — seul le montant change, et
 * ce montant, elle le demande a cout(). Elle appelle donc une methode
 * qu'elle ne sait pas executer, ecrite dans des classes qui n'existent
 * pas encore quand on l'ecrit.
 *
 * cout() reste abstraite : un envoi « en general » n'a pas de tarif.
 * C'est la definition meme d'une classe abstraite — elle sait ce que ses
 * descendants doivent savoir faire, sans savoir le faire elle-meme.
 */
public abstract class Envoi {

    private final String destinataire;
    private final int poidsGrammes;

    protected Envoi(String destinataire, int poidsGrammes) {
        this.destinataire = destinataire;
        this.poidsGrammes = poidsGrammes;
    }

    /** Ce que coute cet envoi. Chaque sorte a son tarif. */
    public abstract double cout();

    /** Retourne "Ada Lovelace - 120 g - 4.60 EUR". */
    public String etiquette() {
        return String.format(Locale.US, "%s - %d g - %.2f EUR",
                destinataire, poidsGrammes, cout());
    }

    public String getDestinataire() {
        return destinataire;
    }

    public int getPoidsGrammes() {
        return poidsGrammes;
    }
}
