package be.ephec.java.enu.e03;

/**
 * ENU.3 — CORRIGE.
 *
 * Une enum est une classe : elle peut porter des champs, un constructeur et
 * des methodes. Chaque constante enumeree passe ses arguments au constructeur.
 *
 * Trois details de syntaxe a retenir :
 *   - la liste des constantes se termine par un point-virgule des qu'il y a
 *     autre chose apres elle ;
 *   - le constructeur est implicitement private, on ne peut pas faire de new ;
 *   - le champ est final, puisqu'une constante ne change jamais.
 */
public enum Color {
    PIQUE("Pique"),
    COEUR("Coeur"),
    CARREAU("Carreau"),
    TREFLE("Trefle");

    private final String libelle;

    Color(String libelle) {
        this.libelle = libelle;
    }

    public String getLibelle() {
        return libelle;
    }
}
