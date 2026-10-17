package be.ephec.java.enu.e04;

/**
 * ENU.4 — A COMPLETER.
 *
 * La declaration du record vous est FOURNIE. Regardez-la bien : cette seule
 * ligne suffit au compilateur pour ecrire, sans que vous n'y touchiez :
 *
 *     - le constructeur Student(String, int) ;
 *     - les accesseurs nom() et cote(), sans prefixe get ;
 *     - toString(), equals() et hashCode().
 *
 * C'est ce que la classe de test verifie en premier : elle controle le
 * travail du compilateur, pas le votre.
 *
 * Votre part commence a passe().
 */
public record Student(String nom, int cote) {

    /**
     * TODO : retourne true si l'etudiant a reussi, c'est-a-dire si sa cote
     *        atteint 10.
     *
     *        Un record peut recevoir des methodes, comme n'importe quelle
     *        classe. On accede au composant par cote(), l'accesseur genere —
     *        ou directement par cote, le champ.
     */
    public boolean passe() {
        throw new UnsupportedOperationException("passe n'est pas encore implementee");
    }
}
