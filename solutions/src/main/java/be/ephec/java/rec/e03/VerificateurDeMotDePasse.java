package be.ephec.java.rec.e03;

/**
 * REC.3 — Corrige.
 *
 * La classe fournie contenait DEUX defauts, que les tests revelent :
 *
 *   1. "au moins 4 caracteres" etait code avec un > : un mot de passe de
 *      4 caracteres etait refuse. C'est l'erreur d'une unite classique,
 *      que seul un test SUR LA BORNE attrape.
 *   2. Le niveau 2 ne verifiait que le chiffre, et oubliait la longueur :
 *      "a1" passait. La regle dit "le niveau 1, ET un chiffre".
 *
 * Le corrige enchaine les regles : la longueur d'abord, pour tout le monde,
 * puis le chiffre si le niveau l'exige.
 */
public class VerificateurDeMotDePasse {

    private static final int LONGUEUR_MINIMALE = 4;
    private static final int NIVEAU_MINIMUM = 1;
    private static final int NIVEAU_MAXIMUM = 2;
    private static final int NIVEAU_AVEC_CHIFFRE = 2;

    private final int niveau;

    public VerificateurDeMotDePasse(int niveau) {
        if (niveau < NIVEAU_MINIMUM || niveau > NIVEAU_MAXIMUM) {
            throw new IllegalArgumentException("Niveau inconnu : " + niveau);
        }
        this.niveau = niveau;
    }

    public int getNiveau() {
        return niveau;
    }

    public boolean valide(String motDePasse) {
        if (motDePasse == null) {
            return false;
        }
        if (motDePasse.length() < LONGUEUR_MINIMALE) {
            return false;
        }
        if (niveau == NIVEAU_AVEC_CHIFFRE) {
            return contientUnChiffre(motDePasse);
        }
        return true;
    }

    private static boolean contientUnChiffre(String texte) {
        for (char c : texte.toCharArray()) {
            if (Character.isDigit(c)) {
                return true;
            }
        }
        return false;
    }
}
