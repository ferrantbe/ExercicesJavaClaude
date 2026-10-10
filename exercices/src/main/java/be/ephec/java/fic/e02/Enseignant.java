package be.ephec.java.fic.e02;

import java.io.Serializable;

/**
 * FIC.2 — Cette classe vous est FOURNIE, complete.
 *
 * Elle est celle de FIC.1, a une difference pres : elle implemente
 * Serializable. Cette interface ne declare AUCUNE methode — elle sert
 * uniquement de marqueur, une facon de dire a la JVM « cette classe accepte
 * d'etre transformee en octets ».
 *
 * Sans elle, l'ecriture leverait NotSerializableException.
 */
public class Enseignant implements Serializable {

    private final String nom;
    private final String prenom;

    public Enseignant(String nom, String prenom) {
        this.nom = nom;
        this.prenom = prenom;
    }

    public String getNom() {
        return nom;
    }

    public String getPrenom() {
        return prenom;
    }

    @Override
    public String toString() {
        return prenom + " " + nom;
    }
}
