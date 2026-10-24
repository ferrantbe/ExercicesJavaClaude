package be.ephec.java.rec.e09;

/**
 * REC.9 — A COMPLETER.
 *
 * La regle du filtre, sans un seul import JavaFX : ce qui est refuse, et
 * pourquoi. Elle est ici, et pas dans la fenetre, pour pouvoir etre
 * testee. La fenetre ne fait que l'appliquer.
 */
public class Filtre {

    private static final String VOYELLES = "aeiouy";

    /**
     * Vrai si le caractere tape doit etre refuse : une voyelle, en
     * minuscule ou en majuscule. KEY_TYPED donne le caractere sous forme
     * de String, d'ou le type du parametre.
     */
    public static boolean estRefuse(String caractere) {
        throw new UnsupportedOperationException("estRefuse n'est pas encore implementee");
    }

    /** "12 caractere(s)" : le libelle du compteur pour un texte donne. */
    public static String libelleCompteur(String texte) {
        throw new UnsupportedOperationException("libelleCompteur n'est pas encore implementee");
    }
}
