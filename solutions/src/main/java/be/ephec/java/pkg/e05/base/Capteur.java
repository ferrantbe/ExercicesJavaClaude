package be.ephec.java.pkg.e05.base;

/**
 * PKG.5 — CORRIGE. Fournie, inchangee.
 *
 * Elle presente ses trois champs avec trois visibilites differentes.
 * L'exercice consiste a decouvrir, en essayant, ce que chacune autorise
 * depuis un AUTRE package.
 *
 * Rappel de PKG.1 et PKG.2, qui n'avaient pas encore l'heritage :
 *
 *     private     la classe elle-meme, et rien d'autre
 *     (rien)      le meme package
 *     protected   le meme package, ET les sous-classes ou qu'elles soient
 *     public      tout le monde
 *
 * C'est la ligne protected qui est nouvelle, et elle est la seule dont la
 * portee ne se decrit pas par un simple perimetre : elle traverse les
 * packages, mais seulement par l'heritage.
 */
public class Capteur {

    /** Le numero de serie : personne d'autre n'a a le connaitre. */
    private final String numeroDeSerie;

    /** La derniere mesure : les sous-classes en ont besoin. */
    protected double derniereMesure;

    /** Le nom, visible par tous. */
    public final String nom;

    public Capteur(String nom, String numeroDeSerie) {
        this.nom = nom;
        this.numeroDeSerie = numeroDeSerie;
        this.derniereMesure = 0;
    }

    public void mesurer(double valeur) {
        this.derniereMesure = valeur;
    }

    public double lire() {
        return derniereMesure;
    }

    /** Les quatre derniers caracteres du numero, pour l'affichage. */
    public String identifiantCourt() {
        return numeroDeSerie.substring(numeroDeSerie.length() - 4);
    }
}
