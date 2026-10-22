package be.ephec.java.sta.e02;

/**
 * STA.2 — A COMPLETER.
 *
 * Une duree, exprimee en minutes. Le constructeur est PRIVE : on ne
 * construit pas une Duree directement, on passe par une des methodes
 * statiques qui la fabriquent.
 *
 *     Duree.deMinutes(90)     au lieu de   new Duree(90)
 *     Duree.deHeures(2)       au lieu de   new Duree(120)
 *
 * Ces methodes s'appellent des FABRIQUES. Leur interet tient a leur nom :
 * new Duree(2) ne dit pas si le 2 est en heures ou en minutes, alors que
 * Duree.deHeures(2) ne laisse aucun doute.
 */
public class Duree {

    private final int minutes;

    /**
     * Prive : personne ne peut appeler new Duree(...) depuis l'exterieur.
     * C'est ce qui oblige a passer par les fabriques.
     */
    private Duree(int minutes) {
        this.minutes = minutes;
    }

    // TODO : ecrivez les deux fabriques.
    //        Elles sont statiques — on les appelle sur la classe, avant
    //        qu'aucune Duree n'existe.

    public static Duree deMinutes(int minutes) {
        throw new UnsupportedOperationException("deMinutes n'est pas encore implementee");
    }

    public static Duree deHeures(int heures) {
        throw new UnsupportedOperationException("deHeures n'est pas encore implementee");
    }

    public int enMinutes() {
        throw new UnsupportedOperationException("enMinutes n'est pas encore implementee");
    }

    /** Retourne une NOUVELLE duree, somme des deux. Aucune des deux ne change. */
    public Duree plus(Duree autre) {
        throw new UnsupportedOperationException("plus n'est pas encore implementee");
    }

    /**
     * Additionne un nombre quelconque de durees.
     *
     * Statique, parce qu'elle ne porte sur aucune duree en particulier.
     * Les trois points signifient « zero, une ou plusieurs » : on l'appelle
     * avec Duree.total(a, b, c) ou meme Duree.total().
     */
    public static Duree total(Duree... durees) {
        throw new UnsupportedOperationException("total n'est pas encore implementee");
    }

    /** Retourne "2h30", ou "45min" quand il y a moins d'une heure. */
    @Override
    public String toString() {
        throw new UnsupportedOperationException("toString n'est pas encore implementee");
    }
}
