package be.ephec.java.abs.e05;

/**
 * ABS.5 — CORRIGE.
 *
 * Celui-ci ignore le poids, et c'est instructif : sa methode cout() ne
 * lit aucun champ. On pourrait croire que la classe n'a pas besoin
 * d'heriter d'Envoi — mais elle en a besoin pour etiquette(), pour le
 * destinataire, et surtout pour tenir dans le meme tableau que les
 * autres.
 */
public class Recommande extends Envoi {

    private static final double TARIF = 7.00;

    public Recommande(String destinataire, int poidsGrammes) {
        super(destinataire, poidsGrammes);
    }

    @Override
    public double cout() {
        return TARIF;
    }
}
