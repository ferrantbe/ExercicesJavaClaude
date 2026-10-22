package be.ephec.java.travail;

/**
 * DEMO FIC — etat de DEPART.
 *
 * Un contact de carnet d'adresses. Remarquez ce qui MANQUE : la classe
 * n'implemente rien du tout. C'est le premier ecueil de la demonstration.
 */
public class Contact {

    private final String nom;
    private final String telephone;
    private final int codePostal;

    public Contact(String nom, String telephone, int codePostal) {
        this.nom = nom;
        this.telephone = telephone;
        this.codePostal = codePostal;
    }

    public String getNom() {
        return nom;
    }

    public String getTelephone() {
        return telephone;
    }

    public int getCodePostal() {
        return codePostal;
    }

    @Override
    public String toString() {
        return nom + " (" + codePostal + ") " + telephone;
    }
}
