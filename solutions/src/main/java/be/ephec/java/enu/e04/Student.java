package be.ephec.java.enu.e04;

/**
 * ENU.4 — CORRIGE.
 *
 * L'en-tete du record vous etait fourni : une seule ligne, qui remplace ce
 * qu'on ecrirait en une trentaine dans une classe ordinaire. Le compilateur
 * genere a partir d'elle :
 *   - un constructeur Student(String, int) ;
 *   - les accesseurs nom() et cote(), sans prefixe get ;
 *   - toString(), equals() et hashCode().
 *
 * Un record est fait pour une donnee simple et immuable. Des qu'un objet
 * porte une logique metier ou doit changer d'etat, la classe reste le bon
 * outil. Notez aussi qu'un record est final : rien ne peut en heriter.
 */
public record Student(String nom, int cote) {

    /**
     * Un record peut recevoir des methodes, comme n'importe quelle classe.
     * On accede au composant par cote(), l'accesseur genere.
     */
    public boolean passe() {
        return cote >= 10;
    }
}
