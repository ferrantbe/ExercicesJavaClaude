package be.ephec.java.enu.e03;

/**
 * ENU.3 — A COMPLETER.
 *
 * Une enum est une classe : elle peut avoir un constructeur et des methodes.
 * Chaque valeur enumeree passe ses arguments a ce constructeur.
 *
 * Modele a suivre :
 *
 *     public enum Exemple {
 *         PREMIER("un"), DEUXIEME("deux");
 *
 *         private final String libelle;
 *
 *         Exemple(String libelle) { this.libelle = libelle; }
 *
 *         public String getLibelle() { return libelle; }
 *     }
 *
 * Notez le point-virgule apres la liste des constantes : il est obligatoire
 * des qu'il y a autre chose apres elle. Il est deja en place ci-dessous.
 */
public enum Color {

    // TODO : declarez ici les quatre couleurs avec leur libelle francais :
    //        PIQUE "Pique", COEUR "Coeur", CARREAU "Carreau", TREFLE "Trefle"
    ;

    // TODO : declarez le champ, en private et en final,
    //        puis ecrivez le constructeur.

    public String getLibelle() {
        throw new UnsupportedOperationException("getLibelle n'est pas encore implementee");
    }
}
