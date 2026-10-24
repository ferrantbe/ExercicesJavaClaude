package be.ephec.java.rec.e09;

/**
 * REC.9 — Corrige.
 *
 * A remarquer : la regle est une classe sans JavaFX, et elle a sa classe
 * de test. La fenetre, elle, n'en a pas : on ne teste pas une fenetre, on
 * teste ce qu'elle appelle. C'est la separation logique / dialogue du
 * reste du recueil, appliquee a une interface graphique.
 */
public class Filtre {

    private static final String VOYELLES = "aeiouy";

    public static boolean estRefuse(String caractere) {
        return VOYELLES.contains(caractere.toLowerCase());
    }

    public static String libelleCompteur(String texte) {
        return texte.length() + " caractere(s)";
    }
}
