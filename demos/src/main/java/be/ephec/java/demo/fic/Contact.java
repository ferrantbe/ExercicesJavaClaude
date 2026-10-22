package be.ephec.java.demo.fic;

import java.io.Serializable;

/**
 * DEMO FIC — etat d'ARRIVEE.
 *
 * Serializable ne demande RIEN a implementer : aucune methode, aucun
 * champ. C'est une interface marqueur — elle ne decrit pas un service,
 * elle appose une etiquette. Sans elle, l'ecriture binaire echoue avec
 * NotSerializableException.
 *
 * LE serialVersionUID. Sans lui, Java en calcule un a partir de la forme
 * de la classe : ajoutez un champ, et le numero change, et les fichiers
 * deja ecrits deviennent illisibles. En le fixant soi-meme, on dit « c'est
 * toujours la meme classe » — et on prend la responsabilite de ce que
 * signifie relire un ancien fichier.
 */
public class Contact implements Serializable {

    private static final long serialVersionUID = 1L;

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

    /** Une ligne de fichier texte : trois champs separes par un point-virgule. */
    public String enLigne() {
        return nom + ";" + telephone + ";" + codePostal;
    }

    /** L'operation inverse. Une fabrique, comme en STA.2. */
    public static Contact depuisLigne(String ligne) {
        String[] champs = ligne.split(";");
        return new Contact(champs[0], champs[1], Integer.parseInt(champs[2]));
    }

    @Override
    public String toString() {
        return nom + " (" + codePostal + ") " + telephone;
    }
}
