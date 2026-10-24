package be.ephec.java.rec.e03;

/**
 * REC.3 — FOURNIE, MAIS PAS FORCEMENT JUSTE.
 *
 * Verifie un mot de passe selon un niveau de securite :
 *
 *   niveau 1 : au moins 4 caracteres ;
 *   niveau 2 : le niveau 1, ET au moins un chiffre ;
 *   un mot de passe null n'est jamais valide ;
 *   tout autre niveau que 1 ou 2 est refuse a la construction, par une
 *   IllegalArgumentException.
 *
 * Cette classe a ete ecrite par quelqu'un d'autre, et elle a ete livree
 * sans test. Votre travail : ecrire la classe de test qui verifie chacune
 * des regles ci-dessus, la lancer, et corriger ICI ce que vos tests
 * revelent. Ne corrigez rien avant d'avoir un test rouge qui le justifie.
 */
public class VerificateurDeMotDePasse {

    private static final int LONGUEUR_MINIMALE = 4;
    private static final int NIVEAU_MINIMUM = 1;
    private static final int NIVEAU_MAXIMUM = 2;

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
        if (niveau == 2) {
            return contientUnChiffre(motDePasse);
        }
        return motDePasse.length() > LONGUEUR_MINIMALE;
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
